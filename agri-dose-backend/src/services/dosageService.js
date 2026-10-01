const { FERTILIZER_TABLE, FERTILIZER_NAME, PESTICIDE_TABLE } = require('../data/reference');

// Same logic as FertilizerTab's handleSubmit in the React app.
function calculateFertilizer({ crop, fert, area, unit }) {
  const areaNum = parseFloat(area);
  if (!areaNum || areaNum <= 0) {
    return { ok: false, error: 'Enter a land area greater than 0.' };
  }
  const cropData = FERTILIZER_TABLE[crop];
  if (!cropData) return { ok: false, error: 'Unknown crop.' };
  if (!FERTILIZER_NAME[fert]) return { ok: false, error: 'Unknown fertilizer.' };

  const acres = unit === 'hectare' ? areaNum * 2.471 : areaNum;
  const perAcre = cropData[fert];
  const total = perAcre * acres;

  return {
    ok: true,
    result: {
      total,
      perAcre,
      acres,
      cropLabel: cropData.label,
      fertName: FERTILIZER_NAME[fert],
    },
  };
}

// Same logic as PesticideTab's handleSubmit in the React app.
function calculatePesticide({ target, area }) {
  const areaNum = parseFloat(area);
  if (!areaNum || areaNum <= 0) {
    return { ok: false, error: 'Enter a land area greater than 0.' };
  }
  const data = PESTICIDE_TABLE[target];
  if (!data) return { ok: false, error: 'Unknown target pest / issue.' };

  if (data.granular) {
    const totalKg = data.granular * areaNum;
    return { ok: true, result: { type: 'granular', totalKg, data, area: areaNum } };
  }

  const totalWaterL = data.waterPerAcreL * areaNum;
  const totalProductMl = data.doseMlPerL * totalWaterL;
  return { ok: true, result: { type: 'spray', totalWaterL, totalProductMl, data, area: areaNum } };
}

module.exports = { calculateFertilizer, calculatePesticide };
