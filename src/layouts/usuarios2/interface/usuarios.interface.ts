export interface UsuarioProps {
  _id: string;
  Nombre: String;
  Correo: String;
  Rol: String;
  Direccion_area: String;
  isEdit: Boolean;
}

export interface UsuarioMerhods {
  setUsuarioFields: (field: string, value: string | number) => void;
  setUsuariosFetch: (fields: Partial<UsuarioProps>) => void;
  usuarioResetValues: () => void;
}

export type UsuarioType = UsuarioProps & UsuarioMerhods;

export const usuarioInitialState: UsuarioProps = {
  _id: "",
  Nombre: "",
  Correo: "",
  Rol: "",
  Direccion_area: "",
  isEdit: false,
};
