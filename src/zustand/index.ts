import { create } from "zustand";
import {
  TicketType,
  ticketInitialState,
  DialogState,
  TicketProps,
  UserType,
  userInitialState,
  UserProps,
} from "interface/index.ts";
export const useTicketStore = create<TicketType>((set) => ({
  ...ticketInitialState,
  setTicketFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setTicketFetch: (fields: Partial<TicketProps>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  resetValues: () =>
    set((state) => ({
      ...ticketInitialState,
      setField: state.setField,
      resetValues: state.resetValues,
    })),
}));

export const useUserStore = create<UserType>((set) => ({
  ...userInitialState,
  setUserFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setUserFetch: (fields: Partial<TicketProps>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  resetUserValues: () =>
    set((state) => ({
      ...userInitialState,
      setField: state.setField,
      resetValues: state.resetValues,
    })),
}));

export const useDialogStore = create<DialogState>((set) => ({
  //estas definiciones y metodos se usan para abrir la ventana de visualización:
  isWindowOpen: false,
  openWindow: () => set({ isWindowOpen: true }),
  closeWindow: () => set({ isWindowOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de edición:
  isWindowEditOpen: false,
  openWindowEdit: () => set({ isWindowEditOpen: true }),
  closeWindowEdit: () => set({ isWindowEditOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de cerrar ticket:
  isWindowCloseTicketOpen: false,
  openWindowCloseTicket: () => set({ isWindowCloseTicketOpen: true }),
  closeWindowCloseTicket: () => set({ isWindowCloseTicketOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de reasignar ticket:
  isWindowReasignarOpen: false,
  openWindowReasignar: () => set({ isWindowReasignarOpen: true }),
  closeWindowReasignar: () => set({ isWindowReasignarOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de resolver ticket:
  isWindowResolverOpen: false,
  openWindowResolver: () => set({ isWindowResolverOpen: true }),
  closeWindowResolver: () => set({ isWindowResolverOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de reabrir ticket:
  isWindowReabrirOpen: false,
  openWindowReabrir: () => set({ isWindowReabrirOpen: true }),
  closeWindowReabrir: () => set({ isWindowReabrirOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de aceptar resolucion ticket:
  isWindowAceptarOpen: false,
  openWindowAceptar: () => set({ isWindowAceptarOpen: true }),
  closeWindowAceptar: () => set({ isWindowAceptarOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de rechazar resolucion ticket:
  isWindowRechazarOpen: false,
  openWindowRechazar: () => set({ isWindowRechazarOpen: true }),
  closeWindowRechazar: () => set({ isWindowRechazarOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de usuarios:
  isWindowUsuariosOpen: false,
  openWindowUsuarios: () => set({ isWindowUsuariosOpen: true }),
  closeWindowUsuarios: () => set({ isWindowUsuariosOpen: false }),
}));
