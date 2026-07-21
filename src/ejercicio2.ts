/**
 * El Carrito de Compras
    Enunciado: Crea una lista de productos de tecnología. 
    Cada producto tiene un nombre y un precio, pero el descuento es opcional. 
    Recorre la lista con un bucle forEach y calcula el precio final 
    que pagará el usuario usando un operador ternario.

interface Producto {
    nombre: string;
    precio: number;
    descuento?: number;
}

// Ejemplo de cálculo
// precioFinal = precio - (descuento ? precio * descuento : 0)

🎯 Objetivo: Practicar arreglos, forEach, operador ternario y propiedades opcionales.
 */


interface IProducto {
    nombre: string;
    precio: number;
    descuento?: number;
}

const productos: IProducto[] = [{
    nombre: 'Batman figura de acción',
    precio: 12,
    descuento: 0.10
}, {
    nombre: 'Anillo de linterna verde',
    precio: 7,
    descuento: 0.12
}, {
    nombre: 'Capa de Superman',
    precio: 9,
}]

productos.forEach(producto => {

    const precioFinal = producto.precio * (producto.descuento ? 1 - producto.descuento : 1);

    console.log(`\nProducto: ${producto.nombre}`);
    console.log(`Precio original: $${producto.precio}`);
    console.log(`Precio final: $${precioFinal.toFixed(2)}`);
});