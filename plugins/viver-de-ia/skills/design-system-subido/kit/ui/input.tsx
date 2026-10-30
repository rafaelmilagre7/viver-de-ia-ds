import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ds-field flex h-9 w-full rounded-[var(--via-radius-md)] border border-[var(--via-border)] bg-[var(--via-glass-card)] px-3 py-1 text-base transition-all duration-[var(--via-dur)] ease-[var(--via-ease-snap)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[var(--via-text-faint)] focus-visible:outline-none focus-visible:border-[var(--via-navy-20)] focus-visible:shadow-[0_0_0_3px_var(--via-navy-10)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
