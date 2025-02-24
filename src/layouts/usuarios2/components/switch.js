import * as React from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import Progress from "components/Progress";
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
import { useUpdateEstadoUsuarioMutation } from "api/usuariosApi";
import { Typography } from "@mui/material";
export default function SwitchActive({ isActive, userId }) {
  const { openSuccessSB, openErrorSB } = useSnackbarStore();
  const [updateUsuario] = useUpdateEstadoUsuarioMutation();
  const [checked, setIsChecked] = React.useState(isActive);

  const cambiarEstadoUsuario = async (newChecked) => {
    const result = await updateUsuario({ estado: newChecked, userId });
    if (result.error) {
      openErrorSB(result.error.data.desc, `Status: ${result.error.status}`);
    } else {
      openSuccessSB(result.data.desc, `Status: 200`);
    }
  };

  const handleChange = () => {
    setIsChecked((prev) => {
      const newChecked = !prev;
      cambiarEstadoUsuario(newChecked);
      return newChecked;
    });
  };
  return (
    <>
      <Typography variant="caption">Inactivo</Typography>
      <Switch sx={{ m: 1 }} checked={checked} color="warning" onChange={handleChange} />
      <Typography variant="caption">Activo</Typography>
    </>
  );
}

SwitchActive.propTypes = {
  isActive: PropTypes.bool,
  userId: PropTypes.string,
};
