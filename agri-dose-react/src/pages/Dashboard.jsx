import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, clearSession } from '../utils/auth.js';
import { api } from '../utils/api.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import StampBadge from '../components/StampBadge.jsx';
import DiseaseThumb from '../components/DiseaseThumb.jsx';
import LanguageSwitch from '../components/LanguageSwitch.jsx';
import AssistantWidget from '../components/AssistantWidget.jsx';
import { DISEASE_DB } from '../data/diseaseData.js';
import {
  FERTILIZER_TABLE, FERTILIZER_NAME, PESTICIDE_TABLE,
} from '../data/reference.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const { t, tMap, tDisease, lang } = useLanguage();
  const [tab, setTab] = useState('fertilizer');
  const [history, setHistory] = useState([]);

  const TAB_TITLES = {
    fertilizer: ['Dosage calculator', t('fertilizerHeading')],
    pesticide: ['Dosage calculator', t('pesticideHeading')],
    disease: ['Diagnose', t('diseaseHeading')],
    history: ['Records', t('historyHeading')],
  };

  useEffect(() => {
    (async () => {
      const res = await api.get('/api/history', { auth: true });
      if (res.ok) setHistory(res.history);
    })();
  }, []);

  function logout() {
    clearSession();
    navigate('/');
  }

  async function recordHistory(entry) {
    const res = await api.post('/api/history', entry, { auth: true });
    if (res.ok) setHistory(res.history);
  }

  async function onClearHistory() {
    const res = await api.del('/api/history', { auth: true });
    if (res.ok) setHistory([]);
  }

  const [eyebrow, title] = TAB_TITLES[tab];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">
          <StampBadge />
          <div className="word"><b>AgriDose</b>Dashboard</div>
        </div>

        <nav className="nav-group">
          <p className="grp-lbl">Calculate</p>
          <button className={`nav-item${tab === 'fertilizer' ? ' active' : ''}`} onClick={() => setTab('fertilizer')}>
            <span className="ic">01</span> {t('fertilizerTab')}
          </button>
          <button className={`nav-item${tab === 'pesticide' ? ' active' : ''}`} onClick={() => setTab('pesticide')}>
            <span className="ic">02</span> {t('pesticideTab')}
          </button>
          <p className="grp-lbl">Diagnose</p>
          <button className={`nav-item${tab === 'disease' ? ' active' : ''}`} onClick={() => setTab('disease')}>
            <span className="ic">03</span> {t('diseaseTab')}
          </button>
          <p className="grp-lbl">Records</p>
          <button className={`nav-item${tab === 'history' ? ' active' : ''}`} onClick={() => setTab('history')}>
            <span className="ic">04</span> {t('historyTab')}
          </button>
        </nav>

        <div className="sidebar-foot">
          <LanguageSwitch style={{ marginBottom: 12 }} />
          <div className="user-chip">
            <div className="avatar">{session?.name?.trim()?.charAt(0)?.toUpperCase() || '?'}</div>
            <div>
              <div className="name">{session?.name || '—'}</div>
              <div className="role">{session?.role || '—'}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>{t('logout')}</button>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </div>
        </div>

        <div className="content">
          {tab === 'fertilizer' && <FertilizerTab onCalculate={recordHistory} t={t} tMap={tMap} />}
          {tab === 'pesticide' && <PesticideTab onCalculate={recordHistory} t={t} tMap={tMap} />}
          {tab === 'disease' && <DiseaseTab onCalculate={recordHistory} t={t} tMap={tMap} tDisease={tDisease} lang={lang} />}
          {tab === 'history' && <HistoryTab history={history} onClear={onClearHistory} t={t} />}
        </div>
      </main>
      <AssistantWidget />
    </div>
  );
}

