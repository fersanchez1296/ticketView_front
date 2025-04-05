import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller } from "react-hook-form";
const customStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const CustomSelect = ({ options, form, control, formState, onChangeCallback }) => (
  <>
    <Controller
      name="Subcategoria"
      control={control}
      rules={{ required: "Es necesario seleccionar la subcategoría" }}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          styles={customStyles}
          getOptionLabel={(option) => option.Subcategoria}
          getOptionValue={(option) => option._id}
          placeholder="Selecciona o escribe la subcategoría"
          isClearable
          menuPosition="fixed"
          onChange={(selectedOption) => {
            field.onChange(selectedOption); // importante para react-hook-form
            if (onChangeCallback) {
              onChangeCallback(selectedOption); // callback personalizado
            }
          }}
        />
      )}
    />
    {formState.errors.Subcategoria && (
      <FormHelperText>{formState.errors.Subcategoria.message}</FormHelperText>
    )}
  </>
);
export default CustomSelect;

CustomSelect.propTypes = {
  options: PropTypes.array,
  form: PropTypes.object,
  control: PropTypes.object.isRequired,
  formState: PropTypes.object,
  onChangeCallback: PropTypes.func,
};
