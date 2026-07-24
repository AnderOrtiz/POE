/**
 * Enunciado: Define un enum llamado EstadoUsuario con los valores: ACTIVO, INACTIVO, SUSPENDIDO. 
 * Luego crea una variable que use este enum.

// TODO: Definir enum EstadoUsuario
// TODO: Crear variable con estado ACTIVO
 */

enum EstadoUsuario {
    ACTIVO = "ACTIVO",
    INACTIVO = "INACTIVO",
    SUSPENDIDO = "SUSPENDIDO"
}

const estado: EstadoUsuario = EstadoUsuario.ACTIVO

console.log("El estado del usuario es", { estado })

