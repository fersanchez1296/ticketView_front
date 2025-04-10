/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
//import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
//import LoadingButton from "@mui/lab/LoadingButton";
//import SearchIcon from "@mui/icons-material/Search";
//api hook
//import { useGetTicketByIdMutation } from "api/ticketsApi";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
//import MDInput from "components/MDInput";
//import { TextField } from "@mui/material";
// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

//store
//import { useTicketStore, useDialogStore } from "zustand/index.ts";
// import { useAuthStore } from "zustand/auth.store.ts";
// import MDButton from "components/MDButton";
//snackbar store
// import { useSnackbarStore } from "zustand/snackbarState.store.ts";
//snackbar
// import SuccessSB from "components/Snackbar/success/index";
// import ErrorSB from "components/Snackbar/error/index";
function DashboardNavbar({ absolute, light, isMini }) {
  //const [loading, setLoading] = React.useState(false);
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  //const [ticketId, setTicketId] = React.useState("");
  //const [postTicket] = useGetTicketByIdMutation();
  //const { role } = useAuthStore();
  //const openWindow = useDialogStore((state) => state.openWindow);
  //const setTicketFromFetch = useTicketStore((state) => state.setTicketFetch);
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  //const { openSuccessSB, openErrorSB } = useSnackbarStore();

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const getTicket = async () => {
    try {
      const resultado = postTicket(ticketId);
      console.log(resultado);
      //resultado ? setTicketFromFetch(resultado) : null;
    } catch (error) {
      console.log(error);
    }
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });
  // const buscarTicket = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   try {
  //     const result = await postTicket(ticketId);
  //     if (result.error) {
  //       openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
  //     } else {
  //       openSuccessSB(result.data.desc, `Status: 200`);
  //       setTicketFromFetch(result.data[0]);
  //       openWindow();
  //       setTicketId("");
  //     }
  //   } catch (error) {
  //     openErrorSB("Verifica tu busqueda", `Status: ${result.error.status}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <>
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
      >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </MDBox>
          {/* {role != "Usuario" ? (
            <>
              {isMini ? null : (
                <MDBox
                  sx={(theme) => navbarRow(theme, { isMini })}
                  component="form"
                  role="form"
                  onSubmit={buscarTicket}
                >
                  <TextField
                    type="number"
                    label="Buscar Ticket por ID:"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    sx={{ marginRight: "5px" }}
                    fullWidth
                  />

                  <IconButton
                    size="small"
                    disableRipple
                    color="inherit"
                    sx={navbarMobileMenu}
                    onClick={handleMiniSidenav}
                  >
                    <Icon sx={iconsStyle} fontSize="medium">
                      {miniSidenav ? "menu_open" : "menu"}
                    </Icon>
                  </IconButton>
                  <LoadingButton
                    variant={"contained"}
                    onClick={buscarTicket}
                    endIcon={<SearchIcon />}
                    sx={{ backgroundColor: "#7557C1", color: "White" }}
                    type={"submit"}
                    loading={loading}
                    loadingIndicator="Buscando…"
                    disabled={!ticketId ? true : false}
                  >
                    <span>Buscar</span>
                  </LoadingButton>
                </MDBox>
              )}
            </>
          ) : null} */}
        </Toolbar>
      </AppBar>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
