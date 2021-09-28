//Se declaran constantes y array carrito
const tbody = document.getElementsByClassName("tbody");

//addCarrito genera un nuevo item y llama a otra funcion para notificar que el prod fue agregado

export function addCarrito(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemName = item.querySelectorAll("nombre").textContent;
  const itemPrice = item.querySelectorAll("precio").textContent;

  const newItem = {
    title: itemName,
    precio: itemPrice,
    cantidad: 1,
  };

  addItemCarrito(newItem);
}

let carrito = JSON.parse(localStorage.getItem("carrito"));

if (!carrito) {
  carrito = [];
  $(".carrito").prepend(`
    <h4 class="vacio"> En este momento tu carrito esta vacio. Ingresa a Servicios y mira lo que tenemos para ofrecerte.</h4>
    <button class="btn btn-light serv"><a href="servicios.html"> Ir a Servicios </a></button>`);
} else {
  $("table").show();
}

function addItemCarrito(newItem) {
  const alert = document.getElementClassName("alert");

  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");
  //Se calcula el total del carrito
  const InputElemento = tbody.getElementsByClassName("input__elemento");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].name.trim() === newItem.name.trim()) {
      carrito[i].cantidad++;
      const inputValue = InputElemento[i];
      inputValue.value++;
      CarritoTotal();
      return null;
    }
  }

  carrito.push(newItem);

  renderCarrito();
}

//Se muestran los items en el carrito en una tabla
function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("ItemCarrito");
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="name">${item.name}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `;
    tr.innerHTML = Content;
    tbody.append(tr);
    //Escucho click para eliminar item
    tr.getElementsByClassName("delete").addEventListener(
      "click",
      removeItemCarrito
    );
    //Con el cambio se recalcula la cantidad
    tr.getElementsByClassName("input__elemento").addEventListener(
      "change",
      sumaCantidad
    );
  });
  //Se recalcula el total
  CarritoTotal();
}

//CarritoTotal funcion para calcular el total del carrito y se agregan los prod a localStorage
function CarritoTotal() {
  let Total = 0;
  const itemCartTotal = document.getElementsByClassName("itemCartTotal");
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    Total = Total + precio * item.cantidad;
  });

  itemCartTotal.innerHTML = `Total $${Total}`;
  addLocalStorage();
}

//removeItemCarrito funcion para eliminar item
function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const name = tr.getElementClassName("name").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].name.trim() === name.trim()) {
      carrito.splice(i, 1);
    }
  }

  //cuando removeItemCarrito corre, se lanza alerta con Servicio Eliminado
  const alert = document.getElementsByClassName("remove");

  setTimeout(function () {
    alert.classList.add("remove");
  }, 2000);
  alert.classList.remove("remove");

  tr.remove();
  CarritoTotal();
}

//Suma de cantidades
function sumaCantidad(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const name = tr.getElementClassName("name").textContent;
  carrito.forEach((item) => {
    if (item.name.trim() === name) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
    }
  });
}

//funcion para llevar carrito al localStorage
function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//funcion para traer el carrito del localStorage y lo redenrizo
window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};
