import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "./ui/button";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-hero"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="page-shell py-16 md:py-24"><span className="eyebrow"><Sparkles size={15}/>{eyebrow}</span><h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{text}</p></motion.div></section>;
}

export function FeatureCard({ icon, title, text, to }: { icon: React.ReactNode; title: string; text: string; to?: "/services"|"/consultations/chat"|"/consultations/call"|"/horoscope/daily"|"/panchang/today" }) {
  const content = <><div className="icon-disc">{icon}</div><h3 className="mt-5 font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>{to && <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-temple">Explore <ArrowRight size={15}/></span>}</>;
  return to ? <ButtonLink to={to} variant="ghost" className="feature-card h-auto items-start text-left">{content}</ButtonLink> : <article className="feature-card">{content}</article>;
}