import React from "react";
//mui library component
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useReabrirFieldsQuery } from "api/ticketsApi";
import Progress from "components/Progress";
import { ArchivosButton } from "components/ArchivosButton/ArchivosButton";
const Reabrir = ({ form, formState }) => {
  const { data, isLoading } = useReabrirFieldsQuery();
  const [nota, setNota] = React.useState(false);
  console.log(form.watch("Nota"));
  if (isLoading) return <Progress open={true} />;
  return (
    <Grid container spacing={2} m={1}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="Fecha de resolución"
          label="Fecha de resolución"
          {...form.register("Fecha_limite_resolucion_SLA")}
          disabled
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="moderador">Resolutor</InputLabel>
          <Select
            native
            id="moderador"
            label="Resolutor"
            defaultValue={form.getValues("Asignado_a[0]._id") || ""}
            {...form.register("asignado_a", {
              required: "Es necesario seleccionar un moderador.",
            })}
            error={!!formState.errors.asignado_a}
            //onChange={form.setValue("Asignado_a", "")}
          >
            <option aria-label="None" value="" />
            {data.moderadores.map((area) => {
              if (area) {
                return (
                  <optgroup label={area.area.area} key={area.area._id}>
                    {area.resolutores.map((t, index) => (
                      <option value={`${t._id}`} key={index}>
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
          {formState.errors.asignado_a && (
            <FormHelperText>{<span>{formState.errors.asignado_a?.message}</span>}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="descripcion"
          defaultValue={form.getValues("Descripcion") || ""}
          label="Descripción del ticket"
          disabled
          multiline
          rows={15}
        />
      </Grid>
      <Grid xs={6}>
        <ArchivosButton form={form} formState={formState} />
      </Grid>
      <Grid xs={12}>
        <FormControlLabel
          control={<Switch checked={nota} onChange={() => setNota(!nota)} />}
          label="Agregar nota"
        />
      </Grid>
      {nota && (
        <Grid item xs={12}>
          <TextField
            id="notas"
            label="Nota"
            multiline
            {...form.register("Nota")}
            rows={15}
            fullWidth
          />
        </Grid>
      )}
    </Grid>
  );
};

Reabrir.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Reabrir);
