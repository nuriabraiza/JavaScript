const submitir = document.querySelector(".submit");

function enviado() {
  if (
    $("#name").val() != "" &&
    $("#apellido").val() != "" &&
    $("#inputEmail4").val() != "" &&
    $("#texto").val() != ""
  ) {
    $("#modal-contacto").modal("show");
  } else {
    $("#modal-incompleto").modal("show");
  }
}
const btnClose = document.getElementById("close");
btnClose.addEventListener("click", () => {
  window.location = "index.html";
});

const btnCont = document.getElementById("continuar");
btnCont.addEventListener("click", () => {
  $("#modal-incompleto").modal("hide");
});

submitir.addEventListener("click", (event) => {
  enviado();
  event.preventDefault();
});
