const buscador_toggle = document.querySelector('.buscar__lupa');
const buscador_cerrar = document.querySelector('.buscar__mobil-cerrar');
const buscador_mobil = document.querySelector('.buscar__mobil');

const toggleMenu = () => {
    buscador_mobil.classList.toggle('activado');
};

buscador_toggle.addEventListener('click', toggleMenu);

buscador_cerrar.addEventListener('click', toggleMenu);