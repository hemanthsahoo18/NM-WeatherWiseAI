const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getWeatherSummary, getWeatherRecommendation } = require('../controllers/aiController');
router.use(protect);
router.post('/weather-summary', getWeatherSummary);
router.post('/weather-recommendation', getWeatherRecommendation);
module.exports = router;
