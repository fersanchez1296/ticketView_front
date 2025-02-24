import { create } from "zustand";
import {
  PendienteTicketProps,
  PendienteTicketType,
  pendienteTicketInitialState,
} from "../interface/pendienteTicket.interface.ts";
export const usePendienteTicketStore = create<PendienteTicketType>((set) => ({
  ...pendienteTicketInitialState,
  setPendienteTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setPendienteTicketFetch: (fields: Partial<PendienteTicketProps>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  pendienteTicketResetValues: () =>
    set((state) => ({
      ...pendienteTicketInitialState,
    })),
}));
