//URL base de la API
const baseURL = "https://68a3b7d2c123272fb9b04907.mockapi.io/";


const tableBodyHTML = document.getElementById('table-body');
const productoFormHTML = document.getElementById('producto-form');
const submitBtn = productoFormHTML.querySelector('button[type="submit"]');
//Creo una variable global para saber si estoy editando un producto y guardar su id
let idProductoEditado = null;

//Renderizar productos desde MockAPI
function renderProducto() {
    axios.get(`${baseURL}/productos`)
        .then(response => {
            const productos = response.data; //Creo un array con los productos para poder recorrerlos mas fácilmente.
            tableBodyHTML.innerHTML = ''; //Limpio el tbody para evitar duplicados
            //Recorro el array de productos y los agrego a la tabla
            productos.forEach(producto => {
                tableBodyHTML.innerHTML += `
                    <tr>
                        <td><img src="${producto.imagen}" alt="${producto.nombre}" style="max-width:60px; max-height:60px; object-fit:contain;"></td>
                        <td>${producto.nombre}</td>
                        <td>$${producto.precio}</td>
                        <td>${producto.nivel}</td>
                        <td>${producto.tipo}</td>
                        <td>${producto.stock}</td>
                        <td>
                            <button class="btn-eliminar" onclick="eliminarProducto('${producto.id}')" title="Eliminar">
                                <i class="fa-solid fa-trash fa-fade"></i>
                            </button>
                        </td>
                        <td>
                            <button class="btn-editar" onclick="mostrarFormularioEdicion('${producto.id}')" title="Editar">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                    </tr>
                `;
            })
        })
        .catch(error => {
            swal("Error al cargar los productos", 'Código: ' +  error, "error");
        })
}

renderProducto();


//Mostrar formulario de edición con los datos del producto (Este reemplaza los datos del formulario original)
function mostrarFormularioEdicion(idProducto) {
    axios.get(`${baseURL}/productos/${idProducto}`)
        .then(response => {
            const producto = response.data;
            // Cargar los datos en el formulario
            productoFormHTML.elements.nombre.value = producto.nombre;
            productoFormHTML.elements.imagen.value = producto.imagen;
            productoFormHTML.elements.precio.value = producto.precio;
            productoFormHTML.elements.nivel.value = producto.nivel;
            productoFormHTML.elements.tipo.value = producto.tipo;
            productoFormHTML.elements.stock.value = producto.stock;
            // Guardar el id del producto que se está editando
            idProductoEditado = producto.id;
            submitBtn.textContent = 'Finalizar edición';
        })
        .catch(error => {
            swal("Error al editar el producto", "El producto no fue editado", "error");
        });
}

//Agregar nuevo producto o editar producto existente
productoFormHTML.addEventListener('submit', (event) => {
    event.preventDefault();

    const el = event.target.elements;

    //Creo un objeto con los datos del formulario
    const nuevoProducto = { 
        nombre: el.nombre.value,
        precio: el.precio.value,
        nivel: el.nivel.value,
        tipo: el.tipo.value,
        stock: el.stock.value,
        imagen: el.imagen.value
    };

    if (idProductoEditado) { //Si idProductoEditado tiene un valor, estoy editando
    // Modo edición
    axios.put(`${baseURL}/productos/${idProductoEditado}`, nuevoProducto)
        .then(response => {
            if (response.status === 200) {
                swal("El producto fue editato con éxito", "Presiona el botón para continuar", "success");
                idProductoEditado = null;
                productoFormHTML.reset(); //Devuevlo el formulario a su estado inicial
                submitBtn.textContent = 'Agregar producto' //Restauro el texto del botón
                renderProducto();
            } else {
                swal("Error al editar el producto", 'Código: ' +  response.status, "error");
            }
        })
        .catch(error => {
            if (error.response) {
                swal("Error al editar el producto", 'Código: ' +  response.status, "error");
            } else {
                swal("Error de red o al conectar al servidor", ":(", "error");
            }
        });
    } else {
        // Modo alta
        axios.post(`${baseURL}/productos`, nuevoProducto)
            .then(response => {
                if (response.status === 201) {
                    swal("El producto fue añadido con éxito", "Presiona el botón para continuar", "success");
                    productoFormHTML.reset();
                    renderProducto();
                } else {
                    swal("Error al añadir producto", 'Código: ' +  response.status, "error");
                }
            })
            .catch(error => {
                if(error.response) {
                    swal("Error al añadir producto", 'Código: ' +  error.response.status, "error");
                } else {
                    swal("Error de red o al conectar al servidor", ":(", "error");
                }
            })
    }    
})

