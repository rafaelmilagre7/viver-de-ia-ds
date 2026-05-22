#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout, exit } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_DIR = resolve(__dirname, '..', 'template');

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  navy: '\x1b[38;5;24m',
  muted: '\x1b[38;5;245m',
  green: '\x1b[38;5;36m',
};

const c = (color, text) => `${COLORS[color] || ''}${text}${COLORS.reset}`;

function copyRecursive(src, dest, transforms = {}) {
  if (statSync(src).isDirectory()) {
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src)) {
      copyRecursive(join(src, entry), join(dest, entry), transforms);
    }
  } else {
    const isText = /\.(json|md|tsx?|jsx?|css|html|env|gitignore)$/i.test(src);
    if (isText && Object.keys(transforms).length > 0) {
      let content = readFileSync(src, 'utf8');
      for (const [key, value] of Object.entries(transforms)) {
        content = content.replaceAll(`{{${key}}}`, value);
      }
      writeFileSync(dest, content);
    } else {
      copyFileSync(src, dest);
    }
  }
}

async function prompt(question, defaultValue) {
  const rl = createInterface({ input: stdin, output: stdout });
  const suffix = defaultValue ? c('muted', ` (${defaultValue})`) : '';
  const answer = await rl.question(`${c('navy', '?')} ${question}${suffix} `);
  rl.close();
  return answer.trim() || defaultValue || '';
}

function isValidPackageName(name) {
  return /^[a-z0-9][a-z0-9-_]*$/.test(name);
}

async function main() {
  console.log('');
  console.log(c('bold', c('navy', '  Viver de IA · create-viverdeia-app')));
  console.log(c('muted', '  starter editorial · React + TypeScript + Vite + @viverdeia/design-system'));
  console.log('');

  // 1. Project name (também usado como folder)
  const cliName = process.argv[2];
  let projectName = cliName;
  if (!projectName) {
    projectName = await prompt('Nome do projeto?', 'meu-app');
  }
  if (!isValidPackageName(projectName)) {
    console.error(c('muted', `  ✗ Nome inválido: "${projectName}". Use minúsculas, números, hífen ou underline.`));
    exit(1);
  }

  const target = resolve(process.cwd(), projectName);
  if (existsSync(target)) {
    const files = readdirSync(target);
    if (files.length > 0) {
      console.error(c('muted', `  ✗ Pasta "${projectName}" já existe e não está vazia.`));
      exit(1);
    }
  } else {
    mkdirSync(target, { recursive: true });
  }

  // 2. Substitui placeholders
  const transforms = {
    PROJECT_NAME: projectName,
    YEAR: String(new Date().getFullYear()),
  };

  console.log('');
  console.log(c('muted', `  ↳ copiando template em ${target}`));
  copyRecursive(TEMPLATE_DIR, target, transforms);

  // 3. Renomear _gitignore → .gitignore (npm strip dot-files)
  const dotIgnore = join(target, '_gitignore');
  if (existsSync(dotIgnore)) {
    const final = join(target, '.gitignore');
    copyFileSync(dotIgnore, final);
    try { unlinkSync(dotIgnore); } catch { /* ignore */ }
  }

  console.log('');
  console.log(c('green', '  ✓ pronto'));
  console.log('');
  console.log(c('bold', '  próximos passos:'));
  console.log('');
  console.log(c('navy', `    cd ${projectName}`));
  console.log(c('navy', '    bun install      # ou npm/pnpm'));
  console.log(c('navy', '    bun dev'));
  console.log('');
  console.log(c('muted', '  ↳ abra http://localhost:5173 quando o dev server subir'));
  console.log(c('muted', '  ↳ DS docs · http://localhost:5173 do projeto principal'));
  console.log('');
}

main().catch((err) => {
  console.error(c('muted', `  ✗ Erro: ${err.message}`));
  exit(1);
});
