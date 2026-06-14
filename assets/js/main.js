/* ============================================================
   MAIN.JS — Core Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Loading Screen ─────────────────────────────────────── */
  const loader = document.getElementById('loading-screen');
  if (loader && !loader.hasAttribute('data-managed')) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => loader.remove(), 500);
      }, 600);
    });
  }

  /* ── Navbar Scroll Effect ────────────────────────────────── */
  function handleNavbarScroll() {
    const nav = document.getElementById('main-navbar');
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* ── Active Nav Link ─────────────────────────────────────── */
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('/').pop();
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  // Delay to allow components.js to inject navbar
  setTimeout(setActiveNavLink, 100);

  /* ── Mobile Menu Toggle ──────────────────────────────────── */
  document.addEventListener('click', function (e) {
    const btn  = e.target.closest('#hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    const ham  = document.getElementById('hamburger-btn');

    if (btn && menu && ham) {
      const isOpen = menu.classList.toggle('open');
      ham.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      return;
    }

    // Close on outside click
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger  = document.getElementById('hamburger-btn');
    if (mobileMenu && hamburger && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu on link click
  document.addEventListener('click', function (e) {
    if (e.target.closest('.mobile-nav-link')) {
      const menu = document.getElementById('mobile-menu');
      const ham  = document.getElementById('hamburger-btn');
      if (menu) menu.classList.remove('open');
      if (ham)  ham.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* ── Back to Top ─────────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    if (e.target.closest('#back-to-top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('scroll', function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  /* ── Typing Animation (Hero) ─────────────────────────────── */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const words = [
      'Senior Laravel Developer',
      'Backend Team Lead',
      'Full-Stack Developer',
      'SaaS Architect',
      'API Engineer'
    ];
    let wordIdx = 0, charIdx = 0, deleting = false;

    function typeNext() {
      const word = words[wordIdx];
      if (!deleting) {
        typingEl.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) {
          deleting = true;
          return setTimeout(typeNext, 2000);
        }
      } else {
        typingEl.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      setTimeout(typeNext, deleting ? 60 : 110);
    }
    typeNext();
  }

  /* ── Animated Counters ───────────────────────────────────── */
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 2000;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* Trigger counters when they enter viewport */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
  }

  /* ── Skill Bars ──────────────────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width + '%';
          obs.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach(b => obs.observe(b));
  }

  /* ── Project Filter (projects.html) ─────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const cat = this.dataset.filter;

        projectCards.forEach(card => {
          const show = cat === 'all' || card.dataset.category.includes(cat);
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          if (show) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.display = '';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              if (!card.dataset.category.includes(
                document.querySelector('.filter-btn.active')?.dataset.filter || 'all'
              ) || (document.querySelector('.filter-btn.active')?.dataset.filter === 'all')) {
                /* do nothing */
              }
            }, 300);
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── Project Search ──────────────────────────────────────── */
  const searchInput = document.getElementById('project-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      projectCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

  /* ── Contact Form Validation ─────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const fields = {
      name:    { el: document.getElementById('name'),    errId: 'name-error',    rule: v => v.trim().length >= 2,   msg: 'Name must be at least 2 characters.' },
      email:   { el: document.getElementById('email'),   errId: 'email-error',   rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
      subject: { el: document.getElementById('subject'), errId: 'subject-error', rule: v => v.trim().length >= 3,   msg: 'Subject must be at least 3 characters.' },
      message: { el: document.getElementById('message'), errId: 'message-error', rule: v => v.trim().length >= 20,  msg: 'Message must be at least 20 characters.' }
    };

    function showError(f, msg) {
      if (!f.el) return;
      f.el.classList.add('error');
      const errEl = document.getElementById(f.errId);
      if (errEl) { errEl.textContent = msg; errEl.classList.add('show'); }
    }
    function clearError(f) {
      if (!f.el) return;
      f.el.classList.remove('error');
      const errEl = document.getElementById(f.errId);
      if (errEl) errEl.classList.remove('show');
    }

    // Real-time validation
    Object.values(fields).forEach(f => {
      if (!f.el) return;
      f.el.addEventListener('blur', () => {
        if (!f.rule(f.el.value)) showError(f, f.msg);
        else clearError(f);
      });
      f.el.addEventListener('input', () => {
        if (f.el.classList.contains('error') && f.rule(f.el.value)) clearError(f);
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      Object.values(fields).forEach(f => {
        if (!f.el) return;
        if (!f.rule(f.el.value)) { showError(f, f.msg); valid = false; }
        else clearError(f);
      });

      if (valid) {
        const btn = this.querySelector('[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        btn.disabled = true;

        // Simulate submission (replace with real endpoint)
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = 'var(--color-success)';
          contactForm.reset();
          setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            btn.style.background = '';
          }, 3000);
        }, 1500);
      }
    });
  }

  /* ── Smooth Anchor Scroll ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Parallax (hero elements) ────────────────────────────── */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }, { passive: true });
  }

});
