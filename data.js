/* =========================================================================
   APNA LIBRARY — Seed Data (Multi-language)
   -------------------------------------------------------------------------
   Text fields ab {hg, en, hi, bn, mr} object hain — jo bhi language switcher
   mein select ho, wahi text dikhega. Agar kisi exam ka hi/bn/mr abhi khaali
   hai, to wo automatically English mein fallback ho jata hai (tf() function
   i18n.js mein) jab tak admin panel se translation add na ho.
   Phase 2 ke baad yehi shape ka data Supabase se aayega (supabase-schema.sql
   mein columns jsonb hain, isi structure ke liye).
   ========================================================================= */

const CATEGORIES = [
  { id: "defence", name: { hg:"Defence", en:"Defence", hi:"रक्षा", bn:"প্রতিরক্ষা", mr:"संरक्षण" }, icon: "🛡️", color: "#7A1F2B" },
  { id: "ssc", name: { hg:"SSC", en:"SSC", hi:"एसएससी", bn:"এসএসসি", mr:"एसएससी" }, icon: "🏢", color: "#1B3358" },
  { id: "banking", name: { hg:"Banking & Insurance", en:"Banking & Insurance", hi:"बैंकिंग और बीमा", bn:"ব্যাংকিং ও বীমা", mr:"बँकिंग आणि विमा" }, icon: "🏦", color: "#B8862E" },
  { id: "railway", name: { hg:"Railway", en:"Railway", hi:"रेलवे", bn:"রেলওয়ে", mr:"रेल्वे" }, icon: "🚆", color: "#1F7A54" },
  { id: "state", name: { hg:"State Exams", en:"State Exams", hi:"राज्य परीक्षाएं", bn:"রাজ্য পরীক্ষা", mr:"राज्य परीक्षा" }, icon: "🏛️", color: "#1B3358" },
  { id: "teaching", name: { hg:"Teaching", en:"Teaching", hi:"शिक्षण", bn:"শিক্ষকতা", mr:"अध्यापन" }, icon: "👨‍🏫", color: "#7A1F2B" },
  { id: "engineering", name: { hg:"Engineering & Technical", en:"Engineering & Technical", hi:"इंजीनियरिंग और तकनीकी", bn:"ইঞ্জিনিয়ারিং ও কারিগরি", mr:"अभियांत्रिकी आणि तांत्रिक" }, icon: "⚙️", color: "#1B3358" },
  { id: "medical", name: { hg:"Medical", en:"Medical", hi:"चिकित्सा", bn:"চিকিৎসা", mr:"वैद्यकीय" }, icon: "⚕️", color: "#7A1F2B" },
  { id: "school-entrance", name: { hg:"School Entrance", en:"School Entrance", hi:"स्कूल प्रवेश", bn:"স্কুল ভর্তি", mr:"शाळा प्रवेश" }, icon: "🎓", color: "#B8862E" },
  { id: "university", name: { hg:"University Entrance", en:"University Entrance", hi:"विश्वविद्यालय प्रवेश", bn:"বিশ্ববিদ্যালয় ভর্তি", mr:"विद्यापीठ प्रवेश" }, icon: "🏫", color: "#1B3358" },
  { id: "police", name: { hg:"Police & Paramilitary", en:"Police & Paramilitary", hi:"पुलिस और अर्धसैनिक बल", bn:"পুলিশ ও আধাসামরিক বাহিনী", mr:"पोलीस आणि निमलष्करी दल" }, icon: "👮", color: "#7A1F2B" }
];

