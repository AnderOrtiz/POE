import { Filtros, Tarea, type Filtro } from "../models/tarea.model.js";

export interface Estado {
    tareas: Tarea[];
    filtro: Filtro;
}

export class StorageService {
    constructor(private readonly clave: string = 'tareas') {}

    public guardar(estado: Estado): void {
        localStorage.setItem(this.clave, JSON.stringify(estado));
    }

    public cargar(): Estado {
        // La primera vez que se abre la aplicación se muestra una tarea de ejemplo
        const estadoInicial: Estado = {
            tareas: [
                new Tarea('Tarea de ejemplo', 'Haz click para marcarla como completada o usa la × para eliminarla'),
            ],
            filtro: Filtros.Todas,
        };

        const guardado = localStorage.getItem(this.clave);
        if (!guardado) return estadoInicial;

        try {
            const { tareas = [], filtro = Filtros.Todas }: Partial<Estado> = JSON.parse(guardado);
            return { tareas, filtro };
        } catch {
            // Si lo guardado está corrupto se empieza de nuevo
            return estadoInicial;
        }
    }
}
