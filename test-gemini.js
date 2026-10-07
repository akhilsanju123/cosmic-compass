const prompt = `Calculate exact authentic Vedic astrological details for a person born on 2004-12-03 at 06:24 in kaikaluru.
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

async function test() {
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAwdpjyEStUi_JufP3H2BQGY5Z9THG2Cs0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
    
    let text = json.candidates[0].content.parts[0].text;
    console.log("Raw text:", text);
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    console.log("Parsed JSON:", JSON.parse(text));
  } catch (e) {
    console.error(e);
  }
}
test();
