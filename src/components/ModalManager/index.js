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
  } = useDialogStore();

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
          //onSave={}
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
    </>
  );
};

export default ModalManager;
