import EventEmitter from "./EventEmitter.js";

type CategoriaLibro =
    | "CIENCIA"
    | "LITERATURA"
    | "HISTORIA"
    | "TECNOLOGIA"
    | "ARTE";

interface Libro {
    id: number;
    titulo: string;
    autor: string;
    categoria: CategoriaLibro;
    anio: number;
    disponible: boolean;
    ejemplares: number;
    esFavorito: boolean;
}

let DOM: {
    listaLibros: HTMLElement;
    totalLibros: HTMLElement;
    librosDisponibles: HTMLElement;
    librosPrestados: HTMLElement;
    mensajeContainer: HTMLElement;
    filtroCategoria: HTMLSelectElement;
    buscarLibro: HTMLInputElement;
    formAgregarLibro: HTMLFormElement;
    btnOrdenTitulo: HTMLButtonElement;
    btnOrdenAutor: HTMLButtonElement;
    btnSoloDisponibles: HTMLButtonElement;
    btnSoloFavoritos: HTMLButtonElement;
};

const estadoFiltros = {
    categoria: "TODOS",
    busqueda: "",
    soloDisponibles: false,
    soloFavoritos: false,
    orden: "ninguno" as "ninguno" | "titulo" | "autor"
};


class Biblioteca extends EventEmitter {
    private libros: Libro[] = [];
    private _idCounter: number = 1;

    obtenerLibros(): Libro[] {
        return this.libros;
    }

    agregarLibro(libro: Omit<Libro, "id" | "disponible" | "esFavorito">): void {
        const nuevoLibro: Libro = {
            ...libro,
            id: this._idCounter++,
            disponible: libro.ejemplares > 0,
            esFavorito: false
        };

        this.libros.push(nuevoLibro);
        this.emit("libroAgregado", nuevoLibro);
    }

    solicitarPrestamo(id: number): void {
        const libro = this.libros.find((l) => l.id === id);

        if (!libro || !libro.disponible || libro.ejemplares <= 0) {
            this.emit("noDisponible", libro);
            return;
        }

        libro.ejemplares -= 1;
        if (libro.ejemplares === 0) {
            libro.disponible = false;
        }

        this.emit("prestamoExitoso", libro);
    }

    devolverLibro(id: number): void {
        const libro = this.libros.find((l) => l.id === id);

        if (!libro) return;

        libro.ejemplares += 1;
        libro.disponible = true;

        this.emit("devolucionExitosa", libro);
    }

    cambiarFavorito(id: number): void {
        const libro = this.libros.find((l) => l.id === id);
        if (libro) {
            libro.esFavorito = !libro.esFavorito;
        }
    }
}


class NotificadorBiblioteca {
    notificarNuevoLibro(libro: Libro): void {
        console.log(`[CONSOLA] Libro Agregado: "${libro.titulo}" de ${libro.autor}`);
    }

    notificarPrestamo(libro: Libro): void {
        console.log(`[CONSOLA] Préstamo Exitoso: "${libro.titulo}"`);
    }

    notificarNoDisponible(libro?: Libro): void {
        console.log(`[CONSOLA] No disponible: "${libro?.titulo || 'Libro desconocido'}"`);
    }

    notificarDevolucion(libro: Libro): void {
        console.log(`[CONSOLA] Devolución Exitosa: "${libro.titulo}"`);
    }
}

