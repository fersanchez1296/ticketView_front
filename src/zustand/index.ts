import { create } from "zustand";
import { TicketType, ticketInitialState, DialogState } from "interface/index.ts";
export const useTicketStore = create<TicketType>((set) => ({
  ...ticketInitialState,
  setTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  resetValues: () =>
    set((state) => ({
      ...ticketInitialState,
      setField: state.setField,
      resetValues: state.resetValues,
    })),
}));

export const useDialogStore = create<DialogState>((set) => ({
  isWindowOpen: false,
  openWindow: () => set({ isWindowOpen: true }),
  closeWindow: () => set({ isWindowOpen: false }),
}));
