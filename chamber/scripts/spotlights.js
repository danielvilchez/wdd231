const membersURL = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) {
            throw new Error('Members data not available');
        }

        const data = await response.json();

        // Solo miembros Gold (3) o Silver (2)
        const eligibleMembers = data.filter(member => member.level === 3 || member.level === 2);

        // Mezclar aleatoriamente
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

        // Seleccionar 2 o 3 miembros
        const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

        displaySpotlights(selected);
    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    members.forEach(member => {
        // Convertir level numérico a nombre
        const levelName = member.level === 3 ? 'Gold' : member.level === 2 ? 'Silver' : 'Basic';

        const card = document.createElement('div');
        card.classList.add('member-card', `level-${levelName.toLowerCase()}`);

        card.innerHTML = `
            <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p class="membership-level">${levelName} Member</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                Visit Website
            </a>
        `;

        container.appendChild(card);
    });
}

// Ejecutar al cargar
getSpotlights();
