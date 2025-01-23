export interface ReasignarTicketProps {
  Prioridad: String;
  Fecha_limite_respuesta_SLA: Date | String;
  Fecha_limite_resolucion_SLA: Date | String;
  Reasignado_a: string;
  Area_reasignado_a: string;
  Correo: string;
  Nombre: string;
  vistoBueno: boolean;
}

export interface ReasignarTicketMethods {
  setReasignarTicketFields: (field: string, value: string | number) => void;
  reasignarTicketResetValues: () => void;
}

export type ReasignarTicketType = ReasignarTicketProps & ReasignarTicketMethods;

export const reasignarTicketInitialState: ReasignarTicketProps = {
  Prioridad: "",
  Fecha_limite_respuesta_SLA: "",
  Fecha_limite_resolucion_SLA: "",
  Reasignado_a: "",
  Area_reasignado_a: "",
  Correo: "",
  Nombre: "",
  vistoBueno: false,
};
