import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[.97] disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-primary text-primary-foreground shadow-button hover:-translate-y-0.5 hover:bg-primary-bright", primary: "bg-primary text-primary-foreground shadow-button hover:-translate-y-0.5 hover:bg-primary-bright", secondary: "border border-primary/70 bg-card text-foreground hover:-translate-y-0.5 hover:bg-temple hover:text-temple-foreground", outline: "border border-input bg-background hover:bg-accent", ghost: "text-foreground hover:bg-accent", link: "text-temple underline-offset-4 hover:underline", destructive: "bg-destructive text-destructive-foreground" }, size: { default: "h-11 px-5", sm: "h-9 px-3", lg: "h-12 px-7", icon: "size-10 p-0", "icon-sm": "size-8 p-0", "icon-lg": "size-12 p-0" } }, defaultVariants: { variant: "default", size: "default" } });
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, size, className, ...props }, ref) => <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}/>);
Button.displayName = "Button";
type StaticPath = "/"|"/about"|"/consultations"|"/calculators"|"/panchang"|"/services"|"/pujas"|"/shop"|"/kundali-se-naukari"|"/contact";
type ButtonLinkProps = { children: ReactNode; variant?: "primary"|"secondary"|"ghost"; className?: string } & ({to: StaticPath; params?: never}|{to:"/horoscope/$period";params:{period:string}}|{to:"/calculators/$slug";params:{slug:string}}|{to:"/consultations/$mode";params:{mode:string}}|{to:"/panchang/$topic";params:{topic:string}});
export function ButtonLink({ to, children, variant = "primary", className, params }: ButtonLinkProps) {
  const classes=cn(buttonVariants({ variant }), className);
  if(to==="/horoscope/$period") return <Link to={to} params={params}>{children}</Link>;
  if(to==="/calculators/$slug") return <Link to={to} params={params}>{children}</Link>;
  if(to==="/consultations/$mode") return <Link to={to} params={params}>{children}</Link>;
  if(to==="/panchang/$topic") return <Link to={to} params={params}>{children}</Link>;
  return <Link to={to} className={classes}>{children}</Link>;
}