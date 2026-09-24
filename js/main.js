let productos = JSON.parse(localStorage.getItem("productos")) ?? [
    { id: 1, nombre: "Teclado mecanico", precio: 45000 },
    { id: 2, nombre: "Mouse inalambrico", precio: 22000 },
    { id: 3, nombre: "Monitor 24''", precio: 18000 }
];

const contenedorItems = document.getElementById("contenedorItems");
const inputNombre = document.getElementById("inputNombre");
const inputPrecio = document.getElementById("inputPrecio");
const btnAgregar = document.getElementById("btnAgregar");
const btnVaciar = document.getElementById("btnVaciar");
const inputBuscar = document.getElementById("inputBuscar");
const mensaje = document.getElementById("mensaje");

function guardarStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}


function renderizarProductos(lista) {
    contenedorItems.innerHTML = lista.length === 0 ? "<p class='vacio'>No hay productos para mostrar</p>" : "";
    lista.forEach(producto => {
        const { id, nombre, precio } = producto

        const item = document.createElement("div");
        item.className = "item"; 
        item.innerHTML = `
            <div> 
                <h3>${nombre}</h3>
                <p>$${precio}</p>
            </div>
            <button class="btnEliminar" data-id="${id}">Eliminar</button>        
        `;
        contenedorItems.appendChild(item);
    });
}

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000);
}

function agregarProducto(nombre, precio) {
    const nuevoProducto = { id: Date.now(), nombre, precio };

    productos.push(nuevoProducto);
    guardarStorage();
    renderizarProductos(productos);
    mostrarMensaje("Producto agregado");

    inputNombre.value = "";
    inputPrecio.value = "";
    inputNombre.focus();
}

function eliminarProducto(idTexto) {
    const id = Number(idTexto);
    productos = productos.filter(p => p.id !== id);
    guardarStorage();
    renderizarProductos(productos);
    mostrarMensaje("Producto eliminado");
}

btnAgregar.addEventListener("click", () => {
    const nombre = inputNombre.value;
    const precio = inputPrecio.value;
    const camposCompletos = nombre !== "" && precio !== "";

    camposCompletos ? agregarProducto(nombre, precio) : mostrarMensaje("Completa nombre y precio");
});

contenedorItems.addEventListener("click", (event) => {
    const esBotonEliminar = event.target.classList.contains("btnEliminar");
    const id = event.target?.dataset?.id;

    esBotonEliminar && eliminarProducto(id);
});

btnVaciar.addEventListener("click", () => {
    productos = [];
    guardarStorage();
    renderizarProductos(productos);
    mostrarMensaje("Se vacio la lista");
});

inputBuscar.addEventListener("keyup", () => {
    const texto = inputBuscar.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    renderizarProductos(filtrados);
});

renderizarProductos(productos);

