const clean = value => typeof value === 'string' ? value.trim() : '';
const number = value => value !== '' && value !== null && value !== undefined && Number.isFinite(Number(value)) ? Number(value) : null;
module.exports = { clean, number };
