const listProd = "./data/data.json";

export class Products {
  constructor(id, nombre, precio, descripcion) {
    this.id = id;
    this.nombre = nombre.toLowerCase();
    this.precio = precio;
    this.descripcion = descripcion;
  }
}

// Array de productos
let productos = [];

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
      $("body").append(`<div class=container>
                        <p class = id>ID: ${product.id} </p>
                        <p class = nombre> ${product.nombre}</p>
                        <p class = precio> Precio: ${product.precio} </p>
                        <p class = descripcion> Descripción: ${product.descripcion} </p>
                        </div>`);
    }
    console.log(productos);
  }
});

// Agrega un nuevo producto a la lista
const create = (product) => {
  productos.push(product);
};

// Accedo al DOM a obtener los elementos del formulario y la lista para mostrar los productos
const formProducto = document.getElementById("form-producto");
const listado = document.getElementById("listado");
const inputID = document.getElementById("prodID");
const inputNombre = document.getElementById("prodNombre");
const inputPrecio = document.getElementById("prodPrecio");
const inputDesc = document.getElementById("prodDesc");

// Escucho los eventos de submit del form para agregar producto nuevo a la lista
formProducto.addEventListener("submit", (event) => {
  const id = inputID.value;
  const nombre = inputNombre.value;
  const precio = inputPrecio.value;
  const descripcion = inputDesc.value;

  const product = new Products(id, nombre, precio, descripcion);
  $("body").append(`<div class=container>
  <p class = id>ID: ${id} </p>
  <p class = nombre> ${nombre}</p>
  <p class = precio> Precio: ${precio} </p>
  <p class = descripcion> Descripción: ${descripcion} </p>
  </div>`);

  create(product);
  addProduct = () => {
    $.post(listProd, product, (response, status) => {
      if (status === "success") {
        alert("Producto Guardado" + status);
        console.log(response);
      }
    });
  };
});
