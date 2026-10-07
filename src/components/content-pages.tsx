import { Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Compass, Gem, Heart, MessageCircle, Phone, ShoppingBag, Sparkles, Star, Sun } from "lucide-react";
import guideAsset from "@/assets/spiritual-guide.png.asset.json";
import { calculators, pujas, rashis, services } from "@/lib/site-data";
import { FeatureCard, PageHero } from "./page-shell";
import { Button, ButtonLink } from "./ui/button";

interface AboutPageProps {
  spiritualGuideImage: string;
}

const icons = [Sparkles, Compass, Heart, CalendarDays, Star, Sun];
export const pageMeta = (title: string, description: string) => ({ meta: [{ title: `${title} | Sri Lalitha Peetham` }, { name: "description", content: description }, { property: "og:title", content: `${title} | Sri Lalitha Peetham` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] });

export function AboutPage({
  spiritualGuideImage,
}: AboutPageProps) {
  return (
    <>
      {/* HERO SECTION */}
      <PageHero
        eyebrow="Our sacred purpose"
        title="A modern doorway to timeless Vedic guidance"
        text="Sri Sri Sri Lalitha Tripura Sundari Peetham serves seekers through astrology, pujas, Vastu and spiritual guidance rooted in care and tradition."
      />

      {/* ABOUT SECTION */}
      <section className="py-20">
        <div className="page-shell about-detail">

          {/* SPIRITUAL GUIDE IMAGE */}
          <div className="guide-frame">
            <img
              src={spiritualGuideImage}
              alt="Spiritual guide at Sri Lalitha Tripura Sundari Peetham"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ABOUT CONTENT */}
          <div>
            <span className="eyebrow">
              About the Peetham
            </span>

            <h2 className="mt-5 font-display text-4xl font-bold">
              Guidance with devotion and clarity
            </h2>

            <p className="mt-5 leading-8 text-muted-foreground">
              Our approach brings respected Vedic traditions into an
              accessible experience for today’s families. We listen closely,
              explain clearly, and approach every consultation and ceremony
              with sincerity.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Vedic Astrology",
                "Pujas & Homams",
                "Vastu Guidance",
                "Muhurthams",
                "Astrologers & Priests",
                "Responsible guidance",
              ].map((x) => (
                <div className="mini-point" key={x}>
                  <Sparkles />
                  {x}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section-band">
        <div className="page-shell">
          <div className="three-grid">

            <FeatureCard
              icon={<Heart />}
              title="Our spiritual mission"
              text="Help people approach important moments with reflection, prayer and considered guidance."
            />

            <FeatureCard
              icon={<Compass />}
              title="Our approach"
              text="Traditional knowledge, respectful conversation and clear next steps without exaggerated claims."
            />

            <FeatureCard
              icon={<Star />}
              title="Why choose us"
              text="A local Peetham identity, Telugu support and a broad range of sacred services in one place."
            />

          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="py-20">
        <div className="page-shell contact-location">

          <div>
            <span className="eyebrow">
              Visit the Peetham
            </span>

            <h2>Near Old Sivalayam</h2>

            <p>
              Simhachalam, Adavivaram
              <br />
              Visakhapatnam, Andhra Pradesh, India
            </p>
          </div>

          <div>
            <a href="tel:+919000985000">
              90009 85000
            </a>

            <a href="tel:+919666577775">
              96665 77775
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
export function ConsultationsPage({ mode }: { mode?: string }) { const title=mode ? `${mode === "chat" ? "Chat" : "Call"} with an astrologer` : "Astrology consultations"; const options=[{Icon:MessageCircle,label:"Vedic astrology",text:"Life, relationships and important decisions"},{Icon:BriefcaseBusiness,label:"Career guidance",text:"Career direction and professional questions"},{Icon:Compass,label:"Vastu & Muhurtham",text:"Spaces, ceremonies and auspicious timings"}]; return <><PageHero eyebrow="Personal guidance" title={title} text="Share your question with our consultation team and find the right guide for your needs."/><section className="py-20"><div className="page-shell three-grid">{options.map(({Icon,label,text})=><FeatureCard key={label} icon={<Icon/>} title={label} text={text}/>)}</div><div className="page-shell mt-10 text-center"><a href={mode==="chat"?"https://wa.me/919000985000":"tel:+919000985000"} className="call-button large">{mode==="chat"?<MessageCircle/>:<Phone/>}{mode==="chat"?"Start WhatsApp chat":"Call 90009 85000"}</a><p className="mt-4 text-xs text-muted-foreground">Appointments and availability are confirmed directly by our team.</p></div></section></> }

export function HoroscopePage({ period }: { period: string }) { const label=period.charAt(0).toUpperCase()+period.slice(1); return <><PageHero eyebrow="Rashi guidance" title={`${label} horoscope`} text={`Reflect on the ${period} spiritual themes for your Rashi. Select a sign to begin.`}/><section className="py-20"><div className="page-shell rashi-grid">{rashis.map(r=><article className="rashi-card" key={r.western}><div className="rashi-symbol">{r.symbol}</div><p className="telugu">{r.telugu}</p><h3>{r.vedic}</h3><span>{r.western}</span><p className="mt-4 text-xs leading-5">Pause, prioritize clearly and meet the day with patience.</p></article>)}</div><p className="page-shell mt-8 text-center text-xs text-muted-foreground">General traditional guidance only. Individual readings require full birth details.</p></section></> }

export function CalculatorsPage() { return <><PageHero eyebrow="Free astrology tools" title="Explore Vedic calculators" text="Simple tools for reflection and discovery. Exact Vedic outputs will be enabled through a dedicated ephemeris connection."/><section className="py-20"><div className="page-shell service-grid">{calculators.map(([slug,title],i)=>{const Icon=icons[i%icons.length] ?? Sparkles;return <Link key={slug} to="/calculators/$slug" params={{slug}} className="feature-card"><div className="icon-disc"><Icon/></div><h3 className="mt-5 font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">Open this guided calculation experience.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-temple">Explore <ArrowRight size={15}/></span></Link>})}</div></section></> }

export function CalculatorDetail({ slug }: { slug: string }) { const name=calculators.find(([s])=>s===slug)?.[1]??"Astrology Calculator"; return <><PageHero eyebrow="Astrology calculator" title={name} text="Enter your details to prepare an accurate calculation through a future Vedic astrology service."/><section className="py-20"><div className="page-shell calculator-layout"><form className="tool-form" onSubmit={e=>e.preventDefault()}><label>Your name<input required placeholder="Enter your name"/></label><label>Date of birth<input required type="date"/></label><label>Exact birth time<input type="time"/></label><label>Birth place<input placeholder="City, State"/></label><Button type="submit">Prepare my details <ArrowRight size={17}/></Button></form><aside className="info-panel"><Sparkles/><h2>Accurate calculation required</h2><p>This experience is ready to connect to a trusted ephemeris engine. We do not fabricate planetary positions, Rashi, Nakshatra or Dasha results.</p><ButtonLink to="/consultations">Talk to our team</ButtonLink></aside></div></section></> }

export function PanchangPage({ topic }: { topic?: string }) { const title=topic?topic.split("-").map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(" "):"Panchang"; return <><PageHero eyebrow="Traditional Vedic calendar" title={title} text="Choose your date and location for precise daily Panchang details once the calculation service is connected."/><section className="py-20"><div className="page-shell panchang-card"><div className="tool-form"><label>Date<input type="date"/></label><label>Location<input placeholder="Visakhapatnam"/></label><Button>View Panchang</Button></div><div className="panchang-values"><span className="demo-tag">API-ready fields</span>{["Sunrise","Sunset","Tithi","Nakshatra","Yoga","Karana","Rahu Kalam","Abhijit Muhurat"].map(x=><div key={x}><span>{x}</span><strong>Connect service</strong></div>)}</div></div></section></> }

export function ServicesPage() { return <><PageHero eyebrow="Peetham services" title="Sacred services & expert guidance" text="Explore astrology, Vastu, sacred ceremonies, traditional products and community support."/><section className="py-20"><div className="page-shell service-grid">{services.map((title,i)=>{const Icon=icons[i%icons.length] ?? Sparkles;return <FeatureCard key={title} icon={<Icon/>} title={title} text="Personal, respectful guidance rooted in tradition."/>})}</div></section></> }
export function PujasPage() { return <><PageHero eyebrow="Sacred ceremonies" title="Pujas & Homams" text="Book traditional worship and Vedic ceremonies with our Peetham team."/><section className="py-20"><div className="page-shell three-grid">{pujas.map(title=><FeatureCard key={title} icon={<Sparkles/>} title={title} text="Contact us for purpose, schedule, requirements and offering details."/>)}</div><div className="page-shell mt-10 text-center"><ButtonLink to="/contact">Request a booking</ButtonLink></div></section></> }
export function ShopPage() { return <><PageHero eyebrow="Sacred essentials" title="Spiritual shop" text="Explore thoughtfully selected gemstones, Rudrakshas, Panchaloha Yantras and puja essentials."/><section className="py-20"><div className="page-shell product-grid">{["Gemstones","Rudrakshas","Panchaloha Yantras","Puja Items","Spiritual Products"].map((title,i)=>{const Icon=i===0?Gem:i===3?Sparkles:ShoppingBag;return <article key={title}><div className="product-visual"><Icon/></div><h3>{title}</h3><p>Selection and pricing are confirmed by our team.</p><ButtonLink to="/contact" variant="secondary">Enquire</ButtonLink></article>})}</div></section></> }

export function CareerPage() { return <><PageHero eyebrow="Kundali Se Naukari" title="What does your Kundali say about your career?" text="Prepare your birth and career details for a thoughtful consultation about professional direction."/><section className="py-20"><div className="page-shell calculator-layout"><form className="tool-form grid-cols-2" onSubmit={e=>e.preventDefault()}>{[["Name","text"],["Date of birth","date"],["Exact birth time","time"],["Birth place","text"],["Current profession","text"],["Career concern","text"]].map(([x,type])=><label key={x}>{x}<input type={type}/></label>)}<Button className="sm:col-span-2">Analyse my career Kundali</Button></form><div className="info-panel"><BriefcaseBusiness/><h2>What we explore</h2>{["Career strengths","10th house analysis","Planetary influences","Job vs business","Career periods","Traditional remedies"].map(x=><p key={x}>• {x}</p>)}<p className="mt-4 text-xs">Astrology offers traditional guidance and does not guarantee employment or career success.</p></div></div></section></> }

export function ContactPage() { return <><PageHero eyebrow="Contact the Peetham" title="We are here to listen" text="Reach us for astrology consultations, Pujas, Vastu, Muhurthams and spiritual guidance."/><section className="py-20"><div className="page-shell calculator-layout"><form className="tool-form" onSubmit={e=>e.preventDefault()}><label>Name<input required/></label><label>Mobile number<input required inputMode="tel"/></label><label>What guidance do you need?<textarea rows={4}/></label><Button>Request callback</Button></form><div className="info-panel"><Phone/><h2>Speak with our team</h2><a href="tel:+919000985000">90009 85000</a><a href="tel:+919666577775">96665 77775</a><h3 className="mt-5 font-bold">Visit us</h3><p>Near Old Sivalayam<br/>Simhachalam, Adavivaram<br/>Visakhapatnam, Andhra Pradesh</p></div></div></section></> }