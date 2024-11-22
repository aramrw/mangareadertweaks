// ==UserScript==
// @name         MangaReader Tweaks
// @namespace    https://github.com/aramrw/mangareadertweaks
// @version      2024-11-22
// @description  Hide bottom navigation and restore if reset
// @author       You
// @match        https://mangareader.to/read/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mangareader.to
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const MAX_ATTEMPTS = 20; // Maximum number of checks
    const INTERVAL = 500; // Time (ms) between checks
    let attempts = 0;

    // Function to hide bottom navigation
    function hideBottomNav() {
        const BOTTOM_NAV = document.querySelector(".navi-buttons.hoz-controls.hoz-controls-rtl");
        const READER_CONTAINER = document.querySelector(".container-reader-hoz #divslide .divslide-wrapper");

        if (BOTTOM_NAV && READER_CONTAINER) {
            console.log(`Found on attempt: ${attempts + 1}`, BOTTOM_NAV);

            // Apply initial styles to hide the bottom nav
            BOTTOM_NAV.style.setProperty("opacity", "0", "important");
            BOTTOM_NAV.style.setProperty("transition", "opacity 0.3s ease");

            // Add hover functionality to show it
            BOTTOM_NAV.addEventListener("mouseover", () => {
                BOTTOM_NAV.style.setProperty("opacity", "1", "important");
            });

            BOTTOM_NAV.addEventListener("mouseout", () => {
                BOTTOM_NAV.style.setProperty("opacity", "0", "important");
            });

            READER_CONTAINER.style.setProperty("height", "100dvh", "important");
        }
    }

    const timer = setInterval(() => {
        hideBottomNav(); // Try hiding bottom nav every time interval

        attempts++;
        if (attempts >= MAX_ATTEMPTS) {
            console.error("Failed to find elements after multiple attempts.");
            clearInterval(timer);
        }
    }, INTERVAL);

    // MutationObserver to watch for changes to the bottom navigation directly
    const BOTTOM_NAV = document.querySelector(".navi-buttons.hoz-controls.hoz-controls-rtl");
    if (BOTTOM_NAV) {
        const observer = new MutationObserver(() => {
            console.log("Bottom navigation reset or modified, hiding again...");
            hideBottomNav(); // Reapply hiding if bottom nav is found or reset
        });

        // Observe the bottom navigation for child or attribute changes
        observer.observe(BOTTOM_NAV, { attributes: true, childList: true });
    }
})();
