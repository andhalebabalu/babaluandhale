/* ============================================================
   ANIMATIONS.JS — GSAP Animations & ScrollTrigger
   ============================================================ */

/* Wait for GSAP + DOM + components to be ready */
window.addEventListener('load', function () {

  if (typeof gsap === 'undefined') return;

  /* Register ScrollTrigger plugin */
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── AOS Init ─────────────────────────────────────────────── */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ── Loading Screen Exit ──────────────────────────────────── */
  /* Only auto-fade if NOT managed by a page-level script (e.g. typing animation) */
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen && !loadingScreen.hasAttribute('data-managed')) {
    gsap.to(loadingScreen, {
      opacity: 0,
      duration: 0.6,
      delay: 0.5,
      onComplete: () => loadingScreen.remove()
    });
  }

  /* ── Hero Entrance Animation ──────────────────────────────── */
  const heroBadge   = document.querySelector('.hero-badge');
  const heroTitle   = document.querySelector('.hero-title');
  const heroSub     = document.querySelector('.hero-subtitle');
  const heroDesc    = document.querySelector('.hero-desc');
  const heroCTAs    = document.querySelector('.hero-ctas');
  const heroImage   = document.querySelector('.hero-image');
  const heroStats   = document.querySelectorAll('.hero-stat');

  if (heroTitle) {
    /* clearProps removes all inline styles GSAP set once animation ends,
       so no stale opacity/transform values can conflict with CSS transitions later */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });

    if (heroBadge)  tl.from(heroBadge,  { y: 30, opacity: 0, duration: 0.6 });
    if (heroTitle)  tl.from(heroTitle,  { y: 60, opacity: 0, duration: 0.8 }, '-=0.2');
    if (heroSub)    tl.from(heroSub,    { y: 40, opacity: 0, duration: 0.7 }, '-=0.4');
    if (heroDesc)   tl.from(heroDesc,   { y: 30, opacity: 0, duration: 0.6 }, '-=0.3');
    if (heroCTAs)   tl.from(heroCTAs,  { y: 30, opacity: 0, duration: 0.6 }, '-=0.2');
    if (heroImage)  tl.from(heroImage,  { x: 60, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.8');
    if (heroStats.length) {
      tl.from(heroStats, { y: 30, opacity: 0, stagger: 0.12, duration: 0.5 }, '-=0.4');
    }
  }

  /* Navbar is always visible — no entrance animation needed.
     (Loading screen masks it on homepage; sub-pages show it immediately.) */

  /* ── Page Hero (sub-pages) ────────────────────────────────── */
  const pageHeroContent = document.querySelector('.page-hero-content');
  if (pageHeroContent) {
    gsap.from(pageHeroContent.children, {
      y: 50, opacity: 0,
      stagger: 0.15, duration: 0.8,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  /* ── Scroll-triggered animations ─────────────────────────── */
  /* NOTE: immediateRender:false on all scroll-triggered gsap.from() calls so
     elements remain visible at page load and only animate when their trigger
     fires — prevents the "content invisible" bug caused by GSAP pre-setting
     opacity:0 before the ScrollTrigger threshold is ever crossed. */

  if (typeof ScrollTrigger !== 'undefined') {

    /* ── Section Title Reveal ─────────────────────────────────── */
    gsap.utils.toArray('.section-reveal').forEach(section => {
      const badge = section.querySelector('.section-badge');
      const title = section.querySelector('.section-title');
      const sub   = section.querySelector('.section-sub');

      const els = [badge, title, sub].filter(Boolean);
      if (!els.length) return;

      gsap.from(els, {
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        y: 50, opacity: 0,
        immediateRender: false,
        stagger: 0.15, duration: 0.8, ease: 'power3.out'
      });
    });

    /* ── Staggered Card Reveal ──────────────────────────────── */
    gsap.utils.toArray('.cards-reveal').forEach(container => {
      const cards = container.querySelectorAll('[data-card]');
      if (!cards.length) return;
      gsap.from(cards, {
        scrollTrigger: { trigger: container, start: 'top 88%', once: true },
        y: 60, opacity: 0,
        immediateRender: false,
        stagger: 0.1, duration: 0.7, ease: 'power3.out'
      });
    });

    /* ── Timeline Items ─────────────────────────────────────── */
    /* Skip items that AOS is already handling (data-aos present) */
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      if (item.hasAttribute('data-aos')) return;
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        x: i % 2 === 0 ? -60 : 60,
        opacity: 0,
        immediateRender: false,
        duration: 0.8, ease: 'power3.out'
      });
    });

    /* ── Stat Counter Cards ─────────────────────────────────── */
    gsap.utils.toArray('.stat-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        y: 40, opacity: 0,
        immediateRender: false,
        duration: 0.6, delay: i * 0.1, ease: 'power3.out'
      });
    });

    /* ── Skill Category Reveal ──────────────────────────────── */
    gsap.utils.toArray('.skill-category').forEach(cat => {
      gsap.from(cat, {
        scrollTrigger: { trigger: cat, start: 'top 85%', once: true },
        y: 40, opacity: 0,
        immediateRender: false,
        duration: 0.7, ease: 'power3.out'
      });
    });

    /* ── Generic fade-up for .gsap-fade-up ─────────────────── */
    gsap.utils.toArray('.gsap-fade-up').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        y: 40, opacity: 0,
        immediateRender: false,
        duration: 0.7, delay: (el.dataset.delay || 0) / 1000,
        ease: 'power3.out'
      });
    });

    /* ── Parallax Sections ──────────────────────────────────── */
    gsap.utils.toArray('.parallax-section').forEach(section => {
      const inner = section.querySelector('.parallax-inner');
      if (!inner) return;
      gsap.to(inner, {
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '-15%',
        ease: 'none'
      });
    });

    /* ── Service Cards Stagger ──────────────────────────────── */
    const serviceGrid = document.querySelector('.service-grid');
    if (serviceGrid) {
      gsap.from(serviceGrid.querySelectorAll('.service-card'), {
        scrollTrigger: { trigger: serviceGrid, start: 'top 85%', once: true },
        y: 50, opacity: 0,
        immediateRender: false,
        stagger: 0.08, duration: 0.7, ease: 'power3.out'
      });
    }

    /* ── Process Steps ──────────────────────────────────────── */
    const processRow = document.querySelector('.process-row');
    if (processRow) {
      gsap.from(processRow.querySelectorAll('.process-step'), {
        scrollTrigger: { trigger: processRow, start: 'top 85%', once: true },
        y: 50, opacity: 0, scale: 0.95,
        immediateRender: false,
        stagger: 0.12, duration: 0.7, ease: 'back.out(1.7)'
      });
    }

    /* ── Testimonial Cards ──────────────────────────────────── */
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        y: 40, opacity: 0,
        immediateRender: false,
        duration: 0.7, delay: i * 0.1, ease: 'power3.out'
      });
    });

    /* ── CTA Section ────────────────────────────────────────── */
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      gsap.from(ctaSection.querySelectorAll('*'), {
        scrollTrigger: { trigger: ctaSection, start: 'top 85%', once: true },
        y: 40, opacity: 0,
        immediateRender: false,
        stagger: 0.1, duration: 0.7, ease: 'power3.out'
      });
    }

    /* Recalculate trigger positions after everything renders */
    ScrollTrigger.refresh();

  } // end ScrollTrigger block

  /* ── Button Hover Magnetism ───────────────────────────────── */
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const rect   = this.getBoundingClientRect();
      const x      = e.clientX - rect.left - rect.width  / 2;
      const y      = e.clientY - rect.top  - rect.height / 2;
      const factor = 0.25;
      gsap.to(this, { x: x * factor, y: y * factor, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', function () {
      gsap.to(this, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    });
  });

  /* ── Floating Avatar (about page) ────────────────────────── */
  const avatar = document.querySelector('.avatar-float');
  if (avatar) {
    gsap.to(avatar, {
      y: -20,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }

  /* ── Orb Animations (hero) ────────────────────────────────── */
  gsap.utils.toArray('.orb').forEach((orb, i) => {
    gsap.to(orb, {
      x: `random(-30, 30)`,
      y: `random(-30, 30)`,
      duration: `random(4, 8)`,
      repeat: -1, yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.8
    });
  });

});
