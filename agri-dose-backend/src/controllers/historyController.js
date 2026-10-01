const historyModel = require('../models/historyModel');

function list(req, res) {
  const rows = historyModel.listForUser(req.user.id);
  res.json({ ok: true, history: rows });
}

function add(req, res) {
  const { title, detail, value } = req.body || {};
  if (!title) return res.status(400).json({ ok: false, error: 'title is required.' });
  const rows = historyModel.addEntry(req.user.id, { title, detail, value });
  res.status(201).json({ ok: true, history: rows });
}

function clear(req, res) {
  historyModel.clearForUser(req.user.id);
  res.json({ ok: true, history: [] });
}

module.exports = { list, add, clear };
