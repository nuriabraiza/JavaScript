const submitir = document.querySelector(".submitir");

submitir.addEventListener("click", enviado);
function enviado(evento) {
  var nombre = document.contacto.nombre.value;
  var apellido = document.contacto.apellido.value;
  var mail = document.contacto.mail.value;
  var consulta = document.contacto.consulta.value;
  if (nombre == "" && apellido == "" && mail == "" && consulta == "") {
    alert("Completar el formulario");
  } else {
    alert("Tu consulta ha sido enviada. Estaremos contactandote por mail");
  }
}
