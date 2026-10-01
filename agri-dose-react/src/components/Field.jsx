export default function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div className={`field${error ? ' error' : ''}`}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
      {hint && !error && <p className="hint">{hint}</p>}
      {error && <p className="err-msg">{error}</p>}
    </div>
  );
}
