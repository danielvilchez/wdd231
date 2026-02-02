import { places } from "../data/discover.mjs";

const cardsContainer = document.querySelector("#discover-grid");

// ---------- Generate cards ----------
places.forEach(place => {
    const card = document.createElement("article");
    card.classList.add("discover-card");

    // Title
    const title = document.createElement("h2");
    title.textContent = place.name;

    // Figure + Image
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.alt;
    img.loading = "lazy";
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);

    // Address
    const address = document.createElement("address");
    address.textContent = place.address;

    // Description
    const description = document.createElement("p");
    description.textContent = place.description;

    // Button
    const button = document.createElement("button");
    button.textContent = "Learn more";
    button.setAttribute("aria-label", `Learn more about ${place.name}`);

    // Append all elements to card
    card.append(figure, title, address, description, button);

    // Append card to container
    cardsContainer.appendChild(card);
});

// ---------- Visitor message with localStorage ----------
const msToDays = 86400000;
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");
let visitMessage = "";

if (!lastVisit) {
    visitMessage = "Welcome! Let us know if you have any questions.";
} else {
    const diffDays = Math.floor((now - parseInt(lastVisit)) / msToDays);
    if (diffDays < 1) {
        visitMessage = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        visitMessage = "You last visited 1 day ago.";
    } else {
        visitMessage = `You last visited ${diffDays} days ago.`;
    }
}

document.querySelector("#visit-message").textContent = visitMessage;
localStorage.setItem("lastVisit", now);

// ---------- Days until Christmas ----------
const theDateToday = new Date();
const todayElement = document.querySelector("#today");
const christmasElement = document.querySelector("#christmas");
const christmasDateElement = document.querySelector("#christmasDate");
const daysElement = document.querySelector("#daysleft");

const christmasDate = new Date(Date.UTC(theDateToday.getFullYear(), 11, 25));
if (theDateToday.getMonth() === 11 && theDateToday.getDate() > 25) {
    christmasDate.setFullYear(christmasDate.getFullYear() + 1);
}

const daysleft = (christmasDate.getTime() - Date.now()) / msToDays;

todayElement.textContent = Date.now();
christmasElement.textContent = christmasDate.getTime();
christmasDateElement.textContent = christmasDate;
daysElement.textContent = `${daysleft.toFixed(0)} days`;
