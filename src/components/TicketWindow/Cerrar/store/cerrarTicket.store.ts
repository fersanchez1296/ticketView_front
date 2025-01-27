import { create } from "zustand";
import { CerrarTicketType, cerrarTicketInitialState } from "../interface/cerrarTicket.interface.ts";
export const useCerrarTicketStore = create<CerrarTicketType>((set) => ({
  ...cerrarTicketInitialState,
  setCerrarTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  cerrarTicketSetFiles: (newFile) => set({ Files: newFile }),
  cerrarTicketResetValues: () =>
    set((state) => ({
      ...cerrarTicketInitialState,
    })),
}));
