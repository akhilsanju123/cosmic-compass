import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import ammaImage from "@/assets/Amma.png";

import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Compass,
  Gem,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Users,
} from "lucide-react";

import { useState, type FormEvent } from "react";

/* =========================================================
   SPIRITUAL GUIDE IMAGE
   Direct PNG import
========================================================= */

import spiritualGuide from "@/assets/spiritual-guide.png";

import { FeatureCard } from "@/components/page-shell";
import { Button, ButtonLink } from "@/components/ui/button";
import { ZodiacWheel } from "@/components/zodiac-wheel";

import {
  calculators,
  pujas,
  rashis,
  services,
  sunSign,
} from "@/lib/site-data";


/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Vedic Astrology & Spiritual Guidance | Sri Lalitha Peetham",
      },
      {
        name: "description",
        content:
          "Discover Vedic horoscope guidance, Panchang, consultations, pujas and sacred services from Sri Lalitha Tripura Sundari Peetham.",
      },
      {
        property: "og:title",
        content:
          "Sri Lalitha Tripura Sundari Peetham",
      },
      {
        property: "og:description",
        content:
          "Modern Vedic astrology and sacred spiritual guidance in Visakhapatnam.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: Home,
});


/* =========================================================
   ANIMATION
========================================================= */

const reveal = {
  initial: {
    opacity: 0,
    y: 22,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  viewport: {
    once: true,
    margin: "-70px",
  },

  transition: {
    duration: 0.55,
  },
};


const serviceIcons = [
  Compass,
  ShieldCheck,
  CalendarDays,
  Sparkles,
  Users,
  Heart,
  Gem,
  Sun,
];


/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      {...reveal}
      className="section-title"
    >
      <span className="eyebrow">
        ✦ {eyebrow}
      </span>

      <h2
        className={`font-display text-3xl font-bold md:text-5xl ${light
          ? "text-temple-foreground"
          : ""
          }`}
      >
        {title}
      </h2>

      {text && (
        <p
          className={
            light
              ? "text-temple-foreground/75"
              : "text-muted-foreground"
          }
        >
          {text}
        </p>
      )}
    </motion.div>
  );
}


/* =========================================================
   HOME
========================================================= */

function Home() {
  return (
    <>
      <Hero />

      <QuickActions />

      <RashiFinder />

      <DailyRashi />

      <Astrologers />

      <Guidance />

      <Services />

      <Tools />

      <PanchangPreview />

      <PujaBand />

      <Products />

      <AboutPreview />

      <WhyChoose />

      <Testimonials />

      <Faq />

      <ContactCta />
    </>
  );
}


