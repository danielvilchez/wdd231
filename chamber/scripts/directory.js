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

function displayMembers(members) {
    memberDisplay.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Apply list-item class if list view is active
        if (currentView === "list") {
            card.classList.add("list-item");
        }

        // Membership level
        if (member.level === 3) card.classList.add("level-gold");
        if (member.level === 2) card.classList.add("level-silver");
        if (member.level === 1) card.classList.add("level-basic");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h4>${member.name}</h4>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p class="membership-level">Level: ${member.level}</p>
            <p>${member.notes}</p>
        `;

        memberDisplay.appendChild(card);
    });
}

// ===============================
// Grid / List Toggle
// ===============================
gridButton.addEventListener("click", () => {
    currentView = "grid";
    memberDisplay.classList.add("grid-view");
    memberDisplay.classList.remove("list-view");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
    displayMembers(allMembers);
});

listButton.addEventListener("click", () => {
    currentView = "list";
    memberDisplay.classList.add("list-view");
    memberDisplay.classList.remove("grid-view");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
    displayMembers(allMembers);
});

// ===============================
// Filter Members
// ===============================
filterSelect.addEventListener("change", () => {
    const value = filterSelect.value;

    if (value === "all") displayMembers(allMembers);
    if (value === "gold") displayMembers(allMembers.filter(m => m.level === 3));
    if (value === "silver") displayMembers(allMembers.filter(m => m.level === 2));
    if (value === "basic") displayMembers(allMembers.filter(m => m.level === 1));
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
    mainNav.classList.toggle("open");
});
