// === SUPABASE CONFIG ===
const SUPABASE_URL = 'https://ylsaoedrxmiiaplujxcc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_URkwnnqxMvF1CUgCy_BHXg_WKXWEEx7';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === LOAD REVIEWS ===
async function loadReviews(){
  const list = document.getElementById('reviewsList');
  
  const { data, error } = await supabaseClient
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if(error){
  list.innerHTML = `<p class="loading-text">Error: ${error.message}</p>`;
  return;
}
if(!data || data.length === 0){
  list.innerHTML = `<p class="loading-text">No reviews yet. Be the first!</p>`;
  return;
}

  list.innerHTML = data.map(r => `
    <div class="review-card">
      <div class="review-head">
        <strong>${r.name}</strong>
        <span>${'★'.repeat(r.stars)}</span>
      </div>
      <p class="review-text">${r.text}</p>
      <small class="review-date">${new Date(r.created_at).toLocaleDateString()}</small>
    </div>
  `).join('');
}

loadReviews();

// Realtime auto-update
supabaseClient.channel('reviews-live')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reviews' }, loadReviews)
  .subscribe();