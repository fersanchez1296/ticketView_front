// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
//prop types
import PropTypes from "prop-types";

const Cliente = ({ nombre, dependencia }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
      {nombre}
    </MDTypography>
    <MDTypography variant="caption">{dependencia}</MDTypography>
  </MDBox>
);

Cliente.propTypes = {
  nombre: PropTypes.string.isRequired,
  dependencia: PropTypes.string.isRequired,
};

export default Cliente;
