import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-[#0a0e17] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medusse-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-body",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-medusse-blue to-cinematic-accent text-white hover:opacity-90 shadow-lg shadow-medusse-blue/25",
        destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
        outline:
          "border border-white/25 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm",
        secondary:
          "bg-white text-cinematic-bg hover:bg-white/90",
        ghost: "hover:bg-white/10 text-white",
        link: "text-medusse-blue underline-offset-4 hover:underline",
        dark: "bg-cinematic-surface text-white hover:bg-white/10 border border-white/10",
      },
      size: {
        default: "h-10 px-8 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-12 rounded-full px-10 text-base",
        icon: "h-10 w-10",
        xl: "h-14 px-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
