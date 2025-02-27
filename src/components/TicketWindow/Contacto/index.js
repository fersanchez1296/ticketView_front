import React from "react";
//mui library component
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
//api hook
import { useGetCorreosQuery } from "api/ticketsApi.js";
import { useTicketStore } from "zustand/index.ts";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
const Contacto = ({ form, formState }) => {
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
          id="asunto"
          label="Asunto:"
          value={`Seguimiento al numero de ticket #${form.getValues("Id")}`}
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
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InfoIcon color="secondary" />
          <Typography variant="overline" pl={1}>
            Puedes modificar el asunto del correo si lo necesitas.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <IconButton aria-label="delete">
          <HelpIcon color="primary" />
          <Typography variant="overline">Ayuda</Typography>
        </IconButton>
      </Grid>
    </Grid>
  );
};

Contacto.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Contacto);
