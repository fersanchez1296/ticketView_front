// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import { Typography } from "@mui/material";
//store
import { useClientesStore, useDialogStore } from "zustand/index.ts";
//api
import { useClientesQuery } from "api/clientesApi";
//Progress
import Progress from "components/Progress";
//mui table
import DataTable from "../../components/DataTable/index";
import React from "react";
import ClientesData from "./data/clientesData";
function Index() {
  const setClientesFields = useClientesStore((state) => state.setClientesFetch);
  const { data: users, refetch, isLoading } = useClientesQuery();
  const dialogStore = useDialogStore();
  if (isLoading) return <Progress />;
  const { columns, rows } = ClientesData(users, setClientesFields, dialogStore);
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={2} pb={2}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              {" "}
              <MDButton
                color={"primary"}
                variant={"contained"}
                onClick={dialogStore.openWindowCrearCliente}
              >
                <Typography component="a" variant="caption" color="White" fontWeight="medium">
                  Registrar Cliente
                </Typography>
              </MDButton>
            </Grid>
            <Grid item xs={2}>
              <MDButton color={"secondary"} variant={"contained"} onClick={() => refetch()}>
                <Typography component="a" variant="caption" color="White" fontWeight="medium">
                  Actualizar
                </Typography>
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={6} pb={1}>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <MDBox mx={2} mt={-3} py={3} px={2} bgColor="primary" borderRadius="lg">
                  <MDTypography variant="h3" color="white">
                    Clientes
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable rows={rows} columns={columns} />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Index;
