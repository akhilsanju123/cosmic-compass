import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const styles = { primary: "bg-primary text-primary-foreground shadow-button hover:-translate-y-0.5 hover:bg-primary-bright", secondary: "border border-primary/70 bg-card text-foreground hover:-translate-y-0.5 hover:bg-temple hover:text-temple-foreground", ghost: "text-foreground hover:bg-accent" };
export function Button({ variant = "primary", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof styles }) {
  return <button className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[.97]", styles[variant], className)} {...props} />;
}
export function ButtonLink({ to, children, variant = "primary", className }: { to: string; children: ReactNode; variant?: keyof typeof styles; className?: string }) {
  return <Link to={to} className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[.97]", styles[variant], className)}>{children}</Link>;
}