/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="home-hero">

      <div className="celestial-lines" />

      <div className="page-shell hero-grid">

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="relative z-10"
        >

          <motion.span
            variants={{
              hidden: {
                opacity: 0,
                y: 16,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            className="eyebrow"
          >
            ✦ Vedic astrology • Spiritual guidance
          </motion.span>


          <motion.h1
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            className="mt-6 font-display text-5xl font-bold leading-[1.06] md:text-7xl"
          >
            Discover what your{" "}
            <em>stars reveal.</em>
          </motion.h1>


          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg"
          >
            Personalized Vedic astrology,
            horoscope guidance, Panchang,
            Vastu, Muhurthams, Pujas and
            Homams from Sri Sri Sri Lalitha
            Tripura Sundari Peetham.
          </motion.p>


          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            className="mt-8 flex flex-wrap gap-3"
          >

            <ButtonLink
              to="/horoscope/$period"
              params={{
                period: "daily",
              }}
            >
              Discover my horoscope
              <ArrowRight size={17} />
            </ButtonLink>


            <ButtonLink
              to="/consultations"
              variant="secondary"
            >
              Talk to astrologer
            </ButtonLink>

          </motion.div>


          <motion.div
            variants={{
              hidden: {
                opacity: 0,
              },
              show: {
                opacity: 1,
              },
            }}
            className="mt-9 flex flex-wrap gap-5 text-xs font-semibold text-muted-foreground"
          >

            <span className="inline-flex gap-2">

              <CheckCircle2
                size={16}
                className="text-success"
              />

              Traditional Vedic guidance

            </span>


            <span className="inline-flex gap-2">

              <CheckCircle2
                size={16}
                className="text-success"
              />

              English & Telugu

            </span>

          </motion.div>

        </motion.div>


        {/* ZODIAC WHEEL */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
          className="relative"
        >

          <ZodiacWheel />

          {/* AMMA IMAGE IN CENTER */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">

            <div className="flex h-[170px] w-[170px] items-center justify-center overflow-hidden rounded-full md:h-[200px] md:w-[200px]">

              <img
                src={ammaImage}
                alt="Sri Lalitha Tripura Sundari Amma"
                className="h-full w-full object-cover"
              />

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}


/* =========================================================
   QUICK ACTIONS
========================================================= */

function QuickActions() {

  const data = [
    [
      MessageCircle,
      "Chat with Astrologer",
      "Start a personal guidance conversation.",
      "/consultations",
    ],
    [
      Phone,
      "Call Astrologer",
      "Speak directly with our guidance team.",
      "/consultations",
    ],
    [
      Sun,
      "Daily Horoscope",
      "Read your sign’s daily spiritual insight.",
      "/services",
    ],
    [
      CalendarDays,
      "Today’s Panchang",
      "Plan the day with traditional timings.",
      "/panchang",
    ],
  ] as const;


  return (
    <section className="quick-strip">

      <div className="page-shell quick-grid">

        {data.map(
          ([Icon, title, text, to], i) => (

            <motion.div
              key={title}
              {...reveal}
              transition={{
                delay: i * 0.07,
              }}
            >

              <FeatureCard
                icon={<Icon />}
                title={title}
                text={text}
                to={to}
              />

            </motion.div>

          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   RASHI FINDER
========================================================= */

function RashiFinder() {

  const [result, setResult] =
    useState<
      (typeof rashis)[number] | null
    >(null);

  const [name, setName] =
    useState("");

  const [details, setDetails] = useState<{
    dob: string;
    tob: string;
    pob: string;
    tithi?: string;
    nakshatra?: string;
    lagna?: string;
    moonSign?: string;
    sunSignVedic?: string;
    sunSignWestern?: string;
    rashiTelugu?: string;
    dashaBalance?: string;
    chakram?: Record<string, string>;
  } | null>(null);

  const [loading, setLoading] =
    useState(false);


  const submit = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    const data =
      new FormData(e.currentTarget);

    setLoading(true);

    const prompt = `Calculate exact authentic Vedic astrological details for a person born on ${String(data.get("dob"))} at ${String(data.get("tob"))} in ${String(data.get("pob"))}.
Return ONLY a valid JSON object with the following structure (do not use markdown blocks like \`\`\`json, just pure JSON):
{
  "tithi": "string",
  "nakshatra": "string",
  "lagna": "string",
  "moonSign": "string",
  "sunSignVedic": "string",
  "sunSignWestern": "string",
  "rashiTelugu": "string",
  "dashaBalance": "string",
  "chakram": {
    "mesha": "string (comma separated list of planets/Lagna here, or empty string)",
    "vrishabha": "string",
    "mithuna": "string",
    "karka": "string",
    "simha": "string",
    "kanya": "string",
    "tula": "string",
    "vrischika": "string",
    "dhanu": "string",
    "makara": "string",
    "kumbha": "string",
    "meena": "string"
  }
}`;

    try {
      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!geminiApiKey) {
        throw new Error("Gemini API key is not configured. Set VITE_GEMINI_API_KEY in your environment.");
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error?.message || "API request failed");
      }

      let text = json.candidates[0].content.parts[0].text;
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const generatedData = JSON.parse(text);

      setResult(
        sunSign(
          String(data.get("dob"))
        )
      );

      setDetails({
        dob: String(data.get("dob")),
        tob: String(data.get("tob")),
        pob: String(data.get("pob")),
        ...generatedData
      });
    } catch (error: any) {
      console.error(error);
      alert(`API Error: ${error.message}. Falling back to mock data.`);

      // Fallback to mock data so the UI doesn't break completely
      setResult(sunSign(String(data.get("dob"))));
      setDetails({
        dob: String(data.get("dob")),
        tob: String(data.get("tob")),
        pob: String(data.get("pob")),
        tithi: "Purnima (Mock)",
        nakshatra: "Rohini, 2 Pada (Mock)",
        lagna: "Vrishabha (Mock)",
        moonSign: "Mithuna (Mock)",
        sunSignVedic: "Simha (Mock)",
        sunSignWestern: "Leo (Mock)",
        rashiTelugu: "సింహ రాశి (Mock)",
        dashaBalance: "Chandra: 4y 2m 15d (Mock)",
        chakram: {
          mesha: "Lagna",
          vrishabha: "",
          mithuna: "Moon",
          karka: "",
          simha: "Sun",
          kanya: "",
          tula: "",
          vrischika: "",
          dhanu: "",
          makara: "",
          kumbha: "",
          meena: ""
        }
      });
    } finally {
      setLoading(false);
    }
  };


  return (

    <section className="section-band">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Personal insight"
          title="Find your Rashi"
          text="Enter your details and discover a sun-sign based quick horoscope."
        />


        <div className="finder-grid">

          <motion.form
            {...reveal}
            className="finder-card"
            onSubmit={submit}
          >

            <div className="grid gap-4 sm:grid-cols-2">

              <label>
                Your name

                <input
                  name="name"
                  required
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />
              </label>


              <label>
                Date of birth

                <input
                  name="dob"
                  type="date"
                  required
                />
              </label>

              <label>
                Time of birth

                <input
                  name="tob"
                  type="time"
                  required
                />
              </label>

              <label>
                Place of birth

                <input
                  name="pob"
                  type="text"
                  required
                  placeholder="City, State, Country"
                />
              </label>

            </div>


            <Button
              className="mt-5 w-full"
              type="submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="loader-ring" />
                  Reading your stars...
                </>
              ) : (
                <>
                  Show my horoscope
                  <ArrowRight size={17} />
                </>
              )}

            </Button>


            <p className="mt-3 text-xs text-muted-foreground">
              This quick result uses your
              Western sun sign. Accurate
              Vedic Rashi requires exact
              birth time and place.
            </p>

          </motion.form>


          <AnimatePresenceResult
            result={result}
            name={name}
            details={details}
          />

        </div>


        <div className="accurate-card">

          <div>

            <span className="eyebrow">
              For deeper insight
            </span>

            <h3 className="mt-3 font-display text-2xl font-bold">
              Get your accurate Vedic Rashi
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Moon Rashi, Nakshatra,
              Lagna and Dasha require an
              ephemeris service. This form
              is ready for that future
              connection.
            </p>

          </div>


          <ButtonLink
            to="/calculators/$slug"
            params={{
              slug: "rashi",
            }}
          >
            Calculate my Vedic details
          </ButtonLink>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   RASHI RESULT
========================================================= */

function AnimatePresenceResult({
  result,
  name,
  details,
}: {
  result: (typeof rashis)[number] | null;
  name: string;
  details: {
    dob: string;
    tob: string;
    pob: string;
    tithi?: string;
    nakshatra?: string;
    lagna?: string;
    moonSign?: string;
    sunSignVedic?: string;
    sunSignWestern?: string;
    rashiTelugu?: string;
    dashaBalance?: string;
    chakram?: Record<string, string>;
  } | null;
}) {
  if (!result || !details)
    return (
      <div className="result-placeholder">
        <ZodiacWheel />
        <p>Your result will appear here</p>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="result-card lg:col-span-2"
    >
      <div className="flex flex-col lg:flex-row gap-8 w-full p-4">
        {/* Left column: Details Table */}
        <div className="flex-1 space-y-4">
          <div className="border-b pb-4 border-amber-900/10">
            <h3 className="font-display text-2xl font-bold uppercase tracking-wider">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">Detailed Vedic Horoscope</p>
          </div>

          <table className="w-full text-sm text-left">
            <tbody className="divide-y divide-amber-900/10">
              <tr><th className="py-2 font-medium w-1/3">Name</th><td className="py-2">{name}</td></tr>
              <tr><th className="py-2 font-medium">Date of Birth</th><td className="py-2">{details.dob}</td></tr>
              <tr><th className="py-2 font-medium">Time of Birth</th><td className="py-2">{details.tob}</td></tr>
              <tr><th className="py-2 font-medium">Place of Birth</th><td className="py-2">{details.pob}</td></tr>
              <tr><th className="py-2 font-medium">Sun Sign</th><td className="py-2">{details.sunSignVedic} ({details.sunSignWestern})</td></tr>
              <tr><th className="py-2 font-medium">Rashi</th><td className="py-2">{details.rashiTelugu}</td></tr>
              <tr><th className="py-2 font-medium">Tithi</th><td className="py-2">{details.tithi}</td></tr>
              <tr><th className="py-2 font-medium">Nakshatra</th><td className="py-2">{details.nakshatra}</td></tr>
              <tr><th className="py-2 font-medium">Lagna</th><td className="py-2">{details.lagna}</td></tr>
              <tr><th className="py-2 font-medium">Moon Sign</th><td className="py-2">{details.moonSign}</td></tr>
              <tr><th className="py-2 font-medium">Dasha Balance</th><td className="py-2">{details.dashaBalance}</td></tr>
            </tbody>
          </table>
          {/* <p className="text-xs text-muted-foreground mt-4 italic">
            This detailed report was generated dynamically using AI for accurate celestial placement based on your input.
          </p> */}
        </div>

        {/* Right column: South Indian Chakram */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm aspect-square border-4 border-amber-900/80 p-1 relative grid grid-cols-4 grid-rows-4 bg-amber-50">

            {/* Corner Boxes */}
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col">Meena<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.meena}</span></div>
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col">Mesha<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.mesha}</span></div>
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col">Vrishabha<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.vrishabha}</span></div>
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col">Mithuna<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.mithuna}</span></div>

            {/* Left Edge */}
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col col-start-1 row-start-2">Kumbha<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.kumbha}</span></div>

            {/* Center Area (spans 2x2) */}
            <div className="col-start-2 col-span-2 row-start-2 row-span-2 flex flex-col items-center justify-center text-center border border-amber-900/40 p-2 relative">

              {/* Diagonal lines crossing the center - optional aesthetic */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
                  <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              <span className="font-display text-2xl font-bold text-amber-900 z-10 bg-amber-50 px-2 rounded">
                రాశి చక్రం
              </span>
              <span className="text-sm font-semibold text-amber-800 z-10 mt-1">Rashi Chakram</span>
            </div>

            {/* Right Edge */}
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col col-start-4 row-start-2">Karka<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.karka}</span></div>

            {/* Left Edge 2 */}
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col col-start-1 row-start-3">Makara<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.makara}</span></div>

            {/* Right Edge 2 */}
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col col-start-4 row-start-3">Simha<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.simha}</span></div>

            {/* Bottom Row */}
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col col-start-1 row-start-4">Dhanu<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.dhanu}</span></div>
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col col-start-2 row-start-4">Vrischika<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.vrischika}</span></div>
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col col-start-3 row-start-4">Tula<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.tula}</span></div>
            <div className="border border-amber-900/40 p-2 flex items-center justify-center text-center font-bold text-sm text-amber-950 flex-col col-start-4 row-start-4">Kanya<br /><span className="text-xs font-normal text-amber-700">{details.chakram?.kanya}</span></div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}


/* =========================================================
   DAILY RASHI
========================================================= */

function DailyRashi() {

  const [tab, setTab] =
    useState("Today");


  return (

    <section className="py-20">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Celestial rhythm"
          title="Your daily horoscope"
          text="Explore a gentle reflection for every Rashi."
        />


        <div className="tabs">

          {[
            "Today",
            "Tomorrow",
            "Weekly",
            "Monthly",
          ].map((x) => (

            <button
              key={x}
              className={
                tab === x
                  ? "active"
                  : ""
              }
              onClick={() =>
                setTab(x)
              }
            >
              {x}
            </button>

          ))}

        </div>


        <div className="rashi-grid">

          {rashis.map((r, i) => (

            <motion.div
              {...reveal}
              transition={{
                delay:
                  (i % 6) * 0.04,
              }}
              className="rashi-card"
              key={r.western}
            >

              <div className="rashi-symbol">
                {r.symbol}
              </div>

              <p className="telugu">
                {r.telugu}
              </p>

              <h3>{r.vedic}</h3>

              <span>
                {r.western}
              </span>

              <Link
                to="/horoscope/$period"
                params={{
                  period:
                    tab.toLowerCase(),
                }}
                className="card-arrow"
                aria-label={`Read ${r.western} horoscope`}
              >
                <ArrowRight />
              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   ASTROLOGERS
   SPIRITUAL-GUIDE.PNG USED HERE
========================================================= */

function Astrologers() {

  return (

    <section className="section-band">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Personal consultation"
          title="Talk to our astrologers"
          text="Connect with knowledgeable guides for private, thoughtful consultation."
        />


        <div className="expert-row">

          {[
            "Vedic Astrology",
            "Vastu & Muhurtham",
            "Numerology & Remedies",
          ].map((x, i) => (

            <article
              className="expert-card"
              key={x}
            >

              <div className="expert-avatar">

                {i === 0 ? (

                  <img
                    src={spiritualGuide}
                    alt="Spiritual guide"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition:
                        "top center",
                    }}
                  />

                ) : (

                  <Star />

                )}

              </div>


              <div>

                <span className="demo-tag">
                  Consultation team
                </span>

                <h3>{x}</h3>

                <p>
                  Telugu • English
                </p>

                <p className="text-xs">
                  Appointments confirmed
                  by phone
                </p>

              </div>


              <div className="expert-actions">

                <ButtonLink
                  to="/consultations/$mode"
                  params={{
                    mode: "chat",
                  }}
                >
                  Chat
                </ButtonLink>


                <ButtonLink
                  to="/consultations/$mode"
                  params={{
                    mode: "call",
                  }}
                  variant="secondary"
                >
                  Call
                </ButtonLink>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   GUIDANCE
========================================================= */

function Guidance() {

  return (

    <section className="py-20">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Choose your path"
          title="Find the right guidance"
        />


        <div className="guidance-grid">

          {[
            "Love",
            "Marriage",
            "Career",
            "Business & Money",
            "Vastu",
            "Numerology",
            "Remedies",
            "Puja",
          ].map((x, i) => {

            const Icon =
              serviceIcons[i] ??
              Sparkles;

            return (

              <Link
                key={x}
                to="/services"
              >

                <Icon />

                <span>{x}</span>

              </Link>

            );

          })}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   SERVICES
========================================================= */

function Services() {

  return (

    <section className="section-band">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Traditional knowledge"
          title="Sacred services & expert guidance"
        />


        <div className="service-grid">

          {services.map((x, i) => {

            const Icon =
              serviceIcons[
              i %
              serviceIcons.length
              ] ?? Sparkles;


            return (

              <FeatureCard
                key={x}
                icon={<Icon />}
                title={x}
                text="Thoughtful guidance rooted in Vedic and temple traditions."
                to="/services"
              />

            );

          })}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   TOOLS
========================================================= */

function Tools() {

  return (

    <section className="py-20">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Explore freely"
          title="Popular astrology tools"
        />


        <div className="tools-grid">

          {calculators
            .slice(0, 10)
            .map(
              ([slug, title]) => (

                <Link
                  key={slug}
                  to="/calculators/$slug"
                  params={{
                    slug,
                  }}
                >

                  <Sparkles />

                  <span>
                    {title}
                  </span>

                  <ArrowRight />

                </Link>

              )
            )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   PANCHANG
========================================================= */

function PanchangPreview() {

  return (

    <section className="section-band">

      <div className="page-shell">

        <div className="panchang-card">

          <div>

            <SectionTitle
              eyebrow="Daily almanac"
              title="Today’s Panchang"
              text="Select a date and place to prepare for authentic calculations once a Panchang service is connected."
            />


            <div className="grid gap-3 sm:grid-cols-2">

              <label>
                Date
                <input type="date" />
              </label>


              <label>
                Location
                <input placeholder="Visakhapatnam" />
              </label>

            </div>


            <ButtonLink
              to="/panchang"
              className="mt-5"
            >
              View complete Panchang
            </ButtonLink>

          </div>


          <div className="panchang-values">

            <span className="demo-tag">
              API-ready preview
            </span>


            {[
              "Sunrise",
              "Sunset",
              "Tithi",
              "Nakshatra",
              "Yoga",
              "Karana",
              "Rahu Kalam",
              "Abhijit Muhurat",
            ].map((x) => (

              <div key={x}>

                <span>{x}</span>

                <strong>
                  Connect service
                </strong>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   PUJAS
========================================================= */

function PujaBand() {

  return (

    <section className="puja-band">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Sacred ceremonies"
          title="Sacred Pujas & Homams"
          text="Traditional rituals performed with devotion and proper Vedic observance."
          light
        />


        <div className="puja-grid">

          {pujas.map((x) => (

            <article key={x}>

              <Sparkles />

              <h3>{x}</h3>

              <ButtonLink to="/pujas">
                Book puja
              </ButtonLink>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   PRODUCTS
========================================================= */

function Products() {

  const items = [
    {
      Icon: Gem,
      title: "Gemstones",
    },
    {
      Icon: Sun,
      title: "Rudrakshas",
    },
    {
      Icon: Compass,
      title: "Panchaloha Yantras",
    },
    {
      Icon: Sparkles,
      title: "Puja Items",
    },
  ];


  return (

    <section className="py-20">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Sacred essentials"
          title="Spiritual products"
        />


        <div className="product-grid">

          {items.map(
            ({
              Icon,
              title,
            }) => (

              <article key={title}>

                <div className="product-visual">
                  <Icon />
                </div>

                <h3>
                  {title}
                </h3>

                <p>
                  Authentic spiritual items
                  selected with care.
                </p>

                <ButtonLink
                  to="/shop"
                  variant="secondary"
                >
                  View products
                </ButtonLink>

              </article>

            )
          )}

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   ABOUT PREVIEW
   SPIRITUAL-GUIDE.PNG USED HERE
========================================================= */

function AboutPreview() {

  return (

    <section className="about-preview">

      <div className="page-shell about-grid">

        <motion.div
          {...reveal}
          className="guide-frame"
        >

          <img
            src={spiritualGuide}
            alt="Spiritual guide of Sri Lalitha Tripura Sundari Peetham"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition:
                "top center",
            }}
          />

        </motion.div>


        <div>

          <SectionTitle
            eyebrow="About the Peetham"
            title="Tradition, guidance and compassionate service"
            text="Sri Sri Sri Lalitha Tripura Sundari Peetham brings Vedic knowledge, sacred worship and personal spiritual guidance together in a warm, modern experience."
          />


          <ButtonLink to="/about">

            Our story

            <ArrowRight size={17} />

          </ButtonLink>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   WHY CHOOSE
========================================================= */

function WhyChoose() {

  return (

    <section className="py-20">

      <div className="page-shell">

        <SectionTitle
          eyebrow="Our approach"
          title="Guidance you can trust"
        />


        <div className="three-grid">

          <FeatureCard
            icon={<ShieldCheck />}
            title="Rooted in tradition"
            text="Services follow respected Vedic and South Indian spiritual practices."
          />


          <FeatureCard
            icon={<Heart />}
            title="Personal attention"
            text="Every enquiry is heard with discretion, empathy and respect."
          />


          <FeatureCard
            icon={<Sparkles />}
            title="Clear & responsible"
            text="We guide without fear, pressure or promises of guaranteed outcomes."
          />

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   TESTIMONIALS
========================================================= */

function Testimonials() {

  return (

    <section className="quote-band">

      <div className="page-shell text-center">

        <span className="eyebrow">
          A thoughtful experience
        </span>


        <blockquote>
          “Spiritual guidance begins
          with listening, clarity and
          faith — not promises.”
        </blockquote>


        <p>
          Our principle of service
        </p>

      </div>

    </section>
  );
}


/* =========================================================
   FAQ
========================================================= */

function Faq() {

  const items = [

    [
      "Can I speak in Telugu?",
      "Yes. Consultation support is available in Telugu and English.",
    ],

    [
      "Are horoscope results exact?",
      "Quick results are sun-sign based. Precise Vedic calculations require birth time, place and a dedicated ephemeris service.",
    ],

    [
      "How do I book a Puja?",
      "Choose a service and contact our team. They will confirm the date, requirements and offering.",
    ],

    [
      "Do you guarantee outcomes?",
      "No. Astrology and spiritual practices are traditional guidance and do not guarantee specific results.",
    ],

  ];


  return (

    <section className="py-20">

      <div className="page-shell narrow">

        <SectionTitle
          eyebrow="Helpful answers"
          title="Frequently asked questions"
        />


        {items.map(
          ([q, a]) => (

            <details key={q}>

              <summary>
                {q}
                <span>+</span>
              </summary>

              <p>{a}</p>

            </details>

          )
        )}

      </div>

    </section>
  );
}


/* =========================================================
   CONTACT CTA
========================================================= */

function ContactCta() {

  return (

    <section className="contact-cta">

      <div className="page-shell">

        <div>

          <span className="eyebrow">
            We are here to guide you
          </span>


          <h2>
            Begin a thoughtful conversation.
          </h2>


          <p>

            <MapPin size={17} />

            Near Old Sivalayam,
            Simhachalam,
            Visakhapatnam

          </p>

        </div>


        <div className="flex flex-wrap gap-3">

          <a
            className="call-button large"
            href="tel:+919000985000"
          >

            <Phone />

            90009 85000

          </a>


          <ButtonLink
            to="/contact"
            variant="secondary"
          >
            Contact us
          </ButtonLink>

        </div>

      </div>

    </section>
  );
}