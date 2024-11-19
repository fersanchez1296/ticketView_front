import React from "react";
//mui library component
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CodeIcon from "@mui/icons-material/Code";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
//api hook
import { useGetUsuariosQuery } from "api/index";
//card components
import CardUsers from "./components/index";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Reasignar = () => {
  const { data, isLoading } = useGetUsuariosQuery();
  const isWindowReasignarOpen = useDialogStore((state) => state.isWindowReasignarOpen);
  const closeWindowReasignar = useDialogStore((state) => state.closeWindowReasignar);
  const ticketState = useTicketStore();
  const [idResolutorSeleccionado, setIdResolutorSeleccionado] = React.useState("");
  const [value, setValue] = React.useState(0);
  if (isLoading) return <p>Cargando...</p>;
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

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isWindowReasignarOpen}
        onClose={() => {
          handleReset();
          ticketState.resetValues();
          closeWindowReasignar();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                handleReset();
                ticketState.resetValues();
                closeWindowReasignar();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cerrar
            </Typography>
            {ticketState.Reasignado_a ? (
              <Typography sx={{ flex: 1.5 }} variant="body2" component="p" color={"blue"}>
                El ticket ya se encuentra reasignado a : {ticketState.Reasignado_a.Nombre}
              </Typography>
            ) : null}
            <Button
              variant="contained"
              color="success"
              endIcon={<SaveIcon />}
              sx={{ border: "1px dashed green" }}
              onClick={reasignarTicket}
              disabled={idResolutorSeleccionado !== "" ? false : true}
            >
              Reasignar Ticket
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
            {data && data.areasResolutores
              ? data.areasResolutores.map((dt) => (
                  <Tab icon={<CodeIcon />} label={dt.area} key={dt.area} />
                ))
              : null}
          </Tabs>
        </Box>
        {data?.areasResolutores?.length > 0 ? (
          data.areasResolutores.map((res, index) => (
            <CustomTabPanel value={value} index={index} key={index}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={resolutorSeleccionado}
                    >
                      {res.resolutores.map((user) => (
                        <Grid item xs={12} sm={6} md={4} key={user._id}>
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
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(Reasignar);
