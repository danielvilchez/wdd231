const featuredContainer = document.querySelector('#featured-movies');

async function loadFeaturedMovies() {
    try {
        const response = await fetch('data/movies.json');
        const data = await response.json();

        // Tomamos solo 4 películas
        const featured = data.movies.slice(0, 4);

        featured.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');

            card.innerHTML = `
                <img src="${movie.image}" alt="${movie.title} poster" loading="lazy">
                <h3>${movie.title}</h3>
                <p><strong>Rating:</strong> ${movie.rating}</p>
            `;

            featuredContainer.appendChild(card);
        });

    } catch (error) {
        featuredContainer.innerHTML = '<p>Unable to load featured movies.</p>';
        console.error(error);
    }
}

loadFeaturedMovies();
