import * as React from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";

export default function SwitchActive({ isActive }) {
  const [checked, setIsChecked] = React.useState(isActive);

  React.useEffect(() => {
    setIsChecked(isActive);
  }, [isActive]);
  const cambiarEstadoUsuario = () => {
    console.log(checked);
  };

  const handleChange = () => {
    setIsChecked((prev) => {
      const newValue = !prev;
      cambiarEstadoUsuario(newValue);
      return newValue;
    });
  };
  return <Switch sx={{ m: 1 }} checked={checked} color="warning" onChange={handleChange} />;
}

SwitchActive.propTypes = {
  isActive: PropTypes.bool,
};
