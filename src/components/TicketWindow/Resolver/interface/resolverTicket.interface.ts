export interface ResolverTicketProps {
  Files?: File | null;
  Respuesta_cierre_reasignado: String;
  Area_reasignado_a: String;
  vistoBueno: Boolean;
}

export interface ResolverTicketMethods {
  setResolverTicketFields: (field: string, value: string | number) => void;
  resolverTicketSetFiles: (newFile: File | null) => void;
  resolverTicketResetValues: () => void;
}

export type ResolverTicketType = ResolverTicketProps & ResolverTicketMethods;

export const resolverTicketInitialState: ResolverTicketProps = {
  Files: null,
  Respuesta_cierre_reasignado: "",
  Area_reasignado_a: "",
  vistoBueno: false,
};
