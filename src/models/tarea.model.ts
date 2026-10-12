export class Tarea {
    public id: string;
    public titulo: string;
    public descripcion: string;
    public completada: boolean;

    constructor(titulo: string, descripcion: string = '') {
        this.id = crypto.randomUUID();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.completada = false;
    }
}

export const Filtros = {
    Todas: 'todas',
    Pendientes: 'pendientes',
    Completadas: 'completadas',
} as const;

export type Filtro = typeof Filtros[keyof typeof Filtros];
