# Clase-8-storage-y-operadores-avanzados
# Mi Simulador de Tienda

Este es mi proyecto de las Pre-Entregas de DOM/Eventos y Sincronización de Estado. Es una tienda simulada donde se pueden ver productos, agregar nuevos, eliminarlos y ahora tambien los datos quedan guardados aunque recargues la pagina.

## Que hace

- Muestra una lista de productos en pantalla (nombre y precio)
- Tiene un formulario para agregar un producto nuevo (nombre + precio)
- Cada producto tiene un boton para eliminarlo
- Tiene un buscador que filtra la lista mientras escribis
- Tiene un boton para vaciar toda la lista
- Cuando agregas, eliminas o vaciás algo, aparece un mensaje arriba avisando
- Si recargas la pagina (F5), los productos que agregaste siguen ahi, no se pierden

## Como lo hice

Segui con la misma tienda que vengo armando en las entregas anteriores. Primero saque todos los `prompt`, `alert` y `console.log` que tenia y pase todo a manejo del DOM. Ahora en esta entrega le sume `localStorage` para que el array no se reinicie cada vez que se refresca la pagina, y aproveche para meter algunos operadores modernos que vimos en el modulo (ternario, `&&`, `??`, `?.` y destructuring) para que quede mas prolijo.

Los productos ya no arrancan siempre del mismo array fijo: primero se fija si hay algo guardado en el localStorage, y si no hay nada, recien ahi usa el array por defecto:

```js
let productos = JSON.parse(localStorage.getItem("productos")) ?? [
  { id: 1, nombre: "Teclado mecanico", precio: 45000 },
  { id: 2, nombre: "Mouse inalambrico", precio: 22000 },
  { id: 3, nombre: "Monitor 24''", precio: 180000 }
];
```

Cada vez que se agrega, elimina o vacia la lista, se llama a una funcion `guardarStorage()` que hace el `JSON.stringify()` y actualiza el localStorage, y despues se vuelve a renderizar todo con `renderizarProductos()`.

## Cosas que usé

- `getElementById` para agarrar los elementos del HTML
- `innerHTML` con template strings (backticks) para armar las tarjetas de cada producto
- `addEventListener` con:
  - `click` en el boton de agregar
  - `click` en el contenedor (para el boton eliminar de cada producto, usando `event.target`)
  - `click` en el boton de vaciar
  - `keyup` en el input de busqueda para filtrar en vivo
- `filter()` para el buscador y para eliminar un producto del array
- `forEach()` para recorrer el array y renderizar cada item
- `localStorage.setItem()` / `getItem()` junto con `JSON.stringify()` / `JSON.parse()` para persistir los datos
- Operador `??` para usar el array por defecto solo si no hay nada guardado
- Operador `?.` al leer el `data-id` del boton, por si el click no vino de ahi
- Operador ternario en vez de un if/else para validar el formulario y para mostrar el mensaje de "lista vacia"
- `&&` como atajo para ejecutar `eliminarProducto()` solo si se clickeo el boton correcto
- Destructuring para sacar `id`, `nombre` y `precio` de cada producto al renderizarlo

## Estructura del proyecto

```
├── index.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Como probarlo

Solo hay que abrir el `index.html` en el navegador, no necesita nada instalado. Si agregas o eliminas productos y despues recargas la pagina, los cambios van a seguir ahi.

## Pendiente / a mejorar

- Agregar validacion para que el precio no pueda ser negativo
- Poder editar un producto ya agregado, no solo eliminarlo