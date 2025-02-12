// Importaciones
import React from "react";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Ticket from "./components/Ticket";
import Resolutor from "./components/Resolutor";
import Cliente from "./components/Cliente";
import SuccessSB from "components/Snackbar/success/index";
import ErrorSB from "components/Snackbar/error/index";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
//mui library component
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.)
import { useSelectsCrearTicketQuery } from "api/ticketsApi";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
import { useCrearTicketStore } from "./store/crearTicket.store.ts";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const steps = ["Información del Ticket", "Moderador", "Cliente"];
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
/* -------------------------------------------------------------------------- */
const Edit = () => {
  // API Hooks (RTK Query, Axios, etc.)
  const { data, isLoading } = useSelectsCrearTicketQuery();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const resetValues = useCrearTicketStore((state) => state.crearTicketResetValues);
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  React.useEffect(() => {
    resetValues();
  }, []);
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  if (isLoading) return <div>Loading...</div>;
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
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
        return <Ticket disable_input={true} data={data} />;
      case 1:
        return <Resolutor disable_input={true} data={data} />;
      case 2:
        return <Cliente disable_input={true} data={data} />;
      default:
        return "Unknown step";
    }
  }
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <React.Fragment>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox pt={3}>
                  {/*Caja que contiene las etiquetas*/}
                  <Box sx={{ width: "100%" }}>
                    <Stepper activeStep={activeStep} alternativeLabel bgColor="primary">
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};

                        if (isStepSkipped(index)) {
                          stepProps.completed = false;
                        }
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps} color="primary">
                              {label}
                            </StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        <Typography variant="h5">Atras</Typography>
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />

                      {activeStep !== steps.length && (
                        <Button
                          onClick={handleNext}
                          disabled={activeStep === steps.length - 1 ? true : false}
                        >
                          <Typography variant="h5" color={"info"}>
                            Siguiente
                          </Typography>
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
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
      <SuccessSB />
      <ErrorSB />
    </React.Fragment>
  );
};

export default React.memo(Edit);
