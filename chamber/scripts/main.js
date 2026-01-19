// ===============================
// MENU TOGGLE
// ===============================
const menuButton = document.getElementById("menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}

// ===============================
// FOOTER INFO
// ===============================
function updateFooter() {
    const currentYear = document.getElementById("currentyear");
    const lastModified = document.getElementById("lastmodified");

    if (currentYear) currentYear.textContent = new Date().getFullYear();
    if (lastModified) lastModified.textContent = document.lastModified;
}

// Ejecutar al cargar DOM
document.addEventListener("DOMContentLoaded", () => {
    updateFooter();
});
