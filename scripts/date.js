// Current year
const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

// Last modified
const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;
