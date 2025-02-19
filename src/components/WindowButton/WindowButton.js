import React from "react";
import MDButton from "components/MDButton";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
const WindowButton = ({ ticket, color, store, openWindow, label }) => {
  return (
    <MDButton
      color={color}
      variant={"contained"}
      onClick={() => {
        store(ticket);
        openWindow();
      }}
    >
      <Typography component="a" href="#" variant="caption" color="White" fontWeight="medium">
        {label}
      </Typography>
    </MDButton>
  );
};

WindowButton.propTypes = {
  ticket: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  store: PropTypes.func,
  openWindow: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default WindowButton;
