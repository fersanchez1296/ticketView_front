//React
import * as React from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MDBox from "components/MDBox";
import { Typography } from "@mui/material";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
//store
import { useTicketStore, useDialogStore } from "zustand/index.ts";
//api
import { useTicketsResolutorQuery } from "api/ticketsApi";
import { useGetUsuariosPorAreaModeradorQuery } from "api/usuariosApi";
import Progress from "components/Progress";
//propTypes
import PropTypes from "prop-types";
import DataTable from "components/DataTable";
import TicketsUsuariosData from "./data/ticketsUsuarioData";
function TicketsUsuario() {
  const [resolutor, setResolutor] = React.useState("");
  const dialogStore = useDialogStore();
  const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  const [isFetching, setIsFetching] = React.useState(false);
  const { data, refetch, isLoading, error } = useGetUsuariosPorAreaModeradorQuery();
  const {
    data: ticketsResolutor,
    isLoading: loadingTicketsResolutor,
    isFetching: fetchingTicketsResolutor,
    error: errorTicketResolutor,
  } = useTicketsResolutorQuery(resolutor, { skip: !resolutor });
  const handleChange = (value) => setResolutor(value);

  React.useEffect(() => {
    if (resolutor) {
      setIsFetching(true);
    }
  }, [resolutor]);
  React.useEffect(() => {
    if (!loadingTicketsResolutor && !fetchingTicketsResolutor) {
      setIsFetching(false);
    }
  }, [loadingTicketsResolutor, fetchingTicketsResolutor]);
  if (isFetching) return <Progress />;
  if (isLoading || loadingTicketsResolutor) return <Progress />;
  if (error || errorTicketResolutor) return <div>Error: Recargue la página.</div>;

  const resolutores = data || [];
  let tickets = ticketsResolutor || [];
  const { columns, rows } = TicketsUsuariosData(tickets, setTicketFields, dialogStore);
  console.log(tickets);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={2} pb={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="area-select-label">Selecciona el Usuario</InputLabel>
                <Select
                  labelId="area-select-label"
                  value={resolutor}
                  onChange={(e) => handleChange(e.target.value)}
                  sx={{ minHeight: "3rem" }}
                >
                  {resolutores.map((r) => (
                    <MenuItem key={r._id} value={r._id}>
                      {r.Nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={6} pb={1}>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <MDBox mx={2} mt={-3} py={3} px={2} bgColor="primary" borderRadius="lg">
                  <Typography variant="h3" color="White">
                    Tickets
                  </Typography>
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

export default TicketsUsuario;
