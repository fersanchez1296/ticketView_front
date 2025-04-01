import React from "react";
//mui library component
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import PropTypes from "prop-types";
import { ArchivosButton } from "components/ArchivosButton/ArchivosButton";
//snackbar store
const Nota = ({ form, formState }) => {
  /* -------------------------------------------------------------------------- */
  // Definición de constantes (rutas, configuraciones)
  /* -------------------------------------------------------------------------- */
  // API Hooks (RTK Query, Axios, etc.)
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
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
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <Grid container spacing={1} m={1}>
      <Grid item xs={12}>
        <TextField
          id="notas"
          label="Notas de diario"
          multiline
          {...form.register("Nota", {
            required: "Es necesario ingresar el texto de la nota",
          })}
          error={!!formState.errors.Nota}
          helperText={formState.errors.Nota?.message}
          rows={15}
          fullWidth
        />
      </Grid>
      <Grid xs={6}>
        <ArchivosButton form={form} formState={formState} />
      </Grid>
    </Grid>
  );
};

Nota.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Nota);
