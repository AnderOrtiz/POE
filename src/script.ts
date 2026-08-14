/**
 * ================================================================
 * SPIDER-VERSE: REGISTRO DE HÉROES
 * Sistema de reclutamiento multiversal
 * ================================================================
 *
 * Este script maneja el registro de héroes del Spider-Verse,
 * permitiendo agregar, listar y eliminar reclutas del multiverso.
 * ================================================================
 */


// ================================================================
// PASO 1: INTERFACES Y TIPOS
// ================================================================
// Explicar: una interfaz define la "forma" que debe tener un objeto.
// Aquí decimos que TODO héroe debe tener id, nombre y universo.
// Esto es lo mismo que ya vieron en POO al tipar propiedades de una clase.

interface Heroe {
    id: number;          // Identificador único del héroe
    nombre: string;      // Alias o nombre del héroe
    universo: string;    // Tierra de origen (ej: "Tierra-1610")
    esFavorito: boolean; // <-- nueva propiedad

}


// ================================================================
// PASO 2: REFERENCIAS A LOS ELEMENTOS DEL DOM
// ================================================================
// Explicar: en vez de escribir document.getElementById(...) una y otra
// vez por todo el archivo, lo hacemos UNA sola vez aquí y lo guardamos
// en un objeto llamado DOM. Así, si el HTML cambia, solo tocamos este bloque.

const DOM = {
    // Select del universo
    selectFiltro: document.getElementById('selectFiltro') as HTMLSelectElement,

    // Input donde se escribe el nombre del héroe
    txtNombre: document.getElementById('txtNombre') as HTMLInputElement,

    // Select para elegir el universo de origen
    selectUniverso: document.getElementById('selectCarrera') as HTMLSelectElement,

    // Botón para reclutar un nuevo héroe
    btnAgregar: document.getElementById('btnAgregar') as HTMLButtonElement,

    // Botón para limpiar los campos del formulario
    btnLimpiar: document.getElementById('btnLimpiar') as HTMLButtonElement,

    // Contenedor (grid) donde se muestran las tarjetas de héroes
    listaHeroes: document.getElementById('listaEstudiantes') as HTMLElement,

    // Párrafo que muestra el estado actual del sistema
    estado: document.getElementById('estado') as HTMLParagraphElement,

    // Número que muestra cuántos héroes hay reclutados
    contadorHeroes: document.getElementById('contadorHeroes') as HTMLElement,

    // Bloque que se muestra solo cuando NO hay héroes reclutados
    emptyState: document.getElementById('emptyState') as HTMLElement,

    // Texto del footer que muestra el último universo reclutado
    dimensionFooter: document.getElementById('dimensionFooter') as HTMLElement
};


// ================================================================
// PASO 3: ESTADO GLOBAL DE LA APLICACIÓN
// ================================================================
// Explicar: estas dos variables representan "la memoria" del programa.
// heroes guarda la lista completa; idCounter genera un id distinto
// para cada héroe nuevo (nunca se repite, siempre sube).

let heroes: Heroe[] = [],
    idCounter: number = 1,      // Contador para asignar IDs únicos
    filtroActual: string = 'todos';

// ================================================================
// PASO 4: ACTUALIZAR EL CONTADOR EN PANTALLA
// ================================================================
// Explicar: esta función NO agrega ni elimina nada, solo actualiza
// lo que se VE en pantalla según el estado actual del arreglo "heroes".

function actualizarContador(): void {
    const total = heroes.length;
    DOM.contadorHeroes.textContent = total.toString();

    // Si hay al menos un héroe, mostramos su universo en el footer
    if (heroes.length > 0) {
        const ultimoUniverso = heroes[heroes.length - 1]?.universo;
        if (ultimoUniverso) {
            DOM.dimensionFooter.textContent = ultimoUniverso;
        }
    }
}


