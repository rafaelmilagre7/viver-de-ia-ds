import { Loader2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function PendingApprovalPage() {
  const { profile, isApproved, isActive, signOut, refreshProfile, aceitarConvite } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  // Quem já está aprovado não tem o que fazer aqui: sai sozinho, sem depender
  // do clique em "Verificar novamente". Cobre o resquício de corrida do login
  // e o caso de a aprovação chegar com a página aberta.
  useEffect(() => {
    if (profile && isApproved && isActive) navigate("/dashboard", { replace: true });
  }, [profile, isApproved, isActive, navigate]);

  // Quem chega pelo link de confirmação do e-mail cai aqui sem passar pelo
  // login: tenta o convite uma vez, na chegada.
  const tentouConvite = useRef(false);
  useEffect(() => {
    if (tentouConvite.current) return;
    tentouConvite.current = true;
    aceitarConvite().then((aprovado) => { if (aprovado) refreshProfile(); });
  }, [aceitarConvite, refreshProfile]);

  const onCheck = async () => {
    setChecking(true);
    const aprovado = await aceitarConvite();
    await refreshProfile();
    setChecking(false);
    if (aprovado) {
      toast.success("Acesso liberado.");
      navigate("/dashboard", { replace: true });
      return;
    }
    toast.info("Ainda sem acesso. Confira se o e-mail foi confirmado e se o convite foi para este endereço.");
  };

  return (
    <AuthShell
      eyebrow="Aguardando acesso"
      title="Seu acesso ainda não foi liberado."
      lead={
        <>
          Olá, {profile?.full_name ?? "tudo bem"}. O acesso libera quando o e-mail está confirmado e
          existe um convite do administrador para ele. Sem convite, peça ao administrador da sua
          empresa.
        </>
      }
    >
      {/* uma ação dominante (verificar); sair recua para link */}
      <div className="lsf-in" style={{ "--i": 4 } as React.CSSProperties}>
        <button type="button" className="lsf-btn" onClick={onCheck} disabled={checking}>
          {checking ? <Loader2 className="animate-spin" size={20} /> : "Verificar novamente"}
        </button>
        <button type="button" className="lsf-link" onClick={signOut}>
          Sair e entrar com outra conta
        </button>
      </div>
    </AuthShell>
  );
}
