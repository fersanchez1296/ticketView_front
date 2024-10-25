// Propiedades y métodos del componente de los tickets abiertos
export interface TicketProps {
  id: string;
  fecha_inicio: string;
  mesa_ayuda_abre: string | number;
  estado_asignado: string;
  estado_final: string;
  categoria: string;
  descripcion: string;
  prioridad: string;
  fecha_cierre_ticket: string;
  mesa_ayuda_cierre: string;
  equipo_asignado: string;
  asignado_a: string;
  descripcion_cierre_ticket: string;
  reasginado_a: string;
  tipo_ticket: string;
  medio_solicitud_recibido: string;
  cliente: string;
  dependencia_cliente: string;
  area_reasignado_a: string;
  respuesta_cierre_reasignado: string;
}

export interface TicketMethods {
  setTicketFields: (field: string, value: string | number) => void;
  resetValues: () => void;
}

export type TciketType = TicketProps & TicketMethods;

export const ticketInitialState: TicketProps = {
  id: "",
  fecha_inicio: "",
  mesa_ayuda_abre: "",
  estado_asignado: "",
  estado_final: "",
  categoria: "",
  descripcion: "",
  prioridad: "",
  fecha_cierre_ticket: "",
  mesa_ayuda_cierre: "",
  equipo_asignado: "",
  asignado_a: "",
  descripcion_cierre_ticket: "",
  reasginado_a: "",
  tipo_ticket: "",
  medio_solicitud_recibido: "",
  cliente: "",
  dependencia_cliente: "",
  area_reasignado_a: "",
  respuesta_cierre_reasignado: "",
};

// Propidades y métodos que controlan el abrir y cerrar de ventanas

export interface DialogState {
  isWindowOpen: boolean;
  openWindow: () => void;
  closeWindow: () => void;
}
