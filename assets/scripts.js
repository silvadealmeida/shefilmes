/* /assets/scripts.js
   All comments in English for future devs. */

/* ---------- Theme toggle (Bootstrap 5.3) ---------- */
(() => {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-bs-theme', saved);
  const btn = document.getElementById('themeToggle');
  btn && btn.addEventListener('click', () => {
    const next = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* ---------- Simple i18n (PT/EN) ---------- */
(() => {
  window.dict = {
    pt: {
      'nav.portfolio': 'Portfólio',
      'nav.services': 'Serviços',
      'nav.about': 'Sobre',
      'nav.contact': 'Contato',
      'hero.tag': 'Produtora de audiovisual',
      'hero.title': 'She Filmes — contando histórias',
      'hero.lead': 'Casamentos, redes sociais e comerciais de TV com um olhar feminino e cinematográfico.',
      'cta.viewPortfolio': 'Ver portfólio',
      'cta.contact': 'Fale com a gente',
      'cta.startProject': 'Começar um projeto',
      'portfolio.tag': 'Portfólio',
      'portfolio.title': 'Histórias em vídeo',
      'portfolio.weddings': 'Casamentos',
      'portfolio.social': 'Redes sociais',
      'portfolio.tv': 'Comerciais de TV',
      'portfolio.igNote': 'Para Reels, cole a URL pública do post do Instagram no atributo data-instagram-url.',
      'services.tag': 'Serviços',
      'services.title': 'Do roteiro ao corte final',
      'services.lead': 'Atendimento completo para capturar e editar histórias com qualidade cinematográfica.',
      'services.weddings.title': 'Casamentos',
      'services.weddings.desc': 'Registros emocionantes do seu grande dia em filmes que atravessam o tempo.',
      'services.social.title': 'Redes sociais',
      'services.social.desc': 'Conteúdo vertical, clipes curtos, motion e edições ágeis para engajar.',
      'services.tv.title': 'Comerciais de TV',
      'services.tv.desc': 'Produção de peças publicitárias com qualidade de broadcast.',
      'about.tag': 'Sobre',
      'about.title': 'Mais mulheres no audiovisual',
      'about.body': 'A She Filmes é uma produtora que promove protagonismo feminino em todas as etapas — da direção à pós. Nosso olhar é humano, técnico e sensível.',
      'contact.title': 'Vamos contar a sua história?',
      'contact.lead': 'Envie uma mensagem e retornaremos em até 1 dia útil.',
      'contact.form.name': 'Nome',
      'contact.form.email': 'E-mail',
      'contact.form.message': 'Mensagem',
      'contact.form.send': 'Enviar',
      'footer.tag': 'contando histórias'
    },
    en: {
      'nav.portfolio': 'Portfolio',
      'nav.services': 'Services',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.tag': 'Film production',
      'hero.title': 'She Filmes — telling stories',
      'hero.lead': 'Weddings, social media and TV commercials with a feminine, cinematic eye.',
      'cta.viewPortfolio': 'View portfolio',
      'cta.contact': 'Contact us',
      'cta.startProject': 'Start a project',
      'portfolio.tag': 'Portfolio',
      'portfolio.title': 'Stories in motion',
      'portfolio.weddings': 'Weddings',
      'portfolio.social': 'Social media',
      'portfolio.tv': 'TV commercials',
      'portfolio.igNote': 'For Reels, paste the public Instagram post URL into the data-instagram-url attribute.',
      'services.tag': 'Services',
      'services.title': 'From script to final cut',
      'services.lead': 'End-to-end production to capture and edit stories with cinematic quality.',
      'services.weddings.title': 'Weddings',
      'services.weddings.desc': 'Emotional records of your big day in films that stand the test of time.',
      'services.social.title': 'Social media',
      'services.social.desc': 'Vertical content, short clips, motion and fast edits for engagement.',
      'services.tv.title': 'TV commercials',
      'services.tv.desc': 'Production of advertising pieces with broadcast quality.',
      'about.tag': 'About',
      'about.title': 'More women in film',
      'about.body': 'She Filmes promotes female leadership across all stages — from directing to post. Our gaze is human, technical and sensitive.',
      'contact.title': 'Shall we tell your story?',
      'contact.lead': 'Send a message and we will reply within 1 business day.',
      'contact.form.name': 'Name',
      'contact.form.email': 'Email',
      'contact.form.message': 'Message',
      'contact.form.send': 'Send',
      'footer.tag': 'telling stories'
    }
  };

  const langButtons = document.querySelectorAll('[data-lang]');
  const langLabel = document.getElementById('langLabel');

  const apply = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (window.dict[lang] && window.dict[lang][k]) el.textContent = window.dict[lang][k];
    });
    langLabel && (langLabel.textContent = lang.toUpperCase());
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
  };

  apply(localStorage.getItem('lang') || 'pt');
  langButtons.forEach(b => b.addEventListener('click', () => apply(b.dataset.lang)));
})();

/* ---------- Video modal (YouTube + Instagram) ---------- */
(() => {
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('videoContainer');

  const openYouTube = (id) => {
    const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    container.classList.add('ratio', 'ratio-16x9');
    container.innerHTML = `<iframe width="560" height="315" src="${src}" title="YouTube video" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>`;
  };

  const openInstagram = (url) => {
    container.classList.remove('ratio', 'ratio-16x9');
    container.innerHTML = `<div class="d-flex justify-content-center">
      <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14"
        style="background:#000; border:0; margin:0; max-width:540px; width:100%;"></blockquote>
    </div>`;
    if (window.instgrm?.Embeds?.process) window.instgrm.Embeds.process();
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-video-type]');
    if (!btn) return;
    const type = btn.getAttribute('data-video-type');
    if (type === 'youtube') openYouTube(btn.getAttribute('data-video-id'));
    if (type === 'instagram') openInstagram(btn.getAttribute('data-instagram-url'));
  }, { passive: true });

  modal && modal.addEventListener('hidden.bs.modal', () => {
    container.innerHTML = '';
    container.classList.add('ratio', 'ratio-16x9');
  });
})();

/* ---------- Netflix-like horizontal carousel (edges + swipe) ---------- */
(() => {
  const makeCarousel = (root) => {
    const track = root.querySelector('.hf-track');
    const leftEdge = root.querySelector('.hf-edge--left');
    const rightEdge = root.querySelector('.hf-edge--right');
    if (!track || !leftEdge || !rightEdge) return;

    const step = () => Math.round(track.clientWidth * 0.9);

    const updateEdges = () => {
      const maxScroll = track.scrollWidth - track.clientWidth - 1;
      leftEdge.style.visibility  = track.scrollLeft <= 0 ? 'hidden' : 'visible';
      rightEdge.style.visibility = track.scrollLeft >= maxScroll ? 'hidden' : 'visible';
    };

    const scrollLeft = () => track.scrollBy({ left: -step(), behavior: 'smooth' });
    const scrollRight = () => track.scrollBy({ left: step(), behavior: 'smooth' });

    leftEdge.addEventListener('click', scrollLeft);
    rightEdge.addEventListener('click', scrollRight);

    // Keyboard support
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); scrollRight(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollLeft(); }
    });

    // Horizontal wheel (desktop trackpads)
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      track.scrollBy({ left: e.deltaX, behavior: 'auto' });
    }, { passive: false });

    track.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);

    updateEdges();
  };

  document.querySelectorAll('[data-carousel]').forEach(makeCarousel);
})();
