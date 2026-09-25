const { generateSummary, generateRecommendation } = require('../services/aiService');
const wrap = require('../utils/asyncHandler');
const { clean, number } = require('../utils/validate');
exports.getWeatherSummary = wrap(async (req, res) => {
  const city = clean(req.body.city), condition = clean(req.body.condition);
  const temperature = number(req.body.temperature), humidity = number(req.body.humidity);
  if (!city || !condition || temperature === null || humidity === null || humidity < 0 || humidity > 100)
    return res.status(400).json({ success: false, message: 'Valid city, temperature, humidity and condition are required' });
  res.json({ success: true, summary: await generateSummary(city, temperature, humidity, condition) });
});
exports.getWeatherRecommendation = wrap(async (req, res) => {
  const condition = clean(req.body.condition), temperature = number(req.body.temperature);
  if (!condition || temperature === null) return res.status(400).json({ success: false, message: 'Valid temperature and condition are required' });
  res.json({ success: true, recommendation: await generateRecommendation(temperature, condition) });
});