// ================================================================
// PASO 5: ACTUALIZAR EL MENSAJE DE ESTADO
// ================================================================
// Explicar: el parámetro "mensaje?" es OPCIONAL (el "?" lo indica).
// Si se lo pasamos, mostramos ese mensaje específico.
// Si NO se lo pasamos, calculamos un mensaje genérico según cuántos
// héroes hay en total.

function actualizarEstado(mensaje?: string): void {
    if (mensaje) {
        DOM.estado.textContent = mensaje;
        return;
    }

    const total = heroes.length;

    if (total === 0) {
        DOM.estado.textContent = 'Estado: Esperando reclutas del multiverso...';
    } else {
        // Explicar: usamos un operador ternario para agregar la "s" de plural
        // solo cuando corresponde ("1 héroe" vs "2 héroes")
        const plural = total > 1 ? 's' : '';
        DOM.estado.textContent = `Estado: ${total} héroe${plural} reclutado${plural} en el Spider-Verse`;
    }

    console.log(`Arreglo de heroes: `, heroes)
}


// ================================================================
// PASO 6: MOSTRAR U OCULTAR EL "ESTADO VACÍO"
// ================================================================
// Explicar: classList.add/remove permite agregar o quitar una clase
// CSS desde TypeScript. La clase "hidden" (definida en el CSS) es la
// que hace que el bloque desaparezca.

function toggleEmptyState(): void {
    if (heroes.length === 0) {
        DOM.emptyState.classList.remove('hidden');
    } else {
        DOM.emptyState.classList.add('hidden');
    }
}


// ================================================================
// PASO 7: RENDERIZAR (DIBUJAR) LA LISTA DE HÉROES
// ================================================================
// Explicar: "renderizar" significa tomar los datos (el arreglo heroes)
// y convertirlos en HTML real dentro de la página. Esta función se
// vuelve a llamar CADA VEZ que el arreglo heroes cambia.

function renderizarHeroes(): void {

    // Crear una copia para no modificar heroes
    let heroesFiltrados = [...heroes];


    // Filtrar
    switch (filtroActual) {

        case 'favoritos':
            heroesFiltrados = heroesFiltrados.filter(
                heroe => heroe.esFavorito
            );
            break;

        case 'Tierra-616':
        case 'Tierra-1610':
        case 'Tierra-65':
            heroesFiltrados = heroesFiltrados.filter(
                heroe => heroe.universo === filtroActual
            );
            break;
    }


    // Ordenar alfabéticamente
    heroesFiltrados.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
    );


    // Renderizar
    DOM.listaHeroes.innerHTML = heroesFiltrados
        .map(heroe => `
            <div class="hero-card" data-id="${heroe.id}">

                <div class="hero-info">

                    <span
                        class="hero-name editable-name"
                        data-id="${heroe.id}">
                        ${heroe.nombre}
                    </span>

                    <span class="hero-universe">
                        Origen:
                        <span class="dimension-badge">
                            ${heroe.universo}
                        </span>
                    </span>

                </div>

                <button
                    class="btn-eliminar"
                    data-id="${heroe.id}">
                    Expulsar
                </button>

                <button
                    class="btn-favorito"
                    data-id="${heroe.id}">
                    ${heroe.esFavorito
                ? 'Quitar de favoritos'
                : 'Marcar como favorito'}
                </button>

            </div>
        `)
        .join('');


    actualizarContador();
    actualizarEstado();
}


// ================================================================
// PASO 8: DELEGACIÓN DE EVENTOS PARA LOS BOTONES "EXPULSAR"
// ================================================================
// Explicar: en vez de poner un addEventListener en CADA botón nuevo
// (que además se borran y se vuelven a crear todo el tiempo), ponemos
// UN SOLO listener en el contenedor padre (listaHeroes). Cuando se hace
// clic en cualquier parte adentro, revisamos si el clic fue sobre un
// botón "Expulsar" usando closest().



// ================================================================
// PASO 9: ELIMINAR UN HÉROE POR SU ID
// ================================================================
// Explicar: find() busca UN elemento que cumpla la condición (para
// poder mostrar su nombre en el mensaje). filter() crea un arreglo
// NUEVO con todos los héroes MENOS el que tiene ese id.