class GestorUIBiblioteca {
    renderizarLibros(libros: Libro[]): void {
        if (!DOM.listaLibros) return;

        if (libros.length === 0) {
            DOM.listaLibros.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📚</div>
                    <h3>No hay libros que mostrar</h3>
                    <p>Intenta ajustar los filtros de búsqueda.</p>
                </div>
            `;
            return;
        }

        DOM.listaLibros.innerHTML = libros
            .map((libro) => this.crearTarjetaLibro(libro))
            .join("");
    }

    private crearTarjetaLibro(libro: Libro): string {
        const categoriaClase = libro.categoria.toLowerCase();
        const estadoClase = libro.disponible ? "available-status" : "unavailable-status";
        const estadoTexto = libro.disponible ? "Disponible" : "No disponible";
        const iconoFavorito = libro.esFavorito ? "★" : "☆";

        return `
            <article class="book-card" data-id="${libro.id}">
                <div class="book-header">
                    <span class="category ${categoriaClase}">
                        ${libro.categoria}
                    </span>

                    <button
                        class="favorite ${libro.esFavorito ? "active" : ""}"
                        data-action="favorito"
                        data-id="${libro.id}"
                        title="Favorito"
                    >
                        ${iconoFavorito}
                    </button>
                </div>

                <div class="book-content">
                    <h3>${libro.titulo}</h3>
                    <p class="author">${libro.autor}</p>

                    <div class="book-info">
                        <span>📅 Año: ${libro.anio}</span>
                        <span>📚 Ejemplares: ${libro.ejemplares}</span>
                    </div>
                </div>

                <div class="book-footer">
                    <span class="status ${estadoClase}">
                        ${estadoTexto}
                    </span>

                    <div class="actions">
                        <button
                            class="btn btn-primary"
                            data-action="prestar"
                            data-id="${libro.id}"
                            ${!libro.disponible ? "disabled" : ""}
                        >
                            Prestar
                        </button>
                        <button
                            class="btn btn-secondary"
                            data-action="devolver"
                            data-id="${libro.id}"
                        >
                            Devolver
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    actualizarContador(libros: Libro[]): void {
        const total = libros.length;
        const disponibles = libros.filter((l) => l.disponible && l.ejemplares > 0).length;
        const prestados = total - disponibles;

        if (DOM.totalLibros) DOM.totalLibros.textContent = total.toString();
        if (DOM.librosDisponibles) DOM.librosDisponibles.textContent = disponibles.toString();
        if (DOM.librosPrestados) DOM.librosPrestados.textContent = prestados.toString();
    }

    mostrarMensaje(mensaje: string, tipo: "exito" | "error" | "info"): void {
        if (!DOM.mensajeContainer) return;

        let clase = "success";
        let icono = "✓";

        if (tipo === "error") {
            clase = "error";
            icono = "✕";
        } else if (tipo === "info") {
            clase = "info";
            icono = "ℹ";
        }

        DOM.mensajeContainer.innerHTML = `
            <div class="message ${clase}">
                <span>${icono}</span>
                <p>${mensaje}</p>
            </div>
        `;

        setTimeout(() => {
            DOM.mensajeContainer.innerHTML = "";
        }, 3000);
    }
}

const biblioteca = new Biblioteca();
const notificador = new NotificadorBiblioteca();
const gestorUI = new GestorUIBiblioteca();

function refrescarVista(): void {
    const todos = biblioteca.obtenerLibros();
    let filtrados = [...todos];

    if (estadoFiltros.categoria !== "TODOS") {
        filtrados = filtrados.filter((l) => l.categoria === estadoFiltros.categoria);
    }

    if (estadoFiltros.busqueda) {
        filtrados = filtrados.filter(
            (l) =>
                l.titulo.toLowerCase().includes(estadoFiltros.busqueda) ||
                l.autor.toLowerCase().includes(estadoFiltros.busqueda)
        );
    }

    if (estadoFiltros.soloDisponibles) {
        filtrados = filtrados.filter((l) => l.disponible && l.ejemplares > 0);
    }

    if (estadoFiltros.soloFavoritos) {
        filtrados = filtrados.filter((l) => l.esFavorito);
    }

    if (estadoFiltros.orden === "titulo") {
        filtrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (estadoFiltros.orden === "autor") {
        filtrados.sort((a, b) => a.autor.localeCompare(b.autor));
    }

    gestorUI.renderizarLibros(filtrados);
    gestorUI.actualizarContador(todos);
}

biblioteca.on("libroAgregado", (libro: Libro) => {
    notificador.notificarNuevoLibro(libro);
    gestorUI.mostrarMensaje(`Se agregó "${libro.titulo}".`, "exito");
    refrescarVista();
});

biblioteca.on("prestamoExitoso", (libro: Libro) => {
    notificador.notificarPrestamo(libro);
    gestorUI.mostrarMensaje(`Préstamo registrado para "${libro.titulo}".`, "exito");
    refrescarVista();
});

biblioteca.on("noDisponible", (libro?: Libro) => {
    notificador.notificarNoDisponible(libro);
    gestorUI.mostrarMensaje(
        libro ? `"${libro.titulo}" no tiene ejemplares.` : "Libro no disponible.",
        "error"
    );
});

biblioteca.on("devolucionExitosa", (libro: Libro) => {
    notificador.notificarDevolucion(libro);
    gestorUI.mostrarMensaje(`"${libro.titulo}" devuelto.`, "info");
    refrescarVista();
});


function inicializarReferenciasDOM(): void {
    DOM = {
        listaLibros: document.getElementById("lista-libros") as HTMLElement,
        totalLibros: document.getElementById("total-libros") as HTMLElement,
        librosDisponibles: document.getElementById("libros-disponibles") as HTMLElement,
        librosPrestados: document.getElementById("libros-prestados") as HTMLElement,
        mensajeContainer: document.getElementById("mensaje-container") as HTMLElement,
        filtroCategoria: document.getElementById("filtro-categoria") as HTMLSelectElement,
        buscarLibro: document.getElementById("buscar-libro") as HTMLInputElement,
        formAgregarLibro: document.getElementById("form-agregar-libro") as HTMLFormElement,
        btnOrdenTitulo: document.getElementById("btn-orden-titulo") as HTMLButtonElement,
        btnOrdenAutor: document.getElementById("btn-orden-autor") as HTMLButtonElement,
        btnSoloDisponibles: document.getElementById("btn-solo-disponibles") as HTMLButtonElement,
        btnSoloFavoritos: document.getElementById("btn-solo-favoritos") as HTMLButtonElement
    };
}

function setupEventosDOM(): void {
    if (DOM.formAgregarLibro) {
        DOM.formAgregarLibro.addEventListener("submit", (e: Event) => {
            e.preventDefault();

            const tituloInput = document.getElementById("titulo") as HTMLInputElement;
            const autorInput = document.getElementById("autor") as HTMLInputElement;
            const categoriaSelect = document.getElementById("categoria") as HTMLSelectElement;
            const anioInput = document.getElementById("anio") as HTMLInputElement;
            const ejemplaresInput = document.getElementById("ejemplares") as HTMLInputElement;

            if (!tituloInput.value || !autorInput.value) return;

            biblioteca.agregarLibro({
                titulo: tituloInput.value.trim(),
                autor: autorInput.value.trim(),
                categoria: categoriaSelect.value as CategoriaLibro,
                anio: parseInt(anioInput.value) || new Date().getFullYear(),
                ejemplares: parseInt(ejemplaresInput.value) || 1
            });

            DOM.formAgregarLibro.reset();
        });
    }

    if (DOM.listaLibros) {
        DOM.listaLibros.addEventListener("click", (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const boton = target.closest("button");
            if (!boton) return;

            const id = parseInt(boton.getAttribute("data-id") || "0");
            const accion = boton.getAttribute("data-action");
            if (!id) return;

            if (accion === "prestar") {
                biblioteca.solicitarPrestamo(id);
            } else if (accion === "devolver") {
                biblioteca.devolverLibro(id);
            } else if (accion === "favorito") {
                biblioteca.cambiarFavorito(id);
                refrescarVista();
            }
        });
    }

    if (DOM.filtroCategoria) {
        DOM.filtroCategoria.addEventListener("change", () => {
            estadoFiltros.categoria = DOM.filtroCategoria.value;
            refrescarVista();
        });
    }

    if (DOM.buscarLibro) {
        DOM.buscarLibro.addEventListener("input", () => {
            estadoFiltros.busqueda = DOM.buscarLibro.value.toLowerCase().trim();
            refrescarVista();
        });
    }

    if (DOM.btnOrdenTitulo) {
        DOM.btnOrdenTitulo.addEventListener("click", () => {
            estadoFiltros.orden = estadoFiltros.orden === "titulo" ? "ninguno" : "titulo";
            DOM.btnOrdenTitulo.classList.toggle("active", estadoFiltros.orden === "titulo");
            if (DOM.btnOrdenAutor) DOM.btnOrdenAutor.classList.remove("active");
            refrescarVista();
        });
    }

    if (DOM.btnOrdenAutor) {
        DOM.btnOrdenAutor.addEventListener("click", () => {
            estadoFiltros.orden = estadoFiltros.orden === "autor" ? "ninguno" : "autor";
            DOM.btnOrdenAutor.classList.toggle("active", estadoFiltros.orden === "autor");
            if (DOM.btnOrdenTitulo) DOM.btnOrdenTitulo.classList.remove("active");
            refrescarVista();
        });
    }

    if (DOM.btnSoloDisponibles) {
        DOM.btnSoloDisponibles.addEventListener("click", () => {
            estadoFiltros.soloDisponibles = !estadoFiltros.soloDisponibles;
            DOM.btnSoloDisponibles.classList.toggle("active", estadoFiltros.soloDisponibles);
            refrescarVista();
        });
    }

    if (DOM.btnSoloFavoritos) {
        DOM.btnSoloFavoritos.addEventListener("click", () => {
            estadoFiltros.soloFavoritos = !estadoFiltros.soloFavoritos;
            DOM.btnSoloFavoritos.classList.toggle("active", estadoFiltros.soloFavoritos);
            refrescarVista();
        });
    }
}

const librosIniciales: Omit<Libro, "id" | "disponible" | "esFavorito">[] = [
    { titulo: "El Principito", autor: "Antoine de Saint-Exupéry", categoria: "LITERATURA", anio: 1943, ejemplares: 5 },
    { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", categoria: "LITERATURA", anio: 1967, ejemplares: 3 },
    { titulo: "Breve historia del tiempo", autor: "Stephen Hawking", categoria: "CIENCIA", anio: 1988, ejemplares: 2 },
    { titulo: "El arte de la guerra", autor: "Sun Tzu", categoria: "HISTORIA", anio: 500, ejemplares: 4 },
    { titulo: "Clean Code", autor: "Robert C. Martin", categoria: "TECNOLOGIA", anio: 2008, ejemplares: 6 },
    { titulo: "Historia del arte", autor: "Ernst Gombrich", categoria: "ARTE", anio: 1950, ejemplares: 2 }
];

document.addEventListener("DOMContentLoaded", () => {
    inicializarReferenciasDOM();
    setupEventosDOM();

    librosIniciales.forEach((libro) => biblioteca.agregarLibro(libro));

    console.log("📚 Sistema de Gestión de Biblioteca UNIVO iniciado");
});