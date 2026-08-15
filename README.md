# APNA LIBRARY — Setup Guide

**"Your Exam. Your Resources. Your Library."**

Ye Phase 1 hai: pura premium frontend (homepage, category page, exam detail page) + admin panel ka code — sab ban chuka hai. Neeche diye steps follow karke ise **live aur admin-editable** bana sakte ho.

---

## 🗂️ Project Structure

```
apna-library/
├── index.html              → Homepage
├── category.html           → All Exams / filter by category
├── exams/
│   └── exam.html           → Single dynamic template for ALL exams (?id=nda)
├── admin/
│   ├── index.html          → Admin login + dashboard UI
│   └── admin.js             → Admin CRUD logic (Supabase se connected)
├── assets/
│   ├── css/style.css       → Poora design system
│   ├── js/data.js          → Seed data (Phase 1) — 18 exams, 11 categories
│   ├── js/main.js          → Homepage rendering + search logic
│   └── js/supabase-client.js → Yahan apni Supabase keys daalni hain
├── supabase-schema.sql     → Database banane ke liye (copy-paste-run)
└── README.md                → Ye file
```

---

## 🚀 Step 1 — Abhi ke abhi dekhna hai (bina setup ke)

Filhal site **seed data** (`data.js`) se chal rahi hai — 18 real exams already daale hain (NDA, SSC CGL, RRB NTPC, IBPS PO, CTET, NEET, JEE Main, etc.) apne real official links ke saath. `index.html` ko seedha browser mein khol ke dekh sakte ho.

Admin panel abhi login nahi karega jab tak Step 2–3 na ho jaaye — wo Supabase se connect hone ke liye bana hai.

---

## 🔧 Step 2 — Supabase Setup (Admin Panel ke liye zaroori) — 10 minute

Admin panel ko real database + login chahiye. Ye free hai:

