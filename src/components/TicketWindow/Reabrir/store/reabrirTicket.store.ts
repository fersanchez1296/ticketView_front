import { create } from "zustand";
import {
  ReabrirTicketType,
  reabrirTicketInitialState,
  ReabrirTicketProps,
} from "../interface/reabrirTicket.interface.ts";
export const useReabrirTicketStore = create<ReabrirTicketType>((set) => ({
  ...reabrirTicketInitialState,
  setReabrirTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setReabrirTicketFetch: (fields: Partial<ReabrirTicketProps>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  reabrirTicketResetValues: () =>
    set((state) => ({
      ...reabrirTicketInitialState,
    })),
}));
