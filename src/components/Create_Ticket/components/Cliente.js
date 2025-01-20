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
//store
import { useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
//api hook
import { useGuardarMutation, useLazyGetClienteQuery } from "api/index";

//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const Cliente = ({ disable_input, data }) => {
  const [getCliente] = useLazyGetClienteQuery();
  const [postGuardar] = useGuardarMutation();
  const ticketState = useTicketStore();
  const archivo = useTicketStore((state) => state.Files);
  const setTicketFields = useTicketStore((state) => state.setTicketFields);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const [clienteExiste, setClienteExiste] = React.useState(false);

  const buscarCliente = async (correo) => {
    try {
      const result = await getCliente(correo);
      if (result.data) {
        setClienteExiste(true);
        ticketState.Nombre_cliente = result.data.Nombre;
        ticketState.Telefono_cliente = result.data.Telefono;
        ticketState.Extension_cliente = result.data.Extension;
        ticketState.Secretaria = result.data.Secretaria._id;
        ticketState.Direccion_general = result.data.Direccion_General._id;
        ticketState.Direccion_area = result.data.direccion_area._id;
        ticketState.Dependencia = result.data.Dependencia._id; //TODO pendiente de hacer un select
        ticketState.Ubicacion_cliente = result.data.Ubicacion;
      }
    } catch (error) {
      console.log(error);
    }
    console.log(ticketState);
  };

  const guardarTicket = async () => {
    const formData = new FormData();
    try {
      formData.append("ticketState", JSON.stringify(ticketState));
      //console.log(archivo);
      // Adjunta el archivo directamente
      if (archivo instanceof File) {
        formData.append("file", archivo);
      } else {
        console.error("El archivo no es válido:", archivo);
      }
      const result = await postGuardar(formData);
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        ticketState.resetValues();
      }
    } catch (error) {
      console.log(error);
    }
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
                      value={ticketState.Nombre_cliente}
                      onChange={(e) => setTicketFields("Nombre_cliente", e.target.value)}
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
                      value={ticketState.Correo_cliente}
                      onChange={(e) => setTicketFields("Correo_cliente", e.target.value)}
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
                      sx={{ border: "1px dashed green" }}
                      onClick={() => buscarCliente(ticketState.Correo_cliente)}
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
                      value={ticketState.Telefono_cliente}
                      onChange={(e) => {
                        // Permite solo números y un límite de longitud
                        const input = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
                        setTicketFields("Telefono_cliente", input);
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
                      value={ticketState.Extension_cliente}
                      onChange={(e) => {
                        // Permite solo números y un límite de longitud
                        const input = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
                        setTicketFields("Telefono_cliente", input);
                      }}
                      inputProps={{
                        maxLength: 10, // Limita el número de caracteres a 10 (ejemplo para teléfonos locales)
                      }}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Seleccion secretaria*/}
                <Grid xs={6} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Secretaría</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketState.Secretaria}
                        label="Secretaría"
                        onChange={(e) => setTicketFields("Secretaria", e.target.value)}
                      >
                        {data.secretarias.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Secretaria}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
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
                        value={ticketState.Direccion_general}
                        label="Estatus"
                        onChange={(e) => setTicketFields("Direccion_general", e.target.value)}
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
                        value={ticketState.Direccion_area}
                        label="Estatus"
                        onChange={(e) => setTicketFields("Direccion_area", e.target.value)}
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
                    <MDInput
                      type="text"
                      label="Dependencia:"
                      value={ticketState.Dependencia_cliente}
                      onChange={(e) => setTicketFields("Dependencia_cliente", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado ubicacion del cliente*/}
                <Grid xs={12} sx={{ display: clienteExiste ? "block" : "none" }}>
                  <MDBox mb={2}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Ubicacion del cliente:"
                      multiline
                      value={ticketState.Ubicacion_cliente}
                      onChange={(e) => setTicketFields("Descripcion", e.target.value)}
                      rows={5.2}
                      defaultValue="Sin información"
                      sx={{ width: "100%" }}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              {/*Botón que envía los daots que se guardan en ticketSatate mediante un post */}
              <AppBar sx={{ position: "relative", display: clienteExiste ? "block" : "none" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<SaveIcon />}
                    sx={{ border: "1px dashed green" }}
                    onClick={guardarTicket}
                  >
                    Guardar Ticket
                  </Button>
                </Toolbar>
              </AppBar>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
};

Cliente.propTypes = {
  disable_input: PropTypes.bool,
  data: PropTypes.array,
};

export default React.memo(Cliente);
