export interface UsuarioLogueado {
  id: string;
  nombre: string;
  iniciales: string;
  cargo: string;
  email: string;
  notificacionesPendientes: number;
}