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
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
//snackbar store
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//store
import { useDialogStore } from "zustand/index.ts";
// import { useReasignarTicketStore } from "./store/reasignarTicket.store.ts";
import { useGetUsuariosQuery } from "api";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Index = ({ children, title, isOpen, onClose, onSave, resetStore, data }) => {
  const closeWindowReabrir = useDialogStore((state) => state.closeWindowReabrir);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();

  const handleSave = async () => {
    const formData = new FormData();
    // try {
    //   formData.append("ticketData", JSON.stringify(resolverTicketStore));
    //   if (resolverTicketStore.Files instanceof File) {
    //     formData.append("file", resolverTicketStore.Files);
    //   }
    //   console.log(resolverTicketStore.Files);
    //   const result = await putTicket({ formData, ticketId });
    //   if (result.error) {
    //     openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
    //     return result;
    //   } else {
    //     openSuccessSB(result.data.desc, `Status: 200`);
    //     closeWindowResolver();
    //     resolverTicketStore.resolverTicketResetValues();
    //     return result;
    //   }
    // } catch (error) {
    //   openErrorSB("Ocurrio un error al resolver el ticket.", `Status: ${result.error.status}`);
    // }
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
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                //resetStore();
                onClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cerrar
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<SaveIcon />}
              sx={{ color: "Black" }}
              onClick={handleSave}
              //disabled={reasignarTicketStore.Reasignado_a === "" ? true : false}
            >
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <Grid xs={12}>
            <Card>
              <MDBox
                variant="gradient"
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
                  {title}
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    mt: 5,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {children}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
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
  data: PropTypes.array.isRequired,
};

export default React.memo(Index);
