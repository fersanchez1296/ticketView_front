import React from "react";
import MDSnackbar from "components/MDSnackbar";
//store snackbar
import { useSnackbarStore } from "zustand/snackbarState.store.ts";
const SuccessSB = () => {
  const { successSB, sbMessage, sbStatus, closeSuccessSB } = useSnackbarStore();
  return (
    <MDSnackbar
      color="success"
      icon="check"
      title="Operación exitosa"
      content={sbMessage}
      open={successSB}
      dateTime={sbStatus}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgGreen
    />
  );
};

export default SuccessSB;
