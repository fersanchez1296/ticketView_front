export interface AsignarTicketProps {
  Files?: File | null;
  Prioridad: String;
  Fecha_limite_respuesta_SLA: Date | String;
  Fecha_limite_resolucion_SLA: Date | String;
  Asignado_a: string;
  Area_asignado: string;
  Correo: string;
  Nombre: string;
  standby: boolean;
}

export interface AsignarTicketMethods {
  setAsignarTicketFields: (field: string, value: string | number) => void;
  asignarTicketResetValues: () => void;
  asignarTicketSetFiles: (newFile: File | null) => void;
}

export type AsignarTicketType = AsignarTicketProps & AsignarTicketMethods;

export const asignarTicketInitialState: AsignarTicketProps = {
  Files: null,
  Prioridad: "",
  Fecha_limite_respuesta_SLA: "",
  Fecha_limite_resolucion_SLA: "",
  Asignado_a: "",
  Area_asignado: "",
  Correo: "",
  Nombre: "",
  standby: false,
};
