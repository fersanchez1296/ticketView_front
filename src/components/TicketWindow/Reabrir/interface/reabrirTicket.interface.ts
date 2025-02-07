export interface ReabrirTicketProps {
  Files?: File | null;
  original: boolean;
  Asignado_a: string;
  Area_asignado: string;
  Reasignado_a: string;
  Area_reasignado_a: string;
  Descripcion_reabierto: string;
  Nombre_cliente: string;
}

export interface ReabrirTicketMethods {
  setReabrirTicketFields: (field: string, value: string | number) => void;
  setReabrirTicketFetch: (fields: Partial<ReabrirTicketProps>) => void;
  reabrirTicketResetValues: () => void;
}

export type ReabrirTicketType = ReabrirTicketProps & ReabrirTicketMethods;

export const reabrirTicketInitialState: ReabrirTicketProps = {
  Files: null,
  original: false,
  Asignado_a: "",
  Area_asignado: "",
  Reasignado_a: "",
  Area_reasignado_a: "",
  Descripcion_reabierto: "",
  Nombre_cliente: "",
};
