import { FiltrosPrioridad, FiltrosEstados, Tarea, type FiltroEstado, type FiltroPrioridad } from "../models/tarea.model.js";

export interface Estado {
    tareas: Tarea[];
    filtroEstado: FiltroEstado;
    filtroPrioridad: FiltroPrioridad;
}

export class StorageService {
    constructor(private readonly clave: string = 'tareas') { }

    public guardar(estado: Estado): void {
        localStorage.setItem(this.clave, JSON.stringify(estado));
    }

    public cargar(): Estado {
        const estadoInicial: Estado = {
            tareas: [
                new Tarea('Tarea de ejemplo', '2026-12-22', 'alta'),
            ],
            filtroEstado: FiltrosEstados.Todas,
            filtroPrioridad: FiltrosPrioridad.Todas,
        };

        const guardado = localStorage.getItem(this.clave);
        if (!guardado) return estadoInicial;

        try {
            const { tareas = [], filtroEstado = FiltrosEstados.Todas, filtroPrioridad = FiltrosPrioridad.Todas }: Partial<Estado> = JSON.parse(guardado);
            return { tareas, filtroEstado, filtroPrioridad };

        } catch {
            return estadoInicial;
        }
    }
}
