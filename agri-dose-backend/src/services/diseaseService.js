// Server-side port of src/utils/imageAnalysis.js.
//
// Same demo colour heuristic, just running here instead of in the browser
// <canvas>, so the frontend can send a photo and get back a diseaseId
// without doing any image processing itself. Swap classifyByColour()
// for a real trained model later — nothing else needs to change, since
// downstream code only cares about the returned diseaseId.

const Jimp = require('jimp');

async function readImageAverageColor(filePath) {
  const image = await Jimp.read(filePath);
  const size = 64;
  image.resize(size, size);

  let r = 0, g = 0, b = 0, count = 0;
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    r += this.bitmap.data[idx + 0];
    g += this.bitmap.data[idx + 1];
    b += this.bitmap.data[idx + 2];
    count++;
  });

  return { r: r / count, g: g / count, b: b / count };
}

function classifyByColour({ r, g, b }) {
  const brightness = (r + g + b) / 3;
  const greenness = g - (r + b) / 2;
  const yellowness = (r + g) / 2 - b;
  const brownness = r - g;

  if (brightness > 180 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25) {
    return { id: 'powdery_mildew', confidence: 0.62 };
  }
  if (greenness > 15 && brightness > 90 && brightness < 190) {
    return { id: 'healthy', confidence: 0.7 };
  }
  if (brownness > 12 && brightness < 150) {
    return { id: 'leaf_blight', confidence: 0.58 };
  }
  if (yellowness > 20 && greenness < 10) {
    return { id: 'nitrogen_deficiency', confidence: 0.55 };
  }
  if (yellowness > 10 && brownness > 5) {
    return { id: 'potassium_deficiency', confidence: 0.5 };
  }
  return { id: 'aphid_infestation', confidence: 0.4 };
}

async function detectDisease(filePath) {
  const avg = await readImageAverageColor(filePath);
  const { id, confidence } = classifyByColour(avg);
  return { diseaseId: id, confidence, avgColor: avg };
}

module.exports = { detectDisease, classifyByColour, readImageAverageColor };
