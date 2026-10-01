import { useState } from 'react';

export default function PasswordInput({ id, value, onChange, placeholder, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="pw-row">
      <input
        type={visible ? 'text' : 'password'}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button type="button" className="pw-toggle" onClick={() => setVisible(v => !v)}>
        {visible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}
