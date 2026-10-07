import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import solifyhubLogo from "@/assets/solifyhub-logo.png";
import {
  ArrowUp,
  ChevronDown,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";

import { useEffect, useState, type ReactNode } from "react";

/* =====================================================
   PEETHAM LOGO
   Directly importing the PNG image from assets folder
===================================================== */
import peethamLogo from "@/assets/peetham-logo.png";

import { calculators } from "@/lib/site-data";
import { copy, useSite } from "./site-context";
import { ButtonLink } from "./ui/button";


const horoscopeItems = [
  "daily",
  "tomorrow",
  "yesterday",
  "weekly",
  "monthly",
  "yearly",
];

const panchangItems = [
  "today",
  "tomorrow",
  "rahu-kaal",
  "choghadiya",
  "tithi",
  "vaar",
  "hora",
  "karana",
  "shubh-muhurat",
];


const titleCase = (value: string) =>
  value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");


/* =====================================================
   DROPDOWN
===================================================== */

function Dropdown({
  label,
  type,
}: {
  label: string;
  type:
    | "horoscope"
    | "calculators"
    | "panchang"
    | "consultations";
}) {

  const [open, setOpen] = useState(false);

  const items =
    type === "horoscope"
      ? horoscopeItems
      : type === "panchang"
      ? panchangItems
      : type === "calculators"
      ? calculators.map(([slug]) => slug)
      : ["chat", "call"];

  return (
    <div
      className="group/nav relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >

      <button
        className="nav-link"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {label}

        <ChevronDown size={14} />
      </button>


      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: -5,
            }}

            className={`mega-menu ${
              type === "calculators"
                ? "mega-wide"
                : ""
            }`}
          >

            {items.map((slug) => {

              if (type === "calculators")

                return (
                  <Link
                    key={slug}
                    to="/calculators/$slug"
                    params={{ slug }}
                    onClick={() => setOpen(false)}
                  >
                    {titleCase(slug)} Calculator
                  </Link>
                );


              if (type === "horoscope")

                return (
                  <Link
                    key={slug}
                    to="/horoscope/$period"
                    params={{ period: slug }}
                    onClick={() => setOpen(false)}
                  >
                    {titleCase(slug)} Horoscope
                  </Link>
                );


              if (type === "panchang")

                return (
                  <Link
                    key={slug}
                    to="/panchang/$topic"
                    params={{ topic: slug }}
                    onClick={() => setOpen(false)}
                  >
                    {titleCase(slug)}
                  </Link>
                );


              return (
                <Link
                  key={slug}
                  to="/consultations/$mode"
                  params={{ mode: slug }}
                  onClick={() => setOpen(false)}
                >
                  {titleCase(slug)} with Astrologer
                </Link>
              );

            })}

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}


/* =====================================================
   SITE LAYOUT
===================================================== */

