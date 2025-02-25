// @mui material components
import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Card from "@mui/material/Card";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// Images
import team2 from "assets/images/team-2.jpg";
//store
import { useClientesStore, useDialogStore } from "zustand/index.ts";
//api
import { useClientesQuery } from "api/clientesApi";
//Progress
import Progress from "components/Progress";
//snackbar
import SuccessSB from "components/Snackbar/success/index";
import ErrorSB from "components/Snackbar/error/index";
//components
import Asignado from "./components/Asignado";
import VentanaClientes from "./components/ventanaClientes";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
function Clientes() {
  // API Hooks (RTK Query, Axios, etc.)
  const { data, refetch, isLoading, error } = useClientesQuery();
  const navigate = useNavigate();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const isWindowClientesOpen = useDialogStore((state) => state.isWindowClientesOpen);
  const openWindowClientes = useDialogStore((state) => state.openWindowClientes);
  const setClientesStore = useClientesStore((state) => state.setClientesFetch);
  const setClientesFields = useClientesStore((state) => state.setClientesFields);
  const successSb = useSnackbarStore((state) => state.successSB);
  const errorSb = useSnackbarStore((state) => state.errorSB);
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  if (isLoading) return <Progress />;
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  const Btn_view = (client) => (
    <MDButton
      color={"primary"}
      variant={"contained"}
      onClick={() => {
        setClientesStore(client.client);
        setClientesFields("isEdit", true);
        openWindowClientes();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Editar`}
      </MDTypography>
    </MDButton>
  );

  let columns: GridColDef[] = [
    {
      field: "Editar",
      headerName: "Editar",
      hideable: false,
      width: 140,
      renderCell: (params) => <Btn_view client={params.row} />,
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 250,
      renderCell: (params) => (
        <Asignado image={team2} nombre={params.row.Nombre} dependencia={params.row.Coordinacion} />
      ),
    },
    { field: "Correo", headerName: "Correo", width: 200 },
    { field: "Telext", headerName: "Teléfono", width: 200 },
    { field: "dependenciaNombre", headerName: "Dependencia", width: 180 },
    { field: "direccionGeneralNombre", headerName: "Direccion General", width: 180 },
    { field: "direccionAreaNombre", headerName: "Direccion de Area", width: 180 },
  ];
  const rows = data.map((cliente) => ({
    ...cliente,
    id: cliente._id,
    Telext: `${cliente.Telefono} - ext: ${cliente.Extension}`,
    direccionAreaNombre: cliente.direccion_area.direccion_area,
    dependenciaNombre: cliente.Dependencia.Dependencia,
    direccionGeneralNombre: cliente.Direccion_General
      ? cliente.Direccion_General.Direccion_General
      : "Sin direccion general",
  }));
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <MDBox mb={6} ml={2}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<PersonAddIcon />}
              sx={{ color: "#7557c1" }}
              onClick={() => openWindowClientes()}
              //disabled={value == null ? true : false}
            >
              Crear Cliente
            </Button>
          </MDBox>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  //variant="gradient"
                  bgColor="primary"
                  borderRadius="lg"
                  //coloredShadow="primary"
                >
                  <MDTypography variant="h6" color="white">
                    Usuarios
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <Paper sx={{ height: 550, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[5, 10, 15, 20, 25]}
                      sx={{ border: 0 }}
                      getRowId={(row) => row._id}
                    />
                  </Paper>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
      {successSb ? <SuccessSB /> : null}
      {errorSb ? <ErrorSB /> : null}
      {isWindowClientesOpen ? <VentanaClientes /> : null}
    </>
  );
}

export default Clientes;
