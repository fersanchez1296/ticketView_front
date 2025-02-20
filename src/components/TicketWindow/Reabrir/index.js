import React from "react";
//mui library component
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useReabrirFieldsQuery } from "api/ticketsApi";
import Progress from "components/Progress";
const Reabrir = ({ form, formState }) => {
  const [reabrirNuevaInfo, setReabrirNuevaInfo] = React.useState(false);
  const { data, isLoading } = useReabrirFieldsQuery(undefined, { skip: !reabrirNuevaInfo });
  if (isLoading) return <Progress />;
  return (
    <Grid container spacing={2} m={1}>
      <Grid item xs={12}>
        <FormGroup>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography>Reabrir con información existente</Typography>
              <Switch
                checked={reabrirNuevaInfo}
                onChange={(e) => {
                  setReabrirNuevaInfo(!reabrirNuevaInfo);
                }}
              />
              <Typography>Reabrir con nueva información</Typography>
            </Box>
          </Stack>
        </FormGroup>
      </Grid>
      {!reabrirNuevaInfo && (
        <>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="prioridad"
              label="Prioridad"
              {...form.register("Prioridad")}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="Moderador"
              label="Moderador"
              {...form.register("Asignado_a.Nombre")}
              disabled
            />
          </Grid>
        </>
      )}
      {reabrirNuevaInfo && (
        <>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="prioridad">Prioridad</InputLabel>
              <Select
                native
                id="prioridad"
                label="Prioridad"
                {...form.register("prioridad", {
                  required: "Es necesario seleccionar la prioridad",
                })}
                error={!!formState.errors.prioridad}
                disabled={!reabrirNuevaInfo ?? true}
              >
                <option aria-label="None" value="" />
                {data.prioridades.map((prioridad) => {
                  if (prioridad.Tiempo_respuesta) {
                    return (
                      <optgroup label={prioridad.Descripcion} key={prioridad._id}>
                        {prioridad.Tiempo_respuesta.map((t, index) => (
                          <option value={`${prioridad._id}|${t}`} key={index}>
                            {t >= 24 ? `${t / 24} día(s)` : `${t} horas`}
                          </option>
                        ))}
                      </optgroup>
                    );
                  } else {
                    return <option aria-label="No se está leyendo" value="0" key={0} />;
                  }
                })}
              </Select>
              {formState.errors.prioridad && (
                <FormHelperText>{formState.errors.prioridad.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="moderador">Moderador</InputLabel>
              <Select
                native
                id="moderador"
                label="Moderador"
                {...form.register("asignado_a", {
                  required: "Es necesario seleccionar un moderador.",
                })}
                error={!!formState.errors.Asignado_a}
                disabled={!reabrirNuevaInfo ?? true}
              >
                <option aria-label="None" value="" />
                {data.moderadores.map((area) => {
                  if (area) {
                    return (
                      <optgroup label={area.area.area} key={area.area._id}>
                        {area.resolutores.map((t, index) => (
                          <option value={`${t._id}|${area.area._id}`} key={index}>
                            {t.Nombre}
                          </option>
                        ))}
                      </optgroup>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
              {formState.errors.Asignado_a && (
                <FormHelperText>
                  {<span>{formState.errors.Asignado_a?.message}</span>}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </>
      )}

      <Grid item xs={12}>
        <TextField
          fullWidth
          id="descripcion"
          label="Descripción del ticket"
          {...form.register("Descripcion", { required: "La descripción es requerida" })}
          error={!!formState.errors?.Descripcion}
          helperText={formState.errors?.Descripcion?.message}
          multiline
          rows={6}
          placeholder="Ingresa la descripción del ticket"
        />
        <Typography variant="caption">
          *Los campos de prioridad y moderador están desactivados a menos que deslice el switch
          hacia la derecha.
        </Typography>
        <br />
        <Typography variant="caption">
          *Puedes editar la descripción del ticket sin modificar la prioridad y el moderador.
        </Typography>
      </Grid>
    </Grid>
  );
};

Reabrir.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Reabrir);
