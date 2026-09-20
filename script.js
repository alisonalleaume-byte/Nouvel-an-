// =========================================================
// LA DESCARGA
// SCRIPT.JS — VERSION PROPRE ET COMPLÈTE
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // 1 — HEADER AU SCROLL
    // =====================================================

    const header = document.querySelector(".header");

    if (header) {

        function updateHeader() {

            if (window.scrollY > 40) {

                header.style.background =
                    "rgba(0,0,0,0.98)";

                header.style.boxShadow =
                    "0 10px 35px rgba(0,0,0,.35)";

            } else {

                header.style.background =
                    "rgba(0,0,0,.94)";

                header.style.boxShadow =
                    "none";
            }
        }

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );
    }


    // =====================================================
    // 2 — APPARITIONS DOUCES AU SCROLL
    // =====================================================

    const revealElements =
        document.querySelectorAll(`
            .course-card,
            .planning-cta,
            .first-visit-card,
            .discover-card,
            .split-section,
            .evenings-card,
            .location-card,
            .application-section,
            .contact-section
        `);


    revealElements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(24px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";
    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.10
                }
            );


        revealElements.forEach(
            function (element) {

                observer.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.style.opacity =
                    "1";

                element.style.transform =
                    "translateY(0)";
            }
        );
    }


    // =====================================================
    // 3 — EFFET AU SURVOL DES CARTES
    // =====================================================

    const hoverCards =
        document.querySelectorAll(`
            .big-action-card,
            .course-card,
            .discover-card
        `);


    hoverCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.style.transform =
                        "translateY(-4px)";
                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "translateY(0)";
                }
            );
        }
    );


    // =====================================================
    // 4 — CALCULATEUR LOCATION
    // =====================================================

    const locationPeople =
        document.getElementById(
            "location-people"
        );

    const locationDuration =
        document.getElementById(
            "location-duration"
        );

    const locationTotalPrice =
        document.getElementById(
            "location-total-price"
        );

    const locationPriceDuration =
        document.getElementById(
            "location-price-duration"
        );


    function updateLocationPrice() {

        if (
            !locationPeople ||
            !locationDuration ||
            !locationTotalPrice
        ) {
            return;
        }


        let people =
            parseInt(
                locationPeople.value,
                10
            ) || 1;


        let duration =
            parseInt(
                locationDuration.value,
                10
            ) || 1;


        if (people < 1) {
            people = 1;
        }


        if (duration < 1) {
            duration = 1;
        }


        // ---------------------------------------------
        // TARIFS
        //
        // Jusqu'à 10 personnes :
        // 25 € / heure
        //
        // Au-delà :
        // + 2,50 € / personne / heure
        // ---------------------------------------------

        let hourlyPrice = 25;


        if (people > 10) {

            hourlyPrice =
                25 +
                ((people - 10) * 2.5);
        }


        const total =
            hourlyPrice * duration;


        locationTotalPrice.textContent =
            total.toLocaleString(
                "fr-FR",
                {
                    minimumFractionDigits:
                        Number.isInteger(total)
                            ? 0
                            : 2,

                    maximumFractionDigits: 2
                }
            ) + " €";


        if (locationPriceDuration) {

            locationPriceDuration.textContent =
                duration === 1
                    ? "pour 1 heure"
                    : "pour "
                        + duration
                        + " heures";
        }
    }


    if (locationPeople) {

        locationPeople.addEventListener(
            "input",
            updateLocationPrice
        );

        locationPeople.addEventListener(
            "change",
            updateLocationPrice
        );
    }


    if (locationDuration) {

        locationDuration.addEventListener(
            "input",
            updateLocationPrice
        );

        locationDuration.addEventListener(
            "change",
            updateLocationPrice
        );
    }


    updateLocationPrice();


    // =====================================================
    // 5 — COOKIES / GOOGLE MAPS
    // =====================================================

    const STORAGE_KEY =
        "la_descarga_google_maps_consent";


    const cookieBanner =
        document.getElementById(
            "cookie-banner"
        );

    const cookieAccept =
        document.getElementById(
            "cookie-accept"
        );

    const cookieRefuse =
        document.getElementById(
            "cookie-refuse"
        );

    const cookieSettings =
        document.getElementById(
            "cookie-settings"
        );

    const googleMapContainer =
        document.getElementById(
            "google-map-container"
        );


    // =====================================================
    // CHARGER GOOGLE MAPS
    // =====================================================

    function loadGoogleMap() {

        if (!googleMapContainer) {
            return;
        }


        googleMapContainer.innerHTML =
            "";


        const iframe =
            document.createElement(
                "iframe"
            );


        iframe.src =
            "https://www.google.com/maps?q=30%20rue%20de%20Buffon%2C%2076000%20Rouen&output=embed";


        iframe.title =
            "Carte Google Maps - La Descarga, 30 rue de Buffon, 76000 Rouen";


        iframe.loading =
            "lazy";


        iframe.referrerPolicy =
            "no-referrer-when-downgrade";


        iframe.allowFullscreen =
            true;


        googleMapContainer.appendChild(
            iframe
        );
    }


    // =====================================================
    // CARTE GOOGLE MAPS BLOQUÉE
    // =====================================================

    function blockGoogleMap() {

        if (!googleMapContainer) {
            return;
        }


        googleMapContainer.innerHTML = `
            <div class="map-placeholder">

                <span class="map-placeholder-icon">
                    ◉
                </span>

                <p>
                    30 rue de Buffon<br>
                    76000 Rouen
                </p>

                <span class="map-placeholder-info">
                    Google Maps est désactivé selon vos préférences.
                </span>

            </div>
        `;
    }


    // =====================================================
    // OUVRIR POP-UP COOKIES
    // =====================================================

    function showCookieBanner() {

        if (!cookieBanner) {
            return;
        }


        cookieBanner.classList.add(
            "is-visible"
        );


        cookieBanner.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "cookie-popup-open"
        );
    }


    // =====================================================
    // FERMER POP-UP COOKIES
    // =====================================================

    function hideCookieBanner() {

        if (!cookieBanner) {
            return;
        }


        cookieBanner.classList.remove(
            "is-visible"
        );


        cookieBanner.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "cookie-popup-open"
        );
    }


    // =====================================================
    // CONSENTEMENT ENREGISTRÉ
    // =====================================================

    const savedConsent =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (
        savedConsent ===
        "accepted"
    ) {

        loadGoogleMap();

        hideCookieBanner();

    } else if (
        savedConsent ===
        "refused"
    ) {

        blockGoogleMap();

        hideCookieBanner();

    } else {

        // ---------------------------------------------
        // PREMIÈRE VISITE
        // Aucun choix enregistré
        // ---------------------------------------------

        blockGoogleMap();

        showCookieBanner();
    }


    // =====================================================
    // ACCEPTER LES COOKIES
    // =====================================================

    if (cookieAccept) {

        cookieAccept.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    STORAGE_KEY,
                    "accepted"
                );


                loadGoogleMap();

                hideCookieBanner();
            }
        );
    }


    // =====================================================
    // REFUSER LES COOKIES
    // =====================================================

    if (cookieRefuse) {

        cookieRefuse.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    STORAGE_KEY,
                    "refused"
                );


                blockGoogleMap();

                hideCookieBanner();
            }
        );
    }


    // =====================================================
    // GÉRER MES COOKIES
    // =====================================================

    if (cookieSettings) {

        cookieSettings.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showCookieBanner();
            }
        );
    }


    // =====================================================
    // 6 — MODALE MENTIONS LÉGALES
    // =====================================================

    const legalModal =
        document.getElementById(
            "legal-modal"
        );

    const openLegalModal =
        document.getElementById(
            "open-legal-modal"
        );

    const closeLegalModal =
        document.getElementById(
            "legal-modal-close"
        );

    const legalModalBackdrop =
        document.getElementById(
            "legal-modal-backdrop"
        );


    // =====================================================
    // OUVRIR LES MENTIONS LÉGALES
    // =====================================================

    function showLegalModal(event) {

        if (event) {

            event.preventDefault();
        }


        if (!legalModal) {

            // Sécurité :
            // si la modale n'existe vraiment pas dans le HTML,
            // on ouvre la page dédiée.

            window.location.href =
                "mentions-legales.html";

            return;
        }


        legalModal.classList.add(
            "is-open"
        );


        legalModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "legal-modal-open"
        );
    }


    // =====================================================
    // FERMER LES MENTIONS LÉGALES
    // =====================================================

    function hideLegalModal() {

        if (!legalModal) {
            return;
        }


        legalModal.classList.remove(
            "is-open"
        );


        legalModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "legal-modal-open"
        );
    }


    // =====================================================
    // CLIC SUR "MENTIONS LÉGALES"
    // =====================================================

    if (openLegalModal) {

        openLegalModal.addEventListener(
            "click",
            showLegalModal
        );
    }


    // =====================================================
    // CROIX DE FERMETURE
    // =====================================================

    if (closeLegalModal) {

        closeLegalModal.addEventListener(
            "click",
            hideLegalModal
        );
    }


    // =====================================================
    // CLIC SUR LE FOND SOMBRE
    // =====================================================

    if (legalModalBackdrop) {

        legalModalBackdrop.addEventListener(
            "click",
            hideLegalModal
        );
    }


    // =====================================================
    // TOUCHE ÉCHAP
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                hideLegalModal();
            }
        }
    );


    // =====================================================
    // 7 — LIENS INTERNES AVEC ANCRES
    // =====================================================

    const internalAnchors =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalAnchors.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
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
        }
    );

});