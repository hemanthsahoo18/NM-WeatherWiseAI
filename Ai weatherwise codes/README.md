# AI WeatherWise — Rebuilt Backend

An independently reimplemented MVC-style Node.js REST API with the same core behavior and endpoint paths as the supplied reference: authentication, user profile, favorite-location CRUD, current weather and AI weather insights.

## Setup
1. Install Node.js 18+ and MongoDB (local or Atlas).
2. Run `npm install` in this folder.
3. Copy `.env.example` to `.env` and enter **your own rotated credentials**. Never commit `.env`.
4. Run `npm start` (or `npm run dev`). The default URL is `http://localhost:5000`.
5. Import `postman_collection.json` into Postman and run Register, Login, Locations, Weather and AI endpoints.

## Endpoints
| Method | Path | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/profile | Bearer token |
| GET, POST | /api/locations | Bearer token |
| PUT, DELETE | /api/locations/:id | Bearer token |
| GET | /api/weather/:city | Public |
| POST | /api/ai/weather-summary | Bearer token |
| POST | /api/ai/weather-recommendation | Bearer token |

Register/login returns `data.token`; use it in Authorization: `Bearer <token>`. Weather response uses `data` and AI responses use `summary` or `recommendation` for Postman compatibility.

Weather and AI calls use clearly marked simulated/rule-based fallbacks if their API keys are missing or services fail. **Fallback weather is not a live forecast.** Database and JWT configuration remain required.

## Verification
Run `npm test` for offline service tests. Live database and third-party integrations must be tested on your configured machine.

## Security
The provided reference `.env` contained credentials. They are intentionally excluded here. Rotate the MongoDB password, Gemini key, OpenWeather key and JWT secret before use.
