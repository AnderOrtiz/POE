# ¿Cómo ejecutar este código?

## Requisitos

* Node.js
* Git
* pnpm
* Live Server

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/AnderOrtiz/POE.git

cd POE

git checkout clase10
```

---

## 2. Instalar las dependencias

```bash
pnpm install
```

> **¿No tienes pnpm?**
>
> Instálalo siguiendo la documentación oficial:
> https://pnpm.io/es/installation

---

## 3. Ejecutar el proyecto

Para ejecutar el proyecto se debe utilizar:

```bash
pnpm dev
```

Este comando se encarga de transpilar el código TypeScript y mantener el proyecto actualizado mediante el modo de desarrollo.

---

## 4. Abrir el HTML

Después de ejecutar:

```bash
pnpm dev
```

abre el archivo `index.html` utilizando **Live Server** desde Visual Studio Code.

Puedes hacer clic derecho sobre `index.html` y seleccionar:

```text
Open with Live Server
```

Live Server abrirá el proyecto en el navegador y actualizará automáticamente la página cuando se realicen cambios en los archivos.

---

## Estructura del proyecto

```text
POE/
├── index.html
├── styles.css
├── src/
│   └── app.ts
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## Comandos principales

Instalar dependencias:

```bash
pnpm install
```

Ejecutar el modo de desarrollo:

```bash
pnpm dev
```

Cambiar a la versión de la clase 10:

```bash
git checkout clase10
```

---

## Notas

No es necesario ejecutar directamente el archivo TypeScript con:

```bash
pnpm exec tsx src/app.ts
```

Este proyecto utiliza `pnpm dev` para realizar la transpilación del TypeScript y mantener el proyecto actualizado durante el desarrollo.

El archivo `index.html` debe abrirse mediante Live Server para visualizar correctamente la aplicación en el navegador.
