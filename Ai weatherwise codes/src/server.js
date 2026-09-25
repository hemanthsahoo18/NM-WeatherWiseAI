require('dotenv').config();
const app = require('./app');
const connectDatabase = require('./config/db');
const port = Number(process.env.PORT) || 5000;
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'replace_with_a_long_random_secret') {
  console.error('Configure a secure JWT_SECRET in .env before starting.'); process.exit(1);
}
connectDatabase().then(() => app.listen(port, () => console.log(`WeatherWise listening on ${port}`)))
  .catch(error => { console.error('Startup failed:', error.message); process.exit(1); });
