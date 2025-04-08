import React from "react";
//mui library component
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "components/MDButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Progress from "components/Progress";
import { styled } from "@mui/material/styles";

import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useAuthStore } from "zustand/auth.store.ts";
//Botones
import WindowButton from "components/WindowButton/WindowButton";
import {
  Visibility,
  NoteAdd,
  AssignmentInd,
  Task,
  Edit,
  Email,
  AssignmentReturn,
  ThumbDown,
  ThumbUp,
  DoneAll,
  Replay,
} from "@mui/icons-material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
const CustomTextField = styled(TextField)({
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black !important",
    opacity: 1,
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "black !important",
  },
});
//snackbar store
const View = ({ form, formState }) => {
  //console.log(form.watch());
  const areaModerador =
    form
      .watch("Asignado_a")[0]
      ?.Area.map((area) => area.Area)
      .join(", ") || [];
  const areaResolutor =
    form
      .watch("Reasignado_a")[0]
      ?.Area.map((area) => area.Area)
      .join(", ") || [];
  const areaNames = form.watch("AreaTicket")?.length
    ? form
        .watch("AreaTicket")
        .map((area) => area.Area)
        .join(", ")
    : "";
  /* -------------------------------------------------------------------------- */
  // Definición de constantes (rutas, configuraciones)
  const historia = form.getValues("Historia_ticket");
  const files = form.getValues("files");
  const getReabierto = form.getValues("Reabierto");
  const estadoTicket = form.getValues("Estado.Estado");
  const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  const dialogStore = useDialogStore();
  const { role } = useAuthStore();
  /* -------------------------------------------------------------------------- */
  // API Hooks (RTK Query, Axios, etc.)
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [isLoading, setIsLoading] = React.useState(true);
  /* -------------------------------------------------------------------------- */
  // Hooks de React Hook Form (useForm, useFieldArray, etc.)
  /* -------------------------------------------------------------------------- */
  // React Router DOM (useNavigate, useParams, useLocation)
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  const formFields = React.useMemo(
    () => [
      {
        name: "Id",
        label: "ID",
        gridSize: 1,
        options: form.getValues("Id") ?? "",
        multiline: { state: false },
      },
      {
        name: "Arealocalizacion",
        label: "Área localización",
        gridSize: 3,
        options: areaNames ?? "",
        multiline: { state: false },
      },
      {
        name: "Prioridad",
        label: "Prioridad",
        gridSize: 2,
        options: form.getValues("Subcategoria.Descripcion_prioridad") ?? "",
        multiline: { state: false },
      },
      {
        name: "Medio",
        label: "Medio Contacto",
        gridSize: 2,
        options: form.getValues("Medio.Medio") ?? "",
        multiline: { state: false },
      },
      {
        name: "Fecha_limite_de_resolucion",
        label: "Fecha límite de resolución",
        gridSize: 3,
        options: form.getValues("Fecha_limite_resolucion_SLA") ?? "",
        multiline: { state: false },
      },
      {
        name: "Estado",
        label: "Estado",
        gridSize: 1,
        options: form.getValues("Estado.Estado") ?? "",
        multiline: { state: false },
      },
      {
        name: "Tipo_incidencia",
        label: "Tipo de incidencia",
        gridSize: 2,
        options: form.getValues("Subcategoria.Tipo") ?? "",
        multiline: { state: false },
      },
      {
        name: "Area",
        label: "Área",
        gridSize: 2,
        options: form.getValues("Area.Area") ?? "",
        multiline: { state: false },
      },
      {
        name: "Servicio",
        label: "Servicio",
        gridSize: 2,
        options: form.getValues("Subcategoria.Servicio") ?? "",
        multiline: { state: false },
      },
      {
        name: "Categoria",
        label: "Categoría",
        gridSize: 3,
        options: form.getValues("Subcategoria.Categoría") ?? "",
        multiline: { state: false },
      },
      {
        name: "Subcategoria",
        label: "Subcategoría",
        gridSize: 3,
        options: form.getValues("Subcategoria.Subcategoria") ?? "",
        multiline: { state: false },
      },
      {
        name: "Descripcion",
        label: "Descripción",
        gridSize: 12,
        options: form.getValues("Descripcion") ?? "",
        multiline: { state: true },
      },
      {
        name: "Creado_por",
        label: "Creado por",
        gridSize: 3,
        options: form.getValues("Creado_por.Nombre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Fecha_creacion",
        label: "Fecha de creación",
        gridSize: 3,
        options: form.getValues("Fecha_hora_creacion") ?? "",
        multiline: { state: false },
      },
      {
        name: "Oficio_de_recepcion",
        label: "Oficio de recepción",
        gridSize: 3,
        options: form.getValues("Oficio_de_recepcion") ?? "",
        multiline: { state: false },
      },
      {
        name: "Oficio_de_cierre",
        label: "Oficio de cierre",
        gridSize: 3,
        options: form.getValues("Oficio_de_cierre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Resuelto_Por",
        label: "Resuelto Por",
        gridSize: 6,
        options: form.getValues("Resuelto_por.Nombre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Fecha_resolcución",
        label: "Fecha y hora de resolución",
        gridSize: 6,
        options: form.getValues("Fecha_hora_resolucion") ?? "",
        multiline: { state: false },
      },
      {
        name: "Cerrado_Por",
        label: "Cerrado Por",
        gridSize: 6,
        options: form.getValues("Cerrado_por.Nombre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Fecha_y_hora_de_Cierre",
        label: "Fecha de cierre",
        gridSize: 6,
        options: form.getValues("Fecha_hora_cierre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Descripcion_de_cierre",
        label: "Descripción de cierre",
        gridSize: 6,
        options: form.getValues("Descripcion_cierre") ?? "",
        multiline: { state: true },
      },
      {
        name: "Descripción pendiente",
        label: "Descripción pendiente",
        gridSize: 6,
        options: form.getValues("PendingReason") ?? "",
        multiline: { state: false },
      },
    ],
    []
  );

  const moderadorFields = React.useMemo(
    () => [
      {
        name: "Moderador",
        label: "Moderador",
        gridSize: 6,
        options: form.getValues("Asignado_a[0].Nombre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Area_asignado",
        label: "Área moderador",
        gridSize: 6,
        options: areaModerador ?? "",
        multiline: { state: false },
      },
    ],
    []
  );
  const resolutorFields = React.useMemo(
    () => [
      {
        name: "Resolutor",
        label: "Resolutor",
        gridSize: 6,
        options: form.getValues("Reasignado_a[0].Nombre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Area_resolutor",
        label: "Área resolutor",
        gridSize: 6,
        options: areaResolutor ?? "",
        multiline: { state: false },
      },
      {
        name: "Descripcion_resolutor",
        label: "Descripción de cierre del resolutor",
        gridSize: 12,
        options: form.getValues("Respuesta_cierre_reasignado") ?? "",
        multiline: { state: true },
      },
    ],
    []
  );

  const acciones = (estadoTicket, role) => {
    const accionesBase = [
      {
        field: "Nota",
        headerName: "Nota",
        headerAlign: "center",
        width: 80,
        renderCell: (params) => (
          <WindowButton
            ticket={params.row}
            color="secondary"
            store={setTicketFields}
            openWindow={dialogStore.openWindowNota}
            label="Nota"
          >
            <NoteAdd />
          </WindowButton>
        ),
      },
      {
        field: "Contacto",
        headerName: "Contacto",
        width: 90,
        renderCell: (params) => (
          <WindowButton
            ticket={params.row}
            color="primary"
            store={setTicketFields}
            openWindow={dialogStore.openWindowContacto}
            label="Contacto"
          >
            <Email />
          </WindowButton>
        ),
      },
    ];

    // Mapa de acciones específicas
    const accionesPorEstadoYRol = {
      NUEVOS: {
        Root: [
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowResolver}
                label="Resolver"
              >
                <Task />
              </WindowButton>
            ),
          },
        ],
        Moderador: [
          {
            field: "reasignar",
            headerName: "Reasignar",
            align: "center",
            width: 100,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowReasignar}
                label="Reasignar"
              >
                <AssignmentInd />
              </WindowButton>
            ),
          },
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowResolver}
                label="Resolver"
              >
                <Task />
              </WindowButton>
            ),
          },
          {
            field: "Mesa de Servicio",
            headerName: "Mesa de Servicio",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowMesaServicio}
                label="Regresar a mesa de servicio"
              >
                <AssignmentReturn />
              </WindowButton>
            ),
          },
        ],
      },
      RESUELTOS: {
        Root: [
          {
            field: "Reabrir",
            headerName: "Reabrir",
            width: 80,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowReabrir}
                label="Reabrir"
              >
                <Replay />
              </WindowButton>
            ),
          },
          {
            field: "cerrar",
            headerName: "Cerrar",
            width: 80,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowCloseTicket}
                label="Cerrar"
              >
                <Task />
              </WindowButton>
            ),
          },
        ],
        Moderador: [
          {
            field: "Mesa de Servicio",
            headerName: "Mesa de Servicio",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowMesaServicio}
                label="Regresar a mesa de servicio"
              >
                <AssignmentReturn />
              </WindowButton>
            ),
          },
        ],
      },
      PENDIENTES: {
        Root: [
          {
            field: "regresar",
            headerName: "Regresar",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowRegresar}
                label="Regresar"
              >
                <AssignmentReturn />
              </WindowButton>
            ),
          },
        ],
      },
      STANDBY: {
        Root: [
          {
            field: "Descripción",
            headerName: "R. Pendiente",
            headerAlign: "center",
            width: 120,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowRPendiente}
                label="Razón pendiente"
              >
                <NoteAdd />
              </WindowButton>
            ),
          },
          {
            field: "Asignar",
            headerName: "Asignar",
            width: 80,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowAsignar}
                label="Asignar"
              >
                <AssignmentInd />
              </WindowButton>
            ),
          },
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowResolver}
                label="Resolver"
              >
                <Task />
              </WindowButton>
            ),
          },
          {
            field: "Editar",
            headerName: "Editar",
            width: 80,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowEdit}
                label="Editar"
              >
                <Edit />
              </WindowButton>
            ),
          },
        ],
      },
      CERRADOS: {
        Root: [
          {
            field: "Reabrir",
            headerName: "Reabrir",
            width: 80,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowReabrir}
                label="Reabrir"
              >
                <Replay />
              </WindowButton>
            ),
          },
        ],
      },
      ABIERTOS: {
        Moderador: [
          {
            field: "reasignar",
            headerName: "Reasignar",
            align: "center",
            width: 100,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowReasignar}
                label="Reasignar"
              >
                <AssignmentInd />
              </WindowButton>
            ),
          },
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowResolver}
                label="Resolver"
              >
                <Task />
              </WindowButton>
            ),
          },
          {
            field: "Mesa de Servicio",
            headerName: "Mesa de Servicio",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowMesaServicio}
                label="Regresar a mesa de servicio"
              >
                <AssignmentReturn />
              </WindowButton>
            ),
          },
        ],
        Usuario: [
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowResolver}
                label="Resolver"
              >
                <Task />
              </WindowButton>
            ),
          },
          {
            field: "Pendiente",
            headerName: "Marcar Pendiente",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowPendientes}
                label="Pendiente"
              >
                <PendingActionsIcon />
              </WindowButton>
            ),
          },
          {
            field: "Moderador",
            headerName: "Moderador",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowRegresaraModerador}
                label="Regresar a moderador"
              >
                <AssignmentReturn />
              </WindowButton>
            ),
          },
        ],
      },
      REVISION: {
        Moderador: [
          {
            field: "reasignar",
            headerName: "Reasignar",
            align: "center",
            width: 100,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowReasignar}
                label="Reasignar"
              >
                <AssignmentInd />
              </WindowButton>
            ),
          },
          {
            field: "Aceptar",
            headerName: "Aceptar",
            headerAlign: "center",
            align: "center",
            width: 90,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="success"
                store={setTicketFields}
                openWindow={dialogStore.openWindowAceptar}
                label="Aceptar"
              >
                <ThumbUp />
              </WindowButton>
            ),
          },
          {
            field: "Rechazar",
            headerName: "Rechazar",
            headerAlign: "center",
            align: "center",
            width: 100,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="error"
                store={setTicketFields}
                openWindow={dialogStore.openWindowRechazar}
                label="Rechazar"
              >
                <ThumbDown />
              </WindowButton>
            ),
          },
          {
            field: "Mesa de Servicio",
            headerName: "Mesa de Servicio",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowMesaServicio}
                label="Regresar a mesa de servicio"
              >
                <AssignmentReturn />
              </WindowButton>
            ),
          },
        ],
      },
      REABIERTOS: {
        Moderador: [
          {
            field: "reasignar",
            headerName: "Reasignar",
            align: "center",
            width: 100,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowReasignar}
                label="Reasignar"
              >
                <AssignmentInd />
              </WindowButton>
            ),
          },
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowResolver}
                label="Resolver"
              >
                <Task />
              </WindowButton>
            ),
          },
          {
            field: "Mesa de Servicio",
            headerName: "Mesa de Servicio",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowMesaServicio}
                label="Regresar a mesa de servicio"
              >
                <AssignmentReturn />
              </WindowButton>
            ),
          },
        ],
        Usuario: [
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowResolver}
                label="Resolver"
              >
                <Task />
              </WindowButton>
            ),
          },
          {
            field: "Pendiente",
            headerName: "Marcar Pendiente",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="secondary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowPendientes}
                label="Pendiente"
              >
                {/* <PendingActionsIcon /> */}
              </WindowButton>
            ),
          },
          {
            field: "Moderador",
            headerName: "Moderador",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color="primary"
                store={setTicketFields}
                openWindow={dialogStore.openWindowRegresaraModerador}
                label="Regresar a moderador"
              >
                <AssignmentReturn />
              </WindowButton>
            ),
          },
        ],
      },
    };
    const accionesExtra = accionesPorEstadoYRol[estadoTicket]?.[role] ?? [];
    return [...accionesBase, ...accionesExtra];
  };

  const clienteFields = React.useMemo(
    () => [
      {
        name: "Nombre_del_cliente",
        label: "Nombre del cliente",
        gridSize: 3,
        options: form.getValues("Cliente.Nombre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Telefono_del_cliente",
        label: "Teléfono del cliente",
        gridSize: 3,
        options: form.getValues("Cliente.Telefono") ?? "",
        multiline: { state: false },
      },
      {
        name: "Extension_del_cliente",
        label: "Extensión",
        gridSize: 1,
        options: form.getValues("Cliente.Extension") ?? "",
        multiline: { state: false },
      },
      {
        name: "Correo",
        label: "Correo",
        gridSize: 5,
        options: form.getValues("Cliente.Correo") ?? "",
        multiline: { state: false },
      },
      {
        name: "Dependencia",
        label: "Dependencia",
        gridSize: 4,
        options: form.getValues("Cliente.Dependencia.Dependencia") ?? "",
        multiline: { state: false },
      },
      {
        name: "Direccion_General",
        label: "Dirección",
        gridSize: 4,
        options: form.getValues("Cliente.Direccion_General.Direccion_General") ?? "",
        multiline: { state: false },
      },
      {
        name: "Area",
        label: "Área",
        gridSize: 4,
        options: form.getValues("Cliente.direccion_area.direccion_area") ?? "",
        multiline: { state: false },
      },
      {
        name: "Ubicacion",
        label: "Ubicación",
        gridSize: 12,
        options: form.getValues("Cliente.Ubicacion") ?? "",
        multiline: { state: true },
      },
    ],
    []
  );

  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  if (isLoading) {
    return <Progress open={true} />;
  }
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares

  const sections = [
    { title: "Cliente", fields: clienteFields },
    { title: "Ticket", fields: formFields },
    { title: "Moderador", fields: moderadorFields },
    { title: "Resolutor", fields: resolutorFields },
  ];

  if (getReabierto && getReabierto.length > 0) {
    const reabierto = getReabierto[getReabierto.length - 1];
    const reabiertoFields = [
      {
        name: "Descripcion_reabierto",
        label: "Descripción de reapertura",
        gridSize: 6,
        options: reabierto.Descripcion ?? "",
        multiline: { state: true },
      },
      {
        name: "Fecha_reapertura",
        label: "Fecha de reapertura",
        gridSize: 6,
        options: reabierto.Fecha ?? "",
        multiline: { state: false },
      },
    ];
    sections.splice(1, 0, { title: "Ticket Reabierto", fields: reabiertoFields });
  }
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <Grid container spacing={1} m={1}>
      <Grid item xs={12}>
        <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="center">
          <Typography variant="h5" fontWeight="bold" color="White">
            Acciones
          </Typography>
        </MDBox>
      </Grid>
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        {acciones(estadoTicket, role).map((accion) => (
          <Box key={accion.field} ml={5} mr={5} display="inline-block">
            {accion.renderCell({ row: form.watch() })}
          </Box>
        ))}
      </Grid>
      {sections.map(({ title, fields }) => (
        <React.Fragment key={title}>
          <Grid item xs={12}>
            <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
              <Typography variant="h5" fontWeight="bold" color="White">
                {title}
              </Typography>
            </MDBox>
          </Grid>
          {fields.map((f) => (
            <Grid item xs={f.gridSize} key={f.name}>
              <CustomTextField
                defaultValue={f.options}
                label={f.label}
                fullWidth
                multiline={f.multiline.state}
                disabled
              />
            </Grid>
          ))}
        </React.Fragment>
      ))}
      <Grid item xs={12}>
        <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
          <Typography variant="h5" fontWeight="bold" color="White">
            Archivos
          </Typography>
        </MDBox>
        <Divider />
      </Grid>
      {files && files != [] ? (
        files.map((file) => (
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
          </>
        ))
      ) : (
        <div>No hay archivos</div>
      )}

      <Grid item xs={12}>
        <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
          <Typography variant="h5" fontWeight="bold" color="White">
            Historia del ticket
          </Typography>
        </MDBox>
      </Grid>
      {historia?.map((mensaje) => (
        <Grid item xs={3} key={mensaje._id}>
          <Accordion
            sx={{
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
                <Typography variant="body2">{`${mensaje.Titulo}`}</Typography>
                <Typography variant="overline">{mensaje.Fecha}</Typography>
              </MDBox>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{mensaje.Mensaje}</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};

View.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(View);
