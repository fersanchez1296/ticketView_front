import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
//store
import { useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const Archivos = () => {
  const ticketStore = useTicketStore();
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={12} mb={12}>
        <Card>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                <Grid xs={12}>
                  <MDBox mb={2}>
                    {ticketStore.Files && ticketStore.Files != [] ? (
                      ticketStore.Files.map((file) => (
                        <>
                          <Typography key={file._id}>{file.name}</Typography>
                          <Grid item key={file._id}>
                            <MDBox mb={1}>
                              <a href={file.url} target="_blank" rel="noreferrer">
                                <MDButton
                                  variant={"contained"}
                                  color={"primary"}
                                  startIcon={<VisibilityIcon />}
                                >
                                  <MDTypography color="gray">Ver archivo.</MDTypography>
                                </MDButton>
                              </a>
                            </MDBox>
                          </Grid>
                          <Divider />
                        </>
                      ))
                    ) : (
                      <div>No hay archivos</div>
                    )}
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
};

export default React.memo(Archivos);
