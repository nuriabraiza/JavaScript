//Traigo carrito del LocalStorage
const cartCheckout = document.getElementById("cart-checkout").content;
const footer1 = document.getElementById("cart-footer").content;
const footer2 = document.getElementById("table-footer");
const listCheckout = document.getElementById("tabla-carrito");
let checkout = JSON.parse(localStorage.getItem("carrito"));
const fragmento = document.createDocumentFragment();

//Leyenda en caso de estar el carrito vacio
if (!checkout) {
  $(".table").hide();
  $(".btn").hide();
  $(".container").append(`
    <h4 class="vacio"> En este momento tu carrito esta vacio. Ingresa a Servicios y mira lo que tenemos para ofrecerte.</h4>
    <button class="btn btn-light serv"><a href="servicios.html"> Ir a Servicios </a></button>`);
  checkout = {};
}

//Se muestran los items guardados en localStorage
Object.values(checkout).forEach((producto) => {
  cartCheckout.querySelector("th").textContent = producto.id;
  cartCheckout.querySelectorAll("td")[0].textContent = producto.nombre;
  cartCheckout.querySelectorAll("td")[1].textContent = producto.cantidad;
  cartCheckout.querySelector("span").textContent =
    producto.cantidad * producto.precio;

  const clone = cartCheckout.cloneNode(true);
  fragmento.appendChild(clone);
});

listCheckout.appendChild(fragmento);

footer2.innerHTML = "";
const totalCantidad = Object.values(checkout).reduce(
  (acc, { cantidad }) => acc + cantidad,
  0
);
const totalPrecio = Object.values(checkout).reduce(
  (acc, { cantidad, precio }) => acc + cantidad * precio,
  0
);
footer1.querySelectorAll("td")[0].textContent = totalCantidad;
footer1.querySelector("span").textContent = totalPrecio;

const clone = footer1.cloneNode(true);
fragmento.appendChild(clone);
footer2.appendChild(fragmento);

//Acepta -> lleva a formulario de pago
const btnAceptar = document.getElementById("aceptar");
btnAceptar.addEventListener("click", () => {
  $("#modal-formulario").modal("show");
});

$("#form-datos-tarjeta").click(function (e) {
  if (
    $("#nombre").val() != "" &&
    $("#apellido").val() != "" &&
    $("#mail").val() != "" &&
    $("#tarjeta").val() != "" &&
    $("#titular").val() != "" &&
    $("#mes").val() != "" &&
    $("#año").val() != "" &&
    $("#ccv").val() != ""
  ) {
    $("#modal-formulario").modal("hide");
    $("#modal-compra").modal("show");
  } else {
    $("#modal-formulario").modal("hide");
    $("#modal-incompleto").modal("show");
    const btnCont = document.getElementById("continuar");
    btnCont.addEventListener("click", () => {
      $("#modal-formulario").modal("show");
    });
  }
});

const closebtn = document.getElementById("btn-close");
closebtn.addEventListener("click", () => {
  $("#modal-formulario").modal("hide");
});

//Formulario completo activa modal, al cerrar se limpia el storage y te lleva a inicio
const btnClose = document.getElementById("close");
btnClose.addEventListener("click", () => {
  checkout = localStorage.clear();
  window.location = "index.html";
});

//Cancelar compra limpia el storage y te lleva a inicio
const btnCancelar = document.getElementById("cancelar");
btnCancelar.addEventListener("click", () => {
  checkout = localStorage.clear();
  window.location = "index.html";
});
