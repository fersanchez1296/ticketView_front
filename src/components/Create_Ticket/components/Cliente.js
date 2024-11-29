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
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//store
import { useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";

//api hook
import { useGuardarMutation } from "api/index";

//json
import estados from "catalogs/estatus.json";

const Cliente = ({ disable_input, data }) => {
  const [postGuardar] = useGuardarMutation();
  const ticketState = useTicketStore();
  const setTicketFields = useTicketStore((state) => state.setTicketFields);
  const [Tipo_incidencia] = React.useState(null);
  const [Incidencia_grave] = React.useState(null);
  const [Categoria] = React.useState(null);
  const [Estado] = React.useState(null);
  const [Servicio] = React.useState(null);
  const [Subcategoria] = React.useState(null);
  const [Prioridad] = React.useState(null);
  const [PendingReason] = React.useState(null);
  const [NumeroRec_Oficio] = React.useState(null);
  const [Numero_Oficio] = React.useState(null);
  const [Descripcion] = React.useState(null);
  const [idResolutorSeleccionado, setIdResolutorSeleccionado] = React.useState("");
  const [value, setValue] = React.useState(null);
  const [Secretaria] = React.useState(null);
  const [Direccion_general] = React.useState(null);
  const [Direccion_area] = React.useState(null);
  const guardarTicket = async () => {
    try {
      console.log("Prioridad del ticket:  " + ticketState.Prioridad);

      const result = await postGuardar({
        Tipo_incidencia: Tipo_incidencia,
        Incidencia_grave: Incidencia_grave,
        Categoria: Categoria,
        Estado: Estado,
        Servicio: Servicio,
        Subcategoria: Subcategoria,
        Prioridad: Prioridad,
        PendingReason: PendingReason,
        NumeroRec_Oficio: Numero_Oficio,
        Numero_Oficio: NumeroRec_Oficio,
        Descripcion: Descripcion,
        Secretaria: Secretaria,
        Direccion_general: Direccion_general,
        Direccion_area: Direccion_area,
      });
      console.log(ticketState);
      // setTimeout(() => {
      //   ticketState.resetValues();
      //   closeWindowReasignar();
      // }, 2000);
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
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Secretaría</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.secretarias.Secretaria}
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
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Dirección general</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.direccion_generales.Direccion_General}
                        label="Estatus"
                        onChange={(e) => setTicketFields("Direccion_General", e.target.value)}
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
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Dirección area</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={data.direccion_areas.direccion_area}
                        label="Estatus"
                        onChange={(e) => setTicketFields("direccion_area", e.target.value)}
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
                {/*Seleccion cliente*/}
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombre_cliente:"
                      //value={ticket.Nombre_cliente}
                      //onChange={(e) => ticket.setTicketFields("Nombre_cliente", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <AppBar sx={{ position: "relative" }}>
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
