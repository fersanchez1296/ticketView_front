// Importaciones
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.)
import { useLazyGetClienteByCorreoQuery } from "api/clientesApi.js";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
import { useCrearTicketStore } from "../store/crearTicket.store.ts";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
/* -------------------------------------------------------------------------- */
const BuscarCliente = () => {
  // API Hooks (RTK Query, Axios, etc.)
  const [getCliente] = useLazyGetClienteByCorreoQuery();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const crearTicketStore = useCrearTicketStore();
  const crearTicketFields = useCrearTicketStore((state) => state.setCrearTicketFields);
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [clienteExiste, setClienteExiste] = React.useState(false);
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
    try {
      const result = await getCliente({ Correo: correo });
      if (result.data) {
        setClienteExiste(true);
        setData(result.data);
        setCorreo("");
        crearTicketStore.Cliente = result.data._id;
      } else {
        setClienteExiste(false);
        setData({});
      }
    } catch (error) {
      setClienteExiste(false);
      setData({});
    }
  };
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={12} mb={12}>
        <Card>
          <MDBox
            //variant="gradient"
            bgColor="primary"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Cliente
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                {/*Introducido por teclado Correo*/}
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <MDInput
                      type="email" // Muestra validación de correo automáticamente
                      label="Correo:"
                      pattern=".+@example\.mx"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      fullWidth
                      required
                    />
                  </MDBox>
                </Grid>
                {/*Boton para buscar al cliente*/}
                <Grid xs={6}>
                  <MDBox mb={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="medium"
                      endIcon={<SearchIcon color="primary" />}
                      sx={{ color: "#7557c1" }}
                      onClick={() => buscarCliente()}
                    >
                      Buscar Cliente
                    </Button>
                  </MDBox>
                </Grid>

                {clienteExiste && Object.keys(data).length > 0 ? (
                  <>
                    {/*Introducido por teclado Nombre del cliente*/}
                    <Grid xs={6}>
                      <MDInput
                        type="text"
                        label="Nombre:"
                        disabled={clienteExiste ? true : false}
                        value={data?.Nombre || ""}
                        fullWidth
                      />
                    </Grid>
                    {/*Introducido por teclado Correo*/}
                    <Grid xs={6}>
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
                    <Grid xs={6}>
                      <MDInput
                        type="text" // Tipo tel para mostrar un teclado numérico en móviles
                        label="Teléfono:"
                        disabled={clienteExiste ? true : false}
                        value={data?.Telefono}
                        fullWidth
                      />
                    </Grid>
                    {/*Introducido por teclado Extension*/}
                    <Grid xs={6}>
                      <MDInput
                        type="text" // Tipo tel para mostrar un teclado numérico en móviles
                        label="Extension:"
                        disabled={clienteExiste ? true : false}
                        value={data?.Extension || ""}
                        fullWidth
                      />
                    </Grid>
                    {/*Introducido por teclado Dependencia del cliente*/}
                    <Grid xs={6}>
                      <MDInput
                        label="Dependencia:"
                        disabled={clienteExiste ? true : false}
                        value={data?.Dependencia?.Dependencia || ""}
                        fullWidth
                      />
                    </Grid>
                    {/*Seleccion Dirección general*/}
                    <Grid xs={6}>
                      <MDInput
                        label="Dirección general:"
                        disabled={clienteExiste ? true : false}
                        value={data?.Direccion_General?.Direccion_General || ""}
                        fullWidth
                      />
                    </Grid>
                    {/*Seleccion Dirección area*/}
                    <Grid xs={6}>
                      <MDInput
                        label="Area:"
                        disabled={clienteExiste ? true : false}
                        value={data?.direccion_area?.direccion_area || ""}
                        fullWidth
                      />
                    </Grid>
                    {/*Introducido por teclado ubicacion del cliente*/}
                    <Grid xs={12}>
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
                {!clienteExiste ? (
                  <div>Ingresa un correo válido para el cliente.</div>
                ) : !clienteExiste && Object.keys(data).length === 0 ? (
                  <div>El cliente no existe</div>
                ) : null}
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
};

export default React.memo(BuscarCliente);
