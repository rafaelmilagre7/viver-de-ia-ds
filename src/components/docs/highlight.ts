/**
 * Realce de sintaxe mínimo pros blocos de código da doc (TSX/JSX, HTML, CSS,
 * bash). Sem dependência: um tokenizador por linguagem que devolve trechos
 * { tipo, texto }. A cor fica no CSS (docs.css) e respeita a paleta restrita
 * — nada de matiz: navy, cinzas, peso e opacidade.
 *
 * Garantia: juntar os textos dos trechos devolve o código original, letra
 * por letra (copiar e o leitor de tela continuam lendo o mesmo texto).
 */

export type TokenKind =
  | 'plain'
  | 'keyword' // palavra reservada, at-rule, comando do shell
  | 'tag' // elemento JSX/HTML, seletor CSS
  | 'attr' // atributo, propriedade CSS, flag do shell
  | 'string'
  | 'number'
  | 'comment'
  | 'punct';

export interface Token {
  kind: TokenKind;
  text: string;
}

export type Lang = 'tsx' | 'css' | 'bash';

const KEYWORDS = new Set(
  (
    'import from export default const let var function return if else for while do ' +
    'type interface extends implements new class as async await true false null undefined ' +
    'typeof keyof in of switch case break continue this void throw try catch finally satisfies'
  ).split(' '),
);

