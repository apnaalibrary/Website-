/* =========================================================================
   APNA LIBRARY — Admin Panel Logic
   Login (Supabase Auth) + CRUD for Exams, Notifications, Gallery, Settings
   + read-only Queries inbox.
   ========================================================================= */

const sb = getSupabase();

/* ---------- AUTH ---------- */
document.getElementById('login-btn').addEventListener('click', async ()=>{
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if(error){
    document.getElementById('login-error').style.display = 'block';
    document.getElementById('login-error').textContent = error.message;
    return;
  }
  showDashboard();
});

document.getElementById('logout-btn').addEventListener('click', async ()=>{
  await sb.auth.signOut();
  location.reload();
});

async function checkSession(){
  const { data } = await sb.auth.getSession();
  if(data.session){ showDashboard(); }
}

function showDashboard(){
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-shell').style.display = 'flex';
  loadOverview();
  loadExams();
  loadNotifications();
  loadGallery();
  loadQueries();
  loadSettings();
}

/* ---------- SIDEBAR NAV ---------- */
document.querySelectorAll('#sidebar-nav button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('#sidebar-nav button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-'+btn.dataset.panel).classList.add('active');
  });
});

/* ---------- OVERVIEW ---------- */
async function loadOverview(){
  const [exams, notifs, gallery, queries] = await Promise.all([
    sb.from('exams').select('id', { count: 'exact', head: true }),
    sb.from('notifications').select('id', { count: 'exact', head: true }),
    sb.from('gallery').select('id', { count: 'exact', head: true }),
    sb.from('queries').select('id', { count: 'exact', head: true }).eq('status','new')
  ]);
  document.getElementById('stat-exams').textContent = exams.count ?? 0;
  document.getElementById('stat-notifs').textContent = notifs.count ?? 0;
  document.getElementById('stat-gallery').textContent = gallery.count ?? 0;
  document.getElementById('stat-queries').textContent = queries.count ?? 0;
}

/* ---------- EXAMS CRUD ---------- */
const examForm = document.getElementById('exam-form');
document.getElementById('add-exam-btn').addEventListener('click', ()=>{
  examForm.reset();
  document.getElementById('exam-edit-id').value = '';
  document.getElementById('exam-id').disabled = false;
  examForm.style.display = 'block';
});
document.getElementById('cancel-exam-btn').addEventListener('click', ()=> examForm.style.display = 'none');

examForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const langObj = (prefix) => ({
    hg: document.getElementById(`${prefix}-hg`).value,
    en: document.getElementById(`${prefix}-en`).value,
    hi: document.getElementById(`${prefix}-hi`).value,
    bn: document.getElementById(`${prefix}-bn`).value,
    mr: document.getElementById(`${prefix}-mr`).value
  });
  const payload = {
    id: document.getElementById('exam-id').value.trim(),
    name: document.getElementById('exam-name-input').value,
    full_name: document.getElementById('exam-fullname-input').value,
    category: document.getElementById('exam-category-input').value,
    overview: langObj('exam-overview'),
    eligibility: langObj('exam-eligibility'),
    pattern: langObj('exam-pattern'),
    official_website: document.getElementById('exam-official-input').value,
    apply_link: document.getElementById('exam-apply-input').value,
    trending: document.getElementById('exam-trending-input').value === 'true',
    updated_at: new Date().toISOString()
  };
  const { error } = await sb.from('exams').upsert(payload);
  if(error){ alert('Error: ' + error.message); return; }
  examForm.style.display = 'none';
  loadExams(); loadOverview();
});

