/*Funcion que se ejecuta a partir de OnClick que esta en el HTML.
  Valida los datos ingresados en los inputs.
  Si se ingresa nombre admin y apellido admin, te lleva a la carga de poductos
  Si se ingresa nombre x y apellido x te lleva a la pagina de compras
  Finalmente, si no se ingresa nada, salta alert*/

$("#btnIng").click(function () {
  var user = document.ingreso.user.value;
  var password = document.ingreso.password.value;
  //admin admin lleva al user a la carga de productos
  if (user == "admin" && password == "admin") {
    window.location = "productos2.html";
  }
  //nombre x y apellido x lleva a la pagina de comprar
  if (
    user !== "admin" &&
    user !== "" &&
    password !== "admin" &&
    password !== ""
  ) {
    alert("Los datos ingresados son incorrectos");
  }
  //blank blank desencadena alert para que se completen los campos
  if (user == "" && password == "") {
    alert("Ingresar Usuario y Contraseña");
  }
});
