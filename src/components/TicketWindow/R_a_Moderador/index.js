import React from "react";
//mui library component
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
//snackbar store
const Moderador = ({ form, formState }) => {
  /* -------------------------------------------------------------------------- */
  // Definición de constantes (rutas, configuraciones)
  /* -------------------------------------------------------------------------- */
  // API Hooks (RTK Query, Axios, etc.)
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
      <Grid item xs={12}>
        <TextField
          id="regresar_moderador"
          label="Descripción de retorno"
          multiline
          {...form.register("descripcion_retorno", {
            required: "Es necesario ingresar la descripción",
          })}
          error={!!formState.errors.descripcion_retorno}
          helperText={formState.errors.descripcion_retorno?.message}
          rows={5.2}
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

Moderador.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Moderador);
