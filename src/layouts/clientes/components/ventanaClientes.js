import React, { useState } from "react";
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
import { usePostClienteMutation, useUpdateClienteMutation } from "api/index";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useDialogStore, useClientesStore } from "zustand/index.ts";
import { useGetSelectDataClientesQuery } from "api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VentanaClientes = () => {
  const isWindowClientesOpen = useDialogStore((state) => state.isWindowClientesOpen);
  const closeWindowClientes = useDialogStore((state) => state.closeWindowClientes);
  const resetClientesStore = useClientesStore((state) => state.resetClientesStore);
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const openSuccessSB = useSnackbarStore((state) => state.openSuccessSB);
  const [nuevaDGeneral, setNuevaDGeneral] = useState(false);
  const [nuevaDArea, setNuevaDArea] = useState(false);
  const [nuevaDependencia, setNuevaDependencia] = useState(false);
  const clientesStore = useClientesStore();
  const [postCliente] = usePostClienteMutation();
  const [updateCliente] = useUpdateClienteMutation();
  const { data, isLoading, isError } = useGetSelectDataClientesQuery();
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const guardarCliente = async () => {
    try {
      let result;
      if (!clientesStore.isEdit) {
        result = await postCliente({ body: clientesStore });
      } else {
        result = await updateCliente({
          body: {
            nuevaDependencia: clientesStore.nuevaDependencia,
            nuevaDArea: clientesStore.nuevaDArea,
            nuevaDGeneral: clientesStore.nuevaDGeneral,
            Correo: clientesStore.Correo,
            Nombre: clientesStore.Nombre,
            Direccion_General:
              typeof clientesStore.Direccion_General === "string"
                ? clientesStore.Direccion_General
                : clientesStore.Direccion_General._id,
            direccion_area:
              typeof clientesStore.direccion_area === "string"
                ? clientesStore.direccion_area
                : clientesStore.direccion_area._id,
            Dependencia:
              typeof clientesStore.Dependencia === "string"
                ? clientesStore.Dependencia
                : clientesStore.Dependencia._id,
            Telefono: clientesStore.Telefono,
            Extension: clientesStore.Extension,
            Ubicacion: clientesStore.Ubicacion,
          },
          clientId: clientesStore._id,
        });
      }
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        clientesStore.resetClientesStore();
        closeWindowClientes();
      }
    } catch (error) {
      openErrorSB(
        "Ocurrio un error guardar al guardar el cliente",
        `Status: ${result.error.status}`
      );
    }
  };
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowClientesOpen}
        onClose={() => {
          resetClientesStore();
          closeWindowClientes();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                resetClientesStore();
                closeWindowClientes();
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
              onClick={() => guardarCliente()}
              //disabled={value == null ? true : false}
            >
              Guardar Cliente
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={1}
          sx={{
            mt: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid xs={12} mb={12} mx={5}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="info"
                mx={6}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Cliente
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={5}>
                <MDBox component="form" role="form">
                  <Grid container spacing={3}>
                    {/*Introducido por teclado Nombre del cliente*/}
                    <Grid xs={6}>
                      <MDBox mb={2} px={2}>
                        <MDInput
                          type="text"
                          label="Nombre:"
                          value={clientesStore.Nombre}
                          onChange={(e) =>
                            clientesStore.setClientesFields("Nombre", e.target.value)
                          }
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    {/*Introducido por teclado Correo*/}
                    <Grid xs={6}>
                      <MDBox mb={2} px={2}>
                        <MDInput
                          type="email" // Muestra validación de correo automáticamente
                          label="Correo:"
                          pattern=".+@example\.mx"
                          value={clientesStore.Correo}
                          onChange={(e) =>
                            clientesStore.setClientesFields("Correo", e.target.value)
                          }
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    {/*Introducido por teclado Teléfono*/}
                    <Grid xs={6}>
                      <MDBox mb={2} px={2}>
                        <MDInput
                          type="tel" // Tipo tel para mostrar un teclado numérico en móviles
                          label="Teléfono:"
                          value={clientesStore.Telefono}
                          onChange={(e) => {
                            // Permite solo números y un límite de longitud
                            const input = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
                            clientesStore.setClientesFields("Telefono", input);
                          }}
                          inputProps={{
                            maxLength: 10, // Limita el número de caracteres a 10 (ejemplo para teléfonos locales)
                          }}
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    {/*Introducido por teclado extension*/}
                    <Grid xs={6}>
                      <MDBox mb={2} px={2}>
                        <MDInput
                          type="tel" // Tipo tel para mostrar un teclado numérico en móviles
                          label="Extensión:"
                          value={clientesStore.Extension}
                          onChange={(e) => {
                            // Permite solo números y un límite de longitud
                            const input = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
                            clientesStore.setClientesFields("Extension", input);
                          }}
                          inputProps={{
                            maxLength: 10, // Limita el número de caracteres a 10 (ejemplo para teléfonos locales)
                          }}
                          fullWidth
                          required
                        />
                      </MDBox>
                    </Grid>
                    {/*Introducido por teclado Dependencia del cliente*/}
                    <Grid xs={6}>
                      <MDBox mb={2} px={2}>
                        {!nuevaDependencia ? (
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Seleccione la Dependencia
                            </InputLabel>
                            <Select
                              sx={{ minHeight: "3rem" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={
                                typeof clientesStore.Dependencia === "string"
                                  ? clientesStore.Dependencia
                                  : clientesStore.Dependencia._id
                              }
                              label="Dependencia"
                              onChange={(e) =>
                                clientesStore.setClientesFields("Dependencia", e.target.value)
                              }
                            >
                              {data.dependencias.map((est) => {
                                return (
                                  <MenuItem value={est._id} key={est._id}>
                                    {est.Dependencia}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        ) : (
                          <MDInput
                            type="text"
                            label="Ingrese la nueva Dependencia"
                            value={clientesStore.nuevaDependencia}
                            onChange={(e) =>
                              clientesStore.setClientesFields("nuevaDependencia", e.target.value)
                            }
                            fullWidth
                            required
                          />
                        )}
                        <FormControlLabel
                          control={
                            <Switch
                              checked={nuevaDependencia}
                              onChange={(e) => setNuevaDependencia(e.target.checked)}
                            />
                          }
                          label="Nueva dependencia"
                        />
                      </MDBox>
                    </Grid>
                    {/*Seleccion Dirección general*/}
                    <Grid xs={6}>
                      <MDBox mb={2} px={2}>
                        {!nuevaDGeneral ? (
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Seleccione la Dirección general
                            </InputLabel>
                            <Select
                              sx={{ minHeight: "3rem" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={
                                typeof clientesStore.Direccion_General === "string"
                                  ? clientesStore.Direccion_General
                                  : clientesStore.Direccion_General._id
                              }
                              label="Estatus"
                              onChange={(e) =>
                                clientesStore.setClientesFields("Direccion_General", e.target.value)
                              }
                            >
                              {data.dgenerales.map((est) => {
                                return (
                                  <MenuItem value={est._id} key={est._id}>
                                    {est.Direccion_General}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        ) : (
                          <MDInput
                            type="text"
                            label="Ingrese la nueva Direccion General"
                            value={clientesStore.nuevaDGeneral}
                            onChange={(e) =>
                              clientesStore.setClientesFields("nuevaDGeneral", e.target.value)
                            }
                            fullWidth
                            required
                          />
                        )}
                        <FormControlLabel
                          control={
                            <Switch
                              checked={nuevaDGeneral}
                              onChange={(e) => setNuevaDGeneral(e.target.checked)}
                            />
                          }
                          label="Nueva Direccion General"
                        />
                      </MDBox>
                    </Grid>
                    {/*Seleccion Dirección area*/}
                    <Grid xs={6}>
                      <MDBox mb={2} px={2}>
                        {!nuevaDArea ? (
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Seleccione la dirección de area
                            </InputLabel>
                            <Select
                              sx={{ minHeight: "3rem" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={
                                typeof clientesStore.direccion_area === "string"
                                  ? clientesStore.direccion_area
                                  : clientesStore.direccion_area._id
                              }
                              label="Estatus"
                              onChange={(e) =>
                                clientesStore.setClientesFields("direccion_area", e.target.value)
                              }
                            >
                              {data.dareas.map((est) => {
                                return (
                                  <MenuItem value={est._id} key={est._id}>
                                    {est.direccion_area}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        ) : (
                          <MDInput
                            type="text"
                            label="Ingrese la nueva Direccion de Area"
                            value={clientesStore.nuevaDArea}
                            onChange={(e) =>
                              clientesStore.setClientesFields("nuevaDArea", e.target.value)
                            }
                            fullWidth
                            required
                          />
                        )}
                        <FormControlLabel
                          control={
                            <Switch
                              checked={nuevaDArea}
                              onChange={(e) => setNuevaDArea(e.target.checked)}
                            />
                          }
                          label="Nueva direccion de Area"
                        />
                      </MDBox>
                    </Grid>
                    <Grid xs={12}>
                      <MDBox mb={2}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Ubicacion del cliente:"
                          multiline
                          value={clientesStore.Ubicacion}
                          onChange={(e) =>
                            clientesStore.setClientesFields("Ubicacion", e.target.value)
                          }
                          rows={5}
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

export default React.memo(VentanaClientes);
