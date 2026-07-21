/**
 * 📋 Registro de Asistencia a Eventos
    Enunciado: Crea un molde para registrar a los asistentes de un seminario de la universidad.
    El nombre y la carrera son obligatorios, pero el correo electrónico y 
    el número de asiento asignado son opcionales. 
    Crea dos asistentes (uno con datos completos y otro sin los opcionales) y 
    usa condicionales para imprimirlos de forma limpia.

interface Asistente {
    nombre: string;
    carrera: string;
    email?: string;
    asiento?: number;
}

🎯 Objetivo: Practicar interfaces, propiedades opcionales y condicionales.
 */

interface IAsistente {
    nombre: string;
    carrera: string;
    email?: string;
    asiento?: number;
}

const asistente1: IAsistente = {
    nombre: "Barbara Gordon",
    carrera: "Doctorado (Ph.D.)",
    email: "batgirl@univo.edu.gotham",
    asiento: 3
};

const asistente2: IAsistente = {
    nombre: "Dick Grayson",
    carrera: "Licenciatura en Criminología",
}

function pintAsistenteInfo(asistente: IAsistente): void {
    console.log('\n');

    console.log(`Nombre del asistente: ${asistente.nombre}`);
    console.log(`Carrera del asistente: ${asistente.carrera}`);

    if (asistente.email) {
        console.log(`Email: ${asistente.email}`);
    } else {
        console.log("Email: No Email");
    }

    if (asistente.asiento) {
        console.log(`Asiento: ${asistente.asiento}`);
    } else {
        console.log("Asiento: Sin reservar");
    }
}

pintAsistenteInfo(asistente1);
pintAsistenteInfo(asistente2);