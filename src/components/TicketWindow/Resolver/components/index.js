import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
//store
import { useTicketStore } from "zustand/index.ts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const CardResolver = () => {
  const ticket = useTicketStore();
  const setFiles = useTicketStore((state) => state.setFiles);
  const [setedFiles, setSetedFiles] = React.useState(false);
  const Files = useTicketStore((state) => state.Files);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event) => {
    const archivos = Array.from(event.target.files);
    setFiles(archivos[0]);
    setSetedFiles(true);
  };
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={6} mb={12}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="primary"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Resolver Ticket
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                <Grid xs={12}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Nombre resolutor del ticket"
                      value={ticket.Reasignado_a.Nombre}
                      //onChange={(e) => ticket.setTicketFields("Reasignado_a", e.target.value)}
                      fullWidth
                      disabled={true}
                    />
                  </MDBox>
                </Grid>
                <Grid xs={12}>
                  <MDBox mb={2} sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descripción de resolución:"
                      multiline
                      //value={ticket.Descripcion_mandar_a_Escritorio}
                      rows={10}
                      defaultValue="Es necesario incluir una descripción para la resolución del ticket"
                      sx={{ width: "100%" }}
                      onChange={(e) =>
                        ticket.setTicketFields("Descripcion_resolucion", e.target.value)
                      }
                    />
                  </MDBox>
                </Grid>
                <Grid xs={12}>
                  <MDBox mb={2}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      disabled={Files && setedFiles ? true : false}
                      sx={{
                        color: "white", // Color del texto
                        backgroundColor: "#1976d2", // Color de fondo
                        "&:hover": {
                          backgroundColor: "#1565c0", // Color de fondo al pasar el mouse
                        },
                      }}
                    >
                      <MDTypography color="white">
                        {Files && setedFiles ? Files.name : "Subir Archivos"}
                      </MDTypography>
                      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                    </Button>
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

export default React.memo(CardResolver);
