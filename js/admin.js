const productos = [{
    nombre: 'Espada Maestra',
    precio: 9999.99,
    nivel: 100,
    tipo: 'Espada Legendaria',
    stock: 1,
    id: '1',
    imagen: 'img/Espada-Maestra.png'
},
{
    nombre: 'Bomba',
    precio: 100,
    nivel: 1,
    tipo: 'arrojable',
    stock: 10,
    id: '2',
    imagen: 'img/bomb.png'
},
{
    nombre: 'Hada Enfrascada',
    precio: 1000,
    nivel: 10,
    tipo: 'ayuda',
    stock: 5,
    id: '3',
    imagen: 'img/FairyBottle.webp'
},
{
    nombre: 'Espada Buster',
    precio: 5000,
    nivel: 50,
    tipo: 'Espada pesada',
    stock: 1,
    id: '4',
    imagen: 'img/Cloud-espada.png'
},
{
    nombre: 'Caparazón Azul',
    precio: 300,
    nivel: 10,
    tipo: 'arrojable',
    stock: 10,
    id: '5',
    imagen: 'img/Caparazon-azul.png'
},
{
    nombre: 'Armadura Daédrica',
    precio: 3000,
    nivel: 25,
    tipo: 'Armadura pesada',
    stock: 2,
    id: '6',
    imagen: 'img/Armadura-daedrica.png'
}];

const tableBodyHTML = document.getElementById('table-body');

const productoFormHTML = document.getElementById('producto-form');


//Alta de productos
productoFormHTML.addEventListener('submit', (event) => { 
    event.preventDefault();

    const el = event.target.elements;

    const nuevoProducto = {
        id: crypto.randomUUID(),
        nombre: el.nombre.value,
        precio: el.precio.value,
        nivel: el.nivel.value,
        tipo: el.tipo.value,
        stock: el.stock.value,
        imagen: el.imagen.value
    }

    //Me fijo si el usuario ya agregó un producto con el mismo nombre
    const existente = productos.find((prod) => {
        if (prod.nombre.trim().toLowerCase() === nuevoProducto.nombre.trim().toLowerCase()) return true;
    })
    
    //De ser así, alerto al usuario y no lo agrego, si no lo agrego al array
    if (existente) {
        alert("Ya existe un producto con ese nombre");
    } else {
        productos.push(nuevoProducto);
    }
    
    renderProductos(productos);
})

function renderProductos(arrayProductos){
    tableBodyHTML.innerHTML = "";
    arrayProductos.forEach((producto, index) => {
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
            </tr>
        `;
    });
}

renderProductos(productos);

function eliminarProducto(idProducto) {
    const indice = productos.findIndex((prod) => {
        if (prod.id === idProducto) return true;
    })

    if (indice === -1) console.log("No se encontró el producto");

    productos.splice(indice, 1);
    renderProductos(productos);
}

function inputSearch(event){
    const search = event.target.value.toLowerCase();
    const filteredProducts = productos.filter((producto) => {
        if (producto.nombre.toLocaleLowerCase().includes(search)) return true;
        return false;
    })
    
    renderProductos(filteredProducts);
}

function sortAsc(){
    const collator = new Intl.Collator(undefined, {sensitivity: 'base'});

    productos.sort((a, b) => {
        return collator.compare(a.nombre, b.nombre)
    })

    renderProductos(productos);
}

function sortDesc(){
    const collator = new Intl.Collator(undefined, {sensitivity: 'base'});

    productos.sort((a, b) => {
        return collator.compare(b.nombre, a.nombre)
    })

    renderProductos(productos);
}