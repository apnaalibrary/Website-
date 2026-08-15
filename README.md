# APNA LIBRARY — Premium Glass Edition

**Your Exam. Your Resources. Your Library.**

A deployment-ready static frontend for GitHub Pages/Vercel with a premium white liquid-glass visual system.

## Project structure

```text
APNA-LIBRARY/
├── index.html
├── category.html
├── exams/
│   └── exam.html
├── admin/
│   ├── index.html
│   └── admin.js
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── data.js
│       ├── i18n.js
│       ├── main.js
│       └── supabase-client.js
├── supabase-schema.sql
└── README.md
```

## GitHub Pages — important

Upload the **contents of this folder** to the root of your repository.

The repository root must contain `index.html` directly. Do **not** upload only the ZIP file and do not leave `index.html` inside another folder.

Then go to **Settings → Pages → Deploy from a branch → main → /(root)**.

Expected project URL:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

## Admin panel

Public homepage: `/`

Admin login: `/admin/`

The admin dashboard uses Supabase Authentication, Database and Storage. Put the Supabase project URL and anon public key in:

`assets/js/supabase-client.js`

Then run the SQL from `supabase-schema.sql` in Supabase SQL Editor and create your admin Authentication user.

Until Supabase is configured, the public website still works using the seed data in `assets/js/data.js`.

## Design

- Premium white-first visual system
- Liquid glass / glassmorphism surfaces
- Responsive mobile layout
- Animated hero slider
- Dynamic exam catalogue
- Search
- Category filters
- Notifications
- Gallery
- Query/contact form
- Exam detail pages
- Separate admin area