async function loadExams(){
  const { data, error } = await sb.from('exams').select('*').order('name');
  const tbody = document.getElementById('exams-table-body');
  if(error){ tbody.innerHTML = `<tr><td colspan="5">Error: ${error.message}</td></tr>`; return; }
  tbody.innerHTML = (data||[]).map(e=>`
    <tr>
      <td class="mono">${e.id}</td><td>${e.name}</td><td>${e.category}</td>
      <td>${e.trending ? '<span class="badge badge-yes">Yes</span>' : '—'}</td>
      <td class="row-actions">
        <button onclick="editExam('${e.id}')">Edit</button>
        <button class="del" onclick="deleteExam('${e.id}')">Delete</button>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="5">Koi exam nahi mila — "Add New Exam" se add karo.</td></tr>`;
  window._examsCache = data || [];
}

window.editExam = function(id){
  const e = window._examsCache.find(x=>x.id===id);
  if(!e) return;
  const fillLang = (prefix, obj) => {
    obj = obj || {};
    ['hg','en','hi','bn','mr'].forEach(l=>{
      const el = document.getElementById(`${prefix}-${l}`);
      if(el) el.value = obj[l] || '';
    });
  };
  document.getElementById('exam-edit-id').value = e.id;
  document.getElementById('exam-id').value = e.id;
  document.getElementById('exam-id').disabled = true;
  document.getElementById('exam-name-input').value = e.name || '';
  document.getElementById('exam-fullname-input').value = e.full_name || '';
  document.getElementById('exam-category-input').value = e.category || 'defence';
  fillLang('exam-overview', e.overview);
  fillLang('exam-eligibility', e.eligibility);
  fillLang('exam-pattern', e.pattern);
  document.getElementById('exam-official-input').value = e.official_website || '';
  document.getElementById('exam-apply-input').value = e.apply_link || '';
  document.getElementById('exam-trending-input').value = e.trending ? 'true' : 'false';
  examForm.style.display = 'block';
};

window.deleteExam = async function(id){
  if(!confirm(`"${id}" ko delete karna hai? Ye undo nahi ho sakta.`)) return;
  const { error } = await sb.from('exams').delete().eq('id', id);
  if(error){ alert('Error: ' + error.message); return; }
  loadExams(); loadOverview();
};

/* ---------- NOTIFICATIONS CRUD ---------- */
const notifForm = document.getElementById('notif-form');
document.getElementById('add-notif-btn').addEventListener('click', ()=>{
  notifForm.reset();
  document.getElementById('notif-edit-id').value = '';
  notifForm.style.display = 'block';
});
document.getElementById('cancel-notif-btn').addEventListener('click', ()=> notifForm.style.display='none');

notifForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const editId = document.getElementById('notif-edit-id').value;
  const payload = {
    title: document.getElementById('notif-title-input').value,
    exam_id: document.getElementById('notif-examid-input').value || null,
    tag: document.getElementById('notif-tag-input').value,
    pdf_url: document.getElementById('notif-pdf-input').value
  };
  const query = editId ? sb.from('notifications').update(payload).eq('id', editId) : sb.from('notifications').insert(payload);
  const { error } = await query;
  if(error){ alert('Error: ' + error.message); return; }
  notifForm.style.display = 'none';
  loadNotifications(); loadOverview();
});

async function loadNotifications(){
  const { data, error } = await sb.from('notifications').select('*').order('date', { ascending:false });
  const tbody = document.getElementById('notifs-table-body');
  if(error){ tbody.innerHTML = `<tr><td colspan="5">Error: ${error.message}</td></tr>`; return; }
  window._notifsCache = data || [];
  tbody.innerHTML = (data||[]).map(n=>`
    <tr>
      <td>${n.title}</td><td>${n.tag||''}</td><td class="mono">${n.exam_id||'—'}</td>
      <td class="mono">${(n.date||'').toString().slice(0,10)}</td>
      <td class="row-actions">
        <button onclick="editNotif('${n.id}')">Edit</button>
        <button class="del" onclick="deleteNotif('${n.id}')">Delete</button>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="5">Koi notification nahi hai.</td></tr>`;
}

window.editNotif = function(id){
  const n = window._notifsCache.find(x=>x.id===id);
  if(!n) return;
  document.getElementById('notif-edit-id').value = n.id;
  document.getElementById('notif-title-input').value = n.title || '';
  document.getElementById('notif-examid-input').value = n.exam_id || '';
  document.getElementById('notif-tag-input').value = n.tag || 'New';
  document.getElementById('notif-pdf-input').value = n.pdf_url || '';
  notifForm.style.display = 'block';
};

window.deleteNotif = async function(id){
  if(!confirm('Ye notification delete karna hai?')) return;
  const { error } = await sb.from('notifications').delete().eq('id', id);
  if(error){ alert('Error: ' + error.message); return; }
  loadNotifications(); loadOverview();
};

/* ---------- GALLERY (Supabase Storage upload) ---------- */
document.getElementById('gallery-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fileInput = document.getElementById('gallery-file-input');
  const file = fileInput.files[0];
  if(!file){ alert('Pehle ek image select karo'); return; }

  const fileName = `${Date.now()}-${file.name}`;
  const { error: uploadError } = await sb.storage.from('gallery').upload(fileName, file);
  if(uploadError){ alert('Upload error: ' + uploadError.message); return; }

  const { data: urlData } = sb.storage.from('gallery').getPublicUrl(fileName);
  const { error: dbError } = await sb.from('gallery').insert({
    url: urlData.publicUrl,
    caption: document.getElementById('gallery-caption-input').value,
    category: document.getElementById('gallery-category-input').value
  });
  if(dbError){ alert('Error: ' + dbError.message); return; }

  document.getElementById('gallery-form').reset();
  loadGallery(); loadOverview();
});

