const router = require('express').Router();
router.get('/:city', require('../controllers/weatherController').getWeather);
module.exports = router;
