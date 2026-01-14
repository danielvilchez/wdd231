// Accessibility: Aria-pressed toggle for Grid/List buttons
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

function updateAriaPressed(view) {
    gridBtn.setAttribute("aria-pressed", view === "grid");
    listBtn.setAttribute("aria-pressed", view === "list");
}

// Modificar setView para incluir aria-pressed
const originalSetView = window.setView;
window.setView = function (view) {
    originalSetView(view);
    updateAriaPressed(view);
};
