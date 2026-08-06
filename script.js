// =========================================================
// SVB-MV – Sachverständigenbüro Bernd Hackbarth
// script.js
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------
  // Hamburger-Menü
  // -------------------------------------------------------

  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector("header nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("nav-open");

      menuButton.classList.toggle("menu-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("nav-open");
        menuButton.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // -------------------------------------------------------
  // Leistungskarten beim Scrollen einblenden
  // -------------------------------------------------------

  const cards = document.querySelectorAll(".card");

  if ("IntersectionObserver" in window) {
    const cardObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    cards.forEach((card) => {
      cardObserver.observe(card);
    });
  } else {
    cards.forEach((card) => {
      card.classList.add("show");
    });
  }

  // -------------------------------------------------------
  // Automatischer Wechsel des Titelbildes
  // -------------------------------------------------------

  const heroImage = document.querySelector(".hero > img");

  const heroImages = [
    "images/hero.jpg",
    "images/unfall.jpg",
    "images/trecker.jpg",
    "images/boot.jpg"
  ];

  let currentHeroImage = 0;

  if (heroImage) {
    window.setInterval(() => {
      currentHeroImage =
        (currentHeroImage + 1) % heroImages.length;

      heroImage.classList.add("hero-image-fade");

      window.setTimeout(() => {
        heroImage.src = heroImages[currentHeroImage];
        heroImage.classList.remove("hero-image-fade");
      }, 350);
    }, 7000);
  }

  // -------------------------------------------------------
  // Aktuelles Jahr im Footer
  // -------------------------------------------------------

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
