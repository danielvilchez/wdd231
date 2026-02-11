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
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title} poster" loading="lazy">
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
        <img src="${movie.image}" alt="${movie.title} poster" loading="lazy">
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
