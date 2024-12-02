// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
//prop types
import PropTypes from "prop-types";

const badgeColors = {
  "EN CURSO": "success",
  Normal: "success",
  RESUELTO: "success",
  REABIERTO: "success",
  NUEVO: "info",
  Bajo: "info",
  CERRADO: "error",
  Alto: "error",
  CRITICO: "error",
  Medio: "warning",
  PENDIENTE: "warning",
  "Sin asignar": "dark",
};

const Badge = ({ content }) => (
  <MDBox>
    <MDBadge
      badgeContent={content !== "" ? content : "Sin Asignar"}
      color={content !== "" ? badgeColors[content] || "secondary" : badgeColors["Sin asignar"]}
      variant="gradient"
      size="sm"
    />
  </MDBox>
);

Badge.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Badge;
