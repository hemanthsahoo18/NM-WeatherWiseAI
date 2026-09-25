const router = require('express').Router();
const { addLocation, getLocations, updateLocation, deleteLocation } = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');
router.use(protect);
router.route('/').get(getLocations).post(addLocation);
router.route('/:id').put(updateLocation).delete(deleteLocation);
module.exports = router;
