import { create } from "zustand";
import {
  TicketType,
  ticketInitialState,
  TicketProps,
  DialogState,
  UserType,
  userInitialState,
  UserProps,
  ClientType,
  clientInitialState,
  ClientProps,
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
    set(() => ({
      ...ticketInitialState,
    })),
  setFiles: (newFile) => set({ Files: newFile }),
}));

export const useUserStore = create<UserType>((set) => ({
  ...userInitialState,
  setUserFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setUserFetch: (fields: Partial<UserProps>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  resetValues: () =>
    set(() => ({
      ...userInitialState,
    })),
}));

export const useClientesStore = create<ClientType>((set) => ({
  ...clientInitialState,
  setClientesFields: (field: string, value: string) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
  setClientesFetch: (fields: Partial<ClientProps>) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  resetValues: () =>
    set(() => ({
      ...clientInitialState,
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
  //estas definiciones y metodos se usan para abrir la ventana de asignar ticket:
  isWindowAsignarOpen: false,
  openWindowAsignar: () => set({ isWindowAsignarOpen: true }),
  closeWindowAsignar: () => set({ isWindowAsignarOpen: false }),
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
  //estas definiciones y metodos se usan para abrir la ventana de crear usuarios:
  isWindowCrearUsuarioOpen: false,
  openWindowCrearUsuario: () => set({ isWindowCrearUsuarioOpen: true }),
  closeWindowCrearUsuario: () => set({ isWindowCrearUsuarioOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de editar usuarios:
  isWindowEditarUsuarioOpen: false,
  openWindowEditarUsuario: () => set({ isWindowEditarUsuarioOpen: true }),
  closeWindowEditarUsuario: () => set({ isWindowEditarUsuarioOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de crear usuarios:
  isWindowCrearClienteOpen: false,
  openWindowCrearCliente: () => set({ isWindowCrearClienteOpen: true }),
  closeWindowCrearCliente: () => set({ isWindowCrearClienteOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de editar usuarios:
  isWindowEditarClienteOpen: false,
  openWindowEditarCliete: () => set({ isWindowEditarClienteOpen: true }),
  closeWindowEditarCliente: () => set({ isWindowEditarClienteOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de clientes:
  isWindowClientesOpen: false,
  openWindowClientes: () => set({ isWindowClientesOpen: true }),
  closeWindowClientes: () => set({ isWindowClientesOpen: false }),
  isWindowNotaOpen: false,
  openWindowNota: () => set({ isWindowNotaOpen: true }),
  closeWindowNota: () => set({ isWindowNotaOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de pendientes:
  isWindowPendientesOpen: false,
  openWindowPendientes: () => set({ isWindowPendientesOpen: true }),
  closeWindowPendientes: () => set({ isWindowPendientesOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de regresar el ticket al usuario:
  isWindowRegresarOpen: false,
  openWindowRegresar: () => set({ isWindowRegresarOpen: true }),
  closeWindowRegresar: () => set({ isWindowRegresarOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de regresar el ticket al usuario:
  isWindowContactoOpen: false,
  openWindowContacto: () => set({ isWindowContactoOpen: true }),
  closeWindowContacto: () => set({ isWindowContactoOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de ayuda:
  isHelpWindowOpen: false,
  openWindowHelp: () => set({ isHelpWindowOpen: true }),
  closeWindowHelp: () => set({ isHelpWindowOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de ayuda:
  isMesaServicioOpen: false,
  openWindowMesaServicio: () => set({ isMesaServicioOpen: true }),
  closeWindowMesaServicio: () => set({ isMesaServicioOpen: false }),
  //estas definiciones y metodos se usan para abrir la ventana de ayuda:
  isWindowRPendiente: false,
  openWindowRPendiente: () => set({ isWindowRPendiente: true }),
  closeWindowRPendiente: () => set({ isWindowRPendiente: false }),
  //estas definiciones y metodos se usan para regresar el ticket de usuario a su moderador:
  isRegresaraModeradorOpen: false,
  openWindowRegresaraModerador: () => set({ isRegresaraModeradorOpen: true }),
  closeWindowRegresaraModerador: () => set({ isRegresaraModeradorOpen: false }),
}));
