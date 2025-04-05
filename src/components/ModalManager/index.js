import { useDialogStore } from "zustand/index.ts";
//snackbar
import SuccessSB from "components/Snackbar/success/index";
import ErrorSB from "components/Snackbar/error/index";
import View from "components/TicketWindow/View";
import Edit from "components/TicketWindow/Edit";
import VentanaAcciones from "components/VentanaAcciones";
import Reabrir from "components/TicketWindow/Reabrir";
import Cerrar from "components/TicketWindow/Cerrar";
import Reasignar from "components/TicketWindow/Reasignar";
import Resolver from "components/TicketWindow/Resolver";
import Aceptar from "components/TicketWindow/Aceptar";
import Rechazar from "components/TicketWindow/Rechazar";
import Asignar from "components/TicketWindow/Asignar_";
import Nota from "components/TicketWindow/Nota";
import PendingReason from "components/TicketWindow/PendingReason";
import VerUsuarios from "components/TicketWindow/Usuarios/Ver";
import EditarUsuario from "components/TicketWindow/Usuarios/Editar";
import CrearUsuario from "components/TicketWindow/Usuarios/Crear";
import VerCliente from "components/TicketWindow/Clientes/Ver";
import EditarCliente from "components/TicketWindow/Clientes/Editar";
import CrearCliente from "components/TicketWindow/Clientes/Crear";
import { useUserStore, useTicketStore, useClientesStore } from "zustand/index.ts";
import Pendientes from "components/TicketWindow/Pendientes";
import Regresar from "components/TicketWindow/Regresar";
import Contacto from "components/TicketWindow/Contacto";
import Mesa from "components/TicketWindow/Mesa/index";
import Moderador from "components/TicketWindow/R_a_Moderador/index";
//reabrir store
import {
  useReabrirMutation,
  useResolverMutation,
  useCerrarMutation,
  useAceptarResolucionMutation,
  useRechazarResolucionMutation,
  useNotaMutation,
  useAsignarMutation,
  useEditarMutation,
  usePutRegresarTicketMutation,
  usePutPendienteMutation,
  useContactoClienteMutation,
  useRetornoMesaMutation,
  usePendingReasonMutation,
  useRetornoModeradorMutation,
} from "api/ticketsApi";

