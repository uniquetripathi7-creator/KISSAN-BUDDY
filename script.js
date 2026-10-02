document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
       ========================================= */

    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenu && navLinks) {

        mobileMenu.addEventListener("click", () => {

            navLinks.classList.toggle("show-mobile");

        });

    }


    /* =========================================
       SMOOTH NAVIGATION
       ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (navLinks) {
                navLinks.classList.remove("show-mobile");
            }

        });

    });


    /* =========================================
       CROP IMAGE UPLOAD
       ========================================= */

    const cropImage = document.getElementById("cropImage");
    const uploadStatus = document.getElementById("uploadStatus");
    const scanButton = document.getElementById("scanButton");

    if (cropImage) {

        cropImage.addEventListener("change", () => {

            const file = cropImage.files[0];

            if (!file) {
                uploadStatus.textContent =
                    "JPG, PNG or WEBP • Maximum 10 MB";
                return;
            }


            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (!allowedTypes.includes(file.type)) {

                uploadStatus.innerHTML =
                    '<span style="color:#b05d3d;font-weight:700;">' +
                    'Please select a JPG, PNG or WEBP image.' +
                    '</span>';

                cropImage.value = "";

                return;
            }


            if (file.size > 10 * 1024 * 1024) {

                uploadStatus.innerHTML =
                    '<span style="color:#b05d3d;font-weight:700;">' +
                    'Image must be smaller than 10 MB.' +
                    '</span>';

                cropImage.value = "";

                return;
            }


            uploadStatus.innerHTML =
                '<span style="color:#3d784d;font-weight:800;">' +
                '✓ ' +
                file.name +
                ' selected' +
                '</span>';

        });

    }


    /* =========================================
       DEMO ANALYSIS
       ========================================= */

    if (scanButton) {

        scanButton.addEventListener("click", () => {

            if (!cropImage || !cropImage.files.length) {

                uploadStatus.innerHTML =
                    '<span style="color:#a36e2a;font-weight:700;">' +
                    'Please upload a crop image first.' +
                    '</span>';

                return;
            }


            const originalText = scanButton.innerHTML;

            scanButton.disabled = true;

            scanButton.innerHTML =
                'Analysing crop <span>...</span>';


            uploadStatus.innerHTML =
                '<span style="color:#3d784d;font-weight:700;">' +
                'Crop image received • analysing field signals...' +
                '</span>';


            setTimeout(() => {

                uploadStatus.innerHTML =
                    '<span style="color:#3d784d;font-weight:800;">' +
                    '✓ Initial screening complete • field confirmation recommended' +
                    '</span>';

                scanButton.disabled = false;

                scanButton.innerHTML = originalText;

            }, 1800);

        });

    }


    /* =========================================
       LANGUAGE BUTTON
       ========================================= */

    const languageButton =
        document.querySelector(".language-btn");

    if (languageButton) {

        const languages = [
            "EN ▾",
            "HI ▾",
            "MR ▾",
            "PA ▾",
            "BN ▾"
        ];

        let languageIndex = 0;

        languageButton.addEventListener("click", () => {

            languageIndex++;

            if (languageIndex >= languages.length) {
                languageIndex = 0;
            }

            languageButton.textContent =
                languages[languageIndex];

        });

    }


    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const revealItems = document.querySelectorAll(
        ".signal-card, .workflow-step, .feature-card, .impact-stat"
    );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("revealed");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealItems.forEach(item => {

            item.classList.add("reveal-item");

            observer.observe(item);

        });

    }


    /* =========================================
       CURRENT YEAR
       ========================================= */

    const year =
        document.getElementById("currentYear");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =========================================
       CONSOLE
       ========================================= */

    console.log(
        "%cCropGuard",
        "font-size:22px;font-weight:800;color:#1e6a43;"
    );

    console.log(
        "%cCrop health intelligence initialized.",
        "font-size:12px;color:#65736a;"
    );

});