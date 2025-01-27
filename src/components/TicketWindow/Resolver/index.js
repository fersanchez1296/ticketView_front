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
import Grid from "@mui/material/Unstable_Grid2";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
//api hook
import { usePutResolverMutation } from "api/index";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useResolverTicketStore } from "./store/resolverTicket.store.ts";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const steps = ["Resolver ticket"];

const Resolver = () => {
  //Si da error el componente es porque en los tickets no existe la propiedad visto bueno
  const [putTicket, { isLoading }] = usePutResolverMutation();
  const isWindowResolverOpen = useDialogStore((state) => state.isWindowResolverOpen);
  const closeWindowResolver = useDialogStore((state) => state.closeWindowResolver);
  const resolverTicketStore = useResolverTicketStore();
  const ticketId = useTicketStore((state) => state._id);
  const area_reasignado = useTicketStore((state) => state.Area_asignado._id);
  const vistoBueno = useTicketStore((state) => state.vistoBueno);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  React.useEffect(() => {
    resolverTicketStore.setResolverTicketFields("vistoBueno", vistoBueno);
    resolverTicketStore.setResolverTicketFields("Area_reasignado_a", area_reasignado);
  }, []);
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
    resolverTicketStore.resolverTicketSetFiles(archivos[0]);
  };

  const resolverTicket = async () => {
    const formData = new FormData();
    try {
      formData.append("ticketData", JSON.stringify(resolverTicketStore));
      if (resolverTicketStore.Files instanceof File) {
        formData.append("file", resolverTicketStore.Files);
      }
      console.log(resolverTicketStore.Files);
      const result = await putTicket({ formData, ticketId });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
        return result;
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        closeWindowResolver();
        resolverTicketStore.resolverTicketResetValues();
        return result;
      }
    } catch (error) {
      openErrorSB("Ocurrio un error al resolver el ticket.", `Status: ${result.error.status}`);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowResolverOpen}
        onClose={() => {
          resolverTicketStore.resolverTicketResetValues();
          closeWindowResolver();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                resolverTicketStore.resolverTicketResetValues();
                closeWindowResolver();
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
              onClick={resolverTicket}
              disabled={resolverTicketStore.Respuesta_cierre_reasignado === "" ? true : false}
            >
              Resolver Ticket
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Grid xs={6} mb={12}>
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
                  Resolver Ticket
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <Grid container spacing={3}>
                    <Grid xs={12}>
                      <MDBox mb={2} sx={{ width: "100%" }}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Descripción de resolución:"
                          multiline
                          value={resolverTicketStore.Respuesta_cierre_reasignado}
                          rows={10}
                          sx={{ width: "100%" }}
                          onChange={(e) =>
                            resolverTicketStore.setResolverTicketFields(
                              "Respuesta_cierre_reasignado",
                              e.target.value
                            )
                          }
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={12}>
                      <MDBox mb={2}>
                        <Button
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon color="white" />}
                          disabled={resolverTicketStore.Files ? true : false}
                          sx={{
                            color: "white", // Color del texto
                            backgroundColor: "#1976d2", // Color de fondo
                            "&:hover": {
                              backgroundColor: "#1565c0", // Color de fondo al pasar el mouse
                            },
                          }}
                        >
                          <MDTypography color="white">
                            {resolverTicketStore.Files
                              ? resolverTicketStore.Files.name
                              : "Subir Archivos"}
                          </MDTypography>
                          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                        </Button>
                      </MDBox>
                    </Grid>
                    {resolverTicketStore.Files ? (
                      <Grid item>
                        <MDBox mb={2}>
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              resolverTicketStore.resolverTicketSetFiles(null);
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

export default React.memo(Resolver);
