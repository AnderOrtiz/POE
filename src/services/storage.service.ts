import { Filtros, type Filtro, type Tarea } from "../models/tarea.model.js";

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
        const estadoInicial: Estado = { tareas: [], filtro: Filtros.Todas };

        const guardado = localStorage.getItem(this.clave);
        if (!guardado) return estadoInicial;

        try {
            const { tareas = [], filtro = Filtros.Todas }: Partial<Estado> = JSON.parse(guardado);
            return { tareas, filtro };
        } catch {
            // Si lo guardado está corrupto se empieza con la lista vacía
            return estadoInicial;
        }
    }
}
