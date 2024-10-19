import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "h-9 rounded-lg px-3 text-sm [&_svg]:size-5",
        md: "h-10 rounded-lg px-3.5 text-sm [&_svg]:size-5",
        lg: "h-11 rounded-lg px-4 text-base [&_svg]:size-5",
        xl: "h-12 rounded-lg px-4.5 text-base [&_svg]:size-6",
        "2xl": "h-14 rounded-xl px-5.5 text-lg [&_svg]:size-7",
        "icon-sm": "size-9 rounded-lg [&_svg]:size-5",
        "icon-md": "size-10 rounded-lg [&_svg]:size-5",
        "icon-lg": "size-11 rounded-lg [&_svg]:size-5",
        "icon-xl": "size-12 rounded-lg [&_svg]:size-6",
        "icon-2xl": "size-14 rounded-xl [&_svg]:size-7",
      },
      variant: {
        primary: "bg-primary-600 text-white hover:bg-primary-700 disabled:bg-bg-disabled disabled:text-t-disabled",
        destructive: "bg-error-600 text-white hover:bg-error-700 disabled:bg-bg-disabled disabled:text-t-disabled",
        outline: "border border-b-primary hover:bg-bg-primary-hover disabled:text-t-disabled disabled:opacity-50 disabled:hover:bg-transparent",
        ghost: "hover:bg-bg-primary-hover disabled:text-t-disabled disabled:opacity-50 disabled:hover:bg-transparent",
        link: "h-fit rounded-sm px-0 hover:underline disabled:text-t-disabled disabled:opacity-50 disabled:hover:no-underline",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const buttonClasses = cn(buttonVariants({ variant, size, className }));

  return <Comp ref={ref} className={buttonClasses} {...props} />;
});

Button.displayName = "Button";

// ================================== //

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
    size: "sm",
  },
});

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonGroupVariants> {
  readonly children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(({ className, variant = "outline", size = "sm", children, ...props }, ref) => {
  const groupClasses = cn(buttonGroupVariants({ variant, size, className }));

  return (
    <div ref={ref} className={groupClasses} {...props}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<ButtonProps>(child) && child.type === Button) {
          const isIconOnly = React.Children.count(child.props.children) === 1 && React.isValidElement(child.props.children);

          return React.cloneElement(child, {
            variant,
            size: isIconOnly && (index === 0 || index === React.Children.count(children) - 1) ? `icon-${size!}` : size,
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

// ================================== //

export { Button, ButtonGroup };
