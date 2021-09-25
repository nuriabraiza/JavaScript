export const listProd = "./data/data.json";

export class Products {
  constructor(id, nombre, precio, descripcion) {
    this.id = id;
    this.nombre = nombre.toLowerCase();
    this.precio = precio;
    this.descripcion = descripcion;
  }
}

// Array de productos
export let productos = [];
