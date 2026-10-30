import type { ReactNode } from "react";
import { SidebarBrand } from "@/components/layout/AppShell";
import "@/styles/ds/auth.css";

/**
 * Moldura das telas de acesso no DS SUBIDO (login, redefinir senha, aguardando
 * aprovação): coluna da esquerda com marca, eyebrow, título e texto, e o palco
 * navy animado à direita em telas largas. A mesma do My Dashboard.
 *
 * Use para TODA tela fora do app: login/cadastro (com abas), redefinir senha,
 * aguardando aprovação, convite expirado, confirmação de e-mail.
 *
 * `trocaKey` refaz a entrada animada do cabeçalho quando o conteúdo muda (ex.:
 * troca de aba entre Entrar e Criar conta).
 */
export function AuthShell({
  produto,
  palco,
  eyebrow,
  title,
  lead,
  children,
  testId,
  trocaKey,
}: {
  /** Nome do produto em caps (aparece com o logo no celular, onde o palco some). */
  produto: string;
  /** O palco da direita (<LoginStage …/> com os textos do produto). */
  palco: ReactNode;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  testId?: string;
  trocaKey?: string;
}) {
  return (
    // Fica no tema claro mesmo com o app em escuro: o palco e o formulário são
    // desenhados para fundo claro (DS: contraste AA).
    <div className="lsf-root" data-theme="light" data-testid={testId}>
      <main className="lsf-main">
        <div className="lsf-col">
          <div className="lsf-lockup">
            <SidebarBrand produto={produto} />
          </div>
          <div key={trocaKey}>
            <p className="lsf-eyebrow lsf-in" style={{ "--i": 1 } as React.CSSProperties}>
              {eyebrow}
            </p>
            <h1 className="lsf-title lsf-in" style={{ "--i": 2 } as React.CSSProperties}>
              {title}
            </h1>
            {lead && (
              <p className="lsf-lead lsf-in" style={{ "--i": 3 } as React.CSSProperties}>
                {lead}
              </p>
            )}
          </div>
          {children}
        </div>
      </main>
      <aside className="lsf-aside">
        {palco}
      </aside>
    </div>
  );
}
