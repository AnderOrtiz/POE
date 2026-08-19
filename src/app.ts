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

const DOM = {
    listaLibros: document.getElementById("lista-libros") as HTMLElement,

    totalLibros: document.getElementById("total-libros") as HTMLElement,

    librosDisponibles:
        document.getElementById("libros-disponibles") as HTMLElement,

    librosPrestados:
        document.getElementById("libros-prestados") as HTMLElement,

    mensajeContainer:
        document.getElementById("mensaje-container") as HTMLElement,

    filtroCategoria:
        document.getElementById("filtro-categoria") as HTMLSelectElement,

    buscarLibro:
        document.getElementById("buscar-libro") as HTMLInputElement
};

class Biblioteca {
    private libros: Libro[] = [];
    private _idCounter: number = 1;

    obtenerLibros(): Libro[] {
        return this.libros;
    }

    agregarLibro(
        libro: Omit<Libro, "id" | "disponible" | "esFavorito">
    ): void {
        const nuevoLibro: Libro = {
            ...libro,
            id: this._idCounter++,
            disponible: true,
            esFavorito: false
        };

        this.libros.push(nuevoLibro);
    }

    solicitarPrestamo(id: number): Libro | undefined {
        const libro = this.libros.find((l) => l.id === id);

        if (
            !libro ||
            !libro.disponible ||
            libro.ejemplares <= 0
        ) {
            return libro;
        }

        libro.ejemplares -= 1;

        if (libro.ejemplares === 0) {
            libro.disponible = false;
        }

        return libro;
    }

    devolverLibro(id: number): Libro | undefined {
        const libro = this.libros.find((l) => l.id === id);

        if (!libro) {
            return undefined;
        }

        libro.ejemplares += 1;
        libro.disponible = true;

        return libro;
    }

    cambiarFavorito(id: number): Libro | undefined {
        const libro = this.libros.find((l) => l.id === id);

        if (!libro) {
            return undefined;
        }

        libro.esFavorito = !libro.esFavorito;

        return libro;
    }
}

class NotificadorBiblioteca {
    notificarNuevoLibro(libro: Libro): void {
        console.log(
            `Nuevo libro disponible: "${libro.titulo}" de ${libro.autor}`
        );
    }

    notificarPrestamo(libro: Libro): void {
        console.log(
            `Préstamo exitoso: "${libro.titulo}" de ${libro.autor}`
        );
    }

    notificarNoDisponible(libro?: Libro): void {
        if (libro) {
            console.log(
                `Lo sentimos, "${libro.titulo}" de ${libro.autor} no está disponible.`
            );
        } else {
            console.log(
                "Lo sentimos, el libro solicitado no existe o no está disponible."
            );
        }
    }

    notificarDevolucion(libro: Libro): void {
        console.log(
            `Devolución exitosa: "${libro.titulo}" de ${libro.autor}`
        );
    }
}

