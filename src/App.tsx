import { Navbar } from "./components/layout/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. Barra de Navegación Global */}
      <Navbar />

      {/* 2. Contenedor Principal (Aquí irán cambiando las pantallas) */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
       

      </main>
    </div>
  );
}