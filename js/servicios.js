import { listProd, Products, productos } from "./products1.js";

$.getJSON(listProd, function (response, status) {
  if (status === "success") {
    const data = response;

    for (let product of data) {
      productos.push(
        new Products(
          product.id,
          product.img,
          product.nombre,
          product.precio,
          product.descripcion
        )
      );
      $("#items").append(`<div class="card" >
      <img src="${product.img}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title titulo">${product.nombre}</h5>
        <p class="card-text">${product.descripcion}</p>
        <p class="card-text precio">$ ${product.precio}</p>
        <p id="prodID" class="card-text">$ ${product.id}</p>
        
      </div>
      <button class="btn btn-light button">Añadir a Carrito</button>
      </button> 
      </div>
         `);
    }
  }
});

const clickButton = document.getElementsByClassName("button");
const tbody = document.getElementsByClassName("tbody");
let carrito = [];

clickButton.forEach((btn) => {
  btn.addEventListener("click", addCarrito);
});

function addCarrito(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemTitle = item.getElementClassName("titulo").textContent;
  const itemPrice = item.getElementClassName("precio").textContent;
  const itemImg = item.getElementClassName("card-img-top").src;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  };

  addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
  const alert = document.getElementClassName("alert");

  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");

  const InputElemento = tbody.getElementsByClassName("input__elemento");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === newItem.title.trim()) {
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

export function renderCarrito() {
  tbody.innerHTML = "";
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("ItemCarrito");
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `;
    tr.innerHTML = Content;
    tbody.append(tr);

    tr.getElementsByClassName("delete").addEventListener(
      "click",
      removeItemCarrito
    );
    tr.getElementsByClassName("input__elemento").addEventListener(
      "change",
      sumaCantidad
    );
  });
  CarritoTotal();
}

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

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const tr = buttonDelete.closest(".ItemCarrito");
  const title = tr.getElementClassName("title").textContent;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1);
    }
  }

  const alert = document.getElementsByClassName("remove");

  setTimeout(function () {
    alert.classList.add("remove");
  }, 2000);
  alert.classList.remove("remove");

  tr.remove();
  CarritoTotal();
}

function sumaCantidad(e) {
  const sumaInput = e.target;
  const tr = sumaInput.closest(".ItemCarrito");
  const title = tr.getElementClassName("title").textContent;
  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
    }
  });
}

function addLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage) {
    carrito = storage;
    renderCarrito();
  }
};
