import React from "react";
//mui library component
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
const Ver = ({ form, formState }) => {
  return (
    <Grid container spacing={2} m={1}>
      <Grid item xs={6}>
        <TextField fullWidth id="Nombre" label="Nombre" {...form.register("Nombre")} disabled />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth id="Correo" label="Correo" {...form.register("Correo")} disabled />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth id="Area " label="Área" {...form.register("TBArea")} disabled />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth id="Usuario" label="Usuario" {...form.register("Username")} disabled />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth id="Estado" label="Activo" {...form.register("isActive")} disabled />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth id="Rol" label="Rol" {...form.register("Rol.Rol")} disabled />
      </Grid>
    </Grid>
  );
};

Ver.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Ver);
