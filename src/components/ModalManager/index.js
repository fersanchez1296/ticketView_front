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
import VerUsuarios from "components/TicketWindow/Usuarios/Ver";
import EditarUsuario from "components/TicketWindow/Usuarios/Editar";
import CrearUsuario from "components/TicketWindow/Usuarios/Crear";
import VerCliente from "components/TicketWindow/Clientes/Ver";
import EditarCliente from "components/TicketWindow/Clientes/Editar";
import CrearCliente from "components/TicketWindow/Clientes/Crear";
import { useUserStore, useTicketStore, useClientesStore } from "zustand/index.ts";
import Pendientes from "components/TicketWindow/Pendientes";
import Regresar from "components/TicketWindow/Regresar";
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
} from "api/ticketsApi";

import { useUpdateUsuarioByIdMutation, useCrearUsuarioMutation } from "api/usuariosApi";

const ModalManager = () => {
  const {
    isWindowOpen,
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
  const [asignar] = useAsignarMutation();
  const [editarUsuario] = useUpdateUsuarioByIdMutation();
  const [crearUsuario] = useCrearUsuarioMutation();
  return (
    <>
      {isWindowReabrirOpen && (
        <VentanaAcciones
          title="Reabrir Ticket"
          isOpen={isWindowReabrirOpen}
          onClose={closeWindowReabrir}
          onSave={reabrir}
          store={ticketStore}
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
        >
          <Nota />
        </VentanaAcciones>
      )}
      {isWindowAsignarOpen && (
        <VentanaAcciones
          title="Asignar ticket a moderador"
          isOpen={isWindowAsignarOpen}
          onClose={closeWindowAsignar}
          onSave={asignar}
          store={ticketStore}
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
          // onSave={asignar}
          store={usuariosStore}
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
        >
          <VerCliente />
        </VentanaAcciones>
      )}
      {isWindowEditarClienteOpen && (
        <VentanaAcciones
          title="Editar Cliente"
          isOpen={isWindowEditarClienteOpen}
          onClose={closeWindowEditarCliente}
          store={clientStore}
        >
          <EditarCliente />
        </VentanaAcciones>
      )}
      {isWindowCrearClienteOpen && (
        <VentanaAcciones
          title="Registrar Cliente"
          isOpen={isWindowCrearClienteOpen}
          onClose={closeWindowCrearCliente}
          store={clientStore}
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
        >
          <Edit />
        </VentanaAcciones>
      )}
      {isWindowPendientesOpen && (
        <VentanaAcciones
          title="Marcar ticket como pendiente"
          isOpen={isWindowPendientesOpen}
          onClose={closeWindowPendientes}
          //onSave={pendiente}
          store={ticketStore}
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
        >
          <Regresar />
        </VentanaAcciones>
      )}
      {isWindowOpen && <View />}
      <SuccessSB />
      <ErrorSB />
    </>
  );
};

export default ModalManager;
