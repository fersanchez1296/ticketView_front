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
const PendingReason = ({ form, formState }) => {
  console.log(form);
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
  // Renderizado del componente (return)
  return (
    <Grid container spacing={1} m={1}>
      <Grid item xs={12}>
        <TextField
          id="PendingReason"
          label="Añade la descripción:"
          multiline
          {...form.register("PendingReason", {
            required: "Es necesario ingresar la descripción",
          })}
          error={!!formState.errors.Nota}
          helperText={formState.errors.Nota?.message}
          rows={15}
          fullWidth
          InputLabelProps={{
            style: { color: "black" },
          }}
        />
      </Grid>
    </Grid>
  );
};

PendingReason.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(PendingReason);
