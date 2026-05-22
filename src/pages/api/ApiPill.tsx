import { Pill } from '../../lib/Pill/Pill';
import ComponentDoc from '../../components/docs/ComponentDoc';

export default function ApiPill() {
  return (
    <ComponentDoc
      eyebrow="api · pill"
      name="Pill"
      headline="11px lowercase peso 500 · glass · sem caps lock"
      description="Pill canônica do Viver de IA. 11px font-size · weight 500 · letter-spacing -0.004em · nowrap · glass surface backdrop-blur 8px · SEM caps lock · SEM bolinha decorativa. Live variant tem dot coral pulsante + ring expansivo. Use pra status, tags, metadata."
      importLine={`import { Pill, type PillProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-pill', description: 'Container pill · padding 4×11 · border-radius 999px · glass backdrop' },
        { part: 'via-pill__icon', description: 'Slot opcional pra ícone antes do label (mr 5px)' },
        { part: 'via-pill__live-dot', description: 'Só em variant="live" · dot coral 6px + ring expansivo' },
      ]}
      props={[
        { name: 'variant', type: "'default' | 'attn' | 'churn' | 'live' | 'success'", default: "'default'", description: 'Tom semântico · default=navy soft, attn=warning, churn=destrutivo coral, success=navy editorial, live=broadcast navy+coral dot' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'sm=10.5px / md=11px' },
        { name: 'icon', type: 'ReactNode', description: 'Ícone antes do label · Lucide stroke 1.8' },
        { name: 'children', type: 'ReactNode', required: true, description: 'Label da pill · sentence-case ou lowercase · nunca CAPS LOCK' },
      ]}
      variants={[
        { name: 'default', label: 'Navy soft glass', description: 'Padrão · status neutro · "em produção", "verificado"' },
        { name: 'attn', label: 'Warning editorial', description: 'Atenção real · "expira em 8 dias", "requer revisão"' },
        { name: 'churn', label: 'Destrutivo coral', description: 'Risco/perda real · "risco churn", "fora do ar"' },
        { name: 'success', label: 'Conclusão navy', description: 'Estado completo · "pago", "concluído" (sem semáforo verde)' },
        { name: 'live', label: 'Broadcast ao vivo', description: 'Navy + dot coral pulsante · use SÓ em transmissão real' },
      ]}
      examples={[
        {
          title: 'Status canônicos',
          preview: (
            <>
              <Pill variant="default">em produção</Pill>
              <Pill variant="attn">expira em 8 dias</Pill>
              <Pill variant="churn">risco churn</Pill>
              <Pill variant="success">pago</Pill>
            </>
          ),
          code: `<Pill variant="default">em produção</Pill>
<Pill variant="attn">expira em 8 dias</Pill>
<Pill variant="churn">risco churn</Pill>
<Pill variant="success">pago</Pill>`,
        },
        {
          title: 'Live broadcast',
          description: 'Use SÓ pra estado ao vivo real (transmissão, gravação ativa, presence online).',
          preview: <Pill variant="live"><em>ao vivo agora</em></Pill>,
          code: `<Pill variant="live"><em>ao vivo agora</em></Pill>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'lowercase ou sentence-case', description: 'Editorial calmo · respeita peso da tipografia.' },
          dont: { title: 'Não use "VERIFICADO" caps lock', description: 'Cliché bootstrap · viola padrão editorial do DS.' },
        },
        {
          do: { title: 'Use live SÓ em broadcast real', description: 'Transmissão, gravação ativa, online presence.' },
          dont: { title: 'Não use bolinha decorativa em pill comum', description: 'Bolinha = sinal de live REAL · em outros lugares confunde.' },
        },
      ]}
      a11y={[
        <>Sem role específica · contextualize com aria-label se for status crítico</>,
        <>Contraste AA garantido em todas as variants · navy 7.5:1 em fundo white</>,
        <>Pulse do dot live respeita prefers-reduced-motion (desativa)</>,
        <>Live pill tem aria-live="polite" implícito · screen reader anuncia mudança</>,
      ]}
      related={[
        { name: 'Avatar', description: 'Pill + avatar formam chip de usuário', href: '/api/avatar' },
        { name: 'Tag', description: 'Tag editorial · sinônimo de pill em alguns contextos', href: '/components/tags' },
        { name: 'Badge', description: 'Contador numérico sobreposto (ex: notifications)', href: '/components/badges' },
      ]}
    />
  );
}
