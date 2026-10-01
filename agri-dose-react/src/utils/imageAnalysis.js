// ---------------------------------------------------------------
// DEMO HEURISTIC ONLY — not real disease detection.
//
// This reads the average colour of the uploaded photo in the browser
// (via <canvas>) and maps that colour to a likely entry in DISEASE_DB.
// It's good enough to demo the end-to-end flow (upload -> "detect" ->
// suggest fertilizer/pesticide) for a mini project, but it is NOT a
// trained model and will not reliably identify real plant diseases.
//
// To make this production-real: replace `classifyByColour()` with a
// call to a trained image-classification model — e.g. export a model
// from Google's Teachable Machine (fastest path for a student project),
// or train a small CNN (TensorFlow/PyTorch) and serve it from a backend
// API, then POST the image there instead of running the canvas heuristic.
// ---------------------------------------------------------------

export function readImageAverageColor(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 64; // downsample for speed
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]; g += data[i + 1]; b += data[i + 2];
          count++;
        }
        r = r / count; g = g / count; b = b / count;
        URL.revokeObjectURL(url);
        resolve({ r, g, b });
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read image.')); };
    img.src = url;
  });
}

export function classifyByColour({ r, g, b }) {
  const brightness = (r + g + b) / 3;
  const greenness = g - (r + b) / 2;
  const yellowness = (r + g) / 2 - b;
  const brownness = r - g;

  // Very pale / whitish surface -> powdery mildew
  if (brightness > 180 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25) {
    return { id: 'powdery_mildew', confidence: 0.62 };
  }
  // Strong even green, decent brightness -> healthy
  if (greenness > 15 && brightness > 90 && brightness < 190) {
    return { id: 'healthy', confidence: 0.7 };
  }
  // Brown/rust dominant -> leaf blight
  if (brownness > 12 && brightness < 150) {
    return { id: 'leaf_blight', confidence: 0.58 };
  }
  // Strong yellow cast, low green -> nitrogen deficiency
  if (yellowness > 20 && greenness < 10) {
    return { id: 'nitrogen_deficiency', confidence: 0.55 };
  }
  // Yellow-brown edges specifically -> potassium deficiency
  if (yellowness > 10 && brownness > 5) {
    return { id: 'potassium_deficiency', confidence: 0.5 };
  }
  // Greenish with some texture variance -> guess aphid activity
  return { id: 'aphid_infestation', confidence: 0.4 };
}

export async function detectDisease(file) {
  const avg = await readImageAverageColor(file);
  const { id, confidence } = classifyByColour(avg);
  return { diseaseId: id, confidence, avgColor: avg };
}
