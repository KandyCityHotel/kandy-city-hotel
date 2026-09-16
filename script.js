```javascript
/* =========================================
   KANDY CITY HOTEL
   INTERACTIONS & ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LOADER
    ===================================== */

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hide");
        }, 1500);

    });


    /* =====================================
       CURSOR GLOW
    ===================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow && window.innerWidth > 768) {

        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        function animateCursor() {

            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;

            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =====================================
       PROMOTION LIGHTBOX
    ===================================== */

    const cards = document.querySelectorAll(".promotion-card");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image img");
    const closeButton = document.querySelector(".close-lightbox");

    const currentNumber = document.querySelector(".current-number");
    const totalNumber = document.querySelector(".total-number");

    totalNumber.textContent = String(cards.length).padStart(2, "0");


    cards.forEach((card, index) => {

        card.addEventListener("click", () => {

            const image = card.querySelector("img");

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            currentNumber.textContent =
                String(index + 1).padStart(2, "0");

            lightbox.classList.add("active");

            document.body.classList.add("no-scroll");

        });

    });


    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.classList.remove("no-scroll");

        setTimeout(() => {
            lightboxImage.src = "";
        }, 400);

    }


    closeButton.addEventListener("click", closeLightbox);


    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    /* =====================================
       IMAGE PARALLAX
    ===================================== */

    if (window.innerWidth > 900) {

        cards.forEach((card) => {

            const image = card.querySelector("img");

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                image.style.transform =
                    `scale(1.045) translate(${x * 8}px, ${y * 8}px)`;

            });


            card.addEventListener("mouseleave", () => {

                image.style.transform = "";

            });

        });

    }


    /* =====================================
       SMOOTH HERO SCROLL
    ===================================== */

    const scrollIndicator =
        document.querySelector(".scroll-indicator");

    if (scrollIndicator) {

        scrollIndicator.addEventListener("click", () => {

            document.querySelector(".promotions")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

        scrollIndicator.style.cursor = "pointer";

    }

});
```
