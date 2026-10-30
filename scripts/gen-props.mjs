#!/usr/bin/env node
/**
 * gen-props.mjs · tabela de props gerada a partir do próprio código.
 *
 * Lê `src/lib/<Comp>/<Comp>.tsx` com o compilador do TypeScript (já instalado,
 * zero dependência nova) e grava `src/pages/api/props.generated.json`:
 *
 *   {
 *     "Pill": {
 *       "component": "Pill", "propsType": "PillProps",
 *       "source": "src/lib/Pill/Pill.tsx",
 *       "extends": ["HTMLAttributes<HTMLSpanElement>"],
 *       "props": [ { name, type, required, default?, description?, control? } ],
 *       "inherited": { "children": "ReactNode", ... }
 *     }
 *   }
 *
 * - `props`      → props declaradas dentro de src/lib (as "próprias").
 * - `type`       → texto como está no código; alias local (`type Size = …`) é expandido.
 * - `default`    → valor padrão da desestruturação na assinatura do componente
 *                  (ou `@default` do JSDoc, se não houver).
 * - `description`→ JSDoc da prop, quando existe.
 * - `control`    → só pra playground: boolean · enum (união de strings) · string · number.
 * - `inherited`  → props herdadas do HTML/React (extends). Nome → tipo, sem
 *                  handlers `on*` e sem `aria-*` (a página pode descrevê-las; a
 *                  tabela só mostra as herdadas que a página descreveu).
 *
 * Rodar: `bun run gen:props` (também roda dentro de `bun run build`, antes do tsc).
 * `--check` não grava: sai com erro se o arquivo commitado estiver desatualizado.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const libDir = resolve(root, 'src/lib');
const outFile = resolve(root, 'src/pages/api/props.generated.json');
const checkOnly = process.argv.includes('--check');

/** Componente cujo export público não segue o padrão `<Pasta>` / `<Pasta>Props`. */
const OVERRIDES = {
  Toast: { component: 'ToastStack', propsType: 'ToastStackProps' },
};
const SKIP_DIRS = new Set(['_shared', 'theming']);

const entries = readdirSync(libDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !SKIP_DIRS.has(d.name))
  .map((d) => d.name)
  .filter((name) => existsSync(resolve(libDir, name, `${name}.tsx`)))
  .sort();

const files = entries.map((name) => resolve(libDir, name, `${name}.tsx`));
const program = ts.createProgram(files, {
  target: ts.ScriptTarget.ES2023,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  types: [],
  skipLibCheck: true,
  noEmit: true,
});
const checker = program.getTypeChecker();

const isInLib = (fileName) => resolve(fileName).startsWith(libDir + sep);

/** Texto do nó sem comentários e com espaços normalizados. */
function cleanText(node) {
  return node
    .getText()
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^\| /, '')
    .replace(/\( /g, '(')
    .replace(/ \)/g, ')')
    .replace(/,\s*}/g, ' }')
    .replace(/;\s*}/g, ' }')
    .trim();
}

/** Expande `type Foo = …` declarado (e não exportado) no próprio arquivo. */
function typeText(typeNode, sf) {
  if (!typeNode) return 'unknown';
  if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName) && !typeNode.typeArguments) {
    const alias = sf.statements.find(
      (s) => ts.isTypeAliasDeclaration(s) && s.name.text === typeNode.typeName.text && !s.typeParameters,
    );
    const exported = alias?.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (alias && !exported) return typeText(alias.type, sf);
  }
  return cleanText(typeNode);
}

/** Controle de playground derivado do tipo resolvido. */
function controlFor(type) {
  const parts = type.isUnion() ? type.types : [type];
  const real = parts.filter((t) => !(t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)));
  if (real.length && real.every((t) => t.flags & ts.TypeFlags.BooleanLike)) return { kind: 'boolean' };
  if (real.length && real.every((t) => t.isStringLiteral())) {
    return { kind: 'enum', options: real.map((t) => t.value) };
  }
  if (real.length === 1 && real[0].flags & ts.TypeFlags.String) return { kind: 'string' };
  if (real.length === 1 && real[0].flags & ts.TypeFlags.Number) return { kind: 'number' };
  return undefined;
}

/** Função do componente: `function C(...)` ou `const C = forwardRef(…)`. */
function findComponentFn(sf, name) {
  for (const s of sf.statements) {
    if (ts.isFunctionDeclaration(s) && s.name?.text === name) return s;
    if (ts.isVariableStatement(s)) {
      for (const d of s.declarationList.declarations) {
        if (!ts.isIdentifier(d.name) || d.name.text !== name || !d.initializer) continue;
        let init = d.initializer;
        while (ts.isCallExpression(init)) init = init.arguments[0];
        if (init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) return init;
      }
    }
  }
  return undefined;
}

