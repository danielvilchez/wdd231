// ===================== TIMESTAMP =====================
document.getElementById("timestamp").value = new Date().toLocaleString();

// ===================== MODALES =====================
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "block";
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

// Botones "View Benefits"
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        openModal(modalId);
    });
});

// Botones "Close"
document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        closeModal(modalId);
    });
});

// Cerrar modal si clic fuera del contenido
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = "none";
    });
});

// ===================== MENU =====================
const menuButton = document.getElementById("menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");

    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !expanded);
  });
}


// ===================== THANK YOU PAGE (opcional) =====================
function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
}

const thankYouFields = ["firstname", "lastname", "email", "mobile", "organization", "timestamp"];
thankYouFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = getParam(id);
});
