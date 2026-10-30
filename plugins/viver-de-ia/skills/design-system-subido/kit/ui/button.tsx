import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Pill navy do DS: raio 999, 13px/500, tracking negativo e press instantâneo
  // (110ms) — resposta no pointer-down, nunca na duração de transição padrão.
  "ds-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[0.8125rem] font-medium tracking-[-0.008em] transition-all duration-[var(--via-dur)] ease-[var(--via-ease-snap)] active:scale-[0.985] active:duration-[var(--via-dur-press)] focus-visible:outline-none focus-visible:shadow-[var(--via-shadow-focus)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "ds-btn--primary bg-[linear-gradient(180deg,var(--via-navy),var(--via-navy-deep))] text-[var(--via-white)] shadow-[0_1px_0_var(--via-edge-hi)_inset,0_6px_16px_-10px_var(--via-shadow-ink-20)] hover:brightness-110 dark:bg-none dark:bg-[var(--via-text-primary)] dark:text-[var(--via-surface)] dark:hover:brightness-95",
        destructive:
          "ds-btn--destructive bg-[var(--via-coral)] text-[var(--via-white)] hover:bg-[var(--via-coral-deep)]",
        outline:
          "ds-btn--outline border border-[var(--via-border)] bg-transparent text-[var(--via-text-primary)] hover:bg-[var(--via-navy-06)] hover:border-[var(--via-navy-20)]",
        secondary:
          "ds-btn--secondary bg-[var(--via-gray-100)] text-[var(--via-text-primary)] hover:bg-[var(--via-navy-06)]",
        ghost: "ds-btn--ghost text-[var(--via-text-body)] hover:bg-[var(--via-navy-06)]",
        link: "ds-btn--link text-[var(--via-text-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "ds-btn--md h-9 px-[18px] py-[10px]",
        sm: "ds-btn--sm h-8 px-4 text-xs",
        lg: "ds-btn--lg h-11 px-7 text-sm",
        icon: "ds-btn--icon h-9 w-9 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