/**
 * Defaults da desestruturação: na assinatura do componente, em `const {…} = props`
 * no corpo, ou no painel interno que recebe `{...props}` (Drawer, Sheet) — qualquer
 * função do arquivo cujo 1º parâmetro é tipado com `<Comp>Props`.
 */
function destructuredDefaults(sf, componentFn, propsType) {
  const out = {};
  const collect = (pattern) => {
    for (const el of pattern.elements) {
      if (el.dotDotDotToken || !el.initializer) continue;
      const key = el.propertyName ?? el.name;
      if (ts.isIdentifier(key) && !(key.text in out)) out[key.text] = cleanText(el.initializer);
    }
  };
  const fromFn = (fn) => {
    const param = fn.parameters[0];
    if (!param) return;
    if (ts.isObjectBindingPattern(param.name)) return collect(param.name);
    if (!ts.isIdentifier(param.name) || !fn.body) return;
    const propsName = param.name.text;
    const visit = (node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isObjectBindingPattern(node.name) &&
        node.initializer &&
        ts.isIdentifier(node.initializer) &&
        node.initializer.text === propsName
      ) collect(node.name);
      ts.forEachChild(node, visit);
    };
    visit(fn.body);
  };
  if (componentFn) fromFn(componentFn);
  const visit = (node) => {
    if (ts.isFunctionLike(node) && node !== componentFn) {
      const t = node.parameters?.[0]?.type;
      // `<Comp>Props` puro ou numa interseção (painel interno com props extras: `DrawerProps & {…}`)
      const refs = t && ts.isIntersectionTypeNode(t) ? t.types : t ? [t] : [];
      if (refs.some((r) => ts.isTypeReferenceNode(r) && r.typeName.getText() === propsType)) fromFn(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

const result = {};
for (const dir of entries) {
  const { component = dir, propsType = `${dir}Props` } = OVERRIDES[dir] ?? {};
  const file = resolve(libDir, dir, `${dir}.tsx`);
  const sf = program.getSourceFile(file);
  const decl = sf.statements.find(
    (s) => (ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) && s.name.text === propsType,
  );
  if (!decl) {
    console.error(`gen-props: ${propsType} não encontrado em ${relative(root, file)}`);
    process.exit(1);
  }

  const type = checker.getTypeAtLocation(decl.name);
  const defaults = destructuredDefaults(sf, findComponentFn(sf, component), propsType);
  const props = [];
  const inherited = {};

  for (const sym of checker.getPropertiesOfType(type)) {
    const d = sym.valueDeclaration ?? sym.declarations?.[0];
    if (!d) continue;
    const name = sym.getName();
    const required = !(sym.flags & ts.SymbolFlags.Optional);
    const propType = checker.getTypeOfSymbolAtLocation(sym, decl);

    if (!isInLib(d.getSourceFile().fileName)) {
      inherited[name] = checker
        .typeToString(propType, decl, ts.TypeFormatFlags.NoTruncation)
        .replace(/import\("[^"]+"\)\./g, '')
        .replace(/ \| undefined$/, '');
      continue;
    }

    const description = ts.displayPartsToString(sym.getDocumentationComment(checker)).trim();
    const jsdocDefault = sym
      .getJsDocTags(checker)
      .find((t) => t.name === 'default')
      ?.text?.map((p) => p.text)
      .join('')
      .trim();
    const entry = {
      name,
      type: typeText(d.type, d.getSourceFile()),
      required,
    };
    const def = defaults[name] ?? jsdocDefault;
    if (def) entry.default = def;
    if (description) entry.description = description;
    const control = controlFor(propType);
    if (control?.kind === 'enum') {
      // mesma ordem em que os valores aparecem no código
      const at = (v) => entry.type.indexOf(`'${v}'`) >>> 0;
      control.options.sort((a, b) => at(a) - at(b));
    }
    if (control) entry.control = control;
    props.push(entry);
  }

  // ordem do código-fonte (o checker já devolve assim pras próprias)
  result[dir] = {
    component,
    propsType,
    source: relative(root, file).split(sep).join('/'),
    extends: ts.isInterfaceDeclaration(decl)
      ? (decl.heritageClauses ?? []).flatMap((h) => h.types.map((t) => cleanText(t)))
      : [],
    props,
    inherited: Object.fromEntries(Object.entries(inherited).sort(([a], [b]) => a.localeCompare(b))),
  };
}

const json = JSON.stringify(result, null, 2) + '\n';
const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : '';

if (checkOnly) {
  if (current !== json) {
    console.error('gen-props: props.generated.json desatualizado · rode `bun run gen:props`');
    process.exit(1);
  }
  console.log(`gen-props: ok · ${entries.length} componentes em dia`);
} else {
  if (current !== json) writeFileSync(outFile, json);
  const total = Object.values(result).reduce((n, c) => n + c.props.length, 0);
  console.log(`gen-props: ${entries.length} componentes · ${total} props próprias → ${relative(root, outFile)}`);
}
