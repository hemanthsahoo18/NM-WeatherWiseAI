const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
schema.index({ user: 1, city: 1, country: 1 });
module.exports = mongoose.model('Location', schema);
