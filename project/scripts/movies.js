const moviesContainer = document.querySelector('#movies-container');
const modal = document.querySelector('#movie-modal');
const modalDetails = document.querySelector('#modal-details');
const closeModalButton = document.querySelector('#close-modal');

async function getMovies() {
    try {
        const response = await fetch('data/movies.json');

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        displayMovies(data.movies);

    } catch (error) {
        moviesContainer.innerHTML = `<p>Error loading movies.</p>`;
        console.error(error);
    }
}

function displayMovies(movies) {
    // Clear container except pre-rendered LCP movie
    moviesContainer.querySelectorAll('.movie-card:not(:first-child)').forEach(el => el.remove());

    movies.forEach((movie, index) => {
        if (index === 0) return; // skip The Godfather, pre-rendered

        const movieCard = document.createElement('article');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title} poster" loading="lazy" width="300" height="450">
            <h2>${movie.title}</h2>
            <p><strong>Year:</strong> ${movie.year}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
        `;

        movieCard.addEventListener('click', () => openModal(movie));
        moviesContainer.appendChild(movieCard);
    });
}

function openModal(movie) {
    modalDetails.innerHTML = `
        <img src="${movie.image}" alt="${movie.title} poster" loading="lazy" width="300" height="450">
        <h2>${movie.title}</h2>
        <p><strong>Release Year:</strong> ${movie.year}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Rating:</strong> ${movie.rating}</p>
        <p><strong>Summary:</strong> ${movie.description}</p>
    `;
    modal.hidden = false;
}

closeModalButton.addEventListener('click', () => {
    modal.hidden = true;
});

getMovies();
