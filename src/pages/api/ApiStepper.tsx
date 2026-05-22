import { useState } from 'react';
import { Stepper } from '../../lib/Stepper/Stepper';
import { Button } from '../../lib/Button/Button';
import ComponentDoc from '../../components/docs/ComponentDoc';

function StepperDemo() {
  const [step, setStep] = useState(1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Stepper
        ariaLabel="Onboarding"
        current={step}
        onStepClick={setStep}
        steps={[
          { id: 'profile', label: 'Perfil', description: 'Quem é você' },
          { id: 'role', label: 'Função', description: 'Onde atua' },
          { id: 'plan', label: 'Plano', description: 'Como vamos te apoiar' },
          { id: 'done', label: 'Pronto', description: 'Comece agora' },
        ]}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="sm" variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
          Voltar
        </Button>
        <Button size="sm" onClick={() => setStep(Math.min(step + 1, 3))}>
          Avançar
        </Button>
      </div>
    </div>
  );
}

export default function ApiStepper() {
  return (
    <ComponentDoc
      eyebrow="api · stepper"
      name="Stepper"
      headline="wizard editorial · horizontal/vertical · completed/current/upcoming"
      description="Stepper pra fluxos sequenciais (onboarding, checkout, multi-step form). 3 estados visuais: completed (check + ring navy), current (number + glow), upcoming (number + muted). Permite onStepClick pra voltar."
      importLine={`import { Stepper, type StepperProps, type StepItem } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-stepper', description: 'Container · role=list horizontal/vertical' },
        { part: 'via-stepper__step', description: 'Item · indicator + copy' },
        { part: 'via-stepper__indicator', description: 'Círculo 28×28 · check (completed) ou número' },
        { part: 'via-stepper__copy', description: 'Label + description vertical' },
        { part: 'via-stepper__connector', description: 'Linha entre steps · cor depende do estado' },
      ]}
      props={[
        { name: 'steps', type: 'StepItem[]', required: true, description: 'Array { id, label, description? }' },
        { name: 'current', type: 'number', required: true, description: 'Índice 0-based do passo em progresso' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'horizontal=hero/dashboard · vertical=settings/wizard mobile' },
        { name: 'onStepClick', type: '(index: number) => void', description: 'Permite voltar pra passos anteriores · sem essa prop, é só visual' },
        { name: 'ariaLabel', type: 'string', default: "'Progresso'", description: 'Label da navegação' },
        { name: 'className', type: 'string', description: 'Classe custom no container' },
      ]}
      examples={[
        {
          title: 'Onboarding 4 steps · clique pra voltar',
          preview: <StepperDemo />,
          code: `const [step, setStep] = useState(1);

<Stepper
  ariaLabel="Onboarding"
  current={step}
  onStepClick={setStep}
  steps={[
    { id: 'profile', label: 'Perfil',  description: 'Quem é você' },
    { id: 'role',    label: 'Função',  description: 'Onde atua' },
    { id: 'plan',    label: 'Plano',   description: 'Como vamos te apoiar' },
    { id: 'done',    label: 'Pronto',  description: 'Comece agora' },
  ]}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use pra fluxo de 3-5 passos', description: 'Onboarding, checkout, multi-step form com ordem importante.' },
          dont: { title: 'Não use pra navegação livre', description: 'Use Tabs · stepper implica sequência obrigatória.' },
        },
        {
          do: { title: 'Permita voltar via onStepClick', description: 'User clica em "Perfil" pra revisar · UX padrão de wizard moderno.' },
          dont: { title: 'Não permita pular pra steps futuros', description: 'Steps upcoming sem dados completos · gera erro · trave navegação forward.' },
        },
      ]}
      a11y={[
        <>role=list (nav semântica) + per-step role=listitem</>,
        <>Completed steps com aria-current="false" + aria-label sufixo "concluído"</>,
        <>Current step com aria-current="step"</>,
        <>Upcoming steps com aria-disabled=true se não clicável</>,
        <>Indicator com aria-hidden=true · label texto duplica info</>,
      ]}
      related={[
        { name: 'Tabs', description: 'Navegação livre sem ordem obrigatória', href: '/api/tabs' },
        { name: 'Progress', description: 'Progresso linear contínuo (0-100%)', href: '/api/progress' },
        { name: 'Breadcrumb', description: 'Hierarquia de localização · não sequência', href: '/api/breadcrumb' },
      ]}
    />
  );
}
