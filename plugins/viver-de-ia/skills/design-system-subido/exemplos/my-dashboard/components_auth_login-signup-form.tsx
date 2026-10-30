import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { User, Lock, Mail, Loader2, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { SubidoLockup } from "@/components/brand/subido-logo";
import { LoginStage } from "./login-stage";

interface LoginSignupFormProps {
  initialMode?: "login" | "register";
  /** sem_convite: a sessão foi encerrada pelo SessionBootstrap — conta sem convite. */
  motivo?: "sem_convite";
}

// "bootstrap": ainda não existe admin — o primeiro cadastro vira administrador.
// "closed": cadastro somente por convite (o trigger no banco também bloqueia
// chamadas diretas à API de signup).
type SignupMode = "bootstrap" | "closed" | null;

export const MIN_PASSWORD_LENGTH = 8;

const INVITE_ONLY_MESSAGE =
  "O cadastro é somente por convite. Peça um convite ao administrador e use o e-mail convidado.";

// O trigger enforce_invite_only levanta exceção dentro do auth do Supabase, que
// devolve "Database error saving new user" — a mensagem original nunca chega ao
// cliente. Sem esta tradução o usuário barrado lia um erro de banco em inglês.
function signupErrorMessage(message: string): string {
  if (message.includes("signup_disabled") || message.includes("Database error saving new user")) {
    return INVITE_ONLY_MESSAGE;
  }
  if (message.includes("already registered") || message.includes("already been registered")) {
    return "Já existe uma conta com este e-mail. Tente entrar ou recuperar a senha.";
  }
  if (message.toLowerCase().includes("weak") || message.includes("pwned")) {
    return "Essa senha é fraca ou apareceu em vazamentos conhecidos. Escolha outra.";
  }
  return message;
}

// Todo erro de login virava "E-mail ou senha inválidos", inclusive o de conta
// sem confirmação — quem acabava de se cadastrar era mandado procurar erro de
// digitação num e-mail que estava certo.
function loginErrorMessage(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("email not confirmed") || m.includes("not confirmed")) {
    return "Sua conta ainda não foi confirmada. Abra o link que enviamos por e-mail — ou peça ao administrador para confirmar o cadastro.";
  }
  if (m.includes("too many requests") || m.includes("rate limit")) {
    return "Tentativas demais em pouco tempo. Espere um minuto e tente de novo.";
  }
  if (m.includes("invalid login credentials")) {
    return "E-mail ou senha inválidos. Tente novamente.";
  }
  return "Não foi possível entrar. Tente novamente em instantes.";
}

// Erros do signInWithOAuth chegam antes do redirect (provedor desligado no
// Supabase, rede). Os erros pós-redirect são tratados em /auth/callback.
function oauthErrorMessage(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("provider is not enabled") || m.includes("unsupported provider")) {
    return "O login com Google ainda não foi habilitado neste projeto. No Lovable, ative o provedor Google em Cloud → Autenticação.";
  }
  if (m.includes("popup was blocked")) {
    return "O navegador bloqueou a janela de login. Permita pop-ups para este site ou abra o app em uma aba própria.";
  }
  if (m.includes("cancelled")) return "Login cancelado.";
  if (m.includes("not supported in preview")) {
    return "Este fluxo não funciona dentro do editor. Abra o app em uma aba própria para entrar com o Google.";
  }
  if (m.includes("database error saving new user") || m.includes("signup_disabled")) {
    return INVITE_ONLY_MESSAGE;
  }
  return `Não foi possível entrar com o Google: ${message}`;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.9-2.2 5.4-4.7 7.1l7.3 5.7c4.3-4 7.2-9.9 7.2-16.8z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.7l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2.1 1.4-4.9 2.3-8.6 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

