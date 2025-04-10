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
import React, { useEffect } from "react";
// react-router-dom components
import { useLocation, NavLink, Navigate, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

//api
import { useLogoutMutation } from "api/authApi";
import { useExcelMutation, useManualMutation } from "api/dashboardApi";
import { useTicketStore, useDialogStore } from "zustand/index.ts";

//store
import { useAuthStore } from "zustand/auth.store.ts";
import { useGetTicketByIdMutation } from "api/ticketsApi";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const openWindow = useDialogStore((state) => state.openWindow);
  const setAuth = useAuthStore((state) => state.setAuth);
  const setRole = useAuthStore((state) => state.setRole);
  const { role } = useAuthStore();
  const [logout] = useLogoutMutation();
  const [downloadExcel] = useExcelMutation();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const [ticketId, setTicketId] = React.useState("");
  const [postTicket] = useGetTicketByIdMutation();
  const setTicketFromFetch = useTicketStore((state) => state.setTicketFetch);

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const handleDownload = async () => {
    try {
      const response = await downloadExcel().unwrap(); // Obtiene la respuesta en formato Blob
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tickets.xlsx"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el Excel:", error);
    }
  };

  const handleDownloadManual = async () => {
    try {
      const response = await useManualMutation().unwrap(); // Obtiene la respuesta en formato Blob
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "manual-chermina.pdf"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el manual:", error);
    }
  };

  const buscarTicket = async (e) => {
    setLoading(true);
    e.preventDefault();
    let result = undefined;
    try {
      result = await postTicket(ticketId);
      if (result.error) {
        openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
      } else {
        openSuccessSB(result.data.desc, `Status: 200`);
        setTicketFromFetch(result.data[0]);
        openWindow();
        setTicketId("");
      }
    } catch (error) {
      console.log(error);
      openErrorSB("Verifica tu busqueda", `Status: ${result.error.status}`);
    } finally {
      setLoading(false);
    }
  };

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <MDTypography
          key={key}
          color={textColor}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </MDTypography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider
          key={key}
          light={
            (!darkMode && !whiteSidenav && !transparentSidenav) ||
            (darkMode && !transparentSidenav && whiteSidenav)
          }
        />
      );
    }

    return returnValue;
  });

  const signout = async () => {
    try {
      await logout();
      setAuth(false);
      setRole("");
      sessionStorage.removeItem("auth-storage");
      navigate("/login");
    } catch (error) {}
  };

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <MDBox component="img" src={brand} alt="Brand" width="2rem" borderRadius="50%" />
          )}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <a
          href={"http://172.16.1.13:4400/files/uploads/manual-chermina.pdf"}
          target="_blank"
          rel="noreferrer"
        >
          <MDButton
            component="a"
            //onClick={handleDownloadManual}
            //target="_self"
            //rel="noreferrer"
            color="primary"
            fullWidth
          >
            Manual de usuario
          </MDButton>
        </a>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      {role !== "Usuario" && (
        <>
          <MDBox
            component="form"
            p={2}
            mt="auto"
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <TextField
              type="number"
              label="Buscar por Id:"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              sx={{
                "& .MuiInputBase-input": {
                  color: "White",
                  fontWeight: "bold",
                },
                // Estilo del label (etiqueta)
                "& .MuiInputLabel-root": {
                  color: "White",
                  fontWeight: "bold",
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              fullWidth
            />
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
          <Divider
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        </>
      )}

      <List>{renderRoutes}</List>
      <MDBox p={2} mt="auto">
        <MDButton
          component="a"
          onClick={signout}
          target="_blank"
          rel="noreferrer"
          //variant="gradient"
          color="primary"
          fullWidth
        >
          Log out
        </MDButton>
      </MDBox>
      {role === "Root" && (
        <MDBox p={2} mt="auto">
          <MDButton
            component="a"
            onClick={handleDownload}
            target="_self"
            rel="noreferrer"
            color="success"
            fullWidth
          >
            Descargar Excel
          </MDButton>
        </MDBox>
      )}
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "primary",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