function FertilizerTab({ onCalculate, t, tMap }) {
  const [crop, setCrop] = useState('rice');
  const [fert, setFert] = useState('urea');
  const [area, setArea] = useState('');
  const [unit, setUnit] = useState('acre');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const areaNum = parseFloat(area);
    if (!areaNum || areaNum <= 0) {
      setError(t('landAreaError'));
      setResult(null);
      return;
    }
    setError('');
    setBusy(true);

    const res = await api.post('/api/dosage/fertilizer', { crop, fert, area, unit });
    setBusy(false);

    if (!res.ok) {
      setError(res.error || t('calcError'));
      setResult(null);
      return;
    }

    const { total, perAcre, acres, cropLabel, fertName } = res.result;
    setResult({ total, perAcre, acres, cropLabel, fertName });

    onCalculate({
      title: `${tMap('fertNames', fert)} — ${tMap('cropNames', crop)}`,
      detail: `${acres.toFixed(2)} ${t('acre')}`,
      value: `${total.toFixed(1)} kg`,
    });
  }

  return (
    <div className="grid-2">
      <div className="card">
        <h3>{t('fertilizerHeading')}</h3>
        <p className="card-sub">{t('fertilizerCardSub')}</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="fertCrop">{t('selectCrop')}</label>
              <select id="fertCrop" value={crop} onChange={e => setCrop(e.target.value)}>
                {Object.keys(FERTILIZER_TABLE).map((key) => (
                  <option key={key} value={key}>{tMap('cropNames', key)}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="fertType">{t('selectFertilizer')}</label>
              <select id="fertType" value={fert} onChange={e => setFert(e.target.value)}>
                {Object.keys(FERTILIZER_NAME).map((key) => (
                  <option key={key} value={key}>{tMap('fertNames', key)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-grid">
            <div className={`field${error ? ' error' : ''}`}>
              <label htmlFor="fertArea">{t('landArea')}</label>
              <input
                type="number" id="fertArea" min="0.1" step="0.1" placeholder="e.g. 2.5"
                value={area} onChange={e => setArea(e.target.value)}
              />
              {error && <p className="err-msg">{error}</p>}
            </div>
            <div className="field">
              <label htmlFor="fertAreaUnit">{t('unit')}</label>
              <select id="fertAreaUnit" value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="acre">{t('acre')}</option>
                <option value="hectare">{t('hectare')}</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-sm" disabled={busy}>{busy ? t('calculating') : t('calculateDosage')}</button>
        </form>

        {result && (
          <div className="result show">
            <span className="stamp-mini">{t('calculatedLabel')}</span>
            <div className="headline">{result.total.toFixed(1)} <span className="unit">{t('kgTotal')}</span></div>
            <p className="cap">{tMap('fertNames', fert)} — {tMap('cropNames', crop)} · {area} {t(unit)}{area == 1 ? '' : 's'}</p>
            <div className="breakdown">
              <div className="row"><span>{t('recommendedRate')}</span><b>{result.perAcre} kg / {t('acre')}</b></div>
              <div className="row"><span>{t('convertedArea')}</span><b>{result.acres.toFixed(2)} {t('acre')}</b></div>
              <div className="row"><span>{t('fertilizerTab')}</span><b>{tMap('fertNames', fert)}</b></div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>{t('howCalculated')}</h3>
        <p className="card-sub">{t('referenceRates')}</p>
        <div className="breakdown">
          <div className="row"><span>{tMap('cropNames', 'rice')} · {tMap('fertNames', 'urea')}</span><b>87 kg/acre</b></div>
          <div className="row"><span>{tMap('cropNames', 'wheat')} · {tMap('fertNames', 'urea')}</span><b>130 kg/acre</b></div>
          <div className="row"><span>{tMap('cropNames', 'maize')} · DAP</span><b>75 kg/acre</b></div>
          <div className="row"><span>{tMap('cropNames', 'cotton')} · MOP</span><b>33 kg/acre</b></div>
          <div className="row"><span>{tMap('cropNames', 'sugarcane')} · {tMap('fertNames', 'urea')}</span><b>260 kg/acre</b></div>
        </div>
        <p className="warn-note">{t('totalFormulaNote')}</p>
      </div>
    </div>
  );
}

function PesticideTab({ onCalculate, t, tMap }) {
  const [target, setTarget] = useState('aphid');
  const [area, setArea] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const areaNum = parseFloat(area);
    if (!areaNum || areaNum <= 0) {
      setError(t('landAreaError'));
      setResult(null);
      return;
    }
    setError('');
    setBusy(true);

    const res = await api.post('/api/dosage/pesticide', { target, area });
    setBusy(false);

    if (!res.ok) {
      setError(res.error || t('calcError'));
      setResult(null);
      return;
    }

    const r = res.result;
    setResult(r);
    const pestLabel = tMap('pestNames', target);

    if (r.type === 'granular') {
      onCalculate({
        title: `${r.data.product} — ${pestLabel}`,
        detail: `${r.area} ${t('acre')}(s)`,
        value: `${r.totalKg.toFixed(1)} kg`,
      });
    } else {
      onCalculate({
        title: `${r.data.product} — ${pestLabel}`,
        detail: `${r.area} ${t('acre')}(s), ${r.totalWaterL.toFixed(0)} L mix`,
        value: `${r.totalProductMl.toFixed(0)} ml`,
      });
    }
  }

  return (
    <div className="grid-2">
      <div className="card">
        <h3>{t('pesticideHeading')}</h3>
        <p className="card-sub">{t('pesticideCardSub')}</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="pestTarget">{t('selectTarget')}</label>
            <select id="pestTarget" value={target} onChange={e => setTarget(e.target.value)}>
              {Object.keys(PESTICIDE_TABLE).map((key) => (
                <option key={key} value={key}>{tMap('pestNames', key)}</option>
              ))}
            </select>
          </div>

          <div className={`field${error ? ' error' : ''}`}>
            <label htmlFor="pestArea">{t('landArea')} ({t('acre')})</label>
            <input
              type="number" id="pestArea" min="0.1" step="0.1" placeholder="e.g. 1.5"
              value={area} onChange={e => setArea(e.target.value)}
            />
            {error && <p className="err-msg">{error}</p>}
          </div>

          <button type="submit" className="btn-sm" disabled={busy}>{busy ? t('calculating') : t('calculateDosage')}</button>
        </form>

        {result && result.type === 'granular' && (
          <div className="result show">
            <span className="stamp-mini">{t('calculatedLabel')}</span>
            <div className="headline">{result.totalKg.toFixed(1)} <span className="unit">{t('kgTotal')}</span></div>
            <p className="cap">{result.data.product} — {tMap('pestNames', target)} · {result.area} {t('acre')}(s)</p>
            <div className="breakdown">
              <div className="row"><span>{t('applicationType')}</span><b>{t('granularSoil')}</b></div>
              <div className="row"><span>{t('rateLabel')}</span><b>{result.data.granular} kg / {t('acre')}</b></div>
            </div>
            <div className="warn-note">{t('granularNote')}</div>
          </div>
        )}

        {result && result.type === 'spray' && (
          <div className="result show">
            <span className="stamp-mini">{t('calculatedLabel')}</span>
            <div className="headline">{result.totalProductMl.toFixed(0)} <span className="unit">ml total</span></div>
            <p className="cap">{result.data.product} — {tMap('pestNames', target)} · {result.area} {t('acre')}(s)</p>
            <div className="breakdown">
              <div className="row"><span>{t('concentration')}</span><b>{result.data.doseMlPerL} ml / L water</b></div>
              <div className="row"><span>{t('sprayVolume')}</span><b>{result.data.waterPerAcreL} L / {t('acre')}</b></div>
              <div className="row"><span>{t('totalSpraySolution')}</span><b>{result.totalWaterL.toFixed(0)} L</b></div>
            </div>
            <div className="warn-note danger">{t('ppeNote')}</div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>{t('referenceProducts')}</h3>
        <p className="card-sub">{t('typicalConcentration')}</p>
        <div className="breakdown">
          <div className="row"><span>{tMap('pestNames', 'aphid')}</span><b>0.3 ml/L</b></div>
          <div className="row"><span>{tMap('pestNames', 'bollworm')}</span><b>0.3 ml/L</b></div>
          <div className="row"><span>{tMap('pestNames', 'blight')}</span><b>2.5 g/L</b></div>
          <div className="row"><span>{tMap('pestNames', 'weeds')}</span><b>1.5 ml/L</b></div>
          <div className="row"><span>{tMap('pestNames', 'stemBorer')}</span><b>10 kg/acre ({t('granularSoil')})</b></div>
        </div>
        <p className="warn-note danger">{t('ppeNoteShort')}</p>
      </div>
    </div>
  );
}

function DiseaseTab({ onCalculate, t, tMap, tDisease }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  function handleFile(f) {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError(t('chooseImageError'));
      return;
    }
    setError('');
    setResult(null);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function clearFile() {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError('');
  }

  async function handleAnalyze() {
    if (!file) {
      setError(t('uploadFirstError'));
      return;
    }
    setBusy(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const res = await api.post('/api/disease/scan', formData, { isForm: true });
      if (!res.ok) {
        setError(res.error || t('analyzeError'));
        return;
      }

      const { disease, confidence, suggestedFertilizer, suggestedPesticide } = res;
      setResult({ disease, confidence, suggestedFertilizer, suggestedPesticide });
      const localName = tDisease(disease.id)?.name || disease.name;
      onCalculate({
        title: `${t('leafScanPrefix')} ${localName}`,
        detail: `${Math.round(confidence * 100)}% ${t('confidenceSuffix')}`,
        value: suggestedFertilizer || suggestedPesticide || '—',
      });
    } catch (e) {
      setError(t('analyzeError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid-2">
      <div className="card">
        <h3>{t('diseaseHeading')}</h3>
        <p className="card-sub">{t('diseaseCardSub')}</p>

        <div className="photo-btn-row">
          <label className="dropzone" htmlFor="leafCamera" style={{ flex: 1 }}>
            <div className="dz-icon">📸</div>
            <div className="dz-label">{t('takePhoto')}</div>
            <div className="dz-hint">{t('opensCamera')}</div>
            <input
              id="leafCamera" type="file" accept="image/*" capture="environment"
              onChange={e => handleFile(e.target.files?.[0])}
            />
          </label>
          <label className="dropzone" htmlFor="leafFile" style={{ flex: 1 }}>
            <div className="dz-icon">🖼️</div>
            <div className="dz-label">{t('uploadPhoto')}</div>
            <div className="dz-hint">{t('jpgOrPng')}</div>
            <input
              id="leafFile" type="file" accept="image/*"
              onChange={e => handleFile(e.target.files?.[0])}
            />
          </label>
        </div>

        {previewUrl && (
          <div className="preview-row">
            <img src={previewUrl} alt="Uploaded leaf preview" />
            <div>
              <div className="pv-name">{file.name}</div>
              <div className="pv-sub">{(file.size / 1024).toFixed(0)} KB</div>
            </div>
            <button className="pv-remove" onClick={clearFile}>{t('removeBtn')}</button>
          </div>
        )}

        {error && <p className="err-msg" style={{ display: 'block', marginTop: 10 }}>{error}</p>}

        <button className="btn-sm" style={{ marginTop: 16 }} onClick={handleAnalyze} disabled={busy}>
          {busy ? t('analyzing') : t('analyze')}
        </button>

        {result && (() => {
          const local = tDisease(result.disease.id);
          const localName = local?.name || result.disease.name;
          const localSymptoms = local?.symptoms || result.disease.symptoms;
          const localNote = local?.note || result.disease.fertilizerNote;
          const localFert = result.disease.fertilizerKey ? tMap('fertNames', result.disease.fertilizerKey) : null;
          return (
            <div className="detect-result">
              <div className="dr-head">
                <DiseaseThumb image={result.disease.image} swatch={result.disease.swatch} name={localName} />
                <div>
                  <div className="dr-name">{localName}</div>
                  <div className="dr-conf">{Math.round(result.confidence * 100)}% {t('confidenceSuffix')}</div>
                </div>
              </div>
              <p className="dr-symptoms">{localSymptoms}</p>
              <div className="dr-suggest">
                <div className="row">
                  <span>{t('suggestedFertilizer')}</span>
                  <b>{localFert || '—'}</b>
                </div>
                <div className="row">
                  <span>{t('suggestedPesticide')}</span>
                  <b>{result.suggestedPesticide || '—'}</b>
                </div>
              </div>
              <p className="warn-note" style={{ marginTop: 14 }}>{localNote}</p>
            </div>
          );
        })()}

        <p className="warn-note" style={{ marginTop: 16 }}>{t('demoHeuristicNote')}</p>
      </div>

      <div className="card">
        <h3>{t('referenceDbHeading')}</h3>
        <p className="card-sub">{t('referenceDbSub')}</p>
        <div className="disease-gallery">
          {DISEASE_DB.map(d => {
            const local = tDisease(d.id);
            const localName = local?.name || d.name;
            return (
              <div className="disease-card" key={d.id}>
                <DiseaseThumb image={d.image} swatch={d.swatch} name={localName} />
                <div className="dc-body">
                  <div className="dc-name">{localName}</div>
                  <div className="dc-crop">{d.crop}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HistoryTab({ history, onClear, t }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div>
          <h3>{t('historyHeading')}</h3>
          <p className="card-sub" style={{ marginBottom: 0 }}>{t('historyCardSub')}</p>
        </div>
        <button className="btn-sm" style={{ background: 'var(--rust-600)' }} onClick={onClear}>{t('clearHistory')}</button>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">{t('noHistory')}</div>
      ) : (
        <div className="history-list">
          {history.map((item, i) => (
            <div className="history-item" key={item.id ?? i}>
              <div className="h-main">
                <b>{item.title}</b>
                <span>{item.detail} · {new Date(item.at).toLocaleString()}</span>
              </div>
              <div className="h-val">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
