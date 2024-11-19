import React from "react";
import { useLottie } from "lottie-react";
import noData from "assets/animations/noData.animation.json";
import Grid from "@mui/material/Unstable_Grid2";
import MDBox from "components/MDBox";
export const NoData = () => {
  const style = {
    height: 300,
  };
  const options = {
    animationData: noData,
    loop: true,
    style,
  };
  const { View } = useLottie(options);

  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={12} mb={12}>
        <MDBox pt={4} pb={3} px={3}>
          {View}
        </MDBox>
      </Grid>
    </Grid>
  );
};
