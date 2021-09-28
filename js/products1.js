export const listProd = "http://localhost:3000/products";

export class Products {
  constructor(id, img, nombre, precio, descripcion) {
    this.id = id;
    this.img = img;
    this.nombre = nombre.toLowerCase();
    this.precio = precio;
    this.descripcion = descripcion;
  }
}

// Array de productos
export let productos = [];
