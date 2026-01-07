const menuButton = document.querySelector("#menu");
const navList = document.querySelector("nav ul");

menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("open");
    navList.classList.toggle("open");
});
