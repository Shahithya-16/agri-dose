const { FERTILIZER_TABLE, FERTILIZER_NAME, PESTICIDE_TABLE } = require('../data/reference');
const { DISEASE_DB } = require('../data/diseaseData');
const {
  findFaq, findCropInText, findPestInText, findDiseaseInText,
} = require('../data/assistantKnowledge');

function isFertilizerQuestion(q) {
  const lower = q.toLowerCase();
  return /(fertiliz|urea|dap|mop|உரம்)/i.test(lower);
}
function isPesticideQuestion(q) {
  const lower = q.toLowerCase();
  return /(pesticid|pest|spray|பூச்சி|தெளி)/i.test(lower);
}
function isDiseaseQuestion(q) {
  const lower = q.toLowerCase();
  return /(disease|blight|mildew|infect|leaf|spot|நோய்|இலை)/i.test(lower);
}

function answer(question, lang = 'en') {
  const q = (question || '').trim();
  if (!q) {
    return lang === 'ta'
      ? 'தயவுசெய்து ஒரு கேள்வி கேளுங்கள்.'
      : 'Please ask a question.';
  }

  // 1. Direct crop + fertilizer lookup, e.g. "how much urea for rice"
  const crop = findCropInText(q);
  if (crop && isFertilizerQuestion(q)) {
    const c = FERTILIZER_TABLE[crop];
    if (lang === 'ta') {
      return `${c.label} பயிருக்கு: யூரியா ${c.urea} கிலோ/ஏக்கர், DAP ${c.dap} கிலோ/ஏக்கர், MOP ${c.mop} கிலோ/ஏக்கர். சரியான மொத்த அளவுக்கு Fertilizer tab-ஐ பயன்படுத்தவும்.`;
    }
    return `For ${c.label}: Urea ${c.urea} kg/acre, DAP ${c.dap} kg/acre, MOP ${c.mop} kg/acre. Use the Fertilizer tab to get the exact total for your land area.`;
  }

  // 2. Direct pest lookup, e.g. "pesticide for aphids"
  const pest = findPestInText(q);
  if (pest && isPesticideQuestion(q)) {
    const p = PESTICIDE_TABLE[pest];
    if (lang === 'ta') {
      return `${p.label}-க்கு பரிந்துரைக்கப்படும் பொருள்: ${p.product}. சரியான அளவுக்கு Pesticide tab-ஐ பயன்படுத்தவும்.`;
    }
    return `For ${p.label}, the recommended product is ${p.product}. Use the Pesticide tab to calculate the exact quantity for your land area.`;
  }

  // 3. Direct disease lookup, e.g. "what is leaf blight"
  const disease = findDiseaseInText(q);
  if (disease) {
    const treat = disease.fertilizerKey
      ? (lang === 'ta' ? `பரிந்துரை உரம்: ${FERTILIZER_NAME[disease.fertilizerKey]}` : `Suggested fertilizer: ${FERTILIZER_NAME[disease.fertilizerKey]}`)
      : disease.pesticideKey
        ? (lang === 'ta' ? `பரிந்துரை பூச்சிக்கொல்லி: ${PESTICIDE_TABLE[disease.pesticideKey].product}` : `Suggested pesticide: ${PESTICIDE_TABLE[disease.pesticideKey].product}`)
        : (lang === 'ta' ? disease.fertilizerNote : disease.fertilizerNote);
    if (lang === 'ta') {
      return `${disease.name}: ${disease.symptoms} ${treat}.`;
    }
    return `${disease.name}: ${disease.symptoms} ${treat}.`;
  }

  // 4. General FAQ keyword match
  const faq = findFaq(q);
  if (faq) return lang === 'ta' ? faq.ta : faq.en;

  // 5. Broad category fallback
  if (isFertilizerQuestion(q)) {
    return lang === 'ta'
      ? 'ஒரு குறிப்பிட்ட பயிரின் பெயரையும் சேர்த்து கேளுங்கள், எ.கா. "நெல்லுக்கு உரம் எவ்வளவு?" — அல்லது Fertilizer tab-ஐ பயன்படுத்தவும்.'
      : 'Try naming a specific crop, e.g. "how much fertilizer for rice?" — or use the Fertilizer tab directly.';
  }
  if (isPesticideQuestion(q)) {
    return lang === 'ta'
      ? 'ஒரு குறிப்பிட்ட பூச்சியின் பெயரையும் சேர்த்து கேளுங்கள், எ.கா. "அஃபிட்-க்கு பூச்சிக்கொல்லி என்ன?" — அல்லது Pesticide tab-ஐ பயன்படுத்தவும்.'
      : 'Try naming a specific pest, e.g. "which pesticide for aphids?" — or use the Pesticide tab directly.';
  }
  if (isDiseaseQuestion(q)) {
    return lang === 'ta'
      ? 'இலையின் புகைப்படத்தை Disease Scan tab-ல் பதிவேற்றி, நோயை கண்டறியலாம்.'
      : 'Upload a photo of the leaf on the Disease Scan tab, and I can help identify the issue.';
  }

  // 6. Total fallback
  return lang === 'ta'
    ? 'மன்னிக்கவும், இந்த கேள்விக்கு பதில் தெரியவில்லை. உரம், பூச்சிக்கொல்லி, அல்லது இலை நோய் பற்றி கேளுங்கள்.'
    : "Sorry, I don't have an answer for that yet. Try asking about fertilizer dosage, pesticide for a pest, or a leaf disease.";
}

module.exports = { answer };
