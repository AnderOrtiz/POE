import { createContext, useState, type ReactNode } from "react";
import type { Ticket } from "../types/ticket.types";
import { TICKETS_INICIALES } from "../data/initialTickets";

interface TicketContextTyoe {
    tickets: Ticket[],
    agregarTicket: (nuevoTicket: Ticket) => void;
}

export const TicketContext = createContext<TicketContextTyoe | null>(null);

export function TicketProvider({ children }: { children: ReactNode }) {
    const [tickets, setTickets] = useState<Ticket[]>(TICKETS_INICIALES);
    const agregarTicket = (nuevoTicket: Ticket) => {
        setTickets([nuevoTicket, ...tickets])
    }

    return (
        <TicketContext.Provider value={{ tickets, agregarTicket }}>
            {children}
        </TicketContext.Provider>
    )

}