export default function LoginSignupForm({ initialMode = "login", motivo }: LoginSignupFormProps) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(initialMode === "register");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  // Quem entrou (ex.: pelo Google) sem convite é deslogado pelo SessionBootstrap
  // e chega aqui com motivo=sem_convite: sem a explicação, parecia que o login falhou.
  const [loginError, setLoginError] = useState<string | null>(
    motivo === "sem_convite" ? INVITE_ONLY_MESSAGE : null,
  );

  // Signup state
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupMode, setSignupMode] = useState<SignupMode>(null);

  // Recuperação de senha: sem isto, quem esquece a senha perde a conta —
  // a troca de senha só existia dentro de Configurações, ou seja, logado.
  const [resetSending, setResetSending] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // Google (OAuth do Supabase). Serve para entrar e para cadastrar: a mesma
  // regra de convite do banco vale aqui — o trigger enforce_invite_only roda em
  // qualquer inserção em auth.users, seja por senha ou por provedor.
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    setIsActive(initialMode === "register");
  }, [initialMode]);

  useEffect(() => {
    void supabase.rpc("signup_mode").then(({ data }) => {
      const mode: SignupMode = data === "bootstrap" ? "bootstrap" : "closed";
      setSignupMode(mode);
      // Sem dono ainda, não há conta para entrar: a tela abre em "Criar conta".
      if (mode === "bootstrap") setIsActive(true);
    });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      setLoginError(loginErrorMessage(error.message));
      setLoginLoading(false);
      return;
    }
    void navigate({ to: "/" });
  }

  // signInWithOAuth redireciona o navegador direto para o Supabase; se o
  // provedor estiver desligado lá, o usuário vê um JSON cru ("provider is not
  // enabled"). Conferimos antes, pelo endpoint público de settings.
  async function isGoogleProviderEnabled(): Promise<boolean | null> {
    try {
      const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
      const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined;
      if (!url || !key) return null;
      const resp = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: key } });
      if (!resp.ok) return null;
      const json = (await resp.json()) as { external?: Record<string, boolean> };
      return json.external?.google === true;
    } catch {
      return null;
    }
  }

  // Login com Google gerenciado pelo Lovable Cloud: o Lovable é dono do
  // cliente OAuth e intermedia o fluxo em /~oauth/initiate, que só existe nos
  // domínios servidos por ele (preview, publicado, domínio próprio). Fora de
  // iframe ele redireciona e volta em /auth/callback com os tokens; dentro do
  // editor do Lovable abre um popup e devolve os tokens por mensagem.
  function isLovableHosted(): boolean {
    const h = window.location.hostname;
    return h !== "localhost" && h !== "127.0.0.1" && !h.endsWith(".local");
  }

  async function handleGoogle(target: "login" | "register") {
    setGoogleLoading(true);
    const fail = (msg: string) => {
      if (target === "login") setLoginError(msg);
      else setSignupError(msg);
      setGoogleLoading(false);
    };
    if (target === "login") setLoginError(null);
    else setSignupError(null);

    if ((await isGoogleProviderEnabled()) === false) {
      fail(oauthErrorMessage("provider is not enabled"));
      return;
    }
    if (!isLovableHosted()) {
      fail(
        "O login com Google usa o intermediário do Lovable Cloud e só funciona no endereço do preview ou no domínio publicado, não em localhost.",
      );
      return;
    }

    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth/callback`,
      });
      if (result.redirected) return; // o navegador já está indo para o Google
      if (result.error) {
        fail(oauthErrorMessage(result.error.message));
        return;
      }
      // popup: o módulo já gravou a sessão
      void navigate({ to: "/" });
    } catch (err) {
      fail(oauthErrorMessage(err instanceof Error ? err.message : String(err)));
    }
  }

  async function handleForgotPassword() {
    if (!loginEmail.trim()) {
      setResetMessage("Digite seu e-mail acima para receber o link.");
      return;
    }
    setResetSending(true);
    setResetMessage(null);
    const { error } = await supabase.auth.resetPasswordForEmail(loginEmail.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?mode=recovery`,
    });
    setResetSending(false);
    setResetMessage(
      error
        ? "Não foi possível enviar o link. Tente novamente."
        : "Se este e-mail tiver conta, o link de redefinição chegou na caixa de entrada.",
    );
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (signupPassword.length < MIN_PASSWORD_LENGTH) {
      setSignupError(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }
    // Sem trava no cliente: "closed" significa "só por convite", não "ninguém
    // entra" — quem tem convite precisa passar. Quem decide é o trigger
    // enforce_invite_only, e a recusa dele vem traduzida em signupErrorMessage.
    setSignupLoading(true);
    setSignupError(null);
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setSignupError(signupErrorMessage(error.message));
      setSignupLoading(false);
      return;
    }
    // Com autoconfirm ligado o signUp já devolve sessão: entra direto.
    if (data.session) {
      void navigate({ to: "/" });
      return;
    }
    setSignupSuccess(true);
    setSignupLoading(false);
  }

  // Um formulário só, trocado pelo controle segmentado. A tela antiga era um
  // painel deslizante em duas metades (navy à esquerda, formulário à direita)
  // que não seguia o DS da casa: aqui é a coluna única do Design System —
  // lockup da marca, eyebrow com o ESTADO da instalação, título e texto por
  // estado, e campos com rótulo. O que a pessoa precisa saber vem antes do
  // formulário: se a instalação ainda não tem dono, o primeiro cadastro vira
  // administrador — e a tela abre direto em "Criar conta".
  const mode: "login" | "register" = isActive ? "register" : "login";
  const bootstrap = signupMode === "bootstrap";

  const eyebrow = bootstrap
    ? "Primeiro acesso"
    : mode === "register"
      ? "Cadastro por convite"
      : "Entrar";
  const title = bootstrap
    ? "Comece pela conta de dono."
    : mode === "register"
      ? "Crie sua conta com o convite."
      : "Entre nos seus painéis.";
  const lead = bootstrap
    ? "Esta instalação ainda não tem dono. Quem se cadastrar primeiro vira o administrador: configura as fontes, a marca e os convites dos demais."
    : mode === "register"
      ? "O cadastro é por convite. Use o e-mail que recebeu o convite do administrador."
      : "Fontes, painéis e alertas da sua empresa, no mesmo lugar.";

  return (
    <div className="lsf-root">
      <style>{`
        .lsf-root {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          overflow: hidden;
          background: var(--via-bg);
          color: var(--via-text-body);
          font-family: var(--via-font);
        }
        .lsf-main {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(32px, 9vh, 112px) 20px 64px;
        }
        /* palco da marca: só em tela larga, colado à direita e fixo na rolagem */
        .lsf-aside { display: none; }
        @media (min-width: 1024px) {
          .lsf-root { grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr); }
          .lsf-main { align-items: center; padding: 48px clamp(32px, 5vw, 80px); }
          .lsf-aside { display: block; position: sticky; top: 0; height: 100vh; padding: 16px 16px 16px 0; }
          /* a marca já está no palco: no formulário ela sai para não repetir */
          .lsf-root .lsf-lockup { display: none; }
        }
        .lsf-root *, .lsf-root *::before, .lsf-root *::after { box-sizing: border-box; }

        /* atmosfera da marca: dois halos navy quase invisíveis, à deriva bem
           devagar. É o requinte do DS — luz, não cor. */
        .lsf-root::before {
          content: '';
          position: absolute; inset: -20%;
          pointer-events: none;
          background:
            radial-gradient(900px 520px at 8% 0%, var(--via-navy-06), transparent 60%),
            radial-gradient(760px 460px at 100% 100%, var(--via-navy-04), transparent 60%);
          animation: lsf-drift 22s var(--via-ease) infinite alternate;
        }
        @keyframes lsf-drift {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to   { transform: translate3d(2.5%, 1.5%, 0) scale(1.04); }
        }

        .lsf-col { position: relative; width: 100%; max-width: 560px; }

        /* entrada escalonada: cada bloco sobe 10px e aparece, um atrás do outro */
        .lsf-in {
          animation: lsf-rise 560ms var(--via-ease-out) both;
          animation-delay: calc(var(--i, 0) * 70ms);
        }
        @keyframes lsf-rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* lockup: tile navy com a marca do app, nome e a assinatura da casa */
        .lsf-lockup { display: flex; align-items: center; margin-bottom: var(--via-space-10); }
        /* lockup de antes (variação "Flat"): tile navy + nome + assinatura */
        .lsf-lockup-flat { gap: 16px; }
        .lsf-tile {
          width: 56px; height: 56px; flex: none;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: var(--via-radius-md);
          background: linear-gradient(180deg, var(--via-navy), var(--via-navy-deep));
          color: var(--via-white);
          box-shadow: 0 1px 0 var(--via-edge-hi) inset, 0 12px 28px -18px var(--via-shadow-ink-40);
        }
        .lsf-lockup-name { font-size: 22px; font-weight: var(--via-fw-medium); color: var(--via-text-primary); letter-spacing: var(--via-ls-tight); line-height: 1.2; }
        .lsf-lockup-by { font-size: 14px; color: var(--via-text-muted); margin-top: 3px; }

        .lsf-eyebrow {
          font-family: var(--via-font-mono);
          font-size: var(--via-fs-label);
          font-weight: var(--via-fw-medium);
          letter-spacing: var(--via-ls-label);
          text-transform: uppercase;
          color: var(--via-text-soft);
          margin: 0 0 14px;
        }
        .lsf-title {
          font-size: clamp(34px, 5.2vw, 44px);
          font-weight: var(--via-fw-medium);
          letter-spacing: var(--via-ls-tighter);
          line-height: 1.08;
          color: var(--via-text-primary);
          margin: 0 0 16px;
          text-wrap: balance;
        }
        .lsf-lead { font-size: 17px; line-height: 1.6; color: var(--via-text-muted); margin: 0 0 32px; max-width: 58ch; }

        /* controle segmentado: um trilho off-white e o pill navy que DESLIZA
           entre as opções — é o movimento da tela, e é só este */
        .lsf-seg {
          position: relative;
          display: grid; grid-template-columns: 1fr 1fr;
          height: 62px; padding: 5px;
          border-radius: var(--via-radius-pill);
          background: var(--via-gray-50);
          border: 1px solid var(--via-border);
          margin-bottom: 30px;
        }
        .lsf-seg-thumb {
          position: absolute; top: 5px; bottom: 5px; left: 5px;
          width: calc(50% - 5px);
          border-radius: var(--via-radius-pill);
          background: linear-gradient(180deg, var(--via-navy), var(--via-navy-deep));
          box-shadow: 0 1px 0 var(--via-edge-hi) inset, 0 8px 18px -12px var(--via-shadow-ink-40);
          transition: transform var(--via-dur) var(--via-ease-snap);
        }
        .lsf-seg[data-mode="register"] .lsf-seg-thumb { transform: translateX(100%); }
        .lsf-seg button {
          position: relative; z-index: 1;
          height: 100%;
          border: none; background: transparent; cursor: pointer;
          border-radius: var(--via-radius-pill);
          font-family: inherit; font-size: 17px; font-weight: var(--via-fw-medium);
          color: var(--via-text-muted);
          transition: color var(--via-dur) var(--via-ease-snap);
        }
        .lsf-seg button:hover { color: var(--via-text-primary); }
        .lsf-seg button[aria-selected="true"] { color: var(--via-white); }
        .lsf-seg button:focus-visible { outline: none; box-shadow: var(--via-shadow-focus); }

        .lsf-field { margin-bottom: 22px; }
        .lsf-label { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 10px; }
        .lsf-label label { font-size: 16px; font-weight: var(--via-fw-medium); color: var(--via-text-primary); }
        .lsf-label span { font-size: 14px; color: var(--via-text-muted); }
        .lsf-control { position: relative; }
        .lsf-control input {
          width: 100%; height: 58px;
          padding: 0 18px 0 50px;
          background: var(--via-surface);
          border: 1px solid var(--via-border);
          border-radius: var(--via-radius-md);
          outline: none;
          font-family: inherit; font-size: 16px; color: var(--via-text-body);
          transition: border-color var(--via-dur) var(--via-ease-snap), box-shadow var(--via-dur) var(--via-ease-snap);
        }
        .lsf-control input::placeholder { color: var(--via-text-soft); }
        .lsf-control input:hover { border-color: var(--via-navy-20); }
        .lsf-control input:focus { border-color: var(--via-navy-40); box-shadow: var(--via-shadow-focus); }
        .lsf-control .lsf-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: var(--via-text-muted); pointer-events: none; }

        .lsf-error { color: var(--via-coral-dark); font-size: 13px; margin: -8px 0 16px; }
        .lsf-note { color: var(--via-text-muted); font-size: 14px; margin: 14px 0 0; line-height: 1.5; }

        .lsf-btn {
          width: 100%; height: 58px;
          background: linear-gradient(180deg, var(--via-navy), var(--via-navy-deep));
          border-radius: var(--via-radius-pill);
          border: none; cursor: pointer;
          font-family: inherit; font-size: 16px; font-weight: var(--via-fw-medium); letter-spacing: -0.008em;
          color: var(--via-white);
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 1px 0 var(--via-edge-hi) inset, 0 12px 28px -18px var(--via-shadow-ink-40);
          transition: transform var(--via-dur) var(--via-ease-snap), filter var(--via-dur) var(--via-ease-snap), box-shadow var(--via-dur) var(--via-ease-snap);
        }
        .lsf-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .lsf-btn:active { transform: translateY(0) scale(0.985); transition-duration: var(--via-dur-press); }
        .lsf-btn:disabled { opacity: .55; cursor: not-allowed; transform: none; }
        .lsf-btn:focus-visible { outline: none; box-shadow: var(--via-shadow-focus); }

        .lsf-link {
          background: none; border: none; padding: 0; margin-top: 18px;
          font-family: inherit; font-size: 14px; color: var(--via-text-primary);
          text-decoration: underline; text-underline-offset: 3px; cursor: pointer;
        }
        .lsf-link:disabled { opacity: .6; cursor: not-allowed; }

        .lsf-divider { display: flex; align-items: center; gap: 12px; margin: 26px 0 16px; color: var(--via-text-soft); font-size: 12px; }
        .lsf-divider::before, .lsf-divider::after { content: ''; flex: 1; height: 1px; background: var(--via-border-soft); }

        .lsf-google {
          width: 100%; height: 54px;
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          border: 1px solid var(--via-border); border-radius: var(--via-radius-pill);
          background: var(--via-surface); color: var(--via-text-primary);
          font-family: inherit; font-size: 15px; font-weight: var(--via-fw-medium); cursor: pointer;
          transition: transform var(--via-dur) var(--via-ease-snap), border-color var(--via-dur) var(--via-ease-snap), background var(--via-dur) var(--via-ease-snap);
        }
        .lsf-google:hover { border-color: var(--via-navy-20); background: var(--via-navy-06); transform: translateY(-1px); }
        .lsf-google:active { transform: translateY(0) scale(0.985); transition-duration: var(--via-dur-press); }
        .lsf-google:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .lsf-google:focus-visible { outline: none; box-shadow: var(--via-shadow-focus); }

        @media (prefers-reduced-motion: reduce) {
          .lsf-root::before, .lsf-in { animation: none; }
          .lsf-root * { transition: none !important; }
          .lsf-btn:hover, .lsf-google:hover { transform: none; }
        }
      `}</style>

      <main className="lsf-main">
        <div className="lsf-col">
          <div className="lsf-lockup ds-brand-subido">
            <SubidoLockup height={40} animate="intro" />
          </div>
          {/* marca de antes do commit da SUBIDO AI · só na variação "Flat" */}
          <div className="lsf-lockup lsf-lockup-flat ds-brand-flat">
            <span className="lsf-tile" aria-hidden="true">
              <BarChart3 size={24} strokeWidth={2} />
            </span>
            <div>
              <div className="lsf-lockup-name">My Dashboard</div>
              <div className="lsf-lockup-by">por Viver de IA</div>
            </div>
          </div>

          {signupSuccess ? (
            <>
              <p className="lsf-eyebrow lsf-in" style={{ "--i": 1 } as React.CSSProperties}>
                Cadastro enviado
              </p>
              <h1 className="lsf-title lsf-in" style={{ "--i": 2 } as React.CSSProperties}>
                Confira seu e-mail.
              </h1>
              <p className="lsf-lead">
                Enviamos um link de confirmação para <strong>{signupEmail}</strong>.
              </p>
              {/* Esta tela só aparece com a confirmação por e-mail ligada. Se o
                projeto ainda não tem provedor de envio configurado, o link
                nunca chega — dizer isso evita a espera por um e-mail que não
                existe. */}
              <p className="lsf-note" style={{ marginBottom: 20 }}>
                Não chegou? O administrador consegue confirmar seu cadastro direto no painel.
              </p>
              <button
                type="button"
                className="lsf-btn"
                onClick={() => {
                  setSignupSuccess(false);
                  setIsActive(false);
                }}
              >
                Voltar para o login
              </button>
            </>
          ) : (
            <>
              <p className="lsf-eyebrow lsf-in" style={{ "--i": 1 } as React.CSSProperties}>
                {eyebrow}
              </p>
              <h1 className="lsf-title lsf-in" style={{ "--i": 2 } as React.CSSProperties}>
                {title}
              </h1>
              <p className="lsf-lead lsf-in" style={{ "--i": 3 } as React.CSSProperties}>
                {lead}
              </p>

              <div
                className="lsf-seg lsf-in"
                style={{ "--i": 4 } as React.CSSProperties}
                data-mode={mode}
                role="tablist"
                aria-label="Entrar ou criar conta"
              >
                <span className="lsf-seg-thumb" aria-hidden="true" />
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "login"}
                  onClick={() => setIsActive(false)}
                >
                  Entrar
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "register"}
                  onClick={() => setIsActive(true)}
                >
                  Criar conta
                </button>
              </div>

              {mode === "login" ? (
                <form
                  onSubmit={handleLogin}
                  className="lsf-in"
                  style={{ "--i": 5 } as React.CSSProperties}
                >
                  <div className="lsf-field">
                    <div className="lsf-label">
                      <label htmlFor="lsf-login-email">E-mail</label>
                    </div>
                    <div className="lsf-control">
                      <Mail className="lsf-icon" size={18} />
                      <input
                        id="lsf-login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@empresa.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="lsf-field">
                    <div className="lsf-label">
                      <label htmlFor="lsf-login-password">Senha</label>
                    </div>
                    <div className="lsf-control">
                      <Lock className="lsf-icon" size={18} />
                      <input
                        id="lsf-login-password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Sua senha"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {loginError && (
                    <p className="lsf-error" role="alert">
                      {loginError}
                    </p>
                  )}
                  <button type="submit" className="lsf-btn" disabled={loginLoading}>
                    {loginLoading ? <Loader2 className="animate-spin" size={20} /> : "Entrar"}
                  </button>
                  <button
                    type="button"
                    className="lsf-link"
                    onClick={() => void handleForgotPassword()}
                    disabled={resetSending}
                  >
                    {resetSending ? "Enviando…" : "Esqueci minha senha"}
                  </button>
                  {resetMessage && <p className="lsf-note">{resetMessage}</p>}
                  <div className="lsf-divider">ou</div>
                  <button
                    type="button"
                    className="lsf-google"
                    onClick={() => void handleGoogle("login")}
                    disabled={googleLoading || loginLoading}
                  >
                    {googleLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <GoogleIcon />
                    )}
                    Continuar com Google
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleSignup}
                  className="lsf-in"
                  style={{ "--i": 5 } as React.CSSProperties}
                >
                  <div className="lsf-field">
                    <div className="lsf-label">
                      <label htmlFor="lsf-name">Nome completo</label>
                    </div>
                    <div className="lsf-control">
                      <User className="lsf-icon" size={18} />
                      <input
                        id="lsf-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Como quer ser chamado"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="lsf-field">
                    <div className="lsf-label">
                      <label htmlFor="lsf-signup-email">E-mail</label>
                    </div>
                    <div className="lsf-control">
                      <Mail className="lsf-icon" size={18} />
                      <input
                        id="lsf-signup-email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@empresa.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="lsf-field">
                    <div className="lsf-label">
                      <label htmlFor="lsf-signup-password">Senha</label>
                      <span>Mínimo de {MIN_PASSWORD_LENGTH} caracteres</span>
                    </div>
                    <div className="lsf-control">
                      <Lock className="lsf-icon" size={18} />
                      <input
                        id="lsf-signup-password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Crie uma senha"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {signupError && (
                    <p className="lsf-error" role="alert">
                      {signupError}
                    </p>
                  )}
                  <button type="submit" className="lsf-btn" disabled={signupLoading}>
                    {signupLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : bootstrap ? (
                      "Criar a conta de dono"
                    ) : (
                      "Criar conta"
                    )}
                  </button>
                  <div className="lsf-divider">ou</div>
                  <button
                    type="button"
                    className="lsf-google"
                    onClick={() => void handleGoogle("register")}
                    disabled={googleLoading || signupLoading}
                  >
                    {googleLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <GoogleIcon />
                    )}
                    Cadastrar com Google
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </main>
      <aside className="lsf-aside ds-brand-subido">
        <LoginStage />
      </aside>
    </div>
  );
}
