import React from "react";
//mui library component
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
//api hook
import { useGetCorreosQuery } from "api/ticketsApi.js";
import { Button, Typography } from "@mui/material";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
import { usePutPendienteMutation } from "api/ticketsApi";
import { useTicketStore, useDialogStore } from "zustand/index.ts";
import { useForm } from "react-hook-form";
const Pendientes = () => {
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const { closeWindowPendientes } = useDialogStore();
  const form = useForm();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = form;
  const [pendiente] = usePutPendienteMutation();
  const ticketId = useTicketStore((state) => state._id);
  const Id = useTicketStore((state) => state.Id);
  const { data, isLoading, isError } = useGetCorreosQuery({ ticketId });
  if (isLoading) return <div>Cargando correos...</div>;
  if (isError) return <div>Error al cargar los correos</div>;
  const correoCliente = data?.correoCliente;
  const correoModerador = data?.correoModerador;
  const correoMesa = data?.correoMesa;
  const handleSave = async (data) => {
    try {
      const result = await pendiente({ data, ticketId });
      if (!result) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        const email = correoCliente;
        const cc = correoMesa;
        const bcc = correoModerador;
        const subject = encodeURIComponent("Petición de información para el Ticket: " + Id);
        const body = encodeURIComponent(data.DescripcionPendiente);
        const mailtoLink = `mailto:${email}?cc=${cc}&bcc=${bcc}&subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
        setTimeout(() => {
          closeWindowPendientes();
        }, 2500);
      }
    } catch (error) {
      console.log(error);
      openErrorSB("Ocurrión un error al procesar el ticket", `Status: 500`);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Grid container spacing={1} m={1}>
        <Grid item xs={12}>
          {/* Input para agregr la descripción pendiente */}
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Descripción:"
            {...register("DescripcionPendiente", {
              required: "La descripcion es requerida",
            })}
            error={!!errors?.DescripcionPendiente}
            helperText={errors?.DescripcionPendiente?.message}
            multiline
            rows={10}
          />
        </Grid>
        <Button
          variant="outlined"
          color="primary"
          sx={{ color: "Black" }}
          onClick={handleSubmit(handleSave)}
        >
          <Typography>Marcar como pendiente</Typography>
        </Button>
      </Grid>
    </form>
  );
};

export default React.memo(Pendientes);
