// Importaciones
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.)
import { useLazyGetClienteByCorreoQuery } from "api/clientesApi.js";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
import { useCrearTicketStore } from "../store/crearTicket.store.ts";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
/* -------------------------------------------------------------------------- */
const BuscarCliente = ({ form, formState }) => {
  // API Hooks (RTK Query, Axios, etc.)
  const [getCliente] = useLazyGetClienteByCorreoQuery();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const crearTicketFields = useCrearTicketStore((state) => state.setCrearTicketFields);
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [loading, setLoading] = React.useState(false);
  const [clienteExiste, setClienteExiste] = React.useState(false);
  const openErrorSB = useSnackbarStore((state) => state.openErrorSB);
  const [data, setData] = React.useState({});
  const [correo, setCorreo] = React.useState();
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
  const buscarCliente = async () => {
    setLoading(true);
    try {
      const result = await getCliente({ Correo: correo });
      if (result.data) {
        setClienteExiste(true);
        setData(result.data);
        form.setValue("Cliente", result.data._id);
      } else {
        setClienteExiste(false);
        setData({});
        openErrorSB("No se encontro el cliente en la base de datos", `Status: 404`);
      }
    } catch (error) {
      setClienteExiste(false);
      setData({});
    } finally {
      setLoading(false);
    }
  };
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <Grid container spacing={2}>
      {/*Introducido por teclado Correo*/}
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
          type="email" // Muestra validación de correo automáticamente
          label="Correo o nombre completo del cliente:"
          defaultValue={correo}
          {...form.register("correocliente", {
            required: "Es necesario buscar un cliente o agregar uno nuevo.",
          })}
          error={!!formState.errors.correocliente}
          helperText={formState.errors.correocliente?.message}
          onChange={(e) => setCorreo(e.target.value)}
          fullWidth
        />
      </Grid>
      {/*Boton para buscar al cliente*/}
      <Grid item xs={6}>
        <LoadingButton
          variant="outlined"
          color="primary"
          size="medium"
          endIcon={<SearchIcon color="primary" />}
          sx={{ color: "#7557c1" }}
          loading={loading}
          loadingIndicator="Buscando..."
          onClick={() => buscarCliente()}
        >
          Buscar Cliente
        </LoadingButton>
      </Grid>
      {clienteExiste && Object.keys(data).length > 0 ? (
        <>
          {/*Introducido por teclado Nombre del cliente*/}
          <Grid item xs={12}>
            <MDInput
              type="text"
              label="Nombre:"
              disabled={clienteExiste ? true : false}
              value={data?.Nombre || ""}
              fullWidth
            />
          </Grid>
          {/*Introducido por teclado Correo*/}
          <Grid item xs={6}>
            <MDInput
              type="text" // Muestra validación de correo automáticamente
              label="Correo:"
              disabled={clienteExiste ? true : false}
              value={data.Correo}
              fullWidth
              required
            />
          </Grid>
          {/*Introducido por teclado Teléfono*/}
          <Grid item xs={6}>
            <MDInput
              type="text" // Tipo tel para mostrar un teclado numérico en móviles
              label="Teléfono:"
              disabled={clienteExiste ? true : false}
              value={data?.Telefono}
              fullWidth
            />
          </Grid>
          {/*Introducido por teclado Extension*/}
          <Grid item xs={6}>
            <MDInput
              type="text" // Tipo tel para mostrar un teclado numérico en móviles
              label="Extension:"
              disabled={clienteExiste ? true : false}
              value={data?.Extension || ""}
              fullWidth
            />
          </Grid>
          {/*Introducido por teclado Dependencia del cliente*/}
          <Grid item xs={6}>
            <MDInput
              label="Dependencia:"
              disabled={clienteExiste ? true : false}
              value={data?.Dependencia?.Dependencia || ""}
              fullWidth
            />
          </Grid>
          {/*Seleccion Dirección general*/}
          <Grid item xs={6}>
            <MDInput
              label="Dirección general:"
              disabled={clienteExiste ? true : false}
              value={data?.Direccion_General?.Direccion_General || ""}
              fullWidth
            />
          </Grid>
          {/*Seleccion Dirección area*/}
          <Grid item xs={6}>
            <MDInput
              label="Area:"
              disabled={clienteExiste ? true : false}
              value={data?.direccion_area?.direccion_area || ""}
              fullWidth
            />
          </Grid>
          {/*Introducido por teclado ubicacion del cliente*/}
          <Grid item xs={12}>
            <MDBox mb={2}>
              <TextField
                id="outlined-multiline-static"
                label="Ubicacion del cliente:"
                multiline
                value={data && data.Ubicacion}
                disabled={clienteExiste ? true : false}
                onChange={(e) => crearTicketFields("Descripcion", e.target.value)}
                rows={5.2}
                defaultValue="Sin información"
                sx={{ width: "100%" }}
              />
            </MDBox>
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

BuscarCliente.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(BuscarCliente);
