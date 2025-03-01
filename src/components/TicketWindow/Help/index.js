import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useDialogStore } from "zustand/index.ts";
import helps from "./data/helpData";
import PropTypes from "prop-types";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Help({ helpKey }) {
  const { isHelpWindowOpen, closeWindowHelp } = useDialogStore();

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={closeWindowHelp}
        aria-labelledby="customized-dialog-title"
        open={isHelpWindowOpen}
      >
        {helps.map((h) => (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              {h[helpKey].titulo}
            </DialogTitle>
            <IconButton
              aria-label="cerrar"
              onClick={closeWindowHelp}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom variant="body2">
                {h[helpKey].descripcion}
              </Typography>
            </DialogContent>
            <DialogContent dividers>
              <Typography gutterBottom variant="caption">
                Para mas información consulta el manual de usuario.
              </Typography>
            </DialogContent>
          </>
        ))}
      </BootstrapDialog>
    </React.Fragment>
  );
}

Help.propTypes = {
  helpKey: PropTypes.string,
};
