import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
//store
import { useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";

const Cliente = ({ disable_input }) => {
  const ticket = useTicketStore();
  console.log(ticket.Cliente);
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={12} mb={12}>
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
              Cliente
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                <Grid xs={3}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombre del cliente:"
                      value={ticket.Cliente.Nombre}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={disable_input}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={3}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Teléfono del cliente:"
                      value={ticket.Cliente.Telefono}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={disable_input}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={3}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Dependencia:"
                      value={ticket.Cliente.Dependencia.Dependencia}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={disable_input}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={3}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Correo del cliente:"
                      value={ticket.Cliente.Correo}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={disable_input}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={3}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Dirección General:"
                      value={ticket.Cliente.Direccion_General.Direccion_General}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={disable_input}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={3}>
                  <MDBox mb={2} sx={{ width: "100%" }}>
                    <MDInput
                      type="text"
                      label="Dirección Área:"
                      value={ticket.Cliente.direccion_area.direccion_area}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
                      disabled={disable_input}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={12}>
                  <MDBox mb={2} sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Ubicación del cliente:"
                      multiline
                      value={ticket.Cliente.Ubicacion}
                      rows={10}
                      sx={{ width: "100%" }}
                      disabled={disable_input}
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

Cliente.propTypes = {
  disable_input: PropTypes.bool,
};

export default React.memo(Cliente);
