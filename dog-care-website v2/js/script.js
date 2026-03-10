const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const langToggle = document.getElementById("lang-toggle");
const contactForm = document.querySelector(".contact-form");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

function applyLanguage(lang) {
  const isArabic = lang === "ar";

  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", isArabic);

  document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
    if (el.dataset.i18nPlaceholder === "true") {
      el.placeholder = isArabic ? el.dataset.ar : el.dataset.en;
    } else {
      el.textContent = isArabic ? el.dataset.ar : el.dataset.en;
    }
  });

  const title = isArabic
    ? document.body.getAttribute("data-title-ar")
    : document.body.getAttribute("data-title-en");

  if (title) {
    document.title = title;
  }

  if (langToggle) {
    langToggle.textContent = isArabic ? "English" : "العربية";
  }

  localStorage.setItem("siteLanguage", lang);
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    const currentLang = localStorage.getItem("siteLanguage") || "en";
    const newLang = currentLang === "en" ? "ar" : "en";
    applyLanguage(newLang);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentLang = localStorage.getItem("siteLanguage") || "en";

    if (currentLang === "ar") {
      alert("تم إرسال رسالتك بنجاح!");
    } else {
      alert("Your message has been sent successfully!");
    }

    contactForm.reset();
  });
}

const savedLanguage = localStorage.getItem("siteLanguage") || "en";
applyLanguage(savedLanguage);