export function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {

  const {
    language,
    setLanguage,
    dark,
    toggleDark,
  } = useSite();

  const t = copy[language];

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  const [showTop, setShowTop] =
    useState(false);


  const pathname = useRouterState({
    select: (state) =>
      state.location.pathname,
  });


  useEffect(() => {

    setMobileOpen(false);

    window.scrollTo({
      top: 0,
    });

  }, [pathname]);


  useEffect(() => {

    const onScroll = () => {

      setScrolled(scrollY > 24);

      setShowTop(scrollY > 600);

    };

    addEventListener(
      "scroll",
      onScroll
    );

    return () =>
      removeEventListener(
        "scroll",
        onScroll
      );

  }, []);


  return (

    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className={`site-header ${
          scrolled
            ? "is-scrolled"
            : ""
        }`}
      >

        <div className="header-inner">


          {/* PEETHAM LOGO */}

          <Link
            to="/"
            className="brand"
          >

            <img
              src={peethamLogo}
              alt="Sri Sri Sri Lalitha Tripura Sundari Peetham"
            />

          </Link>


          {/* DESKTOP NAVIGATION */}

          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >

            <Link
              to="/"
              className="nav-link"
              activeOptions={{
                exact: true,
              }}
            >
              {t.home}
            </Link>


            <Link
              to="/about"
              className="nav-link"
            >
              {t.about}
            </Link>


            <Dropdown
              label={t.consult}
              type="consultations"
            />


            <Dropdown
              label={t.horoscope}
              type="horoscope"
            />


            <Dropdown
              label={t.calculators}
              type="calculators"
            />


            <Dropdown
              label={t.panchang}
              type="panchang"
            />


            <Link
              to="/shop"
              className="nav-link"
            >
              {t.shop}
            </Link>


            <Link
              to="/kundali-se-naukari"
              className="nav-link"
            >
              Career
            </Link>

          </nav>


          {/* HEADER ACTIONS */}

          <div className="header-actions">

            <button
              className="icon-button language-button"
              onClick={() =>
                setLanguage(
                  language === "en"
                    ? "te"
                    : "en"
                )
              }
              aria-label="Change language"
            >

              {language === "en"
                ? "EN"
                : "తె"}

            </button>


            <button
              className="icon-button"
              onClick={toggleDark}
              aria-label="Toggle color theme"
            >

              {dark ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}

            </button>


            <a
              href="tel:+919000985000"
              className="call-button"
            >

              <Phone size={16} />

              <span>
                {t.call}
              </span>

            </a>


            <button
              className="icon-button mobile-trigger"
              onClick={() =>
                setMobileOpen(true)
              }
              aria-label="Open menu"
            >

              <Menu />

            </button>

          </div>

        </div>

      </header>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>

        {mobileOpen && (
          <>

            <motion.button
              className="drawer-backdrop"
              aria-label="Close menu"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileOpen(false)
              }
            />


            <motion.aside
              className="mobile-drawer"
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
            >

              <div className="flex items-center justify-between border-b border-border pb-4">

                <strong className="font-display text-temple">
                  Navigation
                </strong>


                <button
                  className="icon-button"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  aria-label="Close menu"
                >
                  <X />
                </button>

              </div>


              <nav className="mt-5 grid gap-1">

                <Link to="/">
                  {t.home}
                </Link>

                <Link to="/about">
                  {t.about}
                </Link>

                <Link to="/consultations">
                  {t.consult}
                </Link>

                <Link
                  to="/horoscope/$period"
                  params={{
                    period: "daily",
                  }}
                >
                  {t.horoscope}
                </Link>

                <Link to="/calculators">
                  {t.calculators}
                </Link>

                <Link to="/panchang">
                  {t.panchang}
                </Link>

                <Link to="/services">
                  Services
                </Link>

                <Link to="/pujas">
                  Pujas & Homams
                </Link>

                <Link to="/shop">
                  {t.shop}
                </Link>

                <Link to="/kundali-se-naukari">
                  Kundali Se Naukari
                </Link>

                <Link to="/contact">
                  Contact
                </Link>

              </nav>

            </motion.aside>

          </>
        )}

      </AnimatePresence>


      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <AnimatePresence mode="wait">

        <motion.main
          key={pathname}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 8,
          }}
          transition={{
            duration: 0.35,
          }}
        >

          {children}

        </motion.main>

      </AnimatePresence>


      {/* FOOTER */}

      <Footer />


      {/* FLOATING ACTIONS */}

      <div className="floating-actions">

        <a
          href="https://wa.me/919000985000"
          aria-label="WhatsApp"
        >
          <MessageCircle />
        </a>


        <a
          href="tel:+919000985000"
          aria-label="Call"
        >
          <Phone />
        </a>


        {showTop && (

          <button
            onClick={() =>
              scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            aria-label="Back to top"
          >

            <ArrowUp />

          </button>

        )}

      </div>


      {/* MOBILE BOTTOM NAV */}

      <nav
        className="bottom-nav"
        aria-label="Mobile navigation"
      >

        <Link to="/">
          ⌂
          <span>{t.home}</span>
        </Link>


        <Link
          to="/horoscope/$period"
          params={{
            period: "daily",
          }}
        >
          ♈
          <span>{t.horoscope}</span>
        </Link>


        <Link to="/consultations">
          ☏
          <span>{t.consult}</span>
        </Link>


        <Link to="/panchang">
          ☼
          <span>{t.panchang}</span>
        </Link>


        <button
          onClick={() =>
            setMobileOpen(true)
          }
        >
          ☰
          <span>More</span>
        </button>

      </nav>

    </div>
  );
}


