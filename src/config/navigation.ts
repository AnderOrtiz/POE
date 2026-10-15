// Define el contrato (tipo o interfaz) antes de los datos. El orden es:

// Escribes la interfaz que describe un item de navegación.
// Declaras la constante exportada, un arreglo de esos items, indicando su tipo.

export interface NavigationItem {
    id: string;
    label: string;
    path: string;
}

export const navigationItems: NavigationItem[] = [
    { id: "tickets", label: "Tickets", path: "/tickets" },
    { id: "new-ticket", label: "Nuevo Ticket", path: "/new-ticket" },
    { id: "settings", label: "Configuración", path: "/settings" },
];