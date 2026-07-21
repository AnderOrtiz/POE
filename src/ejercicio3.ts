/**
 * 🎟️ Calculadora de Entradas Universitarias
Enunciado: Crea una función flecha que calcule el precio de la entrada a un evento universitario. 
La función debe recibir obligatoriamente el precio base y el tipo de boleto ("GENERAL" o "VIP"). 
Además, debe recibir un código de descuento de estudiante que es opcional.

Si el boleto es "VIP" se le suman $20 al costo.
Si el usuario pasa el código opcional "ESTUDIANTE", se le aplica un 50% de descuento al total.
// Función flecha
const calcularPrecio = (precioBase: number, tipo: string, codigo?: string) => {
  //TODO: Implementar lógica
};

🎯 Objetivo: Practicar funciones flecha, parámetros opcionales, condicionales y operadores lógicos.
 */

const calcularPrecio = (precioBase: number, tipo: "GENERAL" | "VIP", codigo?: string): number => {
    let precio: number = precioBase;

    if (tipo === "VIP") precio += 20;

    if (codigo === "ESTUDIANTE") {
        precio = precio * (1 - 0.5);
    }

    return precio
}

const estudiante3 = calcularPrecio(20, "GENERAL")
const estudiante1 = calcularPrecio(20, "GENERAL", "ESTUDIANTE")
const estudiante2 = calcularPrecio(20, "VIP")
const estudiante4 = calcularPrecio(20, "VIP", "ESTUDIANTE")

console.log(`El precio a pagar es de: ${ estudiante3 }`);
console.log(`El precio a pagar es de: ${ estudiante1 }`);
console.log(`El precio a pagar es de: ${ estudiante2 }`);
console.log(`El precio a pagar es de: ${ estudiante4 }`);