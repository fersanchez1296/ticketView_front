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
//import DataTable from "examples/Tables/DataTable";
// Data
import abiertosTableData from "layouts/abiertos/data/abiertosTableData";
//store
import { useTicketStore, useDialogStore } from "zustand/index.ts";
//api
import { useGetTicketsAbiertosQuery } from "api/index";
//mui table
import DataTable from "components/Table/index";
//propTypes
import PropTypes from "prop-types";

function TableData({ collection }) {
  const openWindow = useDialogStore((state) => state.openWindow);
  const setTicketFields = useTicketStore((state) => state.setTicketFields);
  const { data: tickets, refetch, isLoading, error } = useGetTicketsAbiertosQuery({ collection });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const handleClickActualizar = () => {
    refetch();
  };
  // const { columns, rows } = abiertosTableData(tickets, openWindow, setTicketFields);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
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
                  Tickets Abiertos
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns, rows }}
                  canSearch
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                /> */}
                <DataTable tickets={tickets} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

TableData.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default TableData;
