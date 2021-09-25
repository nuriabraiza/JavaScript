import { listProd, Products, productos } from "./products2.js";

$.getJSON(listProd, function (response, status) {
  if (status === "success") {
    const data = response;

    for (let product of data) {
      productos.push(
        new Products(
          product.id,
          product.nombre,
          product.precio,
          product.descripcion
        )
      );
      $(".section__main").append(`<div class="card" >
      <img src="${product.img}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title titulo">${product.nombre}</h5>
        <p class="card-text">${product.descripcion}</p>
        <p class="card-text texto">$ ${product.precio}</p>
        <p id="prodID" class="card-text">$ ${product.id}</p>
        <button id="btnCarrito" class="btn btn-light">Agregar al Carrito</button>
      </div>
    </div>`);
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
const btnCarrito = document.querySelector("#btnCarrito");
const prodID = document.querySelector("#prodID");

productos.forEach((info) => {
  btnCarrito.setAttribute("marcador", info.id);
  btnCarrito.addEventListener("click", sumarCarrito);
});

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
//resetBtn.addEventListener("click", vaciarCarrito);