/* =====================================================
   FOOTER
===================================================== */

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#590002",
        color: "#FFFFFF",
      }}
    >
      <div className="page-shell footer-grid">

        {/* PEETHAM LOGO */}
        <div className="footer-brand">
          <Link to="/">
            <img
              src={peethamLogo}
              alt="Sri Sri Sri Lalitha Tripura Sundari Peetham"
              className="footer-logo"
            />
          </Link>

          <p style={{ color: "#FFFFFF" }}>
            Vedic astrology and sacred spiritual
            guidance rooted in tradition,
            delivered with care.
          </p>
        </div>


        {/* ASTROLOGY */}
        <div>
          <h3 style={{ color: "#FFFFFF" }}>Astrology</h3>

          <Link
            to="/horoscope/$period"
            params={{
              period: "daily",
            }}
            style={{ color: "#FFFFFF" }}
          >
            Horoscope
          </Link>

          <Link
            to="/consultations"
            style={{ color: "#FFFFFF" }}
          >
            Consultations
          </Link>

          <Link
            to="/calculators"
            style={{ color: "#FFFFFF" }}
          >
            Calculators
          </Link>

          <Link
            to="/panchang"
            style={{ color: "#FFFFFF" }}
          >
            Panchang
          </Link>
        </div>


        {/* SERVICES */}
        <div>
          <h3 style={{ color: "#FFFFFF" }}>Services</h3>

          <Link
            to="/services"
            style={{ color: "#FFFFFF" }}
          >
            All Services
          </Link>

          <Link
            to="/pujas"
            style={{ color: "#FFFFFF" }}
          >
            Pujas & Homams
          </Link>

          <Link
            to="/services"
            style={{ color: "#FFFFFF" }}
          >
            Vastu & Muhurtham
          </Link>
        </div>


        {/* EXPLORE */}
        <div>
          <h3 style={{ color: "#FFFFFF" }}>Explore</h3>

          <Link
            to="/shop"
            style={{ color: "#FFFFFF" }}
          >
            Gemstones
          </Link>

          <Link
            to="/shop"
            style={{ color: "#FFFFFF" }}
          >
            Rudrakshas
          </Link>

          <Link
            to="/shop"
            style={{ color: "#FFFFFF" }}
          >
            Yantras
          </Link>
        </div>


        {/* CONTACT */}
        <div>
          <h3 style={{ color: "#FFFFFF" }}>Contact</h3>

          <p style={{ color: "#FFFFFF" }}>
            Near Old Sivalayam
            <br />
            Simhachalam, Adavivaram
            <br />
            Visakhapatnam
          </p>

          <a
            href="tel:+919000985000"
            style={{ color: "#FFFFFF" }}
          >
            90009 85000
          </a>

          <a
            href="tel:+919666577775"
            style={{ color: "#FFFFFF" }}
          >
            96665 77775
          </a>
        </div>

      </div>


      {/* FOOTER BOTTOM */}
     <div
  className="page-shell footer-bottom"
  style={{
    borderTop: "1px solid rgba(255,255,255,0.18)",
    color: "#FFFFFF",
  }}
>
  <div className="flex flex-wrap items-center justify-center gap-2">
    <p style={{ color: "#FFFFFF" }}>
      © 2026 Sri Sri Sri Lalitha Tripura Sundari Peetham.
      All Rights Reserved.
    </p>

    <span style={{ color: "rgba(255,255,255,0.75)" }}>
      Designed by
    </span>

    <a
      href="https://solifyhub.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit SolifyHub website"
      style={{
        color: "#FFFFFF",
        fontWeight: "600",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      SolifyHub
    </a>
  </div>

  <p style={{ color: "rgba(255,255,255,0.75)" }}>
    Astrology is based on traditional belief systems and is intended
    for guidance.
  </p>
</div>
    </footer>
  );
}