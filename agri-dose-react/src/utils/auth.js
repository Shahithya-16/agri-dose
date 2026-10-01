// AgriDose — auth helpers, now backed by the real Express + JWT backend
// instead of localStorage. Function names/shapes are kept close to the
// original so the pages that use them stay easy to follow.

import { api, setToken, clearToken } from './api.js';

const SESSION_KEY = 'agridose_session';

export async function registerUser({ name, email, role, password }) {
  const res = await api.post('/api/auth/register', { name, email, role, password });
  if (!res.ok) return { ok: false, error: res.error || 'Could not register.' };
  return { ok: true };
}

export async function loginUser({ email, password }) {
  const res = await api.post('/api/auth/login', { email, password });
  if (!res.ok) return { ok: false, error: res.error || 'Incorrect email or password. Try again, or register below.' };

  setToken(res.token);
  localStorage.setItem(SESSION_KEY, JSON.stringify(res.session));
  return { ok: true, session: res.session };
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  clearToken();
}

export function emailValid(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
