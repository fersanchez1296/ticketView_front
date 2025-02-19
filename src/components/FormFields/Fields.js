import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
const Fields = ({ fields }) =>
  fields.map(({ name, label, options, gridSize, multiline }) => (
    <Grid item xs={gridSize} key={name}>
      <TextField
        value={options ?? ""}
        label={label}
        fullWidth
        multiline={multiline.state}
        disabled
      />
    </Grid>
  ));

Fields.propTypes = {
  fields: PropTypes.array,
};
export default Fields;
