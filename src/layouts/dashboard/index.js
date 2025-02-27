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
//auth store
import { useAuthStore } from "zustand/auth.store.ts";
import { Divider, Typography } from "@mui/material";
//react router dom
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useDashboardQuery();
  const { role, Nombre } = useAuthStore();
  const { sales, tasks } = reportsLineChartData;
  if (isLoading) return <Progress open={true} />;
  if (isError) navigate("/login");

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
  const rootDashboard = [
    {
      color: "primary",
      icon: "event_available",
      count: data.totalAbiertos,
      nav: "abiertos",
      title: "Abiertos",
      key: "Abiertos",
    },
    {
      color: "secondary",
      icon: "event_repeat",
      count: data.totalReabiertos,
      nav: "reabiertos",
      title: "Reabiertos",
      key: "Reabiertos",
    },
    {
      color: "primary",
      icon: "event",
      count: data.totalNuevos,
      nav: "nuevos",
      title: "Nuevos",
      key: "Nuevos",
    },
    {
      color: "primary",
      icon: "pending_actions",
      count: data.totalPendientes,
      nav: "pendientes",
      title: "Pendientes",
      key: "Pendientes",
    },
    {
      color: "secondary",
      icon: "visibility",
      count: data.totalRevision,
      nav: "revision",
      title: role == "Moderador" ? "Para Revision" : "En revision",
      key: "Revision",
    },
    {
      color: "primary",
      icon: "event_busy",
      count: data.totalCerrados,
      nav: "cerrados",
      title: "Cerrados",
      key: "cerrados",
    },
  ];
  if (role === "Usuario") {
    comunDashboard.splice(2, 1);
  }
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
              {rootDashboard.map((d) => (
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
            </Grid>
          </MDBox>
        </>
      )}

      <Footer />
    </DashboardLayout>
  );
}
export default Dashboard;
