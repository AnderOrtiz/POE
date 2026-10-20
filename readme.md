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

## Mejoras: Lista de Tareas

### Requisitos

| Requisito | Mejora |
|---|---|
| Base: Registro y listado de tareas con estado completada/pendiente. | Las tareas se registran desde el formulario y se muestran en una lista. Al hacer clic en una tarea, cambia entre completada y pendiente. |
| RF-01: Agregar fecha límite a cada tarea. | Cada tarea tiene obligatoriamente fecha límite y no se pueden agregar tareas con fechas anteriores a hoy. |
| RF-02: Agregar prioridad (alta/media/baja). | Cada tarea cuenta obligatoriamente con una prioridad, ya sea alta, media o baja, y cada una se muestra con un color distinto. |
| RF-03: Editar tareas existentes. | Cada tarea tiene un botón ✎ que muestra un formulario con sus datos actuales. Al guardar, los cambios se validan antes de aplicarse, y con Cancelar la tarea queda como estaba. |
| RF-04: Eliminar con confirmación. | Cada tarea tiene un botón × que pide confirmación antes de eliminarla. También se pueden borrar todas las completadas de una vez. |
| RF-05: Buscar por título. | Hay un buscador que muestra las tareas cuyo título contiene el texto escrito, sin importar mayúsculas o minúsculas. |
| RF-06: Filtrar por estado y prioridad. | Hay botones para filtrar por estado (todas, pendientes, completadas) y por prioridad (todas, alta, media, baja), y se pueden combinar. |
| RF-07: Ordenar por fecha o prioridad. | Un selector permite ordenar las tareas por fecha límite (de la más cercana a la más lejana) o por prioridad (de alta a baja). |
| RF-08: Guardar en localStorage. | Las tareas y los filtros elegidos se guardan automáticamente después de cada cambio y se mantienen al recargar la página. |
| RF-09: Mostrar contador de tareas pendientes. | En el encabezado se muestra cuántas tareas quedan pendientes, y se actualiza con cada cambio. |
| 🎯 Reto adicional: Marcar tareas vencidas automáticamente con color rojo. | Las tareas pendientes cuya fecha límite ya pasó se marcan en rojo con el texto "vencida", y dejan de estarlo al completarlas. |
| Cambios en las clases | añadí fecha limite y prioridad en la interface Tarea y metodos como updateTarea(), deleteTarea(), searchTareas(), filterTareas() en **TareaModel:**. en **TareaView** agregué renderEditForm(), renderCounter() y en. **TareaController** agregué handleUpdate(), handleDelete(), handleSearch() |

---


### Decisión propia: la vista "Resumen"

#### **Decidí agregar una segunda pestaña, "Resumen", dedicada a las estadísticas**, por 3 razones:

1. **Cumple 2 requisitos a la vez:** "múltiples vistas" y "estadísticas".
2. **No sobrecarga la pantalla principal**, que ya tiene el formulario, la búsqueda, los filtros y la lista.
3. **Separa 2 usos distintos:** trabajar con las tareas y ver el avance general.

#### **Otra decisión en la paleta de colores** está inspirada del personaje Eva01 de evagelion:

| Color | Variable CSS | Código | Dónde se usa |
|---|---|---|---|
| Morado | `--purple` | `#7b4fc4` | Filtro y pestaña seleccionados, casillas sin marcar |
| Verde | `--green` | `#8fe04a` | Botón principal, casillas marcadas, foco, mensajes de éxito, prioridad baja |
| Naranja | `--orange` | `#ff8a3d` | Borrar, mensajes de error, prioridad alta |
| Rojo | `--red` | `#ff4d6d` | Tareas vencidas y su contador en el resumen |
| Texto | `--text` | `#ece6f7` | Texto principal |

El título "Tareas" y la barra de avance del resumen usan un degradado del morado al verde, los dos colores característicos del Eva-01.

---
