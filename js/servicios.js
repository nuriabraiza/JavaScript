import { listProd, Products, productos } from "./products1.js";
import { addItemCarrito } from "./carrito.js";

$.getJSON(listProd, function (response, status) {
  if (status === "success") {
    const data = response;

    for (let product of data) {
      productos.push(
        new Products(
          product.id,
          product.img,
          product.nombre,
          product.precio,
          product.descripcion
        )
      );
      $("#items").append(`<div class="card" >
      <img src="${product.img}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title titulo">${product.nombre}</h5>
        <p class="card-text">${product.descripcion}</p>
        <p class="card-text precio">$ ${product.precio}</p>
        <p id="prodID" class="card-text">$ ${product.id}</p>
        
      </div>
      <button class="btn btn-light button">Añadir a Carrito</button>
      </button> 
      </div>
         `);
    }
  }
});

//Se declaran constantes y array carrito
const clickButton = document.getElementsByClassName("button");
export const tbody = document.getElementsByClassName("tbody");

//por cada click de boton correr addCarrito
clickButton.forEach(function (btn) {
  btn.addEventListener("click", addCarrito);
});

//addCarrito genera un nuevo item y llama a otra funcion para notificar que el prod fue agregado
function addCarrito(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemTitle = item.getElementClassName("titulo").textContent;
  const itemPrice = item.getElementClassName("precio").textContent;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    cantidad: 1,
  };

  addItemCarrito(newItem);
}
