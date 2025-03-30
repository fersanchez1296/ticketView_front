import React from "react";
//mui library component
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from "prop-types";
import { useSelectsCrearTicketQuery } from "api/ticketsApi";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { calcularFechaLimite } from "utils/calcularFechaResolucion";
//snackbar store
const EditarTicket = ({ form, formState }) => {
  /* -------------------------------------------------------------------------- */
  // Definición de constantes (rutas, configuraciones)
  /* -------------------------------------------------------------------------- */
  // API Hooks (RTK Query, Axios, etc.)
  const { data, isLoading } = useSelectsCrearTicketQuery();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [Tipo_incidencia, setTipo_incidencia] = React.useState("");
  const [area, setArea] = React.useState("");
  const [servicio, setServicio] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [tiempo, setTiempo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [nuevaFecha, setNuevaFecha] = React.useState("");
  /* -------------------------------------------------------------------------- */
  // Hooks de React Hook Form (useForm, useFieldArray, etc.)
  /* -------------------------------------------------------------------------- */
  // React Router DOM (useNavigate, useParams, useLocation)
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  if (isLoading) {
    return <div> Cargando... </div>;
  }
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
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
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...files];
      form.setValue("Files", updatedFiles);
      return updatedFiles;
    });
  };
  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    form.setValue("Files", newFiles);
  };

  const handleSubcategoriaChange = (e) => {
    setNuevaFecha(e.target.value);
    const selectedSubcategoria = e.target.value;
    const catalogo = data.categorizacion.find((s) => s._id.includes(selectedSubcategoria));
    const tiempo = catalogo.Prioridad;
    console.log(tiempo, catalogo.Equipo._id);
    form.setValue("tiempo", tiempo);
    form.setValue("Area", catalogo.Equipo._id);
    setDescripcion(catalogo.Descripcion_prioridad);
    setCategoria(catalogo["Categoría"]);
    setServicio(catalogo.Servicio);
    setTipo_incidencia(catalogo.Tipo);
    setArea(catalogo.Equipo.Area);

    if (tiempo) {
      const fechaLimite = calcularFechaLimite(tiempo);
      const fechaFormateada = format(fechaLimite, "d 'de' MMMM 'de' yyyy, h:mm a", {
        locale: es,
      });
      setTiempo(fechaFormateada);
    }
  };
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <Grid container spacing={1} m={1}>
      {/*Muestra quien creo el ticket */}
      <Grid item xs={3}>
        <TextField
          type="text"
          label="Creado por:"
          {...form.register("Creado_por.Nombre")}
          fullWidth
          disabled
        />
      </Grid>
      {/*Muestra el ID del ticket */}
      <Grid item xs={3}>
        <TextField
          type="text"
          label="ID:"
          {...form.register("Id")}
          error={!!formState.errors.Nota}
          helperText={formState.errors.Nota?.message}
          disabled
          fullWidth
        />
      </Grid>
      {/*Seleccion tipo de Estado*/}
      <Grid item xs={3}>
        <TextField
          type="text"
          label="Estado:"
          {...form.register("Estado.Estado")}
          disabled
          fullWidth
        />
      </Grid>
      {/*Fecha limite de resolucion*/}
      <Grid item xs={3}>
        <TextField
          type="text"
          label="Actual Fecha límite de resolución:"
          {...form.register("Fecha_limite_resolucion_SLA")}
          disabled
          fullWidth
        />
      </Grid>
      {/*Introducido por teclado NumeroRec_Oficio*/}
      <Grid item xs={4}>
        <TextField
          type="text"
          label="Oficio de recepción:"
          {...form.register("NumeroRec_Oficio")}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth error={!!formState.errors.Medio?._id}>
          <InputLabel id="demo-simple-select-label">Medio de contacto</InputLabel>
          <Select
            sx={{ minHeight: "3rem" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Medio de contacto"
            defaultValue={form.getValues("Medio._id") || ""}
            {...form.register("Medio._id", {
              required: "El medio de contacto es requerido",
            })}
          >
            {data.medios.map((est) => {
              return (
                <MenuItem value={est._id} key={est._id}>
                  {est.Medio}
                </MenuItem>
              );
            })}
          </Select>
          {formState.errors.Tipo_incidencia?._id && (
            <FormHelperText>{formState.errors.Tipo_incidencia._id.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Selecciona la Subcategoría</InputLabel>
          <Select
            autoComplete="off"
            defaultValue={form.getValues("Subcategoria._id") || ""}
            label={"Selecciona la Subcategoría"}
            disabled
            // {...form.register("Subcategoria", {
            //   required: `Es necesario seleccionar la subcategoria`,
            // })}
            // error={!!formState.errors.Subcategoria}
            onChange={handleSubcategoriaChange}
          >
            <MenuItem value="">Seleccionar</MenuItem>
            {data.categorizacion.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.Subcategoria}
              </MenuItem>
            ))}
          </Select>
          {/* {formState.errors?.Subcategoria && (
            <FormHelperText>{formState.errors.Subcategoria.message}</FormHelperText>
          )} */}
        </FormControl>
      </Grid>
      {nuevaFecha !== "" && (
        <>
          <Grid item xs={6}>
            <TextField value={categoria} autoComplete="off" fullWidth disabled label="Categoría" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={servicio} autoComplete="off" fullWidth disabled label="Servicio" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={Tipo_incidencia}
              autoComplete="off"
              fullWidth
              disabled
              label="Tipo de incidente"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField value={area} autoComplete="off" fullWidth disabled label="Área" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={tiempo}
              autoComplete="off"
              fullWidth
              disabled
              label="Nueva Fecha de resolución"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={descripcion}
              autoComplete="off"
              fullWidth
              disabled
              label="Prioridad"
            />
          </Grid>
        </>
      )}

      {/*Introducido por teclado Descripción del ticket*/}
      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-static"
          label="Descripción del ticket"
          multiline
          rows={5.2}
          {...form.register("Descripcion")}
          error={!!formState.errors.Descripcion}
          helperText={formState.errors.Descripcion?.message}
          fullWidth
        />
      </Grid>
      <Grid xs={6}>
        <Button
          component="label"
          variant="outlined"
          color="primary"
          size="small"
          tabIndex={-1}
          startIcon={<CloudUploadIcon color="primary" />}
          // Removemos la deshabilitación para permitir agregar más archivos
        >
          <Typography color="primary">
            {selectedFiles.length > 0
              ? `${selectedFiles.length} archivo(s) seleccionado(s)`
              : "Subir Archivos"}
          </Typography>
          <VisuallyHiddenInput
            {...form.register("Files")}
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </Button>
        <br />
      </Grid>
      {/* Botones de eliminar archivos */}
      {selectedFiles.length > 0 && (
        <Grid item xs={12}>
          <List>
            {selectedFiles.map((file, index) => (
              <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{file.name}</Typography>
                <IconButton color="error" onClick={() => removeFile(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </Grid>
  );
};

EditarTicket.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(EditarTicket);
