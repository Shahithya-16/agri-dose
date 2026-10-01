// AgriDose translations — English + Tamil.
// Add new keys here as you extend the UI; missing keys fall back to
// the English text automatically (see LanguageContext.jsx).

export const translations = {
  en: {
    appName: 'AgriDose',
    tagline: 'Fertilizer & Pesticide Dosage Calculator',

    // Login
    loginTitle: 'Sign in',
    welcomeBack: 'Welcome back',
    loginSubtitle: 'Welcome back — enter your details to continue.',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signingIn: 'Signing in…',
    noAccount: "Don't have an account?",
    registerLink: 'Create one',

    // Register
    registerTitle: 'Create your account',
    registerSubtitle: 'Join AgriDose to start calculating accurate doses.',
    fullName: 'Full name',
    role: 'Role',
    confirmPassword: 'Confirm password',
    agreeText: 'I confirm the details above are correct.',
    createAccount: 'Create account',
    creatingAccount: 'Creating account…',
    haveAccount: 'Already have an account?',
    loginLink: 'Sign in',

    // Dashboard nav
    fertilizerTab: 'Fertilizer',
    pesticideTab: 'Pesticide',
    diseaseTab: 'Disease Scan',
    historyTab: 'History',
    logout: 'Log out',

    // Fertilizer tab
    fertilizerHeading: 'Fertilizer Dosage Calculator',
    selectCrop: 'Select crop',
    selectFertilizer: 'Select fertilizer',
    landArea: 'Land area',
    unit: 'Unit',
    acre: 'Acre',
    hectare: 'Hectare',
    calculateDosage: 'Calculate dosage',
    calculating: 'Calculating…',

    // Pesticide tab
    pesticideHeading: 'Pesticide Dosage Calculator',
    selectTarget: 'Select target pest / issue',

    // Disease tab
    diseaseHeading: 'Leaf Disease Scan',
    uploadPhoto: 'Upload from gallery',
    takePhoto: 'Take photo',
    analyze: 'Analyze leaf',
    analyzing: 'Analyzing…',
    suggestedFertilizer: 'Suggested fertilizer',
    suggestedPesticide: 'Suggested pesticide',

    // History tab
    historyHeading: 'Calculation History',
    clearHistory: 'Clear history',
    noHistory: 'No history yet — your calculations will appear here.',

    // Assistant
    assistantTitle: 'Ask AgriDose',
    assistantPlaceholder: 'Type or speak your question…',
    assistantListening: 'Listening…',
    assistantSend: 'Ask',
    assistantGreeting: "Hi! Ask me about fertilizer doses, pesticides, or leaf diseases — in English or Tamil.",
    assistantNotSupported: 'Voice input is not supported in this browser. You can still type your question.',

    // Language switcher
    language: 'Language',

    // Card subtitles & misc
    fertilizerCardSub: 'Pick a crop and fertilizer, enter your land area, and get the total quantity needed.',
    pesticideCardSub: 'Choose the target pest or issue and your land area to get the total product and spray-solution volume.',
    diseaseCardSub: 'Upload a photo of an affected leaf to get a suggested fertilizer or pesticide.',
    historyCardSub: 'Your last 25 calculations, saved to your account.',
    referenceDbHeading: 'Reference disease database',
    referenceDbSub: 'Photos and symptoms for the diseases this demo can currently detect.',
    removeBtn: 'Remove',
    chooseImageError: 'Please choose an image file (JPG or PNG).',
    uploadFirstError: 'Upload a leaf photo first.',
    analyzeError: 'Could not analyze that image. Try a different photo.',
    opensCamera: 'Opens your camera',
    jpgOrPng: 'JPG or PNG',
    confidenceSuffix: 'confidence · demo heuristic',
    demoHeuristicNote: 'This is a simple colour-based demo, not a trained AI model — treat the result as a starting guess, and double-check with a local expert before applying any treatment.',
    selectRolePlaceholder: 'Select role',
    leafScanPrefix: 'Leaf scan —',
    calculatedLabel: 'Calculated ✓',
    kgTotal: 'kg total',
    recommendedRate: 'Recommended rate',
    convertedArea: 'Converted area',
    howCalculated: 'How this is calculated',
    referenceRates: 'Reference application rates, per acre',
    totalFormulaNote: 'Total = rate per acre × land area. These are generalized figures for demo purposes — always confirm against a soil test or your local agriculture extension office before applying.',
    landAreaError: 'Enter a land area greater than 0.',
    calcError: 'Could not calculate dosage.',
    applicationType: 'Application type',
    granularSoil: 'Granular, soil application',
    rateLabel: 'Rate',
    granularNote: 'Granular products are broadcast by hand or applicator — no tank mixing needed. Apply to moist soil per label directions.',
    concentration: 'Concentration',
    sprayVolume: 'Spray volume',
    totalSpraySolution: 'Total spray solution',
    ppeNote: 'Always wear PPE (gloves, mask) when mixing and spraying. Do not exceed label-recommended concentration, and observe the pre-harvest interval for this product.',
    referenceProducts: 'Reference products',
    typicalConcentration: 'Typical concentration used per target',
    ppeNoteShort: 'Always wear protective equipment when mixing and spraying, and never exceed the label-recommended concentration or skip the pre-harvest interval.',

    cropNames: {
      rice: 'Rice', wheat: 'Wheat', maize: 'Maize', cotton: 'Cotton',
      sugarcane: 'Sugarcane', tomato: 'Tomato (vegetable)', gram: 'Gram (pulse)',
    },
    fertNames: {
      urea: 'Urea (46% N)', dap: 'DAP (18-46-0)', mop: 'MOP (60% K)',
    },
    pestNames: {
      aphid: 'Aphids / sucking pests', bollworm: 'Bollworm / caterpillar',
      blight: 'Fungal blight', weeds: 'Broadleaf weeds', stemBorer: 'Stem borer',
    },
    roleNames: {
      Farmer: 'Farmer', Student: 'Agriculture student',
      Agronomist: 'Agronomist / Advisor', Dealer: 'Input dealer',
    },
    diseaseText: {
      leaf_blight: {
        name: 'Leaf Blight',
        symptoms: 'Brown or grey lesions, often with concentric rings, spreading from leaf tips and edges.',
        note: 'No fertilizer change needed — treat with fungicide and remove infected leaves.',
      },
      powdery_mildew: {
        name: 'Powdery Mildew',
        symptoms: 'White or grey powdery coating on the leaf surface, usually starting on older leaves.',
        note: 'Avoid excess nitrogen — it encourages soft growth that mildew spreads on faster.',
      },
      aphid_infestation: {
        name: 'Aphid Infestation',
        symptoms: 'Curled, yellowing leaves with clusters of small insects and a sticky residue underneath.',
        note: 'No fertilizer change needed — treat with the recommended insecticide.',
      },
      nitrogen_deficiency: {
        name: 'Nitrogen Deficiency',
        symptoms: 'Even yellowing (chlorosis) starting on older, lower leaves, with a pale green overall canopy.',
        note: 'Apply Urea (46% N) at the recommended rate for your crop.',
      },
      potassium_deficiency: {
        name: 'Potassium Deficiency',
        symptoms: 'Yellow-brown scorching along leaf edges and tips, while the leaf centre stays green.',
        note: 'Apply MOP (60% K) at the recommended rate for your crop.',
      },
      healthy: {
        name: 'Healthy Leaf',
        symptoms: 'Uniform green colour, no spots, no curling or discolouration.',
        note: 'No treatment needed — continue your normal fertilizer schedule.',
      },
    },
  },

  ta: {
    appName: 'அக்ரிடோஸ்',
    tagline: 'உர மற்றும் பூச்சிக்கொல்லி அளவு கணிப்பான்',

    // Login
    loginTitle: 'உள்நுழையவும்',
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
    loginSubtitle: 'மீண்டும் வரவேற்கிறோம் — தொடர உங்கள் விவரங்களை உள்ளிடவும்.',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    signIn: 'உள்நுழையவும்',
    signingIn: 'உள்நுழைகிறது…',
    noAccount: 'கணக்கு இல்லையா?',
    registerLink: 'ஒன்றை உருவாக்கவும்',

    // Register
    registerTitle: 'உங்கள் கணக்கை உருவாக்கவும்',
    registerSubtitle: 'சரியான அளவுகளை கணக்கிட AgriDose-இல் சேரவும்.',
    fullName: 'முழு பெயர்',
    role: 'பணி',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    agreeText: 'மேலே உள்ள விவரங்கள் சரியானவை என உறுதிப்படுத்துகிறேன்.',
    createAccount: 'கணக்கை உருவாக்கு',
    creatingAccount: 'கணக்கு உருவாக்கப்படுகிறது…',
    haveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    loginLink: 'உள்நுழையவும்',

    // Dashboard nav
    fertilizerTab: 'உரம்',
    pesticideTab: 'பூச்சிக்கொல்லி',
    diseaseTab: 'இலை நோய் கண்டறிதல்',
    historyTab: 'வரலாறு',
    logout: 'வெளியேறு',

    // Fertilizer tab
    fertilizerHeading: 'உர அளவு கணிப்பான்',
    selectCrop: 'பயிரை தேர்ந்தெடுக்கவும்',
    selectFertilizer: 'உரத்தை தேர்ந்தெடுக்கவும்',
    landArea: 'நிலப்பரப்பு',
    unit: 'அலகு',
    acre: 'ஏக்கர்',
    hectare: 'ஹெக்டேர்',
    calculateDosage: 'அளவை கணக்கிடு',
    calculating: 'கணக்கிடுகிறது…',

    // Pesticide tab
    pesticideHeading: 'பூச்சிக்கொல்லி அளவு கணிப்பான்',
    selectTarget: 'இலக்கு பூச்சி / பிரச்சினையை தேர்ந்தெடுக்கவும்',

    // Disease tab
    diseaseHeading: 'இலை நோய் கண்டறிதல்',
    uploadPhoto: 'கேலரியிலிருந்து பதிவேற்று',
    takePhoto: 'புகைப்படம் எடு',
    analyze: 'இலையை பகுப்பாய்வு செய்',
    analyzing: 'பகுப்பாய்வு செய்கிறது…',
    suggestedFertilizer: 'பரிந்துரைக்கப்படும் உரம்',
    suggestedPesticide: 'பரிந்துரைக்கப்படும் பூச்சிக்கொல்லி',

    // History tab
    historyHeading: 'கணக்கீட்டு வரலாறு',
    clearHistory: 'வரலாற்றை அழி',
    noHistory: 'இன்னும் வரலாறு இல்லை — உங்கள் கணக்கீடுகள் இங்கே தோன்றும்.',

    // Assistant
    assistantTitle: 'அக்ரிடோஸிடம் கேளுங்கள்',
    assistantPlaceholder: 'உங்கள் கேள்வியை தட்டச்சு செய்யவும் அல்லது பேசவும்…',
    assistantListening: 'கேட்கிறது…',
    assistantSend: 'கேள்',
    assistantGreeting: 'வணக்கம்! உர அளவு, பூச்சிக்கொல்லி, அல்லது இலை நோய்கள் பற்றி என்னிடம் கேளுங்கள் — தமிழிலோ ஆங்கிலத்திலோ.',
    assistantNotSupported: 'இந்த browser-ல் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. நீங்கள் தட்டச்சு செய்யலாம்.',

    // Language switcher
    language: 'மொழி',

    // Card subtitles & misc
    fertilizerCardSub: 'பயிர் மற்றும் உரத்தை தேர்ந்தெடுத்து, நிலப்பரப்பை உள்ளிட்டு, மொத்த அளவை பெறவும்.',
    pesticideCardSub: 'இலக்கு பூச்சி/பிரச்சினை மற்றும் நிலப்பரப்பை தேர்ந்தெடுத்து, மொத்த பொருள் மற்றும் தெளிப்பு கரைசல் அளவை பெறவும்.',
    diseaseCardSub: 'பாதிக்கப்பட்ட இலையின் புகைப்படத்தை பதிவேற்றி, பரிந்துரைக்கப்படும் உரம் அல்லது பூச்சிக்கொல்லியை பெறவும்.',
    historyCardSub: 'உங்கள் கடைசி 25 கணக்கீடுகள், உங்கள் கணக்கில் சேமிக்கப்பட்டவை.',
    referenceDbHeading: 'நோய் தரவுத்தள குறிப்பு',
    referenceDbSub: 'இந்த டெமோ தற்போது கண்டறியக்கூடிய நோய்களின் புகைப்படங்கள் மற்றும் அறிகுறிகள்.',
    removeBtn: 'அகற்று',
    chooseImageError: 'ஒரு படக்கோப்பை தேர்ந்தெடுக்கவும் (JPG அல்லது PNG).',
    uploadFirstError: 'முதலில் ஒரு இலை புகைப்படத்தை பதிவேற்றவும்.',
    analyzeError: 'அந்த படத்தை பகுப்பாய்வு செய்ய முடியவில்லை. வேறு புகைப்படத்தை முயற்சிக்கவும்.',
    opensCamera: 'உங்கள் கேமராவை திறக்கும்',
    jpgOrPng: 'JPG அல்லது PNG',
    confidenceSuffix: 'நம்பகத்தன்மை · டெமோ ஹியூரிஸ்டிக்',
    demoHeuristicNote: 'இது ஒரு எளிய வண்ண அடிப்படையிலான டெமோ, பயிற்சி பெற்ற AI மாடல் அல்ல — இதன் முடிவை ஒரு ஆரம்ப யூகமாக மட்டுமே கருதவும், சிகிச்சை செய்வதற்கு முன் உள்ளூர் நிபுணரிடம் சரிபார்க்கவும்.',
    selectRolePlaceholder: 'பணியை தேர்ந்தெடுக்கவும்',
    leafScanPrefix: 'இலை பரிசோதனை —',
    calculatedLabel: 'கணக்கிடப்பட்டது ✓',
    kgTotal: 'கிலோ மொத்தம்',
    recommendedRate: 'பரிந்துரைக்கப்படும் அளவு',
    convertedArea: 'மாற்றப்பட்ட நிலப்பரப்பு',
    howCalculated: 'இது எப்படி கணக்கிடப்படுகிறது',
    referenceRates: 'குறிப்பு பயன்பாட்டு அளவுகள், ஏக்கருக்கு',
    totalFormulaNote: 'மொத்தம் = ஏக்கருக்கான அளவு × நிலப்பரப்பு. இவை பொதுவான டெமோ மதிப்புகள் — பயன்படுத்தும் முன் மண் பரிசோதனை அல்லது உள்ளூர் வேளாண் அலுவலகத்தில் உறுதிப்படுத்தவும்.',
    landAreaError: 'பூஜ்ஜியத்திற்கு மேல் ஒரு நிலப்பரப்பை உள்ளிடவும்.',
    calcError: 'அளவை கணக்கிட முடியவில்லை.',
    applicationType: 'பயன்பாட்டு வகை',
    granularSoil: 'குருணை, மண் பயன்பாடு',
    rateLabel: 'அளவு',
    granularNote: 'குருணை பொருட்கள் கையால் அல்லது கருவி மூலம் தூவப்படும் — tank கலவை தேவையில்லை. label அறிவுறுத்தல்படி ஈரமான மண்ணில் இடவும்.',
    concentration: 'செறிவு',
    sprayVolume: 'தெளிப்பு அளவு',
    totalSpraySolution: 'மொத்த தெளிப்பு கரைசல்',
    ppeNote: 'கலக்கும்போதும் தெளிக்கும்போதும் எப்போதும் பாதுகாப்பு உபகரணங்களை (கையுறை, முகக்கவசம்) அணியவும். label பரிந்துரைக்கும் செறிவை மீறாதீர்கள், மேலும் இந்த பொருளுக்கான அறுவடைக்கு முந்தைய காலஅவகாசத்தை கடைபிடிக்கவும்.',
    referenceProducts: 'குறிப்பு பொருட்கள்',
    typicalConcentration: 'ஒவ்வொரு இலக்குக்கும் பொதுவாக பயன்படுத்தப்படும் செறிவு',
    ppeNoteShort: 'கலக்கும்போதும் தெளிக்கும்போதும் எப்போதும் பாதுகாப்பு உபகரணங்களை அணியவும், மேலும் label பரிந்துரைக்கும் செறிவை மீறாமலும் அறுவடைக்கு முந்தைய காலஅவகாசத்தை தவிர்க்காமலும் இருக்கவும்.',

    cropNames: {
      rice: 'நெல்', wheat: 'கோதுமை', maize: 'சோளம்', cotton: 'பருத்தி',
      sugarcane: 'கரும்பு', tomato: 'தக்காளி', gram: 'கடலை',
    },
    fertNames: {
      urea: 'யூரியா (46% N)', dap: 'DAP (18-46-0)', mop: 'MOP (60% K)',
    },
    pestNames: {
      aphid: 'பேன் பூச்சி', bollworm: 'காய்ப்புழு',
      blight: 'பூஞ்சை நோய்', weeds: 'களைகள்', stemBorer: 'தண்டு துளைப்பான்',
    },
    roleNames: {
      Farmer: 'விவசாயி', Student: 'வேளாண் மாணவர்',
      Agronomist: 'வேளாண் நிபுணர் / ஆலோசகர்', Dealer: 'உள்ளீடு விற்பனையாளர்',
    },
    diseaseText: {
      leaf_blight: {
        name: 'இலை கருகல் நோய்',
        symptoms: 'பழுப்பு அல்லது சாம்பல் நிற புள்ளிகள், பெரும்பாலும் வட்ட வளையங்களுடன், இலையின் நுனி மற்றும் விளிம்பிலிருந்து பரவும்.',
        note: 'உரம் மாற்ற தேவையில்லை — பூஞ்சைக்கொல்லி பயன்படுத்தி பாதிக்கப்பட்ட இலைகளை அகற்றவும்.',
      },
      powdery_mildew: {
        name: 'பொடி பூஞ்சை நோய்',
        symptoms: 'இலையின் மேற்பரப்பில் வெள்ளை அல்லது சாம்பல் நிற பொடி போன்ற படலம், பொதுவாக பழைய இலைகளில் தொடங்கும்.',
        note: 'அதிக நைட்ரஜன் தவிர்க்கவும் — இது மென்மையான வளர்ச்சியை ஊக்குவித்து பூஞ்சை வேகமாக பரவ உதவும்.',
      },
      aphid_infestation: {
        name: 'பேன் பூச்சி தாக்குதல்',
        symptoms: 'சுருண்ட, மஞ்சள் நிற இலைகள், சிறு பூச்சிகளின் கூட்டங்களுடன் அடியில் ஒட்டும் திரவம்.',
        note: 'உரம் மாற்ற தேவையில்லை — பரிந்துரைக்கப்பட்ட பூச்சிக்கொல்லியை பயன்படுத்தவும்.',
      },
      nitrogen_deficiency: {
        name: 'நைட்ரஜன் குறைபாடு',
        symptoms: 'பழைய, கீழ் இலைகளில் தொடங்கி சீரான மஞ்சள் நிறமாதல், இலைகள் மொத்தமாக வெளிர் பச்சையாக காணப்படும்.',
        note: 'உங்கள் பயிருக்கு பரிந்துரைக்கப்பட்ட அளவில் யூரியா (46% N) இடவும்.',
      },
      potassium_deficiency: {
        name: 'பொட்டாசியம் குறைபாடு',
        symptoms: 'இலையின் விளிம்புகளிலும் நுனியிலும் மஞ்சள்-பழுப்பு நிற கருகல், இலையின் நடுப்பகுதி பச்சையாகவே இருக்கும்.',
        note: 'உங்கள் பயிருக்கு பரிந்துரைக்கப்பட்ட அளவில் MOP (60% K) இடவும்.',
      },
      healthy: {
        name: 'ஆரோக்கியமான இலை',
        symptoms: 'சீரான பச்சை நிறம், புள்ளிகள் இல்லை, சுருள் அல்லது நிற மாற்றம் இல்லை.',
        note: 'சிகிச்சை தேவையில்லை — உங்கள் வழக்கமான உர அட்டவணையை தொடரவும்.',
      },
    },
  },
};

export function t(lang, key) {
  return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
}

// Looks up a translated value from one of the nested maps above
// (cropNames, fertNames, pestNames, roleNames), falling back to the
// raw key itself (e.g. the English data key) if nothing is found.
export function tMap(lang, mapName, key) {
  const map = translations[lang]?.[mapName] || translations.en[mapName] || {};
  return map[key] || translations.en[mapName]?.[key] || key;
}

// Looks up translated disease name/symptoms/note by disease id.
export function tDisease(lang, diseaseId) {
  const map = translations[lang]?.diseaseText || {};
  return map[diseaseId] || translations.en.diseaseText[diseaseId] || null;
}

