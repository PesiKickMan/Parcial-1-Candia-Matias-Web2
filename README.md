# Administrador de Productos (Parcial 1 - Web II)

Este proyecto es una interfaz administrativa para gestionar productos (crear, leer, editar, eliminar), pensada como ejercicio para el Parcial 1 de la materia Web II. Consume una API REST (MockAPI) y permite además ordenar y buscar productos desde la interfaz. Representa una tienda ficticia que vende objetos provenientes de diferentes videojuegos.

---

## URL del endpoint
**https://68a3b7d2c123272fb9b04907.mockapi.io/**

---

## Funcionalidades principales
- Mostrar listado de productos con imagen, nombre, precio, nivel, tipo y stock.
- Agregar un nuevo producto.
- Editar un producto existente (carga el producto en el formulario, permite modificar y guardar).
- Eliminar productos (confirmación con SweetAlert).
- Ordenar productos alfabéticamente ascendente/descendente por nombre.
- Buscar productos por nombre en tiempo real.
- Mensajería de estado y errores con SweetAlert.

--- 

## Requisitos
- Navegador moderno (Chrome, Firefox, Edge).
- Conexión a Internet para acceder a MockAPI.
- Herramientas (opcional) para servir archivos estáticos: Live Server (VSCode) o un servidor HTTP simple.

---

## Dependencias (en el proyecto)
- axios (para peticiones HTTP).
- sweetalert (para alertas y confirmaciones).
- Font Awesome (iconos) — opcional si se usan iconos en la interfaz.

---

## Cómo configurar y ejecutar
1. Clonar o descargar el repositorio en tu PC.
2. Verificar que el archivo admin.js tenga la URL correcta de la API
3. Abrir index.html en el navegador.
    - Recomendado: abrir con Live Server (VSCode).
4. Asegúrate de que las dependencias (axios, sweetalert, fontawesome) estén incluidas en el HTML.

---

## Autor
**Matías Candia**

