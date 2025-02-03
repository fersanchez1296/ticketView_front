import React, { useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import { styled } from "@mui/material/styles";
//store
import { useCrearTicketStore } from "../store/crearTicket.store.ts";
//proptypes
import PropTypes from "prop-types";
//json
import estados from "catalogs/estatus.json";

const Ticket = ({ disable_input, data }) => {
  const setFiles = useCrearTicketStore((state) => state.crearTicketSetFiles);
  const Files = useCrearTicketStore((state) => state.Files);
  const [setedFiles, setSetedFiles] = React.useState(false);
  const ticketState = useCrearTicketStore();
  //const [file, setFile] = React.useState(null);
  const setCrearTicketFields = useCrearTicketStore((state) => state.setCrearTicketFields);
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
  const seleccionado = ticketState.Prioridad;

  const handleFileChange = (event) => {
    const archivos = Array.from(event.target.files);
    setFiles(archivos[0]);
    setSetedFiles(true);
  };
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      {/*Primer etiqueta */}
      <Grid xs={12} mb={17.5}>
        <Card>
          <MDBox
            //variant="gradient"
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
              Información del ticket
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                {/*Seleccion tipo de ticket tipo de incidencia*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Tipo de incidencia</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketState.Tipo_incidencia}
                        label="Tipo_incidencia"
                        onChange={(e) => setCrearTicketFields("Tipo_incidencia", e.target.value)}
                      >
                        {data.tiposTickets.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Tipo_de_incidencia}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Seleccion Tiempo de respuesta*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="grouped-native-select">Prioridad</InputLabel>
                      <Select
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        label="Prioridad"
                        onChange={(e) => {
                          const [prioridad, tiempo] = e.target.value.split("|");
                          setCrearTicketFields("Prioridad", prioridad);
                          setCrearTicketFields("Fecha_limite_resolucion_SLA", tiempo);
                          setCrearTicketFields("Fecha_limite_respuesta_SLA", tiempo);
                          console.log("Prioridad:", prioridad);
                          console.log(ticketState.Fecha_limite_respuesta_SLA);
                          // Aquí puedes manejar los valores seleccionados, por ejemplo, guardarlos en el estado
                        }}
                      >
                        <option aria-label="None" value="" />
                        {data.prioridades.map((prioridad) => {
                          if (prioridad.Tiempo_respuesta) {
                            return (
                              <optgroup label={prioridad.Descripcion} key={prioridad._id}>
                                {prioridad.Tiempo_respuesta.map((t, index) => (
                                  <option value={`${prioridad._id}|${t}`} key={index}>
                                    {t >= 24 ? `${t / 24} día(s)` : `${t} horas`}
                                  </option>
                                ))}
                              </optgroup>
                            );
                          } else {
                            console.error(
                              "Tiempo_respuesta no está definido en prioridad:",
                              prioridad
                            );
                            return null; // O alguna forma de manejar esta situación
                          }
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Seleccion tipo de Servicio*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketState.Servicio}
                        label="Estatus"
                        onChange={(e) => setCrearTicketFields("Servicio", e.target.value)}
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
                </Grid>
                {/*Seleccion categoria del ticket*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketState.Categoria}
                        label="Estatus"
                        onChange={(e) => setCrearTicketFields("Categoria", e.target.value)}
                      >
                        {data.categorias.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Categoria}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Seleccion tipo de subcategoria*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Subcategoría</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticketState.Subcategoria}
                        label="Estatus"
                        onChange={(e) => setCrearTicketFields("Subcategoria", e.target.value)}
                      >
                        {data.subcategoria.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Subcategoria}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Descripción del ticket*/}
                <Grid xs={12}>
                  <MDBox mb={2}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descripción del ticket"
                      multiline
                      value={ticketState.Descripcion}
                      onChange={(e) => setCrearTicketFields("Descripcion", e.target.value)}
                      rows={5.2}
                      defaultValue="Sin información"
                      sx={{ width: "100%" }}
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado NumeroRec_Oficio*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Oficio de recepción:"
                      value={ticketState.NumeroRec_Oficio}
                      onChange={(e) => setCrearTicketFields("NumeroRec_Oficio", e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Botón para subir archivos*/}
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <Button
                      component="label"
                      variant="outlined"
                      color="primary"
                      size="small"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon color="primary" />}
                      disabled={Files && setedFiles ? true : false}
                    >
                      <MDTypography color="primary">
                        {Files && setedFiles ? Files.name : "Subir Archivos"}
                      </MDTypography>
                      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                    </Button>
                  </MDBox>
                </Grid>
                {Files && setedFiles ? (
                  <Grid item>
                    <MDBox mb={2}>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setFiles(null), setSetedFiles(false);
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
  );
};

Ticket.propTypes = {
  disable_input: PropTypes.bool,
  data: PropTypes.array,
};

export default React.memo(Ticket);
