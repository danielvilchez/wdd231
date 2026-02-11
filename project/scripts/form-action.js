// scripts/form-action.js
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');

    // Obtener datos del Local Storage
    const suggestionJSON = localStorage.getItem('movieSuggestion');

    if (!suggestionJSON) {
        output.innerHTML = "<p>No form data received.</p>";
    } else {
        const suggestion = JSON.parse(suggestionJSON);
        let html = "<ul>";
        for (const key in suggestion) {
            html += `<li><strong>${key}:</strong> ${suggestion[key]}</li>`;
        }
        html += "</ul>";
        output.innerHTML = html;
    }
});
