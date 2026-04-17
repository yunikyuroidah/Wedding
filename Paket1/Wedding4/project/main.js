// Copy Gift Number
function copyText(text) {
  navigator.clipboard.writeText(text);
  alert("Nomor berhasil disalin: " + text);
}

// Share Invitation
function shareInvitation() {
  if (navigator.share) {
    navigator.share({
      title: "Undangan Bella & Kevin",
      text: "Dengan penuh kebahagiaan, kami mengundang Anda hadir di hari spesial kami ❤️",
      url: window.location.href
    });
  } else {
    alert("Fitur share tidak didukung, silakan copy link manual.");
  }
}

// Guestbook
const guestbookForm = document.querySelector(".guestbook-form");
const messagesDiv = document.getElementById("messages");

guestbookForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = guestbookForm.querySelector("input").value;
  const message = guestbookForm.querySelector("textarea").value;

  const div = document.createElement("div");
  div.classList.add("msg");
  div.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
  messagesDiv.prepend(div);

  guestbookForm.reset();
});

// Lightbox Gallery
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    const bg = item.style.backgroundImage;
    const src = bg.slice(5, -2);
    lightbox.style.display = "block";
    lightboxImg.src = src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Countdown logic
(function setupCountdown(){
  const target = new Date('January 25, 2026 09:00:00').getTime();
  const ids = ['days','hours','minutes','seconds'];
  function render(){
    const now = Date.now();
    let dist = target - now;
    if (dist < 0) dist = 0;
    const d = Math.floor(dist / (1000*60*60*24));
    const h = Math.floor((dist % (1000*60*60*24)) / (1000*60*60));
    const m = Math.floor((dist % (1000*60*60)) / (1000*60));
    const s = Math.floor((dist % (1000*60)) / 1000);
    const vals = [d,h,m,s].map(v=>String(v).padStart(2,'0'));
    ids.forEach((id,i)=>{ const el=document.getElementById(id); if(el) el.textContent = vals[i]; });
  }
  render();
  setInterval(render,1000);
})();

// Music control
(function musicControl(){
  const btn = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  const promptEl = document.getElementById('musicPrompt');
  if(!btn || !audio) return;
  function update(){ btn.textContent = audio.paused ? '🔇' : '🔊'; }

  // Try autoplay ASAP (muted allowed by most browsers)
  const tryAutoplay = async () => {
    try {
      // Ensure muted for initial autoplay compliance
      audio.muted = true;
      audio.volume = 1; // make sure volume isn't at 0
      await audio.play();
      // After a short delay, attempt to unmute if allowed
      setTimeout(()=>{ audio.muted = false; update(); }, 300);
      update();
    } catch (e) {
      // Show a gentle prompt to tap for sound
      if (promptEl) {
        promptEl.style.display = 'block';
      }
    }
  };

  // First interaction: unmute and play
  const unlock = async () => {
    try {
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
    } catch {}
    update();
    if (promptEl) promptEl.style.display = 'none';
    removeUnlockers();
  };

  function addUnlockers(){
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('keydown', unlock, { once: true });
  }
  function removeUnlockers(){
    window.removeEventListener('pointerdown', unlock, { once: true });
    window.removeEventListener('click', unlock, { once: true });
    window.removeEventListener('touchstart', unlock, { once: true, passive: true });
    document.removeEventListener('keydown', unlock, { once: true });
  }

  btn.addEventListener('click', async ()=>{
    try { audio.muted = false; audio.volume = 1; if(audio.paused) await audio.play(); else audio.pause(); }
    catch {}
    update();
    if (promptEl) promptEl.style.display = 'none';
    removeUnlockers();
  });
  audio.addEventListener('play', update); audio.addEventListener('pause', update);
  addUnlockers();

  // If page becomes visible later (e.g., after switching tabs), retry
  document.addEventListener('visibilitychange', ()=>{
    if (document.visibilityState === 'visible' && audio.paused) {
      tryAutoplay();
    }
  });

  tryAutoplay();
  update();
})();
