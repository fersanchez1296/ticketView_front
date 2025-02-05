import React from "react";
//mui library component
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
//api hook
import { usePutReasignarMutation } from "api/index";
import { usePutReabrirMutation } from "api/index";
//card components
import CardUsers from "./components/index";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useGetUsuariosQuery } from "api";
import { setDirection } from "context";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Reabrir = () => {
  const [putReabrir] = usePutReabrirMutation();
  const { data, isLoading } = useGetUsuariosQuery();
  const isWindowReabrirOpen = useDialogStore((state) => state.isWindowReabrirOpen);
  const closeWindowReabrir = useDialogStore((state) => state.closeWindowReabrir);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const ticketState = useTicketStore();
  const [idResolutorSeleccionado, setIdResolutorSeleccionado] = React.useState("");
  const [Asignado_a, setAsignado_a] = React.useState(null);
  const [Descripcion_reabrir, setDescripcion_reabrir] = React.useState(null);
  if (isLoading) return <p>Cargando...</p>;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reabrirTicket = async () => {
    try {
      const result = await putReabrir({
        _id: ticketState._id,
        Descripcion_reabrir,
        Descripcion_cierre: ticketState.Descripcion_cierre,
        Descripcion: ticketState.Descripcion,
        Asignado_a,
      });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        ticketState.resetValues();
        closeWindowReabrir();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {/*Introducido por teclado Descripción del ticket*/}
      <Grid item xs={4}>
        <TextField
          id="outlined-multiline-static"
          label="Descripción reapuertura de ticket"
          multiline
          value={Descripcion_reabrir}
          onChange={(e) => setDescripcion_reabrir(e.target.value)}
          rows={5.2}
          defaultValue="Sin información"
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-multiline-static"
          label="Descripción reapuertura de ticket"
          multiline
          value={Descripcion_reabrir}
          onChange={(e) => setDescripcion_reabrir(e.target.value)}
          rows={5.2}
          defaultValue="Sin información"
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-multiline-static"
          label="Descripción reapuertura de ticket"
          multiline
          value={Descripcion_reabrir}
          onChange={(e) => setDescripcion_reabrir(e.target.value)}
          rows={5.2}
          defaultValue="Sin información"
          sx={{ width: "100%" }}
        />
      </Grid>
    </React.Fragment>
  );
};

export default React.memo(Reabrir);
