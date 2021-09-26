const submitir = document.querySelector(".submit");

submitir.addEventListener("click", enviado);
function enviado(evento) {
  var nombre = document.contacto.nombre.value;
  var apellido = document.contacto.apellido.value;
  var mail = document.contacto.mail.value;
  var consulta = document.contacto.consulta.value;
  if (nombre == "" && apellido == "" && mail == "" && consulta == "") {
    $("main").prepend(`
      <div class="alert alert-warning d-flex align-items-center" id="warning" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    <div>
      Por favor completar el formulario
    </div>
  </div>`);
    const alert = document.getElementClassName("alert");

    setTimeout();
    evento.preventDefault();
    alert.classList.remove("hide");
  } else {
    $("main").prepend(`
    <div class="alert alert-success d-flex align-items-center" id="success" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    <div >
      Tu consulta fue enviada con exito. Nuestro equipo estará contactandote por mail.
    </div>
  </div>`);
    setTimeout();
    evento.preventDefault();
    alert.classList.remove("hide");
  }
}

setTimeout(function () {
  alert.classList.add("hide");
}, 5000);
