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
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
import { usePutReasignarMutation } from "api/index";
//card components
import CardUsers from "./components/index";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useReasignarTicketStore } from "./store/reasignarTicket.store.ts";
import { useGetUsuariosQuery } from "api";
import { arSA } from "@mui/material/locale";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Reasignar = () => {
  const [putReasignar] = usePutReasignarMutation();
  const { data, isLoading } = useGetUsuariosQuery();
  const isWindowReasignarOpen = useDialogStore((state) => state.isWindowReasignarOpen);
  const closeWindowReasignar = useDialogStore((state) => state.closeWindowReasignar);
  const reasignarTicketStore = useReasignarTicketStore();
  const vistoBueno = useReasignarTicketStore((state) => state.vistoBueno);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const [value, setValue] = React.useState(null);
  if (isLoading) return <p>Cargando...</p>;

  const reasignarTicket = async () => {
    try {
      console.log(reasignarTicketStore);
      // const result = await putReasignar({
      //   id_usuario_reasignar: value._id,
      //   id_ticket: reasignarTicketStore._id,
      // });
      //console.log("resultado de reasignar ticket", result);
      // if (result.error) {
      //   openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      // } else {
      //   openSuccessSB(result.data.desc, `Status: 200`);
      // }
      // setTimeout(() => {
      //   reasignarTicketStore.reasignarTicketResetValues();
      //   closeWindowReasignar();
      // }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  // const options = data.AREASRESOLUTORES.flatMap((areaObj) =>
  //   areaObj.resolutores.map((resolutor) => ({
  //     ...resolutor,
  //     area: areaObj.area.toUpperCase(),
  //   }))
  // );
  console.log(data);
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
              variant="contained"
              color="success"
              endIcon={<SaveIcon />}
              sx={{ border: "1px dashed green" }}
              onClick={reasignarTicket}
              //disabled={value == null ? true : false}
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
                  sx={{ mt: 5, display: "flex", flexDirection: "row", justifyContent: "center" }}
                >
                  <Grid xs={12}>
                    <FormControl sx={{ width: 500 }}>
                      <InputLabel htmlFor="grouped-native-select">Tiempo de resolución</InputLabel>
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
                            console.error(
                              "Tiempo_respuesta no está definido en prioridad:",
                              prioridad
                            );
                            return null;
                          }
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12}>
                    <FormControl sx={{ width: 500 }}>
                      <InputLabel htmlFor="grouped-native-select">Reasignar a</InputLabel>
                      <Select
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        label="Reasignar a"
                        onChange={(e) => {
                          const [reasignado_a, area_id] = e.target.value.split("|");
                          reasignarTicketStore.setReasignarTicketFields(
                            "Reasignado_a",
                            reasignado_a
                          ); // ID del resolutor
                          reasignarTicketStore.setReasignarTicketFields(
                            "Area_reasignado_a",
                            area_id
                          ); // ID del área
                        }}
                      >
                        <option aria-label="None" value="" />
                        {data.AREASRESOLUTORES.map((area) => {
                          if (area) {
                            return (
                              <optgroup label={area.area.area} key={area.area._id}>
                                {area.resolutores.map((t, index) => (
                                  <option value={`${t._id}|${area.area._id}`} key={index}>
                                    {t.Nombre}
                                  </option>
                                ))}
                              </optgroup>
                            );
                          } else {
                            console.error("Área no está definida en las resolutores:");
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
                          checked={vistoBueno}
                          onChange={() =>
                            reasignarTicketStore.setReasignarTicketFields("vistoBueno", true)
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
