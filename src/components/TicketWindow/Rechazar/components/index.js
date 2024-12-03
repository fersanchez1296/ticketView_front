import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
//mui library components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
//store
import { useTicketStore, useDialogStore } from "zustand/index.ts";
//api hook
import { usePutRechazarResolucionMutation } from "api";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const RechazarCard = () => {
  const [rechazar, { isLoading }] = usePutRechazarResolucionMutation();
  const ticket = useTicketStore();
  const [feedback, setFeedback] = React.useState("Se regresa al resolutor por falta de solucion");
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const closeWindowRechazar = useDialogStore((state) => state.closeWindowRechazar);
  const rechazarResolucion = async () => {
    try {
      const result = await rechazar({ _id: ticket._id, motivo_rechazo: feedback });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        ticket.resetValues();
        closeWindowRechazar();
      }, 2000);
    } catch (error) {}
  };
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={12} mb={12}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="error"
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
                      label="Revisado por:"
                      value={ticket.Resuelto_por.Nombre}
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
                      value={ticket.Resuelto_por.Coordinacion}
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
                      label="Retroalimetación al usuario"
                      multiline
                      value={feedback}
                      rows={10}
                      onChange={(e) => setFeedback(e.target.value)}
                      sx={{ width: "100%" }}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={12}>
                  <MDBox mb={2} sx={{ width: "100%" }}>
                    <Button
                      variant="contained"
                      color="success"
                      endIcon={<SaveIcon />}
                      sx={{ border: "1px dashed green" }}
                      onClick={rechazarResolucion}
                    >
                      Enviar al resolutor
                    </Button>
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

export default React.memo(RechazarCard);
