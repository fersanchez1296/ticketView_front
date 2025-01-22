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
import {
  useGetSelectRolQuery,
  useCrearUsuarioMutation,
  useUpdateUsuarioMutation,
} from "../../../api/index";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useDialogStore, useUserStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VentanaUsuarios = (disable_input) => {
  const mode = useDialogStore((state) => state.userWindowMode);
  const isWindowUsuariosOpen = useDialogStore((state) => state.isWindowUsuariosOpen);
  const closeWindowUsuarios = useDialogStore((state) => state.closeWindowUsuarios);
  const resetUserStore = useUserStore((state) => state.resetUserValues);
  const userStore = useUserStore();
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const openSuccessSB = useSnackbarStore((state) => state.openSuccessSB);
  const setUserFields = useUserStore((state) => state.setUserFields);
  const Nombre_A = userStore.Nombre;
  const [postCrearUsuario] = useCrearUsuarioMutation();
  const [putEditarUsuario] = useUpdateUsuarioMutation();
  const [nombreBoton, setNombreBoton] = React.useState("");
  const [metodoEnvio, setMetodoEnvio] = React.useState(false);
  const { data: dataroles, isLoading } = useGetSelectRolQuery();
  React.useEffect(() => {
    userStore && userStore.Nombre === ""
      ? setNombreBoton("Crear usuario")
      : setNombreBoton("Editar usuario");
  }, []);
  React.useEffect(() => {
    //true para post
    //false para put
    userStore && userStore.Nombre === "" ? setMetodoEnvio(true) : setMetodoEnvio(false);
  }, []);
  if (isLoading) {
    return <div> Cargando... </div>;
  }
  const crearUsuario = async () => {
    resetUserStore();
    try {
      const result = await postCrearUsuario(userStore);
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        resetUserStore();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editarUsuario = async () => {
    try {
      const result = await putEditarUsuario({ userStore, id: userStore._id });
      console.log(result);
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        resetUserStore();
        openSuccessSB(result.data.desc, `Status: 200`);
      }
    } catch (error) {
      console.log(error);
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
              onClick={metodoEnvio ? crearUsuario : editarUsuario}
            >
              {nombreBoton}
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container sx={{ mt: 5, display: "flex", justifyContent: "centFer" }}>
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
                  {nombreBoton}
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <Grid container spacing={2} sx={{ display: "flex" }}>
                    <Grid xs={5.8}>
                      <MDBox ml={2} mt={2}>
                        <MDInput
                          type="text"
                          label="Nombre:"
                          value={userStore.Nombre}
                          onChange={(e) => setUserFields("Nombre", e.target.value)}
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    {/*Seleccion del rol del usuario*/}
                    <Grid xs={5.8}>
                      <MDBox ml={2} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Rol de usuario</InputLabel>
                          <Select
                            sx={{ minHeight: "3rem" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userStore.Rol}
                            label="Rol de usuario"
                            onChange={(e) => setUserFields("Rol", e.target.value)}
                          >
                            {dataroles.roles.map((est) => {
                              return (
                                <MenuItem value={est._id} key={est._id}>
                                  {est.Rol}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </MDBox>
                    </Grid>
                    <Grid xs={5.8}>
                      <MDBox ml={2} mt={2}>
                        <MDInput
                          type="text"
                          label="Username:"
                          value={userStore.Username}
                          //onChange={(e) => setUserFields("Username", e.target.value)}
                          fullWidth
                          required
                          disabled={disable_input}
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={6}>
                      <MDBox m={2}>
                        <MDInput
                          type="text"
                          label="Correo:"
                          value={userStore.Correo}
                          onChange={(e) => setUserFields("Correo", e.target.value)}
                          fullWidth
                          required
                          disabled={!disable_input}
                        />
                      </MDBox>
                    </Grid>
                    {/*Seleccion del coordinacion del usuario*/}
                    <Grid xs={5.8}>
                      <MDBox ml={2} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Coordinación</InputLabel>
                          <Select
                            sx={{ minHeight: "3rem" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Nombre_A === "" ? userStore.Area : userStore.Coordinacion}
                            label="Coordinacion de usuario"
                            onChange={(e) => setUserFields("Coordinacion", e.target.value)}
                          >
                            {dataroles.coordinaciones.map((est) => {
                              return (
                                <MenuItem value={est._id} key={est._id}>
                                  {est.coordinacion}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </MDBox>
                    </Grid>
                    {/*Seleccion del area del usuario*/}
                    <Grid xs={5.8}>
                      <MDBox ml={2} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Área</InputLabel>
                          <Select
                            sx={{ minHeight: "3rem" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userStore.Area}
                            label="Area de usuario"
                            onChange={(e) => setUserFields("Area", e.target.value)}
                          >
                            {dataroles.areas.map((est) => {
                              return (
                                <MenuItem value={est._id} key={est._id}>
                                  {est.Area}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </MDBox>
                    </Grid>
                    {/*Seleccion dependencia del usuario*/}
                    <Grid xs={5.8}>
                      <MDBox ml={2} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Dependencia</InputLabel>
                          <Select
                            sx={{ minHeight: "3rem" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userStore.Dependencia}
                            label="Dependencia"
                            onChange={(e) => setUserFields("Dependencia", e.target.value)}
                          >
                            {dataroles.dependencias.map((est) => {
                              return (
                                <MenuItem value={est._id} key={est._id}>
                                  {est.Dependencia}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </MDBox>
                    </Grid>
                    {/*Seleccion de direccion general del usuario*/}
                    <Grid xs={5.8}>
                      <MDBox ml={2} mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Dirección general</InputLabel>
                          <Select
                            sx={{ minHeight: "3rem" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userStore.Direccion_general}
                            label="Direccion general usuario"
                            onChange={(e) => setUserFields("Direccion_general", e.target.value)}
                          >
                            {dataroles.direccion_generales.map((est) => {
                              return (
                                <MenuItem value={est._id} key={est._id}>
                                  {est.Direccion_General}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
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
VentanaUsuarios.propTypes = {
  disable_input: PropTypes.bool,
};

export default React.memo(VentanaUsuarios);
