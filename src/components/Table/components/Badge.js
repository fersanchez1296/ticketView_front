// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
//prop types
import PropTypes from "prop-types";

const badgeColors = {
  "En curso": "success",
  Normal: "success",
  Estándar: "success",
  Resuelto: "success",
  Reabierto: "success",
  Nuevo: "info",
  Bajo: "info",
  Cerrado: "error",
  Alto: "error",
  Critica: "error",
  Medio: "warning",
  Pendiente: "warning",
  "Sin asignar": "dark",
};

const Badge = ({ content }) => (
  console.log(content),
  (
    <MDBox>
      <MDBadge
        badgeContent={content !== "" ? content : "Sin Asignar"}
        color={content !== "" ? badgeColors[content] || "secondary" : badgeColors["Sin asignar"]}
        variant="gradient"
        size="sm"
      />
    </MDBox>
  )
);

Badge.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Badge;
