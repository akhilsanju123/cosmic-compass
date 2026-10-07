import * as A from "astronomy-engine";

export const RASHI = ["Mesha","Vrishabha","Mithuna","Karka","Simha","Kanya","Tula","Vrischika","Dhanu","Makara","Kumbha","Meena"];
export const RASHI_TE = ["మేషం","వృషభం","మిథునం","కర్కాటకం","సింహం","కన్య","తుల","వృశ్చికం","ధనుస్సు","మకరం","కుంభం","మీనం"];
export const NAKSHATRA = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
const TITHI = ["Pratipada","Dwitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami","Ashtami","Navami","Dashami","Ekadashi","Dwadashi","Trayodashi","Chaturdashi"];
const YOGA = ["Vishkambha","Priti","Ayushman","Saubhagya","Shobhana","Atiganda","Sukarma","Dhriti","Shula","Ganda","Vriddhi","Dhruva","Vyaghata","Harshana","Vajra","Siddhi","Vyatipata","Variyana","Parigha","Shiva","Siddha","Sadhya","Shubha","Shukla","Brahma","Indra","Vaidhriti"];
const VARA = ["Raviwara","Somawara","Mangalawara","Budhawara","Guruwara","Shukrawara","Shaniwara"];

export type PlanetName = "Sun"|"Moon"|"Mars"|"Mercury"|"Jupiter"|"Venus"|"Saturn"|"Rahu"|"Ketu";
export const PLANET_SYMBOL: Record<PlanetName,string> = { Sun:"☉", Moon:"☽", Mars:"♂", Mercury:"☿", Jupiter:"♃", Venus:"♀", Saturn:"♄", Rahu:"☊", Ketu:"☋" };
const DASHA_ORDER: PlanetName[] = ["Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"];
const DASHA_YEARS: Record<string,number> = { Ketu:7, Venus:20, Sun:6, Moon:10, Mars:7, Rahu:18, Jupiter:16, Saturn:19, Mercury:17 };
const YEAR_MS = 365.25 * 86400000;

export type BirthInput = { name: string; gender: string; place: string; date: string; time: string; lat: number; lon: number; timezone: string };
export type PlanetPos = { name: PlanetName; lon: number; sign: number; degree: number; house: number; nakshatra: string; pada: number; retro: boolean };

const norm = (x: number) => ((x % 360) + 360) % 360;

/** Converts a wall-clock time in an IANA time zone to a UTC Date. */
export function zonedToUtc(date: string, time: string, tz: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm, ss = 0] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm, ss);
  const offsetAt = (ms: number) => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - ms;
  };
  let utc = guess - offsetAt(guess);
  utc = guess - offsetAt(utc);
  return new Date(utc);
}

/** Lahiri (Chitrapaksha) ayanamsa, degrees. */
function ayanamsa(t: A.AstroTime) {
  const T = t.tt / 36525;
  return 23.85305 + (5028.796195 * T + 1.1054348 * T * T) / 3600;
}

function tropical(body: A.Body, t: A.AstroTime) {
  if (body === A.Body.Sun) return A.SunPosition(t).elon;
  if (body === A.Body.Moon) return A.EclipticGeoMoon(t).lon;
  return A.Ecliptic(A.GeoVector(body, t, true)).elon;
}

function meanNode(t: A.AstroTime) {
  const T = t.tt / 36525;
  return norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T);
}

const nak = (lon: number) => { const i = Math.floor(lon / (360 / 27)); return { index: i, name: NAKSHATRA[i], pada: Math.floor((lon % (360 / 27)) / (360 / 108)) + 1, fraction: (lon % (360 / 27)) / (360 / 27) }; };

export function divisional(lon: number, d: number) {
  const s = Math.floor(lon / 30), deg = lon % 30, odd = s % 2 === 0;
  switch (d) {
    case 1: return s;
    case 2: return odd ? (deg < 15 ? 4 : 3) : (deg < 15 ? 3 : 4);
    case 3: return (s + Math.floor(deg / 10) * 4) % 12;
    case 7: return ((odd ? s : s + 6) + Math.floor(deg / (30 / 7))) % 12;
    case 9: return Math.floor(lon / (10 / 3)) % 12;
    case 10: return ((odd ? s : s + 8) + Math.floor(deg / 3)) % 12;
    case 12: return (s + Math.floor(deg / 2.5)) % 12;
    case 30: return odd ? (deg < 5 ? 0 : deg < 10 ? 10 : deg < 18 ? 8 : deg < 25 ? 2 : 6) : (deg < 5 ? 1 : deg < 12 ? 5 : deg < 20 ? 11 : deg < 25 ? 9 : 7);
    default: return s;
  }
}

