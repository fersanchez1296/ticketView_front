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
      <Grid container spacing={1}>
        {/*Introducido por teclado Nombre del cliente*/}
        <Grid item xs={12}>
          <TextField
            type="text"
            label="Nombre:"
            {...form.register("nuevocliente.nombre", {
              required: "Es necesario el nombre del cliente",
            })}
            error={!!formState.errors.nuevocliente?.nombre}
            helperText={formState.errors.nuevocliente?.nombre?.message}
            //defaultValue={clientesStore.Nombre} // Usa defaultValue en lugar de value
            //onChange={(e) => clientesStore.setClientesFields("Nombre", e.target.value)}
            fullWidth
          />
        </Grid>
        {/*Introducido por teclado Correo*/}
        <Grid item xs={6}>
          <TextField
            type="email" // Muestra validación de correo automáticamente
            label="Correo:"
            pattern=".+@example\.mx"
            //value={clientesStore.Correo}
            {...form.register("nuevocliente.correo", {
              required: "Es necesario el correo del cliente",
            })}
            error={!!formState.errors.nuevocliente?.correo}
            helperText={formState.errors.nuevocliente?.correo?.message}
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
            onChange={(e) => {
              // Permite solo números y un límite de longitud
              const input = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
              clientesStore.setClientesFields("Telefono", input);
            }}
            {...form.register("nuevocliente.telefono", {
              required: "Es necesario el teléfono del cliente",
            })}
            error={!!formState.errors.nuevocliente?.telefono}
            helperText={formState.errors.nuevocliente?.telefono?.message}
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
            value={clientesStore.Extension}
            onChange={(e) => {
              // Permite solo números y un límite de longitud
              const input = e.target.value.replace(/[^0-9]/g, ""); // Elimina caracteres no numéricos
              clientesStore.setClientesFields("Extension", input);
            }}
            {...form.register("nuevocliente.extesion")}
            inputProps={{
              maxLength: 10, // Limita el número de caracteres a 10 (ejemplo para teléfonos locales)
            }}
            fullWidth
          />
        </Grid>
        {/*Introducido por teclado Dependencia del cliente*/}
        <Grid item xs={6}>
          {!nuevaDependencia ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Seleccione la Dependencia</InputLabel>
              <Select
                sx={{ minHeight: "3rem" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                {...form.register("nuevocliente.dependencia", {
                  required: "Es necesario seleccionar la dependencia del cliente",
                })}
                error={!!formState.errors.nuevocliente?.dependencia}
                helperText={formState.errors.nuevocliente?.dependencia?.message}
                value={
                  typeof clientesStore.Dependencia === "string"
                    ? clientesStore.Dependencia
                    : clientesStore.Dependencia._id
                }
                label="Dependencia"
                onChange={(e) => clientesStore.setClientesFields("Dependencia", e.target.value)}
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
              {formState.errors.nuevocliente?.dependencia && (
                <FormHelperText>{formState.errors.nuevocliente.dependencia.message}</FormHelperText>
              )}
            </FormControl>
          ) : (
            <TextField
              type="text"
              label="Ingrese la nueva Dependencia"
              //value={clientesStore.nuevaDependencia}
              {...form.register("nuevocliente.nuevaDependencia", {
                required: "Es necesario ingresar la dependencia del cliente",
              })}
              error={!!formState.errors.nuevocliente?.nuevaDependencia}
              helperText={formState.errors.nuevocliente?.nuevaDependencia?.message}
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
              <InputLabel id="demo-simple-select-label">Seleccione la Dirección general</InputLabel>
              <Select
                sx={{ minHeight: "3rem" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                {...form.register("nuevocliente.direccionGeneral", {
                  required: "Es necesario seleccionar la dirección general del cliente",
                })}
                error={!!formState.errors.nuevocliente?.direccionGeneral}
                value={
                  typeof clientesStore.Direccion_General === "string"
                    ? clientesStore.Direccion_General
                    : clientesStore.Direccion_General._id
                }
                label="Estatus"
                onChange={(e) =>
                  clientesStore.setClientesFields("Direccion_General", e.target.value)
                }
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
              {formState.errors.nuevocliente?.direccionGeneral && (
                <FormHelperText>
                  {formState.errors.nuevocliente?.direccionGeneral.message}
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            <TextField
              type="text"
              label="Ingrese la nueva Direccion General"
              //value={clientesStore.nuevaDGeneral}
              onChange={(e) => clientesStore.setClientesFields("nuevaDGeneral", e.target.value)}
              {...form.register("nuevocliente.nuevaDGeneral", {
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
              <InputLabel id="demo-simple-select-label">Seleccione la dirección de area</InputLabel>
              <Select
                sx={{ minHeight: "3rem" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                {...form.register("nuevocliente.direccionArea", {
                  required: "Es necesario seleccionar la dirección de área del cliente",
                })}
                error={!!formState.errors.nuevocliente?.direccionArea}
                value={
                  typeof clientesStore.direccion_area === "string"
                    ? clientesStore.direccion_area
                    : clientesStore.direccion_area._id
                }
                label="Estatus"
                onChange={(e) => clientesStore.setClientesFields("direccion_area", e.target.value)}
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
              {formState.errors.nuevocliente?.direccionArea && (
                <FormHelperText>
                  {formState.errors.nuevocliente.direccionArea.message}
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            <TextField
              type="text"
              label="Ingrese la nueva Direccion de Area"
              //value={clientesStore.nuevaDArea}
              {...form.register("nuevocliente.nuevaDArea", {
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
            id="outlined-multiline-static"
            label="Ubicacion del cliente:"
            multiline
            // value={clientesStore.Ubicacion}
            {...form.register("nuevocliente.ubicacion", {
              required: "Es necesario ingresar la ubicación del cliente",
            })}
            error={!!formState.errors.nuevocliente?.ubicacion}
            helperText={formState.errors.nuevocliente?.ubicacion?.message}
            onChange={(e) => clientesStore.setClientesFields("Ubicacion", e.target.value)}
            rows={5}
            sx={{ width: "100%" }}
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
