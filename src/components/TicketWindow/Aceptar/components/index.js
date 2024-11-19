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

const AceptarCard = () => {
  const ticket = useTicketStore();
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={12} mb={12}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Resolución aceptada
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Resuelto por:"
                      value={ticket.Resuelto_por.Nombre}
                      fullWidth
                      required
                      disabled={true}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Equipo Asignado:"
                      value={ticket.Resuelto_por.Coordinacion}
                      fullWidth
                      required
                      disabled={true}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={12}>
                  <MDBox mb={2} sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descripción a mandar a Mesa de Servicio"
                      multiline
                      value={ticket.Descripcion_mandar_a_Escritorio}
                      rows={10}
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

export default React.memo(AceptarCard);
