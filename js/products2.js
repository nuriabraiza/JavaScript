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
