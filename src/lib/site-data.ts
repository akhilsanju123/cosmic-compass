export const rashis = [
  { symbol: "♈", telugu: "మేష రాశి", vedic: "Mesha", western: "Aries", dates: "Mar 21 – Apr 19" },
  { symbol: "♉", telugu: "వృషభ రాశి", vedic: "Vrishabha", western: "Taurus", dates: "Apr 20 – May 20" },
  { symbol: "♊", telugu: "మిథున రాశి", vedic: "Mithuna", western: "Gemini", dates: "May 21 – Jun 20" },
  { symbol: "♋", telugu: "కర్కాటక రాశి", vedic: "Karkataka", western: "Cancer", dates: "Jun 21 – Jul 22" },
  { symbol: "♌", telugu: "సింహ రాశి", vedic: "Simha", western: "Leo", dates: "Jul 23 – Aug 22" },
  { symbol: "♍", telugu: "కన్య రాశి", vedic: "Kanya", western: "Virgo", dates: "Aug 23 – Sep 22" },
  { symbol: "♎", telugu: "తులా రాశి", vedic: "Tula", western: "Libra", dates: "Sep 23 – Oct 22" },
  { symbol: "♏", telugu: "వృశ్చిక రాశి", vedic: "Vrischika", western: "Scorpio", dates: "Oct 23 – Nov 21" },
  { symbol: "♐", telugu: "ధనుస్సు రాశి", vedic: "Dhanussu", western: "Sagittarius", dates: "Nov 22 – Dec 21" },
  { symbol: "♑", telugu: "మకర రాశి", vedic: "Makara", western: "Capricorn", dates: "Dec 22 – Jan 19" },
  { symbol: "♒", telugu: "కుంభ రాశి", vedic: "Kumbha", western: "Aquarius", dates: "Jan 20 – Feb 18" },
  { symbol: "♓", telugu: "మీన రాశి", vedic: "Meena", western: "Pisces", dates: "Feb 19 – Mar 20" },
] as const;

export const calculators = [
  ["love", "Love Calculator"], ["numerology", "Numerology Calculator"], ["sun-sign", "Sun Sign Calculator"],
  ["rising-sign", "Rising Sign Calculator"], ["rashi", "Rashi Calculator"], ["dasha", "Dasha Calculator"],
  ["nakshatra", "Nakshatra Calculator"], ["mangal-dosha", "Mangal Dosha Calculator"], ["sade-sati", "Shani Sade Sati"],
  ["moon-phase", "Moon Phase Calculator"], ["birth-chart", "Birth Chart Calculator"], ["flames", "FLAMES Calculator"],
  ["vehicle-number", "Lucky Vehicle Number"], ["friendship", "Friendship Calculator"], ["kaal-sarp", "Kaal Sarp Dosh"],
  ["ishta-devata", "Ishta Devata"], ["lo-shu-grid", "Lo Shu Grid"], ["transit-chart", "Transit Chart"],
  ["name-compatibility", "Name Compatibility"],
] as const;

export const services = ["Astrology & Vastu", "Vastu Remedies", "Muhurthams", "Pujas & Homams", "Pandit Booking", "Matrimony", "Gemstones", "Panchaloha Yantras", "Genuine Rudrakshas", "Yoga Classes", "Ayurveda", "Property Guidance", "Refer & Earn", "Help & Receive Help"];

export const pujas = ["Ganapathi Homam", "Navagraha Homam", "Lakshmi Puja", "Rudrabhishekam", "Satyanarayana Vratham", "Vastu Puja"];

export const navGroups = {
  consultations: [["/consultations/chat", "Chat with Astrologer"], ["/consultations/call", "Call with Astrologer"]],
  horoscope: ["daily", "tomorrow", "yesterday", "weekly", "monthly", "yearly"].map((x) => [`/horoscope/${x}`, `${x[0].toUpperCase()}${x.slice(1)} Horoscope`]),
  calculators: calculators.map(([slug, label]) => [`/calculators/${slug}`, label]),
  panchang: ["today", "tomorrow", "rahu-kaal", "choghadiya", "tithi", "vaar", "hora", "karana", "shubh-muhurat"].map((x) => [`/panchang/${x}`, x.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")]),
} as const;

export function sunSign(date: string) {
  if (!date) return rashis[0];
  const [, month, day] = date.split("-").map(Number);
  const cutoffs = [20,19,20,20,21,21,22,22,22,22,21,21];
  const indexes = [9,10,11,0,1,2,3,4,5,6,7,8];
  return rashis[day <= cutoffs[month - 1] ? indexes[month - 1] : (indexes[month - 1] + 1) % 12];
}