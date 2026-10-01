const { load, save } = require('../config/db');

function findByEmail(email) {
  const db = load();
  return db.users.find(u => u.email === email) || null;
}

function findById(id) {
  const db = load();
  return db.users.find(u => u.id === id) || null;
}

function createUser({ name, email, role, passwordHash }) {
  const db = load();
  const user = {
    id: db.nextUserId,
    name,
    email,
    role,
    password_hash: passwordHash,
    created_at: Date.now(),
  };
  db.users.push(user);
  db.nextUserId += 1;
  save(db);
  return user;
}

module.exports = { findByEmail, findById, createUser };
