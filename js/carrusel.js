const imagenes = document.querySelectorAll('.carrusel-img');
const btnPrev = document.getElementById('btn-prev');
const btnSig = document.getElementById('btn-sig');
const sonidoClick = new Audio('sound/moneda.mp3');
let actual = 0;

function mostrarImagen(idx) {
    imagenes.forEach((img, i) => {
        img.classList.toggle('activa', i === idx);
    });
}

btnPrev.addEventListener('click', () => {
    actual = (actual - 1 + imagenes.length) % imagenes.length;
    mostrarImagen(actual);
    sonidoClick.currentTime = 0; 
    sonidoClick.play();
});

btnSig.addEventListener('click', () => {
    actual = (actual + 1) % imagenes.length;
    mostrarImagen(actual);
    sonidoClick.currentTime = 0; 
    sonidoClick.play();
});
