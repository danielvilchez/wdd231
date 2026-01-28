// ===================== TIMESTAMP =====================
document.getElementById("timestamp").value = new Date().toLocaleString();

// ===================== MODALES =====================

// Abrir modal
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "block";
}

// Cerrar modal
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

// Asignar eventos a botones "View Benefits"
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.dataset.modal;
        openModal(modalId);
    });
});

// Asignar eventos a botones "Close"
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
