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
  console.log(ticket);
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
                <Grid xs={3}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombre del cliente:"
                      value={ticket.Nombre_cliente}
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
                      value={ticket.Telefono_cliente}
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
                      value={ticket.Dependencia_cliente}
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
                      value={ticket.Correo_cliente}
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
                      label="Secretaría:"
                      value={ticket.Secretaria.Secretaria}
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
                      value={ticket.Direccion_general.Direccion_General}
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
                      value={ticket.Direccion_area}
                      //onChange={(e) => setEditor("editor", e.target.value)}
                      fullWidth
                      required
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
