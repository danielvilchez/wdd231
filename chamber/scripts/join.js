// ===================== TIMESTAMP =====================
document.getElementById("timestamp").value = new Date().toLocaleString();

// ===================== MODALES =====================
// Abrir modal
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

// Cerrar modal
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// Cerrar modal si se hace click fuera del contenido
window.onclick = function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// ===================== THANK YOU PAGE (opcional) =====================
function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) || "";
}

// Solo si tienes un thankyou.html con estos elementos
const thankYouFields = ["firstname", "lastname", "email", "mobile", "organization", "timestamp"];
thankYouFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = getParam(id);
});
