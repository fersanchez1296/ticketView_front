export interface CerrarTicketProps {
  Files?: File | null;
  Descripcion_cierre: String;
  Causa: String;
  Numero_Oficio: string;
}

export interface CerrarTicketMethods {
  setCerrarTicketFields: (field: string, value: string | number) => void;
  cerrarTicketSetFiles: (newFile: File | null) => void;
  cerrarTicketResetValues: () => void;
}

export type CerrarTicketType = CerrarTicketProps & CerrarTicketMethods;

export const cerrarTicketInitialState: CerrarTicketProps = {
  Files: null,
  Descripcion_cierre: "",
  Causa: "",
  Numero_Oficio: "",
};
