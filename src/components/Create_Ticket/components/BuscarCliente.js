import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import SaveIcon from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
//store
import { useCrearTicketStore } from "../store/crearTicket.store.ts";
//proptypes
import PropTypes from "prop-types";
//api hook
import { useGuardarMutation, useLazyGetClienteQuery } from "api/index";

//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const BuscarCliente = ({ disable_input, data }) => {
  const [getCliente] = useLazyGetClienteQuery();
  const crearTicketStore = useCrearTicketStore();
  const crearTicketFields = useCrearTicketStore((state) => state.setCrearTicketFields);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const [clienteExiste, setClienteExiste] = React.useState(false);
  const [nuevaDependencia, setNuevaDependencia] = React.useState(false);

  const buscarCliente = async (correo) => {
    try {
      const result = await getCliente({ Correo: correo });
      console.log(result);
      if (result.data) {
        setClienteExiste(true);
        crearTicketStore.Nombre_cliente = result.data.Nombre;
        crearTicketStore.Telefono_cliente = result.data.Telefono;
        crearTicketStore.Extension_cliente = result.data.Extension;
        crearTicketStore.Direccion_general = result.data.Direccion_General._id;
        crearTicketStore.Direccion_area = result.data.direccion_area._id;
        crearTicketStore.Dependencia_cliente = result.data.Dependencia._id;
        crearTicketStore.Ubicacion_cliente = result.data.Ubicacion;
      }
      setClienteExiste(true);
    } catch (error) {
      console.log(error);
    }
    console.log(crearTicketStore);
  };

  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={12} mb={12}>
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
              Cliente
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                {/*Introducido por teclado Nombre del cliente*/}
                <Grid xs={6} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombre:"
                      disabled={clienteExiste ? true : false}
                      value={crearTicketStore.Nombre_cliente}
                      onChange={(e) => crearTicketFields("Nombre_cliente", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Correo*/}
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <MDInput
                      type="email" // Muestra validación de correo automáticamente
                      label="Correo:"
                      pattern=".+@example\.mx"
                      disabled={clienteExiste ? true : false}
                      value={crearTicketStore.Correo_cliente}
                      onChange={(e) => crearTicketFields("Correo_cliente", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Boton para buscar al cliente*/}
                <Grid xs={6} sx={{ display: !clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <Button
                      variant="contained"
                      color="success"
                      endIcon={<SearchIcon />}
                      disabled={!crearTicketStore.Correo_cliente ? true : false}
                      sx={{ border: "1px dashed green" }}
                      onClick={() => buscarCliente(crearTicketStore.Correo_cliente)}
                    >
                      Buscar Cliente
                    </Button>
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Teléfono*/}
                <Grid xs={6} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <MDInput
                      type="tel" // Tipo tel para mostrar un teclado numérico en móviles
                      label="Teléfono:"
                      disabled={clienteExiste ? true : false}
                      value={crearTicketStore.Telefono_cliente}
                      onChange={(e) => {
                        // Permite solo números y un límite de longitud
                        const input = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
                        crearTicketFields("Telefono_cliente", input);
                      }}
                      inputProps={{
                        maxLength: 10, // Limita el número de caracteres a 10 (ejemplo para teléfonos locales)
                      }}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Extension*/}
                <Grid xs={6} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <MDInput
                      type="tel" // Tipo tel para mostrar un teclado numérico en móviles
                      label="Extension:"
                      disabled={clienteExiste ? true : false}
                      value={crearTicketStore.Extension_cliente}
                      onChange={(e) => {
                        // Permite solo números y un límite de longitud
                        const input = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
                        crearTicketFields("Telefono_cliente", input);
                      }}
                      inputProps={{
                        maxLength: 10, // Limita el número de caracteres a 10 (ejemplo para teléfonos locales)
                      }}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Seleccion Dirección general*/}
                <Grid xs={6} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Dirección general</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={clienteExiste ? true : false}
                        value={crearTicketStore.Direccion_general}
                        label="Estatus"
                        onChange={(e) => crearTicketFields("Direccion_general", e.target.value)}
                      >
                        {data.direccion_generales.map((est) => {
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
                {/*Seleccion Dirección area*/}
                <Grid xs={6} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Dirección area</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={clienteExiste ? true : false}
                        value={crearTicketStore.Direccion_area}
                        label="Estatus"
                        onChange={(e) => crearTicketFields("Direccion_area", e.target.value)}
                      >
                        {data.direccion_areas.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.direccion_area}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Dependencia del cliente*/}
                <Grid xs={6} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Dependencia</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={clienteExiste ? true : false}
                        value={crearTicketStore.Dependencia_cliente}
                        label="Dependencia"
                        onChange={(e) =>
                          crearTicketStore.setClientesFields("Dependencia", e.target.value)
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
                  </MDBox>
                </Grid>
                {/*Introducido por teclado ubicacion del cliente*/}
                <Grid xs={12} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Ubicacion del cliente:"
                      multiline
                      value={crearTicketStore.Ubicacion_cliente}
                      disabled={clienteExiste ? true : false}
                      onChange={(e) => crearTicketFields("Descripcion", e.target.value)}
                      rows={5.2}
                      defaultValue="Sin información"
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
  );
};

BuscarCliente.propTypes = {
  disable_input: PropTypes.bool,
  data: PropTypes.array,
};

export default React.memo(BuscarCliente);
