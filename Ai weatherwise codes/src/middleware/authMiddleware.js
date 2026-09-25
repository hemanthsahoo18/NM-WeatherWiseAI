const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = async (req, res, next) => {
  const match = /^Bearer\s+(.+)$/i.exec(req.get('authorization') || '');
  if (!match) return res.status(401).json({ success: false, message: 'Authentication token required' });
  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT secret missing');
    const payload = jwt.verify(match[1], process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ success: false, message: 'Account not found' });
    req.user = user;
    next();
  } catch (_) { return res.status(401).json({ success: false, message: 'Invalid or expired token' }); }
};
module.exports = { protect };
