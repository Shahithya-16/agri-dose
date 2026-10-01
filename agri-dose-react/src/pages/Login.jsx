import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel.jsx';
import Field from '../components/Field.jsx';
import PasswordInput from '../components/PasswordInput.jsx';
import LanguageSwitch from '../components/LanguageSwitch.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { loginUser, emailValid } from '../utils/auth.js';

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(
    params.get('registered') === '1'
      ? { type: 'ok', msg: 'Account created successfully. Sign in below.' }
      : null
  );

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!emailValid(email)) nextErrors.email = 'Enter a valid email address.';
    if (password.length === 0) nextErrors.password = 'Enter your password.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = await loginUser({ email: email.trim().toLowerCase(), password });
    setSubmitting(false);

    if (!result.ok) {
      setBanner({ type: 'bad', msg: result.error });
      return;
    }
    navigate('/dashboard');
  }

  return (
    <div className="auth-shell">
      <BrandPanel
        wordSub="Field Requisition System"
        ticketLine="Fertilizer & Pesticide Dosage Ticket"
        heading="Measure once. Apply exactly what the field needs."
        body="Enter your crop, land area, and product — AgriDose issues the precise fertilizer and pesticide quantities, so nothing is over-applied or wasted."
        gauges={[
          { num: '7', lbl: 'Crops covered' },
          { num: '12', lbl: 'Reference products' },
          { num: '±0.1', lbl: 'kg precision' },
        ]}
      />

      <main className="auth-panel">
        <div className="perf-seam" aria-hidden="true"><div className="dots"></div></div>

        <div className="auth-card">
          <LanguageSwitch style={{ marginBottom: 14 }} />

          <div className="ticket-strip">
            <span>Access Requisition</span>
            <span className="num">No. AG-1042</span>
          </div>

          <p className="kicker">{t('loginTitle')}</p>
          <h2>{t('welcomeBack')}</h2>
          <p className="sub">{t('loginSubtitle')}</p>

          {banner && <div className={`banner show ${banner.type}`}>{banner.msg}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <Field label={t('email')} htmlFor="email" error={errors.email}>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Field>

            <Field label={t('password')} htmlFor="password" error={errors.password}>
              <PasswordInput
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('password')}
                autoComplete="current-password"
              />
            </Field>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? t('signingIn') : t('signIn')}
            </button>
          </form>

          <p className="form-foot">{t('noAccount')} <Link to="/register">{t('registerLink')}</Link></p>
        </div>
      </main>
    </div>
  );
}
