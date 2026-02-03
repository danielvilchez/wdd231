// ===============================
// DOM Elements
// ===============================
const memberDisplay = document.querySelector("#member-display");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const filterSelect = document.querySelector("#member-filter");

const menuButton = document.getElementById("menu-toggle");
const mainNav = document.querySelector(".main-nav");

// ===============================
// State
// ===============================
let allMembers = [];
let currentView = "grid";
let currentFilter = "all";

// ===============================
// Fetch Members (async/await)
// ===============================
async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Network response was not ok");

        allMembers = await response.json();
        applyFiltersAndView();
    } catch (error) {
        console.error("Error loading members:", error);
        memberDisplay.innerHTML = "<p>Failed to load member data.</p>";
    }
}

// ===============================
// Display Members
// ===============================
function displayMembers(members) {
    memberDisplay.innerHTML = "";

    const fragment = document.createDocumentFragment();

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Membership level styling
        if (member.level === 3) card.classList.add("level-gold");
        if (member.level === 2) card.classList.add("level-silver");
        if (member.level === 1) card.classList.add("level-basic");

        // List view styling
        if (currentView === "list") {
            card.classList.add("list-item");
        }

        // Content
        card.innerHTML = `
            ${currentView === "grid" ? `
                <img 
                    src="images/${member.image}" 
                    alt="${member.name}" 
                    loading="lazy" 
                    width="600" 
                    height="400">
            ` : ""}

            <h3 class="member-title">${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>
        `;

        fragment.appendChild(card);
    });

    memberDisplay.appendChild(fragment);
}

// ===============================
// Apply Filter + View
// ===============================
function applyFiltersAndView() {
    let filteredMembers = allMembers;

    if (currentFilter !== "all") {
        filteredMembers = allMembers.filter(
            member => member.level === Number(currentFilter)
        );
    }

    // Toggle container layout
    memberDisplay.classList.toggle("grid-view", currentView === "grid");
    memberDisplay.classList.toggle("list-view", currentView === "list");

    // Toggle buttons
    gridButton.classList.toggle("active", currentView === "grid");
    listButton.classList.toggle("active", currentView === "list");

    displayMembers(filteredMembers);
}

// ===============================
// Event Listeners (safe checks)
// ===============================

// Only add event listeners if the elements exist
if (gridButton) {
    gridButton.addEventListener("click", () => {
        currentView = "grid";
        applyFiltersAndView();
    });
}

if (listButton) {
    listButton.addEventListener("click", () => {
        currentView = "list";
        applyFiltersAndView();
    });
}

if (filterSelect) {
    filterSelect.addEventListener("change", () => {
        currentFilter = filterSelect.value;
        applyFiltersAndView();
    });
}

// Mobile navigation toggle (menu button)
if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}


// ===============================
// Footer Info
// ===============================
function updateFooter() {
    document.getElementById("currentyear").textContent =
        new Date().getFullYear();

    document.getElementById("lastmodified").textContent =
        document.lastModified;
}

// ===============================
// Mobile Navigation Toggle
// ===============================
menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});

// ===============================
// Init
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadMembers();
    updateFooter();
});
