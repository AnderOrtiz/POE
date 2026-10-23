
export type Prioridad = 'Baja' | 'Media' | 'Alta';
export type EstadoTicket = 'Abierto' | 'En Proceso' | 'Resuelto';


export interface Ticket {
    id: string;
    titulo: string;
    descripcion: string;
    prioridad: Prioridad;
    estado: EstadoTicket;
    creadoPor: string;
    fechaCreacion: string;
}


