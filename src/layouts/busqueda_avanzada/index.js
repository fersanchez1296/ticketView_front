// Importaciones
import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SuccessSB from "components/Snackbar/success/index";
import ErrorSB from "components/Snackbar/error/index";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
/* -------------------------------------------------------------------------- */
// Importaciones de librerías externas
//mui library component
/* -------------------------------------------------------------------------- */
// Importaciones de hooks de API (RTK Query, Axios, etc.
import { useBusquedaAvanzadaMutation } from "api/dashboardApi";
/* -------------------------------------------------------------------------- */
// Importaciones de Zustand u otro gestor de estado
import Progress from "components/Progress";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
import { useAuthStore } from "zustand/auth.store.ts";
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import TicketsData from "./data/ticketsData";
/* -------------------------------------------------------------------------- */
// Importaciones de utilidades, helpers o constantes
/* -------------------------------------------------------------------------- */
// Importaciones de componentes internos
import DataTable from "../../components/DataTable/index";
/* -------------------------------------------------------------------------- */
const Edit = () => {
  // API Hooks (RTK Query, Axios, etc.)
  const [busquedaAvanzada] = useBusquedaAvanzadaMutation();
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  /* -------------------------------------------------------------------------- */
  // Estado global de Zustand
  const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  const rol = useAuthStore((state) => state.role);
  const dialogStore = useDialogStore();
  /* -------------------------------------------------------------------------- */
  // Estados locales con useState
  const [loading, setLoading] = React.useState(false);
  const [criterio, setCriterio] = React.useState("general");
  const [termino, setTermino] = React.useState("");
  const [resultado, setResultado] = React.useState([]);
  /* -------------------------------------------------------------------------- */
  // Refs y useMemo / useCallback (si aplica)
  /* -------------------------------------------------------------------------- */
  // Efectos secundarios con useEffect
  /* -------------------------------------------------------------------------- */
  // Verificaciones de carga y errores (isLoading, isError)
  //   if (isLoading) return <Progress open={true} />;
  /* -------------------------------------------------------------------------- */
  // Funciones auxiliares
  const handleChange = (event) => {
    setCriterio(event.target.value);
  };
  const handleChangeTermino = (event) => {
    setTermino(event.target.value);
  };
  const handleBuscar = async () => {
    setLoading(true);
    let result;
    try {
      result = await busquedaAvanzada({ criterio, termino });
      if (!result) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
        setResultado([]);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        setResultado(result.data);
      }
    } catch (error) {
      openErrorSB(result.error.data.desc, `Status: 500`);
    } finally {
      setLoading(false);
    }
  };
  const getLabel = () => {
    switch (criterio) {
      case "general":
        return "Id, Área, Nombre-correo de cliente, Nombre-correo de resolutor, oficio, descripción:";
      case "id":
        return "Id del documento:";
      case "oficio":
        return "Número de oficio de recepción o de cierre:";
      case "nccliente":
        return "Correo o nombre del cliente:";
      case "ncresolutor":
        return "Nombre o correo del moderador o resolutor:";
      default:
        return "Término de búsqueda:";
    }
  };
  const { columns, rows } = React.useMemo(() => {
    return TicketsData(resultado, setTicketFields, rol, dialogStore);
  }, [resultado]);
  /* -------------------------------------------------------------------------- */
  // Renderizado del componente (return)
  return (
    <React.Fragment>
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container alignItems="center">
          {/* Título */}
          <Grid item xs={12}>
            <MDBox bgColor="primary" borderRadius="lg" mt={1} p={1} mb={1} textAlign="left">
              <Typography variant="h5" fontWeight="bold" color="White">
                Búsqueda avanzada
              </Typography>
            </MDBox>
          </Grid>
          {/* Input */}
          <Grid item xs={12} sx={{ display: "flex" }} mb={2} mt={1}>
            <FormControl
              sx={{
                width: "calc(100% / 4)", // Ejemplo: ancho completo menos 16px
              }}
            >
              <InputLabel id="demo-simple-select-label">Criterio</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={criterio}
                onChange={handleChange}
                fullWidth
                label="Criterio"
              >
                <MenuItem value={"general"}>General</MenuItem>
                <MenuItem value={"id"}>Id</MenuItem>
                <MenuItem value={"oficio"}>Número de oficio</MenuItem>
                <MenuItem value={"nccliente"}>Nombre/correo cliente</MenuItem>
                <MenuItem value={"ncresolutor"}>Nombre moderador/resolutor</MenuItem>
              </Select>
            </FormControl>

            <TextField
              value={termino}
              autoComplete="off"
              type="email"
              label={getLabel()}
              onChange={handleChangeTermino}
              fullWidth
            />
            <LoadingButton
              variant="outlined"
              color="primary"
              size="medium"
              endIcon={<SearchIcon color="primary" />}
              sx={{ color: "#7557c1" }}
              loading={loading}
              loadingIndicator="Buscando..."
              onClick={() => handleBuscar()}
            >
              Buscar
            </LoadingButton>
          </Grid>
          <Grid xs={12}>{resultado && <DataTable rows={rows} columns={columns} />}</Grid>
        </Grid>
      </DashboardLayout>
    </React.Fragment>
  );
};

export default React.memo(Edit);
