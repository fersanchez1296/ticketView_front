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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
//api hook
import { usePutAceptarResolucionMutation } from "api";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Aceptar = () => {
  const isWindowAceptarOpen = useDialogStore((state) => state.isWindowAceptarOpen);
  const closeWindowAceptar = useDialogStore((state) => state.closeWindowAceptar);
  const [aceptar, { isLoading }] = usePutAceptarResolucionMutation();
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const ticketStore = useTicketStore();
  const ticketId = useTicketStore((state) => state._id);
  const Nombre_resolutor = useTicketStore((state) => state.Resuelto_por.Nombre);

  const aceptarResolucion = async () => {
    try {
      const result = await aceptar({ ticketId, Nombre: Nombre_resolutor });
      console.log(result);
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        ticketStore.resetValues();
        closeWindowAceptar();
      }, 2000);
    } catch (error) {
      openErrorSB("Ocurrió un error al procesar la solicitud.", `Status: ${result.error.status}`);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowAceptarOpen}
        onClose={() => {
          ticketStore.resetValues();
          closeWindowAceptar();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                ticketStore.resetValues();
                closeWindowAceptar();
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
              sx={{ color: "Black" }}
              endIcon={<SaveIcon />}
              onClick={aceptarResolucion}
            >
              Enviar a Centro de Ayuda
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Grid xs={12} mb={12}>
            <Card>
              <MDBox
                //variant="gradient"
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
                  Resolución aceptada
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <Grid container spacing={2}>
                    <Grid xs={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Resuelto por:"
                          value={ticketStore.Resuelto_por.Nombre}
                          fullWidth
                          required
                          disabled={true}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Equipo Asignado:"
                          value={ticketStore.Resuelto_por.Coordinacion}
                          fullWidth
                          required
                          disabled={true}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={12}>
                      <MDBox mb={2} sx={{ width: "100%" }}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Descripción de cierre por el resolutor"
                          multiline
                          value={ticketStore.Respuesta_cierre_reasignado}
                          rows={10}
                          disabled={true}
                          defaultValue="Sin información"
                          sx={{ width: "100%" }}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(Aceptar);
