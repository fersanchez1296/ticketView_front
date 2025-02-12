// Importaciones
import * as React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import View from "components/TicketWindow/View";
import Asignado from "./components/Asignado";
import Cliente from "./components/Cliente";
import Badge from "./components/Badge";
import Progress from "components/Progress";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.)
import { useHistoricoQuery, useGetHistoricoPorAreaQuery } from "api/historicoApi";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
//import { useTicketStore, useDialogStore } from "zustand/index.ts";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
/* -------------------------------------------------------------------------- */
function TicketsUsuario() {
  // Estados locales con useState
  //En este caso se hace primero la declracion de los estados locales
  //debido a que "useGetHistoricoPorAreaQuery" depende del valor local
  //para ejecutarse.
  const [area, setArea] = React.useState("");
  /* -------------------------------------------------------------------------- */
  // API Hooks (RTK Query, Axios, etc.)
  const { data, refetch, isLoading, error } = useHistoricoQuery();
  const {
    data: ticketsArea,
    isLoading: loadingTickets,
    isFetching: fetchingTickets,
    error: errorTickets,
  } = useGetHistoricoPorAreaQuery(area, { skip: !area });
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  //const openWindow = useDialogStore((state) => state.openWindow);
  //const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  React.useEffect(() => {
    if (area) {
      setIsFetching(true);
    }
  }, [area]);
  React.useEffect(() => {
    if (!loadingTickets && !fetchingTickets) {
      setIsFetching(false);
    }
  }, [loadingTickets, fetchingTickets]);
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  const [isFetching, setIsFetching] = React.useState(false);
  if (isFetching) return <Progress />;
  if (isLoading || loadingTickets) return <Progress />;
  if (error || errorTickets) return <div>Error: Recargue la página.</div>;
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
  const handleChange = (value) => setArea(value);
  const handleClickActualizar = () => refetch();
  const areas = data?.areas || [];
  let tickets = ticketsArea || data?.tickets || [];
  const Btn_view = (ticket) => (
    <MDButton
      color="primary"
      variant="contained"
      onClick={() => {
        //setTicketFields(ticket.ticket);
        //openWindow();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        Visualizar
      </MDTypography>
    </MDButton>
  );
  const columnData = [
    {
      field: "visualizar",
      headerName: "Visualizar",
      width: 140,
      renderCell: (params) => <Btn_view ticket={params.row} />,
    },
    { field: "Id", headerName: "ID", width: 90, align: "center" },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Estado?.Estado || "Sin estado"} />,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      width: 130,
      renderCell: (params) => (
        <Badge content={params.row.Prioridad?.Descripcion || "Sin prioridad"} />
      ),
    },
    { field: "Tipo_de_incidencia", headerName: "Tipo", width: 200 },
    {
      field: "Asignado_a",
      headerName: "Asignado a:",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={"team2"}
          nombre={params.row.Asignado_a.Nombre}
          dependencia={params.row.Asignado_a.Area.Area || "Sin dependencia"}
        />
      ),
    },
    {
      field: "Cliente",
      headerName: "Cliente",
      width: 250,
      renderCell: (params) => (
        <Cliente
          nombre={params.row.Cliente.Nombre || "Sin cliente"}
          dependencia={params.row.Cliente.Dependencia.Dependencia || "Sin secretaria"}
        />
      ),
    },
  ];
  const rows = tickets.map((ticket) => ({
    id: ticket.Id,
    estatus: ticket.Estado.Estado,
    Tipo_de_incidencia: ticket.Tipo_incidencia.Tipo_de_incidencia,
    ...ticket,
  }));
  const paginationModel = { page: 0, pageSize: 10 };
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="area-select-label">Selecciona el Usuario</InputLabel>
                <Select
                  labelId="area-select-label"
                  value={area}
                  onChange={(e) => handleChange(e.target.value)}
                  sx={{ minHeight: "3rem" }}
                >
                  {areas.map((a) => (
                    <MenuItem key={a._id} value={a._id}>
                      {a.Area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <MDBox mx={2} mt={-3} py={3} px={2} bgColor="primary" borderRadius="lg">
                  <MDTypography variant="h6" color="white">
                    Tickets por Usuario
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <Paper sx={{ height: 550, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columnData}
                      initialState={{ pagination: { paginationModel } }}
                      pageSizeOptions={[5, 10, 15, 20, 25]}
                      sx={{ border: 0 }}
                    />
                  </Paper>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
      <View />
    </>
  );
}
export default TicketsUsuario;
