// A small rule-based knowledge base for the farmer assistant.
// No external AI API is used here (that would need a paid API key) —
// instead we match the farmer's question against keywords and answer
// from AgriDose's own dosage/disease data, plus a set of general FAQs.
// Every entry has both an English and a Tamil answer.

const { FERTILIZER_TABLE, FERTILIZER_NAME, PESTICIDE_TABLE } = require('./reference');
const { DISEASE_DB } = require('./diseaseData');

// Tamil names for crops and pest targets, so the assistant can match
// questions asked entirely in Tamil (the English data keys stay in
// reference.js / diseaseData.js — this is just a lookup aid).
const CROP_TA = {
  rice: 'நெல்',
  wheat: 'கோதுமை',
  maize: 'சோளம்',
  cotton: 'பருத்தி',
  sugarcane: 'கரும்பு',
  tomato: 'தக்காளி',
  gram: 'கடலை',
};

const PEST_TA = {
  aphid: 'பேன்',
  bollworm: 'காய்ப்புழு',
  blight: 'பூஞ்சை',
  weeds: 'களை',
  stemBorer: 'தண்டு துளைப்பான்',
};

// General FAQs — keyword-triggered, bilingual.
const FAQS = [
  {
    keywords: ['how much water', 'water quantity', 'water for spray', 'தண்ணீர்', 'நீர்'],
    en: 'For most sprays, mix the pesticide into 150–200 litres of water per acre, as shown on the Pesticide tab. Always check the product label for the exact ratio.',
    ta: 'பெரும்பாலான spray-க்கு, ஒரு ஏக்கருக்கு 150–200 லிட்டர் தண்ணீரில் பூச்சிக்கொல்லியை கலக்கவும், Pesticide tab-ல் காட்டியுள்ளபடி. சரியான அளவுக்கு product label-ஐ பார்க்கவும்.',
  },
  {
    keywords: ['best time to spray', 'when to spray', 'spray time', 'எப்போது தெளிக்க', 'தெளிக்கும் நேரம்'],
    en: 'Spray early morning or late evening, when it is not too hot and there is no strong wind or rain expected in the next few hours.',
    ta: 'அதிகாலை அல்லது மாலை நேரத்தில் தெளிக்கவும், அதிக வெயில் இல்லாத, அடுத்த சில மணிநேரங்களில் மழை/பலத்த காற்று இல்லாத நேரத்தில் தெளிக்கவும்.',
  },
  {
    keywords: ['organic', 'natural fertilizer', 'இயற்கை உரம்'],
    en: 'This app currently shows chemical fertilizer reference doses (Urea, DAP, MOP). For organic options, compost and vermicompost rates depend on your soil test — consult your local agriculture office.',
    ta: 'இந்த ஆப் தற்போது இரசாயன உரங்களை (யூரியா, DAP, MOP) மட்டும் காட்டுகிறது. இயற்கை உரங்களுக்கு (எருப் பசளை) அளவு உங்கள் மண் பரிசோதனையை பொறுத்தது — உள்ளூர் வேளாண் அலுவலகத்தை அணுகவும்.',
  },
  {
    keywords: ['forgot password', 'reset password', 'கடவுச்சொல் மறந்து'],
    en: 'This demo version does not yet have a "forgot password" option. Please register a new account, or ask your project admin to reset it in the database.',
    ta: 'இந்த demo பதிப்பில் "கடவுச்சொல் மறந்துவிட்டேன்" option இன்னும் இல்லை. புதிய கணக்கு உருவாக்கவும், அல்லது admin-ஐ கேட்கவும்.',
  },
  {
    keywords: ['history', 'past calculation', 'saved result', 'வரலாறு', 'முந்தைய கணக்கீடு'],
    en: 'Your past fertilizer, pesticide, and disease scan results are saved automatically under the History tab whenever you are logged in.',
    ta: 'நீங்கள் login செய்திருக்கும்போது, உங்கள் முந்தைய உர, பூச்சிக்கொல்லி, நோய் கண்டறிதல் முடிவுகள் History tab-ல் தானாகவே சேமிக்கப்படும்.',
  },
];

function findFaq(q) {
  const lower = q.toLowerCase();
  return FAQS.find(f => f.keywords.some(k => lower.includes(k.toLowerCase())));
}

function findCropInText(q) {
  const lower = q.toLowerCase();
  return Object.keys(FERTILIZER_TABLE).find(key =>
    lower.includes(key) ||
    lower.includes(FERTILIZER_TABLE[key].label.toLowerCase()) ||
    (CROP_TA[key] && q.includes(CROP_TA[key]))
  );
}

function findPestInText(q) {
  const lower = q.toLowerCase();
  return Object.keys(PESTICIDE_TABLE).find(key =>
    lower.includes(key.toLowerCase()) ||
    lower.includes(PESTICIDE_TABLE[key].label.toLowerCase()) ||
    (PEST_TA[key] && q.includes(PEST_TA[key]))
  );
}

function findDiseaseInText(q) {
  const lower = q.toLowerCase();
  return DISEASE_DB.find(d =>
    lower.includes(d.name.toLowerCase()) || lower.includes(d.id.replace(/_/g, ' '))
  );
}

module.exports = { FAQS, findFaq, findCropInText, findPestInText, findDiseaseInText };
