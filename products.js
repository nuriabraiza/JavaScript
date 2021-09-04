class Products {
  constructor(nombre, precio, stock) {
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

const getAll = () => {
  return productos;
};

// Agrega un nuevo producto a la lista y lo persiste en el storage
const create = (prod) => {
  productos.push(prod);
  localStorage.setItem("productos", JSON.stringify(productos));
};

// Encuentra un producto por nombre
const findOne = (nombre) => {
  const listProd = productos.find((producto) => producto.nombre === nombre);
  if (!listProd) {
    throw Error("No existe gatito con ese id");
  }
  return listProd;
};

// Actualiza un producto por nombre
const update = (nombre, stock) => {
  const producto = findOne(nombre);
  producto.stock = stock;
};

// Elimina un producto por nombre
const remove = (nombre) => {
  const producto = findOne(nombre);
  const index = productos.findIndex((producto) => producto.nombre === nombre);
  if (index >= 0) {
    productos.splice(index, 1);
  }
};

// Accedo al DOM a obtener los elementos del formulario y la lista para mostrar los productos
const formProducto = document.getElementById("form-producto");
const listado = document.getElementById("listado");
const inputNombre = document.getElementById("prodNombre");
const inputPrecio = document.getElementById("prodPrecio");
const inputStock = document.getElementById("prodStock");

// Renderiza los productos que existen en el storage
const showProductos = (productos) => {
  for (let i = 0; i < productos.length; i++) {
    let itemProd = document.createElement("li");
    itemProd.textContent = `Producto ${productos[i].nombre} - Precio ${productos[i].precio} - Stock ${productos[i].stock}`;
    itemProd.nombre = productos[i].nombre;

    listado.appendChild(itemProd);

    // Capturo el click sobre producto y muestra info en console
    itemProd.onclick = () => {
      console.log(productos[i]);
    };
  }
};

// Escucho los eventos de submit del form para agregar productos nuevos a la lista y el storage
formProducto.addEventListener("submit", (event) => {
  const nombre = inputNombre.value;
  const precio = inputPrecio.value;
  const stock = inputStock.value;

  const producto = new Products(nombre, precio, stock);

  create(producto);
});

// showProducts para que la lista sea visible en pantalla
showProductos(productos);
