const assistantService = require('../services/assistantService');

function ask(req, res) {
  const { question, lang } = req.body || {};
  if (!question || !question.trim()) {
    return res.status(400).json({ ok: false, error: 'question is required.' });
  }
  const safeLang = lang === 'ta' ? 'ta' : 'en';
  const answer = assistantService.answer(question, safeLang);
  res.json({ ok: true, answer, lang: safeLang });
}

module.exports = { ask };
