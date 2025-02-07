import React from "react";
//mui library component
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
//api hook
import { usePutReasignarMutation } from "api/index";
import { usePutReabrirMutation } from "api/index";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MDInput from "components/MDInput";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import MDBox from "components/MDBox";
import Typography from "@mui/material/Typography";
//store
import { useDialogStore } from "zustand/index.ts";
import { useReabrirTicketStore } from "./store/reabrirTicket.store.ts";
import { useGetUsuariosQuery } from "api";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
import { useTicketStore } from "zustand/index.ts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Reabrir = () => {
  const { data, isLoading } = useGetUsuariosQuery();
  const ticketStore = useTicketStore();
  const reabrirTicketStore = useReabrirTicketStore();
  if (isLoading) return <p>Cargando...</p>;

  return (
    <React.Fragment>
      <Grid xs={12} item>
        <FormGroup>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <MDBox sx={{ display: "flex" }}>
              <Typography>Conservar información original</Typography>
              <Switch
                checked={reabrirTicketStore.original}
                onChange={() => {
                  reabrirTicketStore.setReabrirTicketFields(
                    "original",
                    !reabrirTicketStore.original
                  );
                }}
              />
              <Typography>Asignar nuevo moderador</Typography>
            </MDBox>
          </Stack>
        </FormGroup>
      </Grid>
      {reabrirTicketStore.original && (
        <>
          <Grid xs={12} item>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="grouped-native-select">Asignar a moderador:</InputLabel>
              <Select
                native
                defaultValue=""
                id="grouped-native-select"
                label="Reasignar a"
                onChange={(e) => {
                  const [reasignado_a, area_id, correo, nombre] = e.target.value.split("|");
                  reabrirTicketStore.setReabrirTicketFields("Reasignado_a", reasignado_a);
                  reabrirTicketStore.setReabrirTicketFields("Area_reasignado_a", area_id);
                  reabrirTicketStore.setReabrirTicketFields("Correo", correo);
                  reabrirTicketStore.setReabrirTicketFields("Nombre", nombre);
                }}
              >
                <option aria-label="None" value="" />
                {data.AREASRESOLUTORES.map((area) => {
                  if (area) {
                    return (
                      <optgroup label={area.area.area} key={area.area._id}>
                        {area.resolutores.map((t, index) => (
                          <option
                            value={`${t._id}|${area.area._id}|${t.Correo}|${t.Nombre}`}
                            key={index}
                          >
                            {t.Nombre}
                          </option>
                        ))}
                      </optgroup>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="outlined-multiline-static"
              label="Descripción reabierto"
              multiline
              value={reabrirTicketStore.Descripcion_reabierto}
              onChange={(e) =>
                reabrirTicketStore.setReabrirTicketFields("Descripcion_reabierto", e.target.value)
              }
              rows={5.2}
              sx={{ width: "100%" }}
            />
          </Grid>
        </>
      )}
      {!reabrirTicketStore.original && (
        <>
          <Grid xs={4} item>
            <MDInput
              type="text"
              label="Moderador"
              value={ticketStore.Asignado_a.Nombre}
              fullWidth
              disabled="true"
            />
          </Grid>
          <Grid xs={4} item>
            <MDInput
              type="text"
              label="Resolutor"
              value={ticketStore.Reasignado_a.Nombre}
              fullWidth
              disabled="true"
            />
          </Grid>
          <Grid xs={4} item>
            <MDInput
              type="text"
              label="Cliente"
              value={ticketStore.Nombre_cliente}
              fullWidth
              disabled="true"
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              value={ticketStore.Descripcion}
              rows={5.2}
              disabled="true"
              sx={{ width: "100%" }}
            />
          </Grid>
        </>
      )}
    </React.Fragment>
  );
};

export default React.memo(Reabrir);
