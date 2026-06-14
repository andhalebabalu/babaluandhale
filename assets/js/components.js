/* ============================================================
   COMPONENTS.JS — Shared Navbar & Footer Injection
   ============================================================ */

const SITE = {
  name: 'Babalu Andhale',
  role: 'Senior Laravel Developer',
  email: 'babalu0607@gmail.com',
  phone: '+91 9370790019',
  location: 'Navi Mumbai, Maharashtra, India',
  linkedin: 'https://linkedin.com/in/babalu-andhale-238583237',
  github: 'https://github.com/andhalebabalu',
  whatsapp: 'https://wa.me/919370790019'
};

/* ─── Determine root path based on current page ─── */
function getRootPath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : './';
}

/* ─── Navbar HTML ─── */
function getNavbarHTML() {
  const r = getRootPath();
  const pages = [
    { href: `${r}index.html`,          label: 'Home' },
    { href: `${r}about.html`,          label: 'About' },
    { href: `${r}experience.html`,     label: 'Experience' },
    { href: `${r}projects.html`,       label: 'Projects' },
    { href: `${r}skills.html`,         label: 'Skills' },
    { href: `${r}certifications.html`, label: 'Certifications' },
    { href: `${r}services.html`,       label: 'Services' },
    { href: `${r}contact.html`,        label: 'Contact' },
  ];

  const navLinks = pages.map(p => `
    <a href="${p.href}" class="nav-link">${p.label}</a>
  `).join('');

  const mobileLinks = pages.map(p => `
    <a href="${p.href}" class="mobile-nav-link">${p.label}</a>
  `).join('');

  return `
  <nav id="main-navbar" class="glass-nav">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18" style="height:72px">
        <!-- Logo -->
        <a href="${r}index.html" class="flex items-center gap-3 group" style="text-decoration:none">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
               style="background: var(--gradient-primary); box-shadow: 0 0 20px rgba(124,58,237,0.4)">BA</div>
          <span class="font-bold text-lg text-white hidden sm:block" style="font-family:'Poppins',sans-serif">
            Babalu<span class="gradient-text">Andhale</span>
          </span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-7">
          ${navLinks}
        </div>

        <!-- CTA + Hamburger -->
        <div class="flex items-center gap-4">
          <a href="${r}contact.html" class="btn-primary btn-sm hidden md:inline-flex">
            <i class="fas fa-envelope"></i> Hire Me
          </a>
          <button class="hamburger lg:hidden" id="hamburger-btn" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div id="mobile-menu">
    <div class="space-y-1 mb-4">
      ${mobileLinks}
    </div>
    <div class="pt-4 border-t" style="border-color: var(--border-glass)">
      <a href="${r}contact.html" class="btn-primary w-full justify-center">
        <i class="fas fa-envelope"></i> Hire Me
      </a>
    </div>
  </div>
  `;
}

/* ─── Footer HTML ─── */
function getFooterHTML() {
  const r = getRootPath();
  const year = new Date().getFullYear();

  return `
  <footer style="background: linear-gradient(to top, #050510, #0a0a1e); border-top: 1px solid var(--border-glass)">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <!-- Brand -->
        <div class="lg:col-span-1">
          <a href="${r}index.html" class="flex items-center gap-3 mb-5" style="text-decoration:none">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                 style="background: var(--gradient-primary)">BA</div>
            <span class="font-bold text-xl text-white" style="font-family:'Poppins',sans-serif">
              Babalu<span class="gradient-text">Andhale</span>
            </span>
          </a>
          <p class="text-sm leading-relaxed mb-6" style="color: var(--text-muted)">
            Senior Laravel Developer & Backend Team Lead building scalable SaaS platforms,
            CRM systems, and high-performance REST APIs from Navi Mumbai.
          </p>
          <div class="flex gap-3">
            <a href="${SITE.linkedin}" target="_blank" rel="noopener" class="social-icon" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="${SITE.github}" target="_blank" rel="noopener" class="social-icon" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="${SITE.whatsapp}" target="_blank" rel="noopener" class="social-icon" aria-label="WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="mailto:${SITE.email}" class="social-icon" aria-label="Email">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-5" style="font-family:'Poppins',sans-serif">Quick Links</h4>
          <nav class="space-y-1">
            <a href="${r}index.html"          class="footer-link">Home</a>
            <a href="${r}about.html"          class="footer-link">About Me</a>
            <a href="${r}experience.html"     class="footer-link">Experience</a>
            <a href="${r}projects.html"       class="footer-link">Projects</a>
            <a href="${r}skills.html"         class="footer-link">Skills</a>
            <a href="${r}certifications.html" class="footer-link">Certifications</a>
          </nav>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-semibold text-white mb-5" style="font-family:'Poppins',sans-serif">Services</h4>
          <nav class="space-y-1">
            <a href="${r}services.html" class="footer-link">Laravel Development</a>
            <a href="${r}services.html" class="footer-link">SaaS Development</a>
            <a href="${r}services.html" class="footer-link">CRM Development</a>
            <a href="${r}services.html" class="footer-link">API Development</a>
            <a href="${r}services.html" class="footer-link">Payment Integration</a>
            <a href="${r}services.html" class="footer-link">DevOps & Deployment</a>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold text-white mb-5" style="font-family:'Poppins',sans-serif">Contact</h4>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                   style="background: rgba(124,58,237,0.15)">
                <i class="fas fa-envelope text-sm" style="color: var(--color-primary-light)"></i>
              </div>
              <div>
                <p class="text-xs mb-0.5" style="color: var(--text-muted)">Email</p>
                <a href="mailto:${SITE.email}" class="text-sm text-white hover:text-violet-400 transition-colors"
                   style="text-decoration:none">babalu0607@gmail.com</a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                   style="background: rgba(6,182,212,0.15)">
                <i class="fas fa-phone text-sm" style="color: var(--color-accent)"></i>
              </div>
              <div>
                <p class="text-xs mb-0.5" style="color: var(--text-muted)">Phone</p>
                <a href="tel:${SITE.phone}" class="text-sm text-white hover:text-cyan-400 transition-colors"
                   style="text-decoration:none">+91 9370790019</a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                   style="background: rgba(245,158,11,0.15)">
                <i class="fas fa-map-marker-alt text-sm" style="color: var(--color-gold)"></i>
              </div>
              <div>
                <p class="text-xs mb-0.5" style="color: var(--text-muted)">Location</p>
                <p class="text-sm text-white">Navi Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
           style="border-top: 1px solid var(--border-glass)">
        <p class="text-sm" style="color: var(--text-muted)">
          &copy; ${year} Babalu Andhale. All Rights Reserved.
        </p>
        <div class="flex gap-6">
          <a href="${r}contact.html" class="text-sm transition-colors" style="color: var(--text-muted); text-decoration:none">
            Privacy Policy
          </a>
          <a href="${r}contact.html" class="text-sm transition-colors" style="color: var(--text-muted); text-decoration:none">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Back to Top -->
  <button id="back-to-top" aria-label="Back to top">
    <i class="fas fa-chevron-up"></i>
  </button>
  `;
}

/* ─── Init Components ─── */
function initComponents() {
  const navEl  = document.getElementById('navbar-placeholder');
  const footEl = document.getElementById('footer-placeholder');
  if (navEl)  navEl.innerHTML  = getNavbarHTML();
  if (footEl) footEl.innerHTML = getFooterHTML();
}

/* Run on DOM ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  initComponents();
}
