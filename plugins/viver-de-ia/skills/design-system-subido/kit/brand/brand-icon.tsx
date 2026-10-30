import {
  siGoogleanalytics,
  siGoogleads,
  siGooglebigquery,
  siGooglesheets,
  siHubspot,
  siMeta,
  siMysql,
  siPostgresql,
  siStripe,
  siSupabase,
  siGooglesearchconsole,
  siYoutube,
  siGoogle,
  siResend,
  siOpenai,
  siAnthropic,
  siGooglegemini,
  siWhatsapp,
  siInstagram,
  siElevenlabs,
  siTwilio,
  siGmail,
  siCaldotcom,
  siGooglecalendar,
  siSalesforce,
  siN8n,
  siMake,
  siLivekit,
  siDeepgram,
  siMessenger,
  siTelegram,
  siZapier,
  siFacebook,
  siX,
  siReddit,
  siBluesky,
  siThreads,
} from "simple-icons";
import {
  Building2,
  Combine,
  CreditCard,
  FileSpreadsheet,
  KanbanSquare,
  Landmark,
  Package,
  Receipt,
  Sparkles,
  Store,
  Terminal,
  Wallet,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Identidade visual das fontes. Marcas com logo livre (simple-icons, CC0)
 * usam o logo na cor oficial; as demais usam um ícone temático na cor da
 * marca — identificável de longe, sem fingir um logo que não temos.
 */
type Brand =
  | { kind: "svg"; path: string; hex: string; title: string }
  | { kind: "icon"; Icon: LucideIcon; hex: string; title: string };

const BRANDS: Record<string, Brand> = {
  supabase: { kind: "svg", path: siSupabase.path, hex: siSupabase.hex, title: "Supabase" },
  sheets: {
    kind: "svg",
    path: siGooglesheets.path,
    hex: siGooglesheets.hex,
    title: "Google Sheets",
  },
  postgres: { kind: "svg", path: siPostgresql.path, hex: siPostgresql.hex, title: "Postgres" },
  mysql: { kind: "svg", path: siMysql.path, hex: siMysql.hex, title: "MySQL" },
  bigquery: {
    kind: "svg",
    path: siGooglebigquery.path,
    hex: siGooglebigquery.hex,
    title: "BigQuery",
  },
  stripe: { kind: "svg", path: siStripe.path, hex: siStripe.hex, title: "Stripe" },
  // canais e integrações do Flow CRM
  whatsapp: { kind: "svg", path: siWhatsapp.path, hex: siWhatsapp.hex, title: "WhatsApp" },
  instagram: { kind: "svg", path: siInstagram.path, hex: siInstagram.hex, title: "Instagram" },
  messenger: { kind: "svg", path: siMessenger.path, hex: siMessenger.hex, title: "Messenger" },
  telegram: { kind: "svg", path: siTelegram.path, hex: siTelegram.hex, title: "Telegram" },
  facebook: { kind: "svg", path: siFacebook.path, hex: siFacebook.hex, title: "Facebook" },
  twitter: { kind: "svg", path: siX.path, hex: siX.hex, title: "X (Twitter)" },
  youtube: { kind: "svg", path: siYoutube.path, hex: siYoutube.hex, title: "YouTube" },
  reddit: { kind: "svg", path: siReddit.path, hex: siReddit.hex, title: "Reddit" },
  bluesky: { kind: "svg", path: siBluesky.path, hex: siBluesky.hex, title: "Bluesky" },
  threads: { kind: "svg", path: siThreads.path, hex: siThreads.hex, title: "Threads" },
  meta_official: { kind: "svg", path: siMeta.path, hex: siMeta.hex, title: "API Oficial (Meta)" },
  elevenlabs: { kind: "svg", path: siElevenlabs.path, hex: siElevenlabs.hex, title: "ElevenLabs" },
  twilio: { kind: "svg", path: siTwilio.path, hex: siTwilio.hex, title: "Twilio" },
  gmail: { kind: "svg", path: siGmail.path, hex: siGmail.hex, title: "Gmail" },
  caldotcom: { kind: "svg", path: siCaldotcom.path, hex: siCaldotcom.hex, title: "Cal.com" },
  googlecalendar: {
    kind: "svg",
    path: siGooglecalendar.path,
    hex: siGooglecalendar.hex,
    title: "Google Calendar",
  },
  salesforce: { kind: "svg", path: siSalesforce.path, hex: siSalesforce.hex, title: "Salesforce" },
  n8n: { kind: "svg", path: siN8n.path, hex: siN8n.hex, title: "n8n" },
  make: { kind: "svg", path: siMake.path, hex: siMake.hex, title: "Make" },
  zapier: { kind: "svg", path: siZapier.path, hex: siZapier.hex, title: "Zapier" },
  // o simple-icons traz o LiveKit em branco: some no fundo claro
  livekit: { kind: "svg", path: siLivekit.path, hex: "101828", title: "LiveKit" },
  deepgram: { kind: "svg", path: siDeepgram.path, hex: "101828", title: "Deepgram" },
  // provedores de IA (Configurações → Inteligência artificial)
  openai: { kind: "svg", path: siOpenai.path, hex: siOpenai.hex, title: "OpenAI" },
  anthropic: { kind: "svg", path: siAnthropic.path, hex: siAnthropic.hex, title: "Anthropic" },
  gemini: {
    kind: "svg",
    path: siGooglegemini.path,
    hex: siGooglegemini.hex,
    title: "Google Gemini",
  },
  // sem logo no simple-icons: ícone temático na cor da marca até baixar o oficial
  xai: { kind: "icon", Icon: Sparkles, hex: "000000", title: "xAI (Grok)" },
  deepseek: { kind: "icon", Icon: Sparkles, hex: "4D6BFE", title: "DeepSeek" },
  lovable: { kind: "icon", Icon: Sparkles, hex: "FF6B6B", title: "Lovable AI" },
  // integrações da instalação (Administração → Instalação)
  google: { kind: "svg", path: siGoogle.path, hex: siGoogle.hex, title: "Google" },
  resend: { kind: "svg", path: siResend.path, hex: siResend.hex, title: "Resend" },
  hubspot: { kind: "svg", path: siHubspot.path, hex: siHubspot.hex, title: "HubSpot" },
  meta_ads: { kind: "svg", path: siMeta.path, hex: siMeta.hex, title: "Meta Ads" },
  google_ads: { kind: "svg", path: siGoogleads.path, hex: siGoogleads.hex, title: "Google Ads" },
  search_console: {
    kind: "svg",
    path: siGooglesearchconsole.path,
    hex: siGooglesearchconsole.hex,
    title: "Google Search Console",
  },
  youtube_analytics: {
    kind: "svg",
    path: siYoutube.path,
    hex: siYoutube.hex,
    title: "YouTube Analytics",
  },
  ga4: {
    kind: "svg",
    path: siGoogleanalytics.path,
    hex: siGoogleanalytics.hex,
    title: "Google Analytics",
  },
  // sem logo livre: ícone temático na cor da marca
  business_profile: {
    kind: "icon",
    Icon: Store,
    hex: "4285F4",
    title: "Perfil da Empresa no Google",
  },
  csv: { kind: "icon", Icon: FileSpreadsheet, hex: "1D6F42", title: "CSV ou Excel" },
  excel: { kind: "icon", Icon: FileSpreadsheet, hex: "1D6F42", title: "Excel" },
  pipedrive: { kind: "icon", Icon: KanbanSquare, hex: "017737", title: "Pipedrive" },
  asaas: { kind: "icon", Icon: Wallet, hex: "0030B9", title: "Asaas" },
  pagarme: { kind: "icon", Icon: CreditCard, hex: "65A300", title: "Pagar.me" },
  omie: { kind: "icon", Icon: Building2, hex: "00A3E0", title: "Omie" },
  bling: { kind: "icon", Icon: Package, hex: "2EB67D", title: "Bling" },
  tiny: { kind: "icon", Icon: Receipt, hex: "0E7C7B", title: "Tiny" },
  contaazul: { kind: "icon", Icon: Landmark, hex: "0F6CBD", title: "Conta Azul" },
  rdstation: { kind: "icon", Icon: Building2, hex: "19C1CE", title: "RD Station CRM" },
  webhook: { kind: "icon", Icon: Webhook, hex: "0A1F3B", title: "Webhook" },
  sql: { kind: "icon", Icon: Terminal, hex: "0A1F3B", title: "Consulta SQL" },
  combined: { kind: "icon", Icon: Combine, hex: "0A1F3B", title: "Fonte combinada" },
};

/**
 * Ícone oficial do app de cada marca (baixado dos sites delas), para as que o
 * simple-icons não traz. Regra do DS: provedor ou ferramenta aparece sempre
 * com o logo, nunca com um ícone genérico.
 */
const OFFICIAL: Record<string, string> = {
  pipedrive: "/brand/marcas/pipedrive.png",
  asaas: "/brand/marcas/asaas.png",
  pagarme: "/brand/marcas/pagarme.png",
  omie: "/brand/marcas/omie.png",
  bling: "/brand/marcas/bling.png",
  tiny: "/brand/marcas/tiny.png",
  contaazul: "/brand/marcas/contaazul.png",
  rdstation: "/brand/marcas/rdstation.png",
  xai: "/brand/marcas/xai.png",
  deepseek: "/brand/marcas/deepseek.png",
};

export function brandTitle(id: string): string | undefined {
  return BRANDS[id]?.title;
}

interface BrandIconProps {
  id: string;
  /** Tamanho do glifo em px. */
  size?: number;
  className?: string;
}

/** Só o glifo, na cor da marca. */
export function BrandIcon({ id, size = 20, className }: BrandIconProps) {
  const b = BRANDS[id];
  if (OFFICIAL[id]) {
    return (
      <img
        src={OFFICIAL[id]}
        alt={b?.title ?? ""}
        width={size}
        height={size}
        className={cn("rounded-[22%] object-contain", className)}
      />
    );
  }
  if (!b) {
    return <Package className={className} width={size} height={size} aria-hidden />;
  }
  if (b.kind === "svg") {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        role="img"
        aria-label={b.title}
        className={className}
        fill={`#${b.hex}`}
      >
        <path d={b.path} />
      </svg>
    );
  }
  const Icon = b.Icon;
  return (
    <Icon
      className={className}
      width={size}
      height={size}
      style={{ color: `#${b.hex}` }}
      aria-label={b.title}
    />
  );
}

/** Tile quadrado do DS (raio sm, lavagem da cor da marca) com o glifo dentro. */
export function BrandTile({ id, size = 40, className }: BrandIconProps) {
  const b = BRANDS[id];
  const hex = b?.hex ?? "0A1F3B";
  // o ícone oficial já é um app icon com fundo próprio: ocupa o tile inteiro
  // num fundo branco, em vez de boiar sobre a lavagem de cor
  if (OFFICIAL[id]) {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)] bg-white",
          className,
        )}
        style={{ width: size, height: size }}
        aria-hidden
      >
        <BrandIcon id={id} size={Math.round(size * 0.72)} />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[var(--via-radius-sm)] border border-[var(--via-border-soft)]",
        className,
      )}
      style={{ width: size, height: size, background: `#${hex}12` }}
      aria-hidden
    >
      <BrandIcon id={id} size={Math.round(size * 0.5)} />
    </span>
  );
}