const SHELL_START = /^(\$ |#!|(bun|bunx|npm|npx|pnpm|yarn|git|claude|curl|cd|node|brew|cp|mv|mkdir|open|vercel)\b)/;
const CSS_RULE = /^\s*[@.#:*[a-z][^\n{};=()]*\{/m;
const CSS_DECL = /^\s*-{0,2}[a-z][\w-]*\s*:\s*[^;\n]+;/m;
const JS_HINT = /\b(import|export|const|let|function|return)\b|=>|<[A-Z]|className=/;

/** Adivinha a linguagem pelo conteúdo (a doc não declara) */
export function detectLang(code: string): Lang {
  const first = code.trimStart().split('\n', 1)[0];
  if (SHELL_START.test(first)) return 'bash';
  if (!JS_HINT.test(code) && !first.startsWith('<') && (CSS_RULE.test(code) || CSS_DECL.test(code))) return 'css';
  return 'tsx';
}

export function highlight(code: string, lang: Lang = detectLang(code)): Token[] {
  const out: Token[] = [];
  const push = (kind: TokenKind, text: string) => {
    if (!text) return;
    const last = out[out.length - 1];
    if (last && last.kind === kind) last.text += text;
    else out.push({ kind, text });
  };
  if (lang === 'css') css(code, push);
  else if (lang === 'bash') bash(code, push);
  else tsx(code, push);
  return out;
}

type Push = (kind: TokenKind, text: string) => void;

/** Lê uma string a partir de `i` (aspas em code[i]) · respeita escape */
function readString(code: string, i: number): number {
  const q = code[i];
  let j = i + 1;
  while (j < code.length && code[j] !== q) {
    if (code[j] === '\\') j++;
    else if (q !== '`' && code[j] === '\n') break;
    j++;
  }
  return Math.min(j + 1, code.length);
}

const IDENT = /[A-Za-z_$][\w$]*/y;
const ATTR = /[A-Za-z_:@][\w:.-]*/y;
const NUMBER = /\d[\d_]*(\.\d+)?([eE][+-]?\d+)?[a-z%]*/y;

function match(re: RegExp, code: string, i: number): string | null {
  re.lastIndex = i;
  const m = re.exec(code);
  return m ? m[0] : null;
}

/* ---------------- TSX / JSX / HTML ---------------- */
function tsx(code: string, push: Push) {
  let i = 0;
  let inTag = false; // dentro de <Tag ...>
  let braceDepth = 0; // { } dentro da tag (expressão de atributo)
  const outer: number[] = []; // tag aberta dentro de expressão de atributo: estado da tag de fora
  let childDepth = 0; // dentro dos filhos de um elemento (texto JSX/HTML)
  // o `<` abre tag quando vem depois de operador/palavra-chave/início, nunca de valor
  // (a < b, useState<T>) — exceto `</` e dentro dos filhos de um elemento
  let lastSignificant: TokenKind | 'value' | null = null;
  let closingTag = false; // a tag aberta agora é </…>
  const endTag = (selfClosing: boolean, closing: boolean) => {
    if (!selfClosing) childDepth += closing ? -1 : 1;
    childDepth = Math.max(0, childDepth);
    if (outer.length) {
      braceDepth = outer.pop()!;
      inTag = true;
    } else inTag = false;
    closingTag = false;
    lastSignificant = 'punct';
  };

  while (i < code.length) {
    const c = code[i];
    const rest2 = code.slice(i, i + 2);

    if (code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4);
      const j = end < 0 ? code.length : end + 3;
      push('comment', code.slice(i, j));
      i = j;
      continue;
    }
    if (rest2 === '//' && !(inTag && braceDepth === 0)) {
      const end = code.indexOf('\n', i);
      const j = end < 0 ? code.length : end;
      push('comment', code.slice(i, j));
      i = j;
      continue;
    }
    if (rest2 === '/*') {
      const end = code.indexOf('*/', i + 2);
      const j = end < 0 ? code.length : end + 2;
      push('comment', code.slice(i, j));
      i = j;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const j = readString(code, i);
      push('string', code.slice(i, j));
      i = j;
      lastSignificant = 'value';
      continue;
    }

    // abertura/fechamento de tag
    const next = code[i + 1] ?? '';
    const canOpen = !inTag || braceDepth > 0;
    const looksTag =
      next === '/' || ((lastSignificant !== 'value' || childDepth > 0) && /[A-Za-z>!]/.test(next));
    if (c === '<' && canOpen && looksTag) {
      if (inTag) outer.push(braceDepth);
      closingTag = next === '/';
      push('punct', closingTag ? '</' : '<');
      i += closingTag ? 2 : 1;
      const name = match(/[A-Za-z][\w.:-]*/y, code, i);
      if (name) {
        push('tag', name);
        i += name.length;
      }
      inTag = true;
      braceDepth = 0;
      lastSignificant = 'punct';
      continue;
    }
    if (inTag && braceDepth === 0) {
      if (rest2 === '/>') {
        push('punct', '/>');
        i += 2;
        endTag(true, false);
        continue;
      }
      if (c === '>') {
        push('punct', '>');
        i++;
        endTag(false, closingTag);
        continue;
      }
      const attr = match(ATTR, code, i);
      if (attr) {
        push('attr', attr);
        i += attr.length;
        continue;
      }
    }

    if (c === '{') braceDepth += inTag ? 1 : 0;
    if (c === '}' && inTag && braceDepth > 0) braceDepth--;

    const ident = match(IDENT, code, i);
    if (ident) {
      const kw = KEYWORDS.has(ident);
      push(kw ? 'keyword' : 'plain', ident);
      i += ident.length;
      lastSignificant = kw && !['true', 'false', 'null', 'undefined', 'this'].includes(ident) ? 'keyword' : 'value';
      continue;
    }
    const num = match(NUMBER, code, i);
    if (num) {
      push('number', num);
      i += num.length;
      lastSignificant = 'value';
      continue;
    }
    if (/\s/.test(c)) {
      push('plain', c);
      i++;
      continue;
    }
    push('punct', c);
    i++;
    lastSignificant = c === ')' || c === ']' ? 'value' : 'punct';
  }
}

/* ---------------- CSS ---------------- */
function css(code: string, push: Push) {
  let i = 0;
  // sem chave nenhuma = lista de declarações solta (trecho de receita)
  let depth = code.includes('{') ? 0 : 1;
  let inValue = false;

  while (i < code.length) {
    const c = code[i];
    if (code.startsWith('/*', i)) {
      const end = code.indexOf('*/', i + 2);
      const j = end < 0 ? code.length : end + 2;
      push('comment', code.slice(i, j));
      i = j;
      continue;
    }
    if (c === '"' || c === "'") {
      const j = readString(code, i);
      push('string', code.slice(i, j));
      i = j;
      continue;
    }
    if (/\s/.test(c)) {
      push('plain', c);
      i++;
      continue;
    }
    if (c === '{') {
      push('punct', c);
      depth++;
      inValue = false;
      i++;
      continue;
    }
    if (c === '}') {
      push('punct', c);
      depth = Math.max(0, depth - 1);
      inValue = false;
      i++;
      continue;
    }
    if (c === ';') {
      push('punct', c);
      inValue = false;
      i++;
      continue;
    }

    // at-rule
    if (c === '@') {
      const w = match(/@[\w-]+/y, code, i)!;
      push('keyword', w);
      i += w.length;
      continue;
    }

    if (!inValue) {
      // seletor ou propriedade? seletor = o próximo { vem antes de ; ou }
      const nextBrace = code.indexOf('{', i);
      const nextEnd = code.slice(i).search(/[;}]/);
      const isSelector = depth === 0 || (nextBrace >= 0 && (nextEnd < 0 || nextBrace < i + nextEnd));
      if (isSelector) {
        const j = nextBrace < 0 ? code.length : nextBrace;
        // espaço antes do { fica fora do seletor
        const sel = code.slice(i, j).replace(/\s+$/, '');
        push('tag', sel);
        i += sel.length;
        continue;
      }
      const prop = match(/-{0,2}[A-Za-z][\w-]*/y, code, i);
      if (prop) {
        push('attr', prop);
        i += prop.length;
        continue;
      }
      if (c === ':') {
        push('punct', c);
        inValue = true;
        i++;
        continue;
      }
    }

    if (code.startsWith('!important', i)) {
      push('keyword', '!important');
      i += 10;
      continue;
    }
    const num = match(/-?\d*\.?\d+[a-z%]*/y, code, i);
    if (num && !/[\w-]/.test(code[i - 1] ?? '')) {
      push('number', num);
      i += num.length;
      continue;
    }
    if (c === '#') {
      const hex = match(/#[0-9a-fA-F]{3,8}\b/y, code, i);
      if (hex) {
        push('number', hex);
        i += hex.length;
        continue;
      }
    }
    const word = match(/-{0,2}[A-Za-z][\w-]*/y, code, i);
    if (word) {
      push('plain', word);
      i += word.length;
      continue;
    }
    push('punct', c);
    i++;
  }
}

/* ---------------- bash ---------------- */
function bash(code: string, push: Push) {
  let i = 0;
  let atCommand = true; // próxima palavra é o comando
  while (i < code.length) {
    const c = code[i];
    if (c === '\n') {
      push('plain', c);
      i++;
      atCommand = true;
      continue;
    }
    if (/\s/.test(c)) {
      push('plain', c);
      i++;
      continue;
    }
    if (c === '#' && (i === 0 || /\s/.test(code[i - 1]))) {
      const end = code.indexOf('\n', i);
      const j = end < 0 ? code.length : end;
      push('comment', code.slice(i, j));
      i = j;
      continue;
    }
    if (c === '"' || c === "'") {
      const j = readString(code, i);
      push('string', code.slice(i, j));
      i = j;
      atCommand = false;
      continue;
    }
    if (atCommand && code.startsWith('$ ', i)) {
      push('punct', '$');
      i++;
      continue;
    }
    if (c === '&' || c === '|' || c === ';') {
      const op = match(/&&|\|\||[|;&]/y, code, i)!;
      push('punct', op);
      i += op.length;
      atCommand = true;
      continue;
    }
    const word = match(/[^\s"'|;&]+/y, code, i)!;
    push(atCommand ? 'keyword' : word.startsWith('-') ? 'attr' : 'plain', word);
    i += word.length;
    atCommand = false;
  }
}
