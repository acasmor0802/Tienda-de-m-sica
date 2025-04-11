# Tienda de música POP
![Logo](https://raw.githubusercontent.com/acasmor0802/Tienda-de-m-sica/refs/heads/main/principal/assets/logo-modified.png)
---
Bienvenidos a KSIC, tu destino favorito para todo lo relacionado con el K-pop. En nuestra tienda, nos apasiona compartir la música y la cultura de Corea del Sur con todos los fans, ofreciendo una amplia selección de discos, álbumes, mercancía oficial y artículos exclusivos de tus grupos y artistas favoritos. Creemos que la música une a las personas y queremos ser el puente que te conecte con el vibrante mundo del K-pop. Ya seas un fanático o estés comenzando tu viaje en este emocionante género, aquí encontrarás todo lo que necesitas para disfrutar y celebrar tu amor por la música. ¡Únete a nuestra comunidad y descubre lo mejor del K-pop con nosotros!
---
## Proyecto 3 – Manipulación de Documentos Web

### Descripción
Este proyecto utiliza JavaScript ES6+ para mejorar la experiencia del usuario manipulando el DOM. He implementado un carrito de compras interactivo, una galería para añadir fotos personalizadas, un buscador de productos y un formulario con validación dinámica.

### Funcionalidades

#### Carrito de Compras:
- Permite agregar productos mediante botones "Añadir al carrito".
- Actualiza la lista de productos, el contador y el total.
- Sincroniza el contenido del carrito entre pestañas utilizando `localStorage`.

#### Galería Interactiva:
- Agrega un botón para "Añadir Foto", que solicita la URL de una imagen e inserta un nuevo elemento en la galería.

#### Buscador de Productos:
- Permite filtrar productos según el texto ingresado.
- Aplica cambios de estilo (sombra) al input cuando recibe y pierde el foco.

#### Formulario:
- Se incluye un formulario con validación dinámica.
- Muestra mensajes de error según la validez de los datos añadidos.

### Tecnologías y Técnicas Utilizadas

- **JavaScript (ES6+):**  
  Uso de `let` y `const` para el manejo de variables, _template literals_ para crear contenido HTML y métodos de manipulación del DOM.

- **HTML y CSS:**  
  Estructura básica y estilos de la página.

- **localStorage:**  
  Empleado para almacenar y recuperar los datos del carrito entre sesiones y pestañas.

### Estructura del Código

El código se encuentra en el archivo `script.js` y realiza las siguientes tareas:

#### Inicialización:
- Selecciona los elementos del DOM (como por ejemplo lista del carrito) y recupera el carrito desde `localStorage`.

#### Gestión del Carrito:
- Funciones para agregar y eliminar productos del carrito, actualizar la visualización y guardar los cambios en `localStorage`.

#### Galería Personalizada:
- Agrega un botón que permite al usuario agregar una nueva imagen en la sección de novedades.

#### Buscador de Productos:
- Implementa un input para filtrar productos y añade efectos visuales en eventos de `focus` y `blur`.

#### Formulario:
- Incluye un formulario que valida la información añadida por el usuario.
- Muestra mensajes de error segun la validez de los datos, mejorando la experiencia de usuario.


https://acasmor0802.github.io/Tienda-de-m-sica/principal/index
---

Se han corregido todos los errores de la pagina mediante W3C.
![error](https://raw.githubusercontent.com/acasmor0802/Tienda-de-m-sica/refs/heads/main/principal/assets/error.png)
Se corrigio el error eliminando los espacios en el nombre de la img.

---
1. Uso de etiquetas semánticas ```(<header>, <main>, <footer>, <section>, <article>, etc.)``` <br>
Las etiquetas semánticas introducidas en HTML5 tienen un propósito claro: describir el significado del contenido, no solo su apariencia. Aquí las razones para usarlas: <br>

Accesibilidad: <br>
Ayudan a tecnologías como lectores de pantalla a entender la estructura de la página. Por ejemplo,``` <nav> ```indica una sección de navegación, facilitando la experiencia para usuarios con discapacidades visuales. <br>

SEO (Optimización para Motores de Búsqueda): <br>
Los motores de búsqueda priorizan contenido bien estructurado. Etiquetas como ```<article>``` o ```<section>```permiten identificar jerarquías y temas clave, mejorando el posicionamiento. <br>

Mantenibilidad del código: <br>
Al reemplazar <div> genéricos con etiquetas como <header> o <footer>, el código es más legible y fácil de actualizar. Por ejemplo: <br>
```
<!-- HTML4 (poco claro) -->
<div class="header">...</div> 

<!-- HTML5 (semántico) -->
<header>...</header>
```
Consistencia en equipos: <br>
Las etiquetas semánticas estandarizan la estructura, facilitando la colaboración entre desarrolladores y diseñadores.

---
2. ¿Por qué HTML5 y no HTML4? <br>
HTML5 es la evolución natural de HTML4, y ofrece ventajas clave: <br>

Semántica mejorada: <br>
HTML4 usaba <div> y <span> para todo, lo que generaba código confuso. HTML5 resuelve esto con etiquetas específicas como <main> (contenido principal) o <figure> (para imágenes y gráficos). <br>

Compatibilidad con dispositivos móviles: <br>
HTML5 está diseñado para ser responsive, adaptándose a pantallas de distintos tamaños. <br>

APIs modernas: <br>
Soporta tecnologías como Canvas (gráficos), Geolocalización, y Almacenamiento Local (localStorage), esenciales para aplicaciones web dinámicas. <br>

Validación de formularios integrada: <br>
Campos como <input type="email"> validan datos automáticamente, reduciendo la necesidad de JavaScript. 

---
3. ¿Por qué usar CSS? <br>
CSS (Cascading Style Sheets) es fundamental para separar el contenido (HTML) de su presentación visual: <br>

Consistencia visual: <br>
Permite definir estilos globales (colores, fuentes, márgenes) que se aplican a múltiples páginas, asegurando una apariencia uniforme. <br>

Responsive Design: <br>
Con media queries, puedes adaptar el diseño a dispositivos móviles, tablets o pantallas grandes. Por ejemplo: <br>
```
@media (max-width: 768px) { 
  .menu { display: none; } 
} 
```
Mantenibilidad: <br> 
Cambiar el diseño de un sitio completo es más fácil si los estilos están centralizados en un archivo .css, evitando modificar cada página HTML. <br>

Optimización de rendimiento: <br>
Reduce código repetitivo (evita estilos en línea) y permite técnicas como animaciones CSS (más eficientes que las de JavaScript). 
