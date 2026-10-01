const dosageService = require('../services/dosageService');
const { FERTILIZER_TABLE, FERTILIZER_NAME, PESTICIDE_TABLE } = require('../data/reference');

function getFertilizerTable(req, res) {
  res.json({ ok: true, table: FERTILIZER_TABLE, names: FERTILIZER_NAME });
}

function getPesticideTable(req, res) {
  res.json({ ok: true, table: PESTICIDE_TABLE });
}

function fertilizer(req, res) {
  const { crop, fert, area, unit } = req.body || {};
  const out = dosageService.calculateFertilizer({ crop, fert, area, unit });
  if (!out.ok) return res.status(400).json(out);
  res.json(out);
}

function pesticide(req, res) {
  const { target, area } = req.body || {};
  const out = dosageService.calculatePesticide({ target, area });
  if (!out.ok) return res.status(400).json(out);
  res.json(out);
}

module.exports = { getFertilizerTable, getPesticideTable, fertilizer, pesticide };
