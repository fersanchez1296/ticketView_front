import React, { Suspense, lazy } from "react";
//mui library component
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
//api hook
//import { usePostDocumentoMutation } from "api/api.slice";
//card components
const LazyArchivos = lazy(() => import("../components/Archivos"));
const LazyHistoriaTicket = lazy(() => import("../components/HistoriaTicket"));
const LazyCliente = lazy(() => import("../components/Cliente"));
const LazyReasignado = lazy(() => import("../components/Reasignado"));
const LazyResolutor = lazy(() => import("../components/Resolutor"));
const LazyTicket = lazy(() => import("../components/Ticket"));
//animations
import { NoData } from "components/Animation";

//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//Visualizar
const steps = [
  "Información del Ticket",
  "Asignado",
  "Reasignado",
  "Cliente",
  "Historia del Ticket",
  "Archivos",
];

const View = () => {
  const isWindowOpen = useDialogStore((state) => state.isWindowOpen);
  const closeWindow = useDialogStore((state) => state.closeWindow);
  const ticketStore = useTicketStore();

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
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyTicket disable_input={true} />
          </Suspense>
        );
      case 1:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyResolutor disable_input={true} />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyReasignado disable_input={true} />
          </Suspense>
        );
      case 3:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyCliente disable_input={true} />
          </Suspense>
        );
      case 4:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            {ticketStore.Historia_ticket != [] ? (
              <LazyHistoriaTicket disable_input={true} />
            ) : (
              <NoData />
            )}
          </Suspense>
        );
      case 5:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyArchivos />
          </Suspense>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowOpen}
        onClose={() => {
          handleReset();
          ticketStore.resetValues();
          closeWindow();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "sticky" }} color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                handleReset();
                ticketStore.resetValues();
                closeWindow();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" color={"White"}>
              Cerrar
            </Typography>
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Centrar horizontalmente
              pt: 2,
            }}
          >
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Atras
            </Button>

            <Typography
              variant="h3"
              color="inherit"
              sx={{ flexGrow: 1, textAlign: "center" }} // Centrar texto con flexGrow
            >
              {`ticket #${ticketStore.Id} - ${ticketStore.Estado.Estado}`}
            </Typography>

            <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
              Siguiente
            </Button>
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

export default React.memo(View);
