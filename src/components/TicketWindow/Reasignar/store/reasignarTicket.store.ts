import { create } from "zustand";
import {
  ReasignarTicketType,
  reasignarTicketInitialState,
  ReasignarTicketProps,
} from "../interface/reasignarTicket.interface.ts";
export const useReasignarTicketStore = create<ReasignarTicketType>((set) => ({
  ...reasignarTicketInitialState,
  setReasignarTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  reasignarTicketResetValues: () =>
    set((state) => ({
      ...reasignarTicketInitialState,
    })),
}));
