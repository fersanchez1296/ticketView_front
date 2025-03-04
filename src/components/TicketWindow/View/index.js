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
const View = ({ form, formState }) => {
  /* -------------------------------------------------------------------------- */
  // Definición de constantes (rutas, configuraciones)
  const historia = form.getValues("Historia_ticket");
  const files = form.getValues("Files");
  console.log(form.getValues("Medio"));
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
        name: "Prioridad",
        label: "Prioridad",
        gridSize: 1,
        options: form.getValues("Prioridad.Descripcion") ?? "",
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
        gridSize: 3,
        options: form.getValues("Estado.Estado") ?? "",
        multiline: { state: false },
      },
      {
        name: "Tipo_incidencia",
        label: "Tipo de incidencia",
        gridSize: 2,
        options: form.getValues("Tipo_incidencia.Tipo_de_incidencia") ?? "",
        multiline: { state: false },
      },
      {
        name: "Area",
        label: "Área",
        gridSize: 3,
        options: form.getValues("Area.Area") ?? "",
        multiline: { state: false },
      },
      {
        name: "Servicio",
        label: "Servicio",
        gridSize: 3,
        options: form.getValues("Servicio.Servicio") ?? "",
        multiline: { state: false },
      },
      {
        name: "Categoria",
        label: "Categoría",
        gridSize: 3,
        options: form.getValues("Categoria.Categoria") ?? "",
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
        gridSize: 12,
        options: form.getValues("Resuelto_por.Nombre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Cerrado_Por",
        label: "Cerrado Por",
        gridSize: 6,
        options: form.getValues("Cerrado_Por.Nombre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Fecha_y_hora_de_Cierre",
        label: "Fecha de cierre",
        gridSize: 6,
        options: form.getValues("Fecha_y_hora_de_Cierre") ?? "",
        multiline: { state: false },
      },
      {
        name: "Descripcion_de_cierre",
        label: "Descripción de cierre",
        gridSize: 12,
        options: form.getValues("Descripcion_cierre") ?? "",
        multiline: { state: true },
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

      <Grid item xs={12}>
        <MDBox bgColor="primary" borderRadius="lg" p={2} textAlign="left">
          <Typography variant="h4" fontWeight="light" color="White" mt={1}>
            Historia del ticket
          </Typography>
        </MDBox>
        <Divider />
      </Grid>

      {historia?.map((mensaje) => (
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
  );
};

View.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(View);
