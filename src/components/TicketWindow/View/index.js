import React, { Suspense, lazy } from "react";
//mui library component
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "components/MDButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
const LazyFields = React.lazy(() => import("components/FormFields/Fields"));
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const View = () => {
  const { isWindowOpen, closeWindow } = useDialogStore();
  const ticketStore = useTicketStore();

  const formFields = React.useMemo(
    () => [
      {
        name: "Id",
        label: "ID",
        options: ticketStore.Id,
        gridSize: 1,
        multiline: { state: false },
      },
      {
        name: "Prioridad",
        label: "Prioridad",
        options: ticketStore.Prioridad?.Descripcion,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Fecha_limite_de_resolucion",
        label: "Fecha límite de resolución",
        options: ticketStore.Fecha_limite_resolucion_SLA,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Estado",
        label: "Estado",
        options: ticketStore.Estado?.Estado,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Tipo_incidencia",
        label: "Tipo de incidencia",
        options: ticketStore.Tipo_incidencia?.Tipo_de_incidencia,
        gridSize: 2,
        multiline: { state: false },
      },
      {
        name: "Area",
        label: "Área",
        options: ticketStore.Area_asignado?.Area,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Servicio",
        label: "Servicio",
        options: ticketStore.Servicio?.Servicio,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Categoria",
        label: "Categoría",
        options: ticketStore.Categoria?.Categoria,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Subcategoria",
        label: "Subcategoría",
        options: ticketStore.Subcategoria?.Subcategoria,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Descripcion",
        label: "Descripción",
        options: ticketStore.Descripcion,
        gridSize: 12,
        multiline: { state: true },
      },
      {
        name: "Creado_por",
        label: "Creado por",
        options: ticketStore.Creado_por?.Nombre,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Fecha_creacion",
        label: "Fecha de creación",
        options: ticketStore.Fecha_hora_creacion,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Oficio_de_recepcion",
        label: "Oficio de recepción",
        options: ticketStore.NumeroRec_Oficio,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Oficio_de_cierre",
        label: "Oficio de cierre",
        options: ticketStore.Numero_Oficio,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Resuelto_Por",
        label: "Resuelto Por",
        options: ticketStore.Resuelto_por?.Nombre,
        gridSize: 12,
        multiline: { state: false },
      },
      {
        name: "Cerrado_Por",
        label: "Cerrado Por",
        options: ticketStore.Cerrado_por?.Nombre,
        gridSize: 6,
        multiline: { state: false },
      },
      {
        name: "Fecha_y_hora_de_Cierre",
        label: "Fecha de cierre",
        options: ticketStore.Fecha_hora_cierre,
        gridSize: 6,
        multiline: { state: false },
      },
      {
        name: "Descripcion_de_cierre",
        label: "Descripción de cierre",
        options: ticketStore.Descripcion_cierre,
        gridSize: 12,
        multiline: { state: true },
      },
    ],
    [
      ticketStore.Descripcion_cierre,
      ticketStore.Fecha_hora_cierre,
      ticketStore.Cerrado_por,
      ticketStore.Resuelto_por,
      ticketStore.Numero_Oficio,
      ticketStore.NumeroRec_Oficio,
      ticketStore.Fecha_hora_creacion,
      ticketStore.Creado_por,
      ticketStore.Descripcion,
      ticketStore.Subcategoria,
      ticketStore.Categoria,
      ticketStore.Servicio,
      ticketStore.Area_asignado,
      ticketStore.Tipo_incidencia,
      ticketStore.Estado,
      ticketStore.Fecha_limite_resolucion_SLA,
      ticketStore.Id,
      ticketStore.Prioridad,
    ]
  );

  const moderadorFields = React.useMemo(
    () => [
      {
        name: "Moderador",
        label: "Moderador",
        options: ticketStore.Asignado_a?.Nombre,
        gridSize: 6,
        multiline: { state: false },
      },
      {
        name: "Area_asignado",
        label: "Área moderador",
        options: ticketStore.Area_asignado?.Area,
        gridSize: 6,
        multiline: { state: false },
      },
    ],
    [ticketStore.Asignado_a, ticketStore.Area_asignado]
  );

  const resolutorFields = React.useMemo(
    () => [
      {
        name: "Resolutor",
        label: "Resolutor",
        options: ticketStore.Reasignado_a?.Nombre,
        gridSize: 6,
        multiline: { state: false },
      },
      {
        name: "Area_resolutor",
        label: "Área resolutor",
        options: ticketStore.Area_reasignado_a?.Area,
        gridSize: 6,
        multiline: { state: false },
      },
      {
        name: "Descripcion_resolutor",
        label: "Descripción de cierre del resolutor",
        options: ticketStore.Respuesta_cierre_reasignado,
        gridSize: 12,
        multiline: { state: true },
      },
    ],
    [
      ticketStore.Reasignado_a,
      ticketStore.Area_reasignado_a,
      ticketStore.Respuesta_cierre_reasignado,
    ]
  );

  const clienteFields = React.useMemo(
    () => [
      {
        name: "Nombre_del_cliente",
        label: "Nombre del cliente",
        options: ticketStore.Cliente?.Nombre,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Telefono_del_cliente",
        label: "Teléfono del cliente",
        options: ticketStore.Cliente?.Telefono,
        gridSize: 3,
        multiline: { state: false },
      },
      {
        name: "Extension_del_cliente",
        label: "Extensión",
        options: ticketStore.Cliente?.Extension,
        gridSize: 1,
        multiline: { state: false },
      },
      {
        name: "Correo",
        label: "Correo",
        options: ticketStore.Cliente?.Correo,
        gridSize: 5,
        multiline: { state: false },
      },
      {
        name: "Dependencia",
        label: "Dependencia",
        options: ticketStore.Cliente?.Dependencia?.Dependencia,
        gridSize: 4,
        multiline: { state: false },
      },
      {
        name: "Direccion_General",
        label: "Dirección",
        options: ticketStore.Cliente?.Direccion_General?.Direccion_General,
        gridSize: 4,
        multiline: { state: false },
      },
      {
        name: "Area",
        label: "Área",
        options: ticketStore.Cliente?.direccion_area?.direccion_area,
        gridSize: 4,
        multiline: { state: false },
      },
      {
        name: "Ubicacion",
        label: "Ubicación",
        options: ticketStore.Cliente?.Ubicacion,
        gridSize: 12,
        multiline: { state: true },
      },
    ],
    [ticketStore.Cliente]
  );

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowOpen}
        onClose={() => {
          ticketStore.resetValues();
          closeWindow();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "sticky" }} color="secondary">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                ticketStore.resetValues();
                closeWindow();
              }}
              aria-label="close"
            >
              <CloseIcon />
              <Typography sx={{ ml: 2 }} variant="h4" component="div" color={"White"}>
                Cerrar
              </Typography>
            </IconButton>
            <Typography sx={{ ml: 2 }} variant="h4" component="div" color={"White"}>
              {`Ticket #${ticketStore.Id}-${ticketStore.Estado?.Estado}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Suspense fallback={<div>Loading...</div>}>
          <Box m={1}>
            <Grid container spacing={1}>
              {/* divisor de ticket */}
              <Grid item xs={12}>
                <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
                  <Typography variant="h4" fontWeight="light" color="White" mt={1}>
                    Ticket
                  </Typography>
                </MDBox>
                <Divider />
              </Grid>

              <LazyFields fields={formFields} />

              {/* divisor de Moderador */}
              <Grid item xs={12}>
                <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
                  <Typography variant="h4" fontWeight="light" color="White" mt={1}>
                    Moderador
                  </Typography>
                </MDBox>
                <Divider />
              </Grid>

              <LazyFields fields={moderadorFields} />

              {/* divisor de Resolutor */}
              <Grid item xs={12}>
                <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
                  <Typography variant="h4" fontWeight="light" color="White" mt={1}>
                    Resolutor
                  </Typography>
                </MDBox>
                <Divider />
              </Grid>

              <LazyFields fields={resolutorFields} />

              {/* divisor de Cliente */}
              <Grid item xs={12}>
                <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
                  <Typography variant="h4" fontWeight="light" color="White" mt={1}>
                    Cliente
                  </Typography>
                </MDBox>
                <Divider />
              </Grid>

              <LazyFields fields={clienteFields} />

              {/* divisor de Archivos */}
              <Grid item xs={12}>
                <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
                  <Typography variant="h4" fontWeight="light" color="White" mt={1}>
                    Archivos
                  </Typography>
                </MDBox>
                <Divider />
              </Grid>

              {ticketStore.Files && ticketStore.Files != [] ? (
                ticketStore.Files.map((file) => (
                  <>
                    <Grid item xs={3} key={file._id}>
                      <MDBox mb={1} sx={{ display: "flex", flexDirection: "column" }}>
                        <a href={file.url} target="_blank" rel="noreferrer">
                          <MDButton
                            variant={"contained"}
                            color={"secondary"}
                            startIcon={<VisibilityIcon />}
                          >
                            <Typography color="White">Ver archivo</Typography>
                          </MDButton>
                        </a>
                        <Typography
                          variant="overline"
                          sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                          key={file._id}
                        >
                          {file.name}
                        </Typography>
                      </MDBox>
                    </Grid>
                    <Divider />
                  </>
                ))
              ) : (
                <div>No hay archivos</div>
              )}

              {/* divisor de Historia del ticket */}
              <Grid item xs={12}>
                <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
                  <Typography variant="h4" fontWeight="light" color="White" mt={1}>
                    Historia del ticket
                  </Typography>
                </MDBox>
                <Divider />
              </Grid>

              {ticketStore.Historia_ticket?.map((mensaje) => (
                <Accordion
                  key={mensaje._id}
                  sx={{
                    width: "100%",
                    marginBottom: "1rem",
                    border: "1px solid blue",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <MDBox sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body1">{`${mensaje.Nombre.Nombre}`}</Typography>
                      <Typography variant="overline">{mensaje.Fecha}</Typography>
                    </MDBox>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{mensaje.Mensaje}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Box>
        </Suspense>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(View);
