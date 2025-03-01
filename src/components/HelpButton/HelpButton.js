import React from "react";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
const HelpButton = ({ openWindow }) => {
  return (
    <IconButton
      onClick={() => {
        openWindow();
      }}
    >
      <HelpIcon color="primary" />
      <Typography variant="caption" fontWeight="light">
        Ayuda
      </Typography>
    </IconButton>
  );
};

HelpButton.propTypes = {
  openWindow: PropTypes.func,
};

export default HelpButton;
