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
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import { List, ListItem, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import { useCrearMutation } from "api/ticketsApi.js";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
import LoadingButton from "@mui/lab/LoadingButton";
const LazyNuevoCliente = React.lazy(() => import("./components/NuevoCliente"));
const LazyBuscarCliente = React.lazy(() => import("./components/BuscarCliente"));
import { useForm, SubmitHandler } from "react-hook-form";
function CustomTabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
  const [loading, setLoading] = React.useState(false);
  const [area, setArea] = React.useState("");
  const [servicio, setServicio] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const form = useForm({ defaultValues: { Files: [], standby: false, isNuevoCliente: false } });
  const [guardar] = useCrearMutation();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const { register, handleSubmit, formState, setValue, watch, reset } = form;
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const openSuccessSB = useSnackbarStore((state) => state.openSuccessSB);
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
    setLoading(true);
    try {
      const result = await guardar({ data });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
        return result;
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      }
    } catch (error) {
      openErrorSB("Ocurrió un error inesperado al crear el ticket.", `Status: 500`);
    } finally {
      setLoading(false);
    }
  };
  const standby = watch("standby");
  const isNuevoCliente = watch("isNuevoCliente");
  const formFields = React.useMemo(
    () => [
      {
        name: "Tipo_incidencia",
        label: "Tipo de incidencia",
        options: data.tiposTickets,
        key: "Tipo_de_incidencia",
      },
      {
        name: "Medio",
        label: "Medio contacto",
        options: data.medios,
        key: "Medio",
      },
    ],
    [data]
  );
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1 } }}
      onSubmit={handleSubmit(onSubmit)}
      //autoComplete="on"
    >
      <Grid container spacing={1}>
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
        {/* divisor de ticket */}
        <Grid item xs={12}>
          <MDBox bgColor="primary" borderRadius="lg" mt={-3} p={2} mb={1} textAlign="left">
            <Typography variant="h4" fontWeight="light" color="White" mt={1}>
              Ticket
            </Typography>
          </MDBox>
          <Divider />
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
        {formFields.map(({ name, label, options, key }) => (
          <Grid item xs={6} key={name}>
            <FormControl fullWidth error={!!errors[name]}>
              <InputLabel>{label}</InputLabel>
              <Select
                defaultValue=""
                label={label}
                {...register(name, { required: `Es necesario seleccionar ${label.toLowerCase()}` })}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {options.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option[key]}
                  </MenuItem>
                ))}
              </Select>
              {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
            </FormControl>
          </Grid>
        ))}
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Selecciona el area</InputLabel>
            <Select
              defaultValue=""
              label={"Selecciona el area"}
              {...register("Area", { required: `Es necesario seleccionar el área` })}
              onChange={(e) => setArea(e.target.value)}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {data.areas.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.Area}
                </MenuItem>
              ))}
            </Select>
            {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Selecciona el servicio</InputLabel>
            <Select
              defaultValue=""
              label={"Selecciona el servicio"}
              {...register("Servicio", { required: `Es necesario seleccionar el servicio` })}
              onChange={(e) => setServicio(e.target.value)}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {data.servicios
                .filter((s) => s.Area.includes(area)) // Filtra los elementos por el área
                .map(
                  (
                    option // Luego, mapea los resultados para renderizarlos
                  ) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.Servicio}
                    </MenuItem>
                  )
                )}
            </Select>
            {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Selecciona la Categoría</InputLabel>
            <Select
              defaultValue=""
              label={"Selecciona la Categoría"}
              {...register("Categoria", { required: `Es necesario seleccionar la categoria` })}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {data.categorias
                .filter((s) => s.Servicio.includes(servicio)) // Filtra los elementos por el área
                .map(
                  (
                    option // Luego, mapea los resultados para renderizarlos
                  ) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.Categoria}
                    </MenuItem>
                  )
                )}
            </Select>
            {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Selecciona la Subcategoría</InputLabel>
            <Select
              defaultValue=""
              label={"Selecciona la Subcategorpía"}
              {...register("Subcategoria", {
                required: `Es necesario seleccionar la subcategoria`,
              })}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {data.subcategoria
                .filter(
                  (s) =>
                    s.Area.includes(area) &&
                    s.Servicio.includes(servicio) &&
                    s.Categoria.includes(categoria)
                ) // Filtra los elementos por el área
                .map(
                  (
                    option // Luego, mapea los resultados para renderizarlos
                  ) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.Subcategoria}
                    </MenuItem>
                  )
                )}
            </Select>
            {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
          </FormControl>
        </Grid>
        {/* Oficio */}
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Oficio de recepción:"
            variant="outlined"
            {...register("NumeroRec_Oficio")}
            fullWidth
          />
        </Grid>
        {/* Descripcion */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="descripcion"
            label="Descripción del ticket"
            {...register("Descripcion", {
              required: "Es necesario ingresar la descripción del ticket",
            })}
            error={!!errors.Descripcion}
            helperText={errors.Descripcion?.message}
            multiline
            rows={6}
            placeholder="Ingresa la descripción del ticket"
          />
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
        <Grid item xs={12}>
          <MDBox bgColor="primary" borderRadius="lg" mt={2} p={2} mb={1} textAlign="left">
            <Typography variant="h4" fontWeight="light" color="White" mt={1}>
              Guardar Ticket
            </Typography>
          </MDBox>
        </Grid>
        {/* Botón de guardar */}
        <Grid item xs={12}>
          <LoadingButton
            type="submit"
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            tabIndex={-1}
            startIcon={<SaveIcon color="primary" />}
            loading={loading}
            loadingIndicator="Guardando ticket…"
          >
            <span>
              <Typography color="primary">{"Guardar Ticket"}</Typography>
            </span>
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

Form.propTypes = {
  data: PropTypes.object,
};
