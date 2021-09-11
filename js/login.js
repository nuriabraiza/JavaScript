/*Funcion que se ejecuta a partir de OnClick que esta en el HTML.
  Valida los datos ingresados en los inputs.
  Si se ingresa nombre admin y apellido admin, te lleva a la carga de poductos
  Si se ingresa nombre x y apellido x te lleva a la pagina de compras
  Finalmente, si no se ingresa nada, salta alert*/

function Ingresar() {
  var nombre = document.ingreso.nombre.value;
  var apellido = document.ingreso.apellido.value;
  //admin admin lleva al user a la carga de productos
  if (nombre == "admin" && apellido == "admin") {
    window.location = "products.html";
  }
  //nombre x y apellido x lleva a la pagina de comprar
  if (
    nombre !== "admin" &&
    nombre !== "" &&
    apellido !== "admin" &&
    apellido !== ""
  ) {
    window.location = "compra.html";
  }
  //blank blank desencadena alert para que se completen los campos
  if (nombre == "" && apellido == "") {
    alert("Ingresar Nombre y Apellido");
  }
}
