import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Copy,
  KeyRound,
  LayoutDashboard,
  Loader2,
  Mail,
  MoreHorizontal,
  Pencil,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useRevenuePP } from "@/lib/ds-variant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/app-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { DashboardModule, ModulePill } from "@/components/dashboard/dashboard-module";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { formatRelativeDate } from "@/lib/format-relative-date";
import {
  adminCreateUser,
  adminDeleteUser,
  adminUpdateUser,
  createInvite,
  isAdmin,
  listAllDashboards,
  listGrantsForUser,
  listInvites,
  listUsers,
  revokeInvite,
  setGrant,
  setUserRole,
  type AppRole,
  type DashboardSummary,
  type DirectoryUser,
  type Invite,
} from "@/lib/admin/access";

export const Route = createFileRoute("/admin/usuarios")({
  component: AdminUsersPage,
  head: () => ({ meta: [{ title: "Usuários — My Dashboard" }] }),
});

const ROLE_LABEL: Record<AppRole, string> = { admin: "administrador", member: "membro" };

/**
 * Área administrativa: convidar usuários e definir quais dashboards cada um
 * enxerga. O convite é o que abre o cadastro (fechado por padrão depois do
 * primeiro admin); o acesso por dashboard é só leitura — editar continua
 * sendo do dono.
 */
function AdminUsersPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [meId, setMeId] = useState<string | null>(null);
  const [users, setUsers] = useState<DirectoryUser[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [dashboards, setDashboards] = useState<DashboardSummary[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AppRole>("member");
  const [inviting, setInviting] = useState(false);
  const [selected, setSelected] = useState<DirectoryUser | null>(null);
  // "convite": a pessoa escolhe a senha ao se cadastrar. "direto": o admin
  // cria a conta pronta, com senha — precisa da chave de serviço no servidor.
  const [mode, setMode] = useState<"convite" | "direto">("convite");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState<DirectoryUser | null>(null);
  const [deleting, setDeleting] = useState<DirectoryUser | null>(null);
  const revenuePP = useRevenuePP();
  // Revenue++: o formulário de adicionar vive num modal; a página é a lista
  const [addOpen, setAddOpen] = useState(false);

  const load = useCallback(async () => {
    const [u, i, d] = await Promise.all([listUsers(), listInvites(), listAllDashboards()]);
    setUsers(u);
    setInvites(i);
    setDashboards(d);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!auth.user) {
        void navigate({ to: "/login" });
        return;
      }
      setMeId(auth.user.id);
      if (!(await isAdmin())) {
        toast.error("Só administradores acessam esta área.");
        void navigate({ to: "/" });
        return;
      }
      try {
        await load();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Não foi possível carregar os usuários.");
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, load]);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Digite um e-mail válido.");
      return;
    }
    setInviting(true);
    try {
      if (mode === "direto") {
        if (password.length < 8) {
          toast.error("A senha deve ter pelo menos 8 caracteres.");
          return;
        }
        await adminCreateUser({ email: value, password, fullName: fullName.trim(), role });
        toast.success(`Conta criada para ${value}. Ela já pode entrar com a senha definida.`);
        setPassword("");
        setFullName("");
      } else {
        await createInvite(value, role);
        toast.success(`Convite criado para ${value}. Envie o link de cadastro.`);
      }
      setEmail("");
      setAddOpen(false);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível criar o usuário.");
    } finally {
      setInviting(false);
    }
  }

  async function handleRevoke(invite: Invite) {
    try {
      await revokeInvite(invite.id);
      toast.success("Convite revogado.");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível revogar.");
    }
  }

  function copySignupLink() {
    const link = `${window.location.origin}/signup`;
    void navigator.clipboard.writeText(link).then(
      () => toast.success("Link de cadastro copiado."),
      () => toast.error("Não foi possível copiar. O link é " + link),
    );
  }

  const adminCount = useMemo(() => users.filter((u) => u.role === "admin").length, [users]);

  async function handleRoleChange(user: DirectoryUser, next: AppRole) {
    if (user.role === "admin" && next !== "admin" && adminCount <= 1) {
      toast.error("Não dá para rebaixar o único administrador.");
      return;
    }
    try {
      await setUserRole(user.id, next);
      toast.success(`${user.email} agora é ${ROLE_LABEL[next]}.`);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível alterar o papel.");
    }
  }

  const pendingInvites = invites.filter((i) => !i.acceptedAt);

  const addForm = (
    <form onSubmit={(e) => void handleInvite(e)} className="grid gap-4">
      <div className="flex gap-1 rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)] bg-[var(--via-gray-50)] p-1">
        {(
          [
            { id: "convite", label: "Por convite" },
            { id: "direto", label: "Criar agora" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setMode(opt.id)}
            className={
              "flex-1 rounded-[var(--via-radius-xs)] px-3 py-1.5 text-[0.8125rem] font-medium transition-colors " +
              (mode === opt.id
                ? "bg-[var(--via-surface)] text-[var(--via-text-primary)] shadow-[0_1px_0_var(--via-edge-hi)_inset,0_4px_10px_-8px_var(--via-shadow-ink-20)]"
                : "text-[var(--via-text-muted)] hover:text-[var(--via-text-primary)]")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
      {mode === "direto" && (
        <div className="grid gap-1.5">
          <Label htmlFor="create-name">Nome</Label>
          <Input
            id="create-name"
            autoComplete="off"
            placeholder="Nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
      )}
      <div className="grid gap-1.5">
        <Label htmlFor="invite-email">E-mail</Label>
        <Input
          id="invite-email"
          type="email"
          autoComplete="off"
          placeholder="nome@empresa.com.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {mode === "direto" && (
        <div className="grid gap-1.5">
          <Label htmlFor="create-password">Senha inicial</Label>
          <Input
            id="create-password"
            type="password"
            autoComplete="new-password"
            placeholder="mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      <div className="grid gap-1.5">
        <Label>Papel</Label>
        <Select value={role} onValueChange={(v) => setRole(v as AppRole)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="member">
              Membro — vê os dashboards liberados e cria os seus
            </SelectItem>
            <SelectItem value="admin">Administrador — tudo, inclusive esta área</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" disabled={inviting}>
          {inviting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "direto" ? (
            <UserPlus className="h-4 w-4" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          {mode === "direto" ? "Criar conta" : "Criar convite"}
        </Button>
        {mode === "convite" && (
          <Button type="button" variant="outline" onClick={copySignupLink}>
            <Copy className="h-4 w-4" />
            Copiar link de cadastro
          </Button>
        )}
      </div>
      <p className="text-xs leading-relaxed text-[var(--via-text-soft)]">
        {mode === "direto"
          ? "A conta nasce confirmada e com a senha que você definir — passe a senha para a pessoa por um canal seguro."
          : "O cadastro só aceita e-mails convidados. Crie o convite e envie o link — a pessoa se cadastra com o mesmo e-mail e entra na hora."}
      </p>
    </form>
  );

  if (!ready) {
    return (
      <AppShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--via-navy)]" />
        </div>
      </AppShell>
    );
  }

  if (revenuePP) {
    return (
      <AppShell>
        <UsersPageRpp
          users={users}
          meId={meId}
          adminCount={adminCount}
          pendingInvites={pendingInvites}
          addForm={addForm}
          addOpen={addOpen}
          setAddOpen={setAddOpen}
          onRoleChange={(u, r) => void handleRoleChange(u, r)}
          onGrants={setSelected}
          onEdit={setEditing}
          onDelete={setDeleting}
          onRevoke={(i) => void handleRevoke(i)}
          onCopyLink={copySignupLink}
        />
        <GrantsSheet user={selected} dashboards={dashboards} onClose={() => setSelected(null)} />
        <EditUserDialog
          user={editing}
          isSelf={editing?.id === meId}
          adminCount={adminCount}
          onClose={() => setEditing(null)}
          onSaved={() => void load()}
        />
        <DeleteUserDialog
          user={deleting}
          ownedDashboards={
            deleting ? dashboards.filter((d) => d.ownerId === deleting.id).length : 0
          }
          onClose={() => setDeleting(null)}
          onDeleted={() => void load()}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mb-8">
        <p
          className="mb-2 font-mono text-[0.6875rem] font-medium uppercase text-[var(--via-text-soft)]"
          style={{ letterSpacing: "var(--via-ls-label)" }}
        >
          Administração
        </p>
        <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
          Usuários e acessos
        </h1>
        <p className="mt-1.5 max-w-[68ch] text-sm text-[var(--via-text-muted)]">
          Convide pessoas para a sua conta e escolha quais dashboards cada uma pode ver.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {/* Convite */}
        <div className="lg:col-span-5">
          <DashboardModule icon={UserPlus} title="Adicionar usuário">
            {addForm}

            {pendingInvites.length > 0 && (
              <ul className="mt-5 divide-y divide-[var(--via-border-soft)] border-t border-[var(--via-border-soft)]">
                {pendingInvites.map((i) => (
                  <li key={i.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-[var(--via-text-body)]">{i.email}</p>
                      <p className="font-mono text-[0.6875rem] text-[var(--via-text-soft)]">
                        {ROLE_LABEL[i.role]} · convidado {formatRelativeDate(i.createdAt)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleRevoke(i)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--via-text-soft)] transition-colors hover:bg-[var(--via-coral)]/10 hover:text-[var(--via-coral-dark)]"
                      aria-label={`Revogar convite de ${i.email}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </DashboardModule>
        </div>

        {/* Diretório */}
        <div className="lg:col-span-7">
          <DashboardModule
            icon={Users}
            title="Usuários"
            aside={
              <ModulePill>
                {users.length} {users.length === 1 ? "usuário" : "usuários"}
              </ModulePill>
            }
            bodyClassName="p-0"
          >
            <ul className="divide-y divide-[var(--via-border-soft)]">
              {users.map((u) => (
                <li key={u.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--via-text-primary)]">
                      {u.fullName || u.email}
                      {u.id === meId && (
                        <span className="ml-2 text-xs text-[var(--via-text-soft)]">(você)</span>
                      )}
                    </p>
                    <p className="truncate font-mono text-[0.6875rem] text-[var(--via-text-soft)]">
                      {u.email} · desde {formatRelativeDate(u.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Select
                      value={u.role}
                      onValueChange={(v) => void handleRoleChange(u, v as AppRole)}
                      disabled={u.id === meId}
                    >
                      <SelectTrigger className="h-8 w-[10.5rem] text-xs">
                        <ShieldCheck className="h-3.5 w-3.5 text-[var(--via-text-soft)]" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">membro</SelectItem>
                        <SelectItem value="admin">administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={() => setSelected(u)}>
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboards
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      aria-label={`Editar ${u.email}`}
                      onClick={() => setEditing(u)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {u.id !== meId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[var(--via-coral-dark)] hover:bg-[var(--via-coral)]/10 hover:text-[var(--via-coral-dark)]"
                        aria-label={`Excluir ${u.email}`}
                        onClick={() => setDeleting(u)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </DashboardModule>
        </div>
      </div>

      <GrantsSheet user={selected} dashboards={dashboards} onClose={() => setSelected(null)} />
      <EditUserDialog
        user={editing}
        isSelf={editing?.id === meId}
        adminCount={adminCount}
        onClose={() => setEditing(null)}
        onSaved={() => void load()}
      />
      <DeleteUserDialog
        user={deleting}
        ownedDashboards={deleting ? dashboards.filter((d) => d.ownerId === deleting.id).length : 0}
        onClose={() => setDeleting(null)}
        onDeleted={() => void load()}
      />
    </AppShell>
  );
}

/** Editar nome, e-mail, senha e papel de um usuário. */
function EditUserDialog({
  user,
  isSelf,
  adminCount,
  onClose,
  onSaved,
}: {
  user: DirectoryUser | null;
  isSelf: boolean;
  adminCount: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<AppRole>("member");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFullName(user.fullName ?? "");
    setEmail(user.email);
    setPassword("");
    setRole(user.role);
  }, [user]);

  async function handleSave() {
    if (!user) return;
    if (user.role === "admin" && role !== "admin" && adminCount <= 1) {
      toast.error("Não dá para rebaixar o único administrador.");
      return;
    }
    if (password && password.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setSaving(true);
    try {
      await adminUpdateUser({
        userId: user.id,
        ...(fullName.trim() !== (user.fullName ?? "") ? { fullName: fullName.trim() } : {}),
        ...(email.trim().toLowerCase() !== user.email ? { email: email.trim().toLowerCase() } : {}),
        ...(password ? { password } : {}),
        ...(role !== user.role && !isSelf ? { role } : {}),
      });
      toast.success("Usuário atualizado.");
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={user !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>
            Nome, e-mail, senha e papel. Deixe a senha em branco para não alterar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="edit-name">Nome</Label>
            <Input id="edit-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="edit-email">E-mail</Label>
            <Input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="edit-password">Nova senha</Label>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--via-text-soft)]" />
              <Input
                id="edit-password"
                type="password"
                autoComplete="new-password"
                className="pl-9"
                placeholder="deixe em branco para manter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>Papel</Label>
            <Select value={role} onValueChange={(v) => setRole(v as AppRole)} disabled={isSelf}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">membro</SelectItem>
                <SelectItem value="admin">administrador</SelectItem>
              </SelectContent>
            </Select>
            {isSelf && (
              <p className="text-xs text-[var(--via-text-soft)]">
                Você não altera o próprio papel.
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => void handleSave()} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** Exclusão definitiva, dizendo o que vai junto. */
function DeleteUserDialog({
  user,
  ownedDashboards,
  onClose,
  onDeleted,
}: {
  user: DirectoryUser | null;
  ownedDashboards: number;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!user) return;
    setBusy(true);
    try {
      await adminDeleteUser(user.id);
      toast.success(`${user.email} foi excluído.`);
      onDeleted();
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível excluir.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AlertDialog open={user !== null} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir {user?.fullName || user?.email}?</AlertDialogTitle>
          <AlertDialogDescription>
            A conta, os dados de perfil e as chaves de integração dessa pessoa somem de vez.
            {ownedDashboards > 0 && (
              <>
                {" "}
                Também serão excluídos{" "}
                <strong>
                  {ownedDashboards} {ownedDashboards === 1 ? "dashboard" : "dashboards"}
                </strong>{" "}
                e as fontes de dados que ela criou.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              void handleDelete();
            }}
            disabled={busy}
            className="bg-[var(--via-coral)] text-[var(--via-white)] hover:bg-[var(--via-coral-deep)]"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Excluir usuário
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** Painel lateral: quais dashboards este usuário pode ver. */
function GrantsSheet({
  user,
  dashboards,
  onClose,
}: {
  user: DirectoryUser | null;
  dashboards: DashboardSummary[];
  onClose: () => void;
}) {
  const [grants, setGrants] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setLoading(true);
    listGrantsForUser(user.id)
      .then((g) => {
        if (!cancelled) setGrants(g);
      })
      .catch(() => toast.error("Não foi possível carregar os acessos."))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  async function toggle(d: DashboardSummary, next: boolean) {
    if (!user) return;
    setBusy(d.id);
    try {
      await setGrant(d.id, user.id, next);
      setGrants((prev) => {
        const copy = new Set(prev);
        if (next) copy.add(d.id);
        else copy.delete(d.id);
        return copy;
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível alterar o acesso.");
    } finally {
      setBusy(null);
    }
  }

  // dashboards do próprio usuário ele já vê por ser dono — não entram na lista
  const grantable = dashboards.filter((d) => d.ownerId !== user?.id);

  return (
    <Sheet open={user !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <div className="border-b border-[var(--via-border-soft)] px-6 py-5">
          <p
            className="mb-1.5 font-mono text-[0.6875rem] font-medium uppercase text-[var(--via-text-soft)]"
            style={{ letterSpacing: "var(--via-ls-label)" }}
          >
            Acesso a dashboards
          </p>
          <SheetTitle className="text-lg font-medium tracking-[-0.015em] text-[var(--via-text-primary)]">
            {user?.fullName || user?.email}
          </SheetTitle>
          <p className="mt-1 text-xs text-[var(--via-text-muted)]">
            Marcados = pode abrir e ver os dados. Editar continua sendo só do dono.
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-5 w-5 animate-spin text-[var(--via-navy)]" />
            </div>
          ) : grantable.length === 0 ? (
            <p className="px-6 py-8 text-sm text-[var(--via-text-muted)]">
              Não há dashboards de outras pessoas para liberar.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--via-border-soft)]">
              {grantable.map((d) => {
                const on = grants.has(d.id);
                return (
                  <li key={d.id} className="flex items-center justify-between gap-3 px-6 py-3">
                    <Label
                      htmlFor={`grant-${d.id}`}
                      className="min-w-0 flex-1 cursor-pointer truncate text-sm font-normal text-[var(--via-text-body)]"
                    >
                      {d.title}
                    </Label>
                    <Switch
                      id={`grant-${d.id}`}
                      checked={on}
                      disabled={busy === d.id}
                      onCheckedChange={(v) => void toggle(d, v)}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ==========================================================================
 * Revenue++ · Usuários redesenhada
 *
 * A tela antiga dividia a largura entre um formulário sempre aberto e uma lista
 * com quatro controles por linha (papel, dashboards, editar, excluir), e o
 * texto do papel não cabia no seletor. Aqui a página é a lista de pessoas:
 * avatar, nome, papel em selo, uma ação principal (Acessos) e o resto num menu.
 * Adicionar vira um botão no topo que abre o mesmo formulário num modal; os
 * convites pendentes ganham seção própria.
 * ======================================================================== */

const AVATAR_TONES = ["#0A1F3B", "#1E3A5F", "#335379", "#5E7B9E", "#2A4A6E"];

function initialsOf(name: string) {
  const parts = name
    .trim()
    .split(/[\s@._-]+/)
    .filter(Boolean);
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function Avatar({ name, dashed = false }: { name: string; dashed?: boolean }) {
  const tone =
    AVATAR_TONES[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_TONES.length];
  return dashed ? (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--via-border)] text-[var(--via-text-muted)]">
      <Mail className="h-4 w-4" />
    </span>
  ) : (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
      style={{ background: tone }}
      aria-hidden
    >
      {initialsOf(name)}
    </span>
  );
}

function RolePill({ role }: { role: AppRole }) {
  return (
    <span
      className={
        role === "admin"
          ? "inline-flex items-center gap-1 rounded-full bg-[var(--via-navy)] px-2.5 py-0.5 text-xs font-medium text-white"
          : "inline-flex items-center rounded-full border border-[var(--via-border)] px-2.5 py-0.5 text-xs font-medium text-[var(--via-text-primary)]"
      }
    >
      {role === "admin" && <ShieldCheck className="h-3 w-3" />}
      {role === "admin" ? "Administrador" : "Membro"}
    </span>
  );
}

function UsersPageRpp(props: {
  users: DirectoryUser[];
  meId: string | null;
  adminCount: number;
  pendingInvites: Invite[];
  addForm: React.ReactNode;
  addOpen: boolean;
  setAddOpen: (v: boolean) => void;
  onRoleChange: (u: DirectoryUser, r: AppRole) => void;
  onGrants: (u: DirectoryUser) => void;
  onEdit: (u: DirectoryUser) => void;
  onDelete: (u: DirectoryUser) => void;
  onRevoke: (i: Invite) => void;
  onCopyLink: () => void;
}) {
  const { users, meId, adminCount, pendingInvites } = props;
  const resumo = [
    `${users.length} ${users.length === 1 ? "pessoa" : "pessoas"}`,
    `${adminCount} ${adminCount === 1 ? "administrador" : "administradores"}`,
    pendingInvites.length > 0 &&
      `${pendingInvites.length} ${pendingInvites.length === 1 ? "convite pendente" : "convites pendentes"}`,
  ].filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
            Administração
          </p>
          <h1 className="text-3xl font-medium tracking-[-0.025em] text-[var(--via-text-primary)]">
            Usuários e acessos
          </h1>
          <p className="mt-1.5 text-sm text-[var(--via-text-muted)]">{resumo.join(" · ")}</p>
        </div>
        <Button onClick={() => props.setAddOpen(true)}>
          <UserPlus className="h-4 w-4" />
          Adicionar pessoa
        </Button>
      </div>

      <section>
        <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
          Pessoas
        </p>
        <ul className="divide-y divide-[var(--via-border-soft)] overflow-hidden rounded-[var(--via-radius-lg)] border border-[var(--via-border-soft)] bg-[var(--via-surface)]">
          {users.map((u) => {
            const self = u.id === meId;
            return (
              <li key={u.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <Avatar name={u.fullName || u.email} />
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--via-text-primary)]">
                    <span className="truncate">{u.fullName || u.email}</span>
                    {self && (
                      <span className="text-xs font-normal text-[var(--via-text-muted)]">você</span>
                    )}
                  </p>
                  <p className="truncate text-sm text-[var(--via-text-muted)]">
                    {u.fullName ? u.email : "Sem nome cadastrado"}
                  </p>
                </div>
                <div className="hidden w-32 shrink-0 sm:block">
                  <RolePill role={u.role} />
                  <p className="mt-1 text-xs text-[var(--via-text-muted)]">
                    entrou {formatRelativeDate(u.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button variant="outline" size="sm" onClick={() => props.onGrants(u)}>
                    <LayoutDashboard className="h-4 w-4" />
                    Acessos
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        aria-label={`Mais ações para ${u.email}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onSelect={() => props.onEdit(u)}>
                        <Pencil className="h-4 w-4" /> Editar nome e senha
                      </DropdownMenuItem>
                      {!self && (
                        <DropdownMenuItem
                          onSelect={() =>
                            props.onRoleChange(u, u.role === "admin" ? "member" : "admin")
                          }
                        >
                          <ShieldCheck className="h-4 w-4" />
                          {u.role === "admin" ? "Tornar membro" : "Tornar administrador"}
                        </DropdownMenuItem>
                      )}
                      {!self && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => props.onDelete(u)}
                            className="text-[var(--via-coral-dark)] focus:text-[var(--via-coral-dark)]"
                          >
                            <Trash2 className="h-4 w-4" /> Excluir pessoa
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {pendingInvites.length > 0 && (
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-[var(--via-text-muted)]">
              Convites pendentes
            </p>
            <Button variant="ghost" size="sm" onClick={props.onCopyLink}>
              <Copy className="h-4 w-4" />
              Copiar link de cadastro
            </Button>
          </div>
          <ul className="divide-y divide-[var(--via-border-soft)] overflow-hidden rounded-[var(--via-radius-lg)] border border-dashed border-[var(--via-border)] bg-[var(--via-surface)]">
            {pendingInvites.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center gap-4 px-5 py-3.5">
                <Avatar name={i.email} dashed />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[var(--via-text-primary)]">{i.email}</p>
                  <p className="text-xs text-[var(--via-text-muted)]">
                    {i.role === "admin" ? "Administrador" : "Membro"} · convidado{" "}
                    {formatRelativeDate(i.createdAt)} · ainda não se cadastrou
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => props.onRevoke(i)}>
                  Revogar
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Dialog open={props.addOpen} onOpenChange={props.setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar pessoa</DialogTitle>
            <DialogDescription>
              Ela entra como membro (vê os dashboards que você liberar) ou administrador (vê tudo).
            </DialogDescription>
          </DialogHeader>
          {props.addForm}
        </DialogContent>
      </Dialog>
    </div>
  );
}
