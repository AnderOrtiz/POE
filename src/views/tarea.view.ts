import { appTemplate } from './app.template.js'
import type { FiltroEstado, Tarea, Orden, FiltroPrioridad, Prioridad, CambiosTarea } from '../models/tarea.model.js';


export type TipoMensaje = 'exito' | 'error';

const ElementIDs = {
    Formulario: '#new-todo-form',
    TituloInput: '#new-todo-input',
    DescripcionInput: '#new-todo-description',
    BuscarInput: '#search-input',
    Mensaje: '#mensaje',
    ListaTareas: '.todo-list',
    FiltrosEstado: '#filtros-estado .filtro',
    FechaInput: '#new-todo-date',
    PrioridadSelect: '#new-todo-priority',
    FiltrosPrioridad: '#filtros-prioridad .filtro',
    OrdenSelect: '#sort-select',
    Pendientes: '#pending-count',
    BorrarCompletadas: '.clear-completed',
} as const;



const DURACION_MENSAJE_MS = 3000;

export class TareaView {
    private readonly formulario: HTMLFormElement;
    private readonly tituloInput: HTMLInputElement;
    private readonly descripcionInput: HTMLInputElement;
    private readonly fechaInput: HTMLInputElement;
    private readonly prioridadSelect: HTMLSelectElement;
    private readonly buscarInput: HTMLInputElement;
    private readonly mensaje: HTMLElement;
    private readonly listaTareas: HTMLUListElement;
    private readonly filtrosEstado: NodeListOf<HTMLButtonElement>;
    private readonly ordenSelect: HTMLSelectElement;
    private readonly filtrosPrioridad: NodeListOf<HTMLButtonElement>;
    private readonly pendientes: HTMLElement;
    private readonly borrarCompletadasButton: HTMLButtonElement;

    private mensajeTimeout?: number;

    constructor(elementId: string) {
        const raiz = document.querySelector(elementId);
        if (!raiz) throw new Error(`Element ${elementId} not found`);

        const app = document.createElement('div');
        app.innerHTML = appTemplate;
        raiz.append(app);

        this.formulario = this.obtenerElemento(ElementIDs.Formulario);
        this.tituloInput = this.obtenerElemento(ElementIDs.TituloInput);
        this.descripcionInput = this.obtenerElemento(ElementIDs.DescripcionInput);
        this.buscarInput = this.obtenerElemento(ElementIDs.BuscarInput);
        this.mensaje = this.obtenerElemento(ElementIDs.Mensaje);
        this.listaTareas = this.obtenerElemento(ElementIDs.ListaTareas);
        this.filtrosEstado = document.querySelectorAll<HTMLButtonElement>(ElementIDs.FiltrosEstado);
        this.pendientes = this.obtenerElemento(ElementIDs.Pendientes);
        this.borrarCompletadasButton = this.obtenerElemento(ElementIDs.BorrarCompletadas);
        this.fechaInput = this.obtenerElemento(ElementIDs.FechaInput);
        this.prioridadSelect = this.obtenerElemento(ElementIDs.PrioridadSelect);
        this.ordenSelect = this.obtenerElemento(ElementIDs.OrdenSelect);
        this.filtrosPrioridad = document.querySelectorAll<HTMLButtonElement>(ElementIDs.FiltrosPrioridad);
    }

    public renderizar(tareas: Tarea[]): void {
        this.listaTareas.innerHTML = '';

        if (tareas.length === 0) {
            const vacio = document.createElement('li');
            vacio.classList.add('vacio');
            vacio.textContent = 'No hay tareas para mostrar';
            this.listaTareas.append(vacio);
            return;
        }

        for (const tarea of tareas) {
            this.listaTareas.append(this.crearTareaHTML(tarea));
        }
    }



    public renderEditForm(tarea: Tarea): void {
        const li = this.listaTareas.querySelector(`[data-id="${tarea.id}"]`)
        if (!li) return;

        li.innerHTML = `
            <form class="edit-form">
                <input name="titulo" placeholder="Título" autocomplete="off">
                <input name="descripcion" placeholder="Descripción (opcional)" autocomplete="off">
                <input name="fechaLimite" type="date" required>
                <select name="prioridad">
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                </select>
                <div class="edit-actions">
                    <button type="submit">Guardar</button>
                    <button type="button" class="cancel-edit">Cancelar</button>
                </div>
            </form>`;

        li.querySelector<HTMLInputElement>('[name="titulo"]')!.value = tarea.titulo;
        li.querySelector<HTMLInputElement>('[name="descripcion"]')!.value = tarea.descripcion;
        li.querySelector<HTMLInputElement>('[name="fechaLimite"]')!.value = tarea.fechaLimite;
        li.querySelector<HTMLSelectElement>('[name="prioridad"]')!.value = tarea.prioridad;
        li.querySelector<HTMLInputElement>('[name="titulo"]')!.focus();
    }

    public renderCounter(cantidad: number): void {
        this.pendientes.textContent = `${cantidad}`;
    }

    public marcarFiltroEstado(filtro: FiltroEstado): void {
        this.filtrosEstado.forEach(el => {
            el.classList.toggle('selected', el.dataset.filtro === filtro);
        });
    }

    public marcarFiltroPrioridad(filtro: FiltroPrioridad): void {
        this.filtrosPrioridad.forEach(el => {
            el.classList.toggle('selected', el.dataset.prioridad === filtro);
        })
    }

