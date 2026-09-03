import { EventEmitter } from "events";

// Definimos la forma del payload con una interfaz
interface Orden {
    cliente: string;
    total: number;
    productos: number;
}

// Creamos el emisor de eventos
const emisor = new EventEmitter();

// Escuchamos ("suscribimos") el evento antes de emitirlo
emisor.on("ordenCreada", (payload: Orden) => {
    console.log('Nueva oden creada!')
    console.log(`Nueva orden de ${payload.cliente}`);
    console.log(`Tipo del dato cliente: ${typeof(payload.cliente)}`);
    console.log(`Total: $${payload.total}`);
    console.log(`Tipo del dato total: ${typeof(payload.total)}`);
    console.log(`Productos: ${payload.productos}`);
    console.log(`Tipo del dato productos: ${typeof(payload.productos)}`);
});

// Creamos el payload que cumple con la interfaz Orden
const payload: Orden = {
    cliente: "Diana",
    total: 75,
    productos: 4
};

// emit(nombreEvento, payload) dispara el evento y envía los datos
emisor.emit("ordenCreada", payload);