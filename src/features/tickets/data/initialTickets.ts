import type { Ticket } from '../types/ticket.types';


export const TICKETS_INICIALES: Ticket[] = [
    {
        id: 'TCK-101',
        titulo: 'Error 500 al procesar pago con Stripe',
        descripcion: 'Fallo recurrente en el checkout.',
        prioridad: 'Alta',
        estado: 'Abierto',
        creadoPor: 'Carlos M.',
        fechaCreacion: '2026-10-21',
    },
    {
        id: 'TCK-102',
        titulo: 'Ajuste en plantilla de email',
        descripcion: 'Cambiar el logo corporativo.',
        prioridad: 'Baja',
        estado: 'En Proceso',
        creadoPor: 'Elena M.',
        fechaCreacion: '2026-10-20',
    }
];