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
//api hook
import { useGetUsuariosQuery } from "api/index";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
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
const Reasignar = ({ data }) => {
  const ticketState = useTicketStore();
  const [idResolutorSeleccionado, setIdResolutorSeleccionado] = React.useState("");
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  console.log(data);
  return (
    <React.Fragment>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          {data && data.areasResolutores
            ? data.areasResolutores.map((dt) => <Tab label={dt.area} key={dt.area} />)
            : null}
        </Tabs>
      </Box>
      {data?.areasResolutores?.length > 0 ? (
        data.areasResolutores.map((res, index) => (
          <CustomTabPanel value={value} index={index} key={index}>
            <Box sx={{ flexGrow: 1, width: "80%" }}>
              <Grid container spacing={2}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onChange={resolutorSeleccionado}
                  >
                    {res.resolutores.map((user) => (
                      <Grid item xs={6} sm={6} md={4} key={user._id}>
                        <List
                          sx={{
                            display: "flex",
                            width: "100%",
                            bgcolor: "background.paper",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <ListItem alignItems="flex-start" sx={{ marginBottom: "1rem" }}>
                            <ListItemAvatar>
                              <Avatar alt={user.Nombre} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                              primary={user.Nombre}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ color: "text.primary", display: "inline" }}
                                  >
                                    {user.Correo}
                                  </Typography>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                          <FormControlLabel value={user._id.toString()} control={<Radio />} />
                        </List>
                      </Grid>
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Box>
          </CustomTabPanel>
        ))
      ) : (
        <p>hola</p>
      )}
    </React.Fragment>
  );
};

Reasignar.propTypes = {
  data: PropTypes.array,
};
export default React.memo(Reasignar);
