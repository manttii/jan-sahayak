export interface ServiceDefinition {
  id: string;
  emoji: string;
  hi: string;
  en: string;
  descHi: string;
  descEn: string;
  category: 'certificate' | 'revenue' | 'welfare' | 'license';
  days: number;
  fee: string;
  feeHi: string;
  departmentHi: string;
  departmentEn: string;
  requiredDocs: {
    id: string;
    hi: string;
    en: string;
    required: boolean;
    digilockerAvailable?: boolean;
  }[];
  customFields?: {
    name: string;
    labelHi: string;
    labelEn: string;
    type: 'text' | 'number' | 'select' | 'date';
    options?: { hi: string; en: string }[];
    placeholderHi?: string;
    placeholderEn?: string;
    required: boolean;
  }[];
}

export const ALL_SERVICES: ServiceDefinition[] = [
  {
    id: 'income',
    emoji: '📄',
    hi: 'आय प्रमाण पत्र',
    en: 'Income Certificate',
    descHi: 'स्कूल, कॉलेज, छात्रवृत्ति एवं सरकारी योजनाओं के लिए',
    descEn: 'For school, college, scholarship & government schemes',
    category: 'certificate',
    days: 7,
    fee: '₹30 (Free for BPL)',
    feeHi: '₹30 (बीपीएल हेतु निःशुल्क)',
    departmentHi: 'राजस्व विभाग, उत्तराखण्ड',
    departmentEn: 'Department of Revenue, Uttarakhand',
    requiredDocs: [
      { id: 'aadhar', hi: 'आधार कार्ड', en: 'Aadhaar Card', required: true, digilockerAvailable: true },
      { id: 'ration', hi: 'राशन कार्ड / परिवार रजिस्टर', en: 'Ration Card / Pariwar Register', required: true, digilockerAvailable: true },
      { id: 'salary_slip', hi: 'वेतन पर्ची / आय स्व-घोषणा', en: 'Salary Slip / Income Declaration', required: true, digilockerAvailable: false },
      { id: 'photo', hi: 'पासपोर्ट साइज फोटो', en: 'Passport Photo', required: true, digilockerAvailable: false },
    ],
    customFields: [
      {
        name: 'annualIncome',
        labelHi: 'वार्षिक पारिवारिक आय (₹)',
        labelEn: 'Annual Family Income (₹)',
        type: 'number',
        placeholderHi: 'जैसे: 120000',
        placeholderEn: 'e.g. 120000',
        required: true,
      },
      {
        name: 'incomeSource',
        labelHi: 'आय का मुख्य स्रोत',
        labelEn: 'Primary Source of Income',
        type: 'select',
        options: [
          { hi: 'कृषि (Agriculture)', en: 'Agriculture' },
          { hi: 'मजदूरी (Daily Wage / Labor)', en: 'Daily Wage' },
          { hi: 'निजी नौकरी (Private Job)', en: 'Private Sector' },
          { hi: 'व्यापार (Business / Shop)', en: 'Business' },
          { hi: 'सरकारी सेवा / पेंशन (Govt / Pension)', en: 'Govt Service / Pension' },
        ],
        required: true,
      },
      {
        name: 'purpose',
        labelHi: 'आवेदन का उद्देश्य',
        labelEn: 'Purpose of Certificate',
        type: 'select',
        options: [
          { hi: 'शैक्षणिक प्रवेश (School / College Admission)', en: 'Education Admission' },
          { hi: 'छात्रवृत्ति (Scholarship)', en: 'Scholarship' },
          { hi: 'सरकारी कल्याणकारी योजना (Govt Welfare Scheme)', en: 'Government Scheme' },
          { hi: 'बैंक लोन / सब्सिडी (Bank Loan / Subsidy)', en: 'Loan / Subsidy' },
          { hi: 'अन्य (Other)', en: 'Other' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 'domicile',
    emoji: '🏠',
    hi: 'स्थायी / मूल निवास प्रमाण पत्र',
    en: 'Domicile / Residence Certificate',
    descHi: 'उत्तराखण्ड में स्थायी निवास का कानूनी प्रमाण',
    descEn: 'Proof of permanent domicile & residence in Uttarakhand',
    category: 'certificate',
    days: 15,
    fee: '₹30',
    feeHi: '₹30',
    departmentHi: 'राजस्व विभाग, उत्तराखण्ड',
    departmentEn: 'Department of Revenue, Uttarakhand',
    requiredDocs: [
      { id: 'aadhar', hi: 'आधार कार्ड', en: 'Aadhaar Card', required: true, digilockerAvailable: true },
      { id: 'land_record', hi: 'खतौनी / बिजली बिल / पैतृक निवास प्रमाण', en: 'Land Record / Electricity Bill / Residence Proof', required: true, digilockerAvailable: true },
      { id: 'education_proof', hi: 'हाईस्कूल मार्कशीट (UK बोर्ड/मान्यता प्राप्त)', en: 'Class 10th Marksheet (UK Board)', required: true, digilockerAvailable: true },
      { id: 'photo', hi: 'पासपोर्ट फोटो', en: 'Passport Photo', required: true, digilockerAvailable: false },
    ],
    customFields: [
      {
        name: 'yearsInUk',
        labelHi: 'उत्तराखण्ड में निवास की अवधि (वर्ष)',
        labelEn: 'Duration of Stay in Uttarakhand (Years)',
        type: 'number',
        placeholderHi: 'जैसे: 15',
        placeholderEn: 'e.g. 15',
        required: true,
      },
      {
        name: 'ancestralVillage',
        labelHi: 'पैतृक गांव / कस्बा एवं पट्टी',
        labelEn: 'Ancestral Village / Town & Patti',
        type: 'text',
        placeholderHi: 'जैसे: पट्टी कफोलस्यूं, पौड़ी गढ़वाल',
        placeholderEn: 'e.g. Patti Kafolsyun, Pauri Garhwal',
        required: true,
      },
      {
        name: 'domicileType',
        labelHi: 'निवास का प्रकार',
        labelEn: 'Domicile Type',
        type: 'select',
        options: [
          { hi: 'पैतृक मूल निवासी (Ancestral Domicile)', en: 'Ancestral Domicile' },
          { hi: '15 वर्ष या अधिक स्थायी निवास (15+ Years Resident)', en: '15+ Years Resident' },
          { hi: 'राज्य कर्मचारी / आश्रित (State Govt Employee / Dependent)', en: 'State Govt Employee' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 'caste',
    emoji: '📋',
    hi: 'जाति प्रमाण पत्र (SC / ST / OBC / EWS)',
    en: 'Caste Certificate (SC/ST/OBC/EWS)',
    descHi: 'आरक्षण एवं सामाजिक कल्याण योजनाओं के लिए',
    descEn: 'For reservation benefits & affirmative action policies',
    category: 'certificate',
    days: 14,
    fee: '₹30 (Free for SC/ST)',
    feeHi: '₹30 (एससी/एसटी हेतु निःशुल्क)',
    departmentHi: 'समाज कल्याण एवं राजस्व विभाग',
    departmentEn: 'Social Welfare & Revenue Department',
    requiredDocs: [
      { id: 'aadhar', hi: 'आधार कार्ड', en: 'Aadhaar Card', required: true, digilockerAvailable: true },
      { id: 'ancestral_caste', hi: 'पिता / पूर्वज का जाति प्रमाण पत्र या खतौनी', en: 'Father/Ancestor Caste Record or Land Registry', required: true, digilockerAvailable: false },
      { id: 'pariwar_register', hi: 'परिवार रजिस्टर नकल', en: 'Pariwar Register Copy', required: true, digilockerAvailable: true },
      { id: 'photo', hi: 'पासपोर्ट फोटो', en: 'Passport Photo', required: true, digilockerAvailable: false },
    ],
    customFields: [
      {
        name: 'category',
        labelHi: 'श्रेणी (Category)',
        labelEn: 'Category',
        type: 'select',
        options: [
          { hi: 'अनुसूचित जाति (SC)', en: 'Scheduled Caste (SC)' },
          { hi: 'अनुसूचित जनजाति (ST)', en: 'Scheduled Tribe (ST)' },
          { hi: 'अन्य पिछड़ा वर्ग (OBC - Non-Creamy Layer)', en: 'Other Backward Class (OBC)' },
          { hi: 'आर्थिक रूप से कमजोर वर्ग (EWS)', en: 'Economically Weaker Section (EWS)' },
        ],
        required: true,
      },
      {
        name: 'subCaste',
        labelHi: 'उपजाति / मूल जाति (Sub-Caste)',
        labelEn: 'Sub-Caste / Clan',
        type: 'text',
        placeholderHi: 'जैसे: शिल्पकर्म, थारू, जौनसारी, आदि',
        placeholderEn: 'e.g. Shilpkar, Tharu, Jaunsari, etc.',
        required: true,
      },
    ],
  },
  {
    id: 'birth',
    emoji: '👶',
    hi: 'जन्म प्रमाण पत्र',
    en: 'Birth Certificate',
    descHi: 'आधिकारिक जन्म पंजीकरण एवं जन्म प्रमाण पत्र',
    descEn: 'Official registration of birth & certificate issuance',
    category: 'certificate',
    days: 7,
    fee: 'Free within 21 days (₹20 late fee)',
    feeHi: '21 दिन के भीतर निःशुल्क (देरी पर ₹20)',
    departmentHi: 'चिकित्सा स्वास्थ्य एवं पंचायती राज विभाग',
    departmentEn: 'Health & Panchayati Raj Department',
    requiredDocs: [
      { id: 'hospital_slip', hi: 'अस्पताल जन्म डिस्चार्ज स्लिप / एएनएम रिपोर्ट', en: 'Hospital Birth Slip / ANM Report', required: true, digilockerAvailable: false },
      { id: 'parent_aadhar', hi: 'माता एवं पिता का आधार कार्ड', en: 'Mother & Father Aadhaar', required: true, digilockerAvailable: true },
      { id: 'marriage_cert', hi: 'माता-पिता का विवाह प्रमाण (यदि उपलब्ध)', en: 'Parent Marriage Proof (if available)', required: false, digilockerAvailable: true },
    ],
    customFields: [
      {
        name: 'childName',
        labelHi: 'बच्चे का पूरा नाम',
        labelEn: 'Child Full Name',
        type: 'text',
        placeholderHi: 'जैसे: आरव शर्मा',
        placeholderEn: 'e.g. Aarav Sharma',
        required: true,
      },
      {
        name: 'gender',
        labelHi: 'लिंग (Gender)',
        labelEn: 'Gender',
        type: 'select',
        options: [
          { hi: 'बालक (Male)', en: 'Male' },
          { hi: 'बालिका (Female)', en: 'Female' },
          { hi: 'अन्य (Other)', en: 'Other' },
        ],
        required: true,
      },
      {
        name: 'birthPlace',
        labelHi: 'जन्म स्थान (अस्पताल / घर का पता)',
        labelEn: 'Place of Birth (Hospital / Home Address)',
        type: 'text',
        placeholderHi: 'जैसे: दून मेडिकल कॉलेज, देहरादून',
        placeholderEn: 'e.g. Doon Medical College, Dehradun',
        required: true,
      },
    ],
  },
  {
    id: 'character',
    emoji: '✅',
    hi: 'चरित्र प्रमाण पत्र',
    en: 'Character Certificate',
    descHi: 'सरकारी नौकरी, ठेकेदारी, कॉलेज प्रवेश एवं सत्यापन के लिए',
    descEn: 'For govt employment, contracts, college admission & verification',
    category: 'certificate',
    days: 10,
    fee: '₹50',
    feeHi: '₹50',
    departmentHi: 'उत्तराखण्ड पुलिस एवं गृह विभाग',
    departmentEn: 'Uttarakhand Police & Home Department',
    requiredDocs: [
      { id: 'aadhar', hi: 'आधार कार्ड', en: 'Aadhaar Card', required: true, digilockerAvailable: true },
      { id: 'residence_proof', hi: 'निवास प्रमाण पत्र / मतदाता पहचान', en: 'Domicile / Voter ID Card', required: true, digilockerAvailable: true },
      { id: 'affidavit', hi: 'स्व-घोषणा आपराधिक रिकॉर्ड शून्य शपथ पत्र', en: 'No Criminal Record Affidavit', required: true, digilockerAvailable: false },
      { id: 'photo', hi: 'पासपोर्ट फोटो', en: 'Passport Photo', required: true, digilockerAvailable: false },
    ],
    customFields: [
      {
        name: 'policeStation',
        labelHi: 'संबंधित थाना / कोतवाली',
        labelEn: 'Local Police Station / Kotwali',
        type: 'text',
        placeholderHi: 'जैसे: कोतवाली नगर, देहरादून',
        placeholderEn: 'e.g. Kotwali Nagar, Dehradun',
        required: true,
      },
      {
        name: 'employmentRef',
        labelHi: 'सत्यापन का प्रयोजन',
        labelEn: 'Purpose of Verification',
        type: 'select',
        options: [
          { hi: 'सरकारी / अर्द्ध-सरकारी सेवा (Govt Job)', en: 'Govt Employment' },
          { hi: 'सरकारी ठेकेदारी / निविदा (Govt Contract)', en: 'Govt Contractor' },
          { hi: 'विदेश यात्रा / पासपोर्ट (Passport / Visa)', en: 'Passport / Travel' },
          { hi: 'शस्त्र लाइसेंस (Arms License)', en: 'Arms License' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 'marriage',
    emoji: '💍',
    hi: 'विवाह पंजीकरण प्रमाण पत्र',
    en: 'Marriage Registration Certificate',
    descHi: 'विवाह का कानूनी पंजीकरण एवं संयुक्त प्रमाण पत्र',
    descEn: 'Legal marriage registration and official certificate',
    category: 'certificate',
    days: 15,
    fee: '₹100',
    feeHi: '₹100',
    departmentHi: 'पंजीकरण एवं स्टाम्प विभाग',
    departmentEn: 'Registration and Stamps Department',
    requiredDocs: [
      { id: 'couple_aadhar', hi: 'वर एवं वधू दोनों का आधार कार्ड', en: 'Aadhaar of both Bride & Groom', required: true, digilockerAvailable: true },
      { id: 'wedding_card', hi: 'विवाह निमंत्रण पत्र / निकाहनामा / शपथ पत्र', en: 'Wedding Invitation Card / Affidavit', required: true, digilockerAvailable: false },
      { id: 'joint_photo', hi: 'वर-वधू की संयुक्त फोटो', en: 'Joint Couple Photograph', required: true, digilockerAvailable: false },
      { id: 'witness_ids', hi: 'दो गवाहों के पहचान पत्र', en: 'ID Proof of 2 Witnesses', required: true, digilockerAvailable: true },
    ],
    customFields: [
      {
        name: 'marriageDate',
        labelHi: 'विवाह की तिथि',
        labelEn: 'Date of Marriage',
        type: 'date',
        required: true,
      },
      {
        name: 'spouseName',
        labelHi: 'जीवनसाथी का नाम (Spouse Name)',
        labelEn: 'Full Name of Spouse',
        type: 'text',
        placeholderHi: 'जैसे: सुनीता देवी',
        placeholderEn: 'e.g. Sunita Devi',
        required: true,
      },
      {
        name: 'marriagePlace',
        labelHi: 'विवाह संपन्न होने का स्थान',
        labelEn: 'Place / Venue of Marriage',
        type: 'text',
        placeholderHi: 'जैसे: ऋषिकेश, देहरादून',
        placeholderEn: 'e.g. Rishikesh, Dehradun',
        required: true,
      },
    ],
  },
  {
    id: 'hilly',
    emoji: '⛰',
    hi: 'पर्वतीय क्षेत्र प्रमाण पत्र (Hill Certificate)',
    en: 'Hilly Area Certificate (Hill Certificate)',
    descHi: 'सेना, अर्धसैनिक बलों एवं नौकरियों में शारीरिक माप/छूट हेतु',
    descEn: 'For physical standard concessions in Army, Police & Jobs',
    category: 'certificate',
    days: 7,
    fee: '₹30',
    feeHi: '₹30',
    departmentHi: 'राजस्व विभाग, उत्तराखण्ड',
    departmentEn: 'Department of Revenue, Uttarakhand',
    requiredDocs: [
      { id: 'aadhar', hi: 'आधार कार्ड', en: 'Aadhaar Card', required: true, digilockerAvailable: true },
      { id: 'domicile', hi: 'स्थायी निवास प्रमाण पत्र', en: 'Uttarakhand Domicile Certificate', required: true, digilockerAvailable: true },
      { id: 'patwari_report', hi: 'पटवारी पर्वतीय क्षेत्र आख्या / खतौनी', en: 'Patwari Hilly Locus Report / Land Record', required: true, digilockerAvailable: false },
      { id: 'photo', hi: 'पासपोर्ट फोटो', en: 'Passport Photo', required: true, digilockerAvailable: false },
    ],
    customFields: [
      {
        name: 'altitudeTehsil',
        labelHi: 'पर्वतीय तहसील एवं जिला',
        labelEn: 'Hilly Tehsil and District',
        type: 'text',
        placeholderHi: 'जैसे: थलीसैंण, पौड़ी गढ़वाल',
        placeholderEn: 'e.g. Thalisain, Pauri Garhwal',
        required: true,
      },
    ],
  },
  {
    id: 'pariwar',
    emoji: '👨‍👩‍👧‍👦',
    hi: 'परिवार रजिस्टर की नकल',
    en: 'Pariwar Register Copy',
    descHi: 'ग्राम पंचायत परिवार रजिस्टर की आधिकारिक प्रतिलिपि',
    descEn: 'Official certified copy of Gram Panchayat family register',
    category: 'revenue',
    days: 3,
    fee: '₹15',
    feeHi: '₹15',
    departmentHi: 'पंचायती राज विभाग, उत्तराखण्ड',
    departmentEn: 'Panchayati Raj Department, Uttarakhand',
    requiredDocs: [
      { id: 'aadhar', hi: 'मुखिया का आधार कार्ड', en: 'Head of Family Aadhaar', required: true, digilockerAvailable: true },
      { id: 'old_pariwar', hi: 'पुराना राशन कार्ड या परिवार विवरण', en: 'Old Ration Card or Family Slips', required: false, digilockerAvailable: true },
    ],
    customFields: [
      {
        name: 'gramPanchayat',
        labelHi: 'ग्राम पंचायत एवं विकासखण्ड (Block)',
        labelEn: 'Gram Panchayat & Development Block',
        type: 'text',
        placeholderHi: 'जैसे: ग्राम पंचायत भिकियासैंण, अल्मोड़ा',
        placeholderEn: 'e.g. Gram Panchayat Bhikiyasain, Almora',
        required: true,
      },
    ],
  },
  {
    id: 'disability',
    emoji: '♿',
    hi: 'दिव्यांगता प्रमाण पत्र (UDID / Disability)',
    en: 'Disability Certificate (UDID Verification)',
    descHi: 'दिव्यांग पेंशन, निशुल्क बस पास एवं उपकरण सहायता हेतु',
    descEn: 'For disability pension, free bus pass & assistive devices',
    category: 'welfare',
    days: 20,
    fee: 'Free (निःशुल्क)',
    feeHi: 'निःशुल्क (Free)',
    departmentHi: 'समाज कल्याण एवं स्वास्थ्य विभाग',
    departmentEn: 'Social Welfare & Health Department',
    requiredDocs: [
      { id: 'aadhar', hi: 'आधार कार्ड', en: 'Aadhaar Card', required: true, digilockerAvailable: true },
      { id: 'medical_board', hi: 'सीएमओ मेडिकल बोर्ड जांच रिपोर्ट', en: 'CMO Medical Board Disability Evaluation', required: true, digilockerAvailable: false },
      { id: 'photo', hi: 'दिव्यांगता दर्शाती पूर्ण फोटो', en: 'Full Posture Photograph Showing Disability', required: true, digilockerAvailable: false },
    ],
    customFields: [
      {
        name: 'disabilityType',
        labelHi: 'दिव्यांगता का प्रकार',
        labelEn: 'Type of Disability',
        type: 'select',
        options: [
          { hi: 'अस्थि दिव्यांगता (Locomotor)', en: 'Locomotor Disability' },
          { hi: 'दृष्टि बाधित (Visual Impairment)', en: 'Visual Impairment' },
          { hi: 'श्रवण बाधित (Hearing Impairment)', en: 'Hearing Impairment' },
          { hi: 'मानसिक / बौद्धिक (Intellectual / Mental)', en: 'Intellectual / Mental' },
          { hi: 'बहु-दिव्यांगता (Multiple Disabilities)', en: 'Multiple Disabilities' },
        ],
        required: true,
      },
      {
        name: 'percentage',
        labelHi: 'अनुमानित दिव्यांगता प्रतिशत (%)',
        labelEn: 'Estimated Disability Percentage (%)',
        type: 'number',
        placeholderHi: 'जैसे: 45',
        placeholderEn: 'e.g. 45',
        required: true,
      },
    ],
  },
  {
    id: 'death',
    emoji: '🕊',
    hi: 'मृत्यु प्रमाण पत्र',
    en: 'Death Certificate',
    descHi: 'आधिकारिक मृत्यु पंजीकरण एवं उत्तराधिकार हेतु',
    descEn: 'Official death record for legal inheritance & pensions',
    category: 'certificate',
    days: 7,
    fee: 'Free within 21 days (₹20 late fee)',
    feeHi: '21 दिन तक निःशुल्क (देरी पर ₹20)',
    departmentHi: 'चिकित्सा स्वास्थ्य एवं नगर निकाय/पंचायत',
    departmentEn: 'Health & Urban Local Bodies / Panchayat',
    requiredDocs: [
      { id: 'cremation_slip', hi: 'शवदाह / दफन रसीद या अस्पताल मृत्यु रिपोर्ट', en: 'Cremation / Burial Slip or Hospital Death Summary', required: true, digilockerAvailable: false },
      { id: 'deceased_aadhar', hi: 'मृतक का आधार कार्ड', en: 'Deceased Aadhaar Card', required: true, digilockerAvailable: true },
      { id: 'applicant_aadhar', hi: 'आवेदक/उत्तराधिकारी का आधार कार्ड', en: 'Applicant/Nominee Aadhaar', required: true, digilockerAvailable: true },
    ],
    customFields: [
      {
        name: 'deceasedName',
        labelHi: 'मृतक का पूरा नाम',
        labelEn: 'Full Name of Deceased',
        type: 'text',
        placeholderHi: 'जैसे: स्व. गोविंद बल्लभ',
        placeholderEn: 'e.g. Late Govind Ballabh',
        required: true,
      },
      {
        name: 'deathDate',
        labelHi: 'मृत्यु की तिथि',
        labelEn: 'Date of Death',
        type: 'date',
        required: true,
      },
    ],
  },
  {
    id: 'ration',
    emoji: '🌾',
    hi: 'नया राशन कार्ड / सदस्य जोड़ना',
    en: 'Ration Card (New / Member Addition)',
    descHi: 'खाद्य सुरक्षा, अंत्योदय एवं रियायती राशन आपूर्ति हेतु',
    descEn: 'For food security, NFSA, Antyodaya & subsidized ration',
    category: 'welfare',
    days: 30,
    fee: '₹20',
    feeHi: '₹20',
    departmentHi: 'खाद्य एवं नागरिक आपूर्ति विभाग',
    departmentEn: 'Food and Civil Supplies Department',
    requiredDocs: [
      { id: 'family_aadhar', hi: 'परिवार के सभी सदस्यों के आधार कार्ड', en: 'Aadhaar of all family members', required: true, digilockerAvailable: true },
      { id: 'income_cert', hi: 'आय प्रमाण पत्र / BPL सर्वे पर्ची', en: 'Income Certificate / BPL Slip', required: true, digilockerAvailable: true },
      { id: 'electricity_bill', hi: 'बिजली का बिल / गैस कनेक्शन बुक', en: 'Electricity Bill / LPG Gas Connection Book', required: true, digilockerAvailable: false },
      { id: 'head_photo', hi: 'महिला मुखिया की पासपोर्ट फोटो', en: 'Female Head of Family Photo', required: true, digilockerAvailable: false },
    ],
    customFields: [
      {
        name: 'familyMembersCount',
        labelHi: 'परिवार के कुल सदस्यों की संख्या',
        labelEn: 'Total Number of Family Members',
        type: 'number',
        placeholderHi: 'जैसे: 4',
        placeholderEn: 'e.g. 4',
        required: true,
      },
      {
        name: 'cardType',
        labelHi: 'अपेक्षित राशन कार्ड श्रेणी',
        labelEn: 'Desired Ration Card Category',
        type: 'select',
        options: [
          { hi: 'सफेद (APL - सामान्य)', en: 'White (APL - Above Poverty Line)' },
          { hi: 'पीला (NFSA - प्राथमिक परिवार)', en: 'Yellow (NFSA - Priority Household)' },
          { hi: 'गुलाबी (AAY - अंत्योदय अन्न योजना)', en: 'Pink (Antyodaya Anna Yojana)' },
        ],
        required: true,
      },
    ],
  },
];

export interface StoredApplication {
  id: string;
  serviceId: string;
  serviceNameHi: string;
  serviceNameEn: string;
  applicantName: string;
  mobile: string;
  district: string;
  tehsil: string;
  appliedDate: string;
  estimatedDate: string;
  status: 'submitted' | 'scrutiny' | 'field_inquiry' | 'approved' | 'rejected';
  statusLabelHi: string;
  statusLabelEn: string;
  stages: {
    titleHi: string;
    titleEn: string;
    officerHi: string;
    officerEn: string;
    date: string;
    done: boolean;
    active: boolean;
  }[];
  certificateDetails?: {
    certNo: string;
    issuedByHi: string;
    issuedByEn: string;
    sealUrl?: string;
  };
}

export const UTTARAKHAND_DISTRICTS = [
  'Almora (अल्मोड़ा)',
  'Bageshwar (बागेश्वर)',
  'Chamoli (चमोली)',
  'Champawat (चंपावत)',
  'Dehradun (देहरादून)',
  'Haridwar (हरिद्वार)',
  'Nainital (नैनीताल)',
  'Pauri Garhwal (पौड़ी गढ़वाल)',
  'Pithoragarh (पिथौरागढ़)',
  'Rudraprayag (रुद्रप्रयाग)',
  'Tehri Garhwal (टिहरी गढ़वाल)',
  'Udham Singh Nagar (उधम सिंह नगर)',
  'Uttarkashi (उत्तरकाशी)',
];

export const DEMO_APPLICATIONS: StoredApplication[] = [
  {
    id: 'UK-INC-2026-48291',
    serviceId: 'income',
    serviceNameHi: 'आय प्रमाण पत्र',
    serviceNameEn: 'Income Certificate',
    applicantName: 'राम कुमार शर्मा (Ram Kumar Sharma)',
    mobile: '9876543210',
    district: 'Dehradun (देहरादून)',
    tehsil: 'देहरादून सदर',
    appliedDate: '18 Oct 2026',
    estimatedDate: '25 Oct 2026',
    status: 'field_inquiry',
    statusLabelHi: 'तहसीलदार समीक्षा / जांच प्रगति पर',
    statusLabelEn: 'Tehsildar Review & Field Inquiry in Progress',
    stages: [
      {
        titleHi: 'आवेदन सीएससी/पोर्टल पर दर्ज',
        titleEn: 'Application Submitted Online',
        officerHi: 'सीएससी / स्व-सेवा पोर्टल',
        officerEn: 'CSC / Self Portal',
        date: '18 Oct, 10:30 AM',
        done: true,
        active: false,
      },
      {
        titleHi: 'दस्तावेज़ प्रारंभिक सत्यापन',
        titleEn: 'Document Scrutiny Verified',
        officerHi: 'तहसील लिपिक (Clerk)',
        officerEn: 'Tehsil Scrutiny Clerk',
        date: '19 Oct, 02:15 PM',
        done: true,
        active: false,
      },
      {
        titleHi: 'पटवारी / लेखपाल स्थलीय जांच',
        titleEn: 'Patwari Field Verification',
        officerHi: 'क्षेत्रीय लेखपाल, पट्टी रायपुर',
        officerEn: 'Area Lekhpal, Raipur',
        date: '21 Oct, 11:45 AM',
        done: true,
        active: false,
      },
      {
        titleHi: 'तहसीलदार स्वीकृति एवं डिजिटल हस्ताक्षर',
        titleEn: 'Tehsildar Approval & Sign',
        officerHi: 'तहसीलदार, देहरादून',
        officerEn: 'Tehsildar, Dehradun',
        date: 'प्रक्रियाधीन (Expected by 24 Oct)',
        done: false,
        active: true,
      },
      {
        titleHi: 'डिजिटल प्रमाण पत्र जारी',
        titleEn: 'Digital Certificate Issued',
        officerHi: 'अपणी सरकार पोर्टल सर्वर',
        officerEn: 'Apuni Sarkar Automated Signer',
        date: 'लंबित (Pending)',
        done: false,
        active: false,
      },
    ],
  },
  {
    id: 'UK-DOM-2026-31942',
    serviceId: 'domicile',
    serviceNameHi: 'स्थायी निवास प्रमाण पत्र',
    serviceNameEn: 'Domicile Certificate',
    applicantName: 'प्रियंका रावत (Priyanka Rawat)',
    mobile: '9876543210',
    district: 'Pauri Garhwal (पौड़ी गढ़वाल)',
    tehsil: 'श्रीनगर गढ़वाल',
    appliedDate: '10 Oct 2026',
    estimatedDate: '25 Oct 2026',
    status: 'approved',
    statusLabelHi: 'स्वीकृत एवं डिजिटल हस्ताक्षरित ✅',
    statusLabelEn: 'Approved & Digitally Issued ✅',
    stages: [
      {
        titleHi: 'आवेदन दर्ज',
        titleEn: 'Application Filed',
        officerHi: 'पोर्टल',
        officerEn: 'Portal',
        date: '10 Oct, 09:12 AM',
        done: true,
        active: false,
      },
      {
        titleHi: 'खतौनी एवं निवास सत्यापन',
        titleEn: 'Land Record & Stay Verified',
        officerHi: 'राजस्व उप-निरीक्षक',
        officerEn: 'Revenue Sub-Inspector',
        date: '12 Oct, 03:30 PM',
        done: true,
        active: false,
      },
      {
        titleHi: 'नायब तहसीलदार संस्तुति',
        titleEn: 'Nayab Tehsildar Endorsement',
        officerHi: 'नायब तहसीलदार, श्रीनगर',
        officerEn: 'Nayab Tehsildar, Srinagar',
        date: '15 Oct, 01:20 PM',
        done: true,
        active: false,
      },
      {
        titleHi: 'उप-जिलाधिकारी (SDM) अनुमोदन',
        titleEn: 'SDM Final Approval',
        officerHi: 'एसडीएम श्रीनगर, गढ़वाल',
        officerEn: 'SDM Srinagar, Garhwal',
        date: '18 Oct, 04:50 PM',
        done: true,
        active: false,
      },
      {
        titleHi: 'डिजिटल प्रमाण पत्र जारी (डाउनलोड हेतु उपलब्ध)',
        titleEn: 'Certificate Issued & Ready to Download',
        officerHi: 'डिजिटल हस्ताक्षर सर्वर',
        officerEn: 'NIC Digital Signer',
        date: '19 Oct, 10:00 AM',
        done: true,
        active: false,
      },
    ],
    certificateDetails: {
      certNo: 'UK-DOM-2026-31942-CERT',
      issuedByHi: 'कार्यालय उप-जिलाधिकारी, श्रीनगर (गढ़वाल), उत्तराखण्ड शासन',
      issuedByEn: 'Office of Sub-Divisional Magistrate, Srinagar (Garhwal), Govt of Uttarakhand',
    },
  },
  {
    id: 'UK-CST-2026-87114',
    serviceId: 'caste',
    serviceNameHi: 'जाति प्रमाण पत्र (SC)',
    serviceNameEn: 'Caste Certificate (SC)',
    applicantName: 'सुमित कुमार (Sumit Kumar)',
    mobile: '9812345678',
    district: 'Haridwar (हरिद्वार)',
    tehsil: 'रुड़की',
    appliedDate: '12 Oct 2026',
    estimatedDate: '26 Oct 2026',
    status: 'scrutiny',
    statusLabelHi: 'दस्तावेज़ सत्यापन जारी',
    statusLabelEn: 'Document Verification in Progress',
    stages: [
      {
        titleHi: 'आवेदन दर्ज',
        titleEn: 'Application Submitted',
        officerHi: 'सीएससी',
        officerEn: 'CSC',
        date: '12 Oct, 11:00 AM',
        done: true,
        active: false,
      },
      {
        titleHi: 'जाति अभिलेख मिलान',
        titleEn: 'Caste Archive Record Cross-Check',
        officerHi: 'प्रभारी समाज कल्याण, रुड़की',
        officerEn: 'Social Welfare Officer, Roorkee',
        date: '16 Oct, 11:30 AM',
        done: true,
        active: false,
      },
      {
        titleHi: 'तहसीलदार संस्तुति',
        titleEn: 'Tehsildar Endorsement',
        officerHi: 'तहसीलदार, रुड़की',
        officerEn: 'Tehsildar, Roorkee',
        date: 'प्रक्रियाधीन',
        done: false,
        active: true,
      },
      {
        titleHi: 'स्वीकृति',
        titleEn: 'Approval',
        officerHi: 'सक्षम प्राधिकारी',
        officerEn: 'Competent Authority',
        date: 'लंबित',
        done: false,
        active: false,
      },
      {
        titleHi: 'प्रमाण पत्र जारी',
        titleEn: 'Certificate Issued',
        officerHi: 'पोर्टल',
        officerEn: 'Portal',
        date: 'लंबित',
        done: false,
        active: false,
      },
    ],
  },
];
