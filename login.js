function Ingresar() {
  var nombre = document.ingreso.nombre.value;
  var apellido = document.ingreso.apellido.value;
  if (nombre == "admin" && apellido == "admin") {
    window.location = "products.html";
  }
  if (
    nombre !== "admin" &&
    nombre !== "" &&
    apellido !== "admin" &&
    apellido !== ""
  ) {
    window.location = "compra.html";
  }
  if (nombre == "" && apellido == "") {
    alert("Ingresar Nombre y Apellido");
  }
}
