/**
 * Enunciado: Dado un arreglo de productos con nombre y precio,
 * usa .map() para crear un nuevo arreglo que 
 * incluya un descuento del 10% a cada precio.

    // Datos de entrada
    const productos = [
        { nombre: "Laptop", precio: 800 },
        { nombre: "Mouse", precio: 25 },
        { nombre: "Teclado", precio: 60 }
    ];

    // TODO: Usar .map() para aplicar descuento del 10%
    // Resultado esperado: [{ nombre: "Laptop", precio: 720 }, ...]
 */

const productos = [
    { nombre: "Laptop", precio: 800 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Teclado", precio: 60 }
],

    productos_con_descuento = productos.map(producto => {
        producto.precio *= 0.90
        return producto;
    })

console.log(`Estos son los productos con el 10% de decuento aplicado:\n`, productos_con_descuento)