import { create } from "zustand";
import {
  RegresarTicketProps,
  RegresarTicketType,
  regresarTicketInitialState,
} from "../interface/regresarTicket.interface.ts";
export const useRegresarTicketStore = create<RegresarTicketType>((set) => ({
  ...regresarTicketInitialState,
  setRegresarTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setRegresarTicketFetch: (fields: Partial<RegresarTicketType>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  regresarTicketResetValues: () =>
    set((state) => ({
      ...regresarTicketInitialState,
    })),
  regresarTicketSetFiles: (newFile) => set({ Files: newFile }),
}));
