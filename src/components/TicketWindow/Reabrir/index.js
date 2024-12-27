import React from "react";
//mui library component
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
//api hook
import { usePutReasignarMutation } from "api/index";
import { usePutReabrirMutation } from "api/index";
//card components
import CardUsers from "./components/index";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useGetUsuariosQuery } from "api";
import { setDirection } from "context";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Reabrir = () => {
  const [putReabrir] = usePutReabrirMutation();
  const { data, isLoading } = useGetUsuariosQuery();
  const isWindowReabrirOpen = useDialogStore((state) => state.isWindowReabrirOpen);
  const closeWindowReabrir = useDialogStore((state) => state.closeWindowReabrir);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const ticketState = useTicketStore();
  const [idResolutorSeleccionado, setIdResolutorSeleccionado] = React.useState("");
  const [Asignado_a, setAsignado_a] = React.useState(null);
  const [Descripcion_reabrir, setDescripcion_reabrir] = React.useState(null);
  if (isLoading) return <p>Cargando...</p>;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const reabrirTicket = async () => {
    try {
      const result = await putReabrir({
        _id: ticketState._id,
        Descripcion_reabrir,
        Descripcion_cierre: ticketState.Descripcion_cierre,
        Descripcion: ticketState.Descripcion,
        Asignado_a,
      });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
      }
      setTimeout(() => {
        ticketState.resetValues();
        closeWindowReabrir();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const options = data.AREASRESOLUTORES.flatMap((areaObj) =>
    areaObj.resolutores.map((resolutor) => ({
      ...resolutor,
      area: areaObj.area.toUpperCase(), // Incluye el área en mayúsculas para agrupar.
    }))
  );

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowReabrirOpen}
        onClose={() => {
          ticketState.resetValues();
          closeWindowReabrir();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                ticketState.resetValues();
                closeWindowReabrir();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cerrar
            </Typography>
            <Button
              variant="contained"
              color="success"
              endIcon={<SaveIcon />}
              sx={{ border: "1px dashed green" }}
              onClick={reabrirTicket}
              disabled={Asignado_a == null ? true : false}
            >
              Reabrir Ticket
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Grid xs={12}>
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
                  Reapertura de Ticket
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {ticketState.Reasignado_a ? (
                    <Typography sx={{ flex: 1.5 }} variant="body1" component="p">
                      Asignado final : {ticketState.Reasignado_a.Nombre}
                    </Typography>
                  ) : null}
                  <Autocomplete
                    id="grouped-demo"
                    options={options.sort((a, b) => -b.area.localeCompare(a.area))}
                    groupBy={(option) => option.area}
                    getOptionLabel={(option) => option.Nombre}
                    sx={{ width: 500, mt: 5 }}
                    renderInput={(params) => <TextField {...params} label="Asignar a:" />}
                    onChange={(event, Asignado_a) => {
                      setAsignado_a(Asignado_a); // Guarda el valor seleccionado en el estado.
                    }}
                  />
                </Box>
                {/*Introducido por teclado Descripción del ticket*/}
                <Grid xs={12}>
                  <MDBox mb={2} mt={2} ml={45.5}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Descripción reapuertura de ticket"
                      multiline
                      value={Descripcion_reabrir}
                      onChange={(e) => setDescripcion_reabrir(e.target.value)}
                      rows={5.2}
                      defaultValue="Sin información"
                      sx={{ width: "58%" }}
                    />
                  </MDBox>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(Reabrir);
