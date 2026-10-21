import { Navbar } from "./components/layout/Navbar";

// const Bandeja = () => <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-300 rounded-xl">Bandeja de Ticket</div>,
//   Formulario = () => <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-300 rounded-xl">Mi perfil</div>,
//   Perfil = () => <div className="p-12 text-center text-slate-500 border-2 border-dashed border-slate-300 rounded-xl">Nuevo Ticket</div>;


export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. Barra de Navegación Global */}
      <Navbar />

      {/* 2. Contenedor Principal (Aquí irán cambiando las pantallas) */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* <Routes>

          <Route path="/" element={<Bandeja />} />
          <Route path="/" element={<Formulario />} />
          <Route path="/" element={<Perfil />} />

        </Routes> */}


      </main>
    </div>
  );
}