// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
//prop types
import PropTypes from "prop-types";

const badgeColors = {
  //estados
  ABIERTOS: "success",
  RESUELTOS: "info",
  REABIERTOS: "success",
  CERRADOS: "error",
  NUEVOS: "info",
  PENDIENTES: "warning",
  REVISION: "warning",
  STANDBY: "warning",
  //prioridades
  "Incidente grave": "error",
  Alta: "error",
  Baja: "success",
  Media: "warning",
  Planeada: "info",
};

const Badge = ({ content }) => (
  <MDBox>
    <MDBadge
      badgeContent={content !== "" ? content : "Sin Asignar"}
      color={content !== "" ? badgeColors[content] || "secondary" : badgeColors["Sin asignar"]}
      variant="gradient"
      size="lg"
    />
  </MDBox>
);

Badge.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Badge;
