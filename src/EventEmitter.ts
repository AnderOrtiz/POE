type Listener = (...args: any[]) => void;

// Esta clase es una solución al error 
//! Uncaught TypeError: Failed to resolve module specifier "events". 
//! Relative references must start with either "/", "./", or "../".
// que sale en la consola del navegador al usar import EventEmitter from "events"

export class EventEmitter {
    private events: { [key: string]: Listener[] } = {};

    on(event: string, listener: Listener): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event: string, ...args: any[]): boolean {
        if (!this.events[event]) return false;
        this.events[event].forEach((listener) => listener(...args));
        return true;
    }
}

export default EventEmitter;