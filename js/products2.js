class Products {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre.toLowerCase();
    this.precio = precio;
    this.stock = stock;
  }
}

// Se obtiene la lista de productos del storage
let productos = JSON.parse(localStorage.getItem("productos"));

// Si no hay nada en el storage se inicializa la lista vacía
if (!productos) {
  productos = [];
}

function getAll() {
  return productos;
}

// Agrega un nuevo producto a la lista y lo persiste en el storage
const create = (prod) => {
  productos.push(prod);
  localStorage.setItem("productos", JSON.stringify(productos));
};

// Encuentra un producto por nombre
const findOne = (id) => {
  const listProd = productos.find((producto) => producto.id === id);
  if (!listProd) {
    throw Error("No existe ese producto");
  }
  return listProd;
};

// Actualiza un producto por nombre
const update = (id, stock) => {
  const producto = findOne(id);
  producto.stock = stock;
};

// Elimina un producto por nombre
const remove = (id) => {
  const producto = findOne(id);
  const index = productos.findIndex((producto) => producto.id === id);
  if (index >= 0) {
    productos.splice(index, 1);
  }
};

// Accedo al DOM a obtener los elementos del formulario y la lista para mostrar los productos
const formProducto = document.getElementById("form-producto");
const listado = document.getElementById("listado");
const inputID = document.getElementById("prodID");
const inputNombre = document.getElementById("prodNombre");
const inputPrecio = document.getElementById("prodPrecio");
const inputStock = document.getElementById("prodStock");

// Renderiza los productos que existen en el storage
const showProductos = (productos) => {
  for (let i = 0; i < productos.length; i++) {
    let itemProd = document.createElement("li");
    itemProd.textContent = ` ID ${productos[i].id} - Producto ${productos[i].nombre} - Precio ${productos[i].precio} - Stock ${productos[i].stock}`;
    itemProd.id = productos[i].id;

    listado.appendChild(itemProd);

    // Capturo el click sobre producto y muestra info en console
    itemProd.onclick = () => {
      console.log(productos[i]);
    };
  }
};

// Escucho los eventos de submit del form para agregar productos nuevos a la lista y el storage
//jQuery
$("#form-producto").submit(function () {
  const id = inputID.value;
  const nombre = inputNombre.value;
  const precio = inputPrecio.value;
  const stock = inputStock.value;

  const producto = new Products(id, nombre, precio, stock);

  create(producto);
});

// showProducts para que la lista sea visible en pantalla
showProductos(productos);
