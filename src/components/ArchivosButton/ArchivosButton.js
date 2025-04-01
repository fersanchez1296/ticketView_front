import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { List, ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
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
export const ArchivosButton = ({ form, formState }) => {
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
  return (
    <>
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
        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
      </Button>

      {/* Botones de eliminar archivos */}
      {selectedFiles.length > 0 && (
        <Grid item xs={12}>
          <List>
            {selectedFiles.map((file, index) => (
              <ListItem key={index} sx={{ display: "flex" }}>
                <Typography>{file.name}</Typography>
                <IconButton color="error" onClick={() => removeFile(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </>
  );
};

ArchivosButton.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};
