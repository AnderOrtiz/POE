import { TareaModel, Ordenes, fechaDeHoy, LIMITES } from '../models/tarea.model.js';
import type { Tarea, FiltroEstado, FiltroPrioridad, Orden, Prioridad, CambiosTarea } from '../models/tarea.model.js';
import { StorageService } from '../services/storage.service.js';
import { TareaView, type Vista } from '../views/tarea.view.js';

interface DatosTarea {
    titulo: string;
    descripcion: string;
    fechaLimite: string;
}

const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}$/;

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
        this.view.onCambiarVista(vista => this.cambiarVista(vista));

        this.view.marcarFiltroEstado(this.filtroEstado);
        this.view.marcarFiltroPrioridad(this.filtroPrioridad);
        this.mostrarTareas();
    }

    public agregar(titulo: string, fechaLimite: string, prioridad: Prioridad, descripcion: string = ''): void {
        const datos = { titulo: titulo.trim(), descripcion: descripcion.trim(), fechaLimite };

        const error = this.validarTarea(datos);
        if (error) {
            this.view.mostrarMensaje(error, 'error');
            return;
        }

        this.model.addTarea(datos.titulo, datos.fechaLimite, prioridad, datos.descripcion);
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
        const tarea = this.model.getTarea(tareaId);
        if (!tarea) return;

        // Los campos que no vienen en los cambios conservan su valor actual
        const datos = {
            titulo: (cambios.titulo ?? tarea.titulo).trim(),
            descripcion: (cambios.descripcion ?? tarea.descripcion).trim(),
            fechaLimite: cambios.fechaLimite ?? tarea.fechaLimite,
        };

        const error = this.validarTarea(datos, tarea);
        if (error) {
            this.view.mostrarMensaje(error, 'error');
            return;
        }

        this.model.updateTarea(tareaId, { ...cambios, ...datos });
        this.guardar();

        this.view.mostrarMensaje('Tarea actualizada');
        this.mostrarTareas();
    }

    public cancelarEdicion(): void {
        this.mostrarTareas();
    }

    public cambiarVista(vista: Vista): void {
        this.view.mostrarVista(vista);
    }

    // Devuelve el mensaje de error, o null si los datos son válidos.
    // Al editar se recibe la tarea original para no compararla consigo misma.
    private validarTarea(datos: DatosTarea, original?: Tarea): string | null {
        const { titulo, descripcion, fechaLimite } = datos;

        if (titulo.length === 0) return 'El título es obligatorio';
        if (titulo.length < LIMITES.TituloMin) return `El título debe tener al menos ${ LIMITES.TituloMin } caracteres`;
        if (titulo.length > LIMITES.TituloMax) return `El título no puede superar los ${ LIMITES.TituloMax } caracteres`;
        if (descripcion.length > LIMITES.DescripcionMax) return `La descripción no puede superar los ${ LIMITES.DescripcionMax } caracteres`;
        if (this.model.existeTitulo(titulo, original?.id)) return `Ya existe una tarea llamada "${ titulo }"`;

        if (!FORMATO_FECHA.test(fechaLimite)) return 'La fecha límite no tiene un formato válido';

        // Una tarea ya vencida puede editarse sin cambiar su fecha, pero no moverse a otra fecha pasada
        const cambioFecha = fechaLimite !== original?.fechaLimite;
        if (cambioFecha && fechaLimite < fechaDeHoy()) return 'La fecha límite no puede ser anterior a hoy';

        return null;
    }

    private obtenerTareasVisibles(): Tarea[] {
        const encontradas = this.model.searchTareas(this.busqueda);
        const filtradas = this.model.filterTareas(this.filtroEstado, this.filtroPrioridad, encontradas);
        return this.model.sortTareas(this.orden, filtradas);
    }

    private mostrarTareas(): void {
        this.view.renderizar(this.obtenerTareasVisibles());
        this.view.renderCounter(this.model.contarPendientes());
        this.view.renderEstadisticas(this.model.getEstadisticas());
    }

    private guardar(): void {
        this.storage.guardar({
            tareas: this.model.getTareas(),
            filtroEstado: this.filtroEstado,
            filtroPrioridad: this.filtroPrioridad,
        });
    }
}