// Reference dose values are approximate, generalized agronomy figures for
// demo purposes only — NOT a substitute for a soil test or local
// agricultural extension guidance.

export const FERTILIZER_TABLE = {
  rice:      { label: 'Rice',                 urea: 87,  dap: 65,  mop: 33 },
  wheat:     { label: 'Wheat',                 urea: 130, dap: 100, mop: 33 },
  maize:     { label: 'Maize',                 urea: 130, dap: 75,  mop: 40 },
  cotton:    { label: 'Cotton',                urea: 110, dap: 65,  mop: 33 },
  sugarcane: { label: 'Sugarcane',             urea: 260, dap: 110, mop: 100 },
  tomato:    { label: 'Tomato (vegetable)',    urea: 120, dap: 100, mop: 66 },
  gram:      { label: 'Gram (pulse)',          urea: 22,  dap: 65,  mop: 22 },
};

export const FERTILIZER_NAME = {
  urea: 'Urea (46% N)',
  dap: 'DAP (18-46-0)',
  mop: 'MOP (60% K)',
};

export const PESTICIDE_TABLE = {
  aphid:     { label: 'Aphids / sucking pests', product: 'Imidacloprid 17.8% SL',           doseMlPerL: 0.3, waterPerAcreL: 200 },
  bollworm:  { label: 'Bollworm / caterpillar',  product: 'Chlorantraniliprole 18.5% SC',     doseMlPerL: 0.3, waterPerAcreL: 200 },
  blight:    { label: 'Fungal blight',           product: 'Mancozeb 75% WP (g/L)',            doseMlPerL: 2.5, waterPerAcreL: 200 },
  weeds:     { label: 'Broadleaf weeds',         product: '2,4-D Amine 58% SL',               doseMlPerL: 1.5, waterPerAcreL: 150 },
  stemBorer: { label: 'Stem borer',              product: 'Cartap Hydrochloride 4% G (kg/acre)', doseMlPerL: 0, waterPerAcreL: 0, granular: 10 },
};

export function historyKey(email) {
  return `agridose_history_${email || 'guest'}`;
}

export function loadHistory(email) {
  try { return JSON.parse(localStorage.getItem(historyKey(email))) || []; }
  catch { return []; }
}

export function pushHistory(email, entry) {
  const list = loadHistory(email);
  list.unshift({ ...entry, at: Date.now() });
  const trimmed = list.slice(0, 25);
  localStorage.setItem(historyKey(email), JSON.stringify(trimmed));
  return trimmed;
}

export function clearHistory(email) {
  localStorage.removeItem(historyKey(email));
}
