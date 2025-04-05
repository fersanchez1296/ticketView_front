import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// Material Dashboard 2 React components
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
//api hook
import { useGetRolUsuarioQuery } from "api/usuariosApi";

const Editar = ({ form, formState }) => {
  const { data, isLoading } = useGetRolUsuarioQuery();
  console.log(form.watch("Area"));
  if (isLoading) {
    return <div> Cargando... </div>;
  }
  return (
    <React.Fragment>
      <Grid container spacing={1} m={1}>
        {/* Nombre */}
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        {/* Selección de múltiples áreas para edición */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid #d3d3d3",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <FormControl component="fieldset" fullWidth error={!!formState.errors.Area}>
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <FormLabel component="legend">Áreas</FormLabel>
              </Box>
              <FormGroup row sx={{ gap: 2 }}>
                {data.areas.map((area) => (
                  <FormControlLabel
                    key={area._id}
                    control={
                      <Checkbox
                        checked={(form.watch("Area") || []).some(
                          (selectedArea) => selectedArea._id === area._id
                        )} // Comprobar si el objeto está presente por _id
                        onChange={(e) => {
                          const selectedAreas = form.watch("Area") || [];

                          if (e.target.checked) {
                            // Agregar el objeto completo, no solo el _id
                            form.setValue("Area", [
                              ...selectedAreas,
                              ...(!selectedAreas.some((a) => a._id === area._id) ? [area] : []), // Solo agrega si no está ya presente
                            ]);
                          } else {
                            // Eliminar el objeto completo
                            form.setValue(
                              "Area",
                              selectedAreas.filter((selectedArea) => selectedArea._id !== area._id) // Filtrar por _id
                            );
                          }
                        }}
                      />
                    }
                    label={area.Area}
                  />
                ))}
              </FormGroup>
              {formState.errors.Area && (
                <FormHelperText>{formState.errors.Area.message}</FormHelperText>
              )}
            </FormControl>
          </Box>
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
