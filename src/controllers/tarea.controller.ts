import { TareaModel, Ordenes, fechaDeHoy } from '../models/tarea.model.js';
import type { Tarea, FiltroEstado, FiltroPrioridad, Orden, Prioridad, CambiosTarea } from '../models/tarea.model.js';
import { StorageService } from '../services/storage.service.js';
import { TareaView } from '../views/tarea.view.js';

export class TareaController {
    private readonly model: TareaModel;
    private filtroEstado: FiltroEstado;
    private filtroPrioridad: FiltroPrioridad;
    private orden: Orden = Ordenes.Fecha;
    private busqueda: string = '';

    constructor(
        private readonly view: TareaView,
        private readonly storage: StorageService,
    ) {
        const estado = this.storage.cargar();
        this.model = new TareaModel(estado.tareas);
        this.filtroEstado = estado.filtroEstado;
        this.filtroPrioridad = estado.filtroPrioridad;

        this.view.onAgregar((titulo, fechaLimite, prioridad, descripcion) => this.agregar(titulo, fechaLimite, prioridad, descripcion));
        this.view.onEliminar(tareaId => this.handleDelete(tareaId));
        this.view.onToggle(tareaId => this.toggle(tareaId));
        this.view.onBuscar(texto => this.handleSearch(texto));
        this.view.onFiltrarEstado(filtro => this.filtrarEstado(filtro));
        this.view.onFiltrarPrioridad(filtro => this.filtrarPrioridad(filtro));
        this.view.onOrdenar(orden => this.ordenar(orden));
        this.view.onBorrarCompletadas(() => this.borrarCompletadas());
        this.view.onEditar(tareaId => this.editar(tareaId));
        this.view.onGuardarEdicion((tareaId, cambios) => this.handleUpdate(tareaId, cambios));
        this.view.onCancelarEdicion(() => this.cancelarEdicion());

        this.view.marcarFiltroEstado(this.filtroEstado);
        this.view.marcarFiltroPrioridad(this.filtroPrioridad);
        this.mostrarTareas();
    }

    public agregar(titulo: string, fechaLimite: string, prioridad: Prioridad, descripcion: string = ''): void {
        if (titulo.trim().length === 0) {
            this.view.mostrarMensaje('El título es obligatorio', 'error');
            return;
        }
        if (fechaLimite < fechaDeHoy()) {
            this.view.mostrarMensaje('La fecha límite no puede ser anterior a hoy', 'error');
            return;
        }

        this.model.addTarea(titulo.trim(), fechaLimite, prioridad, descripcion.trim());
        this.guardar();

        this.view.limpiarFormulario();
        this.view.mostrarMensaje('Tarea agregada');
        this.mostrarTareas();
    }

    public handleDelete(tareaId: string): void {
        const tarea = this.model.getTarea(tareaId);
        if (!tarea) return;
        if (!this.view.confirmar(`¿Eliminar la tarea "${ tarea.titulo }"?`)) return;

        this.model.deleteTarea(tareaId);
        this.guardar();

        this.view.mostrarMensaje('Tarea eliminada');
        this.mostrarTareas();
    }

    public toggle(tareaId: string): void {
        this.model.toggleTarea(tareaId);
        this.guardar();
        this.mostrarTareas();
    }

    public handleSearch(texto: string): void {
        this.busqueda = texto;
        this.mostrarTareas();
    }

    public filtrarEstado(filtro: FiltroEstado): void {
        this.filtroEstado = filtro;
        this.guardar();

        this.view.marcarFiltroEstado(filtro);
        this.mostrarTareas();
    }

    public filtrarPrioridad(filtro: FiltroPrioridad): void {
        this.filtroPrioridad = filtro;
        this.guardar();

        this.view.marcarFiltroPrioridad(filtro);
        this.mostrarTareas();
    }

    public ordenar(orden: Orden): void {
        this.orden = orden;
        this.mostrarTareas();
    }

    public borrarCompletadas(): void {
        const completadas = this.model.getTareas().filter(tarea => tarea.completada).length;
        if (completadas === 0) {
            this.view.mostrarMensaje('No hay tareas completadas', 'error');
            return;
        }
        if (!this.view.confirmar(`¿Eliminar ${ completadas } tarea(s) completada(s)?`)) return;

        this.model.deleteCompletadas();
        this.guardar();

        this.view.mostrarMensaje('Tareas completadas eliminadas');
        this.mostrarTareas();
    }

    public editar(tareaId: string): void {
        const tarea = this.model.getTarea(tareaId);
        if (!tarea) return;

        this.view.renderEditForm(tarea);
    }

    public handleUpdate(tareaId: string, cambios: CambiosTarea): void {
        const titulo = cambios.titulo?.trim() ?? '';
        if (titulo.length === 0) {
            this.view.mostrarMensaje('El título es obligatorio', 'error');
            return;
        }

        // Una tarea ya vencida puede editarse sin cambiar su fecha, pero no moverse a otra fecha pasada
        const tarea = this.model.getTarea(tareaId);
        const cambioFecha = cambios.fechaLimite !== undefined && cambios.fechaLimite !== tarea?.fechaLimite;
        if (cambioFecha && cambios.fechaLimite! < fechaDeHoy()) {
            this.view.mostrarMensaje('La fecha límite no puede ser anterior a hoy', 'error');
            return;
        }

        this.model.updateTarea(tareaId, {
            ...cambios,
            titulo,
            descripcion: cambios.descripcion?.trim(),
        });
        this.guardar();

        this.view.mostrarMensaje('Tarea actualizada');
        this.mostrarTareas();
    }

    public cancelarEdicion(): void {
        this.mostrarTareas();
    }

    private obtenerTareasVisibles(): Tarea[] {
        const encontradas = this.model.searchTareas(this.busqueda);
        const filtradas = this.model.filterTareas(this.filtroEstado, this.filtroPrioridad, encontradas);
        return this.model.sortTareas(this.orden, filtradas);
    }

    private mostrarTareas(): void {
        this.view.renderizar(this.obtenerTareasVisibles());
        this.view.renderCounter(this.model.contarPendientes());
    }

    private guardar(): void {
        this.storage.guardar({
            tareas: this.model.getTareas(),
            filtroEstado: this.filtroEstado,
            filtroPrioridad: this.filtroPrioridad,
        });
    }
}