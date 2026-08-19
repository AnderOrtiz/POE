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

Para ejecutar el proyecto utiliza:

```bash
pnpm dev
```

Este comando se encarga de transpilar el código TypeScript y activar el modo de desarrollo para que los cambios realizados en el proyecto se actualicen automáticamente.

---

## 4. Abrir el proyecto en el navegador

Después de ejecutar:

```bash
pnpm dev
```

abre el archivo `index.html` utilizando **Live Server** desde Visual Studio Code.

Haz clic derecho sobre `index.html` y selecciona:

```text
Open with Live Server
```

Live Server abrirá el proyecto en el navegador y permitirá visualizar la aplicación mientras se realizan cambios en el código.

---

## Estructura del proyecto

```text
POE/
├── src
│   ├── app.ts
│   └── styles.css
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── readme.md
└── tsconfig.json
```

---

## Comandos principales

Instalar las dependencias:

```bash
pnpm install
```

Ejecutar el proyecto:

```bash
pnpm dev
```

Cambiar a la clase 10:

```bash
git checkout clase10
```

---

## Nota

No es necesario ejecutar directamente `app.ts` con:

```bash
pnpm exec tsx src/app.ts
```

Este proyecto utiliza:

```bash
pnpm dev
```

para transpilar el código TypeScript y ejecutar el entorno de desarrollo.

El archivo `index.html` debe abrirse mediante **Live Server** para visualizar la aplicación en el navegador.
