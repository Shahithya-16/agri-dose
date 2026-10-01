// Plain JSON-file database — pure JavaScript, no native compilation
// needed (unlike better-sqlite3, which requires Python + build tools
// on Windows). Good fit for a student / mini project: everything lives
// in one readable data/agridose.json file.

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', '..', 'data');
const dbFile = path.join(dataDir, 'agridose.json');

const EMPTY_DB = { users: [], history: [], nextUserId: 1, nextHistoryId: 1 };

function load() {
  try {
    return JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
  } catch {
    return { ...EMPTY_DB };
  }
}

function save(data) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

function init() {
  if (!fs.existsSync(dbFile)) save({ ...EMPTY_DB });
}

module.exports = { load, save, init };
