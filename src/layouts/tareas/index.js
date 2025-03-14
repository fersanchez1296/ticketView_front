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
import { useTicketsQuery } from "api/ticketsApi";
//mui table
import DataTable from "../../components/DataTable/index";
//propTypes
import PropTypes from "prop-types";
//Progress
import Progress from "components/Progress";
import TicketsData from "./data/tareasData";
import { useAuthStore } from "zustand/auth.store.ts";
import { useDialogStore, useTicketStore } from "zustand/index.ts";
function TableDatatareas({ collection }) {
  const { data: tickets, refetch, isLoading, error } = useTicketsQuery({ collection });
  const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  const rol = useAuthStore((state) => state.role);
  const dialogStore = useDialogStore();
  if (isLoading) return <Progress open={true} />;
  if (error) return <div>Error: Reload page</div>;
  const { columns, rows } = TicketsData(tickets, collection, setTicketFields, rol, dialogStore);
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={1}>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <MDBox mx={2} mt={-3} py={3} px={2} bgColor="primary" borderRadius="lg">
                  <MDTypography variant="h3" color="white">
                    Tareas {collection}
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

TableDatatareas.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default TableDatatareas;
