document.addEventListener("DOMContentLoaded", function () {

    /* LOADER */
    const loader = document.querySelector(".loader");

    setTimeout(function () {
        if (loader) {
            loader.classList.add("hide");
        }
    }, 1200);


    /* SCROLL REVEAL */
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold: 0.1
    });


    revealElements.forEach(function (element) {
        observer.observe(element);
    });


    /* CURSOR GLOW */
    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow && window.innerWidth > 768) {

        document.addEventListener("mousemove", function (event) {

            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";

        });

    }


    /* LIGHTBOX */

    const cards = document.querySelectorAll(".promotion-card");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image img");
    const closeButton = document.querySelector(".close-lightbox");

    const currentNumber = document.querySelector(".current-number");
    const totalNumber = document.querySelector(".total-number");


    if (totalNumber) {
        totalNumber.textContent =
            String(cards.length).padStart(2, "0");
    }


    cards.forEach(function (card, index) {

        card.addEventListener("click", function () {

            const image = card.querySelector("img");

            if (!image || !lightbox) return;

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            currentNumber.textContent =
                String(index + 1).padStart(2, "0");

            lightbox.classList.add("active");

            document.body.classList.add("no-scroll");

        });

    });


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");
        document.body.classList.remove("no-scroll");

    }


    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }


    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });

});
