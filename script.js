// ==========================================
// SVB-MV Sachverständigenbüro
// script.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  /* Hamburger-Menü */

  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector("nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const menuIsOpen = navigation.classList.toggle("nav-open");

      menuButton.setAttribute("aria-expanded", String(menuIsOpen));
      menuButton.classList.toggle("menu-open", menuIsOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("nav-open");
        menuButton.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Leistungskarten beim Scrollen einblenden */

  const cards = document.querySelectorAll(".card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, cardObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    cards.forEach((card) => card.classList.add("show"));
  }

  /* Automatischer Bildwechsel im Titelbereich */

  const heroImage = document.querySelector(".hero > img");

  const heroImages = [
    "images/hero.pgn",
    "images/unfall.pgn",
    "images/trecker.pgn",
    "images/boot.pgn"
  ];

  let currentHeroImage = 0;

  if (heroImage) {
    window.setInterval(() => {
      currentHeroImage = (currentHeroImage + 1) % heroImages.length;

      heroImage.classList.add("hero-image-fade");

      window.setTimeout(() => {
        heroImage.src = heroImages[currentHeroImage];
        heroImage.classList.remove("hero-image-fade");
      }, 350);
    }, 6000);
  }

  /* Copyright-Jahr automatisch einsetzen */

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
