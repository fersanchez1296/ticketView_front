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
        <TextField
          fullWidth
          id="Telefono"
          label="Teléfono"
          {...form.register("Telefono")}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="Extension"
          label="Extensión"
          {...form.register("Extension")}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="Dependencia"
          label="Dependencia"
          {...form.register("TBDependencia")}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="Direccion_general"
          label="Dirección General"
          {...form.register("TBDGeneral")}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="Direccion_area"
          label="Dirección de Área"
          {...form.register("TBDArea")}
          disabled
        />
      </Grid>
    </Grid>
  );
};

Ver.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Ver);
