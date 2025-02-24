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
import { useUserStore, useTicketStore } from "zustand/index.ts";
//reabrir store
import {
  useReabrirMutation,
  useResolverMutation,
  useCerrarMutation,
  useAceptarResolucionMutation,
  useRechazarResolucionMutation,
  useNotaMutation,
  useAsignarMutation,
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
  } = useDialogStore();
  const usuariosStore = useUserStore();
  const ticketStore = useTicketStore();

  const [reabrir] = useReabrirMutation();
  const [resolver] = useResolverMutation();
  const [cerrar] = useCerrarMutation();
  const [aceptar] = useAceptarResolucionMutation();
  const [rechazar] = useRechazarResolucionMutation();
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
      {isWindowOpen && <View />}
      {isWindowEditOpen && <Edit />}
      <SuccessSB />
      <ErrorSB />
    </>
  );
};

export default ModalManager;
