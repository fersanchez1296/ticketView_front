import React from "react";
//mui library component
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
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
//snackbar store
const Viewtareas = ({ form, formState }) => {
  /* -------------------------------------------------------------------------- */
  // Definición de constantes (rutas, configuraciones)
  const historia = form.getValues("Historia_ticket");
  const files = form.getValues("files");
  const getReabierto = form.getValues("Reabierto");
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
        gridSize: 2,
        options: form.getValues("Id") ?? "",
        multiline: { state: false },
      },
      {
        name: "Estado",
        label: "Estado",
        gridSize: 2,
        options: form.getValues("Estado.Estado") ?? "",
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
        name: "Descripcion",
        label: "Descripción de la tarea",
        gridSize: 12,
        options: form.getValues("Descripcion") ?? "",
        multiline: { state: true },
      },
      {
        name: "Fecha_resolcución",
        label: "Fecha y hora de resolución",
        gridSize: 6,
        options: form.getValues("Fecha_hora_resolución") ?? "",
        multiline: { state: false },
      },
      {
        name: "Fecha_resolcución",
        label: "Descripción de resolución",
        gridSize: 6,
        options: form.getValues("Fecha_hora_resolución") ?? "",
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
        options: form.getValues("Asignado_a[0].Area[0].Area") ?? "",
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
        options: form.getValues("Reasignado_a[0].Area[0].Area") ?? "",
        multiline: { state: false },
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
    { title: "Tarea", fields: formFields },
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
      {sections.map(({ title, fields }) => (
        <React.Fragment key={title}>
          <Grid item xs={12}>
            <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
              <Typography variant="h4" fontWeight="light" color="White" mt={1}>
                {title}
              </Typography>
            </MDBox>
            <Divider />
          </Grid>
          {fields.map((f) => (
            <Grid item xs={f.gridSize} key={f.name}>
              <TextField
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
        <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
          <Typography variant="h4" fontWeight="light" color="White" mt={1}>
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
            <Divider />
          </>
        ))
      ) : (
        <div>No hay archivos</div>
      )}
    </Grid>
  );
};

Viewtareas.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Viewtareas);
