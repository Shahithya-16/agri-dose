const fs = require('fs');
const diseaseService = require('../services/diseaseService');
const { DISEASE_DB, getDisease } = require('../data/diseaseData');
const { FERTILIZER_NAME, PESTICIDE_TABLE } = require('../data/reference');

function listDiseases(req, res) {
  res.json({ ok: true, diseases: DISEASE_DB });
}

async function scan(req, res) {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: 'Upload a leaf photo first.' });
  }

  try {
    const { diseaseId, confidence } = await diseaseService.detectDisease(req.file.path);
    const disease = getDisease(diseaseId);

    // Clean up the uploaded file — we only needed it for this one analysis
    fs.unlink(req.file.path, () => {});

    if (!disease) {
      return res.status(500).json({ ok: false, error: 'Could not match a disease record.' });
    }

    res.json({
      ok: true,
      disease,
      confidence,
      suggestedFertilizer: disease.fertilizerKey ? FERTILIZER_NAME[disease.fertilizerKey] : null,
      suggestedPesticide: disease.pesticideKey ? PESTICIDE_TABLE[disease.pesticideKey].product : null,
    });
  } catch (err) {
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ ok: false, error: 'Could not analyze that image. Try a different photo.' });
  }
}

module.exports = { listDiseases, scan };
