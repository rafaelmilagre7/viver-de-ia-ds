import { describe, it, expect } from 'vitest';
import { detectLang, highlight, type TokenKind } from './highlight';

const SAMPLES = {
  tsx: `import { Button } from '@viverdeia/design-system';

// CTA principal
export function Hero({ count }: { count: number }) {
  const [open, setOpen] = useState<boolean>(count > 2);
  return (
    <Button variant="primary" size="lg" iconLeft={<ArrowRight size={14} />} onClick={() => setOpen(!open)}>
      Começar agora <strong>já</strong>
    </Button>
  );
}`,
  html: `<!-- No <head>, antes do bundle -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist">`,
  css: `/* Hover · cor e borda em quick */
.peca:hover {
  --via-rim: var(--via-material-regular-rim);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  color: #0A1F3B !important;
}
@media (max-width: 960px) {
  .peca { padding: 0 var(--via-space-4); }
}`,
  decls: `background: var(--via-material-regular-fill);
-webkit-backdrop-filter: var(--via-material-regular-blur);`,
  bash: `bun install
bunx vite --port 4321 --strictPort   # porta livre
git add src/a.ts && git commit -m "msg"`,
};

const kindsOf = (code: string, text: string): TokenKind[] =>
  highlight(code)
    .filter((t) => t.text.includes(text))
    .map((t) => t.kind);

describe('highlight', () => {
  it('nunca perde nem troca uma letra (copiar = o que se vê)', () => {
    for (const code of Object.values(SAMPLES)) {
      expect(highlight(code).map((t) => t.text).join('')).toBe(code);
    }
  });

  it('adivinha a linguagem pelo conteúdo', () => {
    expect(detectLang(SAMPLES.tsx)).toBe('tsx');
    expect(detectLang(SAMPLES.html)).toBe('tsx');
    expect(detectLang(SAMPLES.css)).toBe('css');
    expect(detectLang(SAMPLES.decls)).toBe('css');
    expect(detectLang(SAMPLES.bash)).toBe('bash');
  });

  it('TSX: palavra-chave, tag, atributo, string, comentário e comparação', () => {
    const t = SAMPLES.tsx;
    expect(kindsOf(t, 'import')).toContain('keyword');
    expect(kindsOf(t, "'@viverdeia/design-system'")).toEqual(['string']);
    expect(kindsOf(t, '// CTA principal')).toEqual(['comment']);
    expect(kindsOf(t, 'Button')).toContain('tag');
    expect(kindsOf(t, 'variant')).toEqual(['attr']);
    expect(kindsOf(t, '"primary"')).toEqual(['string']);
    // tag dentro de expressão de atributo e dentro do texto filho
    expect(kindsOf(t, 'ArrowRight')).toEqual(['tag']);
    expect(kindsOf(t, 'strong')).toEqual(['tag', 'tag']);
    // `<` de comparação e de genérico não abre tag
    expect(kindsOf(t, 'boolean')).toEqual(['plain']);
    expect(kindsOf(t, 'count')).not.toContain('tag');
  });

  it('CSS: seletor, propriedade, valor, at-rule e comentário', () => {
    const c = SAMPLES.css;
    expect(kindsOf(c, '.peca:hover')).toEqual(['tag']);
    expect(kindsOf(c, '-webkit-backdrop-filter')).toEqual(['attr']);
    expect(kindsOf(c, '--via-rim')).toEqual(['attr']);
    expect(kindsOf(c, '24px')).toEqual(['number']);
    expect(kindsOf(c, '#0A1F3B')).toEqual(['number']);
    expect(kindsOf(c, '!important')).toEqual(['keyword']);
    expect(kindsOf(c, '@media')).toEqual(['keyword']);
    expect(kindsOf(c, '/* Hover')).toEqual(['comment']);
    expect(kindsOf(SAMPLES.decls, 'background')).toEqual(['attr']);
  });

  it('bash: comando, flag, string e comentário', () => {
    const b = SAMPLES.bash;
    expect(kindsOf(b, 'bunx')).toEqual(['keyword']);
    expect(kindsOf(b, '--strictPort')).toEqual(['attr']);
    expect(kindsOf(b, '# porta livre')).toEqual(['comment']);
    expect(kindsOf(b, '"msg"')).toEqual(['string']);
    expect(highlight(b).filter((t) => t.kind === 'keyword').map((t) => t.text)).toEqual(['bun', 'bunx', 'git', 'git']);
  });
});
