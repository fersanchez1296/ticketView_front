//React
import * as React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Material Dashboard 2 React components
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
//store
import { useTicketStore, useDialogStore } from "zustand/index.ts";
//api
import { useGetAreasCoordinacionQuery, useGetHistoricoAreaQuery } from "api/index";
//components
import Asignado from "./components/Asignado";
import Cliente from "./components/Cliente";
import Badge from "./components/Badge";
import Progress from "components/Progress";
import debounce from "lodash.debounce";
//propTypes
import PropTypes from "prop-types";

function Coordinacion({ collection }) {
  const [area, setArea] = React.useState("");
  const openWindow = useDialogStore((state) => state.openWindow);
  const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  const [isFetching, setIsFetching] = React.useState(false);
  const { data, refetch, isLoading, error } = useGetAreasCoordinacionQuery();
  const {
    data: ticketsArea,
    isLoading: loadingTickets,
    isFetching: fetchingTickets,
    error: errorTickets,
  } = useGetHistoricoAreaQuery(area, { skip: !area });
  console.log(ticketsArea);
  const handleChange = (value) => setArea(value);

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
  if (isFetching) return <Progress />;
  if (isLoading || loadingTickets) return <Progress />;
  if (error || errorTickets) return <div>Error: Recargue la página.</div>;

  const areas = data?.areas || [];
  let tickets = ticketsArea || data?.tickets || [];

  const handleClickActualizar = () => refetch();

  const Btn_view = (ticket) => (
    <MDButton
      color="info"
      variant="contained"
      onClick={() => {
        setTicketFields(ticket.ticket);
        openWindow();
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
    {
      field: "Asignado_final_a",
      headerName: "Asignado a",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={"team2"} // Cambia si deseas imágenes dinámicas
          nombre={
            params.row.Asignado_final_a ? params.row.Asignado_final_a.Nombre : "Sin Resolutor"
          }
          dependencia={
            params.row.Asignado_final_a ? params.row.Asignado_final_a.Coordinacion : "Sin Area"
          }
        />
      ),
    },
    {
      field: "Cliente",
      headerName: "Cliente",
      width: 250,
      renderCell: (params) => (
        <Cliente
          nombre={params.row.Nombre_cliente ? params.row.Nombre_cliente : "Sin cliente"}
          dependencia={params.row.Secretaria ? params.row.Secretaria.Secretaria : "Sin secretaria"}
        />
      ),
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
    { field: "Tipo_de_incidencia", headerName: "Tipo", width: 150 },
    { field: "Fecha_hora_creacion", headerName: "Creado", width: 250 },
    { field: "Fecha_hora_cierre", headerName: "Finalizado", width: 250 },
  ];

  const rows = tickets.map((ticket) => ({
    id: ticket.Id,
    estatus: ticket.Estado.Estado,
    Tipo_de_incidencia: ticket.Tipo_incidencia.Tipo_de_incidencia,
    ...ticket,
  }));

  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="area-select-label">Selecciona el Área</InputLabel>
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
                    Histórico de Tickets
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
    </>
  );
}

Coordinacion.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default Coordinacion;
