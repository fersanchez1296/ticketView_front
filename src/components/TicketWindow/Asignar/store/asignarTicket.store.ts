import { create } from "zustand";
import {
  AsignarTicketType,
  asignarTicketInitialState,
  AsignarTicketProps,
} from "../interface/asignarTicket.interface.ts";
export const useAsignarTicketStore = create<AsignarTicketType>((set) => ({
  ...asignarTicketInitialState,
  setAsignarTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  asignarTicketSetFiles: (newFile) => set({ Files: newFile }),
  asignarTicketResetValues: () =>
    set((state) => ({
      ...asignarTicketInitialState,
    })),
}));
