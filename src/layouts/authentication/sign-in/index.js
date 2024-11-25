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
import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import hacienda from "assets/images/dep_hacienda.png";
import jalisco from "assets/images/jalisco.png";

//api
import { useLoginMutation } from "api";

//store
import { useAuthStore } from "zustand/auth.store.ts";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [login, { isLoading, error }] = useLoginMutation();
  const [Username, setUser] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setRole = useAuthStore((state) => state.setRole);

  const handleChange = (input, value) => {
    input === "user" ? setUser(value) : setPassword(value);
  };

  const signin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ Username, Password });
      if (response.data.status === 200) {
        console.log(response);
        setAuth(true);
        setRole(response.data.Rol);
        navigate("/dashboard");
      }
    } catch (err) {
      setAuth(false);
      console.error("Failed to login", err);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Iniciar Sesión
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Usuario"
                onChange={(e) => handleChange("user", e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                onChange={(e) => handleChange("password", e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={(e) => signin(e)} fullWidth>
                Iniciar Sesión
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
