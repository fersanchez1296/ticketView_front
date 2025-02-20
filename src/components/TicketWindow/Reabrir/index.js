import React from "react";
//mui library component
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Reabrir = ({ form, formState }) => {
  return (
    <>
      <TextField
        {...form.register("Id", { required: "El Id es obligatorio" })}
        label="Id"
        fullWidth
        error={!!formState.errors?.nombre}
        helperText={formState.errors?.nombre?.message}
      />
    </>
  );
};

Reabrir.propTypes = {
  form: PropTypes.object,
  formState: PropTypes.object,
};

export default React.memo(Reabrir);
