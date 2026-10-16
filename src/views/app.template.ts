export const appTemplate = `
<main class="app">
    <header class="app-header">
        <p class="app-tag">Unidad 01 // Gestor</p>
        <h1>Tareas</h1>
        <p class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</p>
    </header>

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

    <div id="mensaje" class="mensaje hidden" role="status"></div>

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
</main>
`;
