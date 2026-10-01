const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const emailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function signToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

async function register(req, res) {
  const { name, email, role, password } = req.body || {};

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ ok: false, error: 'Enter your full name.' });
  }
  if (!emailValid(email || '')) {
    return res.status(400).json({ ok: false, error: 'Enter a valid email address.' });
  }
  if (!role) {
    return res.status(400).json({ ok: false, error: 'Select a role.' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ ok: false, error: 'Use at least 6 characters.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const existing = userModel.findByEmail(cleanEmail);
  if (existing) {
    return res.status(409).json({ ok: false, error: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = userModel.createUser({ name: name.trim(), email: cleanEmail, role, passwordHash });

  return res.status(201).json({ ok: true, user: { name: user.name, email: user.email, role: user.role } });
}

async function login(req, res) {
  const { email, password } = req.body || {};

  if (!emailValid(email || '') || !password) {
    return res.status(400).json({ ok: false, error: 'Incorrect email or password. Try again, or register below.' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const user = userModel.findByEmail(cleanEmail);
  if (!user) {
    return res.status(401).json({ ok: false, error: 'Incorrect email or password. Try again, or register below.' });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ ok: false, error: 'Incorrect email or password. Try again, or register below.' });
  }

  const token = signToken(user);
  const session = { name: user.name, email: user.email, role: user.role, loggedAt: Date.now() };

  return res.json({ ok: true, token, session });
}

function me(req, res) {
  // req.user is set by the auth middleware after verifying the JWT
  return res.json({ ok: true, session: req.user });
}

module.exports = { register, login, me };
