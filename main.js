/* =========================================================================
   APNA LIBRARY — Main JS
   Homepage ka poora dynamic rendering yahin se hota hai: hero slider,
   trending pills, category grid, exam cards, notifications ledger, search.
   Data seed abhi data.js se aa raha hai — Phase 2 ke baad yehi functions
   Supabase se fetch karke wahi HTML render karenge (structure same rahega).
   tf() function (i18n.js) current language ke hisaab se text nikaalta hai.
   ========================================================================= */

/* ---------- Hero slider ---------- */
(function initSlider(){
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let timer;

  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    dots.forEach(d=>d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    current = i;
  }
  function next(){ show((current+1) % slides.length); }

  dots.forEach((d,i)=> d.addEventListener('click', ()=>{ show(i); resetTimer(); }));
  function resetTimer(){ clearInterval(timer); timer = setInterval(next, 6000); }
  if(slides.length){ show(0); resetTimer(); }
})();

/* ---------- Mobile menu ---------- */
(function initMenu(){
  const btn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.main-nav');
  if(!btn || !nav) return;

  const close = () => {
    nav.classList.remove('mobile-open');
    btn.setAttribute('aria-expanded','false');
  };

  btn.setAttribute('aria-expanded','false');
  btn.addEventListener('click', (event)=>{
    event.stopPropagation();
    const open = nav.classList.toggle('mobile-open');
    btn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', (event)=>{
    if(!event.target.closest('.site-header')) close();
  });
})();

/* ---------- Helpers ---------- */
function examCategory(id){ return CATEGORIES.find(c=>c.id===id); }
function categoryExamCount(catId){ return EXAMS.filter(e=>e.category===catId).length; }

/* ---------- Render: Trending pills ---------- */
function renderTrending(){
  const el = document.getElementById('trending-pills');
  if(!el) return;
  const trending = EXAMS.filter(e=>e.trending);
  el.innerHTML = trending.map(e=>`
    <a class="pill" href="exams/exam.html?id=${e.id}">
      <span class="dot-live"></span>${e.name}
    </a>
  `).join('');
}

/* ---------- Render: Category grid ---------- */
function renderCategories(){
  const el = document.getElementById('category-grid');
  if(!el) return;
  el.innerHTML = CATEGORIES.map(c=>`
    <a class="cat-card" href="category.html?cat=${c.id}">
      <span class="stripe" style="background:${c.color}"></span>
      <span class="cat-icon">${c.icon}</span>
      <h3>${tf(c.name)}</h3>
      <span class="cat-count">${String(categoryExamCount(c.id)).padStart(2,'0')} ${t('exams_listed')}</span>
    </a>
  `).join('');
}

/* ---------- Render: Exam index cards ---------- */
function renderExamCards(containerId, examList){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = examList.map((e,i)=>{
    const cat = examCategory(e.category);
    return `
    <div class="index-card">
      <div class="card-top">
        <span class="card-code mono">${e.id.toUpperCase().replace(/-/g,'·')}</span>
        <span class="seal">${cat ? cat.icon : '📄'}</span>
      </div>
      <div class="card-body">
        <h3>${e.name}</h3>
        <p>${tf(e.overview)}</p>
      </div>
      <div class="card-tags">
        <span class="tag">${cat ? tf(cat.name) : ''}</span>
        ${e.trending ? `<span class="tag live">${t('trending_tag')}</span>` : ''}
      </div>
      <div class="card-foot">
        <a href="exams/exam.html?id=${e.id}">${t('view_details')}</a>
        <a href="${e.applyLink}" target="_blank" rel="noopener">${t('apply_short')}</a>
      </div>
    </div>`;
  }).join('');
}

/* ---------- Render: Notification ledger ---------- */
function renderNotifications(){
  const el = document.getElementById('notification-ledger');
  if(!el) return;
  el.innerHTML = NOTIFICATIONS.map(n=>{
    return `
    <div class="ledger-row">
      <span class="lr-tag">${n.tag}</span>
      <span class="lr-title">${n.title}</span>
      <span class="lr-date mono">${n.date}</span>
      <a class="lr-link" href="exams/exam.html?id=${n.examId}">${t('open_link')}</a>
    </div>`;
  }).join('');
}

