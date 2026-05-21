# Release workflow · `@viverdeia/design-system`

Como cortar uma nova versão da library e publicar no npm.

---

## Pré-requisitos (uma vez)

### 1 · Conta npm

Crie ou use uma conta no [npmjs.com](https://www.npmjs.com/) que tenha acesso ao scope `@viverdeia`:

- Conta atual: `rafaelmilagre` (ou similar · ver `npm whoami`)
- Scope: precisa criar uma organização `viverdeia` em https://www.npmjs.com/org/create (ou usar nome alternativo se já tomado)

### 2 · NPM access token

1. Acesse https://www.npmjs.com/settings/<user>/tokens
2. **Generate New Token** → tipo **Automation** (não expira, ideal pra CI)
3. Copie o token (formato `npm_...`)

### 3 · Adicionar como GitHub secret

```bash
# da raiz do repo
gh secret set NPM_TOKEN
# cola o token quando pedir, ENTER
```

Verifique:

```bash
gh secret list
# deve listar NPM_TOKEN
```

### 4 · Provenance (recomendado · zero config extra)

O workflow `release.yml` já está configurado pra publicar com `--provenance`. Provenance assina o pacote com a identidade do GitHub Actions, mostrando publicamente que aquela versão veio daquele commit. Aparece no npmjs.com como um badge verificado.

---

## Cortar uma release

### Local

```bash
# 1. bump da versão em package.json + CHANGELOG.md
#    (manualmente · ou usar `bun pm version <patch|minor|major>`)

# 2. validar tudo localmente
bun run lint
bun run test:unit       # 28/28
bun run build           # 192/192 visual + a11y + typecheck
bun run build:lib       # gera dist/lib/

# 3. smoke test do bundle (opcional mas recomendado)
node scripts/smoke-test-lib.mjs

# 4. commit
git add package.json CHANGELOG.md
git commit -m "release: v0.4.0"

# 5. tag + push (dispara o workflow release.yml)
git tag v0.4.0
git push origin main --tags
```

O `release.yml` então:
1. Roda em ubuntu-latest
2. Instala deps + builds a library
3. `npm publish --access public --provenance`
4. Cria um GitHub Release com auto-generated notes

### Acompanhar

```bash
# status do workflow
gh run watch

# ou abrir o release page
gh release view v0.4.0 --web
```

---

## Smoke test do bundle (manual)

Antes de tag, valide localmente que o pacote publicável tá saudável:

```bash
bun run build:lib
node scripts/smoke-test-lib.mjs
```

Esperado:

```
✓ index.js exists      (68 KB)
✓ index.cjs exists     (51 KB)
✓ style.css exists     (65 KB)
✓ tokens.css exists    (18 KB)
✓ tokens.json valid    (132 tokens)
✓ types/index.d.ts     ok
✓ ESM import OK · 31 named exports
✓ package.json valid · exports map complete
```

---

## Versionamento semântico

| Mudança | Bump |
|---|---|
| Bug fix, regressão visual sem mudança de API | **patch** (0.3.0 → 0.3.1) |
| Componente novo, prop nova opcional, novo token | **minor** (0.3.0 → 0.4.0) |
| Prop removida, rename de export, mudança breaking de comportamento | **major** (0.3.0 → 1.0.0) |

A v1.0.0 marca quando a library entra em produção em pelo menos 1 projeto Viver de IA e ganha contrato de estabilidade.

---

## Rollback / yank

Se publicar versão quebrada e ninguém puxou ainda:

```bash
npm unpublish @viverdeia/design-system@0.4.0
# só funciona até 72h após publicar
```

Pra versões mais antigas, use `deprecate` (não remove, mas avisa):

```bash
npm deprecate @viverdeia/design-system@0.4.0 "Versão com bug crítico · use 0.4.1+"
```

---

## Checklist final antes de cada release

- [ ] `CHANGELOG.md` atualizado com a seção `## [x.y.z] · YYYY-MM-DD`
- [ ] `package.json` version bumped
- [ ] `bun run lint` · 0 errors (warnings OK)
- [ ] `bun run test:unit` · 28+/28+ passing
- [ ] `bun run build` · build limpo
- [ ] `bun run test:visual` · 192/192 (local · macOS)
- [ ] `bun run test:a11y` · 96/96
- [ ] `bun run build:lib` · dist/lib/ gerado sem warnings
- [ ] Smoke test rodou sem erros
- [ ] Tag formato `vX.Y.Z` criada e empurrada
- [ ] CI green em https://github.com/rafaelmilagre7/viver-de-ia-ds/actions
