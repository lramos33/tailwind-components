import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Link from "next/link";

// ================================== //

const buttonVariants = cva(
  cn("flex h-9 items-center justify-center rounded-lg", "disabled:cursor-not-allowed disabled:border-none disabled:bg-slate-200 disabled:text-quaternary"),
  {
    variants: {
      format: {
        icon: "w-9 text-xl",
        default: "gap-2 px-4 text-sm font-semibold",
      },
      variant: {
        ghost: "hover:bg-bg-tertiary",
        primary: "bg-primary-600 text-white hover:bg-primary-700",
        red: "bg-red-600 text-white hover:bg-red-700 danger",
        green: "bg-green-600 text-white hover:bg-green-700",
        outline: "border bg-white font-medium hover:bg-bg-tertiary",
        unstyled: "size-fit rounded-none p-0 text-base font-normal",
        link: "px-0 hover:underline disabled:bg-transparent hover:disabled:no-underline",
      },
    },
    defaultVariants: {
      variant: "primary",
      format: "default",
    },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  readonly href?: string;
  readonly asIcon?: boolean;
  readonly isExternal?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, href, variant, asIcon, className, isExternal, disabled, format = "default", ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant, format: asIcon ? "icon" : format }),
            className,
            disabled && "text-quaternary cursor-not-allowed border-none bg-slate-200 hover:bg-slate-200"
          )}
          {...(isExternal && { target: "_blank" })}
        >
          {children}
        </Link>
      );
    }

    return (
      <button {...props} ref={ref} disabled={disabled} className={cn(buttonVariants({ variant, format: asIcon ? "icon" : format }), className)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// ================================== //

export { Button };