    public mostrarMensaje(texto: string, tipo: TipoMensaje = 'exito'): void {
        this.mensaje.textContent = texto;
        this.mensaje.className = `mensaje ${tipo}`;

        window.clearTimeout(this.mensajeTimeout);
        this.mensajeTimeout = window.setTimeout(() => {
            this.mensaje.classList.add('hidden');
        }, DURACION_MENSAJE_MS);
    }

    public confirmar(pregunta: string): boolean {
        return window.confirm(pregunta);
    }

    public limpiarFormulario(): void {
        this.formulario.reset();
        this.tituloInput.focus();
    }


    public onAgregar(handler: (titulo: string, fechaLimite: string, prioridad: Prioridad, descripcion: string) => void): void {
        this.formulario.addEventListener('submit', (event: SubmitEvent) => {
            event.preventDefault();
            handler(this.tituloInput.value, this.fechaInput.value, this.prioridadSelect.value as Prioridad, this.descripcionInput.value);
        });
    }

    public onGuardarEdicion(handler: (tareaId: string, cambios: CambiosTarea) => void): void {
        this.listaTareas.addEventListener('submit', (event: SubmitEvent) => {
            const form = event.target as HTMLFormElement;
            if (!form.classList.contains('.todo-list')) return;

            event.preventDefault();

            const tareaId = this.obtenerTareaId(form);
            if (!tareaId) return;

            handler(tareaId, {
                titulo: form.querySelector<HTMLInputElement>('[name="titulo"]')!.value,
                descripcion: form.querySelector<HTMLInputElement>('[name="descripcion"]')!.value,
                fechaLimite: form.querySelector<HTMLInputElement>('[name="fechaLimite"]')!.value,
                prioridad: form.querySelector<HTMLSelectElement>('[name="prioridad"]')!.value as Prioridad,
            });
        });
    }

    public onBuscar(handler: (texto: string) => void): void {
        this.buscarInput.addEventListener('input', () => {
            handler(this.buscarInput.value);
        });
    }


    public onToggle(handler: (tareaId: string) => void): void {
        this.listaTareas.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest('.destroy, .edit, .edit-form')) return;

            const tareaId = this.obtenerTareaId(target);
            if (tareaId) handler(tareaId);
        });
    }

    public onEliminar(handler: (tareaId: string) => void): void {
        this.listaTareas.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.classList.contains('destroy')) return;

            const tareaId = this.obtenerTareaId(target);
            if (tareaId) handler(tareaId);
        });
    }


    public onCancelarEdicion(handler: () => void): void {
        this.listaTareas.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.classList.contains('cancel-edit')) return;
            handler()
        });
    }

    public onEditar(handler: (tareaID: string) => void): void {
        this.listaTareas.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.classList.contains('edit')) return;

            const tareaId = this.obtenerTareaId(target);
            if (tareaId) handler(tareaId);
        })
    }

    public onFiltrarEstado(handler: (filtro: FiltroEstado) => void): void {
        this.filtrosEstado.forEach(el => {
            el.addEventListener('click', () => {
                handler(el.dataset.filtro as FiltroEstado);
            });
        });
    }

    public onFiltrarPrioridad(handler: (filtro: FiltroPrioridad) => void): void {
        this.filtrosPrioridad.forEach(el => {
            el.addEventListener('click', () => {
                handler(el.dataset.prioridad as FiltroPrioridad);
            })
        })
    }


    public onOrdenar(handler: (orden: Orden) => void): void {
        this.ordenSelect.addEventListener('change', () => {
            handler(this.ordenSelect.value as Orden);
        })
    }


    public onBorrarCompletadas(handler: () => void): void {
        this.borrarCompletadasButton.addEventListener('click', handler);
    }


    private crearTareaHTML(tarea: Tarea): HTMLLIElement {
        const liElement = document.createElement('li');
        liElement.setAttribute('data-id', tarea.id);
        if (tarea.completada) liElement.classList.add('completed');


        liElement.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox" ${tarea.completada ? 'checked' : ''}>
                <label>
                    <span class="titulo"></span>
                    <span class="descripcion"></span>
                    <span class="prioridad prioridad-${tarea.prioridad}"></span>
                    <span class="fecha"></span>
                </label>
                <button class="edit" title="Editar tarea">✎</button>
                <button class="destroy" title="Eliminar tarea"></button>
            </div>`;

        // textContent evita que el texto del usuario se interprete como HTML
        liElement.querySelector('.titulo')!.textContent = tarea.titulo;
        liElement.querySelector('.prioridad')!.textContent = tarea.prioridad;
        liElement.querySelector('.fecha')!.textContent = tarea.fechaLimite.split('-').reverse().join('/');

        const descripcion = liElement.querySelector('.descripcion')!;
        if (tarea.descripcion) {
            descripcion.textContent = tarea.descripcion;
        } else {
            descripcion.remove();
        }

        return liElement;
    }

    private obtenerTareaId(target: HTMLElement): string | null {
        return target.closest('[data-id]')?.getAttribute('data-id') ?? null;
    }

    private obtenerElemento<T extends Element>(selector: string): T {
        const element = document.querySelector<T>(selector);
        if (!element) throw new Error(`Element ${selector} not found`);
        return element;
    }



}