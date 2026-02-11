// scripts/form-action.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const output = document.getElementById('output');

    if (!params.toString()) {
        output.innerHTML = "<p>No form data received.</p>";
        return;
    }

    let html = "<ul>";
    params.forEach((value, key) => {
        html += `<li><strong>${key}:</strong> ${decodeURIComponent(value)}</li>`;
    });
    html += "</ul>";

    output.innerHTML = html;
});
