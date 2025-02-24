export interface RegresarTicketProps {
  Descripcion_Rcliente: String;
  Files?: File | null;
}

export interface RegresarTicketMethods {
  setRegresarTicketFields: (field: string, value: string | number) => void;
  setRegresarTicketFetch: (fields: Partial<RegresarTicketProps>) => void;
  regresarTicketResetValues: () => void;
  regresarTicketSetFiles: (newFile: File | null) => void;
}

export type RegresarTicketType = RegresarTicketProps & RegresarTicketMethods;

export const regresarTicketInitialState: RegresarTicketProps = {
  Descripcion_Rcliente: "",
  Files: null,
};
