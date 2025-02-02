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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
//api hook
import { usePutRechazarResolucionMutation } from "api";
//card components
import RechazarCard from "./components/index";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const steps = ["Rechazar Resolución"];

const Rechazar = () => {
  const isWindowRechazarOpen = useDialogStore((state) => state.isWindowRechazarOpen);
  const closeWindowRechazar = useDialogStore((state) => state.closeWindowRechazar);
  const [feedback, setFeedback] = React.useState("");
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const [rechazar, { isLoading }] = usePutRechazarResolucionMutation();
  const ticketState = useTicketStore();
  const Nombre = useTicketStore((state) => state.Resuelto_por.Nombre);
  const ticketId = useTicketStore((state) => state._id);

  const rechazarResolucion = async () => {
    try {
      const result = await rechazar({ ticketId, feedback, Nombre });
      console.log(result);
      console.log(ticketId, feedback, Nombre);
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        ticketState.resetValues();
        closeWindowRechazar();
      }, 2000);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowRechazarOpen}
        onClose={() => {
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
              color="primary"
              sx={{ color: "Black" }}
              endIcon={<SaveIcon />}
              disabled={!feedback ? true : false}
              onClick={rechazarResolucion}
            >
              Enviar al resolutor
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
                  Resolución rechazada
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
                          value={ticketState.Resuelto_por.Nombre}
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
                          value={ticketState.Resuelto_por.Coordinacion}
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
                          label="Retroalimetación al resolutor"
                          multiline
                          value={feedback}
                          rows={10}
                          onChange={(e) => setFeedback(e.target.value)}
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

export default React.memo(Rechazar);
