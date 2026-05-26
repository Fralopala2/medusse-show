import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id, ...props }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          "relative min-h-[100svh] w-full overflow-hidden",
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
