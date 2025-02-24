import React from "react";
//mui library component
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
const Resolver = ({ form, formState }) => {
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    form.setValue("Files", files);
  };
  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    form.setValue("Files", newFiles);
  };
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
  return (
    <Grid container spacing={2} m={1}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="Descripción resolución"
          label="Descripción resolución"
          {...form.register("Respuesta_cierre_reasignado", {
            required: "La descripción es requerida",
          })}
          error={!!formState.errors?.Respuesta_cierre_reasignado}
          helperText={formState.errors?.Respuesta_cierre_reasignado?.message}
          multiline
          rows={6}
          placeholder="Ingresa la descripción de resolución del ticket"
        />
      </Grid>
      {/* Botón de archivos */}
      <Grid xs={6}>
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
            {...form.register("Files")}
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </Button>
        <br />
        <Typography variant={"caption"} color="Black">
          *Selecciona a la vez todos los archivos que necesitas subir.
        </Typography>
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
  );
};

Resolver.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Resolver);
