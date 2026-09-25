const { fetchWeather } = require('../services/weatherService');
const wrap = require('../utils/asyncHandler');
const { clean } = require('../utils/validate');
exports.getWeather = wrap(async (req, res) => {
  const city = clean(req.params.city);
  if (!city) return res.status(400).json({ success: false, message: 'City is required' });
  res.json({ success: true, data: await fetchWeather(city) });
});
