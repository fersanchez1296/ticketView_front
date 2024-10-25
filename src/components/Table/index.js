import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
//prop types
import PropTypes from "prop-types";
// Images
import team2 from "assets/images/team-2.jpg";
//components
import Asignado from "./components/Asignado";
import Cliente from "./components/Cliente";
import Badge from "./components/Badge";

export default function DataTable({ tickets }) {
  const Btn = () => (
    <MDButton color={"info"} variant={"contained"}>
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        Revisión
      </MDTypography>
    </MDButton>
  );

  const columns: GridColDef[] = [
    {
      field: "revision",
      headerName: "Revisión",
      width: 140,
      renderCell: () => <Btn />,
    },
    {
      field: "asignado_a",
      headerName: "Asignado a:",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={team2}
          nombre={params.row.asignado_a}
          dependencia={params.row.equipo_asignado}
        />
      ),
    },
    {
      field: "cliente",
      headerName: "Cliente",
      width: 250,
      renderCell: (params) => (
        <Cliente nombre={params.row.cliente} dependencia={params.row.dependencia_cliente} />
      ),
    },
    { field: "id", headerName: "ID", width: 90, align: "center" },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 130,
      renderCell: (params) => <Badge content={params.row.estatus} />,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      width: 130,
      renderCell: (params) => <Badge content={params.row.prioridad} />,
    },
    { field: "tipo", headerName: "Tipo", width: 150 },
    { field: "fecha_creacion", headerName: "Creado", width: 250 },
    { field: "fecha_cierre", headerName: "Finalizado", width: 250 },
  ];

  const rows = tickets.map((ticket) => ({
    id: ticket.id,
    asignado_a: ticket.asignado_a,
    equipo_asignado: ticket.equipo_asignado,
    dependencia_cliente: ticket.dependencia_cliente,
    cliente: ticket.cliente,
    estatus: ticket.estado_asignado,
    prioridad: ticket.prioridad,
    tipo: ticket.tipo_ticket,
    fecha_creacion: ticket.fecha_inicio,
    fecha_cierre: ticket.fecha_cierre,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 20, 25]}
        //checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

DataTable.propTypes = {
  tickets: PropTypes.object,
};
