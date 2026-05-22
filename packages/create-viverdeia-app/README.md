# create-viverdeia-app

Scaffold um novo projeto pré-configurado com o design system Viver de IA.

## Uso

```bash
bunx create-viverdeia-app meu-projeto
# ou
npx create-viverdeia-app meu-projeto
# ou interativo (pergunta o nome)
bunx create-viverdeia-app
```

## O que cria

```
meu-projeto/
├─ index.html          · anti-FOUC theme script
├─ package.json        · React 19 + Vite + TS + DS lib
├─ tsconfig.json       · strict
├─ vite.config.ts
├─ .gitignore
├─ README.md
└─ src/
   ├─ main.tsx         · ThemeProvider defaultMode="system"
   ├─ App.tsx          · hello world editorial
   └─ index.css        · tokens via --via-*
```

## Pré-requisitos

- Node ≥ 18 (ou bun ≥ 1.0)
- Acesso ao DS Viver de IA (registry interno ou GitHub package)

## Notas

- O template depende de `@viverdeia/design-system` — ajuste o path no `package.json`
  conforme onde a lib está acessível (registry, file:, GitHub URL, etc.).
- O DS é interno e não tem npm public — o template usa `file:../../viver-de-ia-ds`
  por padrão, assumindo que ambos projetos vivem no mesmo workspace.
- Pra projetos fora do monorepo, edite o `dependencies` pra apontar pra um
  GitHub release ou registry privado.

## Desenvolvimento

```bash
# Testar local (no monorepo do DS)
cd packages/create-viverdeia-app
node bin/index.mjs meu-app-teste

# O comando bunx funciona quando publicar/linkar
bunx --no-install create-viverdeia-app  # rodando da pasta
```
