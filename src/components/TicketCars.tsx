import type { Ticket } from "../features/tickets/types/ticket.types";
import { Badge } from "./ui/Badge";

interface TicketCardProps {
    ticket: Ticket
}

export function TicketCard({ ticket }: TicketCardProps) {
    const variablePrioridad = ticket.prioridad === "Alta" ? "danger" : ticket.prioridad === "Media" ? "warning" : "default",
        varianteEstado = ticket.estado === "Resuelto" ? "success" : "default";

    return (
        <article>

            <div>
                <span>{ticket.id}</span>
                <div>
                    <Badge variant={variablePrioridad}>{ticket.prioridad}</Badge>
                    <Badge variant={varianteEstado}>{ticket.estado}</Badge>
                </div>
            </div>
            <h3>{ticket.titulo}</h3>
            <p>{ticket.descripcion}</p>

            <div>
                <span>Por: <span>{ticket.creadoPor}</span></span>
                <time>{ticket.fechaCreacion}</time>
            </div>

        </article>
    )
}

