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
import Grid from "@mui/material/Unstable_Grid2";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useTicketStore } from "zustand/index.ts";
import { useForm } from "react-hook-form";
// import { useReasignarTicketStore } from "./store/reasignarTicket.store.ts";
import { useGetUsuariosQuery } from "api";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Index = ({ children, title, isOpen, onClose, onSave }) => {
  const ticketStore = useTicketStore();
  const form = useForm({
    defaultValues: {
      ...ticketStore,
    },
  });
  const { register, handleSubmit, formState, setValue, watch, reset } = form;
  const { errors } = formState;
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const handleSave = async (data) => {
    try {
      await onSave({ data });
      reset();
      // onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={() => {
          //resetStore();
          onClose();
        }}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "sticky", marginBottom: "10px" }} color="secondary">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                onClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
              <Typography sx={{ ml: 2 }} variant="h4" component="div" color={"White"}>
                Cerrar
              </Typography>
            </IconButton>
            <Typography sx={{ ml: 2 }} variant="h4" component="div" color={"White"}>
              {`Ticket #${ticketStore.Id}`}
            </Typography>
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              sx={{ backgroundColor: "#7557C1", color: "White" }}
              onClick={handleSubmit(handleSave)}
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDBox bgColor="primary" borderRadius="lg" mx={2} p={2} mb={3} textAlign="left">
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                {title}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(handleSave)}>
          {React.Children.map(children, (child) => React.cloneElement(child, { form, formState }))}
        </form>
      </Dialog>
    </React.Fragment>
  );
};
Index.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  resetStore: PropTypes.func.isRequired,
};

export default React.memo(Index);
