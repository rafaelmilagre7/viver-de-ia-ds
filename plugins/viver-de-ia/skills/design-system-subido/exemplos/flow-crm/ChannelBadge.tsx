import {
  AtSign, Cloud, Facebook, Instagram, MessageCircle, MessageSquare, Send, Twitter, Youtube,
} from "lucide-react";

import { BrandIcon } from "@/components/brand/brand-icon";

type IconType = typeof MessageCircle;

/** Metadados de cada canal de atendimento (rótulo + ícone Lucide). */
export const CHANNEL_META: Record<string, { label: string; Icon: IconType }> = {
  whatsapp: { label: "WhatsApp", Icon: MessageCircle },
  instagram: { label: "Instagram", Icon: Instagram },
  facebook: { label: "Facebook", Icon: Facebook },
  telegram: { label: "Telegram", Icon: Send },
  twitter: { label: "Twitter/X", Icon: Twitter },
  youtube: { label: "YouTube", Icon: Youtube },
  reddit: { label: "Reddit", Icon: MessageSquare },
  bluesky: { label: "Bluesky", Icon: Cloud },
  threads: { label: "Threads", Icon: AtSign },
};

export function channelMeta(channel: string | null | undefined) {
  return CHANNEL_META[channel ?? "whatsapp"] ?? CHANNEL_META.whatsapp;
}

/** Badge compacto do canal: só o ícone (com title) ou ícone + rótulo. */
export function ChannelBadge({
  channel, showLabel = false, className = "",
}: {
  channel: string | null | undefined;
  showLabel?: boolean;
  className?: string;
}) {
  const { label } = channelMeta(channel);
  if (showLabel) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${className}`}
        style={{ background: "var(--via-surface)", color: "var(--via-text-body)" }}
      >
        {/* DS SUBIDO: canal é marca, aparece com o logo oficial */}
        <BrandIcon id={channel ?? "whatsapp"} size={14} />
        {label}
      </span>
    );
  }
  return (
    // role="img": aria-label em <span> sem role é atributo proibido pela ARIA
    // (axe: aria-prohibited-attr). Com role, o ícone vira imagem nomeada.
    <span
      className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${className}`}
      style={{ background: "var(--via-surface)", color: "var(--via-text-muted)" }}
      title={label}
      role="img"
      aria-label={label}
    >
      <BrandIcon id={channel ?? "whatsapp"} size={12} />
    </span>
  );
}
