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

const Editar = ({ form, formState }) => {
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
            {...form.register("Nombre", { required: "El nombre del usuario es requerido" })}
            error={!!formState.errors?.Nombre}
            helperText={formState.errors?.Nombre?.message}
            required
          />
        </Grid>
        {/*Input correo*/}
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Correo:"
            {...form.register("Correo", { required: "El correo del usuario es requerido" })}
            error={!!formState.errors?.Correo}
            helperText={formState.errors?.Correo?.message}
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
              defaultValue={form.getValues("Rol._id") || ""}
              {...form.register("Rol._id", { required: "El rol del usuario es requerido" })}
              error={!!(formState.errors.Rol && formState.errors.Rol._id)}
            >
              <MenuItem value={""} key={"empty"}>
                Seleccion el rol
              </MenuItem>
              {data.roles.map((est) => {
                return (
                  <MenuItem value={est._id} key={est._id}>
                    {est.Rol}
                  </MenuItem>
                );
              })}
            </Select>
            {formState.errors.Rol && (
              <FormHelperText>{<span>{formState.errors.Rol._id?.message}</span>}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {/*Seleccion del area del usuario*/}
        <Grid item xs={6}>
          <FormControl fullWidth error={!!formState.errors.Area?.[0]?.["_id"]}>
            <InputLabel id="demo-simple-select-label">Área</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Coordinacion de usuario"
              defaultValue={form.getValues("Area[0]._id") || ""}
              {...form.register("Area[0]._id", { required: "El área del usuario es requerida" })}
            >
              <MenuItem value={""} key={"empty"}>
                Selecciona el área
              </MenuItem>
              {data.areas.map((est) => (
                <MenuItem value={est._id} key={est._id}>
                  {est.Area}
                </MenuItem>
              ))}
            </Select>
            {formState.errors.Area?.[0]?.["_id"] && (
              <FormHelperText>{formState.errors.Area[0]._id.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Editar.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Editar);
