const moviesContainer = document.querySelector('#movies-container');
const modal = document.querySelector('#movie-modal');
const modalDetails = document.querySelector('#modal-details');
const closeModalButton = document.querySelector('#close-modal');

async function getMovies() {
    try {
        const response = await fetch('data/movies.json');

        if (!response.ok) throw new Error('Failed to fetch movies');

        const data = await response.json();

        // Agregamos listener a la primera película inline
        setupFirstMovie(data.movies[0]);

        // Display resto de películas
        displayMovies(data.movies.slice(1));

    } catch (error) {
        moviesContainer.innerHTML = `<p>Error loading movies.</p>`;
        console.error(error);
    }
}

// Configura la primera película inline para que abra modal
function setupFirstMovie(movie) {
    const firstMovieCard = moviesContainer.querySelector('.movie-card');
    if (firstMovieCard) {
        firstMovieCard.addEventListener('click', () => openModal(movie));
    }
}

function displayMovies(movies) {
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title} poster" width="250" height="375" loading="lazy">
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
        <img src="${movie.image}" alt="${movie.title} poster" width="250" height="375" loading="lazy">
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

// Ejecuta
getMovies();
