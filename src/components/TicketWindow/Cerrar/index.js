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
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
//api hook
//import { usePostDocumentoMutation } from "api/api.slice";
//card components
import Ticket from "../components/Ticket";

//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useCerrarTicketMutation } from "api";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const steps = ["Cerrar Ticket"];

const CerrarCard = () => {
  const ticket = useTicketStore();
  const setTicketFields = useTicketStore((state) => state.setTicketFields);
  return (
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
              Cerrar Ticket
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Número oficio:"
                      value={ticket.Numero_Oficio}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Cerrado Por:"
                      value={ticket.Cerrado_por.Nombre}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={true}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Resuelto Por:"
                      value={ticket.Resuelto_por.Nombre}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={true}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Causa:"
                      value={ticket.Causa}
                      onChange={(e) => setTicketFields("Causa", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Fecha y hora de Cierre:"
                      value={ticket.Fecha_hora_cierre}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={true}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={12}>
                  <MDBox mb={2}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descripción de cierre"
                      multiline
                      value={ticket.Descripcion_cierre}
                      onChange={(e) => setTicketFields("Descripcion_cierre", e.target.value)}
                      rows={5.2}
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
  );
};

const Cerrar = () => {
  const [closeTicket] = useCerrarTicketMutation();
  const isWindowCloseTicketOpen = useDialogStore((state) => state.isWindowCloseTicketOpen);
  const closeWindowCloseTicket = useDialogStore((state) => state.closeWindowCloseTicket);
  const ticketState = useTicketStore();
  const { openSuccessSB, openErrorSB } = useSnackbarStore();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CerrarCard />;
      default:
        return "Unknown step";
    }
  }

  const cerrarTicket = async (req, res) => {
    try {
      const respuesta = await closeTicket({
        _id: ticketState._id,
        Descripcion_cierre: ticketState.Descripcion_cierre,
        Causa: ticketState.Causa,
      });
      if (respuesta.error) {
        openErrorSB(respuesta.error.data.desc, `Status: ${respuesta.error.status}`);
      } else {
        openSuccessSB(respuesta.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        ticketState.resetValues();
        closeWindowCloseTicket();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowCloseTicketOpen}
        onClose={() => {
          handleReset();
          ticketState.resetValues();
          closeWindowCloseTicket();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                handleReset();
                ticketState.resetValues();
                closeWindowCloseTicket();
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
              sx={{ border: "1px solid green" }}
              onClick={cerrarTicket}
              //disabled={true}
            >
              Cerrar Ticket
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Atras
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep !== steps.length && (
              <Button
                onClick={handleNext}
                disabled={activeStep === steps.length - 1 ? true : false}
              >
                Siguiente
              </Button>
            )}
          </Box>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>No hay más por ver</Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(Cerrar);