//Eliminar producto
function eliminarProductoAux(idProducto) {
    axios.delete(`${baseURL}/productos/${idProducto}`)
        .then(response => {
            if (response.status === 200) {
            swal("El producto fue eliminado con éxito", {
            icon: "success",
            });
                renderProducto();
            } else {
                swal("Error al eliminar producto", 'Código: ' +  error.response.status, "error");
            }
        })
        .catch(error => {
            if(error.response) {
                swal("Error al eliminar producto", 'Código: ' +  error.response.status, "error");
            } else {
                swal("Error de red o al conectar al servidor", ":(", "error");
            }
        })
}

//Función para mostrar alerta de confirmación antes de eliminar un producto
function eliminarProducto(idProducto){
    swal({
    title: "¿Estas seguro?",
    text: "¡Una vez eliminado no podras deshacer la accion!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            eliminarProductoAux(idProducto);
        } else {
            swal("El producto no fue eliminado");
        }
    })    
}

//Ordenar productos de forma ascendente
function sortAsc(){
    axios.get(`${baseURL}/productos`)
        .then(response => {
            const productos = response.data;
            const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            
            productos.sort((a, b) => {
                return collator.compare(a.nombre, b.nombre)
            })
            
            renderSorted(productos);
        })
        .catch(error => {
            swal("Error al obtener la lista de productos", 'Codigo: ' + error, "error");
        })
}

//Ordenar productos de forma descendente
function sortDesc(){
    axios.get(`${baseURL}/productos`)
        .then(response => {
            const productos = response.data;
            const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
            
            productos.sort((a, b) => {
                return collator.compare(b.nombre, a.nombre)
            })
            
            renderSorted(productos);
        })
        .catch(error => {
            swal("Error al obtener la lista de productos", 'Codigo: ' + error, "error");
        })
}

//Funcion auxiliar para renderizar los productos ordenados, buscados, etc. 
//Esta función es necesaria porque renderProducto() obtiene los productos desde la API.
function renderSorted(productos) {
    tableBodyHTML.innerHTML = '';
    productos.forEach(producto => {
        tableBodyHTML.innerHTML += `
            <tr>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="max-width:60px; max-height:60px; object-fit:contain;"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.nivel}</td>
                <td>${producto.tipo}</td>
                <td>${producto.stock}</td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarProducto('${producto.id}')" title="Eliminar">
                        <i class="fa-solid fa-trash fa-fade"></i>
                    </button>
                </td>
                <td>
                    <button class="btn-editar" onclick="mostrarFormularioEdicion('${producto.id}')" title="Editar">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

//Funcion de búsqueda
function inputSearch(event){
    const search = event.target.value.toLowerCase();
    axios.get(`${baseURL}/productos`)
        .then(response => {
            const productos = response.data;
            const filteredProducts = productos.filter((producto) => {
                if (producto.nombre.toLocaleLowerCase().includes(search)) return true;
                return false;
            })
            renderSorted(filteredProducts);
        })
        .catch(error => {
            swal("Error al realizar la busqueda de productos", 'Codigo: ' + error, "error");
            tableBodyHTML.innerHTML = "<tr><td colspan='7'>Error al buscar productos</td></tr>";
            
        })
}
