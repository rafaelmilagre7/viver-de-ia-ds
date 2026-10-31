/* Páginas-modelo que a home mostra no mosaico.
   Fonte única: a home lê daqui, e scripts/home-thumbs.mjs tira a miniatura
   de cada uma (claro e escuro) pra public/home/<slug>-<tema>.webp.
   Página nova aqui → rode o script de novo. */

export type ShowcaseTile = {
  slug: string;
  /** o que a miniatura mostra (texto alternativo) · genérico de propósito:
      a página-modelo muda de título e o alt não pode ficar mentindo */
  alt: string;
  blurb: string;
};

export const SHOWCASES: ShowcaseTile[] = [
  {
    slug: 'lancamento',
    alt: 'Prévia da página de lançamento de plano: hero, chamada principal e números.',
    blurb: 'Pronta pra clonar: hero, método, planos e garantia.',
  },
  {
    slug: 'leaders-ai',
    alt: 'Prévia do site da Leaders AI Conference: hero com o título do evento.',
    blurb: 'Conferência com agenda, speakers e ingressos.',
  },
  {
    slug: 'aluno',
    alt: 'Prévia da área do aluno: módulo atual, progresso e agenda.',
    blurb: 'Painel do aluno com progresso e agenda.',
  },
  {
    slug: 'marketing',
    alt: 'Prévia do site de marketing: hero com título e cards de resultado.',
    blurb: 'O site institucional, com cases e planos.',
  },
  {
    slug: 'mentor',
    alt: 'Prévia do perfil do mentor: apresentação, números da mentoria e horários.',
    blurb: 'Especialidades, números e horários pra agendar.',
  },
  {
    slug: 'comunidade',
    alt: 'Prévia da comunidade: feed de conversas, canais e membros.',
    blurb: 'Feed, canais e membros.',
  },
  {
    slug: 'checkout',
    alt: 'Prévia do checkout: escolha do plano em etapas e resumo do pedido.',
    blurb: 'Etapas com o resumo do pedido sempre à vista.',
  },
];

/** Tamanho em que as miniaturas são gravadas (proporção da tela 1440×900) */
export const THUMB = { width: 1120, height: 700 } as const;
