// Importaciones
import React, { useState } from "react";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
//mui library component
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormHelperText from "@mui/material/FormHelperText";
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.)
import { useSelectsClientesQuery } from "api/clientesApi";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
import { useClientesStore } from "zustand/index.ts";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
import PropTypes from "prop-types";
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
/* -------------------------------------------------------------------------- */
const NuevoCliente = ({ form, formState }) => {
  // API Hooks (RTK Query, Axios, etc.)
  const { data, isLoading } = useSelectsClientesQuery();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const clientesStore = useClientesStore();
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [nuevaDGeneral, setNuevaDGeneral] = useState(false);
  const [nuevaDArea, setNuevaDArea] = useState(false);
  const [nuevaDependencia, setNuevaDependencia] = useState(false);
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
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <React.Fragment>
      <Grid container spacing={1} m={1}>
        {/*Introducido por teclado Nombre del cliente*/}
        <Grid item xs={12}>
          <TextField
            type="text"
            label="Nombre:"
            {...form.register("Nombre", {
              required: "Es necesario el nombre del cliente",
            })}
            error={!!formState.errors.Nombre}
            helperText={formState.errors.Nombre?.message}
            fullWidth
          />
        </Grid>
        {/*Introducido por teclado Correo*/}
        <Grid item xs={12}>
          <TextField
            type="email" // Muestra validación de correo automáticamente
            label="Correo:"
            pattern=".+@example\.mx"
            {...form.register("Correo", {
              required: "Es necesario el correo del cliente",
            })}
            error={!!formState.errors.Correo}
            helperText={formState.errors.Correo?.message}
            onChange={(e) => clientesStore.setClientesFields("Correo", e.target.value)}
            fullWidth
          />
        </Grid>
        {/*Introducido por teclado Teléfono*/}
        <Grid item xs={6}>
          <TextField
            type="tel" // Tipo tel para mostrar un teclado numérico en móviles
            label="Teléfono:"
            //value={clientesStore.Telefono}
            {...form.register("Telefono", {
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
            error={!!formState.errors.Telefono}
            helperText={formState.errors.Telefono?.message}
            inputProps={{
              maxLength: 10, // Limita el número de caracteres a 10 (ejemplo para teléfonos locales)
            }}
            fullWidth
          />
        </Grid>
        {/*Introducido por teclado extension*/}
        <Grid item xs={6}>
          <TextField
            type="tel" // Tipo tel para mostrar un teclado numérico en móviles
            label="Extensión:"
            {...form.register("Extension", {
              maxLength: {
                value: 6,
                message: "La extensión solo puede contener un máximo de 6 números.",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "La extensión solo puede contener números",
              },
            })}
            error={!!formState.errors.Extension}
            helperText={formState.errors.Extension?.message}
            inputProps={{
              maxLength: 6,
            }}
            fullWidth
          />
        </Grid>
        {/*Introducido por teclado Dependencia del cliente*/}
        <Grid item xs={6}>
          {!nuevaDependencia ? (
            <FormControl fullWidth>
              <InputLabel id="dependencia">Seleccione la Dependencia</InputLabel>
              <Select
                labelId="dependencia"
                id="dependencia"
                defaultValue={form.getValues("Dependencia._id") || ""}
                {...form.register("Dependencia", {
                  required: "Es necesario seleccionar la dependencia del cliente",
                })}
                error={!!formState.errors.Dependencia}
                helperText={formState.errors.Dependencia?.message}
                label="Dependencia"
              >
                <MenuItem value={""} key={"empty"}>
                  {""}
                </MenuItem>
                {data.dependencias.map((est) => {
                  return (
                    <MenuItem value={est._id} key={est._id}>
                      {est.Dependencia}
                    </MenuItem>
                  );
                })}
              </Select>
              {formState.errors.Dependencia && (
                <FormHelperText>{formState.errors.Dependencia.message}</FormHelperText>
              )}
            </FormControl>
          ) : (
            <TextField
              type="text"
              label="Ingrese la nueva Dependencia"
              //value={clientesStore.nuevaDependencia}
              {...form.register("nuevaDependencia", {
                required: "Es necesario ingresar la dependencia del cliente",
              })}
              error={!!formState.errors.nuevaDependencia}
              helperText={formState.errors.nuevaDependencia?.message}
              onChange={(e) => clientesStore.setClientesFields("nuevaDependencia", e.target.value)}
              fullWidth
            />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={nuevaDependencia}
                onChange={(e) => setNuevaDependencia(e.target.checked)}
              />
            }
            label="Nueva dependencia"
          />
        </Grid>
        {/*Seleccion Dirección general*/}
        <Grid item xs={6}>
          {!nuevaDGeneral ? (
            <FormControl fullWidth>
              <InputLabel id="direccion_general">Seleccione la Dirección general</InputLabel>
              <Select
                labelId="direccion_general"
                id="direccion_general"
                defaultValue={form.getValues("Direccion_General._id") || ""}
                {...form.register("Direccion_General", {
                  required: "Es necesario seleccionar la dirección general del cliente",
                })}
                error={!!formState.errors.Direccion_General}
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
              {formState.errors.Direccion_General && (
                <FormHelperText>{formState.errors.Direccion_General.message}</FormHelperText>
              )}
            </FormControl>
          ) : (
            <TextField
              type="text"
              label="Ingrese la nueva Direccion General"
              //value={clientesStore.nuevaDGeneral}
              onChange={(e) => clientesStore.setClientesFields("nuevaDGeneral", e.target.value)}
              {...form.register("nuevaDGeneral", {
                required: "Es necesario ingresar la dirección general del cliente",
              })}
              error={!!formState.errors.nuevaDGeneral}
              helperText={formState.errors.nuevaDGeneral?.message}
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
        <Grid item xs={12}>
          {!nuevaDArea ? (
            <FormControl fullWidth>
              <InputLabel id="direccion_area">Seleccione la dirección de area</InputLabel>
              <Select
                labelId="direccion_area"
                id="direccion_area"
                defaultValue={form.getValues("direccion_area._id") || ""}
                {...form.register("direccion_area", {
                  required: "Es necesario seleccionar la dirección de área del cliente",
                })}
                error={!!formState.errors.direccion_area}
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
              {formState.errors.direccion_area && (
                <FormHelperText>{formState.errors.direccion_area.message}</FormHelperText>
              )}
            </FormControl>
          ) : (
            <TextField
              type="text"
              label="Ingrese la nueva Direccion de Area"
              //value={clientesStore.nuevaDArea}
              {...form.register("nuevaDArea", {
                required: "Es necesario ingresar la dirección de área del cliente",
              })}
              error={!!formState.errors.nuevaDArea}
              helperText={formState.errors.nuevaDArea?.message}
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
            id="Ubicacion"
            label="Ubicacion del cliente:"
            multiline
            {...form.register("Ubicacion", {
              required: "Es necesario ingresar la ubicación del cliente",
            })}
            error={!!formState.errors.Ubicacion}
            helperText={formState.errors.Ubicacion?.message}
            rows={5}
            fullWidth
          />
        </Grid>
      </Grid>
      {/* </Dialog> */}
    </React.Fragment>
  );
};

NuevoCliente.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(NuevoCliente);
