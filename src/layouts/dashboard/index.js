/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

//api hook
import { useDashboardQuery } from "api/index";
import Progress from "components/Progress";
//proptypes
import PropTypes from "prop-types";
//auth store
import { useAuthStore } from "zustand/auth.store.ts";
import { Divider, Typography } from "@mui/material";
//react router dom
import { useNavigate } from "react-router-dom";
const Dashboard_component = ({ data }) => {
  const { role, Nombre } = useAuthStore();
  const { sales, tasks } = reportsLineChartData;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5}>
              <Typography variant={"h2"}>{`Bienvenido(a) ${Nombre}`}</Typography>
            </MDBox>
            <MDBox mb={1.5}>
              <Typography variant={"h4"}>{`Estadistica de tus tickets:`}</Typography>
            </MDBox>
            <Divider />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="event_available"
                title="Abiertos"
                count={data.abiertos}
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="event_repeat"
                title="Reabiertos"
                count={data.reabiertos}
                // percentage={{
                //   color: "success",
                //   amount: "+3%",
                //   label: "than last month",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="event"
                title="Nuevos"
                count={data.nuevos}
                // percentage={{
                //   color: "success",
                //   amount: "+1%",
                //   label: "than yesterday",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="pending_actions"
                title="Pendientes"
                count={data.pendientes}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="visibility"
                title={role == "Moderador" ? "Para Revision" : "En revision"}
                count={data.revision}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="event_busy"
                title="Cerrados"
                count={data.cerrados}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Tickets por area"
                  // description="Last Campaign Performance"
                  // date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                  glosary={[
                    "1-ADMINISTRATIVO",
                    "2-AUDITORÍA DE TI",
                    "3-DC-BASE DE DATOS",
                    "4-DC-CCTV/CDA",
                    "5-DC-INFRAESTRUCTURA",
                    "6-DC-TELEFONÍA",
                    "7-DESARROLLO",
                    "8-DIRECCIÓN",
                    "9-EGRESOS",
                    "10-ESCRITORIO AYUDA",
                    "11-INGRESOS",
                    "12-NÓMINA",
                    "13-PLANEACION TECNOLOGICA",
                    "14-PLANEACION Y PROYECTOS",
                    "15-ST GESTIÓN DE ACCESOS",
                    "16-ST GESTIÓN DE ACTIVOS",
                    "17-ST SOPORTE TI",
                    "18-WEB DESARROLLO",
                    "19-PROYECTOS ESPECIALES",
                    "20-DC-REDES Y TELECOMUNICACIONES",
                  ]}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <MDBox mb={1.5}>
              <Typography variant={"h4"}>{`Historico de tickets:`}</Typography>
            </MDBox>
            <Divider />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="event_available"
                title="Abiertos"
                count={data.totalAbiertos}
                // percentage={{
                //   color: "success",
                //   amount: "+55%",
                //   label: "than lask week",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="event_repeat"
                title="Reabiertos"
                count={data.totalReabiertos}
                // percentage={{
                //   color: "success",
                //   amount: "+3%",
                //   label: "than last month",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="event"
                title="Nuevos"
                count={data.totalNuevos}
                // percentage={{
                //   color: "success",
                //   amount: "+1%",
                //   label: "than yesterday",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="pending_actions"
                title="Pendientes"
                count={data.totalPendientes}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="visibility"
                title={role != "Moderador" ? "Para Revision" : "En revision"}
                count={data.totalRevision}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="event_busy"
                title="Cerrados"
                count={data.totalCerrados}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading } = useDashboardQuery();
  if (isLoading) {
    return <Progress />;
  } else if (data) {
    return <Dashboard_component data={data} />;
  } else {
    navigate("/login");
  }
}

Dashboard_component.propTypes = {
  data: PropTypes.object,
};
export default Dashboard;
