/*Se llega a esta pantalla haciendo click en el footer logo de Inicio
  Funcion que valida los datos ingresados en los inputs.
  Si se ingresa usuario admin y contraseña admin123, te lleva a la carga de poductos
  Si se ingresa usuario x y contraseña x alert por datos incorrectos
  Finalmente, si no se ingresa nada, salta alert por campos en blanco*/

$("#btnIng").click(function () {
  var user = document.ingreso.user.value;
  var password = document.ingreso.password.value;
  //admin admin lleva al user a la carga de productos
  if (user == "admin" && password == "admin123") {
    window.location = "productos2.html";
  }
  //nombre x y apellido x lleva a la pagina de comprar
  if (
    user !== "admin" &&
    user !== "" &&
    password !== "admin123" &&
    password !== ""
  ) {
    alert("Los datos ingresados son incorrectos");
  }
  //blank blank desencadena alert para que se completen los campos
  if (user == "" && password == "") {
    alert("Ingresar Usuario y Contraseña");
  }
});
