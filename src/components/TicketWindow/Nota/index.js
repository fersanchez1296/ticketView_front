import React from "react";
//mui library component
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import SaveIcon from "@mui/icons-material/Save";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useCerrarTicketStore } from "./store/cerrarTicket.store.ts";
import { useNotaMutation } from "api/ticketsApi.js";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import { useForm, SubmitHandler } from "react-hook-form";

const Nota = () => {
  /* -------------------------------------------------------------------------- */
  // Definición de constantes (rutas, configuraciones)
  /* -------------------------------------------------------------------------- */
  // API Hooks (RTK Query, Axios, etc.)
  const [guardar] = useNotaMutation();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const isWindowNotaOpen = useDialogStore((state) => state.isWindowNotaOpen);
  const closeWindowNota = useDialogStore((state) => state.closeWindowNota);
  const cerrarTicketStore = useCerrarTicketStore();
  const descripcion_cierre_resolutor = useTicketStore((state) => state.Respuesta_cierre_reasignado);
  const ticketId = useTicketStore((state) => state._id);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  /* -------------------------------------------------------------------------- */
  // Hooks de React Hook Form (useForm, useFieldArray, etc.)
  const form = useForm({ defaultValues: { Files: [] } });
  const { register, handleSubmit, formState, setValue, watch, reset } = form;
  const { errors } = formState;
  /* -------------------------------------------------------------------------- */
  // React Router DOM (useNavigate, useParams, useLocation)
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  React.useEffect(() => {
    cerrarTicketStore.setCerrarTicketFields("Descripcion_cierre", descripcion_cierre_resolutor);
  }, []);
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setValue("Files", files);
  };
  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setValue("Files", newFiles);
  };
  const onSubmit = async (data) => {
    try {
      const result = await guardar({ data, ticketId });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
        return result;
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        setTimeout(() => {
          closeWindowNota();
        }, 2000);
      }
    } catch (error) {
      openErrorSB("Ocurrió un error inesperado al crear el ticket.", `Status: 500`);
    }
  };
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowNotaOpen}
        onClose={() => {
          closeWindowNota();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                closeWindowNota();
              }}
              aria-label="close"
            >
              <CloseIcon />
              <Typography sx={{ ml: 2 }} variant="h4" component="div">
                Cerrar
              </Typography>
            </IconButton>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              endIcon={<SaveIcon />}
              sx={{ color: "Black" }}
              onClick={handleSubmit(onSubmit)}
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1 } }}
          autoComplete="on"
          //onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MDBox bgColor="primary" borderRadius="md" p={2} textAlign="left">
                <MDTypography variant="h4" fontWeight="light" color="white" mt={1}>
                  Notas
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="notas"
                label="Notas de diario"
                multiline
                {...register("Nota", {
                  required: "Es necesario ingresar el texto de la nota",
                })}
                error={!!errors.Nota}
                helperText={errors.Nota?.message}
                rows={5.2}
                fullWidth
              />
            </Grid>
            <Grid xs={6}>
              <Typography color="Black">
                *Selecciona a la vez todos los archivos que necesitas subir (max-10).
              </Typography>
              <Button
                component="label"
                variant="outlined"
                color="primary"
                size="small"
                tabIndex={-1}
                startIcon={<CloudUploadIcon color="primary" />}
                disabled={selectedFiles.length > 0 ? true : false}
              >
                <Typography color="primary">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} archivo(s) seleccionado(s)`
                    : "Subir Archivos"}
                </Typography>
                <VisuallyHiddenInput
                  {...register("Files")}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            {/* Botones de eliminar archivos */}
            {selectedFiles.length > 0 && (
              <Grid item xs={12}>
                <List>
                  {selectedFiles.map((file, index) => (
                    <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>{file.name}</Typography>
                      <IconButton color="error" onClick={() => removeFile(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(Nota);
