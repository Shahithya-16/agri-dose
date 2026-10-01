const { load, save } = require('../config/db');

function listForUser(userId, limit = 25) {
  const db = load();
  return db.history
    .filter(h => h.user_id === userId)
    .sort((a, b) => b.at - a.at)
    .slice(0, limit);
}

function addEntry(userId, { title, detail, value }) {
  const db = load();
  const entry = {
    id: db.nextHistoryId,
    user_id: userId,
    title,
    detail: detail || '',
    value: value || '',
    at: Date.now(),
  };
  db.history.push(entry);
  db.nextHistoryId += 1;

  // Keep only the most recent 25 per user, matching the old localStorage behaviour
  const forUser = db.history.filter(h => h.user_id === userId).sort((a, b) => b.at - a.at);
  const keepIds = new Set(forUser.slice(0, 25).map(h => h.id));
  db.history = db.history.filter(h => h.user_id !== userId || keepIds.has(h.id));

  save(db);
  return listForUser(userId);
}

function clearForUser(userId) {
  const db = load();
  db.history = db.history.filter(h => h.user_id !== userId);
  save(db);
}

module.exports = { listForUser, addEntry, clearForUser };
