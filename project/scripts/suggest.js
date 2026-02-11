// scripts/suggest.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('suggest-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const year = document.getElementById('year').value.trim();
        const genre = document.getElementById('genre').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!title || !year || !genre) {
            alert('Please fill in all required fields.');
            return;
        }

        // Guardar en Local Storage
        const suggestion = { title, year, genre, message };
        localStorage.setItem('movieSuggestion', JSON.stringify(suggestion));

        // Redirige a form-action.html
        window.location.href = 'form-action.html';
    });
});
