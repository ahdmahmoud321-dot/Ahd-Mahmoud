/* =========================================================
   AHD PORTFOLIO
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. LOADER
   ========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 400);
    }

});


/* =========================================================
   2. THEME
   ========================================================= */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme =
    localStorage.getItem("ahd-theme") || "dark";

document.documentElement.setAttribute(
    "data-theme",
    savedTheme
);

updateThemeIcon(savedTheme);


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const current =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            current === "dark"
                ? "light"
                : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "ahd-theme",
            newTheme
        );

        updateThemeIcon(newTheme);

    });

}


function updateThemeIcon(theme) {

    if (!themeToggle) {
        return;
    }

    const icon =
        themeToggle.querySelector("i");

    if (!icon) {
        return;
    }

    if (theme === "dark") {

        icon.className =
            "fa-solid fa-sun";

    } else {

        icon.className =
            "fa-solid fa-moon";

    }

}


/* =========================================================
   3. LANGUAGE
   ========================================================= */

const langToggle =
    document.getElementById("lang-toggle");

let currentLanguage =
    localStorage.getItem("ahd-language") || "ar";


applyLanguage(currentLanguage);


if (langToggle) {

    langToggle.addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "ar"
                ? "en"
                : "ar";

        localStorage.setItem(
            "ahd-language",
            currentLanguage
        );

        applyLanguage(currentLanguage);

    });

}


function applyLanguage(lang) {

    const html =
        document.documentElement;

    html.setAttribute(
        "lang",
        lang
    );

    html.setAttribute(
        "dir",
        lang === "ar"
            ? "rtl"
            : "ltr"
    );


    if (langToggle) {

        langToggle.textContent =
            lang === "ar"
                ? "EN"
                : "عربي";

    }


    const elements =
        document.querySelectorAll(
            "[data-ar][data-en]"
        );


    elements.forEach((element) => {

        const text =
            element.getAttribute(
                `data-${lang}`
            );

        if (text !== null) {

            element.textContent = text;

        }

    });

}


/* =========================================================
   4. MOBILE MENU
   ========================================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const mobileMenu =
    document.getElementById("mobile-menu");


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const icon =
            menuToggle.querySelector("i");

        if (
            mobileMenu.classList.contains("active")
        ) {

            icon.className =
                "fa-solid fa-xmark";

        } else {

            icon.className =
                "fa-solid fa-bars";

        }

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove(
                "active"
            );

            const icon =
                menuToggle.querySelector("i");

            icon.className =
                "fa-solid fa-bars";

        });

    });

}


/* =========================================================
   5. SCROLL PROGRESS
   ========================================================= */

const progressBar =
    document.getElementById(
        "scroll-progress"
    );


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;


    let percentage = 0;

    if (documentHeight > 0) {

        percentage =
            (scrollTop / documentHeight) * 100;

    }


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }


    /* Back to top */

    const backToTop =
        document.getElementById(
            "back-to-top"
        );


    if (backToTop) {

        if (scrollTop > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }

});


/* =========================================================
   6. BACK TO TOP
   ========================================================= */

const backToTop =
    document.getElementById(
        "back-to-top"
    );


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   7. SMOOTH NAVIGATION
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   8. ANIMATED COUNTERS
   ========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );

let countersStarted = false;


function animateCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach((counter) => {

        const target =
            Number(
                counter.getAttribute(
                    "data-target"
                )
            );


        if (!Number.isFinite(target)) {
            return;
        }


        let current = 0;

        const duration = 1300;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            current =
                Math.floor(
                    target * eased
                );


            counter.textContent =
                current;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                counter.textContent =
                    `${target}+`;

            }

        }


        requestAnimationFrame(update);

    });

}


/* Start counters when stats section appears */

const statsSection =
    document.getElementById(
        "stats"
    );


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        animateCounters();

                        statsObserver.disconnect();

                    }

                });

            },
            {
                threshold: 0.25
            }
        );


    statsObserver.observe(
        statsSection
    );

}


/* =========================================================
   9. CERTIFICATE MODAL
   ========================================================= */

const modal =
    document.getElementById(
        "cert-modal"
    );

const modalImage =
    document.getElementById(
        "modal-image"
    );

const closeModal =
    document.querySelector(
        ".close-modal"
    );


const certificateButtons =
    document.querySelectorAll(
        ".open-modal"
    );


certificateButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const imageUrl =
                button.getAttribute(
                    "data-img"
                );


            if (
                !imageUrl ||
                !modal ||
                !modalImage
            ) {
                return;
            }


            modalImage.src =
                imageUrl;


            modalImage.alt =
                currentLanguage === "ar"
                    ? "معاينة الشهادة"
                    : "Certificate Preview";


            modal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});


function closeCertificateModal() {

    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

    if (modalImage) {

        modalImage.src = "";

    }

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeCertificateModal
    );

}


if (modal) {

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeCertificateModal();

            }

        }
    );

}


/* ESC closes modal */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeCertificateModal();

        }

    }
);


/* =========================================================
   10. IMAGE ERROR HANDLING
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    });


/* =========================================================
   11. CURRENT YEAR
   ========================================================= */

const footerYear =
    document.querySelector(
        "footer small"
    );


if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} Ahd Mahmoud Fathi`;

}