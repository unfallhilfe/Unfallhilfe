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
  // Einsatzgebiet – Bild in Großansicht öffnen
  // -------------------------------------------------------

  const serviceAreaButton = document.querySelector(
    ".service-area-image-button"
  );

  const imageLightbox = document.querySelector(
    ".image-lightbox"
  );

  const lightboxCloseButton = document.querySelector(
    ".image-lightbox-close"
  );

  const openLightbox = () => {
    if (!imageLightbox) {
      return;
    }

    imageLightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");

    imageLightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    if (lightboxCloseButton) {
      lightboxCloseButton.focus();
    }
  };


  const closeLightbox = () => {
    if (!imageLightbox) {
      return;
    }

    imageLightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");

    imageLightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    if (serviceAreaButton) {
      serviceAreaButton.focus();
    }
  };


  if (serviceAreaButton && imageLightbox) {
    serviceAreaButton.addEventListener(
      "click",
      openLightbox
    );
  }


  if (lightboxCloseButton) {
    lightboxCloseButton.addEventListener(
      "click",
      closeLightbox
    );
  }


  if (imageLightbox) {
    imageLightbox.addEventListener(
      "click",
      (event) => {
        if (event.target === imageLightbox) {
          closeLightbox();
        }
      }
    );
  }


  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        imageLightbox &&
        imageLightbox.classList.contains("is-open")
      ) {
        closeLightbox();
      }
    }
  );


  // -------------------------------------------------------
  // Aktuelles Jahr im Footer
  // -------------------------------------------------------

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }
});