const EXAMS = [
  {
    id: "nda",
    name: "NDA & NA",
    fullName: "National Defence Academy & Naval Academy Examination",
    category: "defence",
    trending: true,
    overview: {
      hg: "UPSC dwara saal mein do baar conducted, 12th pass candidates ke liye Army/Navy/Air Force mein entry ka gateway exam.",
      en: "Conducted twice a year by UPSC, this is the gateway exam for 12th-pass candidates to enter the Army, Navy, or Air Force.",
      hi: "यूपीएससी द्वारा साल में दो बार आयोजित, यह 12वीं पास अभ्यर्थियों के लिए सेना/नौसेना/वायुसेना में प्रवेश की मुख्य परीक्षा है।",
      bn: "ইউপিএসসি দ্বারা বছরে দুইবার পরিচালিত, এটি দ্বাদশ পাস প্রার্থীদের জন্য সেনা/নৌ/বিমান বাহিনীতে প্রবেশের প্রধান পরীক্ষা।",
      mr: "यूपीएससीद्वारे वर्षातून दोनदा घेतली जाणारी, ही १२वी उत्तीर्ण उमेदवारांसाठी सैन्य/नौदल/हवाई दलात प्रवेशाची मुख्य परीक्षा आहे."
    },
    eligibility: {
      hg: "Unmarried male/female, 12th pass (Physics & Maths for Air Force/Navy wings), age 16.5–19.5 years.",
      en: "Unmarried male/female, 12th pass (Physics & Maths required for Air Force/Navy wings), age 16.5–19.5 years.",
      hi: "अविवाहित पुरुष/महिला, 12वीं पास (एयरफोर्स/नेवी विंग के लिए भौतिकी और गणित अनिवार्य), आयु 16.5–19.5 वर्ष।",
      bn: "অবিবাহিত পুরুষ/মহিলা, দ্বাদশ পাস (এয়ারফোর্স/নেভি উইং-এর জন্য পদার্থবিজ্ঞান ও গণিত আবশ্যক), বয়স ১৬.৫–১৯.৫ বছর।",
      mr: "अविवाहित पुरुष/स्त्री, १२वी उत्तीर्ण (हवाई दल/नौदलासाठी भौतिकशास्त्र आणि गणित आवश्यक), वय १६.५–१९.५ वर्षे."
    },
    pattern: {
      hg: "Mathematics (300 marks) + General Ability Test (600 marks), dono objective type. Written qualify karne walon ka SSB interview hota hai.",
      en: "Mathematics (300 marks) + General Ability Test (600 marks), both objective type. Those who qualify the written exam undergo an SSB interview.",
      hi: "गणित (300 अंक) + सामान्य योग्यता परीक्षा (600 अंक), दोनों वस्तुनिष्ठ प्रकार की। लिखित परीक्षा पास करने वालों का एसएसबी इंटरव्यू होता है।",
      bn: "গণিত (৩০০ নম্বর) + সাধারণ যোগ্যতা পরীক্ষা (৬০০ নম্বর), দুটোই অবজেক্টিভ টাইপ। লিখিত পরীক্ষায় উত্তীর্ণদের এসএসবি ইন্টারভিউ হয়।",
      mr: "गणित (३०० गुण) + सामान्य क्षमता चाचणी (६०० गुण), दोन्ही वस्तुनिष्ठ प्रकारच्या. लेखी परीक्षा उत्तीर्ण झालेल्यांची एसएसबी मुलाखत होते."
    },
    officialWebsite: "https://upsc.gov.in",
    applyLink: "https://upsconline.nic.in",
    links: [
      { label: "NDA 1 2018 – GAT Paper", url: "https://upsc.gov.in/sites/default/files/NDA-I-18-GAT.pdf", type: "pyq", year: 2018, subject: "GAT", status: "verified" },
      { label: "NDA 2 2017 – GAT Paper", url: "https://upsc.gov.in/sites/default/files/QPaper_NDA_II_2017_GAT.pdf", type: "pyq", year: 2017, subject: "GAT", status: "verified" },
      { label: "Previous Question Papers (Official Archive)", url: "https://upsc.gov.in/examinations/previous-question-papers", type: "pyq-portal", status: "verified" },
      { label: "Answer Keys (Official)", url: "https://upsc.gov.in/examinations/answer-key", type: "answer-key", status: "verified" }
    ]
  },
  {
    id: "cds",
    name: "CDS",
    fullName: "Combined Defence Services Examination",
    category: "defence",
    trending: false,
    overview: {
      hg: "Graduates ke liye IMA, INA, AFA aur OTA mein entry ka UPSC exam, saal mein do baar hota hai.",
      en: "A UPSC exam for graduates to enter IMA, INA, AFA, and OTA, held twice a year."
    },
    eligibility: {
      hg: "Graduate (stream wing ke hisaab se), unmarried, age 19–25 years (wing ke hisaab se alag).",
      en: "Graduate (stream depends on the wing), unmarried, age 19–25 years (varies by wing)."
    },
    pattern: {
      hg: "English, General Knowledge, Elementary Mathematics — har paper 100 marks, objective type.",
      en: "English, General Knowledge, Elementary Mathematics — each paper 100 marks, objective type."
    },
    officialWebsite: "https://upsc.gov.in",
    applyLink: "https://upsconline.nic.in",
    links: [
      { label: "Previous Question Papers (Official Archive)", url: "https://upsc.gov.in/examinations/previous-question-papers?field_exam_name_value=Combined+Defence+Services", type: "pyq-portal", status: "verified" }
    ]
  },
  {
    id: "afcat",
    name: "AFCAT",
    fullName: "Air Force Common Admission Test",
    category: "defence",
    trending: false,
    overview: {
      hg: "Indian Air Force mein Flying aur Ground Duty branches ke liye graduate-level entry exam.",
      en: "A graduate-level entry exam for Flying and Ground Duty branches of the Indian Air Force."
    },
    eligibility: {
      hg: "Graduate, age 20–24 years (branch ke hisaab se relaxation).",
      en: "Graduate, age 20–24 years (relaxation depends on branch)."
    },
    pattern: {
      hg: "General Awareness, Verbal Ability, Numerical Ability, Reasoning & Military Aptitude — 100 questions, 300 marks.",
      en: "General Awareness, Verbal Ability, Numerical Ability, Reasoning & Military Aptitude — 100 questions, 300 marks."
    },
    officialWebsite: "https://afcat.cdac.in",
    applyLink: "https://afcat.cdac.in",
    links: [{ label: "Official AFCAT Portal", url: "https://afcat.cdac.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    fullName: "Staff Selection Commission — Combined Graduate Level",
    category: "ssc",
    trending: true,
    overview: {
      hg: "Central govt ministries/departments mein Group B & C graduate-level posts ke liye sabse bada SSC exam.",
      en: "The biggest SSC exam for graduate-level Group B & C posts in central government ministries/departments.",
      hi: "केंद्र सरकार के मंत्रालयों/विभागों में ग्रुप बी और सी स्नातक-स्तरीय पदों के लिए सबसे बड़ी एसएससी परीक्षा।",
      bn: "কেন্দ্রীয় সরকারের মন্ত্রণালয়/বিভাগে গ্রুপ বি ও সি স্নাতক-স্তরের পদের জন্য সবচেয়ে বড় এসএসসি পরীক্ষা।",
      mr: "केंद्र सरकारच्या मंत्रालये/विभागांमध्ये गट ब आणि क पदवीस्तरीय पदांसाठी सर्वात मोठी एसएससी परीक्षा."
    },
    eligibility: {
      hg: "Graduate in any discipline, age 18–32 years (post ke hisaab se alag).",
      en: "Graduate in any discipline, age 18–32 years (varies by post).",
      hi: "किसी भी विषय में स्नातक, आयु 18–32 वर्ष (पद के अनुसार अलग)।",
      bn: "যেকোনো বিষয়ে স্নাতক, বয়স ১৮–৩২ বছর (পদ অনুযায়ী ভিন্ন)।",
      mr: "कोणत्याही विषयात पदवीधर, वय १८–३२ वर्षे (पदानुसार वेगळे)."
    },
    pattern: {
      hg: "Tier 1 (Reasoning, GA, Quant, English) + Tier 2 (Quant, Reasoning & GA, English, Data Analytics) — dono CBT.",
      en: "Tier 1 (Reasoning, GA, Quant, English) + Tier 2 (Quant, Reasoning & GA, English, Data Analytics) — both CBT.",
      hi: "टियर 1 (रीज़निंग, सामान्य ज्ञान, क्वांट, अंग्रेज़ी) + टियर 2 (क्वांट, रीज़निंग व सामान्य ज्ञान, अंग्रेज़ी, डेटा एनालिटिक्स) — दोनों सीबीटी।",
      bn: "টায়ার ১ (রিজনিং, জিএ, কোয়ান্ট, ইংরেজি) + টায়ার ২ (কোয়ান্ট, রিজনিং ও জিএ, ইংরেজি, ডেটা অ্যানালিটিক্স) — দুটোই সিবিটি।",
      mr: "टियर १ (रिझनिंग, सामान्य ज्ञान, क्वांट, इंग्रजी) + टियर २ (क्वांट, रिझनिंग व सामान्य ज्ञान, इंग्रजी, डेटा अ‍ॅनालिटिक्स) — दोन्ही सीबीटी."
    },
    officialWebsite: "https://ssc.gov.in",
    applyLink: "https://ssc.gov.in",
    links: [
      { label: "Official SSC Portal — Question Papers (login required)", url: "https://ssc.gov.in", type: "pyq-portal", status: "portal", note: "SSC apne response-sheet/question-paper candidate login ke peeche rakhta hai — registration number se hi download hota hai." }
    ]
  },
  {
    id: "ssc-chsl",
    name: "SSC CHSL",
    fullName: "Combined Higher Secondary Level",
    category: "ssc",
    trending: false,
    overview: { hg: "12th pass ke liye LDC, JSA, DEO jaisi posts ke liye SSC exam.", en: "An SSC exam for 12th-pass candidates for posts like LDC, JSA, DEO." },
    eligibility: { hg: "12th pass, age 18–27 years.", en: "12th pass, age 18–27 years." },
    pattern: { hg: "Tier 1 (CBT) + Tier 2 (Descriptive) + Skill Test/Typing Test.", en: "Tier 1 (CBT) + Tier 2 (Descriptive) + Skill Test/Typing Test." },
    officialWebsite: "https://ssc.gov.in",
    applyLink: "https://ssc.gov.in",
    links: [{ label: "Official SSC Portal", url: "https://ssc.gov.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "ssc-gd",
    name: "SSC GD Constable",
    fullName: "General Duty Constable (BSF, CRPF, CISF, SSB, ITBP, AR, NCB)",
    category: "ssc",
    trending: true,
    overview: {
      hg: "Paramilitary forces mein Constable (GD) ke liye SSC dwara conducted exam.",
      en: "An exam conducted by SSC for the post of Constable (GD) in paramilitary forces.",
      hi: "अर्धसैनिक बलों में कांस्टेबल (जीडी) पद के लिए एसएससी द्वारा आयोजित परीक्षा।",
      bn: "আধাসামরিক বাহিনীতে কনস্টেবল (জিডি) পদের জন্য এসএসসি দ্বারা পরিচালিত পরীক্ষা।",
      mr: "निमलष्करी दलात कॉन्स्टेबल (जीडी) पदासाठी एसएससीद्वारे घेतली जाणारी परीक्षा."
    },
    eligibility: { hg: "10th pass, age 18–23 years.", en: "10th pass, age 18–23 years." },
    pattern: { hg: "CBT (Reasoning, GK, Maths, Hindi/English) + PET/PST + Medical.", en: "CBT (Reasoning, GK, Maths, Hindi/English) + PET/PST + Medical." },
    officialWebsite: "https://ssc.gov.in",
    applyLink: "https://ssc.gov.in",
    links: [{ label: "Official SSC Portal", url: "https://ssc.gov.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "ibps-po",
    name: "IBPS PO",
    fullName: "Institute of Banking Personnel Selection — Probationary Officer",
    category: "banking",
    trending: true,
    overview: { hg: "Public sector banks mein PO/Management Trainee ke liye common recruitment exam.", en: "A common recruitment exam for PO/Management Trainee posts in public sector banks." },
    eligibility: { hg: "Graduate, age 20–30 years.", en: "Graduate, age 20–30 years." },
    pattern: { hg: "Prelims + Mains + Interview.", en: "Prelims + Mains + Interview." },
    officialWebsite: "https://www.ibps.in",
    applyLink: "https://www.ibps.in",
    links: [{ label: "Official IBPS Portal", url: "https://www.ibps.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "sbi-po",
    name: "SBI PO",
    fullName: "State Bank of India — Probationary Officer",
    category: "banking",
    trending: false,
    overview: { hg: "SBI mein PO ke liye direct recruitment exam.", en: "A direct recruitment exam for PO posts in SBI." },
    eligibility: { hg: "Graduate, age 21–30 years.", en: "Graduate, age 21–30 years." },
    pattern: { hg: "Prelims + Mains + Group Exercise & Interview.", en: "Prelims + Mains + Group Exercise & Interview." },
    officialWebsite: "https://sbi.co.in/web/careers",
    applyLink: "https://sbi.co.in/web/careers",
    links: [{ label: "Official SBI Careers Portal", url: "https://sbi.co.in/web/careers", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "rbi-grade-b",
    name: "RBI Grade B",
    fullName: "Reserve Bank of India — Grade B Officer",
    category: "banking",
    trending: false,
    overview: { hg: "RBI mein Officer Grade B (General/DEPR/DSIM) ke liye exam.", en: "An exam for Officer Grade B (General/DEPR/DSIM) posts in RBI." },
    eligibility: { hg: "Graduate with min. 60% marks, age 21–30 years.", en: "Graduate with minimum 60% marks, age 21–30 years." },
    pattern: { hg: "Phase 1 + Phase 2 (Descriptive) + Interview.", en: "Phase 1 + Phase 2 (Descriptive) + Interview." },
    officialWebsite: "https://opportunities.rbi.org.in",
    applyLink: "https://opportunities.rbi.org.in",
    links: [{ label: "Official RBI Opportunities Portal", url: "https://opportunities.rbi.org.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "rrb-ntpc",
    name: "RRB NTPC",
    fullName: "Non-Technical Popular Categories",
    category: "railway",
    trending: true,
    overview: {
      hg: "Indian Railways mein Clerk, Goods Guard, Station Master jaisi non-technical posts ke liye exam.",
      en: "An exam for non-technical posts like Clerk, Goods Guard, and Station Master in Indian Railways.",
      hi: "भारतीय रेलवे में क्लर्क, गुड्स गार्ड, स्टेशन मास्टर जैसे गैर-तकनीकी पदों के लिए परीक्षा।",
      bn: "ভারতীয় রেলওয়েতে ক্লার্ক, গুডস গার্ড, স্টেশন মাস্টারের মতো নন-টেকনিক্যাল পদের জন্য পরীক্ষা।",
      mr: "भारतीय रेल्वेमध्ये क्लर्क, गुड्स गार्ड, स्टेशन मास्टर यांसारख्या बिगर-तांत्रिक पदांसाठी परीक्षा."
    },
    eligibility: { hg: "12th/Graduate (post ke hisaab se), age 18–33 years.", en: "12th/Graduate (depends on post), age 18–33 years." },
    pattern: { hg: "CBT 1 + CBT 2 + Typing/Skill Test + Document Verification.", en: "CBT 1 + CBT 2 + Typing/Skill Test + Document Verification." },
    officialWebsite: "https://indianrailways.gov.in",
    applyLink: "https://www.rrbapply.gov.in",
    links: [{ label: "Official Railway Recruitment Portal", url: "https://www.rrbapply.gov.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "rrb-group-d",
    name: "RRB Group D",
    fullName: "Railway Recruitment Board — Group D",
    category: "railway",
    trending: false,
    overview: { hg: "Track Maintainer, Helper, Assistant jaisi Level-1 posts ke liye Railway exam.", en: "A railway exam for Level-1 posts like Track Maintainer, Helper, and Assistant." },
    eligibility: { hg: "10th pass / ITI, age 18–33 years.", en: "10th pass / ITI, age 18–33 years." },
    pattern: { hg: "CBT + PET + Document Verification + Medical.", en: "CBT + PET + Document Verification + Medical." },
    officialWebsite: "https://indianrailways.gov.in",
    applyLink: "https://www.rrbapply.gov.in",
    links: [{ label: "Official Railway Recruitment Portal", url: "https://www.rrbapply.gov.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "ctet",
    name: "CTET",
    fullName: "Central Teacher Eligibility Test",
    category: "teaching",
    trending: true,
    overview: {
      hg: "Kendriya/Navodaya/private schools mein teacher banne ke liye CBSE dwara conducted eligibility test.",
      en: "An eligibility test conducted by CBSE to become a teacher in Kendriya/Navodaya/private schools.",
      hi: "केंद्रीय/नवोदय/निजी विद्यालयों में शिक्षक बनने के लिए सीबीएसई द्वारा आयोजित पात्रता परीक्षा।",
      bn: "কেন্দ্রীয়/নবোদয়/বেসরকারি স্কুলে শিক্ষক হওয়ার জন্য সিবিএসই দ্বারা পরিচালিত যোগ্যতা পরীক্ষা।",
      mr: "केंद्रीय/नवोदय/खासगी शाळांमध्ये शिक्षक होण्यासाठी सीबीएसईद्वारे घेतली जाणारी पात्रता परीक्षा."
    },
    eligibility: { hg: "D.El.Ed/B.Ed (Paper 1/2 ke hisaab se alag), koi upper age limit nahi.", en: "D.El.Ed/B.Ed (varies by Paper 1/2), no upper age limit." },
    pattern: { hg: "Paper 1 (Class 1–5) + Paper 2 (Class 6–8), dono objective type.", en: "Paper 1 (Class 1–5) + Paper 2 (Class 6–8), both objective type." },
    officialWebsite: "https://ctet.nic.in",
    applyLink: "https://ctet.nic.in",
    links: [{ label: "Official CTET Portal", url: "https://ctet.nic.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "uppsc",
    name: "UPPSC",
    fullName: "Uttar Pradesh Public Service Commission",
    category: "state",
    trending: false,
    overview: { hg: "UP state ke Group A & B gazetted/non-gazetted posts ke liye combined state exam.", en: "A combined state exam for Group A & B gazetted/non-gazetted posts in UP." },
    eligibility: { hg: "Graduate, age 21–40 years (category ke hisaab se relaxation).", en: "Graduate, age 21–40 years (relaxation by category)." },
    pattern: { hg: "Prelims (Objective) + Mains (Descriptive) + Interview.", en: "Prelims (Objective) + Mains (Descriptive) + Interview." },
    officialWebsite: "https://uppsc.up.nic.in",
    applyLink: "https://uppsc.up.nic.in",
    links: [{ label: "Official UPPSC Portal", url: "https://uppsc.up.nic.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "upsssc-pet",
    name: "UP PET",
    fullName: "Preliminary Eligibility Test (UPSSSC)",
    category: "state",
    trending: true,
    overview: {
      hg: "UP ke ज्यादातर Group C posts ke liye qualifying screening exam — PET score se aage ki bharti hoti hai.",
      en: "A qualifying screening exam for most Group C posts in UP — recruitment proceeds based on the PET score.",
      hi: "यूपी के अधिकांश ग्रुप सी पदों के लिए क्वालीफाइंग स्क्रीनिंग परीक्षा — पीईटी स्कोर के आधार पर आगे की भर्ती होती है।",
      bn: "ইউপি-র বেশিরভাগ গ্রুপ সি পদের জন্য কোয়ালিফাইং স্ক্রিনিং পরীক্ষা — পিইটি স্কোরের ভিত্তিতে নিয়োগ এগোয়।",
      mr: "यूपीमधील बहुतांश गट क पदांसाठी पात्रता चाळणी परीक्षा — पीईटी गुणांच्या आधारे पुढील भरती होते."
    },
    eligibility: { hg: "10th pass minimum, age 18–40 years.", en: "10th pass minimum, age 18–40 years." },
    pattern: { hg: "100 questions, General Knowledge/Science/Reasoning/Maths/Hindi/GK on UP.", en: "100 questions covering General Knowledge/Science/Reasoning/Maths/Hindi/GK on UP." },
    officialWebsite: "https://upsssc.gov.in",
    applyLink: "https://upsssc.gov.in",
    links: [{ label: "Official UPSSSC Portal", url: "https://upsssc.gov.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "neet",
    name: "NEET UG",
    fullName: "National Eligibility cum Entrance Test",
    category: "medical",
    trending: true,
    overview: {
      hg: "MBBS/BDS/AYUSH courses mein admission ke liye desh ka single medical entrance exam.",
      en: "India's single medical entrance exam for admission to MBBS/BDS/AYUSH courses.",
      hi: "एमबीबीएस/बीडीएस/आयुष पाठ्यक्रमों में प्रवेश के लिए देश की एकमात्र चिकित्सा प्रवेश परीक्षा।",
      bn: "এমবিবিএস/বিডিএস/আয়ুষ কোর্সে ভর্তির জন্য দেশের একমাত্র মেডিকেল প্রবেশিকা পরীক্ষা।",
      mr: "एमबीबीएस/बीडीएस/आयुष अभ्यासक्रमांच्या प्रवेशासाठी देशातील एकमेव वैद्यकीय प्रवेश परीक्षा."
    },
    eligibility: { hg: "12th with Physics, Chemistry, Biology, age 17+ years.", en: "12th with Physics, Chemistry, Biology, age 17+ years." },
    pattern: { hg: "180 MCQs, Physics + Chemistry + Biology (Botany & Zoology), 720 marks.", en: "180 MCQs, Physics + Chemistry + Biology (Botany & Zoology), 720 marks." },
    officialWebsite: "https://neet.nta.nic.in",
    applyLink: "https://neet.nta.nic.in",
    links: [{ label: "Official NEET (NTA) Portal", url: "https://neet.nta.nic.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "jee-main",
    name: "JEE Main",
    fullName: "Joint Entrance Examination — Main",
    category: "engineering",
    trending: true,
    overview: { hg: "NITs/IIITs mein admission aur JEE Advanced (IIT) ke liye qualifying entrance exam.", en: "A qualifying entrance exam for admission to NITs/IIITs and for JEE Advanced (IIT)." },
    eligibility: { hg: "12th with Physics, Chemistry, Maths.", en: "12th with Physics, Chemistry, Maths." },
    pattern: { hg: "Physics, Chemistry, Maths — MCQ + Numerical value questions.", en: "Physics, Chemistry, Maths — MCQ + Numerical value questions." },
    officialWebsite: "https://jeemain.nta.nic.in",
    applyLink: "https://jeemain.nta.nic.in",
    links: [{ label: "Official JEE Main (NTA) Portal", url: "https://jeemain.nta.nic.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "cuet-ug",
    name: "CUET UG",
    fullName: "Common University Entrance Test — Undergraduate",
    category: "university",
    trending: true,
    overview: { hg: "Central universities (DU, BHU, JNU, etc.) mein UG admission ke liye common entrance test.", en: "A common entrance test for UG admission to central universities (DU, BHU, JNU, etc.)." },
    eligibility: { hg: "12th pass any stream.", en: "12th pass, any stream." },
    pattern: { hg: "Language + Domain Subjects + General Test (university ki requirement ke hisaab se).", en: "Language + Domain Subjects + General Test (depends on university's requirement)." },
    officialWebsite: "https://cuet.nta.nic.in",
    applyLink: "https://cuet.nta.nic.in",
    links: [{ label: "Official CUET (NTA) Portal", url: "https://cuet.nta.nic.in", type: "pyq-portal", status: "portal" }]
  },
  {
    id: "delhi-police-constable",
    name: "Delhi Police Constable",
    fullName: "Delhi Police Constable Recruitment",
    category: "police",
    trending: false,
    overview: { hg: "SSC dwara conducted, Delhi Police mein Constable (Executive) posts ke liye.", en: "Conducted by SSC, for Constable (Executive) posts in Delhi Police." },
    eligibility: { hg: "12th pass, age 18–25 years.", en: "12th pass, age 18–25 years." },
    pattern: { hg: "CBT + PET/PST + Medical.", en: "CBT + PET/PST + Medical." },
    officialWebsite: "https://ssc.gov.in",
    applyLink: "https://ssc.gov.in",
    links: [{ label: "Official SSC Portal", url: "https://ssc.gov.in", type: "pyq-portal", status: "portal" }]
  }
];

/* Notifications — abhi seed/example data hai; admin panel se live updates aayenge */
const NOTIFICATIONS = [
  { examId: "upsssc-pet", title: "UP PET 2026 Notification", tag: "New", date: "2026-08-10" },
  { examId: "ssc-gd", title: "SSC GD Constable 2026 — Vacancy Increased", tag: "Update", date: "2026-08-08" },
  { examId: "rrb-ntpc", title: "RRB NTPC CBT 2 Admit Card Released", tag: "Admit Card", date: "2026-08-05" },
  { examId: "ctet", title: "CTET August 2026 Answer Key Released", tag: "Answer Key", date: "2026-08-02" },
  { examId: "nda", title: "NDA & NA (II) 2026 Application Started", tag: "Apply", date: "2026-07-28" }
];

/* Gallery — khaali structure, Admin Panel se images add hongi (Phase 2) */
const GALLERY = [];