import { useUpdateUsuarioByIdMutation, useCrearUsuarioMutation } from "api/usuariosApi";
import { useCrearClienteMutation, useUpdateClienteByIdMutation } from "api/clientesApi";
const ModalManager = () => {
  const {
    isWindowEditOpen,
    isWindowReabrirOpen,
    closeWindowReabrir,
    isWindowCloseTicketOpen,
    isWindowReasignarOpen,
    isWindowResolverOpen,
    isWindowAceptarOpen,
    isWindowRechazarOpen,
    isWindowAsignarOpen,
    isWindowNotaOpen,
    closeWindowResolver,
    closeWindowCloseTicket,
    closeWindowAceptar,
    closeWindowRechazar,
    closeWindowNota,
    closeWindowAsignar,
    isWindowUsuariosOpen,
    closeWindowUsuarios,
    isWindowEditarUsuarioOpen,
    closeWindowEditarUsuario,
    isWindowCrearUsuarioOpen,
    closeWindowCrearUsuario,
    isWindowPendientesOpen,
    closeWindowPendientes,
    isWindowRegresarOpen,
    closeWindowEdit,
    closeWindowRegresar,
    isWindowClientesOpen,
    closeWindowClientes,
    isWindowEditarClienteOpen,
    closeWindowEditarCliente,
    isWindowCrearClienteOpen,
    closeWindowCrearCliente,
    isWindowContactoOpen,
    closeWindowContacto,
    isWindowOpen,
    closeWindow,
    isMesaServicioOpen,
    closeWindowMesaServicio,
    isWindowRPendiente,
    closeWindowRPendiente,
    isRegresaraModeradorOpen,
    closeWindowRegresaraModerador,
  } = useDialogStore();
  const usuariosStore = useUserStore();
  const ticketStore = useTicketStore();
  const clientStore = useClientesStore();

  const [reabrir] = useReabrirMutation();
  const [resolver] = useResolverMutation();
  const [cerrar] = useCerrarMutation();
  const [editar] = useEditarMutation();
  const [aceptar] = useAceptarResolucionMutation();
  const [rechazar] = useRechazarResolucionMutation();
  const [regresar] = usePutRegresarTicketMutation();
  const [nota] = useNotaMutation();
  const [pendingReason] = usePendingReasonMutation();
  const [asignar] = useAsignarMutation();
  const [editarUsuario] = useUpdateUsuarioByIdMutation();
  const [crearUsuario] = useCrearUsuarioMutation();
  const [crearCliente] = useCrearClienteMutation();
  const [editarCliente] = useUpdateClienteByIdMutation();
  const [pendiente] = usePutPendienteMutation();
  const [contactoCliente] = useContactoClienteMutation();
  const [retornoMesa] = useRetornoMesaMutation();
  const [retornoModerador] = useRetornoModeradorMutation();
  return (
    <>
      {isWindowReabrirOpen && (
        <VentanaAcciones
          title="Reabrir Ticket"
          isOpen={isWindowReabrirOpen}
          onClose={closeWindowReabrir}
          onSave={reabrir}
          store={ticketStore}
          helpKey={"reabrirTicket"}
        >
          <Reabrir />
        </VentanaAcciones>
      )}
      {isWindowResolverOpen && (
        <VentanaAcciones
          title="Resolver Ticket"
          isOpen={isWindowResolverOpen}
          onClose={closeWindowResolver}
          onSave={resolver}
          store={ticketStore}
          helpKey={"resolverTicket"}
        >
          <Resolver />
        </VentanaAcciones>
      )}
      {isWindowAceptarOpen && (
        <VentanaAcciones
          title="Aceptar Resolución"
          isOpen={isWindowAceptarOpen}
          onClose={closeWindowAceptar}
          onSave={aceptar}
          store={ticketStore}
          helpKey={"aceptarSolucion"}
        >
          <Aceptar />
        </VentanaAcciones>
      )}
      {isWindowRechazarOpen && (
        <VentanaAcciones
          title="Rechazar Resolución"
          isOpen={isWindowRechazarOpen}
          onClose={closeWindowRechazar}
          onSave={rechazar}
          store={ticketStore}
          helpKey={"rechazarSolucion"}
        >
          <Rechazar />
        </VentanaAcciones>
      )}
      {isWindowCloseTicketOpen && (
        <VentanaAcciones
          title="Cerrar Ticket"
          isOpen={isWindowCloseTicketOpen}
          onClose={closeWindowCloseTicket}
          onSave={cerrar}
          store={ticketStore}
          helpKey={"cerrarTicket"}
        >
          <Cerrar />
        </VentanaAcciones>
      )}
      {isWindowNotaOpen && (
        <VentanaAcciones
          title="Notas"
          isOpen={isWindowNotaOpen}
          onClose={closeWindowNota}
          onSave={nota}
          store={ticketStore}
          helpKey={"notas"}
        >
          <Nota />
        </VentanaAcciones>
      )}
      {isWindowRPendiente && (
        <VentanaAcciones
          title="Descripción pendiente"
          isOpen={isWindowRPendiente}
          onClose={closeWindowRPendiente}
          onSave={pendingReason}
          store={ticketStore}
          helpKey={"Pending_Reason"}
        >
          <PendingReason />
        </VentanaAcciones>
      )}
      {isWindowAsignarOpen && (
        <VentanaAcciones
          title="Asignar ticket a moderador"
          isOpen={isWindowAsignarOpen}
          onClose={closeWindowAsignar}
          onSave={asignar}
          store={ticketStore}
          helpKey={"asignarTicket"}
        >
          <Asignar />
        </VentanaAcciones>
      )}
      {isWindowReasignarOpen && <Reasignar />}
      {isWindowUsuariosOpen && (
        <VentanaAcciones
          title="Usuario"
          isOpen={isWindowUsuariosOpen}
          onClose={closeWindowUsuarios}
          store={usuariosStore}
          helpKey={"verUsuario"}
        >
          <VerUsuarios />
        </VentanaAcciones>
      )}
      {isWindowEditarUsuarioOpen && (
        <VentanaAcciones
          title="Editar Usuario"
          isOpen={isWindowEditarUsuarioOpen}
          onClose={closeWindowEditarUsuario}
          onSave={editarUsuario}
          store={usuariosStore}
          helpKey={"editarUsuario"}
        >
          <EditarUsuario />
        </VentanaAcciones>
      )}
      {isWindowCrearUsuarioOpen && (
        <VentanaAcciones
          title="Crear Usuario"
          isOpen={isWindowCrearUsuarioOpen}
          onClose={closeWindowCrearUsuario}
          onSave={crearUsuario}
          store={usuariosStore}
          helpKey={"crearUsuario"}
        >
          <CrearUsuario />
        </VentanaAcciones>
      )}
      {isWindowClientesOpen && (
        <VentanaAcciones
          title="Cliente"
          isOpen={isWindowClientesOpen}
          onClose={closeWindowClientes}
          store={clientStore}
          helpKey={"verCliente"}
        >
          <VerCliente />
        </VentanaAcciones>
      )}
      {isWindowEditarClienteOpen && (
        <VentanaAcciones
          title="Editar Cliente"
          isOpen={isWindowEditarClienteOpen}
          onClose={closeWindowEditarCliente}
          onSave={editarCliente}
          store={clientStore}
          helpKey={"editarCliente"}
        >
          <EditarCliente />
        </VentanaAcciones>
      )}
      {isWindowCrearClienteOpen && (
        <VentanaAcciones
          title="Registrar Cliente"
          isOpen={isWindowCrearClienteOpen}
          onClose={closeWindowCrearCliente}
          onSave={crearCliente}
          store={clientStore}
          helpKey={"registrarCliente"}
        >
          <CrearCliente />
        </VentanaAcciones>
      )}
      {isWindowEditOpen && (
        <VentanaAcciones
          title="Editar Ticket"
          isOpen={isWindowEditOpen}
          onClose={closeWindowEdit}
          onSave={editar}
          store={ticketStore}
          helpKey={"editarTicket"}
        >
          <Edit />
        </VentanaAcciones>
      )}
      {isWindowPendientesOpen && (
        <VentanaAcciones
          title="Marcar ticket como pendiente"
          isOpen={isWindowPendientesOpen}
          onClose={closeWindowPendientes}
          onSave={pendiente}
          store={ticketStore}
          helpKey={"ticketPendiente"}
        >
          <Pendientes />
        </VentanaAcciones>
      )}
      {isWindowRegresarOpen && (
        <VentanaAcciones
          title="Regresar ticket"
          isOpen={isWindowRegresarOpen}
          onClose={closeWindowRegresar}
          onSave={regresar}
          store={ticketStore}
          helpKey={"regresarTiket"}
        >
          <Regresar />
        </VentanaAcciones>
      )}
      {isWindowContactoOpen && (
        <VentanaAcciones
          title="Contactar Cliente"
          isOpen={isWindowContactoOpen}
          onClose={closeWindowContacto}
          onSave={contactoCliente}
          store={ticketStore}
          helpKey={"contactoCliente"}
        >
          <Contacto />
        </VentanaAcciones>
      )}
      {isWindowOpen && (
        <VentanaAcciones isOpen={isWindowOpen} onClose={closeWindow} store={ticketStore}>
          <View />
        </VentanaAcciones>
      )}
      {isMesaServicioOpen && (
        <VentanaAcciones
          title="Regresar a mesa de servicio"
          isOpen={isMesaServicioOpen}
          onClose={closeWindowMesaServicio}
          onSave={retornoMesa}
          store={ticketStore}
        >
          <Mesa />
        </VentanaAcciones>
      )}
      {isRegresaraModeradorOpen && (
        <VentanaAcciones
          title="Regresar a moderador"
          isOpen={isRegresaraModeradorOpen}
          onClose={closeWindowRegresaraModerador}
          onSave={retornoModerador}
          store={ticketStore}
        >
          <Mesa />
        </VentanaAcciones>
      )}
      <SuccessSB />
      <ErrorSB />
    </>
  );
};

export default ModalManager;
