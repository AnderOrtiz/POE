import { FiltrosEstados, Tarea, type Filtro } from '../models/tarea.model.js';
import { StorageService } from '../services/storage.service.js';
import { TareaView } from '../views/tarea.view.js';

export class TareaController {
    private tareas: Tarea[];
    private filtro: Filtro;
    private busqueda: string = '';

    constructor(
        private readonly view: TareaView,
        private readonly storage: StorageService,
    ) {
        const estado = this.storage.cargar();
        this.tareas = estado.tareas;
        this.filtro = estado.filtroEstado;

        this.view.onAgregar((titulo, descripcion) => this.agregar(titulo, descripcion));
        this.view.onEliminar(tareaId => this.eliminar(tareaId));
        this.view.onToggle(tareaId => this.toggle(tareaId));
        this.view.onBuscar(texto => this.buscar(texto));
        this.view.onFiltrarEstado(filtro => this.filtrar(filtro));
        this.view.onBorrarCompletadas(() => this.borrarCompletadas());

        this.view.marcarFiltroEstado(this.filtro);
        this.mostrarTareas();
    }

    public agregar(titulo: string, descripcion: string = ''): void {
        if (titulo.trim().length === 0) {
            this.view.mostrarMensaje('El título es obligatorio', 'error');
            return;
        }

        this.tareas.push(new Tarea(titulo.trim(), descripcion.trim()));
        this.guardar();

        this.view.limpiarFormulario();
        this.view.mostrarMensaje('Tarea agregada');
        this.mostrarTareas();
    }

    public eliminar(tareaId: string): void {
        const tarea = this.tareas.find(tarea => tarea.id === tareaId);
        if (!tarea) return;
        if (!this.view.confirmar(`¿Eliminar la tarea "${tarea.titulo}"?`)) return;

        this.tareas = this.tareas.filter(tarea => tarea.id !== tareaId);
        this.guardar();

        this.view.mostrarMensaje('Tarea eliminada');
        this.mostrarTareas();
    }

    public toggle(tareaId: string): void {
        const tarea = this.tareas.find(tarea => tarea.id === tareaId);
        if (!tarea) return;

        tarea.completada = !tarea.completada;
        this.guardar();
        this.mostrarTareas();
    }

    public buscar(texto: string): void {
        this.busqueda = texto.trim().toLowerCase();
        this.mostrarTareas();
    }

    public filtrar(filtro: Filtro): void {
        this.filtro = filtro;
        this.guardar();

        this.view.marcarFiltroEstado(filtro);
        this.mostrarTareas();
    }

    public borrarCompletadas(): void {
        const completadas = this.tareas.filter(tarea => tarea.completada).length;
        if (completadas === 0) {
            this.view.mostrarMensaje('No hay tareas completadas', 'error');
            return;
        }
        if (!this.view.confirmar(`¿Eliminar ${completadas} tarea(s) completada(s)?`)) return;

        this.tareas = this.tareas.filter(tarea => !tarea.completada);
        this.guardar();

        this.view.mostrarMensaje('Tareas completadas eliminadas');
        this.mostrarTareas();
    }

    private obtenerTareasVisibles(): Tarea[] {
        return this.tareas.filter(tarea => {
            const coincideFiltro =
                this.filtro === FiltrosEstados.Todas ||
                (this.filtro === FiltrosEstados.Completadas) === tarea.completada;

            return coincideFiltro && tarea.titulo.toLowerCase().includes(this.busqueda);
        });
    }

    private mostrarTareas(): void {
        this.view.renderizar(this.obtenerTareasVisibles());
        this.view.renderCounter(this.tareas.filter(tarea => !tarea.completada).length);
    }

    private guardar(): void {
        this.storage.guardar({ tareas: this.tareas, filtroEstado: this.filtro });
    }
}