1. **[supabase.com](https://supabase.com)** par jaake free account banao → **"New Project"**
2. Project name "apna-library" do, ek strong database password set karo, region **"Mumbai (ap-south-1)"** choose karo (India ke liye fastest)
3. Project ban jaane ke baad, left sidebar mein **"SQL Editor"** kholo
4. `supabase-schema.sql` file ka pura content copy karke paste karo → **"Run"** dabao
   - Isse `exams`, `notifications`, `gallery`, `queries`, `site_settings` tables ban jayengi, security rules ke saath
5. Left sidebar → **"Storage"** → do buckets banao:
   - `gallery` (Public bucket **ON**)
   - `documents` (Public bucket **ON**)
6. Left sidebar → **"Authentication" → "Users"** → **"Add User"** → apna admin email + password daalo (yehi tumhara admin login hoga)
7. Left sidebar → **"Settings" → "API"** → yahan se 2 cheezein copy karo:
   - **Project URL**
   - **anon public key**
8. `assets/js/supabase-client.js` file kholo, in dono values ko paste karo:
   ```js
   const SUPABASE_URL = "yahan apna project URL";
   const SUPABASE_ANON_KEY = "yahan apni anon key";
   ```

Bas — ab `admin/index.html` khol ke apne email/password se login ho jayega.

---

## 🌐 Step 3 — Vercel par Deploy

1. Is poore `apna-library` folder ko GitHub repository mein push karo
2. [vercel.com](https://vercel.com) par jaake **"Add New Project"** → apni GitHub repo select karo
3. **Framework Preset: "Other"** rakho (ye plain HTML/CSS/JS hai, koi build step nahi chahiye)
4. **Deploy** dabao — 30 second mein live ho jayega

Chunki database/login **Supabase** handle karta hai (Vercel sirf static files serve karta hai), tumhara admin login aur data har jagah se — mobile, laptop, kahin se bhi — kaam karega.

---

## 🔐 Admin Panel — Kaise Kaam Karega (Poora Flow)

```
Tum admin/index.html kholte ho
        │
        ▼
Email + Password daalte ho (Step 2.6 mein banaya wahi)
        │
        ▼
Supabase verify karta hai → Dashboard khulta hai
        │
        ├── 📚 Exams        → Add/Edit/Delete → turant website pe reflect
        ├── 📰 Notifications → Add/Edit/Delete → homepage ledger update
        ├── 🖼️ Gallery       → Image upload (seedha yahin se) → gallery section update
        ├── 💬 Queries       → Jo bhi "Have a Question" form se aaya, yahan dikhega
        └── ⚙️ Settings      → Contact info, WhatsApp number, Director message
```

**Important:** Website abhi bhi seed data (`data.js`) use kar rahi hai — ye Phase 1 ka intentional decision hai taaki homepage turant, bina Supabase ke, dekhi ja sake. Jaise hi tum confirm karo, main **next step mein** `main.js` ko update kar dunga taaki wo `data.js` ki jagah seedha Supabase se live data fetch kare — us waqt admin panel mein kiya har change turant real website pe dikhega, bina code chhue.

---

## 🌐 Language Switcher — 5 Languages

Header mein top-right ek 🌐 button hai — us se poori site 5 languages mein switch hoti hai:

- **Hinglish** (default — site ki original voice)
- **English**
- **हिन्दी** (Hindi)
- **বাংলা** (Bengali)
- **मराठी** (Marathi)

Kaise kaam karta hai:
- `assets/js/i18n.js` mein saare static UI text (nav, buttons, headings, form labels, footer) ka translation dictionary hai
- Har exam/category ka content (`overview`, `eligibility`, `pattern`, category `name`) ab `{hg, en, hi, bn, mr}` object hai — jo language select ho wahi dikhta hai
- Agar kisi exam ka Hindi/Bengali/Marathi translation abhi khaali hai, to wo **automatically English (ya Hinglish) mein fallback** ho jata hai — site kabhi khaali nahi dikhegi
- Selected language browser mein save rehta hai (agli baar site kholne par yaad rahega)

**Admin panel se translations kaise add karein:** Exams section mein "Add/Edit Exam" form mein Overview/Eligibility/Pattern ke liye pehle Hinglish + English fields dikhte hain, aur ek collapsible "+ More Languages" section mein Hindi/Bengali/Marathi — jitni bhi bhaasha mein content daaloge, utni mein site turant available ho jayegi.

**Abhi kya translate hai:** Saari static UI (menu, buttons, forms) sabhi 5 languages mein poori tarah translated hai. Exam content mein — NDA, SSC CGL, SSC GD, RRB NTPC, CTET, UP PET, NEET jaise flagship exams sabhi 5 languages mein hain; baaki exams abhi Hinglish + English mein hain (Hindi/Bengali/Marathi select karne par ye automatically English dikhayenge jab tak admin panel se translation add na ho).

---



Maine jo exams abhi daale hain unme:
- **NDA** → 2 real, verified, direct working PDF links UPSC ki official site se (`upsc.gov.in/sites/default/files/...`)
- **Baaki sab exams** → verified official website/portal links (ssc.gov.in, ibps.in, ctet.nic.in, etc.) — ye sab real, stable government domains hain

Har exam ke saath sabhi years/subjects ke **exact PDF links manually nikalna** ek session mein possible nahi hai (SSC jaise portals to login ke peeche PDFs rakhte hain). Isliye system aisa bana hai: admin panel se **"Exams" section mein jaake `links` field mein jitne chaho utne PDF links paste kar sakte ho** — bas paste karo, save karo, website pe turant dikhega.

---

## 🗺️ Roadmap — Aage Kya Banega

- **✅ Phase 1 (Done):** Homepage, Category page, Exam template, 18 exams seed data, premium design
- **✅ Phase 2 (Done — needs your Supabase keys to go live):** Admin panel — Exams/Notifications/Gallery CRUD, Queries inbox, Site Settings
- **⏭️ Phase 3 (Next):** Student login, "My Study" dashboard, saved/bookmarked questions, syllabus tracker (checkboxes)
- **⏭️ Phase 4 (Next):** Online PYQ Practice mode (question → options → submit → score/solutions), Mock Tests, Exam Calendar page, Universal search across PYQ content

Bata do jab Phase 1 ka design/data check kar lo — main turant Phase 3–4 pe badhta hoon.