export function computeKundli(input: BirthInput) {
  const utc = zonedToUtc(input.date, input.time, input.tz ?? input.timezone);
  const t = A.MakeTime(utc);
  const ay = ayanamsa(t);
  const sid = (x: number) => norm(x - ay);

  // Ascendant
  const T = t.tt / 36525;
  const eps = (23.4392911 - 0.0130042 * T) * Math.PI / 180;
  const ramc = norm(A.SiderealTime(t) * 15 + input.lon) * Math.PI / 180;
  const phi = input.lat * Math.PI / 180;
  const ascTrop = norm(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) * 180 / Math.PI);
  const asc = sid(ascTrop);
  const lagnaSign = Math.floor(asc / 30);

  const bodies: [PlanetName, A.Body][] = [["Sun",A.Body.Sun],["Moon",A.Body.Moon],["Mars",A.Body.Mars],["Mercury",A.Body.Mercury],["Jupiter",A.Body.Jupiter],["Venus",A.Body.Venus],["Saturn",A.Body.Saturn]];
  const t2 = t.AddDays(1 / 24);
  const make = (name: PlanetName, lon: number, retro: boolean): PlanetPos => {
    const sign = Math.floor(lon / 30); const n = nak(lon);
    return { name, lon, sign, degree: lon % 30, house: ((sign - lagnaSign + 12) % 12) + 1, nakshatra: n.name, pada: n.pada, retro };
  };
  const planets: PlanetPos[] = bodies.map(([n, b]) => {
    const l1 = tropical(b, t), l2 = tropical(b, t2);
    const diff = ((l2 - l1 + 540) % 360) - 180;
    return make(n, sid(l1), n !== "Sun" && n !== "Moon" && diff < 0);
  });
  const rahu = sid(meanNode(t));
  planets.push(make("Rahu", rahu, true), make("Ketu", norm(rahu + 180), true));

  const sun = planets[0].lon, moon = planets[1].lon;
  const elong = norm(moon - sun);
  const ti = Math.floor(elong / 12);
  const tithi = ti === 14 ? "Purnima" : ti === 29 ? "Amavasya" : `${ti < 15 ? "Shukla" : "Krishna"} ${TITHI[ti % 15]}`;
  const k = Math.floor(elong / 6);
  const karana = k === 0 ? "Kimstughna" : k >= 57 ? ["Shakuni","Chatushpada","Naga"][k - 57] : ["Bava","Balava","Kaulava","Taitila","Gara","Vanija","Vishti"][(k - 1) % 7];
  const [y, m, d] = input.date.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const moonNak = nak(moon);
  const ascNak = nak(asc);

  // Vimshottari dasha
  const startLordIdx = moonNak.index % 9;
  const firstYears = DASHA_YEARS[DASHA_ORDER[startLordIdx]];
  const balance = (1 - moonNak.fraction) * firstYears;
  let cursor = utc.getTime() - (firstYears - balance) * YEAR_MS;
  const dashas = Array.from({ length: 9 }, (_, i) => {
    const lord = DASHA_ORDER[(startLordIdx + i) % 9];
    const start = cursor; const end = start + DASHA_YEARS[lord] * YEAR_MS; cursor = end;
    const antars = Array.from({ length: 9 }, (_, j) => DASHA_ORDER[(startLordIdx + i + j) % 9]);
    let ac = start;
    const sub = antars.map((a) => { const s = ac; ac += (DASHA_YEARS[lord] * DASHA_YEARS[a] / 120) * YEAR_MS; return { lord: a, start: s, end: ac }; });
    return { lord, start: Math.max(start, utc.getTime()), end, sub };
  });
  const now = Date.now();
  const currentMaha = dashas.find((x) => now >= x.start && now < x.end);
  const currentAntar = currentMaha?.sub.find((x) => now >= x.start && now < x.end);

  const mars = planets[2];
  const moonHouseOfMars = ((mars.sign - planets[1].sign + 12) % 12) + 1;
  const doshaHouses = [1, 2, 4, 7, 8, 12];

  return {
    input, utc, ayanamsa: ay, asc, lagnaSign, ascNak, planets,
    panchang: { tithi, nakshatra: moonNak.name, vara: VARA[weekday], yoga: YEAR_SAFE(YOGA, Math.floor(norm(sun + moon) / (360 / 27))), karana },
    dasha: { birthNakshatra: moonNak.name, balance, list: dashas, currentMaha, currentAntar },
    mangal: { fromLagna: doshaHouses.includes(mars.house), fromMoon: doshaHouses.includes(moonHouseOfMars), lagnaHouse: mars.house, moonHouse: moonHouseOfMars },
  };
}
function YEAR_SAFE(arr: string[], i: number) { return arr[i] ?? arr[0]; }
export type Kundli = ReturnType<typeof computeKundli>;

export type GeoPlace = { name: string; admin1?: string; country?: string; latitude: number; longitude: number; timezone: string };
export async function searchPlaces(q: string): Promise<GeoPlace[]> {
  if (q.trim().length < 2) return [];
  const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?count=6&language=en&format=json&name=${encodeURIComponent(q.trim())}`);
  if (!r.ok) throw new Error("Place lookup failed");
  const j = await r.json();
  return (j.results ?? []) as GeoPlace[];
}
export const placeLabel = (p: GeoPlace) => [p.name, p.admin1, p.country].filter(Boolean).join(", ");
