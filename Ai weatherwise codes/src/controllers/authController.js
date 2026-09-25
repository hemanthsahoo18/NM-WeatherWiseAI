const jwt = require('jsonwebtoken');
const User = require('../models/User');
const wrap = require('../utils/asyncHandler');
const { clean } = require('../utils/validate');
const tokenFor = user => jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
const publicUser = user => ({ _id: user.id, name: user.name, email: user.email });
exports.registerUser = wrap(async (req, res) => {
  const name = clean(req.body.name), email = clean(req.body.email).toLowerCase(), password = req.body.password;
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof password !== 'string' || password.length < 6)
    return res.status(400).json({ success: false, message: 'Provide a name, valid email and password of at least 6 characters' });
  if (await User.exists({ email })) return res.status(400).json({ success: false, message: 'User already exists' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ success: true, data: { ...publicUser(user), token: tokenFor(user) } });
});
exports.loginUser = wrap(async (req, res) => {
  const email = clean(req.body.email).toLowerCase(), password = req.body.password;
  if (!email || typeof password !== 'string') return res.status(400).json({ success: false, message: 'Email and password are required' });
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.verifyPassword(password))) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  res.json({ success: true, data: { ...publicUser(user), token: tokenFor(user) } });
});
exports.getUserProfile = (req, res) => res.json({ success: true, data: { ...publicUser(req.user), createdAt: req.user.createdAt } });
