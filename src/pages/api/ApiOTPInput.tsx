import { useState } from 'react';
import { OTPInput } from '../../lib/OTPInput/OTPInput';
import ComponentDoc from '../../components/docs/ComponentDoc';

function OTPDemo() {
  const [code, setCode] = useState('');
  return (
    <OTPInput
      length={6}
      value={code}
      onChange={setCode}
      label="Código de verificação"
      hint="Enviamos um código de 6 dígitos pro seu e-mail."
      onComplete={(c) => console.log('completo:', c)}
    />
  );
}

export default function ApiOTPInput() {
  return (
    <ComponentDoc
      eyebrow="api · otp-input"
      name="OTPInput"
      headline="código de verificação · auto-focus next · paste detecta"
      description="OTPInput pra 2FA, magic links, confirmação de identidade. Cada dígito em campo separado · auto-focus next ao digitar · backspace navega pra trás · paste detecta código completo. Editorial: glass + spring focus."
      importLine={`import { OTPInput, type OTPInputProps } from '@viverdeia/design-system';`}
      anatomy={[
        { part: 'via-otp', description: 'Container · label + grid horizontal de campos + hint' },
        { part: 'via-otp__cell', description: 'Cada dígito · 40×48 · glass · focus ring spring' },
        { part: 'auto-focus', description: 'Digit avança · backspace recua · arrow keys navegam' },
        { part: 'paste detection', description: 'Cole código completo num campo · auto-fills todos' },
      ]}
      props={[
        { name: 'length', type: 'number', default: '6', description: 'Quantidade de dígitos (4 ou 6 são padrão)' },
        { name: 'value', type: 'string', description: 'Valor controlado · sempre String com .length=length' },
        { name: 'onChange', type: '(value: string) => void', description: 'Callback a cada mudança (mesmo incompleto)' },
        { name: 'onComplete', type: '(value: string) => void', description: 'Callback quando todos os dígitos preenchidos' },
        { name: 'label', type: 'string', description: 'Label visível acima' },
        { name: 'hint', type: 'string', description: 'Texto secundário abaixo · explica origem do código' },
        { name: 'error', type: 'boolean', default: 'false', description: 'true = cells viram danger ring' },
        { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Foca primeiro cell ao montar' },
        { name: 'inputType', type: "'text' | 'numeric'", default: "'numeric'", description: 'numeric=keyboard numérico mobile · text=alfanumérico' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Bloqueado' },
      ]}
      examples={[
        {
          title: '6 dígitos · onComplete + paste detection',
          preview: <OTPDemo />,
          code: `const [code, setCode] = useState('');

<OTPInput
  length={6}
  value={code}
  onChange={setCode}
  label="Código de verificação"
  hint="Enviamos um código de 6 dígitos pro seu e-mail."
  onComplete={(code) => verify(code)}
/>`,
        },
      ]}
      dosDonts={[
        {
          do: { title: 'Use length=6 pra 2FA/magic link', description: 'Padrão de mercado · 4 dígitos = força bruta viável · 6 é o sweet spot.' },
          dont: { title: 'Não use OTPInput pra senha', description: 'Sem mask · pra senha use Input type=password.' },
        },
        {
          do: { title: 'Hint diz origem do código', description: '"Enviamos pro seu e-mail" · usuário sabe onde procurar.' },
          dont: { title: 'Não use sem onComplete handler', description: 'Componente exige validação · onComplete dispara ao terminar.' },
        },
      ]}
      a11y={[
        <>Cada cell é input nativo · keyboard nav padrão</>,
        <>inputmode=numeric ativa teclado numérico em mobile</>,
        <>aria-label="Dígito 1 de 6" em cada cell · screen reader contextualiza</>,
        <>autoComplete="one-time-code" ativa preenchimento automático em iOS/Android</>,
      ]}
      related={[
        { name: 'Input', description: 'Pra texto livre · não código fixo', href: '/api/input' },
        { name: 'AuthFlow pattern', description: 'Login/signup completo com OTP', href: '/patterns/auth-flow' },
      ]}
    />
  );
}