class GestorUIBiblioteca {
    renderizarLibros(libros: Libro[]): void {
        if (libros.length === 0) {
            DOM.listaLibros.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📚</div>
                    <h3>No hay libros</h3>
                    <p>No se encontraron libros en la biblioteca.</p>
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

        const estadoClase = libro.disponible
            ? "available-status"
            : "unavailable-status";

        const estadoTexto = libro.disponible
            ? "Disponible"
            : "No disponible";

        const botonTexto = libro.disponible
            ? "Prestar"
            : "Devolver";

        const botonClase = libro.disponible
            ? "btn-primary"
            : "btn-secondary";

        const iconoFavorito = libro.esFavorito
            ? "★"
            : "☆";

        return `
            <article
                class="book-card"
                data-id="${libro.id}"
            >
                <div class="book-header">
                    <span class="category ${categoriaClase}">
                        ${libro.categoria}
                    </span>

                    <button
                        class="favorite ${libro.esFavorito ? "active" : ""}"
                        data-action="favorito"
                        data-id="${libro.id}"
                        title="Agregar a favoritos"
                    >
                        ${iconoFavorito}
                    </button>
                </div>

                <div class="book-content">
                    <h3>${libro.titulo}</h3>

                    <p class="author">
                        ${libro.autor}
                    </p>

                    <div class="book-info">
                        <span>
                            Año: ${libro.anio}
                        </span>

                        <span>
                            Ejemplares: ${libro.ejemplares}
                        </span>
                    </div>
                </div>

                <div class="book-footer">
                    <span class="status ${estadoClase}">
                        ${estadoTexto}
                    </span>

                    <button
                        class="btn ${botonClase}"
                        data-action="${libro.disponible ? "prestar" : "devolver"}"
                        data-id="${libro.id}"
                    >
                        ${botonTexto}
                    </button>
                </div>
            </article>
        `;
    }

    actualizarContador(libros: Libro[]): void {
        const total = libros.length;

        const disponibles = libros.filter(
            (libro) => libro.disponible
        ).length;

        const prestados = total - disponibles;

        DOM.totalLibros.textContent = total.toString();

        DOM.librosDisponibles.textContent =
            disponibles.toString();

        DOM.librosPrestados.textContent =
            prestados.toString();
    }

    mostrarMensaje(
        mensaje: string,
        tipo: "exito" | "error" | "info"
    ): void {
        let clase = "success";
        let icono = "✓";

        if (tipo === "error") {
            clase = "error";
            icono = "!";
        }

        if (tipo === "info") {
            clase = "info";
            icono = "i";
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

const notificador =
    new NotificadorBiblioteca();

const gestorUI =
    new GestorUIBiblioteca();

const librosIniciales:
    Omit<Libro, "id" | "disponible" | "esFavorito">[] = [
        {
            titulo: "El Principito",
            autor: "Antoine de Saint-Exupéry",
            categoria: "LITERATURA",
            anio: 1943,
            ejemplares: 5
        },
        {
            titulo: "Cien años de soledad",
            autor: "Gabriel García Márquez",
            categoria: "LITERATURA",
            anio: 1967,
            ejemplares: 3
        },
        {
            titulo: "Breve historia del tiempo",
            autor: "Stephen Hawking",
            categoria: "CIENCIA",
            anio: 1988,
            ejemplares: 2
        },
        {
            titulo: "El arte de la guerra",
            autor: "Sun Tzu",
            categoria: "HISTORIA",
            anio: 500,
            ejemplares: 4
        },
        {
            titulo: "Clean Code",
            autor: "Robert C. Martin",
            categoria: "TECNOLOGIA",
            anio: 2008,
            ejemplares: 6
        },
        {
            titulo: "Historia del arte",
            autor: "Ernst Gombrich",
            categoria: "ARTE",
            anio: 1950,
            ejemplares: 2
        }
];

librosIniciales.forEach(
    (libro) => biblioteca.agregarLibro(libro)
);

function prestarLibro(id: number): void {
    const libro = biblioteca.obtenerLibros()
        .find((l) => l.id === id);

    if (
        !libro ||
        !libro.disponible ||
        libro.ejemplares <= 0
    ) {
        notificador.notificarNoDisponible(libro);

        gestorUI.mostrarMensaje(
            libro
                ? `"${libro.titulo}" no está disponible actualmente.`
                : "El libro solicitado no existe.",
            "error"
        );

        return;
    }

    biblioteca.solicitarPrestamo(id);

    notificador.notificarPrestamo(libro);

    gestorUI.mostrarMensaje(
        `Préstamo de "${libro.titulo}" realizado con éxito.`,
        "exito"
    );

    renderizar();
}

function devolverLibro(id: number): void {
    const libro = biblioteca.devolverLibro(id);

    if (!libro) {
        gestorUI.mostrarMensaje(
            "El libro solicitado no existe.",
            "error"
        );

        return;
    }

    notificador.notificarDevolucion(libro);

    gestorUI.mostrarMensaje(
        `"${libro.titulo}" fue devuelto correctamente.`,
        "exito"
    );

    renderizar();
}

function cambiarFavorito(id: number): void {
    biblioteca.cambiarFavorito(id);

    renderizar();
}

function renderizar(): void {
    const libros = biblioteca.obtenerLibros();

    gestorUI.renderizarLibros(libros);

    gestorUI.actualizarContador(libros);
}

function setupEventosLibros(): void {
    DOM.listaLibros.addEventListener(
        "click",
        (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            const boton = target.closest("button");

            if (!boton) {
                return;
            }

            const id = parseInt(
                boton.getAttribute("data-id") || "0"
            );

            if (id <= 0) {
                return;
            }

            const accion =
                boton.getAttribute("data-action");

            if (accion === "prestar") {
                prestarLibro(id);
            } else if (accion === "devolver") {
                devolverLibro(id);
            } else if (accion === "favorito") {
                cambiarFavorito(id);
            }
        }
    );
}

function filtrarLibros(): void {
    const categoria =
        DOM.filtroCategoria.value;

    const busqueda =
        DOM.buscarLibro.value
            .toLowerCase()
            .trim();

    const libros =
        biblioteca.obtenerLibros();

    const librosFiltrados =
        libros.filter((libro) => {
            const coincideCategoria =
                categoria === "TODOS" ||
                libro.categoria === categoria;

            const coincideBusqueda =
                libro.titulo
                    .toLowerCase()
                    .includes(busqueda) ||
                libro.autor
                    .toLowerCase()
                    .includes(busqueda);

            return (
                coincideCategoria &&
                coincideBusqueda
            );
        });

    gestorUI.renderizarLibros(
        librosFiltrados
    );
}

function init(): void {
    setupEventosLibros();

    DOM.filtroCategoria.addEventListener(
        "change",
        filtrarLibros
    );

    DOM.buscarLibro.addEventListener(
        "input",
        filtrarLibros
    );

    renderizar();
}

document.addEventListener(
    "DOMContentLoaded",
    init
);