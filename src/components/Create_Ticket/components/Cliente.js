import React, { Suspense, lazy, startTransition } from "react";
//mui library components
import Button from "@mui/material/Button";
import SaveIcon from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
//store
import { useClientesStore } from "zustand/index.ts";
import { useCrearTicketStore, useIsNuevoClienteStore } from "../store/crearTicket.store.ts";
//proptypes
import PropTypes from "prop-types";
//api hook
import { useGuardarMutation, usePostClienteMutation } from "api/index";
const LazyNuevoCliente = React.lazy(() => import("./NuevoCliente"));
const LazyBuscarCliente = React.lazy(() => import("./BuscarCliente"));

//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const Cliente = ({ disable_input, data }) => {
  const crearTicketStore = useCrearTicketStore();
  const clientesStore = useClientesStore();
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const openSuccessSB = useSnackbarStore((state) => state.openSuccessSB);
  const archivo = useCrearTicketStore((state) => state.Files);
  const [postGuardar] = useGuardarMutation();
  const [buscarCliente, setBuscarCliente] = React.useState(false);
  const setIsNuevoCliente = useIsNuevoClienteStore((state) => state.setIsNuevoCliente);
  const isNuevoClienteResetValues = useIsNuevoClienteStore(
    (state) => state.isNuevoClienteResetValues
  );
  const isNuevoCliente = useIsNuevoClienteStore((state) => state.isNuevoCliente);

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
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ mt: 5, mb: 5, mx: 5, display: "flex", justifyContent: "center" }}
      >
        <Grid xs={12}>
          <FormGroup>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography>Buscar Cliente</Typography>
              <Switch
                checked={buscarCliente}
                onChange={(e) => {
                  setBuscarCliente(e.target.checked), setIsNuevoCliente(!isNuevoCliente);
                }}
              />
              <Typography>Nuevo Cliente</Typography>
            </Stack>
          </FormGroup>
        </Grid>
        <Grid xs={12}>
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            {!buscarCliente ? <LazyBuscarCliente data={data} /> : <LazyNuevoCliente />}
          </Suspense>
        </Grid>
        {/*Botón que envía los daots que se guardan en ticketSatate mediante un post */}
        <Grid xs={12}>
          <Button
            variant="contained"
            color="success"
            endIcon={<SaveIcon />}
            sx={{ border: "1.5px solid green", width: "100%" }}
            onClick={() => guardarTicket()}
          >
            Guardar Ticket
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

Cliente.propTypes = {
  disable_input: PropTypes.bool,
  data: PropTypes.array,
};

export default React.memo(Cliente);
