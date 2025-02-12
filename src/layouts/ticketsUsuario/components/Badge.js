// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
//prop types
import PropTypes from "prop-types";

const badgeColors = {
  ABIERTOS: "success",
  Normal: "success",
  RESUELTO: "success",
  REABIERTOS: "success",
  NUEVOS: "info",
  Bajo: "info",
  CERRADOS: "error",
  Alto: "error",
  Critico: "error",
  Medio: "warning",
  PENDIENTES: "warning",
};

const Badge = ({ content }) => (
  <MDBox>
    <MDBadge
      badgeContent={content !== "" ? content : "Sin Asignar"}
      color={content !== "" ? badgeColors[content] || "secondary" : badgeColors["Sin asignar"]}
      size="lg"
    />
  </MDBox>
);

Badge.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Badge;
