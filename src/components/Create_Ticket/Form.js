import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Unstable_Grid2";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/material/Icon";
import { styled } from "@mui/material/styles";
import { List, ListItem, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import { useCrearMutation } from "api/ticketsApi.js";
const LazyNuevoCliente = React.lazy(() => import("./components/NuevoCliente"));
const LazyBuscarCliente = React.lazy(() => import("./components/BuscarCliente"));
import { useForm, SubmitHandler } from "react-hook-form";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default function Form({ data }) {
  const form = useForm({ defaultValues: { Files: [], standby: false, isNuevoCliente: false } });
  const [guardar] = useCrearMutation();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const { register, handleSubmit, formState, setValue, watch } = form;
  const { errors } = formState;
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
    const result = await guardar({ data });
  };
  const standby = watch("standby");
  const isNuevoCliente = watch("isNuevoCliente");
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1 } }}
      onSubmit={handleSubmit(onSubmit)}
      //autoComplete="on"
    >
      <Grid container spacing={1}>
        {/* divisor de ticket */}
        <Grid item xs={12}>
          <MDBox bgColor="primary" borderRadius="lg" mt={-3} p={2} mb={1} textAlign="left">
            <Typography variant="h4" fontWeight="light" color="White" mt={1}>
              Ticket
            </Typography>
          </MDBox>
          <Divider />
        </Grid>
        {/* Tipo de incidencia */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="tipo_incidencia">Tipo de incidencia</InputLabel>
            <Select
              labelId="tipo_incidencia"
              id="tipo_incidencia"
              label="Tipo de incidencia"
              defaultValue=""
              {...register("incidencia", {
                required: "Es necesario seleccionar el tipo de incidencia",
              })}
              error={!!errors.incidencia}
            >
              <MenuItem value={""} key={"empty"}>
                {""}
              </MenuItem>
              {data.tiposTickets.map((est) => (
                <MenuItem value={est._id} key={est._id}>
                  {est.Tipo_de_incidencia}
                </MenuItem>
              ))}
            </Select>
            {errors.incidencia && <FormHelperText>{errors.incidencia.message}</FormHelperText>}
          </FormControl>
        </Grid>
        {/* Prioridad */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="prioridad">Prioridad</InputLabel>
            <Select
              native
              id="prioridad"
              label="Prioridad"
              {...register("prioridad", {
                required: "Es necesario seleccionar la prioridad",
              })}
              error={!!errors.prioridad}
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
            {errors.prioridad && <FormHelperText>{errors.prioridad.message}</FormHelperText>}
          </FormControl>
        </Grid>
        {/* Servicio */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="servicio">Servicio</InputLabel>
            <Select
              labelId="servicio"
              id="servicio"
              //value={ticketState.Servicio}
              label="Servicio"
              defaultValue=""
              {...register("servicio", {
                required: "Es necesario seleccionar el servicio",
              })}
              error={!!errors.servicio}
              //onChange={(e) => setCrearTicketFields("Servicio", e.target.value)}
            >
              <MenuItem value={""} key={"empty"}>
                {""}
              </MenuItem>
              {data.servicios.map((est) => {
                return (
                  <MenuItem value={est._id} key={est._id}>
                    {est.Servicio}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.servicio && <FormHelperText>{errors.servicio.message}</FormHelperText>}
          </FormControl>
        </Grid>
        {/* Categoria */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="categoria">Categoría</InputLabel>
            <Select
              labelId="categoria"
              id="categoria"
              defaultValue=""
              {...register("categoria", {
                required: "Es necesario seleccionar la categoría",
              })}
              error={!!errors.categoria}
              //value={ticketState.Categoria}
              label="Categoría"
              //onChange={(e) => setCrearTicketFields("Categoria", e.target.value)}
            >
              <MenuItem value={""} key={"empty"}>
                {""}
              </MenuItem>
              {data.categorias.map((est) => {
                return (
                  <MenuItem value={est._id} key={est._id}>
                    {est.Categoria}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.categoria && <FormHelperText>{errors.categoria.message}</FormHelperText>}
          </FormControl>
        </Grid>
        {/* Subcategoria */}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="subcategoria">Subcategoría</InputLabel>
            <Select
              sx={{ minHeight: "3rem" }}
              labelId="subcategoria"
              id="subcategoria"
              //value={ticketState.Subcategoria}
              label="Subcategoría"
              defaultValue=""
              {...register("subcategoria", {
                required: "Es necesario seleccionar la subcategoría",
              })}
              error={!!errors.subcategoria}
              //onChange={(e) => setCrearTicketFields("Subcategoria", e.target.value)}
            >
              <MenuItem value={""} key={"empty"}>
                {""}
              </MenuItem>
              {data.subcategoria.map((est) => {
                return (
                  <MenuItem value={est._id} key={est._id}>
                    {est.Subcategoria}
                  </MenuItem>
                );
              })}
            </Select>
            {errors.subcategoria && <FormHelperText>{errors.subcategoria.message}</FormHelperText>}
          </FormControl>
        </Grid>
        {/* Oficio */}
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Oficio de recepción:"
            variant="outlined"
            //value={ticketState.NumeroRec_Oficio}
            //onChange={(e) => setCrearTicketFields("NumeroRec_Oficio", e.target.value)}
            fullWidth
          />
        </Grid>
        {/* Descripcion */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="descripcion"
            label="Descripción del ticket"
            {...register("descripcion", {
              required: "Es necesario ingresar la descripción del ticket",
            })}
            error={!!errors.subcategoria}
            helperText={errors.descripcion?.message}
            multiline
            //value={ticketState.Descripcion}
            //onChange={(e) => setCrearTicketFields("Descripcion", e.target.value)}
            rows={6}
            placeholder="Ingresa la descripción del ticket"
          />
        </Grid>
        {/* Separador moderador */}
        <Grid item xs={12}>
          <MDBox bgColor="primary" borderRadius="lg" mt={2} p={2} mb={1} textAlign="left">
            <Typography variant="h4" fontWeight="light" color="White" mt={1}>
              Moderador
            </Typography>
          </MDBox>
        </Grid>
        {/* Asignar moderador */}
        <Grid item xs={12}>
          <Box
            pt={4}
            pb={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
            }}
          >
            <FormGroup>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography>Asignar a moderador</Typography>
                  <Switch
                    {...register("standby")}
                    checked={standby}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setValue("standby", newValue); // Asegura que el valor es booleano
                    }}
                  />
                  <Typography>Asignar a Mesa</Typography>
                </Box>
              </Stack>
            </FormGroup>
            {!standby && (
              <FormControl fullWidth>
                <InputLabel id="moderador">Moderador</InputLabel>
                <Select
                  native
                  id="moderador"
                  label="Moderador"
                  defaultValue={""}
                  {...register("moderador", {
                    required: "Es necesario seleccionar un moderador.",
                  })}
                  error={!!errors.moderador}
                  onChange={(e) => {
                    const [asignado_a, area_id] = e.target.value.split("|");
                    //crearTicketStore.setCrearTicketFields("Asignado_a", asignado_a);
                    //crearTicketStore.setCrearTicketFields("Area_asignado", area_id);
                  }}
                >
                  <option aria-label="None" value="" />
                  {data.areasResolutores.map((area) => {
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
                {errors.moderador && (
                  <FormHelperText>{<span>{errors.moderador.message}</span>}</FormHelperText>
                )}
              </FormControl>
            )}
          </Box>
        </Grid>
        {/* Separador cliente */}
        <Grid item xs={12}>
          <MDBox bgColor="primary" borderRadius="lg" mt={2} p={2} mb={1} textAlign="left">
            <Typography variant="h4" fontWeight="light" color="White" mt={1}>
              Cliente
            </Typography>
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <Box pt={4} pb={3}>
            <FormGroup>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography>Buscar Cliente</Typography>
                  <Switch
                    checked={isNuevoCliente}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setValue("isNuevoCliente", newValue);
                    }}
                  />
                  <Typography>Nuevo Cliente</Typography>
                </Box>
              </Stack>
            </FormGroup>
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              {!isNuevoCliente ? (
                <LazyBuscarCliente form={form} formState={formState} />
              ) : (
                <LazyNuevoCliente form={form} formState={formState} />
              )}
            </Suspense>
          </Box>
        </Grid>
        {/* Separador de archivos */}
        <Grid item xs={12}>
          <MDBox bgColor="primary" borderRadius="lg" mt={2} p={2} mb={1} textAlign="left">
            <Typography variant="h4" fontWeight="light" color="White" mt={1}>
              Archivos
            </Typography>
          </MDBox>
        </Grid>
        {/* Botón de archivos */}
        <Grid xs={6}>
          <Typography color="Black">
            *Selecciona a la vez todos los archivos que necesitas subir.
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
        {/* Botón de guardar */}
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Guardar Ticket
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

Form.propTypes = {
  data: PropTypes.object,
};
