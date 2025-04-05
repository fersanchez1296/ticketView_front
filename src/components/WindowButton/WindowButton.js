import React from "react";
import MDButton from "components/MDButton";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
const WindowButton = ({ ticket, color, store, openWindow, label, children }) => {
  return (
    <Tooltip title={label}>
      <IconButton
        color={color}
        size="large"
        onClick={() => {
          store(ticket);
          openWindow();
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

WindowButton.propTypes = {
  children: PropTypes.node.isRequired,
  ticket: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  store: PropTypes.func,
  openWindow: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default WindowButton;
