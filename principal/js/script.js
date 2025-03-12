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