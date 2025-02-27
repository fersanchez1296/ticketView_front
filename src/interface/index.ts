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
  Descripcion_resolucion: string;
  Nombre_cliente: string;
  Telefono_cliente: string;
  Extension_cliente: string;
  Ubicacion_cliente: string;
  Correo_cliente: string;
  Medio: string;
  Dependencia_cliente: Object;
  Files?: File | Array<any>;
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
  Descripcion_resolucion: "",
  Telefono_cliente: "",
  Extension_cliente: "",
  Ubicacion_cliente: "",
  Correo_cliente: "",
  Medio: "",
  Dependencia_cliente: {},
  Files: [],
};

export interface UserProps {
  _id: string;
  Nombre: string;
  Correo: string;
  Rol: string;
  isActive: Boolean;
  Area: Object;
}

export interface UserMethods {
  setUserFields: (field: string, value: string | number) => void;
  setUserFetch: (fields: Partial<UserProps>) => void;
  resetValues: () => void;
}

export type UserType = UserProps & UserMethods;

export const userInitialState: UserProps = {
  _id: "",
  Nombre: "",
  Correo: "",
  Rol: "",
  isActive: true,
  Area: "",
};

//client interface

export interface ClientProps {
  _id: string;
  nuevaDependencia: string;
  nuevaDArea: string;
  nuevaDGeneral: string;
  Correo: string;
  Nombre: string;
  Direccion_General: Object;
  direccion_area: Object;
  Dependencia: Object;
  Telefono: string;
  Extension: string;
  Ubicacion: string;
  isEdit: boolean;
}

export interface ClientMethods {
  setClientesFields: (field: string, value: string | number) => void;
  setClientesFetch: (fields: Partial<ClientProps>) => void;
  resetValues: () => void;
}

export type ClientType = ClientProps & ClientMethods;

export const clientInitialState: ClientProps = {
  _id: "",
  nuevaDependencia: "",
  nuevaDArea: "",
  nuevaDGeneral: "",
  Correo: "",
  Nombre: "",
  Direccion_General: {},
  direccion_area: {},
  Dependencia: {},
  Telefono: "",
  Extension: "",
  Ubicacion: "",
  isEdit: false,
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
  //estas definiciones y metodos se usan para abrir la ventana de asignar ticket:
  isWindowAsignarOpen: boolean;
  openWindowAsignar: () => void;
  closeWindowAsignar: () => void;
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
  //estas definiciones y metodos se usan para abrir la ventana de crear usuarios:
  isWindowCrearUsuarioOpen: boolean;
  openWindowCrearUsuario: () => void;
  closeWindowCrearUsuario: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de editar usuarios:
  isWindowEditarUsuarioOpen: boolean;
  openWindowEditarUsuario: () => void;
  closeWindowEditarUsuario: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de clientes:
  isWindowClientesOpen: boolean;
  openWindowClientes: () => void;
  closeWindowClientes: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de crear usuarios:
  isWindowCrearClienteOpen: boolean;
  openWindowCrearCliente: () => void;
  closeWindowCrearCliente: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de editar usuarios:
  isWindowEditarClienteOpen: boolean;
  openWindowEditarCliente: () => void;
  closeWindowEditarCliente: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de notas:
  isWindowNotaOpen: boolean;
  openWindowNota: () => void;
  closeWindowNota: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de pendientes:
  isWindowPendientesOpen: boolean;
  openWindowPendientes: () => void;
  closeWindowPendientes: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de rechazar resolucion ticket:
  isWindowRegresarOpen: boolean;
  openWindowRegresar: () => void;
  closeWindowRegresar: () => void;
  //estas definiciones y metodos se usan para abrir la ventana de contacto:
  isWindowContactoOpen: boolean;
  openWindowContacto: () => void;
  closeWindowContacto: () => void;
}
