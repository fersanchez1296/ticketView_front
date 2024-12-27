import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import SaveIcon from "@mui/material/IconButton";
//store
import { useTicketStore, useDialogStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
//json
import estados from "catalogs/estatus.json";

//Api hook
import { useEditarMutation } from "api/index";

const Cliente = ({ disable_input, data }) => {
  const [putEditar] = useEditarMutation();
  const ticketState = useTicketStore();
  const closeWindowEditar = useDialogStore((state) => state.closeWindowEditar);
  const setTicketFields = useTicketStore((state) => state.setTicketFields);

  const editarTicket = async () => {
    try {
      const result = await putEditar({ ticketState });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        ticketState.resetValues();
        closeWindowEditar();
      }, 2000);
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
                {/*Seleccion secretaria*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Secretaría</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketState.Secretaria._id}
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
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Dirección general</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketState.Direccion_general._id}
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
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Dirección area</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketState.Direccion_area._id}
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
                {/*Introduce el nombre del cliente*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombre_cliente:"
                      value={ticketState.Nombre_cliente}
                      onChange={(e) => setTicketFields("Nombre_cliente", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Teléfono*/}
                <Grid xs={4}>
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
                {/*Introducido por teclado Correo*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <MDInput
                      type="email" // Muestra validación de correo automáticamente
                      label="Correo:"
                      value={ticketState.Correo_cliente}
                      onChange={(e) => setTicketFields("Correo_cliente", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Dependencia del cliente*/}
                <Grid xs={4}>
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
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button
            variant="contained"
            color="success"
            endIcon={<SaveIcon />}
            sx={{ border: "1px dashed green" }}
            onClick={editarTicket}
          >
            Guardar Ticket
          </Button>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

Cliente.propTypes = {
  disable_input: PropTypes.bool,
  data: PropTypes.array,
};

export default React.memo(Cliente);
