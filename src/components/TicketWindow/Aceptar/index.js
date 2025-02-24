import React from "react";
//mui library component
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
const Aceptar = ({ form, formState }) => {
  return (
    <Grid container spacing={2} m={1}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="Resuelto_por"
          label="Resuelto por"
          {...form.register("Resuelto_por.Nombre")}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="Area_resolutor"
          label="Área resolutor"
          {...form.register("Resuelto_por.Area[0].Area")}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="Area_resolutor"
          label="Área resolutor"
          {...form.register("Respuesta_cierre_reasignado", {
            required: "La descripción de cierre es requerida",
          })}
          error={!!formState.errors?.Respuesta_cierre_reasignado}
          helperText={formState.errors?.Respuesta_cierre_reasignado?.message}
          multiline
          rows={6}
          disabled
          placeholder="Ingresa la descripción de cierre del ticket"
        />
      </Grid>
    </Grid>
  );
};

Aceptar.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Aceptar);
