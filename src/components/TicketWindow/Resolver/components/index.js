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

const CardResolver = () => {
  const ticket = useTicketStore();
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={6} mb={12}>
        <Card>
          <MDBox
            variant="gradient"
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
              Resolver Ticket
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                <Grid xs={12}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombre resolutor del ticket"
                      value={ticket.Reasignado_a.Nombre}
                      //onChange={(e) => ticket.setTicketFields("Reasignado_a", e.target.value)}
                      fullWidth
                      disabled={true}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={12}>
                  <MDBox mb={2} sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descripción de resolución:"
                      multiline
                      //value={ticket.Descripcion_mandar_a_Escritorio}
                      rows={10}
                      defaultValue="Es necesario incluir una descripción para la resolución del ticket"
                      sx={{ width: "100%" }}
                      onChange={(e) =>
                        ticket.setTicketFields("Descripcion_resolucion", e.target.value)
                      }
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

export default React.memo(CardResolver);
