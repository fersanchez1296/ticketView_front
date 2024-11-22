import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
//store
import { useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
//json
import estados from "catalogs/estatus.json";

const Ticket = ({ disable_input }) => {
  const ticket = useTicketStore();
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      {/*Primer etiqueta */}
      <Grid xs={12} mb={17.5}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="dark"
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
                {/*ticket Creado por*/}
                <Grid xs={12}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Creado por:"
                      value={ticket.Creado_por}
                      fullWidth
                      required
                      disabled={disable_input}
                    />
                  </MDBox>
                </Grid>
                {/*Seleccion tipo de ticket tipo de incidencia*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Tipo de ticket</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticket.Estado._id}
                        label="Estatus"
                        onChange={(e) => ticket.setTicketFields("Estado", e.target.value)}
                      >
                        {estados.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Estado}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Seleccion gravedad de la incidencia*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Incidencia grave</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticket.Estado._id}
                        label="Estatus"
                        onChange={(e) => ticket.setTicketFields("Estado", e.target.value)}
                      >
                        {estados.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Estado}
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
                        value={ticket.Estado._id}
                        label="Estatus"
                        onChange={(e) => ticket.setTicketFields("Estado", e.target.value)}
                      >
                        {estados.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Estado}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Seleccion tipo de Estado*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticket.Estado._id}
                        label="Estatus"
                        onChange={(e) => ticket.setTicketFields("Estado", e.target.value)}
                      >
                        {estados.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Estado}
                            </MenuItem>
                          );
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
                        value={ticket.Estado._id}
                        label="Estatus"
                        onChange={(e) => ticket.setTicketFields("Estado", e.target.value)}
                      >
                        {estados.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Estado}
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
                        value={ticket.Estado._id}
                        label="Estatus"
                        onChange={(e) => ticket.setTicketFields("Estado", e.target.value)}
                      >
                        {estados.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Estado}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Seleccion Dirección Prioridad*/}
                <Grid xs={4}>
                  <MDBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Prioridad</InputLabel>
                      <Select
                        sx={{ minHeight: "3rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ticket.Estado._id}
                        label="Estatus"
                        onChange={(e) => ticket.setTicketFields("Estado", e.target.value)}
                      >
                        {estados.map((est) => {
                          return (
                            <MenuItem value={est._id} key={est._id}>
                              {est.Estado}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </MDBox>
                </Grid>
                {/*Pending reason */}
                <Grid xs={8}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Pending Reason:"
                      value={ticket.PendingReason}
                      onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={!disable_input}
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado NumeroRec_Oficio*/}
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="NumeroRec_Oficio:"
                      value={ticket.Asignado_a}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={!disable_input}
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Numero_Oficio*/}
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Numero_Oficio:"
                      value={ticket.Asignado_a}
                      onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={!disable_input}
                    />
                  </MDBox>
                </Grid>
                {/*Introducido por teclado Descripción del ticket*/}
                <Grid xs={12}>
                  <MDBox mb={2}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descripción del ticket"
                      multiline
                      value={ticket.Descripcion_cierre}
                      rows={5.2}
                      defaultValue="Sin información"
                      sx={{ width: "100%" }}
                      disabled={!disable_input}
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

Ticket.propTypes = {
  disable_input: PropTypes.bool,
};

export default React.memo(Ticket);
