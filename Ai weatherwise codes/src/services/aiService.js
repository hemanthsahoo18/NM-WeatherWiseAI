const { GoogleGenerativeAI } = require('@google/generative-ai');
const localSummary = (city, temp, humidity, condition) => `${city} is experiencing ${condition.toLowerCase()} conditions at ${temp}°C with ${humidity}% humidity.`;
function localAdvice(temp, condition) {
  const c = condition.toLowerCase();
  const advice = temp >= 30 ? 'Drink plenty of water and wear light clothing.' : temp <= 18 ? 'Consider a light jacket.' : 'Comfortable everyday clothing should work.';
  return /rain|storm|drizzle/.test(c) ? `${advice} Carry an umbrella and check local alerts.` : `${advice} Check conditions before outdoor activities.`;
}
async function askGemini(prompt, fallback) {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key.startsWith('your_')) return fallback;
  try {
    const client = new GoogleGenerativeAI(key);
    const result = await client.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContent(prompt);
    return result.response.text().trim() || fallback;
  } catch (error) { console.warn('AI provider unavailable; returning rule-based guidance'); return fallback; }
}
exports.generateSummary = (city, temp, humidity, condition) => askGemini(
  `Write a brief plain-text weather summary (1-2 sentences). City: ${city}; temperature: ${temp} C; humidity: ${humidity}%; condition: ${condition}.`,
  localSummary(city, temp, humidity, condition));
exports.generateRecommendation = (temp, condition) => askGemini(
  `Give 1-2 sentences of practical clothing, hydration and activity advice for ${temp} C and ${condition}. No markdown.`,
  localAdvice(temp, condition));
