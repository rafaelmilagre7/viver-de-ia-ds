import { useEffect, useState } from "react";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Lock, Mail } from "lucide-react";
import { erroDoLinkDeEmail } from "@/lib/erroDeAuth";

const schema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }).max(255),
  password: z.string().min(6, { message: "Senha mínima 6 caracteres" }).max(72),
});

const emailSchema = z.string().trim().email({ message: "Email inválido" }).max(255);

export function LoginForm() {
  const { signIn, reenviarConfirmacao } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Aparece quando o login esbarra no e-mail não confirmado ou o link do e-mail venceu.
  const [aviso, setAviso] = useState<string | null>(null);
  const [reenviando, setReenviando] = useState(false);

  useEffect(() => {
    const erroDoLink = erroDoLinkDeEmail(window.location.hash, window.location.search);
    if (!erroDoLink) return;
    setAviso(`${erroDoLink} Digite o seu e-mail e reenvie a confirmação.`);
    // Tira o erro da barra de endereço para não reaparecer no recarregar.
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const onReenviar = async () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error("Preencha o e-mail para reenviar a confirmação.");
      return;
    }
    setReenviando(true);
    const erro = await reenviarConfirmacao(parsed.data);
    setReenviando(false);
    if (erro) { toast.error(erro); return; }
    setAviso("Enviamos um novo link para o seu e-mail. Abra a mensagem, clique no link e volte aqui para entrar.");
    toast.success("E-mail de confirmação reenviado");
  };

  const onForgotPassword = async () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error("Preencha o email primeiro para recuperar a senha.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) {
      toast.error("Não foi possível enviar o email de recuperação.");
      return;
    }
    toast.success("Email de recuperação enviado");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error, isApproved, precisaConfirmarEmail } = await signIn(email, password);
    setLoading(false);
    if (precisaConfirmarEmail) { setAviso(error ?? null); return; }
    if (error) { toast.error(error); return; }
    if (isApproved === false) {
      toast.info("Conta aguardando aprovação do administrador.");
      navigate("/pending-approval", { replace: true });
      return;
    }
    toast.success("Login realizado");
    navigate("/dashboard", { replace: true });
  };

  return (
    // Campos no padrão do login do DS SUBIDO (classes lsf-* em auth-subido.css)
    <form onSubmit={onSubmit}>
      {aviso && (
        <div role="status" className="mb-5 space-y-2 rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: "var(--via-border)", background: "var(--via-surface-2)", color: "var(--via-text-body)" }}>
          <p>{aviso}</p>
          <Button type="button" variant="outline" size="sm" onClick={onReenviar} disabled={reenviando}>
            {reenviando && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
            Reenviar e-mail de confirmação
          </Button>
        </div>
      )}
      <div className="lsf-field">
        <div className="lsf-label">
          <label htmlFor="login-email">E-mail</label>
        </div>
        <div className="lsf-control">
          <Mail className="lsf-icon" size={18} />
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="lsf-field">
        <div className="lsf-label">
          <label htmlFor="login-password">Senha</label>
        </div>
        <div className="lsf-control">
          <Lock className="lsf-icon" size={18} />
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className="lsf-btn" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Entrar"}
      </button>
      <button type="button" className="lsf-link" onClick={onForgotPassword}>
        Esqueci minha senha
      </button>
    </form>
  );
}
