const revealTargets = document.querySelectorAll('.reveal');

const onReveal = (entries, observer) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }
};

const io = new IntersectionObserver(onReveal, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

for (const el of revealTargets) {
  io.observe(el);
}

const workCards = document.querySelectorAll('.work-card[data-video]');
const videoModal = document.getElementById('videoModal');
const caseVideoPlayer = document.getElementById('caseVideoPlayer');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

const closeVideoModal = () => {
  if (!videoModal || !caseVideoPlayer) return;
  videoModal.classList.remove('is-open');
  videoModal.setAttribute('aria-hidden', 'true');
  caseVideoPlayer.pause();
  caseVideoPlayer.removeAttribute('src');
  caseVideoPlayer.load();
  document.body.style.overflow = '';
};

const openVideoModal = (videoSrc) => {
  if (!videoModal || !caseVideoPlayer || !videoSrc) return;
  caseVideoPlayer.src = videoSrc;
  videoModal.classList.add('is-open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  caseVideoPlayer.play().catch(() => {
    // Some browsers block autoplay; controls remain available for manual play.
  });
};

for (const card of workCards) {
  const src = card.getAttribute('data-video');

  card.addEventListener('click', () => {
    openVideoModal(src);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openVideoModal(src);
    }
  });
}

for (const closeButton of closeModalButtons) {
  closeButton.addEventListener('click', closeVideoModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoModal?.classList.contains('is-open')) {
    closeVideoModal();
  }
});

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const oldText = btn.textContent;
    btn.textContent = '已收到，我们会尽快联系你';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = oldText;
      btn.disabled = false;
      form.reset();
    }, 2600);
  });
}
