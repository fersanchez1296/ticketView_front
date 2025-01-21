import React, { Suspense, lazy, startTransition } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import SaveIcon from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
//store
import { useClientesStore } from "zustand/index.ts";
import { useCrearTicketStore } from "../store/crearTicket.store.ts";
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
  const archivo = useCrearTicketStore((state) => state.Files);
  const [postGuardar] = useGuardarMutation();
  const [postCliente] = usePostClienteMutation();
  const [buscarCliente, setBuscarCliente] = React.useState(false);

  const guardarTicket = async () => {
    const formData = new FormData();
    try {
      formData.append("ticketState", JSON.stringify(crearTicketStore));
      if (archivo instanceof File) {
        formData.append("file", archivo);
      } else {
        console.error("El archivo no es válido:", archivo);
      }
      const result = await postGuardar(formData);
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
        return result;
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        crearTicketStore.resetValues();
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const guardarCliente = async () => {
    const result = await postCliente({ body: clientesStore });
    clientesStore.resetClientesStore();
    return result;
  };

  const procesarTicket = async () => {
    if (!buscarCliente) {
      //const saveTicket = await guardarTicket();
      console.log(crearTicketStore);
    } else {
      const saveCliente = await guardarCliente();
      if (saveCliente.data.status === 200) {
        //const saveTicket = await guardarTicket();
        console.log(saveTicket);
      }
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
                onChange={(e) => setBuscarCliente(e.target.checked)}
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
            onClick={() => procesarTicket()}
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
