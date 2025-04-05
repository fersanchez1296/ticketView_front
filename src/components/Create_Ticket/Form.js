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
import { addHours, format } from "date-fns";
import { es } from "date-fns/locale";
const LazyNuevoCliente = React.lazy(() => import("./components/NuevoCliente"));
const LazyBuscarCliente = React.lazy(() => import("./components/BuscarCliente"));
import { useForm, SubmitHandler } from "react-hook-form";
import { useClientesStore } from "zustand/index.ts";
import { calcularFechaLimite } from "utils/calcularFechaResolucion";
import CustomSelect from "components/Select/Select";
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
  const clientesStore = useClientesStore();
  const [loading, setLoading] = React.useState(false);
  const [Tipo_incidencia, setTipo_incidencia] = React.useState("");
  const [area, setArea] = React.useState("");
  const [servicio, setServicio] = React.useState("");
  const [categoria, setCategoria] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [subcategoria, setSubcategoria] = React.useState("");
  const [tiempo, setTiempo] = React.useState("");
  const form = useForm({ defaultValues: { Files: [] } });
  const [isNuevoCliente, setIsNuevoCliente] = React.useState(false);
  const [guardar] = useCrearMutation();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const { register, handleSubmit, formState, setValue, watch, reset, control } = form;
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const openSuccessSB = useSnackbarStore((state) => state.openSuccessSB);
  const [Nombre, setNombre] = React.useState("");
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
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...files];
      form.setValue("Files", updatedFiles);
      return updatedFiles;
    });
  };
  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setValue("Files", newFiles);
  };
  const onSubmit = async (data) => {
    setLoading(true);
    form.setValue("Asignado_a", clientesStore._id);
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
      console.log(error);
      openErrorSB("Ocurrió un error inesperado al crear el ticket.", `Status: 500`);
    } finally {
      setLoading(false);
    }
  };
  const hasResolutor = watch("hasResolutor");
  const formFields = React.useMemo(
    () => [
      {
        name: "Medio",
        label: "Medio contacto",
        options: data.medios,
        key: "Medio",
      },
    ],
    [data]
  );

  const handleSubcategoriaChange = (selectedOption) => {
    if (!selectedOption) return; // por si se limpia el select

    const selectedSubcategoria = selectedOption._id;
    const catalogo = data.categorizacion.find((s) => s._id.includes(selectedSubcategoria));

    if (!catalogo) return;

    const tiempo = catalogo.Prioridad;
    setValue("tiempo", tiempo);
    setValue("Area", catalogo.Equipo._id);
    setDescripcion(catalogo.Descripcion_prioridad);
    setCategoria(catalogo["Categoría"]);
    setServicio(catalogo.Servicio);
    setTipo_incidencia(catalogo.Tipo);
    setArea(catalogo.Equipo.Area);

    if (tiempo) {
      const fechaLimite = calcularFechaLimite(tiempo);
      const fechaFormateada = format(fechaLimite, "d 'de' MMMM 'de' yyyy, h:mm a", {
        locale: es,
      });
      setTiempo(fechaFormateada);
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        {/* Separador cliente */}
        <Grid item xs={12}>
          <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
            <Typography variant="h5" fontWeight="bold" color="White">
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
                      setIsNuevoCliente(!isNuevoCliente);
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
      </Grid>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        onSubmit={handleSubmit(onSubmit)}
        //autoComplete="on"
      >
        <Grid container spacing={1}>
          {/* divisor de ticket */}
          <Grid item xs={12}>
            <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
              <Typography variant="h5" fontWeight="bold" color="White">
                Ticket
              </Typography>
            </MDBox>
          </Grid>
          {formFields.map(({ name, label, options, key }) => (
            <Grid item xs={6} key={name}>
              <FormControl fullWidth error={!!errors[name]}>
                <InputLabel>{label}</InputLabel>
                <Select
                  autoComplete="off"
                  defaultValue=""
                  label={label}
                  {...register(name, {
                    required: `Es necesario seleccionar ${label.toLowerCase()}`,
                  })}
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
              <CustomSelect
                options={data.categorizacion}
                form={form}
                formState={formState}
                control={control}
                onChangeCallback={handleSubcategoriaChange}
              />
              {/* <InputLabel>Selecciona la Subcategoría</InputLabel>
              <Select
                autoComplete="off"
                defaultValue=""
                label={"Selecciona la Subcategoría"}
                {...register("Subcategoria", {
                  required: `Es necesario seleccionar la subcategoria`,
                })}
                error={!!errors.Subcategoria}
                onChange={handleSubcategoriaChange}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {data.categorizacion.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.Subcategoria}
                  </MenuItem>
                ))}
              </Select>
              {errors.Subcategoria && (
                <FormHelperText>{errors.Subcategoria.message}</FormHelperText>
              )} */}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField value={categoria} autoComplete="off" fullWidth disabled label="Categoría" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={servicio} autoComplete="off" fullWidth disabled label="Servicio" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={Tipo_incidencia}
              autoComplete="off"
              fullWidth
              disabled
              label="Tipo de incidente"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField value={area} autoComplete="off" fullWidth disabled label="Área" />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={tiempo}
              autoComplete="off"
              fullWidth
              disabled
              label="Fecha de resolución"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={descripcion}
              autoComplete="off"
              fullWidth
              disabled
              label="Prioridad"
            />
          </Grid>

          {/* Oficio */}
          <Grid item xs={6}>
            <TextField
              autoComplete="off"
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
              autoComplete="off"
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
            <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
              <Typography variant="h5" fontWeight="bold" color="White">
                Archivos
              </Typography>
            </MDBox>
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
          {/* Separador moderador */}
          <Grid item xs={12}>
            <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
              <Typography variant="h5" fontWeight="bold" color="White">
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
                      {...register("hasResolutor")}
                      checked={hasResolutor}
                      onChange={(e) => {
                        const newValue = e.target.checked;
                        setValue("hasResolutor", newValue); // Asegura que el valor es booleano
                      }}
                    />
                    <Typography>Asignar a resolutor</Typography>
                  </Box>
                </Stack>
              </FormGroup>
              {!hasResolutor ? (
                <FormControl fullWidth>
                  <InputLabel id="moderador">Moderador</InputLabel>
                  <Select
                    native
                    id="moderador"
                    label="Moderador"
                    defaultValue={""}
                    {...register("Asignado_a", {
                      required: "Es necesario seleccionar un moderador.",
                    })}
                    error={!!errors.Asignado_a}
                    onChange={(e) => {
                      const [_id, Nombre] = e.target.value.split("|");
                      setNombre(Nombre);
                    }}
                  >
                    <option aria-label="None" value="" />
                    {data.areasResolutores.map((area) => {
                      if (area) {
                        return (
                          <optgroup label={area.area.area} key={area.area._id}>
                            {area.resolutores.map((t, index) => (
                              <option value={`${t._id}|${t.Nombre}`} key={index}>
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
                  {errors.Asignado_a && (
                    <FormHelperText>{<span>{errors.Asignado_a.message}</span>}</FormHelperText>
                  )}
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <InputLabel id="resolutor">Resolutor</InputLabel>
                  <Select
                    native
                    id="resolutor"
                    label="resolutor"
                    defaultValue={""}
                    {...register("Asignado_a", {
                      required: "Es necesario seleccionar un resolutor.",
                    })}
                    error={!!errors.resolutor}
                  >
                    <option aria-label="None" value="" />
                    {data.resolutores.map((area) => {
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
                  {errors.Asignado_a && (
                    <FormHelperText>{<span>{errors.Asignado_a.message}</span>}</FormHelperText>
                  )}
                </FormControl>
              )}
              {/* Descripcion */}
              {Nombre === "Mesa de Servicio" && (
                <Grid item mt={2} xs={12}>
                  <TextField
                    fullWidth
                    id="PendingReason"
                    label="Descripción pendiente"
                    {...register("PendingReason")}
                    error={!!errors.Descripcion}
                    helperText={errors.Descripcion?.message}
                    multiline
                    rows={2}
                    placeholder="Ingrese la descripción"
                  />
                </Grid>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
              <Typography variant="h5" fontWeight="bold" color="White">
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
    </>
  );
}

Form.propTypes = {
  data: PropTypes.object,
};
