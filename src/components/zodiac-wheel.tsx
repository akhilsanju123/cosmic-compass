import { rashis } from "@/lib/site-data";

export function ZodiacWheel() {
  return <div className="zodiac-stage" aria-label="Animated zodiac wheel"><div className="zodiac-ring">{rashis.map((r, i) => <span key={r.western} style={{ "--i": i } as React.CSSProperties}>{r.symbol}</span>)}</div><div className="zodiac-inner"><div className="lotus">✦</div></div><div className="zodiac-center"><small>VEDIC</small><strong>జ్యోతిష్యం</strong><span>GUIDANCE</span></div></div>;
}