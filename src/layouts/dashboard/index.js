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
//React
import { NavLink } from "react-router-dom";
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
import { useDashboardQuery } from "api/dashboardApi";
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
  const comunDashboard = [
    {
      color: "primary",
      icon: "event_available",
      count: data.abiertos,
      nav: "abiertos",
      title: "Abiertos",
      key: "Abiertos",
    },
    {
      color: "secondary",
      icon: "event_repeat",
      count: data.reabiertos,
      nav: "reabiertos",
      title: "Reabiertos",
      key: "Reabiertos",
    },
    {
      color: "primary",
      icon: "event",
      count: data.nuevos,
      nav: "nuevos",
      title: "Nuevos",
      key: "Nuevos",
    },
    {
      color: "primary",
      icon: "pending_actions",
      count: data.pendientes,
      nav: "pendientes",
      title: "Pendientes",
      key: "Pendientes",
    },
    {
      color: "secondary",
      icon: "visibility",
      count: data.revision,
      nav: "revision",
      title: role == "Moderador" ? "Para Revision" : "En revision",
      key: "Revision",
    },
    {
      color: "primary",
      icon: "event_busy",
      count: data.cerrados,
      nav: "cerrados",
      title: "Cerrados",
      key: "cerrados",
    },
  ];
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
          {comunDashboard.map((d) => (
            <Grid item xs={12} md={6} lg={4} key={d.key}>
              <NavLink to={`/${d.nav}`}>
                <ComplexStatisticsCard
                  color={d.color}
                  icon={d.icon}
                  title={d.title}
                  count={d.count}
                  //onClick={() => navigate("/abiertos")}
                  // percentage={{
                  //   color: "success",
                  //   amount: "+55%",
                  //   label: "than lask week",
                  // }}
                />
              </NavLink>
            </Grid>
          ))}

          {/* <Grid item xs={12} md={6} lg={4}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <NavLink to={"/cerrados"}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="event_busy"
                  title="Cerrados"
                  count={data.cerrados}
                  // percentage={{
                  //   color: "success",
                  //   amount: "",
                  //   label: "Just updated",
                  // }}
                />
              </NavLink>
            </MDBox>
          </Grid> */}
        </Grid>
      </MDBox>
      {role != "Root" ? null : (
        <>
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
                    color="primary"
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
                    color="secondary"
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
                    color="primary"
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
                    color="primary"
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
                    color="secondary"
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
                    color="primary"
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
        </>
      )}

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
