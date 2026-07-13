// ===== LANGUAGE SWITCHER (ID / EN) =====
(function () {
  var STORAGE_KEY = 'nabila-portfolio-lang';
  var root = document.documentElement;
  var translatable = document.querySelectorAll('[data-id][data-en]');
  var langButtons = document.querySelectorAll('.lang-btn');

  function applyLang(lang) {
    if (lang !== 'id' && lang !== 'en') lang = 'en';

    translatable.forEach(function (el) {
      el.textContent = el.dataset[lang];
    });

    langButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    root.setAttribute('lang', lang);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage unavailable (e.g. private browsing) — fail silently
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.dataset.lang);
    });
  });

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }

  applyLang(saved || 'en');
})();

// ===== CV DOWNLOAD MODAL =====
(function () {
  var trigger = document.getElementById('downloadCvBtn');
  var modal = document.getElementById('cvModal');
  if (!trigger || !modal) return;

  var closeBtn = document.getElementById('cvModalClose');
  var cancelBtn = document.getElementById('cvModalCancel');
  var downloadBtn = document.getElementById('cvDownloadBtn');

  function openModal(e) {
    e.preventDefault();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  downloadBtn.addEventListener('click', function () {
    setTimeout(closeModal, 300);
  });
})();
