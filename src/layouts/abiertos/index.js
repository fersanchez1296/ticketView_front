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
//store
import { useTicketStore, useDialogStore } from "zustand/index.ts";
//api
import { useGetTicketsAbiertosQuery } from "api/index";
import { useTicketsQuery } from "api/ticketsApi";
//mui table
import DataTable from "components/Table/index";
//propTypes
import PropTypes from "prop-types";
//view component
import View from "components/TicketWindow/View";
import Edit from "components/TicketWindow/Edit";
import Cerrar from "components/TicketWindow/Cerrar";
// import Reabrir from "components/TicketWindow/Reabrir";
import VentanaAcciones from "components/VentanaAcciones";
import Reasignar from "components/TicketWindow/Reasignar";
import Resolver from "components/TicketWindow/Resolver";
import Aceptar from "components/TicketWindow/Aceptar";
import Rechazar from "components/TicketWindow/Rechazar";
import Reabrir from "components/TicketWindow/Reabrir";
//Progress
import Progress from "components/Progress";
//snackbar
import SuccessSB from "components/Snackbar/success/index";
import ErrorSB from "components/Snackbar/error/index";
function TableData({ collection }) {
  const { data: tickets, refetch, isLoading, error } = useTicketsQuery({ collection });
  if (isLoading) return <Progress />;
  if (error) return <div>Error: Reload page</div>;
  const handleClickActualizar = () => {
    refetch();
  };
  console.log(tickets);
  return (
    <>
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
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Tickets {collection}
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable tickets={tickets} collection={collection} />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
      {/* <SuccessSB />
      <ErrorSB />
      <View />
      {isWindowEditOpen && <Edit />}
      {isWindowReabrirOpen && (
        <VentanaAcciones
          title={"Reabrir Ticket"}
          isOpen={isWindowReabrirOpen}
          onClose={closeWindowReabrir}
        >
          {<Reabrir />}
        </VentanaAcciones>
      )}
      {isWindowCloseTicketOpen && <Cerrar />}
      {isWindowReasignarOpen && <Reasignar />}
      {isWindowResolverOpen && <Resolver />}
      {isWindowAceptarOpen && <Aceptar />}
      {isWindowRechazarOpen && <Rechazar />} */}
    </>
  );
}

TableData.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default TableData;
