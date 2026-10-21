import { Badge } from "../ui/Badge";
import { MENU_PRINCIPAL } from "../../config/navigation";
import { USUARIO_ACTUAL } from "../../features/auth/data/currentUser";

export function Navbar() {
  // const location = useLocation()
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Lado Izquierdo: Logo y Menú Dinámico */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">DevDesk</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            {MENU_PRINCIPAL.map((item) => (
              <a 
                key={item.id} 
                href={item.href} 
                className={`py-5 transition-colors ${
                  item.isActive 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Lado Derecho: Datos del Usuario Dinámicos */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-900">{USUARIO_ACTUAL.nombre}</p>
            <p className="text-xs text-slate-500">{USUARIO_ACTUAL.cargo}</p>
          </div>
          
          {/* Ocultamos el badge si no hay notificaciones */}
          {USUARIO_ACTUAL.notificacionesPendientes > 0 && (
            <Badge variant="default">{USUARIO_ACTUAL.notificacionesPendientes}</Badge>
          )}
          
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border border-slate-300">
            {USUARIO_ACTUAL.iniciales}
          </div>
        </div>

      </div>
    </header>
  );
}