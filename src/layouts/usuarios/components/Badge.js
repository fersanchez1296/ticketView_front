// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
//prop types
import PropTypes from "prop-types";

const Badge = ({ content }) => (
  <MDBox>
    <MDBadge
      badgeContent={content !== false ? "Activo" : "Inactivo"}
      color={content == true ? "success" : "error"}
      variant="gradient"
      size="sm"
    />
  </MDBox>
);

Badge.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Badge;
