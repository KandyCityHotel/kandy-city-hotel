/* =========================================================
   KANDY CITY HOTEL
   INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const cards =
        document.querySelectorAll(".promotion-card");

    const lightbox =
        document.querySelector(".lightbox");

    const lightboxImage =
        document.querySelector(".lightbox-image");

    const closeButton =
        document.querySelector(".lightbox-close");

    const previousButton =
        document.querySelector(".lightbox-prev");

    const nextButton =
        document.querySelector(".lightbox-next");

    const currentNumber =
        document.querySelector(".current-number");

    const totalNumber =
        document.querySelector(".total-number");

    const exploreButton =
        document.querySelector(".explore-button");

    const cursorGlow =
        document.querySelector(".cursor-glow");


    /* =====================================================
       PROMOTION IMAGES
    ===================================================== */

    const images = [];

    cards.forEach(function (card) {

        const image =
            card.querySelector("img");

        if (image) {
            images.push({
                src: image.src,
                alt: image.alt
            });
        }

    });


    let currentIndex = 0;


    /* =====================================================
       TOTAL COUNTER
    ===================================================== */

    if (totalNumber) {

        totalNumber.textContent =
            String(images.length)
                .padStart(2, "0");

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver
                            .unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }

        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (
        cursorGlow &&
        window.innerWidth > 768
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        document.addEventListener(
            "mousemove",
            function (event) {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        function animateGlow() {

            glowX +=
                (mouseX - glowX) * 0.08;

            glowY +=
                (mouseY - glowY) * 0.08;


            cursorGlow.style.left =
                glowX + "px";

            cursorGlow.style.top =
                glowY + "px";


            requestAnimationFrame(
                animateGlow
            );

        }


        animateGlow();

    }


    /* =====================================================
       PROMOTION CARD TILT
    ===================================================== */

    if (window.innerWidth > 900) {

        cards.forEach(function (card) {

            const image =
                card.querySelector(
                    ".promotion-image img"
                );


            card.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (event.clientX -
                            rect.left) /
                        rect.width -
                        0.5;


                    const y =
                        (event.clientY -
                            rect.top) /
                        rect.height -
                        0.5;


                    const moveX =
                        x * 5;

                    const moveY =
                        y * 5;


                    image.style.transform =
                        `scale(1.055)
                         translate(${moveX}px, ${moveY}px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    image.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    function openLightbox(index) {

        if (!images.length) {
            return;
        }


        currentIndex =
            (index + images.length) %
            images.length;


        lightboxImage.src =
            images[currentIndex].src;

        lightboxImage.alt =
            images[currentIndex].alt;


        currentNumber.textContent =
            String(currentIndex + 1)
                .padStart(2, "0");


        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList
            .add("lightbox-open");

    }


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList
            .remove("lightbox-open");

    }


    /* =====================================================
       NEXT IMAGE
    ===================================================== */

    function nextImage() {

        openLightbox(
            currentIndex + 1
        );

    }


    /* =====================================================
       PREVIOUS IMAGE
    ===================================================== */

    function previousImage() {

        openLightbox(
            currentIndex - 1
        );

    }


    /* =====================================================
       CARD CLICK
    ===================================================== */

    cards.forEach(function (card, index) {

        card.addEventListener(
            "click",
            function () {

                openLightbox(index);

            }
        );

    });


    /* =====================================================
       BUTTONS
    ===================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextImage
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            previousImage
        );

    }


    /* =====================================================
       CLICK OUTSIDE IMAGE
    ===================================================== */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox.classList
                    .contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextImage();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousImage();

            }

        }
    );


    /* =====================================================
       EXPLORE BUTTON
    ===================================================== */

    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            function () {

                const section =
                    document.querySelector(
                        "#promotions"
                    );


                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    /* =====================================================
       TOUCH SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    lightbox.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0]
                    .screenX;


            const distance =
                touchEndX - touchStartX;


            if (Math.abs(distance) < 50) {
                return;
            }


            if (distance < 0) {

                nextImage();

            } else {

                previousImage();

            }

        },
        {
            passive: true
        }
    );


});
