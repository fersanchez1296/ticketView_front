// Importaciones
import React, { Suspense } from "react";
const LazyNuevoCliente = React.lazy(() => import("./NuevoCliente"));
const LazyBuscarCliente = React.lazy(() => import("./BuscarCliente"));
import MDBox from "components/MDBox/index.js";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
//mui library components
import Button from "@mui/material/Button";
import SaveIcon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.)
import { useCrearMutation } from "api/ticketsApi.js";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
import { useClientesStore } from "zustand/index.ts";
import { useCrearTicketStore, useIsNuevoClienteStore } from "../store/crearTicket.store.ts";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
/* -------------------------------------------------------------------------- */
const Cliente = () => {
  // API Hooks (RTK Query, Axios, etc.)
  const [postGuardar] = useCrearMutation();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const crearTicketStore = useCrearTicketStore();
  const clientesStore = useClientesStore();
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const openSuccessSB = useSnackbarStore((state) => state.openSuccessSB);
  const archivo = useCrearTicketStore((state) => state.Files);
  const setIsNuevoCliente = useIsNuevoClienteStore((state) => state.setIsNuevoCliente);
  const isNuevoClienteResetValues = useIsNuevoClienteStore(
    (state) => state.isNuevoClienteResetValues
  );
  const isNuevoCliente = useIsNuevoClienteStore((state) => state.isNuevoCliente);
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [buscarCliente, setBuscarCliente] = React.useState(false);
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
  const guardarTicket = async () => {
    const formData = new FormData();
    try {
      formData.append("ticketState", JSON.stringify(crearTicketStore));
      if (archivo instanceof File) {
        formData.append("file", archivo);
      } else {
        console.error("El archivo no es válido:", archivo);
      }
      if (isNuevoCliente) {
        formData.append("nuevoCliente", JSON.stringify(clientesStore));
      }
      const result = await postGuardar(formData);
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
        return result;
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        crearTicketStore.crearTicketResetValues();
        clientesStore.resetClientesStore();
        isNuevoClienteResetValues();
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      }
    } catch (error) {
      openErrorSB(
        "Ocurrió un error inesperado al actualizar el ticket.",
        `Status: ${result.error.status}`
      );
    }
  };
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ mt: 5, mb: 5, mx: 5, display: "flex", justifyContent: "center" }}
      >
        <Grid xs={6}></Grid>
        <Grid xs={12}>
          <FormGroup>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <MDBox sx={{ display: "flex" }}>
                <Typography>Buscar Cliente</Typography>
                <Switch
                  checked={buscarCliente}
                  onChange={(e) => {
                    setBuscarCliente(e.target.checked), setIsNuevoCliente(!isNuevoCliente);
                  }}
                />
                <Typography>Nuevo Cliente</Typography>
              </MDBox>
              <Button
                variant="outlined"
                color="primary"
                endIcon={<SaveIcon />}
                sx={{ color: "#7557c1" }}
                onClick={() => guardarTicket()}
              >
                Guardar Ticket
              </Button>
            </Stack>
          </FormGroup>
        </Grid>
        <Grid xs={12}>
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            {!buscarCliente ? <LazyBuscarCliente /> : <LazyNuevoCliente />}
          </Suspense>
        </Grid>
        {/*Botón que envía los daots que se guardan en ticketSatate mediante un post */}
      </Grid>
    </>
  );
};
export default React.memo(Cliente);
