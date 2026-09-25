const mongoose = require('mongoose');
const Location = require('../models/Location');
const wrap = require('../utils/asyncHandler');
const { clean } = require('../utils/validate');
const fields = body => ({ city: clean(body.city), country: clean(body.country) });
const duplicate = async (user, city, country, except) => {
  const entries = await Location.find({ user, ...(except ? { _id: { $ne: except } } : {}) });
  return entries.some(x => x.city.toLowerCase() === city.toLowerCase() && x.country.toLowerCase() === country.toLowerCase());
};
exports.addLocation = wrap(async (req, res) => {
  const { city, country } = fields(req.body);
  if (!city || !country) return res.status(400).json({ success: false, message: 'City and country are required' });
  if (await duplicate(req.user.id, city, country)) return res.status(400).json({ success: false, message: 'Location is already in your favorites' });
  const data = await Location.create({ city, country, user: req.user.id });
  res.status(201).json({ success: true, data });
});
exports.getLocations = wrap(async (req, res) => {
  const data = await Location.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, count: data.length, data });
});
async function change(req, res, remove) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid location ID' });
  const location = await Location.findOne({ _id: req.params.id, user: req.user.id });
  if (!location) return res.status(404).json({ success: false, message: 'Location not found' });
  if (remove) { await location.deleteOne(); return res.json({ success: true, message: 'Location removed' }); }
  const { city, country } = fields(req.body);
  if (!city || !country) return res.status(400).json({ success: false, message: 'City and country are required' });
  if (await duplicate(req.user.id, city, country, location.id)) return res.status(400).json({ success: false, message: 'Location is already in your favorites' });
  location.set({ city, country }); await location.save();
  res.json({ success: true, data: location });
}
exports.updateLocation = wrap((req, res) => change(req, res, false));
exports.deleteLocation = wrap((req, res) => change(req, res, true));
