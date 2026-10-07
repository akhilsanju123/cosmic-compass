import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Grid3x3, ListTree, Orbit, UserRound } from "lucide-react";
import { divisional, PLANET_SYMBOL, RASHI, RASHI_TE, type Kundli, type PlanetName } from "@/lib/kundli";

const TABS = [
  { id: "details", label: "Details", icon: UserRound },
  { id: "charts", label: "Charts", icon: Grid3x3 },
  { id: "planets", label: "Planets", icon: Orbit },
  { id: "dasha", label: "Dasha", icon: ListTree },
] as const;
type Tab = (typeof TABS)[number]["id"];

const VARGAS = [
  { d: 1, code: "D1", name: "Lagna" }, { d: 9, code: "D9", name: "Navamsha" }, { d: 10, code: "D10", name: "Dashamamsha" },
  { d: 3, code: "D3", name: "Drekkana" }, { d: 7, code: "D7", name: "Saptamsha" }, { d: 12, code: "D12", name: "Dwadashamsha" },
  { d: 2, code: "D2", name: "Hora" }, { d: 30, code: "D30", name: "Trimsamsha" },
];
const DASHA_COLOR: Record<PlanetName, string> = { Sun: "#e67e22", Moon: "#8e44ad", Mars: "#e74c3c", Rahu: "#3498db", Jupiter: "#f39c12", Saturn: "#e91e63", Mercury: "#2c3e50", Ketu: "#7f8c8d", Venus: "#16a085" };

const fmtDate = (ms: number | Date) => new Date(ms).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
const rashi = (i: number) => `${RASHI[i]} · ${RASHI_TE[i]}`;

function Panel({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="k-panel">
      <button type="button" className="k-panel-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <h4>{title}</h4><ChevronDown size={18} className={open ? "rotate-180 transition" : "transition"} />
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="k-panel-body">{children}</div></motion.div>}
      </AnimatePresence>
    </div>
  );
}
const Row = ({ k, v, accent }: { k: string; v: ReactNode; accent?: boolean }) => <div className="k-row"><span>{k}</span><strong className={accent ? "text-gold" : ""}>{v}</strong></div>;

function MangalPanel({ data }: { data: Kundli }) {
  const { mangal } = data;
  const has = mangal.fromLagna || mangal.fromMoon;
  return (
    <Panel title="Mangal Dosha" defaultOpen={false}>
      <Row k="Mars house from Lagna" v={mangal.lagnaHouse} />
      <Row k="Mars house from Moon" v={mangal.moonHouse} />
      <Row k="Result" v={has ? `Present (${[mangal.fromLagna && "from Lagna", mangal.fromMoon && "from Moon"].filter(Boolean).join(", ")})` : "Not present"} accent />
      <p className="mt-3 text-xs text-muted-foreground">Based on Mars in houses 1, 2, 4, 7, 8 or 12. Cancellation rules need a personal consultation.</p>
    </Panel>
  );
}

const HOUSE_POS: [number, number][] = [[200, 110], [100, 45], [45, 110], [100, 200], [45, 300], [100, 360], [200, 300], [300, 360], [355, 300], [300, 200], [355, 110], [300, 45]];

function NorthChart({ houses }: { houses: string[][] }) {
  return (
    <svg viewBox="0 0 400 400" className="k-chart" role="img" aria-label="North Indian birth chart">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="396" height="396" />
        <line x1="2" y1="2" x2="398" y2="398" /><line x1="398" y1="2" x2="2" y2="398" />
        <polygon points="200,2 398,200 200,398 2,200" />
      </g>
      {HOUSE_POS.map(([x, y], i) => (
        <g key={i}>
          <text x={x - 30} y={y + 4} className="k-chart-num">{i + 1}</text>
          {houses[i].map((p, j) => <text key={p} x={x + 6} y={y + 4 + (j - (houses[i].length - 1) / 2) * 15} textAnchor="middle" className="k-chart-planet">{p.slice(0, 2)}</text>)}
        </g>
      ))}
    </svg>
  );
}

