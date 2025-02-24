export interface PendienteTicketProps {
  Descripcion_pendiente: String;
}

export interface PendienteTicketMethods {
  setPendienteTicketFields: (field: string, value: string | number) => void;
  setPendienteTicketFetch: (fields: Partial<PendienteTicketProps>) => void;
  pendienteTicketResetValues: () => void;
}

export type PendienteTicketType = PendienteTicketProps & PendienteTicketMethods;

export const pendienteTicketInitialState: PendienteTicketProps = {
  Descripcion_pendiente: "",
};
