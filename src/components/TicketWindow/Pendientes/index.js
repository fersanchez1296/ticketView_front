import React from "react";
//mui library component
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
//api hook
import { useGetCorreosQuery } from "api/ticketsApi.js";
import { useTicketStore } from "zustand/index.ts";
import PropTypes from "prop-types";
const Pendientes = ({ form, formState }) => {
  const ticketId = useTicketStore((state) => state._id);
  const { data, isLoading, isError } = useGetCorreosQuery({ ticketId });
  if (isLoading) return <div>Cargando correos...</div>;
  if (isError) return <div>Error al cargar los correos</div>;

  return (
    <Grid container spacing={1} m={1}>
      <Grid item xs={12}>
        {/* Input para agregr la descripción pendiente */}
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Para:"
          value={data.correoCliente}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        {/* Input para agregr la descripción pendiente */}
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="CC:"
          value={data.correoModerador}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        {/* Input para agregr la descripción pendiente */}
        <TextField
          fullWidth
          id="asunto"
          label="Asunto:"
          value={`Seguimiento al numero de ticket #${form.getValues("Id")}`}
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        {/* Input para agregr la descripción pendiente */}
        <TextField
          fullWidth
          id="cuerpo-correo"
          label="Cuerpo:"
          {...form.register("cuerpo", {
            required: "El cuerpo del mensaje es requerido.",
          })}
          error={!!formState.errors?.cuerpo}
          helperText={formState.errors?.cuerpo?.message}
          multiline
          rows={10}
        />
      </Grid>
    </Grid>
  );
};

Pendientes.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Pendientes);
