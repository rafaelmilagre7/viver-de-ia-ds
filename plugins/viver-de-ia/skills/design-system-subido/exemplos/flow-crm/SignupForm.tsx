import { useState } from "react";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Lock, Mail, User } from "lucide-react";

const schema = z.object({
  fullName: z.string().trim().min(3, "Nome muito curto").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "Senha mínima 6 caracteres").max(72),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "As senhas não coincidem.", path: ["confirmPassword"],
});

/**
 * `primeiroAcesso`: instância ainda sem ninguém. O cadastro vira "Configuração
 * inicial" e deixa claro que essa conta administra a plataforma (o banco já faz
 * isso: o primeiro perfil entra como admin aprovado).
 */
export function SignupForm({ primeiroAcesso = false }: { primeiroAcesso?: boolean }) {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error, pending, isApproved } = await signUp(form.fullName, form.email, form.password);
    setLoading(false);
    if (error) { toast.error(error); return; }
    if (isApproved === false) {
      // Convidado: o acesso libera sozinho no primeiro login depois de confirmar o e-mail.
      toast.info("Conta criada. Confirme o e-mail que enviamos e depois entre com a sua senha.");
      navigate("/auth", { replace: true });
    } else if (isApproved === true) {
      toast.success("Conta criada.");
      // Vai para o setup, não para o dashboard: conta nova cai numa tela vazia
      // se não configurar empresa, IA e pipeline antes.
      navigate("/setup", { replace: true });
    } else {
      // Fallback when profile not yet readable (email confirmation required)
      toast.info("Conta criada. Confirme o e-mail que enviamos e depois entre com a sua senha.");
      navigate("/auth", { replace: true });
    }
  };

  return (
    // O título e a explicação ficam no AuthLayout; aqui só os campos.
    <form onSubmit={onSubmit}>
      <div className="lsf-field">
        <div className="lsf-label">
          <label htmlFor="su-name">Nome completo</label>
        </div>
        <div className="lsf-control">
          <User className="lsf-icon" size={18} />
          <input
            id="su-name"
            type="text"
            autoComplete="name"
            placeholder="Como quer ser chamado"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="lsf-field">
        <div className="lsf-label">
          <label htmlFor="su-email">{primeiroAcesso ? "E-mail do administrador" : "E-mail"}</label>
        </div>
        <div className="lsf-control">
          <Mail className="lsf-icon" size={18} />
          <input
            id="su-email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="lsf-field">
        <div className="lsf-label">
          <label htmlFor="su-pass">Senha</label>
          <span>Mínimo de 6 caracteres</span>
        </div>
        <div className="lsf-control">
          <Lock className="lsf-icon" size={18} />
          <input
            id="su-pass"
            type="password"
            autoComplete="new-password"
            placeholder="Crie uma senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="lsf-field">
        <div className="lsf-label">
          <label htmlFor="su-pass2">Confirmar senha</label>
        </div>
        <div className="lsf-control">
          <Lock className="lsf-icon" size={18} />
          <input
            id="su-pass2"
            type="password"
            autoComplete="new-password"
            placeholder="Repita a senha"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />
        </div>
      </div>
      <button type="submit" className="lsf-btn" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" size={20} /> : primeiroAcesso ? "Criar administrador" : "Criar conta"}
      </button>
    </form>
  );
}
