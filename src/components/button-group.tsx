import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Button } from "@/components/button";
import type { ButtonProps } from "@/components/button";

const buttonGroupVariants = cva("inline-flex", {
  variants: {
    variant: {
      primary: "",
      destructive: "",
      outline: "",
      ghost: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
      "2xl": "",
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonGroupVariants> {
  readonly children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(({ className, variant = "outline", size, children, ...props }, ref) => {
  const groupClasses = cn(buttonGroupVariants({ variant, size, className }));

  return (
    <div className={groupClasses} ref={ref} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<ButtonProps>(child) && child.type === Button) {
          return React.cloneElement(child, {
            variant,
            size,
            className: cn(
              child.props.className,
              "first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none",
              index !== 0 && "-ml-px"
            ),
          });
        }
        return child;
      })}
    </div>
  );
});

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup, buttonGroupVariants };
