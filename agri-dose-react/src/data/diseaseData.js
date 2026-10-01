// Reference "image database" for leaf disease detection.
//
// Each entry can point to a real reference photo via `image` (place your
// own sample photos in /public/disease-images/ using these filenames —
// see public/disease-images/README.md). If the file isn't present yet,
// the UI falls back to a coloured icon automatically, so the app still
// works before you add real images.
//
// `fertilizerKey` / `pesticideKey` map into FERTILIZER_NAME / PESTICIDE_TABLE
// in reference.js, so a detected disease can suggest a specific product.

export const DISEASE_DB = [
  {
    id: 'leaf_blight',
    name: 'Leaf Blight',
    crop: 'Rice, Wheat, Tomato',
    symptoms: 'Brown or grey lesions, often with concentric rings, spreading from leaf tips and edges.',
    pesticideKey: 'blight',
    fertilizerKey: null,
    fertilizerNote: 'No fertilizer change needed — treat with fungicide and remove infected leaves.',
    image: '/disease-images/leaf-blight.jpg',
    swatch: '#8a5a34',
  },
  {
    id: 'powdery_mildew',
    name: 'Powdery Mildew',
    crop: 'Tomato, Cotton, Vegetables',
    symptoms: 'White or grey powdery coating on the leaf surface, usually starting on older leaves.',
    pesticideKey: 'blight',
    fertilizerKey: null,
    fertilizerNote: 'Avoid excess nitrogen — it encourages soft growth that mildew spreads on faster.',
    image: '/disease-images/powdery-mildew.jpg',
    swatch: '#c9c2a6',
  },
  {
    id: 'aphid_infestation',
    name: 'Aphid Infestation',
    crop: 'Cotton, Vegetables, Pulses',
    symptoms: 'Curled, yellowing leaves with clusters of small insects and a sticky residue underneath.',
    pesticideKey: 'aphid',
    fertilizerKey: null,
    fertilizerNote: 'No fertilizer change needed — treat with the recommended insecticide.',
    image: '/disease-images/aphid.jpg',
    swatch: '#3f8a56',
  },
  {
    id: 'nitrogen_deficiency',
    name: 'Nitrogen Deficiency',
    crop: 'Most crops',
    symptoms: 'Even yellowing (chlorosis) starting on older, lower leaves, with a pale green overall canopy.',
    pesticideKey: null,
    fertilizerKey: 'urea',
    fertilizerNote: 'Apply Urea (46% N) at the recommended rate for your crop.',
    image: '/disease-images/nitrogen-deficiency.jpg',
    swatch: '#d9a428',
  },
  {
    id: 'potassium_deficiency',
    name: 'Potassium Deficiency',
    crop: 'Most crops',
    symptoms: 'Yellow-brown scorching along leaf edges and tips, while the leaf centre stays green.',
    pesticideKey: null,
    fertilizerKey: 'mop',
    fertilizerNote: 'Apply MOP (60% K) at the recommended rate for your crop.',
    image: '/disease-images/potassium-deficiency.jpg',
    swatch: '#b5451f',
  },
  {
    id: 'healthy',
    name: 'Healthy Leaf',
    crop: '—',
    symptoms: 'Uniform green colour, no spots, no curling or discolouration.',
    pesticideKey: null,
    fertilizerKey: null,
    fertilizerNote: 'No treatment needed — continue your normal fertilizer schedule.',
    image: '/disease-images/healthy.jpg',
    swatch: '#1d4f34',
  },
];

export function getDisease(id) {
  return DISEASE_DB.find(d => d.id === id) || null;
}
