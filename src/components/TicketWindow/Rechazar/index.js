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
//api hook
//import { usePostDocumentoMutation } from "api/api.slice";
//card components
import RechazarCard from "./components/index";

//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const steps = ["Rechazar Resolución"];

const Rechazar = () => {
  const isWindowRechazarOpen = useDialogStore((state) => state.isWindowRechazarOpen);
  const closeWindowRechazar = useDialogStore((state) => state.closeWindowRechazar);
  const ticketState = useTicketStore();
  //const [createDocumento] = usePostDocumentoMutation();

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
        return <RechazarCard />;
      default:
        return "Unknown step";
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowRechazarOpen}
        onClose={() => {
          handleReset();
          ticketState.resetValues();
          closeWindowRechazar();
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
                closeWindowRechazar();
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
              //onClick={postDocumento}
            >
              Enviar al usuario
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

export default React.memo(Rechazar);
