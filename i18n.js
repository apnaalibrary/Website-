/* =========================================================================
   APNA LIBRARY — i18n Engine (5 Languages)
   -------------------------------------------------------------------------
   Languages: hg (Hinglish - default/original voice), en (English),
              hi (हिन्दी), bn (বাংলা), mr (मराठी)

   Kaise kaam karta hai:
   - Static UI text: HTML mein <span data-i18n="nav_home"></span> likho,
     ye engine automatically sahi language ka text bhar dega.
   - Placeholder text: <input data-i18n-ph="search_placeholder">
   - Dynamic content (exam overview etc.): data.js mein har field ab
     {hg:"...", en:"...", hi:"...", bn:"...", mr:"..."} object hai —
     helper function `tf(field)` current language nikaal ke deta hai,
     aur agar wo language khaali ho to en → hg fallback karta hai.
   ========================================================================= */

const LANGUAGES = [
  { code: 'hg', label: 'Hinglish' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' }
];

const UI_STRINGS = {
  /* ---- Header / Nav ---- */
  nav_home:        { hg:"Home", en:"Home", hi:"होम", bn:"হোম", mr:"मुख्यपृष्ठ" },
  nav_exams:        { hg:"Exams", en:"Exams", hi:"परीक्षाएं", bn:"পরীক্ষা", mr:"परीक्षा" },
  nav_pyq:         { hg:"PYQ", en:"PYQ", hi:"पिछले वर्ष के प्रश्न", bn:"পূর্ববর্তী প্রশ্ন", mr:"मागील प्रश्न" },
  nav_syllabus:    { hg:"Syllabus", en:"Syllabus", hi:"पाठ्यक्रम", bn:"সিলেবাস", mr:"अभ्यासक्रम" },
  nav_notifications:{ hg:"Notifications", en:"Notifications", hi:"सूचनाएं", bn:"বিজ্ঞপ্তি", mr:"सूचना" },
  nav_gallery:     { hg:"Gallery", en:"Gallery", hi:"गैलरी", bn:"গ্যালারি", mr:"गॅलरी" },
  nav_contact:     { hg:"Contact", en:"Contact", hi:"संपर्क करें", bn:"যোগাযোগ", mr:"संपर्क" },
  admin_login:     { hg:"Admin Login", en:"Admin Login", hi:"एडमिन लॉगिन", bn:"অ্যাডমিন লগইন", mr:"अ‍ॅडमिन लॉगिन" },
  tagline_brand:   { hg:"Digital Self-Study", en:"Digital Self-Study", hi:"डिजिटल सेल्फ़-स्टडी", bn:"ডিজিটাল সেলফ-স্টাডি", mr:"डिजिटल सेल्फ-स्टडी" },

  /* ---- Hero Slide 1 ---- */
  hero_eyebrow1:   { hg:"— WELCOME", en:"— WELCOME", hi:"— स्वागत है", bn:"— স্বাগতম", mr:"— स्वागत आहे" },
  hero_h1:         { hg:"Your Exam. Your<br>Resources. Your Library.", en:"Your Exam. Your<br>Resources. Your Library.", hi:"आपकी परीक्षा। आपके<br>संसाधन। आपकी लाइब्रेरी।", bn:"আপনার পরীক্ষা। আপনার<br>সম্পদ। আপনার লাইব্রেরি।", mr:"तुमची परीक्षा। तुमची<br>साधने। तुमची लायब्ररी।" },
  hero_tagline1:   { hg:"NDA se lekar SSC, Railway, Banking, Teaching aur State exams tak — syllabus, previous year papers, notifications aur mock tests, sab ek hi jagah, ek hi digital library mein.",
                      en:"From NDA to SSC, Railway, Banking, Teaching and State exams — syllabus, previous year papers, notifications and mock tests, all in one digital library.",
                      hi:"एनडीए से लेकर एसएससी, रेलवे, बैंकिंग, शिक्षक भर्ती और राज्य परीक्षाओं तक — पाठ्यक्रम, पिछले वर्ष के प्रश्नपत्र, सूचनाएं और मॉक टेस्ट, सब एक ही डिजिटल लाइब्रेरी में।",
                      bn:"এনডিএ থেকে এসএসসি, রেলওয়ে, ব্যাংকিং, শিক্ষকতা এবং রাজ্য পরীক্ষা পর্যন্ত — সিলেবাস, পূর্ববর্তী বছরের প্রশ্নপত্র, বিজ্ঞপ্তি এবং মক টেস্ট, সব একটি ডিজিটাল লাইব্রেরিতে।",
                      mr:"एनडीए पासून एसएससी, रेल्वे, बँकिंग, शिक्षक भरती आणि राज्य परीक्षांपर्यंत — अभ्यासक्रम, मागील वर्षांचे प्रश्नपत्र, सूचना आणि मॉक टेस्ट, सर्व एकाच डिजिटल लायब्ररीत." },
  hero_btn_explore:{ hg:"Explore Exams →", en:"Explore Exams →", hi:"परीक्षाएं देखें →", bn:"পরীক্ষা দেখুন →", mr:"परीक्षा पहा →" },
  hero_btn_latest: { hg:"Latest Notifications", en:"Latest Notifications", hi:"नवीनतम सूचनाएं", bn:"সর্বশেষ বিজ্ঞপ্তি", mr:"नवीनतम सूचना" },
  hero_stat_label: { hg:"Exams Catalogued", en:"Exams Catalogued", hi:"सूचीबद्ध परीक्षाएं", bn:"তালিকাভুক্ত পরীক্ষা", mr:"सूचीबद्ध परीक्षा" },

  /* ---- Hero Slide 2 (Director) ---- */
  hero_eyebrow2:   { hg:"— FROM THE DIRECTOR'S DESK", en:"— FROM THE DIRECTOR'S DESK", hi:"— निदेशक के संदेश से", bn:"— পরিচালকের বার্তা", mr:"— संचालकांचा संदेश" },
  hero_btn_readmore:{ hg:"Read More →", en:"Read More →", hi:"और पढ़ें →", bn:"আরও পড়ুন →", mr:"अधिक वाचा →" },

  /* ---- Hero Slide 3 ---- */
  hero_eyebrow3:   { hg:"— WHAT YOU GET", en:"— WHAT YOU GET", hi:"— आपको क्या मिलेगा", bn:"— আপনি কী পাবেন", mr:"— तुम्हाला काय मिळेल" },
  hero_h3:         { hg:"Everything a Serious<br>Aspirant Needs.", en:"Everything a Serious<br>Aspirant Needs.", hi:"एक गंभीर अभ्यर्थी को<br>चाहिए सब कुछ।", bn:"একজন গুরুত্বপূর্ণ প্রার্থীর<br>যা যা দরকার।", mr:"गंभीर उमेदवाराला<br>लागणारे सर्व काही." },
  hero_tagline3:   { hg:"Digital resources, previous year papers, exam preparation tools aur online practice — ek organized dashboard mein.",
                      en:"Digital resources, previous year papers, exam preparation tools and online practice — in one organized dashboard.",
                      hi:"डिजिटल संसाधन, पिछले वर्ष के प्रश्नपत्र, परीक्षा तैयारी उपकरण और ऑनलाइन अभ्यास — एक व्यवस्थित डैशबोर्ड में।",
                      bn:"ডিজিটাল রিসোর্স, পূর্ববর্তী বছরের প্রশ্নপত্র, পরীক্ষার প্রস্তুতির সরঞ্জাম এবং অনলাইন অনুশীলন — একটি সুসংগঠিত ড্যাশবোর্ডে।",
                      mr:"डिजिटल संसाधने, मागील वर्षांचे प्रश्नपत्र, परीक्षा तयारीची साधने आणि ऑनलाइन सराव — एका व्यवस्थित डॅशबोर्डमध्ये." },
  hero_btn_start:  { hg:"Start Exploring →", en:"Start Exploring →", hi:"शुरू करें →", bn:"শুরু করুন →", mr:"सुरू करा →" },

  /* ---- Important Links ---- */
  important_links: { hg:"Important Links", en:"Important Links", hi:"महत्वपूर्ण लिंक", bn:"গুরুত্বপূর্ণ লিংক", mr:"महत्त्वाचे दुवे" },

  /* ---- Search ---- */
  search_placeholder:{ hg:"Search Exam, PYQ, Syllabus... e.g. NDA, SSC CGL, CTET", en:"Search Exam, PYQ, Syllabus... e.g. NDA, SSC CGL, CTET",
                        hi:"परीक्षा, प्रश्नपत्र, पाठ्यक्रम खोजें... जैसे NDA, SSC CGL, CTET", bn:"পরীক্ষা, প্রশ্নপত্র, সিলেবাস খুঁজুন... যেমন NDA, SSC CGL, CTET",
                        mr:"परीक्षा, प्रश्नपत्र, अभ्यासक्रम शोधा... उदा. NDA, SSC CGL, CTET" },
  search_btn:      { hg:"Search", en:"Search", hi:"खोजें", bn:"অনুসন্ধান", mr:"शोधा" },
  search_no_results:{ hg:'No results — try "NDA", "SSC CGL", "CTET"...', en:'No results — try "NDA", "SSC CGL", "CTET"...',
                       hi:'कोई परिणाम नहीं — "NDA", "SSC CGL", "CTET" आज़माएं...', bn:'কোন ফলাফল নেই — "NDA", "SSC CGL", "CTET" চেষ্টা করুন...',
                       mr:'निकाल नाही — "NDA", "SSC CGL", "CTET" वापरून पहा...' },

  /* ---- Section: Trending ---- */
  eyebrow_trending:{ hg:"Trending Right Now", en:"Trending Right Now", hi:"अभी ट्रेंडिंग", bn:"এখন ট্রেন্ডিং", mr:"सध्या ट्रेंडिंग" },

  /* ---- Section: Categories ---- */
  eyebrow_browse:  { hg:"Browse by Category", en:"Browse by Category", hi:"श्रेणी अनुसार देखें", bn:"বিভাগ অনুযায়ী দেখুন", mr:"श्रेणीनुसार पहा" },
  heading_explore: { hg:"Explore APNA LIBRARY", en:"Explore APNA LIBRARY", hi:"APNA LIBRARY एक्सप्लोर करें", bn:"APNA LIBRARY এক্সপ্লোর করুন", mr:"APNA LIBRARY एक्सप्लोर करा" },
  view_all_cat:    { hg:"View All Categories →", en:"View All Categories →", hi:"सभी श्रेणियां देखें →", bn:"সব বিভাগ দেখুন →", mr:"सर्व श्रेणी पहा →" },
  exams_listed:    { hg:"EXAMS LISTED", en:"EXAMS LISTED", hi:"परीक्षाएं सूचीबद्ध", bn:"পরীক্ষা তালিকাভুক্ত", mr:"परीक्षा सूचीबद्ध" },

  /* ---- Section: Featured Exams ---- */
  eyebrow_featured:{ hg:"Featured Exams", en:"Featured Exams", hi:"प्रमुख परीक्षाएं", bn:"বৈশিষ্ট্যযুক্ত পরীক্ষা", mr:"ठळक परीक्षा" },
  heading_popular: { hg:"Popular Right Now", en:"Popular Right Now", hi:"अभी लोकप्रिय", bn:"এখন জনপ্রিয়", mr:"सध्या लोकप्रिय" },
  view_details:    { hg:"View Details →", en:"View Details →", hi:"विवरण देखें →", bn:"বিস্তারিত দেখুন →", mr:"तपशील पहा →" },
  apply_short:     { hg:"Apply ↗", en:"Apply ↗", hi:"आवेदन करें ↗", bn:"আবেদন করুন ↗", mr:"अर्ज करा ↗" },
  trending_tag:    { hg:"Trending", en:"Trending", hi:"ट्रेंडिंग", bn:"ট্রেন্ডিং", mr:"ट्रेंडिंग" },

  /* ---- Section: Notifications ---- */
  eyebrow_live:    { hg:"🔴 Live Updates", en:"🔴 Live Updates", hi:"🔴 लाइव अपडेट", bn:"🔴 লাইভ আপডেট", mr:"🔴 लाइव्ह अपडेट" },
  heading_latest_notif:{ hg:"Latest Notifications", en:"Latest Notifications", hi:"नवीनतम सूचनाएं", bn:"সর্বশেষ বিজ্ঞপ্তি", mr:"नवीनतम सूचना" },
  open_link:       { hg:"Open →", en:"Open →", hi:"खोलें →", bn:"খুলুন →", mr:"उघडा →" },

  /* ---- Section: Gallery ---- */
  eyebrow_campus:  { hg:"Campus & Library", en:"Campus & Library", hi:"परिसर और लाइब्रेरी", bn:"ক্যাম্পাস ও লাইব্রেরি", mr:"कॅम्पस आणि लायब्ररी" },
  heading_gallery: { hg:"Gallery", en:"Gallery", hi:"गैलरी", bn:"গ্যালারি", mr:"गॅलरी" },
  gallery_empty1:  { hg:"Gallery abhi khaali hai.", en:"Gallery is empty right now.", hi:"गैलरी अभी खाली है।", bn:"গ্যালারি এখন খালি।", mr:"गॅलरी सध्या रिकामी आहे." },
  gallery_empty2:  { hg:"Admin Panel se images add hote hi yahan dikhengi", en:"Images will appear here once added via Admin Panel",
                      hi:"एडमिन पैनल से इमेज जोड़ते ही यहां दिखेंगी", bn:"অ্যাডমিন প্যানেল থেকে ছবি যোগ করলেই এখানে দেখা যাবে",
                      mr:"अ‍ॅडमिन पॅनलमधून इमेज जोडताच इथे दिसतील" },

  /* ---- Section: Query form ---- */
  eyebrow_question:{ hg:"Have a Question?", en:"Have a Question?", hi:"कोई सवाल है?", bn:"কোন প্রশ্ন আছে?", mr:"काही प्रश्न आहे?" },
  heading_ask:     { hg:"Ask Us Anything", en:"Ask Us Anything", hi:"हमसे कुछ भी पूछें", bn:"আমাদের যেকোনো প্রশ্ন জিজ্ঞাসা করুন", mr:"आम्हाला काहीही विचारा" },
  query_desc:      { hg:"Exam, syllabus, notification ya kisi bhi cheez ke baare mein poochho — hum WhatsApp ya Email par jaldi reply karenge.",
                      en:"Ask about any exam, syllabus, notification or anything else — we'll reply quickly on WhatsApp or Email.",
                      hi:"परीक्षा, पाठ्यक्रम, सूचना या किसी भी बारे में पूछें — हम व्हाट्सएप या ईमेल पर जल्दी जवाब देंगे।",
                      bn:"পরীক্ষা, সিলেবাস, বিজ্ঞপ্তি বা যেকোনো কিছু নিয়ে জিজ্ঞাসা করুন — আমরা হোয়াটসঅ্যাপ বা ইমেইলে দ্রুত উত্তর দেব।",
                      mr:"परीक्षा, अभ्यासक्रम, सूचना किंवा कशाबद्दलही विचारा — आम्ही व्हॉट्सअ‍ॅप किंवा ईमेलवर लवकर उत्तर देऊ." },
  field_name:      { hg:"Name", en:"Name", hi:"नाम", bn:"নাম", mr:"नाव" },
  field_mobile:    { hg:"Mobile Number", en:"Mobile Number", hi:"मोबाइल नंबर", bn:"মোবাইল নম্বর", mr:"मोबाईल नंबर" },
  field_email:     { hg:"Email", en:"Email", hi:"ईमेल", bn:"ইমেইল", mr:"ईमेल" },
  field_exam_cat:  { hg:"Exam / Category", en:"Exam / Category", hi:"परीक्षा / श्रेणी", bn:"পরীক্ষা / বিভাগ", mr:"परीक्षा / श्रेणी" },
  field_query:     { hg:"Your Query", en:"Your Query", hi:"आपका प्रश्न", bn:"আপনার প্রশ্ন", mr:"तुमचा प्रश्न" },
  ph_name:         { hg:"Your full name", en:"Your full name", hi:"आपका पूरा नाम", bn:"আপনার পূর্ণ নাম", mr:"तुमचे पूर्ण नाव" },
  ph_mobile:       { hg:"10-digit mobile number", en:"10-digit mobile number", hi:"10 अंकों का मोबाइल नंबर", bn:"১০ সংখ্যার মোবাইল নম্বর", mr:"१० अंकी मोबाईल नंबर" },
  ph_query:        { hg:"Type your question here...", en:"Type your question here...", hi:"अपना सवाल यहां लिखें...", bn:"আপনার প্রশ্ন এখানে লিখুন...", mr:"तुमचा प्रश्न इथे टाइप करा..." },
  btn_whatsapp:    { hg:"🟢 Submit via WhatsApp", en:"🟢 Submit via WhatsApp", hi:"🟢 व्हाट्सएप से भेजें", bn:"🟢 হোয়াটসঅ্যাপে জমা দিন", mr:"🟢 व्हॉट्सअ‍ॅपने पाठवा" },
  btn_email:       { hg:"✉️ Submit via Email", en:"✉️ Submit via Email", hi:"✉️ ईमेल से भेजें", bn:"✉️ ইমেইলে জমা দিন", mr:"✉️ ईमेलने पाठवा" },

  /* ---- Section: Contact ---- */
  eyebrow_touch:   { hg:"Get in Touch", en:"Get in Touch", hi:"संपर्क करें", bn:"যোগাযোগ করুন", mr:"संपर्क साधा" },
  heading_contact: { hg:"Contact & Location", en:"Contact & Location", hi:"संपर्क और स्थान", bn:"যোগাযোগ ও অবস্থান", mr:"संपर्क आणि स्थान" },
  contact_us:      { hg:"Contact Us", en:"Contact Us", hi:"हमसे संपर्क करें", bn:"আমাদের সাথে যোগাযোগ করুন", mr:"आमच्याशी संपर्क साधा" },
  label_address:   { hg:"Address", en:"Address", hi:"पता", bn:"ঠিকানা", mr:"पत्ता" },
  label_phone:     { hg:"Phone", en:"Phone", hi:"फ़ोन", bn:"ফোন", mr:"फोन" },
  label_email:     { hg:"Email", en:"Email", hi:"ईमेल", bn:"ইমেইল", mr:"ईमेल" },
  label_hours:     { hg:"Working Hours", en:"Working Hours", hi:"कार्य समय", bn:"কাজের সময়", mr:"कामाचे तास" },
  address_placeholder:{ hg:"Admin panel se update hoga", en:"Will be updated via admin panel", hi:"एडमिन पैनल से अपडेट होगा", bn:"অ্যাডমিন প্যানেল থেকে আপডেট হবে", mr:"अ‍ॅडमिन पॅनलमधून अपडेट होईल" },

  /* ---- Footer ---- */
  footer_desc:     { hg:"Digital self-study library for every competitive exam aspirant — syllabus, PYQ, notifications aur practice, sab ek jagah.",
                      en:"Digital self-study library for every competitive exam aspirant — syllabus, PYQ, notifications and practice, all in one place.",
                      hi:"हर प्रतियोगी परीक्षा अभ्यर्थी के लिए डिजिटल सेल्फ-स्टडी लाइब्रेरी — पाठ्यक्रम, पीवाईक्यू, सूचनाएं और अभ्यास, सब एक जगह।",
                      bn:"প্রতিটি প্রতিযোগিতামূলক পরীক্ষার্থীর জন্য ডিজিটাল সেলফ-স্টাডি লাইব্রেরি — সিলেবাস, পিওয়াইকিউ, বিজ্ঞপ্তি এবং অনুশীলন, সব এক জায়গায়।",
                      mr:"प्रत्येक स्पर्धा परीक्षा उमेदवारासाठी डिजिटल सेल्फ-स्टडी लायब्ररी — अभ्यासक्रम, मागील प्रश्न, सूचना आणि सराव, सर्व एकाच ठिकाणी." },
  footer_explore:  { hg:"Explore", en:"Explore", hi:"एक्सप्लोर करें", bn:"এক্সপ্লোর করুন", mr:"एक्सप्लोर करा" },
  footer_all_exams:{ hg:"All Exams", en:"All Exams", hi:"सभी परीक्षाएं", bn:"সব পরীক্ষা", mr:"सर्व परीक्षा" },
  footer_categories:{ hg:"Categories", en:"Categories", hi:"श्रेणियां", bn:"বিভাগ", mr:"श्रेण्या" },
  footer_company:  { hg:"Company", en:"Company", hi:"कंपनी", bn:"কোম্পানি", mr:"कंपनी" },
  footer_rights:   { hg:"© 2026 APNA LIBRARY. All rights reserved.", en:"© 2026 APNA LIBRARY. All rights reserved.",
                      hi:"© 2026 APNA LIBRARY. सर्वाधिकार सुरक्षित।", bn:"© 2026 APNA LIBRARY. সর্বস্বত্ব সংরক্ষিত।", mr:"© 2026 APNA LIBRARY. सर्व हक्क राखीव." },
  footer_tag:      { hg:"Built as a Digital Self-Study Platform", en:"Built as a Digital Self-Study Platform",
                      hi:"एक डिजिटल सेल्फ-स्टडी प्लेटफ़ॉर्म के रूप में बनाया गया", bn:"একটি ডিজিটাল সেলফ-স্টাডি প্ল্যাটফর্ম হিসেবে তৈরি", mr:"डिजिटल सेल्फ-स्टडी प्लॅटफॉर्म म्हणून तयार केले" },
  back_home:       { hg:"← Back to Home", en:"← Back to Home", hi:"← होम पर वापस जाएं", bn:"← হোমে ফিরে যান", mr:"← मुख्यपृष्ठावर परत जा" },

  /* ---- Category page ---- */
  eyebrow_catalogue:{ hg:"Full Catalogue", en:"Full Catalogue", hi:"पूरी सूची", bn:"সম্পূর্ণ তালিকা", mr:"संपूर्ण यादी" },
  heading_all_exams:{ hg:"All Exams", en:"All Exams", hi:"सभी परीक्षाएं", bn:"সব পরীক্ষা", mr:"सर्व परीक्षा" },
  cat_page_sub:    { hg:"Category select karo ya seedha exam search karo.", en:"Select a category or search for an exam directly.",
                      hi:"श्रेणी चुनें या सीधे परीक्षा खोजें।", bn:"একটি বিভাগ নির্বাচন করুন বা সরাসরি পরীক্ষা খুঁজুন।", mr:"श्रेणी निवडा किंवा थेट परीक्षा शोधा." },
  filter_all:      { hg:"All", en:"All", hi:"सभी", bn:"সব", mr:"सर्व" },

  /* ---- Exam detail page ---- */
  tab_overview:    { hg:"🏠 Overview", en:"🏠 Overview", hi:"🏠 अवलोकन", bn:"🏠 বিবরণ", mr:"🏠 आढावा" },
  tab_eligibility: { hg:"🎓 Eligibility", en:"🎓 Eligibility", hi:"🎓 पात्रता", bn:"🎓 যোগ্যতা", mr:"🎓 पात्रता" },
  tab_pattern:     { hg:"📝 Exam Pattern", en:"📝 Exam Pattern", hi:"📝 परीक्षा पैटर्न", bn:"📝 পরীক্ষার প্যাটার্ন", mr:"📝 परीक्षा नमुना" },
  tab_resources:   { hg:"📄 PYQ & Answer Keys", en:"📄 PYQ & Answer Keys", hi:"📄 प्रश्नपत्र और उत्तर कुंजी", bn:"📄 প্রশ্নপত্র ও উত্তরপত্র", mr:"📄 प्रश्नपत्र आणि उत्तरपत्रिका" },
  tab_links:       { hg:"🔗 Official Links", en:"🔗 Official Links", hi:"🔗 आधिकारिक लिंक", bn:"🔗 অফিসিয়াল লিংক", mr:"🔗 अधिकृत दुवे" },
  apply_online:    { hg:"Apply Online →", en:"Apply Online →", hi:"ऑनलाइन आवेदन करें →", bn:"অনলাইনে আবেদন করুন →", mr:"ऑनलाइन अर्ज करा →" },
  official_website:{ hg:"Official Website ↗", en:"Official Website ↗", hi:"आधिकारिक वेबसाइट ↗", bn:"অফিসিয়াল ওয়েবসাইট ↗", mr:"अधिकृत संकेतस्थळ ↗" },
  ov_category:     { hg:"Category", en:"Category", hi:"श्रेणी", bn:"বিভাগ", mr:"श्रेणी" },
  ov_body:         { hg:"Conducting Body", en:"Conducting Body", hi:"आयोजक निकाय", bn:"পরিচালনাকারী সংস্থা", mr:"आयोजक संस्था" },
  ov_body_val:     { hg:"Official Website par verify karein", en:"Please verify on the official website", hi:"आधिकारिक वेबसाइट पर सत्यापित करें", bn:"অফিসিয়াল ওয়েবসাইটে যাচাই করুন", mr:"अधिकृत संकेतस्थळावर तपासा" },
  ov_status:       { hg:"Status", en:"Status", hi:"स्थिति", bn:"অবস্থা", mr:"स्थिती" },
  ov_status_val:   { hg:"🟢 Notifications Active", en:"🟢 Notifications Active", hi:"🟢 सूचनाएं सक्रिय हैं", bn:"🟢 বিজ্ঞপ্তি সক্রিয়", mr:"🟢 सूचना सक्रिय आहेत" },
  no_pyq_msg:      { hg:"Abhi koi PYQ link add nahi hua — admin panel se add hoga.", en:"No PYQ link added yet — will be added via the admin panel.",
                      hi:"अभी कोई प्रश्नपत्र लिंक नहीं जोड़ा गया — एडमिन पैनल से जोड़ा जाएगा।", bn:"এখনো কোনো প্রশ্নপত্র লিংক যোগ করা হয়নি — অ্যাডমিন প্যানেল থেকে যোগ করা হবে।",
                      mr:"अजून कोणताही प्रश्नपत्र दुवा जोडलेला नाही — अ‍ॅडमिन पॅनलमधून जोडला जाईल." },
  direct_pdf:      { hg:"DIRECT PDF", en:"DIRECT PDF", hi:"सीधा पीडीएफ", bn:"সরাসরি পিডিএফ", mr:"थेट पीडीएफ" },
  official_portal: { hg:"OFFICIAL PORTAL", en:"OFFICIAL PORTAL", hi:"आधिकारिक पोर्टल", bn:"অফিসিয়াল পোর্টাল", mr:"अधिकृत पोर्टल" },
  not_found_title: { hg:"Exam not found in catalogue", en:"Exam not found in catalogue", hi:"परीक्षा सूची में नहीं मिली", bn:"তালিকায় পরীক্ষা পাওয়া যায়নি", mr:"यादीत परीक्षा सापडली नाही" },
  not_found_desc:  { hg:"Ye exam abhi APNA LIBRARY mein add nahi hua — admin panel se add kiya ja sakta hai.", en:"This exam hasn't been added to APNA LIBRARY yet — it can be added via the admin panel.",
                      hi:"यह परीक्षा अभी APNA LIBRARY में नहीं जोड़ी गई — इसे एडमिन पैनल से जोड़ा जा सकता है।", bn:"এই পরীক্ষাটি এখনো APNA LIBRARY-তে যোগ করা হয়নি — এটি অ্যাডমিন প্যানেল থেকে যোগ করা যেতে পারে।",
                      mr:"ही परीक्षा अजून APNA LIBRARY मध्ये जोडलेली नाही — ती अ‍ॅडमिन पॅनलमधून जोडता येईल." },
  back_all_exams:  { hg:"← Back to All Exams", en:"← Back to All Exams", hi:"← सभी परीक्षाओं पर वापस जाएं", bn:"← সব পরীক্ষায় ফিরে যান", mr:"← सर्व परीक्षांकडे परत जा" }
};

/* ---------- Current language state ---------- */
function getCurrentLang(){
  return localStorage.getItem('apna_library_lang') || 'hg';
}

function t(key){
  const lang = getCurrentLang();
  const entry = UI_STRINGS[key];
  if(!entry) return key;
  return entry[lang] || entry.en || entry.hg || key;
}

/* Multi-language content field helper — for exam/category objects from data.js
   Usage: tf(exam.overview) where exam.overview = {hg:"..",en:"..",hi:"..",bn:"..",mr:".."} */
function tf(fieldObj){
  if(!fieldObj) return '';
  if(typeof fieldObj === 'string') return fieldObj; // backward-compatible
  const lang = getCurrentLang();
  return fieldObj[lang] || fieldObj.en || fieldObj.hg || '';
}

/* ---------- Apply translations to the DOM ---------- */
function applyStaticTranslations(){
  document.documentElement.lang = getCurrentLang() === 'hg' ? 'hi' : getCurrentLang();
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.innerHTML = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
}

/* ---------- Language switcher widget ---------- */
function buildLanguageSwitcher(){
  const mount = document.getElementById('lang-switcher');
  if(!mount) return;
  const current = getCurrentLang();
  mount.innerHTML = `
    <button class="lang-current" id="lang-toggle-btn" aria-haspopup="true" aria-expanded="false">
      🌐 <span>${LANGUAGES.find(l=>l.code===current)?.label || 'Hinglish'}</span>
    </button>
    <div class="lang-dropdown" id="lang-dropdown">
      ${LANGUAGES.map(l=>`<button class="lang-option $
{l.code}">${l.label}</button>`).join('')}
    </div>
  `;
  const toggleBtn = document.getElementById('lang-toggle-btn');
  const dropdown = document.getElementById('lang-dropdown');
  toggleBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });
  document.addEventListener('click', ()=> dropdown.classList.remove('show'));
  dropdown.querySelectorAll('.lang-option').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      localStorage.setItem('apna_library_lang', btn.dataset.lang);
      dropdown.classList.remove('show');
      onLanguageChange();
    });
  });
}

/* Each page defines window.onLanguageChangeExtra() for its own dynamic re-render
   (e.g. re-rendering exam cards, notification ledger etc. in the new language) */
function onLanguageChange(){
  applyStaticTranslations();
  buildLanguageSwitcher();
  if(typeof window.onLanguageChangeExtra === 'function'){
    window.onLanguageChangeExtra();
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  applyStaticTranslations();
  buildLanguageSwitcher();
});
