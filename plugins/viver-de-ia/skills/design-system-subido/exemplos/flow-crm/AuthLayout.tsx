import { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { AuthShell } from "./AuthShell";
import { usePrimeiroAcesso } from "@/hooks/usePrimeiroAcesso";

/**
 * Tela de /auth no DS SUBIDO: a mesma do My Dashboard, adaptada ao CRM.
 * Formulário à esquerda (marca, eyebrow, título, abas Entrar / Criar conta) e,
 * em telas largas, o palco navy animado à direita.
 *
 * Instância nova (nenhum cadastro ainda): abre direto em "Criar administrador",
 * porque o primeiro cadastro é quem vira administrador da plataforma. É o caso de
 * todo projeto recém-remixado, que antes caía num "Entrar" sem conta nenhuma.
 * Depois disso, a tela é a de sempre: login, com o cadastro na segunda aba.
 */
export function AuthLayout() {
  const { primeiroAcesso, carregando } = usePrimeiroAcesso();
  const [isActive, setIsActive] = useState(false);

  // Só empurra para o cadastro quando a resposta chega; enquanto isso mostra o
  // login, que é o caso normal.
  useEffect(() => {
    // ?cadastro=1 é o link do convite: abre direto em "Criar conta".
    if (primeiroAcesso || new URLSearchParams(window.location.search).has("cadastro")) setIsActive(true);
  }, [primeiroAcesso]);

  const mode = isActive ? "register" : "login";
  const eyebrow = mode === "login" ? "Entrar" : primeiroAcesso ? "Primeiro acesso" : "Criar conta";
  const title =
    mode === "login"
      ? "Entre no seu CRM."
      : primeiroAcesso
        ? "Configure a sua instalação."
        : "Crie sua conta.";
  const lead =
    mode === "login"
      ? "Contatos, negócios e conversas da sua equipe, no mesmo lugar."
      : primeiroAcesso
        ? "Esta instância ainda não tem administrador. A conta criada aqui vai configurar a empresa."
        : "O cadastro é por convite. Use o e-mail que o administrador convidou.";

  return (
    <AuthShell
      eyebrow={eyebrow}
      title={title}
      lead={lead}
      trocaKey={mode}
      testId={carregando ? "auth-carregando" : primeiroAcesso ? "auth-primeiro-acesso" : "auth-login"}
    >
      <div
        className="lsf-seg lsf-in"
        style={{ "--i": 4 } as React.CSSProperties}
        data-mode={mode}
        role="tablist"
        aria-label="Entrar ou criar conta"
      >
        <span className="lsf-seg-thumb" aria-hidden="true" />
        <button type="button" role="tab" aria-selected={mode === "login"} onClick={() => setIsActive(false)}>
          Entrar
        </button>
        <button type="button" role="tab" aria-selected={mode === "register"} onClick={() => setIsActive(true)}>
          {primeiroAcesso ? "Criar administrador" : "Criar conta"}
        </button>
      </div>

      <div className="lsf-in" style={{ "--i": 5 } as React.CSSProperties}>
        {mode === "login" ? <LoginForm /> : <SignupForm primeiroAcesso={primeiroAcesso} />}
      </div>
    </AuthShell>
  );
}
