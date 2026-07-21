console.log("Hello world");

let nombre = "Anderson",
    edad = 18,
    esEstudiante = true;

console.log(`${nombre} ${edad} ${esEstudiante}`);


let nota: number = 8.5;

if (nota >= 9.0) {
    console.log(`Excelente aprobado`);

} else if (nota >= 6.0) {
    console.log(`Aprobado`);

} else {
    console.log(`Reprobado`);
}

let resultado: string = (edad >= 18) ? "Es mayor de edad" : "Es menor de edad";

console.log(resultado);

let materias: string[] = ["POE", "GSW", "DS", "Mate"]
console.log(materias);

materias.forEach(materia => {
    console.log(materia);
});

console.log(materias.join(', '));

function sumar(a: number, b: number): number {
    return a + b;
}

function restar(a: number, b: number): number {
    return a - b;
}

function multiplicar(a: number, b: number): number {
    return a * b;
}

function dividir(a: number, b: number): number {
    return a / b;
}

console.log(`La suma es: ${sumar(12, 3)}`);
console.log(`La resta es: ${restar(12, 3)}`);
console.log(`La multiplicación es: ${multiplicar(12, 3)}`);
console.log(`La división es: ${dividir(12, 3)}`);

//Modelado o plantilla \ creacioón de objetos

type Alumno = {
    nombre: string;
    edad: number;
    activo: boolean;
}

let Nalumno: Alumno = {
    nombre: "Ander",
    edad: 20,
    activo: true
}

console.log(`Nombre: ${Nalumno.nombre}\nEdad: ${Nalumno.edad}\nActivo: ${Nalumno.activo}`);

type Alumno2 = {
    nombre: "Ander";
    edad: 20;
    activo: true;
    telefono?: string;
}

let N2alumno: Alumno2 = {
    nombre: "Ander",
    edad: 20,
    activo: true,
    telefono: "1234-1234"
}