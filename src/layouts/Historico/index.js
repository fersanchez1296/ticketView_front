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
import { useHistoricoQuery, useGetHistoricoPorAreaQuery } from "api/historicoApi";
import Progress from "components/Progress";
//propTypes
import PropTypes from "prop-types";
import DataTable from "components/DataTable";
import HistoricaData from "./data/historicoData";
function Historico({ collection }) {
  const [area, setArea] = React.useState("");
  const dialogStore = useDialogStore();
  const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  const [isFetching, setIsFetching] = React.useState(false);
  const { data, refetch, isLoading, error } = useHistoricoQuery();
  const {
    data: ticketsArea,
    isLoading: loadingTickets,
    isFetching: fetchingTickets,
    error: errorTickets,
  } = useGetHistoricoPorAreaQuery(area, { skip: !area });
  const handleChange = (value) => setArea(value);

  React.useEffect(() => {
    if (area) {
      setIsFetching(true);
    }
  }, [area]);

  React.useEffect(() => {
    if (!loadingTickets && !fetchingTickets) {
      setIsFetching(false);
      setArea("");
    }
  }, [loadingTickets, fetchingTickets]);
  if (isFetching) return <Progress />;
  if (isLoading || loadingTickets) return <Progress />;
  if (error || errorTickets) return <div>Error: Recargue la página.</div>;

  const areas = data?.areas || [];
  let tickets = ticketsArea || data?.tickets || [];
  const { columns, rows } = HistoricaData(tickets, setTicketFields, dialogStore);
  console.log(tickets);
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={2} pb={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
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
              <MDButton color={"secondary"} variant={"contained"} onClick={() => refetch()}>
                <Typography component="a" variant="caption" color="White" fontWeight="medium">
                  Actualizar ventana
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

Historico.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default Historico;
