// =========================================================
// SKRAM website - interactie
// =========================================================

// ---------- Header krijgt achtergrond bij scrollen ----------
const header = document.querySelector('.site-header');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// ---------- Mobiel menu ----------
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function setMenu(open) {
  navMenu.classList.toggle('open', open);
  header.classList.toggle('menu-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
}

navToggle.addEventListener('click', () => {
  setMenu(!navMenu.classList.contains('open'));
});

// Sluit het menu zodra er op een link wordt geklikt
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// ---------- Actieve menulink markeren ----------
const navLinks = document.querySelectorAll('.nav-menu a:not(.btn)');
const sections = document.querySelectorAll('main section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((section) => sectionObserver.observe(section));

// ---------- Elementen laten verschijnen bij scrollen ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Foto's vergroten (galerij) ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());

// Klik naast de foto sluit hem ook
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

// ---------- Jaartal in de footer ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Contactformulier ----------
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const accessKey = form.querySelector('[name="access_key"]').value;
  if (accessKey.startsWith('VUL-HIER')) {
    showStatus('Het formulier is nog niet gekoppeld. Mail ons in de tussentijd via skram.deband@outlook.com.', 'error');
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Bezig met versturen…';
  showStatus('', '');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });
    const result = await response.json();

    if (response.ok && result.success) {
      form.reset();
      showStatus('Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.', 'success');
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    showStatus('Er ging iets mis bij het versturen. Probeer het later opnieuw of mail ons direct.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Verstuur bericht';
  }
});

function showStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = 'form-status' + (type ? ' ' + type : '');
}
