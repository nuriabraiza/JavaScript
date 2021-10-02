//Variables linkeadas al DOM
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const tFooter = document.getElementById("table-footer");
const cardTemp = document.getElementById("template-card").content;
const cartFooter = document.getElementById("cart-footer").content;
const cart = document.getElementById("cart").content;
const sumAlert = document.getElementsByClassName("hide");
const restAlert = document.getElementsByClassName("remove");
const fragmento = document.createDocumentFragment();
let carrito = {};

//Carga HTML y busca la informacion del URL
//Info carrito en localStorage
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    listCarrito();
  }
});
//eventos
cards.addEventListener("click", (e) => {
  addCarrito(e);
});

items.addEventListener("click", (e) => {
  botones(e);
});

//Trae la informacion del URL
const fetchData = async () => {
  try {
    const resp = await fetch("http://localhost:3000/products");
    const data = await resp.json();
    templateComplete(data);
  } catch (error) {
    console.log(error);
  }
};

//Visualizacion de productos en DOM
const templateComplete = (data) => {
  data.forEach((product) => {
    cardTemp.querySelector("img").setAttribute("src", product.img);
    cardTemp.querySelector("h5").textContent = product.nombre;
    cardTemp.querySelector("h6").textContent = product.descripcion;
    cardTemp.querySelector("p").textContent = product.precio;
    cardTemp.querySelector(".add").dataset.id = product.id;
    const clone = cardTemp.cloneNode(true);
    fragmento.appendChild(clone);
  });
  cards.appendChild(fragmento);
};

//Agregar al carrito
const addCarrito = (e) => {
  if (e.target.classList.contains("add")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

//Como se va a visualizar en la tabla Carrito
const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector(".add").dataset.id,
    nombre: objeto.querySelector("h4").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad: 1,
  };

  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }

  carrito[producto.id] = { ...producto };
  listCarrito();
};

//A partir del orden de Producto, se asocia al DOM y cargan los valores
const listCarrito = () => {
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    cart.querySelector("th").textContent = producto.id;
    cart.querySelectorAll("td")[0].textContent = producto.nombre;
    cart.querySelectorAll("td")[1].textContent = producto.cantidad;
    cart.querySelector(".suma").dataset.id = producto.id;
    cart.querySelector(".resta").dataset.id = producto.id;
    cart.querySelector("span").textContent =
      producto.cantidad * producto.precio;

    const clone = cart.cloneNode(true);
    fragmento.appendChild(clone);
  });
  items.appendChild(fragmento);
  footerCart();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Si carrito esta vacio entonces muestra mensaje, sino muestra totales y botones vaciar y finalizar
const footerCart = () => {
  tFooter.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    tFooter.innerHTML = `<th scope="row" colspan="5">
      Carrito vacío - comience a comprar!
    </th>`;
    return;
  }

  const totalCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const totalPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );
  cartFooter.querySelectorAll("td")[0].textContent = totalCantidad;
  cartFooter.querySelector("span").textContent = totalPrecio;

  const clone = cartFooter.cloneNode(true);
  fragmento.appendChild(clone);
  tFooter.appendChild(fragmento);

  const btnClear = document.getElementById("vaciar");
  btnClear.addEventListener("click", () => {
    carrito = {};
    listCarrito();
  });
};

//Aumentar o reducir cantidad de productos
const botones = (e) => {
  if (e.target.classList.contains("suma")) {
    carrito[e.target.dataset.id];

    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    listCarrito();
  }

  if (e.target.classList.contains("resta")) {
    carrito[e.target.dataset.id];

    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    listCarrito();
  }
  e.stopPropagation();
};
