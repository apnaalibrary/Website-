/* =========================================================================
   APNA LIBRARY — Supabase Connection
   -------------------------------------------------------------------------
   YAHAN APNI 2 CHEEZEIN DAALNI HAIN (Supabase Dashboard → Settings → API):
   1. SUPABASE_URL   → "Project URL"
   2. SUPABASE_ANON_KEY → "anon public" key

   Ye dono values SECRET password nahi hain — inhe public frontend code mein
   rakhna safe hai, kyunki actual security "Row Level Security" (RLS) rules
   se hoti hai jo supabase-schema.sql mein already set hain.
   ========================================================================= */

const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

let supabaseClient = null;
function getSupabase(){
  if(!supabaseClient && window.supabase){
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}
