// Propiedades y métodos del componente de los tickets abiertos
export interface TicketProps {
  _id: string;
  Id: number | string;
  Tipo_incidencia: Object;
  Fecha_hora_creacion: Date | String;
  Fecha_limite_resolucion_SLA: Date | String;
  Fecha_hora_ultima_modificacion: Date | String;
  Estado: Object;
  Area_asignado: Object;
  Asignado_a: Object;
  Creado_por: Object;
  Categoria: Object;
  Servicio: Object;
  Subcategoria: Object;
  Secretaria?: Object;
  Direccion_general?: Object;
  Direccion_area?: Object | null;
  Descripcion: string;
  Prioridad: Object;
  Incidencia_grave: string;
  Fecha_limite_respuesta_SLA?: Date | String;
  Descripcion_mandar_a_Escritorio?: string;
  Descripcion_cierre?: string;
  Causa?: string;
  Resuelto_por?: string;
  Cerrado_por?: string;
  Fecha_hora_cierre?: Date | String;
  NumeroRec_Oficio?: string;
  Numero_Oficio?: string;
  PendingReason?: string;
  Reasignado_a?: Object;
  Area_reasignado_a?: Object;
  Historia_ticket?: string;
  Descripcion_resolucion: string;
  Nombre_cliente: string;
  Telefono_cliente: string;
  Correo_cliente: string;
  Dependencia_cliente: string;
  Files?: File | null;
}

export interface TicketMethods {
  setTicketFields: (field: string, value: string | number) => void;
  setTicketFetch: (fields: Partial<TicketProps>) => void;
  resetValues: () => void;
  setFiles: (newFile: File | null) => void;
}

export type TciketType = TicketProps & TicketMethods;

export const ticketInitialState: TicketProps = {
  _id: "",
  Id: "",
  Tipo_incidencia: {},
  Fecha_hora_creacion: "",
  Fecha_limite_resolucion_SLA: "",
  Fecha_hora_ultima_modificacion: "",
  Estado: {},
  Area_asignado: {},
  Asignado_a: "",
  Creado_por: {},
  Categoria: {},
  Servicio: {},
  Subcategoria: {},
  Nombre_cliente: "",
  Secretaria: {},
  Direccion_general: {},
  Direccion_area: {},
  Descripcion: "",
  Prioridad: {},
  Incidencia_grave: "",
  Fecha_limite_respuesta_SLA: "",
  Descripcion_mandar_a_Escritorio: "",
  Descripcion_cierre: "",
  Causa: "",
  Resuelto_por: "",
  Cerrado_por: "",
  Fecha_hora_cierre: "",
  NumeroRec_Oficio: "",
  Numero_Oficio: "",
  PendingReason: "",
  Reasignado_a: "",
  Area_reasignado_a: "",
  Historia_ticket: "",
  Descripcion_resolucion: "",
  Telefono_cliente: "",
  Correo_cliente: "",
  Dependencia_cliente: "",
  Files: null,
};

export interface UserProps {
  _id: string;
  Nombre: string;
  Correo: string;
  Coordinacion: string;
  isActive: Boolean;
  Fecha_creacion: Date | string;
  Fecha_baja: Date | string;
  Dependencia: string;
  Direccion_general: string;
  Area: Object;
}

export interface UserMethods {
  setUserFields: (field: string, value: string | number) => void;
  setUserFetch: (fields: Partial<UserProps>) => void;
  resetUserValues: () => void;
}

export type UserType = UserProps & UserMethods;

export const userInitialState: UserProps = {
  _id: "",
  Nombre: "",
  Correo: "",
  Coordinacion: "",
  isActive: false,
  Fecha_creacion: "",
  Fecha_baja: "",
  Dependencia: "",
  Direccion_general: "",
  Area: {},
};

// Propidades y métodos que controlan el abrir y cerrar de ventanas

export interface DialogState {
  //estas definiciones y metodos se usan para abrir la ventana de visualización:
  isWindowOpen: boolean;
  openWindow: () => void;
  closeWindow: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de edición:
  isWindowEditOpen: boolean;
  openWindowEdit: () => void;
  closeWindowEdit: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de cerrar ticket:
  isWindowCloseTicketOpen: boolean;
  openWindowCloseTicket: () => void;
  closeWindowCloseTicket: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de reasignar ticket:
  isWindowReasignarOpen: boolean;
  openWindowReasignar: () => void;
  closeWindowReasignar: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de resolver ticket:
  isWindowResolverOpen: boolean;
  openWindowResolver: () => void;
  closeWindowResolver: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de reabrir ticket:
  isWindowReabrirOpen: boolean;
  openWindowReabrir: () => void;
  closeWindowReabrir: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de aceptar resolucion ticket:
  isWindowAceptarOpen: boolean;
  openWindowAceptat: () => void;
  closeWindowAceptar: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de rechazar resolucion ticket:
  isWindowRechazarOpen: boolean;
  openWindowRechazar: () => void;
  closeWindowRechazar: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de usuarios:
  isWindowUsuariosOpen: boolean;
  openWindowUsuarios: () => void;
  closeWindowUsuarios: () => void;
}
