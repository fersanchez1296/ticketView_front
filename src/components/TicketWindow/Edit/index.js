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
          required
        />
      </Grid>
      {/*Fecha limite de resolucion*/}
      <Grid item xs={3}>
        <TextField
          type="text"
          label="Estado:"
          {...form.register("Fecha_limite_resolucion_SLA")}
          disabled
          fullWidth
          required
        />
      </Grid>
      {/*Introducido por teclado NumeroRec_Oficio*/}
      <Grid item xs={4}>
        <TextField
          type="text"
          label="Oficio de recepción:"
          {...form.register("NumeroRec_Oficio")}
          fullWidth
          required
        />
      </Grid>
      {/*Seleccion tipo de ticket tipo de incidencia*/}
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
      {/*Seleccion tipo de ticket tipo de incidencia*/}
      <Grid item xs={4}>
        <FormControl fullWidth error={!!formState.errors.Tipo_incidencia?._id}>
          <InputLabel id="demo-simple-select-label">Tipo de ticket</InputLabel>
          <Select
            sx={{ minHeight: "3rem" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Estatus"
            defaultValue={form.getValues("Tipo_incidencia._id") || ""}
            {...form.register("Tipo_incidencia._id", {
              required: "El tipo de incidencia es requerida",
            })}
          >
            {data.tiposTickets.map((est) => {
              return (
                <MenuItem value={est._id} key={est._id}>
                  {est.Tipo_de_incidencia}
                </MenuItem>
              );
            })}
          </Select>
          {formState.errors.Tipo_incidencia?._id && (
            <FormHelperText>{formState.errors.Tipo_incidencia._id.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {/*Seleccion tipo de Servicio*/}
      <Grid item xs={4}>
        <FormControl fullWidth error={!!formState.Servicio?._id}>
          <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Servicio"
            defaultValue={form.getValues("Servicio._id") || ""}
            {...form.register("Servicio._id", { required: "El servicio es requerido" })}
          >
            {data.servicios.map((est) => {
              return (
                <MenuItem value={est._id} key={est._id}>
                  {est.Servicio}
                </MenuItem>
              );
            })}
          </Select>
          {formState.errors.Servicio?._id && (
            <FormHelperText>{formState.errors.Servicio._id.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {/*Seleccion categoria del ticket*/}
      <Grid item xs={4}>
        <FormControl fullWidth error={!!formState.Categoria?._id}>
          <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Categoría"
            defaultValue={form.getValues("Categoria._id") || ""}
            {...form.register("Categoria._id", { required: "El Categoria es requerido" })}
          >
            {data.categorias.map((est) => {
              return (
                <MenuItem value={est._id} key={est._id}>
                  {est.Categoria}
                </MenuItem>
              );
            })}
          </Select>
          {formState.errors.Categoria?._id && (
            <FormHelperText>{formState.errors.Categoria._id.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {/*Seleccion tipo de subcategoria*/}
      <Grid item xs={4}>
        <FormControl fullWidth error={!!formState.Subcategoria?._id}>
          <InputLabel id="demo-simple-select-label">Subcategoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Subcategoría"
            defaultValue={form.getValues("Subcategoria._id") || ""}
            {...form.register("Subcategoria._id", { required: "El Subcategoria es requerida" })}
          >
            {data.subcategoria.map((est) => {
              return (
                <MenuItem value={est._id} key={est._id}>
                  {est.Subcategoria}
                </MenuItem>
              );
            })}
          </Select>
          {formState.errors.Categoria?._id && (
            <FormHelperText>{formState.errors.Categoria._id.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {/*Introducido por teclado Descripción del ticket*/}
      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-static"
          label="Descripción del ticket"
          multiline
          rows={5.2}
          {...form.register("Descripcion", {
            required: "Es necesario ingresar la descripción del ticket",
          })}
          error={!!formState.errors.Descripcion}
          helperText={formState.errors.Descripcion?.message}
          sx={{ width: "100%" }}
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
