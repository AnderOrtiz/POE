export type Prioridad = Exclude<FiltroPrioridad, 'todas'>
export type CambiosTarea = Partial<Pick<Tarea, 'titulo' | 'prioridad' | 'descripcion' | 'fechaLimite'>>;

export class Tarea {
    public id: string;
    public titulo: string;
    public descripcion: string;
    public completada: boolean;
    public fechaLimite: string;
    public prioridad: Prioridad;

    constructor(titulo: string, fechaLimite: string, prioridad: Prioridad, descripcion: string = '') {
        this.id = crypto.randomUUID();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.completada = false;
        this.fechaLimite = fechaLimite;
        this.prioridad = prioridad;
    }
}

export class TareaModel {
    constructor(private tareas: Tarea[]) { }

    public getTareas(): Tarea[] {
        return this.tareas;
    }

    public addTarea(titulo: string, fechaLimite: string, prioridad: Prioridad, descripcion?: string): Tarea {
        const tarea = new Tarea(titulo, fechaLimite, prioridad, descripcion);
        this.tareas.push(tarea);
        return tarea;
    }

    public getTarea(id: string): Tarea | undefined {
        return this.tareas.find(tarea => tarea.id === id)
    }

    public toggleTarea(id: string): void {
        const tarea = this.getTarea(id);

        if (!tarea) return;

        tarea.completada = !tarea.completada;
    }

    public deleteTarea(id: string): void {
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    }

    public deleteCompletadas(): number {
        const cantidadAntes = this.tareas.length;
        this.tareas = this.tareas.filter(tarea => !tarea.completada);
        return cantidadAntes - this.tareas.length;
    }


    public updateTarea(id: string, cambios: CambiosTarea): Tarea | undefined {
        const tarea = this.getTarea(id);

        if (!tarea) return;

        return Object.assign(tarea, cambios);
    }

    public searchTareas(texto: string, tareas: Tarea[] = this.tareas): Tarea[] {
        const busqueda = texto.toLowerCase().trim();
        return tareas.filter(tarea => tarea.titulo.toLowerCase().includes(busqueda));
    }

    public filterTareas(filtroEstado: FiltroEstado, filtroPrioridad: FiltroPrioridad, tareas: Tarea[] = this.tareas): Tarea[] {
        return tareas.filter(tarea => {
            const coincideEstado =
                filtroEstado === FiltrosEstados.Todas ||
                (filtroEstado === FiltrosEstados.Completadas) === tarea.completada;

            const coincidePrioridad =
                filtroPrioridad === FiltrosPrioridad.Todas ||
                filtroPrioridad === tarea.prioridad;

            return coincideEstado && coincidePrioridad;
        });
    }


    public contarPendientes(): number {
        return this.tareas.filter(tarea => !tarea.completada).length;
    }

    public sortTareas(orden: Orden, tareas: Tarea[] = this.tareas): Tarea[] {
        // sort() modifica el arreglo original, por eso se ordena una copia
        const copia = [...tareas];

        if (orden === Ordenes.Fecha) {
            return copia.sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite));
        }

        return copia.sort((a, b) => PESO_PRIORIDAD[a.prioridad] - PESO_PRIORIDAD[b.prioridad]);
    }

}

export const FiltrosEstados = {
    Todas: 'todas',
    Pendientes: 'pendientes',
    Completadas: 'completadas',
} as const;

export const FiltrosPrioridad = {
    Todas: 'todas',
    Alta: 'alta',
    Media: 'media',
    Baja: 'baja',
} as const;

export type FiltroEstado = typeof FiltrosEstados[keyof typeof FiltrosEstados];
export type FiltroPrioridad = typeof FiltrosPrioridad[keyof typeof FiltrosPrioridad];

export const Ordenes = {
    Fecha: 'fecha',
    Prioridad: 'prioridad',
} as const;

export type Orden = typeof Ordenes[keyof typeof Ordenes];

// Las prioridades no se ordenan bien alfabéticamente, así que se traducen a números
const PESO_PRIORIDAD: Record<Prioridad, number> = {
    alta: 0,
    media: 1,
    baja: 2,
};

// Fecha de hoy en formato 'YYYY-MM-DD' con la hora local (toISOString usa UTC y puede dar el día siguiente)
export function fechaDeHoy(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${ anio }-${ mes }-${ dia }`;
}

// Es una función y no un método porque las tareas cargadas de localStorage son objetos simples, no instancias de Tarea
export function estaVencida(tarea: Tarea): boolean {
    return !tarea.completada && tarea.fechaLimite < fechaDeHoy();
}