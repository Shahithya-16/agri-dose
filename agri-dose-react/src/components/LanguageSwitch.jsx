import { useLanguage } from '../context/LanguageContext.jsx';

export default function LanguageSwitch({ style }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-switch" style={style} role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
        onClick={() => setLang('ta')}
      >
        தமிழ்
      </button>
    </div>
  );
}
