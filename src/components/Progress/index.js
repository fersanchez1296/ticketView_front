import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
export default function Progress() {
  return (
    <React.Fragment>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Stack spacing={1} pt={"10%"}>
                <CircularProgress size="7rem" color={"info"} />
              </Stack>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </React.Fragment>
  );
}
