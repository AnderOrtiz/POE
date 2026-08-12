const boton = document.getElementById('btnAgregar') as HTMLButtonElement;
const cajaTexto = document.getElementById('txtNombre') as HTMLInputElement;
const etiqueta = document.getElementById('lblEstado') as HTMLHeadingElement;
const lista = document.getElementById('lista') as HTMLUListElement;

boton.addEventListener("click", agregarNombre);

function agregarNombre() {
    if (cajaTexto.value.trim() === '') {
        alert("Debe escribir un nombre");
        return;
    }

    // Cambiar estado de etiqueta
    etiqueta.textContent = `Último registro: ${cajaTexto.value}`;

    // Crear nuevo elemento para la lista
    const elemento = document.createElement("li");

    // Agregar texto al elemento
    elemento.textContent = cajaTexto.value;

    // Insertar a la lista
    lista.appendChild(elemento);

    cajaTexto.value = '';

    // Colocar nuevamente el cursor en la caja de texto
    cajaTexto.focus();
}