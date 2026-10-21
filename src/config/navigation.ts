export interface NavItem {
    id: string;
    label: string;
    href: string;
    isActive?: boolean;
}

export const MENU_PRINCIPAL: NavItem[] = [
    { id: 'nav-tickets', label: 'Tickets', href: '#', isActive: true },
    { id: 'nav-nuevo', label: 'Nuevo Ticket', href: '#' },
    { id: 'nav-config', label: 'Configuración', href: '#' },
];