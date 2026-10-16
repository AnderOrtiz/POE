# Gestor de tareas

Aplicación para gestionar una lista de tareas personales con estados (pendiente/completada), hecha con TypeScript sin frameworks ni bundlers.

## Funcionalidades

- Registrar tareas con título y descripción.
- Marcar tareas como completadas o pendientes.
- Buscar tareas por título.
- Eliminar tareas con confirmación.
- Filtrar por estado (todas, pendientes, completadas).
- Los datos se guardan en `localStorage`.

## Requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 20 o superior (incluye `npm`)
- [Visual Studio Code](https://code.visualstudio.com/) con la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### ¿Qué es Live Server?

Live Server es una extensión de VS Code que levanta un servidor local para abrir páginas HTML y recarga el navegador automáticamente cada vez que cambia un archivo. Se instala desde VS Code: abrir el panel de extensiones (`Ctrl+Shift+X`, o `Cmd+Shift+X` en macOS), buscar "Live Server" (de Ritwick Dey) y pulsar **Install**.

## Cómo obtener el proyecto

```bash
git clone https://github.com/AnderOrtiz/POE.git
cd POE
git checkout clase24
```

## Cómo ejecutarlo

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Compilar el proyecto:

   ```bash
   npm run build
   ```

   Esto genera la carpeta `dist/` con el JavaScript que usa el navegador. Hay que volver a ejecutarlo cada vez que se cambie un archivo `.ts`.

3. Abrir la carpeta del proyecto en VS Code, hacer click derecho sobre `index.html` y elegir **Open with Live Server** (o pulsar **Go Live** en la barra inferior).

El navegador se abre solo con la aplicación (normalmente en <http://127.0.0.1:5500/index.html>). Después de cada `npm run build`, Live Server recarga la página.

> Abrir `index.html` con doble click no funciona: el navegador bloquea los módulos de JavaScript en `file://`, por eso se necesita Live Server.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run build` | Compila `src/*.ts` a `dist/*.js` una sola vez. |

## Estructura

```
POE/
├── src
│   ├── controllers
│   │   └── tarea.controller.ts
│   ├── models
│   │   └── tarea.model.ts
│   ├── services
│   │   └── storage.service.ts
│   ├── views
│   │   ├── app.template.ts
│   │   └── tarea.view.ts
│   ├── main.ts
│   └── style.css
├── index.html
├── package-lock.json
├── package.json
├── readme.md
└── tsconfig.json
```