function eliminarHeroe(id: number): void {
    const heroeEliminado = heroes.find(h => h.id === id);

    heroes = heroes.filter(heroe => heroe.id !== id);

    renderizarHeroes();

    if (heroeEliminado) {
        actualizarEstado(`${heroeEliminado.nombre} ha sido expulsado del Spider-Verse`);
    }
}


// ================================================================
// PASO 10: AGREGAR UN NUEVO HÉROE
// ================================================================
// Explicar: esta es la función principal del formulario. Primero VALIDA
// que el nombre no esté vacío; si está vacío, avisa y se detiene con
// "return" (no sigue ejecutando el resto de la función).

function agregarHeroe(): void {
    const nombre = DOM.txtNombre.value.trim();
    const universo = DOM.selectUniverso.value;

    if (nombre === '') {
        actualizarEstado('Ingresa un alias o nombre para el héroe');
        DOM.txtNombre.focus();

        DOM.txtNombre.style.borderColor = 'var(--spider-red)';

        setTimeout(() => {
            DOM.txtNombre.style.borderColor = '';
        }, 2000);

        return;
    }

    if (nombre.length > 20) {
        actualizarEstado('El nombre no puede superar los 20 caracteres');
        DOM.txtNombre.focus();
        return;
    }

    const nuevoHeroe: Heroe = {
        id: idCounter++,
        nombre: nombre,
        universo: universo,
        esFavorito: false, // <-- nueva propiedad
    };

    const isDuplicated: boolean = heroes.some(
        heroe =>
            heroe.nombre === nuevoHeroe.nombre &&
            heroe.universo === nuevoHeroe.universo
    );

    if (isDuplicated) {
        actualizarEstado('No puede haber héroes duplicados');
        DOM.txtNombre.focus();
        return;
    }

    heroes.push(nuevoHeroe);

    DOM.txtNombre.value = '';
    DOM.txtNombre.focus();

    if (heroes.length >= 6) {
        DOM.btnAgregar.disabled = true;
    }

    renderizarHeroes();

    actualizarEstado(
        `${nombre} ha sido reclutado en el Spider-Verse`
    );
}


// ================================================================
// PASO 11: LIMPIAR LOS CAMPOS DEL FORMULARIO
// ================================================================
// Explicar: esta función NO toca el arreglo heroes, solo resetea
// lo que el usuario ve en el formulario (sin agregar ni eliminar nada).

function limpiarCampos(): void {
    DOM.txtNombre.value = '';
    DOM.selectUniverso.selectedIndex = 0;
    DOM.txtNombre.focus();
    actualizarEstado('Campos limpiados. Listo para nuevo recluta');
}



function guardarNombreHeroe(
    id: number,
    nuevoNombre: string
): void {

    const heroe = heroes.find(h => h.id === id);

    if (!heroe) {
        return;
    }

    nuevoNombre = nuevoNombre.trim();


    // No permitir nombre vacío
    if (nuevoNombre === '') {
        actualizarEstado('El nombre no puede estar vacío');
        renderizarHeroes();
        return;
    }


    // No permitir más de 20 caracteres
    if (nuevoNombre.length > 20) {
        actualizarEstado(
            'El nombre no puede superar los 20 caracteres'
        );

        renderizarHeroes();
        return;
    }


    // Guardar el nuevo nombre
    heroe.nombre = nuevoNombre;


    // Volver a dibujar las tarjetas
    renderizarHeroes();


    actualizarEstado(
        `${nuevoNombre} ha sido actualizado correctamente`
    );
}

