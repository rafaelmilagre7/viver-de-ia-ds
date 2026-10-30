import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { toast } from "sonner";
import { erroDeAuthEmPortugues } from "@/lib/erroDeAuth";

const MIN_PASSWORD_LENGTH = 8;

/**
 * Tela dedicada de redefinição de senha (fora do AppLayout, sem sidebar).
 *
 * O Supabase entrega o token do link de recuperação no HASH da URL
 * (`#access_token=...&type=recovery`). Com `detectSessionInUrl` (default), o
 * client troca esse hash por uma sessão de recuperação e dispara o evento
 * PASSWORD_RECOVERY — é essa sessão que autoriza o `updateUser({ password })`.
 * Detectamos o fluxo por qualquer um dos sinais (hash, evento ou sessão ativa).
 */
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "ready" | "invalid">("checking");
  const [form, setForm] = useState({ next: "", confirm: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const isRecoveryHash = hash.get("type") === "recovery" && !!hash.get("access_token");
    if (isRecoveryHash) setStatus("ready");

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setStatus("ready");
    });

    // getSession() resolve após o client processar o hash: se há sessão
    // (de recuperação ou normal), libera o form; sem sessão e sem hash de
    // recovery, o link é inválido/expirado.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus("ready");
      else if (!isRecoveryHash) setStatus("invalid");
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.next.length < MIN_PASSWORD_LENGTH) {
      toast.error(`A nova senha deve ter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }
    if (form.next !== form.confirm) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: form.next });
    setSaving(false);

    if (error) {
      toast.error(erroDeAuthEmPortugues(error));
      return;
    }
    toast.success("Senha redefinida com sucesso.");
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthShell
      eyebrow="Redefinir senha"
      title={status === "invalid" ? "Este link expirou." : "Crie uma nova senha."}
      lead={
        status === "invalid"
          ? "O link de redefinição não vale mais. Peça um novo na tela de login, em “Esqueci minha senha”."
          : "Escolha uma senha nova para voltar a acessar a sua conta."
      }
    >
      {status === "checking" && (
        <p className="lsf-note flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Verificando o link…
        </p>
      )}

      {status === "invalid" && (
        <Link to="/auth" className="lsf-btn lsf-in" style={{ "--i": 4 } as React.CSSProperties}>
          Voltar para o login
        </Link>
      )}

      {status === "ready" && (
        <form onSubmit={handleSubmit} className="lsf-in" style={{ "--i": 4 } as React.CSSProperties}>
          <div className="lsf-field">
            <div className="lsf-label">
              <label htmlFor="new_password">Nova senha</label>
              <span>Mínimo de {MIN_PASSWORD_LENGTH} caracteres</span>
            </div>
            <div className="lsf-control">
              <Lock className="lsf-icon" size={18} />
              <input
                id="new_password"
                type="password"
                autoComplete="new-password"
                placeholder="Nova senha"
                value={form.next}
                onChange={(e) => setForm((p) => ({ ...p, next: e.target.value }))}
                autoFocus
              />
            </div>
          </div>
          <div className="lsf-field">
            <div className="lsf-label">
              <label htmlFor="confirm_password">Confirmar nova senha</label>
            </div>
            <div className="lsf-control">
              <Lock className="lsf-icon" size={18} />
              <input
                id="confirm_password"
                type="password"
                autoComplete="new-password"
                placeholder="Repita a senha"
                value={form.confirm}
                onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))}
              />
            </div>
          </div>
          <button type="submit" className="lsf-btn" disabled={saving}>
            {saving ? <Loader2 className="animate-spin" size={20} /> : "Redefinir senha"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
