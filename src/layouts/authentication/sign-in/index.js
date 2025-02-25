import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-profile.jpeg";
import { useLoginMutation } from "api/authApi";
import { useAuthStore } from "zustand/auth.store.ts";
import { jwtDecode } from "jwt-decode";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
import SuccessSB from "components/Snackbar/success/index";
import ErrorSB from "components/Snackbar/error/index";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [login, { isLoading, error }] = useLoginMutation();
  const [Username, setUser] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setRole = useAuthStore((state) => state.setRole);
  const setNombre = useAuthStore((state) => state.setNombre);
  const { openSuccessSB, openErrorSB } = useSnackbarStore();

  const handleChange = (input, value) => {
    input === "user" ? setUser(value) : setPassword(value);
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const signin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ Username, Password });
      if (response.error) {
        openErrorSB(response.error.data.desc, `Status: ${response.error.status}`);
      } else {
        const token = getCookie("access_token");
        const decoded = jwtDecode(token);
        openSuccessSB(response.data.desc, `Status: 200`);
        setAuth(true);
        setRole(decoded.rol);
        setNombre(decoded.nombre);
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
          bgColor="primary"
          borderRadius="lg"
          coloredShadow="secondary"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Chermina
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {/* AÑADIR onSubmit EN EL FORMULARIO */}
          <MDBox component="form" role="form" onSubmit={signin}>
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
              <MDButton variant="gradient" color="primary" type="submit" fullWidth>
                Iniciar Sesión
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <SuccessSB />
      <ErrorSB />
    </BasicLayout>
  );
}

export default Basic;