export function KundliReport({ data }: { data: Kundli }) {
  const [tab, setTab] = useState<Tab>("details");
  const [varga, setVarga] = useState(1);
  const { input, planets, panchang, dasha } = data;
  const v = VARGAS.find((x) => x.d === varga)!;
  const ascSign = divisional(data.asc, varga);
  const houses: string[][] = Array.from({ length: 12 }, () => []);
  planets.forEach((p) => houses[(divisional(p.lon, varga) - ascSign + 12) % 12].push(p.name));
  const now = Date.now();

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="k-report">
      <aside className="k-tabs" role="tablist" aria-orientation="vertical">
        <div className="k-tabs-name"><span className="eyebrow">Janma Kundali</span><strong>{input.name}</strong><small>{rashi(planets[1].sign)} Rashi</small></div>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}><Icon size={18} />{label}</button>
        ))}
      </aside>
      <div className="k-content">
        <AnimatePresence mode="wait">
          <motion.div key={tab + varga} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
            {tab === "details" && (
              <div className="k-two">
                <div className="grid gap-5">
                  <Panel title="Birth Details">
                    <Row k="Name" v={input.name} /><Row k="Gender" v={input.gender} /><Row k="Birth Place" v={input.place} />
                    <Row k="Date" v={fmtDate(new Date(input.date + "T00:00:00"))} /><Row k="Time" v={input.time.length === 5 ? input.time + ":00" : input.time} />
                    <Row k="Latitude" v={input.lat.toFixed(6)} /><Row k="Longitude" v={input.lon.toFixed(6)} /><Row k="Time zone" v={input.timezone} />
                  </Panel>
                  <Panel title="Ascendant (Lagna)">
                    <Row k="Rashi" v={rashi(data.lagnaSign)} accent /><Row k="Nakshatra" v={data.ascNak.name} /><Row k="Pada" v={data.ascNak.pada} /><Row k="Longitude" v={`${(data.asc % 30).toFixed(2)}°`} />
                  </Panel>
                </div>
                <div className="grid content-start gap-5">
                  <Panel title="Panchang">
                    <Row k="Tithi" v={panchang.tithi} /><Row k="Nakshatra" v={panchang.nakshatra} /><Row k="Vara (Day)" v={panchang.vara} /><Row k="Yoga" v={panchang.yoga} /><Row k="Karana" v={panchang.karana} />
                  </Panel>
                  <Panel title="Moon Sign (Rashi)">
                    <Row k="Rashi" v={rashi(planets[1].sign)} accent /><Row k="Nakshatra" v={`${planets[1].nakshatra} (Pada ${planets[1].pada})`} /><Row k="Sun Sign" v={rashi(planets[0].sign)} />
                  </Panel>
                  <MangalPanel data={data} />
                </div>
              </div>
            )}
            {tab === "charts" && (
              <div>
                <div className="k-vargas">
                  {VARGAS.map((x) => <button key={x.d} className={varga === x.d ? "active" : ""} onClick={() => setVarga(x.d)}><strong>{x.code}</strong><small>{x.name}</small></button>)}
                </div>
                <div className="k-panel k-chart-wrap">
                  <div className="flex items-center justify-between gap-3"><span className="k-chip">Asc: {RASHI[ascSign]}</span><span className="text-sm text-muted-foreground">{v.name} Chart</span></div>
                  <div className="k-chart-grid">
                    <NorthChart houses={houses} />
                    <div>
                      <h5 className="k-houses-title">Houses</h5>
                      {houses.map((h, i) => h.length ? <div key={i} className="k-house"><b>{i + 1}</b><span>{h.join(", ")}</span><em>{RASHI[(ascSign + i) % 12]}</em></div> : null)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === "planets" && (
              <div className="grid gap-5">
                <Panel title="Planetary Positions">
                  <div className="k-table-wrap"><table className="k-table">
                    <thead><tr><th>Planet</th><th>House</th><th>Rashi</th><th>Degree</th><th>Nakshatra</th><th>Status</th></tr></thead>
                    <tbody>{planets.map((p) => (
                      <tr key={p.name}><td><span className="k-sym">{PLANET_SYMBOL[p.name]}</span>{p.name}</td><td><b className="k-badge">{p.house}</b></td><td>{RASHI[p.sign]}</td><td>{p.degree.toFixed(2)}°</td><td>{p.nakshatra} · {p.pada}</td><td><span className={p.retro ? "k-status retro" : "k-status direct"}>{p.retro ? "Retro ℞" : "Direct"}</span></td></tr>
                    ))}</tbody>
                  </table></div>
                </Panel>
                <MangalPanel data={data} />
              </div>
            )}
            {tab === "dasha" && (
              <div className="grid gap-5">
                <Panel title="Current Dasha Period">
                  <Row k="Birth Nakshatra" v={dasha.birthNakshatra} /><Row k="Dasha Balance at birth" v={`${dasha.balance.toFixed(2)} yrs`} />
                  {dasha.currentMaha && <Row k="Current Mahadasha" v={`${dasha.currentMaha.lord} (until ${fmtDate(dasha.currentMaha.end)})`} accent />}
                  {dasha.currentAntar && <Row k="Current Antardasha" v={`${dasha.currentAntar.lord} (until ${fmtDate(dasha.currentAntar.end)})`} />}
                </Panel>
                <Panel title="Vimshottari Dasha Timeline">
                  <div className="k-table-wrap"><table className="k-table">
                    <thead><tr><th>Planet</th><th>Start</th><th>End</th><th>Status</th></tr></thead>
                    <tbody>{dasha.list.map((d) => {
                      const st = now >= d.end ? "past" : now >= d.start ? "active" : "upcoming";
                      return <tr key={d.lord} className={st === "active" ? "is-active" : st === "past" ? "is-past" : ""}><td><i className="k-dot" style={{ background: DASHA_COLOR[d.lord] }} />{PLANET_SYMBOL[d.lord]} {d.lord}</td><td>{fmtDate(d.start)}</td><td>{fmtDate(d.end)}</td><td><span className={`k-status ${st}`}>{st === "active" ? "● Active" : st === "past" ? "Past" : "Upcoming"}</span></td></tr>;
                    })}</tbody>
                  </table></div>
                </Panel>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 text-xs text-muted-foreground">Calculated with Lahiri ayanamsa and precise planetary positions. Traditional guidance only — consult the Peetham for detailed interpretation.</p>
      </div>
    </motion.div>
  );
}
