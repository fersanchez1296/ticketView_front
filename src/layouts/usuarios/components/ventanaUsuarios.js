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
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
//api hook
import { usePutReasignarMutation } from "api/index";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useDialogStore, useUserStore } from "zustand/index.ts";
import { useGetUsuariosQuery } from "api";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VentanaUsuarios = () => {
  const isWindowUsuariosOpen = useDialogStore((state) => state.isWindowUsuariosOpen);
  const closeWindowUsuarios = useDialogStore((state) => state.closeWindowUsuarios);
  const resetUserStore = useUserStore((state) => state.resetUserValues);
  const userStore = useUserStore();
  //   const reasignarTicket = async () => {
  //     console.log(value);
  //     try {
  //       const result = await putReasignar({
  //         id_usuario_reasignar: value._id,
  //         id_ticket: ticketState._id,
  //       });
  //       if (result.error) {
  //         openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
  //       } else {
  //         openSuccessSB(result.data.desc, `Status: 200`);
  //       }
  //       setTimeout(() => {
  //         ticketState.resetValues();
  //         closeWindowReasignar();
  //       }, 2000);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowUsuariosOpen}
        onClose={() => {
          resetUserStore();
          closeWindowUsuarios();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                resetUserStore();
                closeWindowUsuarios();
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
              //onClick={reasignarTicket}
              //disabled={value == null ? true : false}
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Grid xs={10}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  {userStore.Nombre}
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <Grid container spacing={2} sx={{ display: "flex" }}>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Nombre:"
                          value={userStore.Nombre}
                          //onChange={(e) => setEditor("editor", e.target.value)}
                          fullWidth
                          required
                          //disabled={disable_input}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Username:"
                          value={userStore.Username}
                          //onChange={(e) => setEditor("editor", e.target.value)}
                          fullWidth
                          required
                          //disabled={disable_input}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Correo:"
                          value={userStore.Correo}
                          //onChange={(e) => setEditor("editor", e.target.value)}
                          fullWidth
                          required
                          //disabled={disable_input}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Estado:"
                          value={userStore.isActive}
                          //onChange={(e) => setEditor("editor", e.target.value)}
                          fullWidth
                          required
                          //disabled={disable_input}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Coordinación:"
                          value={userStore.Coordinacion}
                          //onChange={(e) => setEditor("editor", e.target.value)}
                          fullWidth
                          required
                          //disabled={disable_input}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Área:"
                          value={userStore.Area}
                          //onChange={(e) => setEditor("editor", e.target.value)}
                          fullWidth
                          required
                          //disabled={disable_input}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Dependencia:"
                          value={userStore.Dependencia}
                          //onChange={(e) => setEditor("editor", e.target.value)}
                          fullWidth
                          required
                          //disabled={disable_input}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Dirección general:"
                          value={userStore.Direccion_general}
                          //onChange={(e) => setEditor("editor", e.target.value)}
                          fullWidth
                          required
                          //disabled={disable_input}
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

export default React.memo(VentanaUsuarios);
