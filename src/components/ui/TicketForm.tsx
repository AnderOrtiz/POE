import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../../features/tickets/context/TicketContext";
import type { Ticket } from "../../features/tickets/types/ticket.types";

export function TicketForm() {
    const navigate = useNavigate(),
        contexto = useContext(TicketContext),

        [formulario, setformulario] = useState({
            titulo: "",
            modulo: "",
            prioridad: "Baja",
            descripcion: ""
        }),

        manejarCambio = (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => {
            setformulario({
                ...formulario,
                [e.target.name]: e.target.value
            });
        },

        manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!contexto) return;
            if (!formulario.titulo.trim() || !formulario.descripcion.trim()) {
                alert("El título o descripción son obligatorios");
                return;
            }

            const nuevoTicket: Ticket = {
                id: `TCK-${Math.floor(Math.random() * 1000) + 200}`,
                titulo: formulario.titulo,
                descripcion: formulario.descripcion,
                prioridad: formulario.prioridad as "Alta" | "Media" | "Baja",
                estado: "Abierto",
                creadoPor: "Carlos M.",
                fechaCreacion: new Date().toISOString().split("T")[0],
            };

            contexto.agregarTicket(nuevoTicket);
            navigate("/");
        };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Reportar una nueva incidencia</h2>
            <form onSubmit={manejarEnvio} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Título del ticket</label>
                    <input
                        type="text"
                        name="titulo"
                        value={formulario.titulo}
                        onChange={manejarCambio}
                        placeholder="Ej. Error 500 al procesar pago"
                        className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Fila con Módulo afectado y Prioridad a la par */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Módulo afectado</label>
                        <input
                            type="text"
                            name="modulo"
                            value={formulario.modulo}
                            onChange={manejarCambio}
                            placeholder="Ej. Pasarela de pago"
                            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Prioridad del ticket</label>
                        <select
                            name="prioridad"
                            value={formulario.prioridad}
                            onChange={manejarCambio}
                            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Descripción</label>
                    <textarea
                        name="descripcion"
                        rows={4}
                        value={formulario.descripcion}
                        onChange={manejarCambio}
                        placeholder="Describa los pasos para reproducir el fallo..."
                        className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition"
                    >
                        Crear Ticket
                    </button>
                </div>
            </form>
        </div>
    );
}