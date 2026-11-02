import Database from "better-sqlite3";

interface Usuario {
    id?: number;
    nombre: string;
    correo: string;
}

// Inicializamos la base de datos de manera local
const db = new Database('mi_basededatos.db');
db.pragma("jounarl_mode = WAL");


console.log('Conexion de SQL embebido exitosa');

const crearTabla = () => {
    const query = `CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUNTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    )`;
    db.exec(query);
};

//Crear tabla de usuario si no existe
