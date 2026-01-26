const params = new URLSearchParams(window.location.search);

document.getElementById("name").textContent =
    `${params.get("first")} ${params.get("last")}`;

document.getElementById("email").textContent = params.get("email");
document.getElementById("phone").textContent = params.get("phone");
document.getElementById("org").textContent = params.get("organization");
document.getElementById("time").textContent = params.get("timestamp");
