import { appTemplate } from './app.template.js'
import type { Filtro, Tarea } from '../models/tarea.model.js';

export type TipoMensaje = 'exito' | 'error';

const ElementIDs = {
    Formulario: '#new-todo-form',
    TituloInput: '#new-todo-input',
    DescripcionInput: '#new-todo-description',
    BuscarInput: '#search-input',
    Mensaje: '#mensaje',
    ListaTareas: '.todo-list',
    Filtros: '.filtro',
    Pendientes: '#pending-count',
    BorrarCompletadas: '.clear-completed',
} as const;

const DURACION_MENSAJE_MS = 3000;

export class TareaView {
    private readonly formulario: HTMLFormElement;
    private readonly tituloInput: HTMLInputElement;
    private readonly descripcionInput: HTMLInputElement;
    private readonly buscarInput: HTMLInputElement;
    private readonly mensaje: HTMLElement;
    private readonly listaTareas: HTMLUListElement;
    private readonly filtros: NodeListOf<HTMLButtonElement>;
    private readonly pendientes: HTMLElement;
    private readonly borrarCompletadasButton: HTMLButtonElement;

    private mensajeTimeout?: number;

    constructor(elementId: string) {
        const raiz = document.querySelector(elementId);
        if (!raiz) throw new Error(`Element ${ elementId } not found`);

        const app = document.createElement('div');
        app.innerHTML = appTemplate;
        raiz.append(app);

        this.formulario = this.obtenerElemento(ElementIDs.Formulario);
        this.tituloInput = this.obtenerElemento(ElementIDs.TituloInput);
        this.descripcionInput = this.obtenerElemento(ElementIDs.DescripcionInput);
        this.buscarInput = this.obtenerElemento(ElementIDs.BuscarInput);
        this.mensaje = this.obtenerElemento(ElementIDs.Mensaje);
        this.listaTareas = this.obtenerElemento(ElementIDs.ListaTareas);
        this.filtros = document.querySelectorAll<HTMLButtonElement>(ElementIDs.Filtros);
        this.pendientes = this.obtenerElemento(ElementIDs.Pendientes);
        this.borrarCompletadasButton = this.obtenerElemento(ElementIDs.BorrarCompletadas);
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

    public renderizarPendientes(cantidad: number): void {
        this.pendientes.textContent = `${ cantidad }`;
    }

    public marcarFiltro(filtro: Filtro): void {
        this.filtros.forEach(el => {
            el.classList.toggle('selected', el.dataset.filtro === filtro);
        });
    }

    public mostrarMensaje(texto: string, tipo: TipoMensaje = 'exito'): void {
        this.mensaje.textContent = texto;
        this.mensaje.className = `mensaje ${ tipo }`;

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

    public onAgregar(handler: (titulo: string, descripcion: string) => void): void {
        this.formulario.addEventListener('submit', (event: SubmitEvent) => {
            event.preventDefault();
            handler(this.tituloInput.value, this.descripcionInput.value);
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
            if (target.classList.contains('destroy')) return;

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

    public onFiltrar(handler: (filtro: Filtro) => void): void {
        this.filtros.forEach(el => {
            el.addEventListener('click', () => {
                handler(el.dataset.filtro as Filtro);
            });
        });
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
                <input class="toggle" type="checkbox" ${ tarea.completada ? 'checked' : '' }>
                <label>
                    <span class="titulo"></span>
                    <span class="descripcion"></span>
                </label>
                <button class="destroy" title="Eliminar tarea"></button>
            </div>`;

        // textContent evita que el texto del usuario se interprete como HTML
        liElement.querySelector('.titulo')!.textContent = tarea.titulo;

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
        if (!element) throw new Error(`Element ${ selector } not found`);
        return element;
    }
}
