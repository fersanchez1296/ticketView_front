// @mui material components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Card from "@mui/material/Card";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
import { useGetAllUsuariosQuery } from "api/index";
//Progress
import Progress from "components/Progress";
//snackbar
import SuccessSB from "components/Snackbar/success/index";
import ErrorSB from "components/Snackbar/error/index";
//components
import Asignado from "./components/Asignado";
import VentanaUsuario from "./components/ventanaClientes";
import SwitchActive from "./components/switch";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
function Clientes() {
  const isWindowClientesOpen = useDialogStore((state) => state.isWindowClientesOpen);
  const openWindowClientes = useDialogStore((state) => state.openWindowClientes);
  const setClientesStore = useClientesStore((state) => state.setClientesFetch);
  const successSb = useSnackbarStore((state) => state.successSB);
  const errorSb = useSnackbarStore((state) => state.errorSB);
  const { data, refetch, isLoading, error } = useGetAllUsuariosQuery();
  if (isLoading) return <Progress />;
  //   if (error) return <div>Error: Reload page</div>;
  const Btn_view = (client) => (
    <MDButton
      color={"info"}
      variant={"contained"}
      onClick={() => {
        setClientesStore(client.client);
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
      renderCell: (params) => <Btn_view user={params.row} />,
    },
    {
      field: "isActive",
      headerName: "Estado",
      width: 130,
      renderCell: (params) => (
        <SwitchActive isActive={params.row.isActive} userId={params.row._id} />
      ),
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 250,
      renderCell: (params) => (
        <Asignado image={team2} nombre={params.row.Nombre} dependencia={params.row.Coordinacion} />
      ),
    },
    { field: "Username", headerName: "Username", width: 140 },
    { field: "Correo", headerName: "Correo", width: 140 },
    { field: "Coordinacion", headerName: "Coordinación", width: 140 },
    { field: "Area", headerName: "Área", width: 120 },
    { field: "Direccion_general", headerName: "Direccion General", width: 160 },
    { field: "Dependencia", headerName: "Dependencia", width: 140 },
    { field: "Fecha_creacion", headerName: "Fecha alta", width: 140 },
    { field: "Fecha_baja", headerName: "Fecha baja", width: 140 },
  ];
  const rows = data.map((usuario) => ({
    ...usuario,
    id: usuario._id,
    Area: !usuario.Area ? "Sin areas asignadas" : usuario.Area.map((area) => area.Area),
    Username: usuario.Username ? usuario.Username : "Sin usuario",
  }));
  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <MDBox mb={6} ml={2}>
            <Button
              variant="contained"
              color="success"
              endIcon={<PersonAddIcon />}
              sx={{ border: "1px solid green" }}
              //onClick={reasignarTicket}
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
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
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
      {isWindowClientesOpen ? <VentanaUsuario /> : null}
    </>
  );
}

export default Clientes;
