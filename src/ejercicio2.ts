/**
 * Enunciado: Usando el mismo arreglo de productos, 
 * usa .filter() para crear un nuevo arreglo 
 * con los productos que cuesten más de $50.

// Datos de entrada
const productos = [
    { nombre: "Laptop", precio: 800 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Monitor", precio: 200 },
    { nombre: "USB", precio: 15 }
];

// TODO: Usar .filter() para productos > $50
// Resultado esperado: Laptop (800), Monitor (200)
 */


const productos = [
    { nombre: "Laptop", precio: 800 },
    { nombre: "Mouse", precio: 25 },
    { nombre: "Monitor", precio: 200 },
    { nombre: "USB", precio: 15 }
],

    productos_filtrados = productos.filter(producto => producto.precio > 50)

console.log("Estos son los productos que cuesten más de $50:\n", productos_filtrados)