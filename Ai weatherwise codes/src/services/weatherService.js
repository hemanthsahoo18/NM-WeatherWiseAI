function sampleWeather(city) {
  const seed = [...city.toLowerCase()].reduce((n, char) => (n * 31 + char.charCodeAt(0)) % 10007, 7);
  const options = ['Clear', 'Clouds', 'Rain', 'Mist', 'Sunny'];
  return { city, temperature: 16 + seed % 19, humidity: 40 + seed % 49,
    windSpeed: 2 + seed % 12, condition: options[seed % options.length], isMock: true };
}
async function fetchWeather(city) {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key || key.startsWith('your_')) return sampleWeather(city);
  try {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.search = new URLSearchParams({ q: city, appid: key, units: 'metric' }).toString();
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (response.status === 404) { const err = new Error('City not found'); err.status = 404; throw err; }
    if (!response.ok) throw new Error('Weather provider unavailable');
    const result = await response.json();
    return { city: result.name, temperature: result.main.temp, humidity: result.main.humidity,
      windSpeed: result.wind.speed, condition: result.weather[0].main, isMock: false };
  } catch (error) {
    if (error.status === 404) throw error;
    console.warn('Weather provider unavailable; returning sample data');
    return sampleWeather(city);
  }
}
module.exports = { fetchWeather, sampleWeather };
