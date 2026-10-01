import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../utils/api.js';

// Web Speech API is a browser-native feature — no external service, no
// API key. Support varies: it works well in Chrome/Edge on desktop and
// Android; Safari has partial support; Firefox does not support
// SpeechRecognition (typing still works everywhere).
function getRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  return SR ? new SR() : null;
}

function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // stop anything already speaking
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
  window.speechSynthesis.speak(utter);
}

export default function AssistantWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [busy, setBusy] = useState(false);
  const recognitionRef = useRef(null);
  const endRef = useRef(null);
  const voiceSupported = typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'bot', text: t('assistantGreeting') }]);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function sendQuestion(question) {
    if (!question.trim()) return;
    setMessages((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setBusy(true);

    const res = await api.post('/api/assistant/ask', { question, lang });
    setBusy(false);

    const answer = res.ok ? res.answer : (res.error || 'Something went wrong.');
    setMessages((m) => [...m, { role: 'bot', text: answer }]);
    speak(answer, lang);
  }

  function handleMic() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const recognition = getRecognition();
    if (!recognition) {
      setMessages((m) => [...m, { role: 'bot', text: t('assistantNotSupported') }]);
      return;
    }
    recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const heard = event.results[0][0].transcript;
      sendQuestion(heard);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  return (
    <>
      <button
        className="assistant-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('assistantTitle')}
        title={t('assistantTitle')}
      >
        {open ? '✕' : '🎙️'}
      </button>

      {open && (
        <div className="assistant-panel">
          <div className="assistant-header">
            <span>{t('assistantTitle')}</span>
            <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>

          <div className="assistant-messages">
            {messages.map((m, i) => (
              <div key={i} className={`assistant-msg ${m.role}`}>{m.text}</div>
            ))}
            {busy && <div className="assistant-msg bot">…</div>}
            <div ref={endRef} />
          </div>

          {!voiceSupported && <div className="assistant-note">{t('assistantNotSupported')}</div>}

          <div className="assistant-input-row">
            <button
              className={`assistant-mic-btn ${listening ? 'listening' : ''}`}
              onClick={handleMic}
              title={listening ? t('assistantListening') : t('assistantTitle')}
              type="button"
            >
              🎤
            </button>
            <input
              type="text"
              value={input}
              placeholder={t('assistantPlaceholder')}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendQuestion(input); }}
            />
            <button className="assistant-send-btn" onClick={() => sendQuestion(input)} type="button">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
