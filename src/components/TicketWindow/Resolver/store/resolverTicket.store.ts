import { create } from "zustand";
import {
  ResolverTicketType,
  resolverTicketInitialState,
} from "../interface/resolverTicket.interface.ts";
export const useResolverTicketStore = create<ResolverTicketType>((set) => ({
  ...resolverTicketInitialState,
  setResolverTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  resolverTicketSetFiles: (newFile) => set({ Files: newFile }),
  resolverTicketResetValues: () =>
    set((state) => ({
      ...resolverTicketInitialState,
    })),
}));
