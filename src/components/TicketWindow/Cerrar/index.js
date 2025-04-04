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
const Cerrar = ({ form, formState }) => {
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...files];
      form.setValue("Files", updatedFiles);
      return updatedFiles;
    });
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
        {/* <TextField
          fullWidth
          id="oficio_cierre"
          label="Oficio de cierre"
          {...form.register("Numero_Oficio")}
          error={!!formState.errors?.Numero_Oficio}
          helperText={formState.errors?.Numero_Oficio?.message}
          placeholder="Ingresa el número de oficio de cierre"
        /> */}
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="Descripción de cierre"
          label="Descripción de cierre"
          {...form.register("Respuesta_cierre_reasignado", {
            required: "La descripción de cierre es requerida",
          })}
          error={!!formState.errors?.Respuesta_cierre_reasignado}
          helperText={formState.errors?.Respuesta_cierre_reasignado?.message}
          multiline
          rows={15}
          placeholder="Ingresa la descripción de cierre del ticket"
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
          // Removemos la deshabilitación para permitir agregar más archivos
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

Cerrar.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Cerrar);
