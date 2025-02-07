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
import Asignar from "components/TicketWindow/Asignar";
//reabrir store
import { useReabrirTicketStore } from "components/TicketWindow/Reabrir/store/reabrirTicket.store.ts";

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
  } = useDialogStore();

  const reabrirTicketStore = useReabrirTicketStore();
  //const [reabrir] = usePutReabrir();
  return (
    <>
      <SuccessSB />
      <ErrorSB />
      <View />

      {isWindowEditOpen && <Edit />}

      {isWindowReabrirOpen && (
        <VentanaAcciones
          title="Reabrir Ticket"
          isOpen={isWindowReabrirOpen}
          onClose={closeWindowReabrir}
          //onSave={reabrir({useTicketStore})}
          //resetStore={}
        >
          <Reabrir />
        </VentanaAcciones>
      )}

      {isWindowCloseTicketOpen && <Cerrar />}
      {isWindowReasignarOpen && <Reasignar />}
      {isWindowResolverOpen && <Resolver />}
      {isWindowAceptarOpen && <Aceptar />}
      {isWindowRechazarOpen && <Rechazar />}
      {isWindowAsignarOpen && <Asignar />}
    </>
  );
};

export default ModalManager;
