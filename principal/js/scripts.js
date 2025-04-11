// Variables principales
let miCarrito = JSON.parse(localStorage.getItem('miCarrito')) || []; // Recupera el carrito desde localStorage, o crea uno vacío si no existe
const listaCarrito = document.querySelector('.carrito__lista'); // Contenedor de la lista de productos del carrito
const contador = document.querySelector('.carrito__contador'); // Elemento que muestra el número de productos en el carrito
const total = document.querySelector('.carrito__total'); // Elemento que muestra el total del carrito
const carritoContainer = document.querySelector('.carrito-container');


// Al hacer clic en el botón del carrito
carritoContainer.querySelector('.carrito__boton').addEventListener('click', function() {
    // Verificar si la lista del carrito está visible
    if (listaCarrito.classList.contains('carrito__lista--visible')) {
        // Si está visible, ocultarla
        listaCarrito.classList.remove('carrito__lista--visible');
        listaCarrito.classList.add('carrito__lista--oculta');
    } else {
        // Si está oculta, mostrarla
        listaCarrito.classList.remove('carrito__lista--oculta');
        listaCarrito.classList.add('carrito__lista--visible');
    }
});



// Función para agregar un producto al carrito
function agregarAlCarrito(boton) {
    const producto = boton.closest('.novedades__item, .productos__item'); // Encuentra el contenedor del producto
    const nombre = producto.querySelector('h3').textContent; // Obtiene el nombre del producto
    const precio = producto.querySelector('p').textContent; // Obtiene el precio del producto

    miCarrito.push({ nombre: nombre, precio: precio }); // Añade el producto al carrito
    guardarCarrito(); // Guarda el carrito en localStorage
    actualizarCarrito(); // Actualiza la vista del carrito
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(posicion) {
    miCarrito.splice(posicion, 1); // Elimina el producto del carrito
    guardarCarrito(); // Guarda el carrito actualizado
    actualizarCarrito(); // Actualiza la vista del carrito
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('miCarrito', JSON.stringify(miCarrito)); // Guarda el carrito en localStorage
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    if (listaCarrito) {
        listaCarrito.innerHTML = ''; // Limpia la lista de productos del carrito
        let sumaTotal = 0; // Variable para acumular el total del carrito

        for (let i = 0; i < miCarrito.length; i++) {
            const item = `
                <li class="carrito__item">
                    <span>${miCarrito[i].nombre}</span>
                    <span>${miCarrito[i].precio}</span>
                    <button onclick="eliminarDelCarrito(${i})">X</button>
                </li>
            `;
            listaCarrito.innerHTML += item; // Agrega el producto a la lista
            sumaTotal += parseFloat(miCarrito[i].precio.replace('€', '')); // Suma el precio al total
        }

        contador.textContent = miCarrito.length; // Muestra la cantidad de productos
        total.textContent = sumaTotal.toFixed(2) + '€'; // Muestra el total del carrito
    }
}

// Al cargar la página
window.addEventListener('load', function() {
    actualizarCarrito(); // Actualiza la vista del carrito desde localStorage

    // Vincula los botones "comprar" de los productos ya existentes
    vincularBotonesComprar();  // Llamada para asignar los eventos a los botones

    // Escuchar cambios en localStorage entre pestañas
    window.addEventListener('storage', function(e) {
        if (e.key === 'miCarrito') { // Si el carrito se actualiza en otra pestaña
            miCarrito = JSON.parse(localStorage.getItem('miCarrito')) || []; // Actualiza el carrito
            actualizarCarrito(); // Refresca la vista
        }
    });
});

// Función para vincular los botones "comprar"
function vincularBotonesComprar() {
    const botones = document.querySelectorAll('.boton-comprar');
    botones.forEach(function(boton) {
        boton.addEventListener('click', function() {
            agregarAlCarrito(this); // Agrega el producto al carrito cuando se hace clic en el botón
        });
    });
}

// Añadir y eliminar imagenes
const seccionFotos = document.querySelector('.novedades__list');
if (seccionFotos) {
    const botonFoto = document.createElement('button');
    botonFoto.textContent = 'Añadir Foto';
    botonFoto.style.margin = '10px';
    seccionFotos.after(botonFoto); // Coloca el botón después de la lista de novedades

    botonFoto.onclick = function() {
        const url = prompt('Pega la URL de tu foto:'); // Solicita la URL de la foto
        if (url) {
            // Crear un nuevo artículo para la foto
            const nuevaFoto = document.createElement('article');
            nuevaFoto.classList.add('novedades__item');
            nuevaFoto.innerHTML = `
                <img src="${url}" class="novedades__image">
                <h3>Foto Personal</h3>
                <p>15.99€</p>
                <button class="boton-comprar">Añadir al carrito</button>
                <button class="boton-eliminar">Eliminar</button>
            `;
            seccionFotos.appendChild(nuevaFoto); // Agrega la nueva foto

            // Reasignar los eventos "comprar" para los productos nuevos
            vincularBotonesComprar();

            // Vincular el botón de eliminar
            const botonEliminar = nuevaFoto.querySelector('.boton-eliminar');
            botonEliminar.onclick = function() {
                nuevaFoto.remove(); // Elimina la foto del DOM
            };
        }
    };
}


// Buscador de productos
const buscador = document.createElement('input');
buscador.placeholder = 'Buscar productos...';
document.querySelector('.productos').prepend(buscador); // Coloca el input de búsqueda al inicio de la lista de productos

buscador.oninput = function() {
    const texto = this.value.toLowerCase(); // Convierte la búsqueda a minúsculas
    const productos = document.querySelectorAll('.productos__item'); // Obtiene todos los productos

    for (let i = 0; i < productos.length; i++) {
        const nombre = productos[i].querySelector('.productos__name').textContent.toLowerCase();
        productos[i].style.display = nombre.includes(texto) ? 'block' : 'none'; // Muestra o esconde el producto según la búsqueda
    }
};

// Cuando el input obtiene el foco (focus)
buscador.addEventListener('focus', function() {
    buscador.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.25)'; // Sombra azul
});

// Cuando el input pierde el foco (blur)
buscador.addEventListener('blur', function() {
    buscador.style.boxShadow = ''; // Restaura la sombra original (sin sombra)
});
