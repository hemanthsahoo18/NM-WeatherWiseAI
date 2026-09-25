const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json({ limit: '32kb' }));
app.get('/', (_req, res) => res.json({ success: true, message: 'WeatherWise API is running' }));
for (const [path, route] of Object.entries({ auth: 'authRoutes', locations: 'locationRoutes', weather: 'weatherRoutes', ai: 'aiRoutes' }))
  app.use('/api/' + path, require('./routes/' + route));
app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint not found' }));
app.use((err, req, res, next) => {
  if (err.code === 11000) return res.status(400).json({ success: false, message: 'This record already exists' });
  if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({ success: false, message: err.message });
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.status ? err.message : 'Unexpected server error' });
});
module.exports = app;
