// Importaciones
import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SuccessSB from "components/Snackbar/success/index";
import ErrorSB from "components/Snackbar/error/index";
import Form from "./Form";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
//mui library component
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.)
import { useSelectsCrearTicketQuery } from "api/ticketsApi";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
import { useCrearTicketStore } from "./store/crearTicket.store.ts";
import Progress from "components/Progress";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
/* -------------------------------------------------------------------------- */
const Edit = () => {
  // API Hooks (RTK Query, Axios, etc.)
  const { data, isLoading } = useSelectsCrearTicketQuery();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const resetValues = useCrearTicketStore((state) => state.crearTicketResetValues);
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  React.useEffect(() => {
    resetValues();
  }, []);
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  if (isLoading) return <Progress open={true} />;
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <React.Fragment>
      <DashboardLayout>
        <Form data={data} />
      </DashboardLayout>
    </React.Fragment>
  );
};

export default React.memo(Edit);
