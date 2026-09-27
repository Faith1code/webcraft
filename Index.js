// Close hamburger menu when you click any link
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('nav ul a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.checked = false;
  });
});

// Close when you scroll
window.addEventListener('scroll', () => {
  if (menuToggle.checked) {
    menuToggle.checked = false;
  }
});

// === SUPABASE CONFIG ===
const SUPABASE_URL = 'https://ylsaoedrxmiiaplujxcc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_URkwnnqxMvF1CUgCy_BHXg_WKXWEEx7';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === POST REVIEW ===
const reviewForm = document.getElementById('reviewForm');
if(reviewForm){
  reviewForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const btn = document.getElementById('reviewBtn');
    const successMsg = document.getElementById('reviewSuccess');
    btn.textContent = 'Posting...';
    btn.disabled = true;
    const name = document.getElementById('reviewName').value.trim();
    const stars = parseInt(document.getElementById('reviewStars').value);
    const text = document.getElementById('reviewText').value.trim();

    try {
      const { error } = await supabaseClient.from('reviews').insert([{ name, stars, text }]);
      if(error) throw error;
      
      successMsg.style.display = 'block';
      e.target.reset();
      setTimeout(()=> window.location.href='preview.html', 800);
    } catch(e) {
      alert('Error: ' + e.message);
      btn.textContent = 'Post Review';
      btn.disabled = false;
    }
  });
}