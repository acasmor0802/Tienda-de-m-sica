// ========== FUNCIONES GENERALES DEL DOM ========== //
function seleccionar(elemento) {
    return document.querySelector(elemento);
}

function seleccionarTodos(elemento) {
    return document.querySelectorAll(elemento);
}

// ========== GALERÍA INTERACTIVA ========== //
function inicializarGaleria() {
    var contenedorGaleria = seleccionar('.novedades__list');
    var botonAgregar = document.createElement('button');
    
    if (contenedorGaleria == null) return;
    
    botonAgregar.textContent = 'Añadir foto personalizada';
    botonAgregar.style.margin = '1rem';
    
    botonAgregar.onclick = function() {
        var url = prompt('Introduce la URL de la imagen:');
        if (url) {
            var producto = document.createElement('article');
            producto.className = 'novedades__item';
            producto.innerHTML = `
                <img src="${url}" class="novedades__image">
                <h3 class="novedades__name">Foto personalizada</h3>
                <p class="novedades__description">15.99€</p>
                <button class="boton-comprar">Añadir al carrito</button>
            `;
            
            producto.querySelector('.boton-comprar').onclick = function() {
                var nombre = this.parentNode.querySelector('.novedades__name').textContent;
                var precio = this.parentNode.querySelector('.novedades__description').textContent;
                carrito.agregarProducto(nombre, precio);
            };
            
            contenedorGaleria.appendChild(producto);
        }
    };
    
    contenedorGaleria.parentNode.insertBefore(botonAgregar, contenedorGaleria.nextSibling);
}

// ========== VALIDACIÓN DE FORMULARIO ========== //
function esNumero(valor) {
    try {
        var num = parseInt(valor);
        return !isNaN(num);
    } catch (e) {
        return false;
    }
}

function validarFormulario() {
    var formulario = seleccionar('.form');
    if (formulario == null) return;
    
    formulario.onsubmit = function() {
        var telefono = seleccionar('#telefono').value;
        var correo = seleccionar('#correo').value;
        var mensajeError = seleccionar('#mensaje-error') || document.createElement('div');
        var error = '';
        
        if (telefono.length != 9 || !esNumero(telefono)) {
            error = 'El teléfono debe tener 9 números.';
        }
        
        if (correo.indexOf('@') == -1 || correo.indexOf('.') == -1) {
            error += ' Ingresa un correo válido.';
        }
        
        if (error) {
            mensajeError.id = 'mensaje-error';
            mensajeError.textContent = error;
            mensajeError.style.color = 'red';
            formulario.appendChild(mensajeError);
            
            setTimeout(function() {
                mensajeError.remove();
            }, 3000);
            return false;
        }
        return true;
    };
}

// ========== FILTRO DE PRODUCTOS ========== //
function inicializarFiltro() {
    var inputBusqueda = document.createElement('input');
    inputBusqueda.placeholder = 'Buscar productos...';
    inputBusqueda.style.margin = '1rem';
    
    var seccionProductos = seleccionar('.productos');
    if (seccionProductos == null) return;
    
    seccionProductos.insertBefore(inputBusqueda, seccionProductos.firstChild);
    
    var todosLosProductos = seleccionarTodos('.productos__item');
    
    inputBusqueda.oninput = function() {
        var busqueda = this.value.toLowerCase();
        
        for (var i = 0; i < todosLosProductos.length; i++) {
            var nombre = todosLosProductos[i].querySelector('.productos__name').textContent.toLowerCase();
            todosLosProductos[i].style.display = nombre.includes(busqueda) ? 'block' : 'none';
        }
    };
}

// ========== CARRITO DE COMPRAS CON LOCALSTORAGE ========== //
var carrito = {
    contador: seleccionar('.carrito__contador'),
    lista: seleccionar('.carrito__lista'),
    total: seleccionar('.carrito__total'),
    
    inicializar: function() {
        this.cargarDesdeLocalStorage();
        this.actualizar();
    },
    
    agregarProducto: function(nombre, precio) {
        var item = {
            nombre: nombre,
            precio: precio,
            timestamp: Date.now()
        };
        
        this.lista.appendChild(this.crearItemDOM(item));
        this.guardarEnLocalStorage();
        this.actualizar();
    },
    
    crearItemDOM: function(item) {
        var elemento = document.createElement('li');
        elemento.className = 'carrito__item';
        elemento.innerHTML = `
            <div class="carrito__info">
                <span class="carrito__nombre">${item.nombre}</span>
                <span class="carrito__precio">${item.precio}</span>
            </div>
            <button class="carrito__eliminar">🗑️</button>
        `;
        
        elemento.querySelector('.carrito__eliminar').onclick = () => {
            elemento.remove();
            this.guardarEnLocalStorage();
            this.actualizar();
        };
        
        return elemento;
    },
    
    actualizar: function() {
        this.contador.textContent = this.lista.children.length;
        this.actualizarTotal();
    },
    
    actualizarTotal: function() {
        var precios = this.lista.querySelectorAll('.carrito__precio');
        var total = 0;
        
        for (var i = 0; i < precios.length; i++) {
            var precioTexto = precios[i].textContent.replace('€', '').trim();
            var precioNumero = parseFloat(precioTexto.replace(',', '.'));
            if (!isNaN(precioNumero)) total += precioNumero;
        }
        
        this.total.textContent = total.toFixed(2) + '€';
    },
    
    guardarEnLocalStorage: function() {
        var items = [];
        this.lista.querySelectorAll('.carrito__item').forEach(item => {
            items.push({
                nombre: item.querySelector('.carrito__nombre').textContent,
                precio: item.querySelector('.carrito__precio').textContent
            });
        });
        localStorage.setItem('carrito', JSON.stringify(items));
    },
    
    cargarDesdeLocalStorage: function() {
        var guardado = localStorage.getItem('carrito');
        if (guardado) {
            JSON.parse(guardado).forEach(item => {
                this.lista.appendChild(this.crearItemDOM(item));
            });
        }
    }
};

// ========== INICIALIZAR BOTONES ========== //
function inicializarBotonesComprar() {
    var botones = seleccionarTodos('.boton-comprar');
    
    for (var i = 0; i < botones.length; i++) {
        botones[i].onclick = function() {
            var producto = this.parentNode;
            var nombre = producto.querySelector('.novedades__name, .productos__name').textContent;
            var precio = producto.querySelector('.novedades__description, .productos__description').textContent;
            carrito.agregarProducto(nombre, precio);
        };
    }
}

// ========== INICIALIZAR TODO ========== //
function iniciar() {
    inicializarGaleria();
    inicializarBotonesComprar();
    validarFormulario();
    inicializarFiltro();
    carrito.inicializar();
}

document.addEventListener('DOMContentLoaded', iniciar);