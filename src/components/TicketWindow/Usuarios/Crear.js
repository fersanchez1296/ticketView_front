import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// Material Dashboard 2 React components
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import FormHelperText from "@mui/material/FormHelperText";
//api hook
import { useGetRolUsuarioQuery } from "api/usuariosApi";

const Crear = ({ form, formState }) => {
  const { data, isLoading } = useGetRolUsuarioQuery();
  if (isLoading) {
    return <div> Cargando... </div>;
  }
  return (
    <React.Fragment>
      <Grid container spacing={1} m={1}>
        {/* Nombre */}
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Nombre:"
            fullWidth
            {...form.register("NombreUsuario", { required: "El nombre del usuario es requerido" })}
            error={!!formState.errors?.NombreUsuario}
            helperText={formState.errors?.NombreUsuario?.message}
            required
          />
        </Grid>
        {/*Input correo*/}
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Correo:"
            {...form.register("CorreoUsuario", { required: "El correo del usuario es requerido" })}
            error={!!formState.errors?.CorreoUsuario}
            helperText={formState.errors?.CorreoUsuario?.message}
            fullWidth
            required
          />
        </Grid>
        {/*Seleccion del rol del usuario*/}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="rol">Rol de usuario</InputLabel>
            <Select
              labelId="rol"
              id="rol"
              label="Rol de usuario"
              defaultValue=""
              {...form.register("rolUsuario", { required: "El rol del usuario es requerido" })}
              error={!!formState.errors.rolUsuario}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {data.roles.map((est) => {
                return (
                  <MenuItem value={est._id} key={est._id}>
                    {est.Rol}
                  </MenuItem>
                );
              })}
            </Select>
            {formState.errors.rolUsuario && (
              <FormHelperText>{<span>{formState.errors.rolUsuario?.message}</span>}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {/*Seleccion del area del usuario*/}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Área</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Coordinacion de usuario"
              defaultValue=""
              {...form.register("areaUsuario", { required: "El área del usuario es requerida" })}
              error={!!formState.errors.areaUsuario}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {data.areas.map((est) => (
                <MenuItem value={est._id} key={est._id}>
                  {est.Area}
                </MenuItem>
              ))}
            </Select>
            {formState.errors.areaUsuario && (
              <FormHelperText>{formState.errors.areaUsuario.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Crear.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Crear);
