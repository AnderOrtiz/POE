const boton = document.getElementById("btnAgregar") as HTMLButtonElement,
    cajaTexto = document.getElementById("txtNombre") as HTMLInputElement,
    etiqueta = document.getElementById("lblEstado") as HTMLHeadingElement,
    lista = document.getElementById("lista") as HTMLUListElement,


    AgregarNombre = (): void => {
        if (cajaTexto.value.trim() === "") {
            alert("Debe escribir un nombre");
            return;
        }
    };


boton.addEventListener("click", AgregarNombre);