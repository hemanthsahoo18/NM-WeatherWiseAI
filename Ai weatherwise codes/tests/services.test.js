const test = require('node:test');
const assert = require('node:assert/strict');
const { sampleWeather, fetchWeather } = require('../src/services/weatherService');
const { generateSummary, generateRecommendation } = require('../src/services/aiService');
test('sample weather has stable data', () => { assert.deepEqual(sampleWeather('Chennai'), sampleWeather('Chennai')); assert.equal(sampleWeather('Chennai').isMock, true); });
test('weather fallback works without key', async () => { delete process.env.OPENWEATHER_API_KEY; assert.equal((await fetchWeather('Chennai')).isMock, true); });
test('AI summary and advice work without key', async () => { delete process.env.GEMINI_API_KEY; assert.match(await generateSummary('Chennai', 32, 60, 'Sunny'), /Chennai/); assert.match(await generateRecommendation(32, 'Rain'), /umbrella/i); });
