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
import { styled } from "@mui/material/styles";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
//api hook
import { useAsignarMutation } from "api/ticketsApi";
import { useGetUsuariosParaAsignacionQuery } from "api/usuariosApi.js";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useAsignarTicketStore } from "./store/asignarTicket.store.ts";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Asignar = () => {
  const [putAsignar] = useAsignarMutation();
  const { data, isLoading } = useGetUsuariosParaAsignacionQuery();
  const isWindowAsignarOpen = useDialogStore((state) => state.isWindowAsignarOpen);
  const closeWindowAsignar = useDialogStore((state) => state.closeWindowAsignar);
  const asignarTicketStore = useAsignarTicketStore();
  const ticketId = useTicketStore((state) => state._id);
  const [modificarTiempo, setModificarTiempo] = React.useState(false);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  if (isLoading) return <p>Cargando...</p>;
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  // const handleFileChange = (event) => {
  //   const archivos = Array.from(event.target.files);
  //   asignarTicketStore.asignarTicketSetFiles(archivos);
  // };
  const reasignarTicket = async () => {
    //const formData = new FormData();
    try {
      // formData.append("ticketData", JSON.stringify(asignarTicketStore));
      // if (asignarTicketStore.Files instanceof File) {
      //   formData.append("file", asignarTicketStore.Files);
      // }
      // console.log(formData);
      //console.log(asignarTicketStore, ticketId);
      const result = await putAsignar({ asignarTicketStore, ticketId });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        asignarTicketStore.asignarTicketResetValues();
        asignarTicketStore.asignarTicketResetValues();
        closeWindowAsignar();
      }, 2000);
    } catch (error) {
      openErrorSB("Ocurrio un error inesperado al asignar el ticket.", `Status: 500`);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowAsignarOpen}
        onClose={() => {
          asignarTicketStore.asignarTicketResetValues();
          closeWindowAsignar();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                asignarTicketStore.asignarTicketResetValues();
                closeWindowAsignar();
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
              disabled={asignarTicketStore.Asignado_a === "" ? true : false}
            >
              Guardar Ticket
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
                  Guardar Ticket
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
                      <InputLabel htmlFor="grouped-native-select">Asignar a</InputLabel>
                      <Select
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        label="Reasignar a"
                        onChange={(e) => {
                          const [asignado_a, area_id, correo, nombre] = e.target.value.split("|");
                          asignarTicketStore.setAsignarTicketFields("Asignado_a", asignado_a); // ID del resolutor
                          asignarTicketStore.setAsignarTicketFields("Area_asignado", area_id); // ID del área
                          asignarTicketStore.setAsignarTicketFields("Correo", correo); // Correo
                          asignarTicketStore.setAsignarTicketFields("Nombre", nombre); // Nombre
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
                                asignarTicketStore.setAsignarTicketFields("Prioridad", "");
                                asignarTicketStore.setAsignarTicketFields(
                                  "Fecha_limite_resolucion_SLA",
                                  ""
                                );
                                asignarTicketStore.setAsignarTicketFields(
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
                            asignarTicketStore.setAsignarTicketFields("Prioridad", prioridad);
                            asignarTicketStore.setAsignarTicketFields(
                              "Fecha_limite_resolucion_SLA",
                              tiempo
                            );
                            asignarTicketStore.setAsignarTicketFields(
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
                  {/* <Grid xs={12}>
                    <MDBox mb={2}>
                      <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon color="white" />}
                        disabled={asignarTicketStore.Files ? true : false}
                        sx={{
                          color: "white",
                          backgroundColor: "#1976d2",
                          "&:hover": {
                            backgroundColor: "#1565c0",
                          },
                        }}
                      >
                        <MDTypography color="white">
                          {asignarTicketStore.Files
                            ? asignarTicketStore.Files.name
                            : "Subir Archivos"}
                        </MDTypography>
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                      </Button>
                    </MDBox>
                  </Grid> */}
                  {/* {asignarTicketStore.Files ? (
                    <Grid item>
                      <MDBox mb={2}>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            asignarTicketStore.asignarTicketSetFiles(null);
                          }}
                        >
                          <MDTypography color="black">Eliminar Archivo</MDTypography>
                        </Button>
                      </MDBox>
                    </Grid>
                  ) : null} */}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(Asignar);