/* ---------- Render: Important links ticker ---------- */
function renderImportantLinks(){
  const el = document.getElementById('links-ticker');
  if(!el) return;
  const items = EXAMS.slice(0,8).map(e=>`<a href="${e.officialWebsite}" target="_blank" rel="noopener">${e.name} — ${t('official_website').replace(' ↗','')}</a>`);
  el.innerHTML = items.join('<span class="sep">/</span>');
}

/* ---------- Render: Gallery (empty state ready for admin) ---------- */
function renderGallery(){
  const el = document.getElementById('gallery-grid');
  if(!el) return;
  if(!GALLERY.length){
    el.innerHTML = `<div class="gallery-empty">
      ${t('gallery_empty1')}
      <span>${t('gallery_empty2')}</span>
    </div>`;
    return;
  }
  el.innerHTML = GALLERY.map(g=>`<img src="${g.url}" alt="${g.caption||''}" loading="lazy">`).join('');
}

/* ---------- Search ---------- */
function initSearch(){
  const input = document.getElementById('search-input');
  const resultsBox = document.getElementById('search-results');
  if(!input) return;

  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    if(q.length < 2){ resultsBox.classList.remove('show'); resultsBox.innerHTML=''; return; }
    const matches = EXAMS.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.fullName.toLowerCase().includes(q) ||
      tf(examCategory(e.category)?.name).toLowerCase().includes(q)
    ).slice(0,8);

    if(!matches.length){
      resultsBox.innerHTML = `<a>${t('search_no_results')}</a>`;
    } else {
      resultsBox.innerHTML = matches.map(e=>`
        <a href="exams/exam.html?id=${e.id}">
          ${e.name} — <span style="color:#4A5066;font-weight:400">${e.fullName}</span>
          <span>${tf(examCategory(e.category)?.name)}</span>
        </a>
      `).join('');
    }
    resultsBox.classList.add('show');
  });

  document.addEventListener('click', (ev)=>{
    if(!ev.target.closest('.catalogue-search')) resultsBox.classList.remove('show');
  });
}

/* ---------- Query form: WhatsApp + Email submit ---------- */
function initQueryForm(){
  const form = document.getElementById('query-form');
  if(!form) return;
  const waBtn = document.getElementById('submit-whatsapp');
  const mailBtn = document.getElementById('submit-email');

  function buildMessage(){
    const name = document.getElementById('q-name').value || '-';
    const mobile = document.getElementById('q-mobile').value || '-';
    const exam = document.getElementById('q-exam').value || '-';
    const query = document.getElementById('q-query').value || '-';
    return `APNA LIBRARY Query%0A%0AName: ${encodeURIComponent(name)}%0AMobile: ${encodeURIComponent(mobile)}%0AExam: ${encodeURIComponent(exam)}%0AQuery: ${encodeURIComponent(query)}`;
  }

  waBtn?.addEventListener('click', (e)=>{
    e.preventDefault();
    const msg = buildMessage();
    /* Admin panel se ye WhatsApp number set hoga — abhi placeholder */
    window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, '_blank');
  });

  mailBtn?.addEventListener('click', (e)=>{
    e.preventDefault();
    const name = document.getElementById('q-name').value || '-';
    const email = document.getElementById('q-email').value || '';
    const exam = document.getElementById('q-exam').value || '-';
    const query = document.getElementById('q-query').value || '-';
    const subject = encodeURIComponent(`APNA LIBRARY Query — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nExam: ${exam}\n\nQuery:\n${query}`);
    window.location.href = `mailto:contact@apnalibrary.in?subject=${subject}&body=${body}`;
  });
}

/* ---------- Re-render dynamic content when language changes ---------- */
window.onLanguageChangeExtra = function(){
  renderTrending();
  renderCategories();
  renderExamCards('featured-exam-grid', EXAMS.filter(e=>e.trending).slice(0,6));
  renderNotifications();
  renderImportantLinks();
  renderGallery();
};

/* ---------- Init everything on homepage ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  renderTrending();
  renderCategories();
  renderExamCards('featured-exam-grid', EXAMS.filter(e=>e.trending).slice(0,6));
  renderNotifications();
  renderImportantLinks();
  renderGallery();
  initSearch();
  initQueryForm();
});
