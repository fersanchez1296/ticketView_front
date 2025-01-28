// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
//prop types
import PropTypes from "prop-types";

const Asignado = ({ image, nombre, dependencia }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar src={image} name={nombre} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {nombre}
      </MDTypography>
      <MDTypography variant="caption">{dependencia}</MDTypography>
    </MDBox>
  </MDBox>
);

Asignado.propTypes = {
  image: PropTypes.string,
  nombre: PropTypes.string.isRequired,
  dependencia: PropTypes.string.isRequired,
};

export default Asignado;
