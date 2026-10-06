import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Language = "en" | "te";
type SiteContextValue = { language: Language; setLanguage: (v: Language) => void; dark: boolean; toggleDark: () => void };
const SiteContext = createContext<SiteContextValue | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const savedLang = localStorage.getItem("peetham-language") as Language | null;
    const savedTheme = localStorage.getItem("peetham-theme");
    if (savedLang === "en" || savedLang === "te") setLanguageState(savedLang);
    setDark(savedTheme ? savedTheme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  const setLanguage = (value: Language) => { setLanguageState(value); localStorage.setItem("peetham-language", value); };
  const toggleDark = () => setDark((value) => { localStorage.setItem("peetham-theme", !value ? "dark" : "light"); return !value; });
  return <SiteContext.Provider value={{ language, setLanguage, dark, toggleDark }}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used within SiteProvider");
  return value;
}

export const copy = {
  en: { home: "Home", about: "About", consult: "Consultations", horoscope: "Horoscope", calculators: "Calculators", panchang: "Panchang", shop: "Shop", call: "Call now", discover: "Discover my horoscope", talk: "Talk to astrologer" },
  te: { home: "హోమ్", about: "మా గురించి", consult: "జ్యోతిష్య సంప్రదింపులు", horoscope: "రాశిఫలాలు", calculators: "కాలిక్యులేటర్లు", panchang: "పంచాంగం", shop: "షాప్", call: "కాల్ చేయండి", discover: "నా రాశిఫలం చూడండి", talk: "జ్యోతిష్యునితో మాట్లాడండి" },
};