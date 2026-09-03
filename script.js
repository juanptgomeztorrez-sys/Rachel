const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const songModal = document.getElementById('songModal');
const songForm = document.getElementById('songForm');
const cardsGrid = document.getElementById('cardsGrid');

openModalBtn.addEventListener('click', () => {
    songModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    songModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === songModal) {
        songModal.style.display = 'none';
    }
});

songForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('songTitle').value;
    const artist = document.getElementById('songArtist').value;
    const songUrl = document.getElementById('songUrl').value;
    const quote = document.getElementById('songQuote').value;

    const fechaActual = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

    const newCard = document.createElement('div');
    newCard.classList.add('song-card');
    newCard.innerHTML = `
        <div class="card-thumb">
            <span class="yt-badge">YT</span>
            <a href="${songUrl}" target="_blank" class="play-overlay">
                ▶ Reproducir en YouTube
            </a>
        </div>
        <div class="card-content">
            <h3>${title.toUpperCase()}</h3>
            <p class="artist">${artist}</p>
            <blockquote class="quote">
                "${quote}"
            </blockquote>
            <div class="card-footer">
                <span class="date">📅 ${fechaActual}</span>
                <button class="btn-delete">quitar</button>
            </div>
        </div>
    `;

    cardsGrid.prepend(newCard);
    songForm.reset();
    songModal.style.display = 'none';
    activarBotonesEliminar();
});

function activarBotonesEliminar() {
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(btn => {
        btn.onclick = (e) => {
            const card = e.target.closest('.song-card');
            card.remove();
        };
    });
}

activarBotonesEliminar();