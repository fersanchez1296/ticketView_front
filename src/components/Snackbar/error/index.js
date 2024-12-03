import React from "react";
import MDSnackbar from "components/MDSnackbar";
//store snackbar
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const ErrorSB = () => {
  const { errorSB, sbMessage, sbStatus, closeErrorSB } = useSnackbarStore();
  return (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Operación fallida"
      content={sbMessage}
      open={errorSB}
      dateTime={sbStatus}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgRed
    />
  );
};

export default ErrorSB;
