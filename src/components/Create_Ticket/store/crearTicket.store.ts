import { create } from "zustand";
import {
  CrearTicketType,
  crearTicketInitialState,
  CrearTicketProps,
} from "../interface/crearTicket.interface.ts";
export const useCrearTicketStore = create<CrearTicketType>((set) => ({
  ...crearTicketInitialState,
  setCrearTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setCrearTicketFetch: (fields: Partial<CrearTicketProps>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  crearTicketResetValues: () =>
    set((state) => ({
      ...crearTicketInitialState,
    })),
  crearTicketSetFiles: (newFile) => set({ Files: newFile }),
}));