function editarNombreHeroe(
    id: number,
    elemento: HTMLElement
): void {

    const heroe = heroes.find(h => h.id === id);

    if (!heroe) {
        return;
    }

    const input = document.createElement('input');

    input.type = 'text';
    input.value = heroe.nombre;
    input.maxLength = 20;

    elemento.replaceWith(input);

    input.focus();
    input.select();


    let guardado = false;


    function guardar(): void {

        if (guardado) {
            return;
        }

        const duplicado = heroes.find(h => h.nombre == input.value)

        if (duplicado) {
            actualizarEstado('No puede haber héroes duplicados');
            input.focus();
            input.select();
            return;
        }

        guardado = true;

        guardarNombreHeroe(id, input.value);
    }


    // Guardar al presionar Enter
    input.addEventListener('keydown', (event: KeyboardEvent) => {

        if (event.key === 'Enter') {
            guardar();
        }

    });


    // Guardar al perder el foco
    input.addEventListener('blur', () => {

        guardar();

    });

}


function setupBotonesHeroe(): void {

    DOM.listaHeroes.addEventListener('click', (event: MouseEvent) => {

        const target = event.target as HTMLElement;


        // ==========================================
        // BOTÓN ELIMINAR
        // ==========================================

        const btnEliminar = target.closest('.btn-eliminar');

        if (btnEliminar) {
            const id = parseInt(
                btnEliminar.getAttribute('data-id') || '0'
            );

            if (id > 0) {
                eliminarHeroe(id);
            }

            return;
        }


        // ==========================================
        // BOTÓN FAVORITO
        // ==========================================

        const btnFavorito = target.closest('.btn-favorito');

        if (btnFavorito) {
            const id = parseInt(
                btnFavorito.getAttribute('data-id') || '0'
            );

            if (id > 0) {
                toggleFavorito(id);
            }

            return;
        }


        // ==========================================
        // EDITAR NOMBRE
        // ==========================================

        const nombreHeroe = target.closest('.editable-name');

        if (nombreHeroe instanceof HTMLElement) {
            const id = parseInt(
                nombreHeroe.getAttribute('data-id') || '0'
            );

            if (id > 0) {
                editarNombreHeroe(id, nombreHeroe);
            }
        }

    });
}


function toggleFavorito(id: number): void {
    const heroe = heroes.find(h => h.id === id);

    if (!heroe) {
        return;
    }

    heroe.esFavorito = !heroe.esFavorito;

    renderizarHeroes();
}

function setupFiltro(): void {
    DOM.selectFiltro.addEventListener('change', () => {
        filtroActual = DOM.selectFiltro.value;

        renderizarHeroes();
    });
}

// ================================================================
// PASO 12: INICIALIZACIÓN — CONECTAR TODOS LOS EVENTOS
// ================================================================
// Explicar: esta función es la que "arma" toda la aplicación,
// conectando cada botón/input con la función que le corresponde.
// Se ejecuta una sola vez, cuando la página termina de cargar.

function init(): void {
    console.log('Iniciando sistema de reclutamiento Spider-Verse...');
    console.log(`Fecha actual: ${new Date()}`);

    // Clic en "Reclutar"
    DOM.btnAgregar.addEventListener('click', agregarHeroe);

    // Clic en "Limpiar"
    DOM.btnLimpiar.addEventListener('click', limpiarCampos);

    // Permitir reclutar presionando la tecla Enter dentro del input
    DOM.txtNombre.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // evita comportamiento por defecto del navegador
            agregarHeroe();
        }
    });

    setupFiltro();
    // Activar la delegación de eventos para los botones "Expulsar"
    setupBotonesHeroe();
    // Estado inicial de la página al cargar (sin héroes todavía)
    actualizarEstado();
    toggleEmptyState();

    console.log('Sistema Spider-Verse listo para reclutar héroes multiversales');
    console.log(`${DOM.selectUniverso.options.length} universos disponibles para reclutamiento`);
}


// ================================================================
// PASO 13: PUNTO DE ENTRADA DEL PROGRAMA
// ================================================================
// Explicar: 'DOMContentLoaded' es un evento del navegador que se
// dispara cuando TODO el HTML ya terminó de cargar. Es importante
// esperar a este evento, porque si init() se ejecutara antes, los
// document.getElementById(...) del Paso 2 devolverían null
// (el HTML todavía no existiría).

document.addEventListener('DOMContentLoaded', init);