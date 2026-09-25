const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false }
}, { timestamps: true });
schema.pre('save', async function(next) {
  try { if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10); next(); }
  catch (error) { next(error); }
});
schema.methods.verifyPassword = function(value) { return bcrypt.compare(value, this.password); };
module.exports = mongoose.model('User', schema);
