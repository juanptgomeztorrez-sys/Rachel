const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const songModal = document.getElementById('songModal');
const songForm = document.getElementById('songForm');
const cardsGrid = document.getElementById('cardsGrid');

// Cargar las canciones guardadas al abrir la página
document.addEventListener('DOMContentLoaded', cargarCancionesGuardadas);

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

    const nuevaCancion = {
        id: Date.now(), // Identificador único
        title: title.toUpperCase(),
        artist,
        songUrl,
        quote,
        date: fechaActual
    };

    // Guardar en localStorage
    guardarEnLocalStorage(nuevaCancion);

    // Agregar a la pantalla
    agregarTarjetaALaPantalla(nuevaCancion);

    songForm.reset();
    songModal.style.display = 'none';
});

function agregarTarjetaALaPantalla(song) {
    const newCard = document.createElement('div');
    newCard.classList.add('song-card');
    newCard.setAttribute('data-id', song.id);
    newCard.innerHTML = `
        <div class="card-thumb">
            <span class="yt-badge">YT</span>
            <a href="${song.songUrl}" target="_blank" class="play-overlay">
                ▶ Reproducir en YouTube
            </a>
        </div>
        <div class="card-content">
            <h3>${song.title}</h3>
            <p class="artist">${song.artist}</p>
            <blockquote class="quote">
                "${song.quote}"
            </blockquote>
            <div class="card-footer">
                <span class="date">📅 ${song.date}</span>
                <button class="btn-delete" onclick="eliminarCancion(${song.id})">quitar</button>
            </div>
        </div>
    `;
    cardsGrid.prepend(newCard);
    actualizarContador();
}

function guardarEnLocalStorage(song) {
    let canciones = JSON.parse(localStorage.getItem('misCanciones')) || [];
    canciones.push(song);
    localStorage.setItem('misCanciones', JSON.stringify(canciones));
}

function cargarCancionesGuardadas() {
    let canciones = JSON.parse(localStorage.getItem('misCanciones')) || [];
    
    // Si es la primera vez y no hay nada guardado, podemos dejar las de ejemplo o limpiar la grilla.
    // Aquí limpiamos la grilla fija del HTML para cargar solo lo que esté guardado (o mantener un almacenamiento limpio).
    if (canciones.length > 0) {
        cardsGrid.innerHTML = '';
        canciones.forEach(song => {
            agregarTarjetaALaPantalla(song);
        });
    }
}

window.eliminarCancion = function(id) {
    let canciones = JSON.parse(localStorage.getItem('misCanciones')) || [];
    canciones = canciones.filter(song => song.id !== id);
    localStorage.setItem('misCanciones', JSON.stringify(canciones));
    
    // Quitar de la pantalla
    const card = document.querySelector(`[data-id='${id}']`);
    if (card) card.remove();
    actualizarContador();
}

function actualizarContador() {
    const total = document.querySelectorAll('.song-card').length;
    const badge = document.querySelector('.counter-badge span');
    if(badge) {
        badge.textContent = `🎵 ${total} canciones guardadas`;
    }
}
