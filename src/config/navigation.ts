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