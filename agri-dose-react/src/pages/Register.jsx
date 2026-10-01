import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel.jsx';
import Field from '../components/Field.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import LanguageSwitch from '../components/LanguageSwitch.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { registerUser, emailValid } from '../utils/auth.js';

export default function Register() {
  const navigate = useNavigate();
  const { t, tMap } = useLanguage();

  const [form, setForm] = useState({
    name: '', email: '', role: '', password: '', password2: '', agree: false,
  });
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null);

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Enter your full name.';
    if (!emailValid(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.role) nextErrors.role = 'Select a role.';
    if (form.password.length < 6) nextErrors.password = 'Use at least 6 characters.';
    if (form.password2 !== form.password || form.password2.length === 0) {
      nextErrors.password2 = 'Passwords do not match.';
    }
    if (!form.agree) nextErrors.agree = 'Please confirm before continuing.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = await registerUser({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
      password: form.password,
    });
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ email: result.error });
      return;
    }

    setBanner({ type: 'ok', msg: 'Account created. Redirecting to sign in…' });
    setTimeout(() => navigate('/?registered=1'), 900);
  }

  return (
    <div className="auth-shell">
      <BrandPanel
        wordSub="Field Requisition System"
        ticketLine="New Account Requisition"
        heading="Set up your account in under a minute."
        body="Save your calculation history and pick up where you left off, across fertilizer and pesticide dosage sessions for every field."
        gauges={[
          { num: '01', lbl: 'Your details' },
          { num: '02', lbl: 'Choose a role' },
          { num: '03', lbl: 'Start calculating' },
        ]}
      />

      <main className="auth-panel">
        <div className="perf-seam" aria-hidden="true"><div className="dots"></div></div>

        <div className="auth-card">
          <LanguageSwitch style={{ marginBottom: 14 }} />

          <div className="ticket-strip">
            <span>New Requisition</span>
            <span className="num">No. AG-1043</span>
          </div>

          <p className="kicker">{t('registerTitle')}</p>
          <h2>{t('registerTitle')}</h2>
          <p className="sub">{t('registerSubtitle')}</p>

          {banner && <div className={`banner show ${banner.type}`}>{banner.msg}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <Field label={t('fullName')} htmlFor="name" error={errors.name}>
              <input
                type="text" id="name" placeholder="e.g. Ravi Kumar" autoComplete="name"
                value={form.name} onChange={e => update('name', e.target.value)}
              />
            </Field>

            <Field label={t('email')} htmlFor="email" error={errors.email}>
              <input
                type="email" id="email" placeholder="you@example.com" autoComplete="email"
                value={form.email} onChange={e => update('email', e.target.value)}
              />
            </Field>

            <Field label={t('role')} htmlFor="role" error={errors.role}>
              <select id="role" value={form.role} onChange={e => update('role', e.target.value)}>
                <option value="">{t('selectRolePlaceholder')}</option>
                <option value="Farmer">{tMap('roleNames', 'Farmer')}</option>
                <option value="Student">{tMap('roleNames', 'Student')}</option>
                <option value="Agronomist">{tMap('roleNames', 'Agronomist')}</option>
                <option value="Dealer">{tMap('roleNames', 'Dealer')}</option>
              </select>
            </Field>

            <div className="field-grid">
              <Field label={t('password')} htmlFor="password" error={errors.password}>
                <PasswordInput
                  id="password" value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="At least 6 characters" autoComplete="new-password"
                />
              </Field>

              <Field label={t('confirmPassword')} htmlFor="password2" error={errors.password2}>
                <PasswordInput
                  id="password2" value={form.password2}
                  onChange={e => update('password2', e.target.value)}
                  placeholder="Re-enter password" autoComplete="new-password"
                />
              </Field>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={e => update('agree', e.target.checked)}
              />
              {t('agreeText')}
            </label>
            {errors.agree && <p className="err-msg" style={{ marginTop: '-14px', marginBottom: '14px' }}>{errors.agree}</p>}

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? t('creatingAccount') : t('createAccount')}
            </button>
          </form>

          <p className="form-foot">{t('haveAccount')} <Link to="/">{t('loginLink')}</Link></p>
        </div>
      </main>
    </div>
  );
}
