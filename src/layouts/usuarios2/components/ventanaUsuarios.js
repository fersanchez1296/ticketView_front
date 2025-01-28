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
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
//api hook
import { usePutReasignarMutation } from "api/index";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useUserStore } from "../store/usuarios.store.ts";
import { useGetUsuariosQuery } from "api";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VentanaUsuarios = () => {
  const isWindowUsuariosOpen = useDialogStore((state) => state.isWindowUsuariosOpen);
  const closeWindowUsuarios = useDialogStore((state) => state.closeWindowUsuarios);
  const resetUserStore = useUserStore((state) => state.usuarioResetValues);
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const openSuccessSB = useSnackbarStore((state) => state.openSuccessSB);
  const userStore = useUserStore();

  const guardarUsuario = async () => {
    if (!userStore.isEdit) {
      console.log(userStore);
      // const result = await postCliente({ body: userStore });
    } else {
      const result = await updateCliente({
        body: {},
        clientId: userStore._id,
      });
    }
    if (result.error) {
      openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
    } else {
      openSuccessSB(result.data.desc, `Status: 200`);
      userStore.usuarioResetValues();
      closeWindowClientes();
    }
  };

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
              onClick={guardarUsuario}
              //disabled={value == null ? true : false}
            >
              Guardar Usuario
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
                  Usuario
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <Grid container spacing={2} sx={{ display: "flex" }}>
                    {/* Nombre del usuario */}
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Nombre:"
                          value={userStore.Nombre}
                          onChange={(e) => userStore.setUsuarioFields("Nombre", e.target.value)}
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    {/* Correo del usuario */}
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Correo:"
                          value={userStore.Correo}
                          onChange={(e) => userStore.setUsuarioFields("Correo", e.target.value)}
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    {/* Area del usuario */}
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Área:"
                          value={userStore.Area}
                          onChange={(e) => userStore.setUsuarioFields("Area", e.target.value)}
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    {/* Rol del usuario */}
                    {/* <Grid xs={4}>
                      <MDBox mb={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
                          <Select
                            sx={{ minHeight: "3rem" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //value={ticketState.Servicio}
                            label="Estatus"
                            //onChange={(e) => setTicketFields("Servicio", e.target.value)}
                          >
                            {data.servicios.map((est) => {
                              return (
                                <MenuItem value={est._id} key={est._id}>
                                  {est.Servicio}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </MDBox>
                    </Grid> */}
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
