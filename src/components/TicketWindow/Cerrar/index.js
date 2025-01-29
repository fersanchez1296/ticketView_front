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
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useCerrarTicketStore } from "./store/cerrarTicket.store.ts";
import { useCerrarTicketMutation } from "api";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cerrar = () => {
  const [closeTicket] = useCerrarTicketMutation();
  const isWindowCloseTicketOpen = useDialogStore((state) => state.isWindowCloseTicketOpen);
  const closeWindowCloseTicket = useDialogStore((state) => state.closeWindowCloseTicket);
  const cerrarTicketStore = useCerrarTicketStore();
  const descripcion_cierre_resolutor = useTicketStore((state) => state.Respuesta_cierre_reasignado);
  const ticketId = useTicketStore((state) => state._id);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
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
  const handleFileChange = (event) => {
    const archivos = Array.from(event.target.files);
    cerrarTicketStore.cerrarTicketSetFiles(archivos[0]);
  };
  const cerrarTicket = async () => {
    const formData = new FormData();
    try {
      formData.append("ticketData", JSON.stringify(cerrarTicketStore));
      if (cerrarTicketStore.Files instanceof File) {
        formData.append("file", cerrarTicketStore.Files);
      }
      const result = await closeTicket({ ticketId, formData });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        closeWindowCloseTicket();
        cerrarTicketStore.cerrarTicketResetValues();
      }
    } catch (error) {
      openErrorSB("Ocurrio un error al cerrar el ticket.", `Status: 500`);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowCloseTicketOpen}
        onClose={() => {
          cerrarTicketStore.cerrarTicketResetValues();
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
                cerrarTicketStore.cerrarTicketResetValues();
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
              disabled={cerrarTicketStore.Descripcion_cierre === "" ? true : false}
            >
              Cerrar Ticket
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
                  Cerrar Ticket
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <Grid container spacing={3}>
                    {/* Oficio de cierre */}
                    <Grid xs={6}>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Número de oficio de cierre:"
                          value={cerrarTicketStore.Numero_Oficio}
                          onChange={(e) =>
                            cerrarTicketStore.setCerrarTicketFields("Numero_Oficio", e.target.value)
                          }
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={12}>
                      <MDBox mb={2}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Descripción de cierre del resolutor"
                          multiline
                          disabled
                          value={descripcion_cierre_resolutor}
                          rows={5.2}
                          sx={{ width: "100%" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={12}>
                      <MDBox mb={2}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Descripción de cierre"
                          multiline
                          value={cerrarTicketStore.Descripcion_cierre}
                          onChange={(e) =>
                            cerrarTicketStore.setCerrarTicketFields(
                              "Descripcion_cierre",
                              e.target.value
                            )
                          }
                          rows={5.2}
                          sx={{ width: "100%" }}
                        />
                      </MDBox>
                    </Grid>
                    {!cerrarTicketStore.Numero_Oficio ? null : (
                      <Grid xs={12}>
                        <MDBox mb={2}>
                          <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon color="white" />}
                            disabled={cerrarTicketStore.Files ? true : false}
                            sx={{
                              color: "white",
                              backgroundColor: "#1976d2",
                              "&:hover": {
                                backgroundColor: "#1565c0",
                              },
                            }}
                          >
                            <MDTypography color="white">
                              {cerrarTicketStore.Files
                                ? cerrarTicketStore.Files.name
                                : "Subir Archivos"}
                            </MDTypography>
                            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                          </Button>
                        </MDBox>
                      </Grid>
                    )}
                    {cerrarTicketStore.Files ? (
                      <Grid item>
                        <MDBox mb={2}>
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              cerrarTicketStore.cerrarTicketSetFiles(null);
                            }}
                          >
                            <MDTypography color="black">Eliminar Archivo</MDTypography>
                          </Button>
                        </MDBox>
                      </Grid>
                    ) : null}
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

export default React.memo(Cerrar);
