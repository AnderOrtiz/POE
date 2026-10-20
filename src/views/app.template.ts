export const appTemplate = `
<main class="app">
    <header class="app-header">
        <p class="app-tag">Unidad 01 // Gestor</p>
        <h1>Tareas</h1>
        <p class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</p>
    </header>

    <nav class="tabs" role="tablist">
        <button type="button" class="tab selected" data-vista="tareas" role="tab">Tareas</button>
        <button type="button" class="tab" data-vista="resumen" role="tab">Resumen</button>
    </nav>

    <div id="mensaje" class="mensaje hidden" role="status"></div>

    <div id="vista-tareas" class="vista">
        <form id="new-todo-form" class="card new-todo-form">
            <label class="field">
                <span>Título</span>
                <input id="new-todo-input" placeholder="¿Qué necesita ser hecho?" autocomplete="off" autofocus>
            </label>
            <label class="field">
                <span>Descripción</span>
                <input id="new-todo-description" placeholder="Opcional" autocomplete="off">
            </label>
            <div class="form-row">
                <label class="field">
                    <span>Fecha límite</span>
                    <input id="new-todo-date" type="date" required>
                </label>
                <label class="field">
                    <span>Prioridad</span>
                    <select id="new-todo-priority" required>
                        <option value="" disabled selected hidden>Selecciona una prioridad</option>
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                </label>
            </div>
            <button type="submit" class="btn-primary">Agregar tarea</button>
        </form>

        <section class="card">
            <div class="toolbar">
                <input id="search-input" class="search-input" type="search" placeholder="Buscar por título...">
                <div class="filters" id="filtros-estado">
                    <button type="button" class="filtro selected" data-filtro="todas">Todas</button>
                    <button type="button" class="filtro" data-filtro="pendientes">Pendientes</button>
                    <button type="button" class="filtro" data-filtro="completadas">Completadas</button>
                </div>
                <div class="filters" id="filtros-prioridad">
                    <button type="button" class="filtro selected" data-prioridad="todas">Todas</button>
                    <button type="button" class="filtro" data-prioridad="alta">Alta</button>
                    <button type="button" class="filtro" data-prioridad="media">Media</button>
                    <button type="button" class="filtro" data-prioridad="baja">Baja</button>
                </div>
                <label class="sort">
                    <span>Ordenar por</span>
                    <select id="sort-select">
                        <option value="fecha">Fecha límite</option>
                        <option value="prioridad">Prioridad</option>
                    </select>
                </label>
            </div>

            <ul class="todo-list"></ul>

            <footer class="card-footer">
                <button type="button" class="clear-completed">Borrar completadas</button>
            </footer>
        </section>
    </div>

    <div id="vista-resumen" class="vista hidden">
        <section class="card resumen">
            <div class="stats">
                <div class="stat"><strong data-stat="total">0</strong><span>Total</span></div>
                <div class="stat"><strong data-stat="pendientes">0</strong><span>Pendientes</span></div>
                <div class="stat stat-ok"><strong data-stat="completadas">0</strong><span>Completadas</span></div>
                <div class="stat stat-alerta"><strong data-stat="vencidas">0</strong><span>Vencidas</span></div>
            </div>

            <div class="progreso">
                <div class="progreso-texto">
                    <span>Avance</span>
                    <strong data-stat="porcentaje">0%</strong>
                </div>
                <div class="progreso-barra"><div class="progreso-relleno"></div></div>
            </div>

            <div class="por-prioridad">
                <span class="por-prioridad-titulo">Por prioridad</span>
                <div class="por-prioridad-fila prioridad-alta"><span>Alta</span><strong data-stat="alta">0</strong></div>
                <div class="por-prioridad-fila prioridad-media"><span>Media</span><strong data-stat="media">0</strong></div>
                <div class="por-prioridad-fila prioridad-baja"><span>Baja</span><strong data-stat="baja">0</strong></div>
            </div>
        </section>
    </div>
</main>
`;
