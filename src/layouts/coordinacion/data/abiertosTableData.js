// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
//PropTypes
import PropTypes from "prop-types";
// Images
import team2 from "assets/images/team-2.jpg";

export default function data(tickets, openWindow, setTicketFields) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  Author.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  Job.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  return {
    columns: [
      {
        Header: "Revisión",
        accessor: "Revision",
        align: "center",
      },
      { Header: "Asignado a:", accessor: "asignado_a", width: "45%", align: "left" },
      { Header: "Cliente", accessor: "cliente", align: "left" },
      { Header: "Estatus", accessor: "Estatus", align: "center" },
      { Header: "Prioridad", accessor: "Prioridad", align: "center" },
      { Header: "Tipo", accessor: "Tipo", align: "center" },
      { Header: "ID", accessor: "id", align: "center" },
      { Header: "Creado", accessor: "Creado", align: "center" },
      { Header: "Finalizado", accessor: "Finalizado", align: "center" },
    ],

    rows: tickets.map((ticket) => ({
      Revision: (
        <MDButton color={"info"} variant={"contained"}>
          <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
            Revisión
          </MDTypography>
        </MDButton>
      ),
      asignado_a: <Author image={team2} name={ticket.asignado_a} email={ticket.equipo_asignado} />,
      cliente: <Job title={ticket.cliente} description={ticket.dependencia_cliente} />,
      Estatus: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={ticket.estado_asignado}
            color="success"
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      Tipo: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.tipo_ticket}
        </MDTypography>
      ),
      id: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.id}
        </MDTypography>
      ),
      Creado: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.fecha_inicio}
        </MDTypography>
      ),
      Finalizado: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.fecha_cierre}
        </MDTypography>
      ),
      Prioridad: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {ticket.prioridad}
        </MDTypography>
      ),
    })),
  };
}
