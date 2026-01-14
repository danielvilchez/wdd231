// ===============================
// DOM Elements
// ===============================
const memberDisplay = document.querySelector("#member-display");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const filterSelect = document.querySelector("#member-filter");

let allMembers = [];
let currentView = "grid"; // track current view

// ===============================
// Fetch & Display Members
// ===============================
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        allMembers = members;
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
        memberDisplay.innerHTML = "<p>Failed to load member data.</p>";
    }
}

// ===============================
// Display Members using DocumentFragment (performance boost)
// ===============================
function displayMembers(members) {
    // Conserva el h2 invisible para accesibilidad
    const h2 = memberDisplay.querySelector("h2");
    memberDisplay.innerHTML = "";
    if (h2) memberDisplay.appendChild(h2);

    const fragment = document.createDocumentFragment();

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        if (currentView === "list") card.classList.add("list-item");

        if (member.level === 3) card.classList.add("level-gold");
        if (member.level === 2) card.classList.add("level-silver");
        if (member.level === 1) card.classList.add("level-basic");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="100" height="100">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Website</a></p>
            <p class="membership-level">Level: ${member.level}</p>
            <p>${member.notes}</p>
        `;

        fragment.appendChild(card);
    });

    memberDisplay.appendChild(fragment);
}

// ===============================
// Grid / List Toggle
// ===============================
function setView(view) {
    currentView = view;
    memberDisplay.classList.toggle("grid-view", view === "grid");
    memberDisplay.classList.toggle("list-view", view === "list");
    gridButton.classList.toggle("active", view === "grid");
    listButton.classList.toggle("active", view === "list");
    displayMembers(allMembers);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

// ===============================
// Filter Members
// ===============================
filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;
    const filtered = value === "all"
        ? allMembers
        : allMembers.filter(m => {
            return (value === "gold" && m.level === 3) ||
                (value === "silver" && m.level === 2) ||
                (value === "basic" && m.level === 1);
        });
    displayMembers(filtered);
});

// ===============================
// Footer Dynamic Info
// ===============================
function updateFooter() {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastmodified").textContent = document.lastModified;
}

// ===============================
// Init
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadMembers();
    updateFooter();
});

// ===============================
// Mobile Navigation Toggle
// ===============================
const menuButton = document.getElementById("menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});
