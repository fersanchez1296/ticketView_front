export interface CrearTicketProps {
  Tipo_incidencia: Object;
  Estado: Object;
  Area_asignado: Object | String;
  Asignado_a: Object;
  Categoria: Object;
  Servicio: Object;
  Subcategoria: Object;
  Descripcion: string;
  Prioridad: Object;
  Incidencia_grave: string;
  Fecha_limite_respuesta_SLA?: Date | String;
  NumeroRec_Oficio?: string;
  PendingReason?: string;
  Cliente: string;
  Files?: File | null;
  standby: boolean;
}

export interface CrearTicketMethods {
  setCrearTicketFields: (field: string, value: string | number) => void;
  setCrearTicketFetch: (fields: Partial<CrearTicketProps>) => void;
  crearTicketResetValues: () => void;
  crearTicketSetFiles: (newFile: File | null) => void;
}

export type CrearTicketType = CrearTicketProps & CrearTicketMethods;

export const crearTicketInitialState: CrearTicketProps = {
  Tipo_incidencia: {},
  Estado: {},
  Area_asignado: "",
  Asignado_a: "",
  Categoria: {},
  Servicio: {},
  Subcategoria: {},
  Cliente: "",
  Descripcion: "",
  Prioridad: {},
  Incidencia_grave: "",
  Fecha_limite_respuesta_SLA: "",
  NumeroRec_Oficio: "",
  PendingReason: "",
  Files: null,
  standby: false,
};

export interface isNuevoClienteProps {
  isNuevoCliente: boolean;
}

export interface isNuevoClienteMethods {
  setIsNuevoCliente: (value: boolean) => void;
  isNuevoClienteResetValues: () => void;
}

export type isNuevoClienteType = isNuevoClienteProps & isNuevoClienteMethods;

export const isNuevoClienteInitialState: isNuevoClienteProps = {
  isNuevoCliente: false,
};
