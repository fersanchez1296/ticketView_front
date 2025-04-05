// Importaciones
import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
//mui library component
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormHelperText from "@mui/material/FormHelperText";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/material/Icon";
import Box from "@mui/material/Box";
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.)
import { useSelectsClientesQuery } from "api/clientesApi";
import { useCrearClienteMutation } from "api/clientesApi";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
import { useClientesStore } from "zustand/index.ts";
import { useForm } from "react-hook-form";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
import PropTypes from "prop-types";
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
/* -------------------------------------------------------------------------- */

const NuevoCliente = ({ form: parentForm }) => {
  // API Hooks (RTK Query, Axios, etc.)
  const { data, isLoading } = useSelectsClientesQuery();
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const [guardarCliente] = useCrearClienteMutation();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const clientesStore = useClientesStore();

  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [nuevaDGeneral, setNuevaDGeneral] = useState(false);
  const [nuevaDArea, setNuevaDArea] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const openSuccessSB = useSnackbarStore((state) => state.openSuccessSB);
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await guardarCliente({ data });
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
        return result;
      } else {
        parentForm.setValue("Cliente", result.data.data);
        openSuccessSB(result.data.desc, `Status: 200`);
      }
    } catch (error) {
      console.log(error);
      openErrorSB("Ocurrió un error inesperado al guardar el cliente.", `Status: 500`);
    } finally {
      setLoading(false);
    }
  };
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1 } }}
        onSubmit={handleSubmit(onSubmit)}
        //autoComplete="on"
      >
        <Grid container spacing={1}>
          {/*Introducido por teclado Nombre del cliente*/}
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              type="text"
              label="Nombre:"
              {...register("nombre", {
                required: "Es necesario el nombre del cliente",
              })}
              error={!!formState.errors.nuevocliente?.Nombre}
              helperText={formState.errors.nuevocliente?.Nombre?.message}
              //defaultValue={clientesStore.Nombre} // Usa defaultValue en lugar de value
              //onChange={(e) => clientesStore.setClientesFields("Nombre", e.target.value)}
              fullWidth
            />
          </Grid>
          {/*Introducido por teclado Correo*/}
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              type="email" // Muestra validación de correo automáticamente
              label="Correo:"
              pattern=".+@example\.mx"
              //value={clientesStore.Correo}
              {...register("correo", {
                required: "Es necesario el correo del cliente",
              })}
              error={!!formState.errors.nuevocliente?.Correo}
              helperText={formState.errors.nuevocliente?.Correo?.message}
              onChange={(e) => clientesStore.setClientesFields("Correo", e.target.value)}
              fullWidth
            />
          </Grid>
          {/*Introducido por teclado Teléfono*/}
          <Grid item xs={6}>
            <TextField
              //autoComplete="off"
              type="tel" // Tipo tel para mostrar un teclado numérico en móviles
              label="Teléfono:"
              //value={clientesStore.Telefono}
              {...register("telefono", {
                required: "Es necesario el teléfono del cliente",
                maxLength: {
                  value: 10,
                  message: "El teléfono solo puede contener un máximo de 10 números.",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El teléfono solo puede contener números",
                },
              })}
              error={!!formState.errors.nuevocliente?.Telefono}
              helperText={formState.errors.nuevocliente?.Telefono?.message}
              inputProps={{
                maxLength: 10, // Limita el número de caracteres a 10 (ejemplo para teléfonos locales)
              }}
              fullWidth
            />
          </Grid>
          {/*Introducido por teclado extension*/}
          <Grid item xs={6}>
            <TextField
              autoComplete="off"
              type="tel" // Tipo tel para mostrar un teclado numérico en móviles
              label="Extensión:"
              {...register("extension", {
                maxLength: {
                  value: 6,
                  message: "La extensión solo puede contener un máximo de 6 números.",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "La extensión solo puede contener números",
                },
              })}
              error={!!formState.errors.nuevocliente?.Extension}
              helperText={formState.errors.nuevocliente?.Extension?.message}
              inputProps={{
                maxLength: 6,
              }}
              fullWidth
            />
          </Grid>
          {/*Seleccion Dirección general*/}
          <Grid item xs={6}>
            {!nuevaDGeneral ? (
              <FormControl fullWidth>
                <InputLabel id="direccion_general">Seleccione la Dirección general</InputLabel>
                <Select
                  autoComplete="off"
                  labelId="direccion_general"
                  id="direccion_general"
                  defaultValue={""}
                  {...register("direccion_general", {
                    required: "Es necesario seleccionar la dirección general del cliente",
                  })}
                  error={!!formState.errors.nuevocliente?.Direccion_General}
                  label="Seleccione la Dirección general"
                >
                  <MenuItem value={""} key={"empty"}>
                    {""}
                  </MenuItem>
                  {data.dgenerales.map((est) => {
                    return (
                      <MenuItem value={est._id} key={est._id}>
                        {est.Direccion_General}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formState.errors.nuevocliente?.Direccion_General && (
                  <FormHelperText>
                    {formState.errors.nuevocliente?.Direccion_General.message}
                  </FormHelperText>
                )}
              </FormControl>
            ) : (
              <TextField
                type="text"
                label="Ingrese la nueva Direccion General"
                //value={clientesStore.nuevaDGeneral}
                onChange={(e) => clientesStore.setClientesFields("nuevaDGeneral", e.target.value)}
                {...register("nuevaDGeneral", {
                  required: "Es necesario ingresar la dirección general del cliente",
                })}
                error={!!formState.errors.nuevocliente?.nuevaDGeneral}
                helperText={formState.errors.nuevocliente?.nuevaDGeneral?.message}
                fullWidth
              />
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={nuevaDGeneral}
                  onChange={(e) => setNuevaDGeneral(e.target.checked)}
                />
              }
              label="Nueva Direccion General"
            />
          </Grid>
          {/*Seleccion Dirección area*/}
          <Grid item xs={6}>
            {!nuevaDArea ? (
              <FormControl fullWidth>
                <InputLabel id="direccion_area">Seleccione la dirección de area</InputLabel>
                <Select
                  autoComplete="off"
                  labelId="direccion_area"
                  id="direccion_area"
                  defaultValue={""}
                  {...register("direccion_area", {
                    required: "Es necesario seleccionar la dirección de área del cliente",
                  })}
                  error={!!formState.errors.nuevocliente?.direccion_area}
                  label="Seleccione la dirección de area"
                >
                  <MenuItem value={""} key={""}>
                    {""}
                  </MenuItem>
                  {data.dareas.map((est) => {
                    return (
                      <MenuItem value={est._id} key={est._id}>
                        {est.direccion_area}
                      </MenuItem>
                    );
                  })}
                </Select>
                {formState.errors.nuevocliente?.direccion_area && (
                  <FormHelperText>
                    {formState.errors.nuevocliente.direccion_area.message}
                  </FormHelperText>
                )}
              </FormControl>
            ) : (
              <TextField
                type="text"
                label="Ingrese la nueva Direccion de Area"
                //value={clientesStore.nuevaDArea}
                {...register("nuevaDArea", {
                  required: "Es necesario ingresar la dirección de área del cliente",
                })}
                error={!!formState.errors.nuevocliente?.nuevaDArea}
                helperText={formState.errors.nuevocliente?.nuevaDArea?.message}
                onChange={(e) => clientesStore.setClientesFields("nuevaDArea", e.target.value)}
                fullWidth
              />
            )}
            <FormControlLabel
              control={
                <Switch checked={nuevaDArea} onChange={(e) => setNuevaDArea(e.target.checked)} />
              }
              label="Nueva direccion de Area"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              id="Ubicacion"
              label="Ubicacion del cliente:"
              multiline
              {...register("ubicacion", {
                required: "Es necesario ingresar la ubicación del cliente",
              })}
              error={!!formState.errors.nuevocliente?.Ubicacion}
              helperText={formState.errors.nuevocliente?.Ubicacion?.message}
              rows={5}
              sx={{ width: "100%" }}
            />
          </Grid>
          {/* Botón de guardar */}
          <Grid item xs={6}>
            <LoadingButton
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              tabIndex={-1}
              startIcon={<SaveIcon color="secondary" />}
              loading={loading}
              loadingIndicator="Guardando Cliente…"
            >
              <span>
                <Typography color="secondary">{"Guardar Cliente"}</Typography>
              </span>
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
      {/* </Dialog> */}
    </React.Fragment>
  );
};

NuevoCliente.propTypes = {
  form: PropTypes.object,
  //formState: PropTypes.object,
};

export default React.memo(NuevoCliente);
