import { listProd, Products, productos } from "./products1.js";

$.get(listProd, function (response, status) {
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
      <input type="submit" value="Agregar al Carrito" id="button" />
      </div>
      
         `);
    }
  }
});

$("#button").click(function () {
  console.log("click");
});
