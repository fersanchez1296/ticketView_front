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
import LoadingButton from "@mui/lab/LoadingButton";
import HelpButton from "components/HelpButton/HelpButton";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
import { useDialogStore } from "zustand/index.ts";
import { useForm } from "react-hook-form";
import Help from "components/TicketWindow/Help";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Index = ({ children, title, isOpen, onClose, onSave, store, helpKey }) => {
  const form = useForm({
    defaultValues: {
      ...store,
      Files: [],
    },
  });
  const { isHelpWindowOpen, openWindowHelp } = useDialogStore();
  const [loading, setLoading] = React.useState(false);
  const { handleSubmit, formState, reset } = form;
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const handleSave = async (data) => {
    setLoading(true);
    let result;
    try {
      result = await onSave({ data });
      if (!result) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        reset();
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } catch (error) {
      openErrorSB(result.error.data.desc, `Status: 500`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={() => {
          store.resetValues();
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
                store.resetValues();
                onClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
              <Typography sx={{ ml: 2 }} variant="h4" component="div" color={"White"}>
                Cerrar
              </Typography>
            </IconButton>
            <Typography variant="h4" component="div" color={"White"}>
              {store.Creado_por ? `Ticket #${store.Id}` : `${store.Nombre}`}
            </Typography>
            {onSave ? (
              <LoadingButton
                variant="contained"
                size="large"
                endIcon={<SaveIcon />}
                sx={{ backgroundColor: "#7557C1", color: "White" }}
                onClick={handleSubmit(handleSave)}
                loading={loading}
                loadingIndicator="Guardando…"
              >
                <span>Guardar</span>
              </LoadingButton>
            ) : null}
          </Toolbar>
        </AppBar>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <HelpButton openWindow={openWindowHelp} />
          </Grid>
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
        {isHelpWindowOpen ? <Help helpKey={helpKey} /> : null}
      </Dialog>
    </React.Fragment>
  );
};
Index.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  helpKey: PropTypes.string,
  store: PropTypes.object.isRequired,
};

export default React.memo(Index);
