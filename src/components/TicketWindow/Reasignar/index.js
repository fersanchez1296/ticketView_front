import React from "react";
//mui library component
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import SaveIcon from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
//api hook
import { useReasignarMutation } from "api/ticketsApi";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useReasignarTicketStore } from "./store/reasignarTicket.store.ts";
import { useGetUsuariosQuery } from "api";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Reasignar = () => {
  const [putReasignar] = useReasignarMutation();
  const { data, isLoading } = useGetUsuariosQuery();
  const isWindowReasignarOpen = useDialogStore((state) => state.isWindowReasignarOpen);
  const closeWindowReasignar = useDialogStore((state) => state.closeWindowReasignar);
  const reasignarTicketStore = useReasignarTicketStore();
  const ticketId = useTicketStore((state) => state._id);
  const vistoBueno = useReasignarTicketStore((state) => state.vistoBueno);
  const [modificarTiempo, setModificarTiempo] = React.useState(false);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const [value, setValue] = React.useState(null);
  if (isLoading) return <p>Cargando...</p>;

  const reasignarTicket = async () => {
    try {
      const result = await putReasignar({ reasignarTicketStore, ticketId });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        reasignarTicketStore.reasignarTicketResetValues();
        reasignarTicketStore.reasignarTicketResetValues();
        closeWindowReasignar();
      }, 2000);
    } catch (error) {
      openErrorSB("Ocurrio un error inesperado al reasignar el ticket.", `Status: 200`);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowReasignarOpen}
        onClose={() => {
          reasignarTicketStore.reasignarTicketResetValues();
          closeWindowReasignar();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                reasignarTicketStore.reasignarTicketResetValues();
                closeWindowReasignar();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cerrar
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<SaveIcon />}
              sx={{ color: "Black" }}
              onClick={reasignarTicket}
              disabled={reasignarTicketStore.Reasignado_a === "" ? true : false}
            >
              Reasignar Ticket
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Grid xs={12}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Reasignar Ticket
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <Grid
                  spacing={2}
                  sx={{
                    mt: 5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.8rem",
                  }}
                >
                  <Grid xs={12}>
                    <FormControl sx={{ width: 500 }}>
                      <InputLabel htmlFor="grouped-native-select">Reasignar a</InputLabel>
                      <Select
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        label="Reasignar a"
                        onChange={(e) => {
                          const [reasignado_a, area_id, correo, nombre] = e.target.value.split("|");
                          reasignarTicketStore.setReasignarTicketFields(
                            "Reasignado_a",
                            reasignado_a
                          ); // ID del resolutor
                          reasignarTicketStore.setReasignarTicketFields(
                            "Area_reasignado_a",
                            area_id
                          ); // ID del área
                          reasignarTicketStore.setReasignarTicketFields("Correo", correo); // Correo
                          reasignarTicketStore.setReasignarTicketFields("Nombre", nombre); // Nombre
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
                  <Grid xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={modificarTiempo}
                          onChange={() =>
                            setModificarTiempo((prev) => {
                              if (prev) {
                                reasignarTicketStore.setReasignarTicketFields("Prioridad", "");
                                reasignarTicketStore.setReasignarTicketFields(
                                  "Fecha_limite_resolucion_SLA",
                                  ""
                                );
                                reasignarTicketStore.setReasignarTicketFields(
                                  "Fecha_limite_respuesta_SLA",
                                  ""
                                );
                              }
                              return !prev;
                            })
                          }
                          name="tiempoRespuesta"
                        />
                      }
                      label="Modificar tiempo resolución"
                    />
                  </Grid>
                  {modificarTiempo ? (
                    <Grid xs={12} sx={{ display: modificarTiempo ? "block" : "none" }}>
                      <FormControl sx={{ width: 500 }}>
                        <InputLabel htmlFor="grouped-native-select">
                          Tiempo de resolución
                        </InputLabel>
                        <Select
                          native
                          defaultValue=""
                          id="grouped-native-select"
                          label="Tiempo de resolución"
                          onChange={(e) => {
                            const [prioridad, tiempo] = e.target.value.split("|");
                            reasignarTicketStore.setReasignarTicketFields("Prioridad", prioridad);
                            reasignarTicketStore.setReasignarTicketFields(
                              "Fecha_limite_resolucion_SLA",
                              tiempo
                            );
                            reasignarTicketStore.setReasignarTicketFields(
                              "Fecha_limite_respuesta_SLA",
                              tiempo
                            );
                          }}
                        >
                          <option aria-label="None" value="" />
                          {data.prioridades.map((prioridad) => {
                            if (prioridad.Tiempo_respuesta) {
                              return (
                                <optgroup label={prioridad.Descripcion} key={prioridad._id}>
                                  {prioridad.Tiempo_respuesta.map((t, index) => (
                                    <option value={`${prioridad._id}|${t}`} key={index}>
                                      {t >= 24 ? `${t / 24} día(s)` : `${t} horas`}
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
                  ) : null}
                  <Grid xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={vistoBueno}
                          onChange={() =>
                            reasignarTicketStore.setReasignarTicketFields("vistoBueno", !vistoBueno)
                          }
                          name="vistoBueno"
                        />
                      }
                      label="Visto Bueno"
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(Reasignar);
