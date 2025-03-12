const darkModeToggle = document.getElementById('dark-mode-toggle');

const toggleTheme = () => {
    document.documentElement.classList.toggle('dark-mode');
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    darkModeToggle.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
    localStorage.setItem('darkMode', isDarkMode);
};

// Cargar preferencia (inicia en modo claro por defecto)
const loadTheme = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    darkModeToggle.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
};

document.addEventListener('DOMContentLoaded', loadTheme);
darkModeToggle.addEventListener('click', toggleTheme);

// script.js - Sección de comentarios

// Elementos del DOM
const addCommentBtn = document.getElementById('add-comment');
const removeCommentBtn = document.getElementById('remove-comment');
const comentariosContainer = document.getElementById('comentarios-container');

// Función para crear comentarios
const crearComentario = (usuario, texto) => {
    const comentario = document.createElement('article');
    comentario.className = 'comentarios__reseña';
    
    comentario.innerHTML = `
        <header class="comentarios__header">
            <img src="assets/default-avatar.png" 
                 alt="${usuario}" 
                 class="comentarios__imagen"
                 onerror="this.src='assets/default-avatar.png'">
            <div>
                <h3 class="comentarios__nombre">${usuario}</h3>
                <p class="comentarios__texto">${texto}</p>
            </div>
        </header>
    `;
    
    return comentario;
};

// Añadir comentario
addCommentBtn.addEventListener('click', () => {
    // Pedir datos al usuario
    const usuario = prompt('¿Cómo te llamas? (opcional)') || 'Anónimo';
    const texto = prompt('Escribe tu comentario:');
    
    // Validar comentario
    if (texto && texto.trim()) {
        const nuevoComentario = crearComentario(usuario, texto.trim());
        comentariosContainer.prepend(nuevoComentario);
    } else if (texto !== null) {
        alert('¡El comentario no puede estar vacío!');
    }
});

// Eliminar último comentario
removeCommentBtn.addEventListener('click', () => {
    if (comentariosContainer.children.length > 0) {
        comentariosContainer.firstElementChild.remove();
    }
});

// Opcional: Carga inicial de comentarios de ejemplo
document.addEventListener('DOMContentLoaded', () => {
    const comentarioEjemplo = crearComentario(
        'K-Pop Fan', 
        '¡La mejor tienda de K-pop que he visitado! 👏'
    );
    comentariosContainer.appendChild(comentarioEjemplo);
});