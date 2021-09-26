import { listProd, Products, productos } from "./products1.js";

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
      $("#listado").append(`<div class="card" style="width: 18rem;">
      <img src="${product.img}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title id">ID ${product.id}</h5>
        <h5 class="card-title">${product.nombre}</h5>
        <p class="card-text">Precio ${product.precio} </p>
        <p class="card-text">${product.descripcion}</p>
      </div>
    </div>`);
    }
  }
});

// Agrega un nuevo producto a la lista
const create = (product) => {
  productos.push(product);
};

// Accedo al DOM a obtener los elementos del formulario y la lista para mostrar los productos
const formProducto = document.getElementById("form-producto");
const listado = document.getElementById("listado");
const inputArch = document.getElementById("archivo");
const inputID = document.getElementById("prodID");
const inputNombre = document.getElementById("prodNombre");
const inputPrecio = document.getElementById("prodPrecio");
const inputDesc = document.getElementById("prodDesc");

function addProduct() {
  const img = inputArch.value;
  const id = inputID.value;
  const nombre = inputNombre.value;
  const precio = inputPrecio.value;
  const descripcion = inputDesc.value;

  const product = new Products(id, img, nombre, precio, descripcion);
  $("#listado").append(`<div class="card" style="width: 18rem;">
  <img src="${product.img}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title id">ID ${product.id}</h5>
    <h5 class="card-title">${product.nombre}</h5>
    <p class="card-text">Precio ${product.precio} </p>
    <p class="card-text">${product.descripcion}</p>
  </div>
</div>`);

  create(product);
}
// Escucho los eventos de submit del form para agregar producto nuevo a la lista
formProducto.addEventListener("submit", (event) => {
  addProduct();
});