async function loadGallery(){
  const { data, error } = await sb.from('gallery').select('*').order('created_at', { ascending:false });
  const el = document.getElementById('gallery-admin-grid');
  if(error){ el.innerHTML = `Error: ${error.message}`; return; }
  el.innerHTML = (data||[]).map(g=>`
    <div style="position:relative">
      <img src="${g.url}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:2px" loading="lazy">
      <button onclick="deleteGalleryItem('${g.id}')" style="position:absolute;top:6px;right:6px;background:#7A1F2B;color:#fff;border:none;border-radius:50%;width:26px;height:26px;cursor:pointer">✕</button>
    </div>
  `).join('') || `<div class="gallery-empty">Abhi koi image upload nahi hui.</div>`;
}

window.deleteGalleryItem = async function(id){
  if(!confirm('Ye image delete karni hai?')) return;
  const { error } = await sb.from('gallery').delete().eq('id', id);
  if(error){ alert('Error: ' + error.message); return; }
  loadGallery(); loadOverview();
};

/* ---------- QUERIES (read-only inbox) ---------- */
async function loadQueries(){
  const { data, error } = await sb.from('queries').select('*').order('created_at', { ascending:false });
  const tbody = document.getElementById('queries-table-body');
  if(error){ tbody.innerHTML = `<tr><td colspan="5">Error: ${error.message}</td></tr>`; return; }
  tbody.innerHTML = (data||[]).map(q=>`
    <tr>
      <td>${q.name||''}</td><td>${q.mobile||''}</td><td>${q.exam_category||''}</td>
      <td>${q.message||''}</td><td class="mono">${(q.created_at||'').toString().slice(0,10)}</td>
    </tr>
  `).join('') || `<tr><td colspan="5">Abhi koi query nahi aayi.</td></tr>`;
}

/* ---------- SETTINGS ---------- */
async function loadSettings(){
  const { data, error } = await sb.from('site_settings').select('*').eq('id', 1).single();
  if(error || !data) return;
  document.getElementById('set-address').value = data.address || '';
  document.getElementById('set-phone').value = data.phone || '';
  document.getElementById('set-email').value = data.email || '';
  document.getElementById('set-whatsapp').value = data.whatsapp_number || '';
  document.getElementById('set-hours').value = data.working_hours || '';
  document.getElementById('set-director-msg').value = data.director_message || '';
  document.getElementById('set-director-name').value = data.director_name || '';
}

document.getElementById('settings-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const payload = {
    id: 1,
    address: document.getElementById('set-address').value,
    phone: document.getElementById('set-phone').value,
    email: document.getElementById('set-email').value,
    whatsapp_number: document.getElementById('set-whatsapp').value,
    working_hours: document.getElementById('set-hours').value,
    director_message: document.getElementById('set-director-msg').value,
    director_name: document.getElementById('set-director-name').value
  };
  const { error } = await sb.from('site_settings').upsert(payload);
  if(error){ alert('Error: ' + error.message); return; }
  alert('Settings saved!');
});

/* ---------- Boot ---------- */
if(sb){ checkSession(); } else {
  document.getElementById('login-error').style.display = 'block';
  document.getElementById('login-error').textContent = 'Supabase connect nahi hua — supabase-client.js mein URL/Key daalo.';
}
