import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

//api hook
import { useGetUsuariosQuery } from "api/index";
//store
import { useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
//json
import estados from "catalogs/estatus.json";

{
  /**const Resolutor = ({ disable_input, data }) => {
  const ticket = useTicketStore();
  console.log(data);*/
}
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
const Reasignar = () => {
  const { data, isLoading } = useGetUsuariosQuery();
  const ticketState = useTicketStore();
  const [idResolutorSeleccionado, setIdResolutorSeleccionado] = React.useState("");
  const [value, setValue] = React.useState(0);
  if (isLoading) return <p>Cargando...</p>;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const handleChange = (event) => {
  //   setValue(event.target.value); // Actualiza el valor seleccionado
  // };
  //const [createDocumento] = usePostDocumentoMutation();

  const resolutorSeleccionado = (e) => {
    e.preventDefault();
    setIdResolutorSeleccionado(e.target.value);
  };

  const reasignarTicket = () => {
    console.log(idResolutorSeleccionado);
  };

  const handleReset = () => {
    setValue(0);
  };

  return (
    <React.Fragment>
      <MDBox
        variant="gradient"
        bgColor="dark"
        borderRadius="lg"
        coloredShadow="info"
        mx={2}
        mt={2}
        p={2}
        mb={3}
        textAlign="center"
      >
        <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Asignación del ticket
        </MDTypography>
      </MDBox>
      <Box
        sx={{
          width: "80%",
          bgcolor: "background.paper",
          ml: "5%",
          p: 2, // Padding interno
          borderRadius: "8px", // Bordes redondeados
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra
          border: "1px solid #e0e0e0", // Borde ligero
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2, // Margen inferior
            textAlign: "center",
          }}
        >
          Selector de Área
        </Typography>
        <Grid item xs={12} sm={6} md={12} key={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Selección de área"
            centered // Centra los tabs
            variant="scrollable" // Habilita el scroll en caso de muchos tabs
            scrollButtons="auto" // Muestra los botones de scroll automáticamente
            sx={{
              ".MuiTab-root": {
                fontWeight: "bold",
                textTransform: "none", // Evita texto en mayúsculas
                fontSize: "1rem",
                minWidth: "100px",
                "&:hover": {
                  color: "primary.main", // Cambia el color al pasar el ratón
                },
              },
            }}
          >
            {data?.areasResolutores?.map((dt) => (
              <Tab label={dt.area} key={dt.area} />
            ))}
          </Tabs>
        </Grid>
      </Box>
      {/*<Box sx={{ width: "30%", bgcolor: "background.paper", ml: "5%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-autowidth-label">Saleccione área</InputLabel>
          <Select
            sx={{ minHeight: "3rem" }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={value}
            onChange={handleChange}
            label="Seleccione un área"
          >
            {data?.areasResolutores?.map((dt) => (
              <MenuItem value={dt.area} key={dt.area}>
                {dt.area}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>*/}
      {/*Mostrar los resolutores correspondientes */}
      {data?.areasResolutores?.length > 0 && value >= 0 ? (
        <CustomTabPanel value={value} index={value} key={value}>
          <Box sx={{ flexGrow: 1, mt: 2 }}>
            <Grid container spacing={2} justifyContent="center">
              {/* Mostrar los usuarios (resolutores) de la área seleccionada */}
              {data.areasResolutores[value]?.resolutores?.map((user) => (
                <Grid item xs={12} sm={6} md={6} key={user._id}>
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "background.paper",
                      padding: 1,
                      borderRadius: 5,
                      boxShadow: 2,
                    }}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={user.Nombre} src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.Nombre}
                        secondary={
                          <Typography component="span" variant="body2" color="text.secondary">
                            {user.Correo}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <FormControlLabel
                      value={user._id.toString()}
                      control={<Radio />}
                      label=""
                      sx={{ marginLeft: "auto" }}
                    />
                  </List>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CustomTabPanel>
      ) : (
        <p>No hay resolutores disponibles para esta área.</p>
      )}
    </React.Fragment>
  );
};

export default React.memo(Reasignar);
