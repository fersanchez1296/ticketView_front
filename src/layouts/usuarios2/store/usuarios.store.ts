import { create } from "zustand";
import { UsuarioType, usuarioInitialState, UsuarioProps } from "../interface/usuarios.interface.ts";
export const useUserStore = create<UsuarioType>((set) => ({
  ...usuarioInitialState,
  setUsuarioFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setUsuariosFetch: (fields: Partial<UsuarioProps>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  usuarioResetValues: () =>
    set((state) => ({
      ...usuarioInitialState,
    })),
}));
