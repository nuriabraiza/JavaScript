const listProd = "./data/data.json";

class Servicios {
  constructor(id, nombre, precio, descripcion) {
    this.id = id;
    this.nombre = nombre.toLowerCase();
    this.precio = precio;
    this.descripcion = descripcion;
  }
}

let productos = [];

$.getJSON(listProd, function (response, status) {
  if (status === "success") {
    const data = response;

    for (let product of data) {
      productos.push(
        new Servicios(
          product.id,
          product.nombre,
          product.precio,
          product.descripcion
        )
      );
    }
  }
});

// Denominamos variable carrito como array
let carrito = [];
// Denominamos valor inicial de la variable total
let total = 0;

// Aplicamos jQuery para asociar variables con id de HTML
const items = document.querySelector("#items");
const prodCarrito = document.querySelector("#carrito");
const valorFinal = document.querySelector("#total");
const resetBtn = document.querySelector("#limpiar");

// Visualiza la lista de productos con su precio por unidad
function renderizarProductos() {
  productos.forEach((info) => {
    // Armado de contenedor de los productos
    const iProd = document.createElement("div");
    iProd.classList.add("tile");
    const iProdB = document.createElement("div");
    iProdB.classList.add("tile-body");
    // Servicio
    const iProdNom = document.createElement("h5");
    iProdNom.classList.add("tile-nombre");
    iProdNom.textContent = info.nombre;
    // Precio
    const iProdPrecio = document.createElement("p");
    iProdPrecio.classList.add("tile-precio");
    iProdPrecio.textContent = info.precio + "$";
    // Descripcion
    const iProdDesc = document.createElement("p");
    iProdDesc.classList.add("tile-descripcion");
    iProdDesc.textContent = info.descripcion;
    // Boton para agregar producto
    const btnCarrito = document.createElement("button");
    btnCarrito.classList.add("btn");
    btnCarrito.textContent = "+";
    btnCarrito.setAttribute("marcador", info.id);
    btnCarrito.addEventListener("click", sumarCarrito);
    // Insertamos los valores determinados anteriormente
    iProdB.appendChild(iProdNom);
    iProdB.appendChild(iProdPrecio);
    iProdB.appendChild(iProdDesc);
    iProdB.appendChild(btnCarrito);
    iProd.appendChild(iProdB);
    items.appendChild(iProd);
  });
}

// Funcion para sumar productos al carrito
function sumarCarrito(evento) {
  carrito.push(evento.target.getAttribute("marcador"));
  // Calculo el total
  calcularTotal();
  // Actualizamos el carrito
  showCarrito();
}

// Funcion showCarrito para traer todos los productos sumados
function showCarrito() {
  prodCarrito.textContent = "";
  // Quitamos los duplicados y generamos cada item
  const carritoSimple = [...new Set(carrito)];
  carritoSimple.forEach((item) => {
    const miItem = listProd.filter((itemList) => {
      return itemList.id === parseInt(item);
    });
    // Cuenta el número de veces que se repite el producto
    const cantidad = carrito.reduce((total, itemId) => {
      return itemId === item ? (total += 1) : total;
    }, 0);
    //Imprime los productos como li
    const lista = document.createElement("li");
    lista.classList.add("list-group-item");
    lista.textContent = `${cantidad} x ${miItem[0].nombre} - ${miItem[0].precio}$`;
    // Boton para borrar cada item
    const btnBorrar = document.createElement("button");
    btnBorrar.classList.add("btn");
    btnBorrar.textContent = "X";
    btnBorrar.style.marginLeft = "1rem";
    btnBorrar.dataset.item = item;
    btnBorrar.addEventListener("click", eliminarItem);
    lista.appendChild(btnBorrar);
    prodCarrito.appendChild(lista);
  });
}

// Evento para borrar una linea de elementos del carrito
function eliminarItem(evento) {
  // Obtenemos el producto ID que hay en el boton apretado
  const id = evento.target.dataset.item;
  // Borramos todos los productos de esa linea
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });
  // Volvemos a traer los productos restantes del carrito
  showCarrito();
  // Calculamos de nuevo el precio
  calcularTotal();
}

// calcularTotal a partir de todos los productos sumados al carrito
function calcularTotal() {
  total = 0;
  // Recorremos el array del carrito
  carrito.forEach((item) => {
    // De cada elemento traemos el precio
    const miItem = productos.filter((itemList) => {
      return itemList.id === parseInt(item);
    });
    total = total + miItem[0].precio;
  });
  // Renderizamos el precio en el HTML
  valorFinal.textContent = total.toFixed(2);
}

// vaciarCarrito elimina todos los items agregados

function vaciarCarrito() {
  // Limpiamos los productos guardados
  carrito = [];
  // Renderizamos los cambios
  showCarrito();
  calcularTotal();
}

// Escuchamos el click en el btn vaciar
resetBtn.addEventListener("click", vaciarCarrito);

// Inicio
renderizarProductos();
