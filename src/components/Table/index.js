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
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useAuthStore } from "zustand/auth.store.ts";
export default function DataTable({ tickets, collection }) {
  const openWindow = useDialogStore((state) => state.openWindow);
  const openWindowEdit = useDialogStore((state) => state.openWindowEdit);
  const openWindowCloseTicket = useDialogStore((state) => state.openWindowCloseTicket);
  const openWindowReasignar = useDialogStore((state) => state.openWindowReasignar);
  const openWindowResolver = useDialogStore((state) => state.openWindowResolver);
  const openWindowAceptar = useDialogStore((state) => state.openWindowAceptar);
  const openWindowRechazar = useDialogStore((state) => state.openWindowRechazar);
  const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  const rol = useAuthStore((state) => state.role);

  const Btn_view = (ticket) => (
    <MDButton
      color={"info"}
      variant={"contained"}
      onClick={() => {
        setTicketFields(ticket.ticket);
        openWindow();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Visualizar`}
      </MDTypography>
    </MDButton>
  );

  const Btn_reabrir = (ticket) => (
    <MDButton
      color={"secondary"}
      variant={"contained"}
      onClick={() => {
        setTicketFields(ticket.ticket);
        //openWindow();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Reabrir`}
      </MDTypography>
    </MDButton>
  );

  const Btn_cerrar = (ticket) => (
    <MDButton
      color={"primary"}
      variant={"contained"}
      onClick={() => {
        setTicketFields(ticket.ticket);
        openWindowCloseTicket();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Cerrar`}
      </MDTypography>
    </MDButton>
  );

  const Btn_reasignar = (ticket) => (
    <MDButton
      color={"warning"}
      variant={"contained"}
      onClick={() => {
        setTicketFields(ticket.ticket);
        openWindowReasignar();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Reasignar`}
      </MDTypography>
    </MDButton>
  );

  const Btn_resolver = (ticket) => (
    <MDButton
      disabled={collection === "Resueltos" ? true : false}
      color={"secondary"}
      variant={"contained"}
      onClick={() => {
        setTicketFields(ticket.ticket);
        openWindowResolver();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Resolver`}
      </MDTypography>
    </MDButton>
  );

  const Btn_edit = (ticket) => (
    <MDButton
      color={"success"}
      variant={"contained"}
      onClick={() => {
        setTicketFields(ticket.ticket);
        openWindowEdit();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Editar`}
      </MDTypography>
    </MDButton>
  );

  const Btn_aceptarResolucion = (ticket) => (
    <MDButton
      color={"success"}
      variant={"contained"}
      onClick={() => {
        setTicketFields(ticket.ticket);
        openWindowAceptar();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Aceptar`}
      </MDTypography>
    </MDButton>
  );

  const Btn_rechazarResolucion = (ticket) => (
    <MDButton
      color={"error"}
      variant={"contained"}
      onClick={() => {
        setTicketFields(ticket.ticket);
        openWindowRechazar();
      }}
    >
      <MDTypography component="a" href="#" variant="caption" color="white" fontWeight="medium">
        {`Rechazar`}
      </MDTypography>
    </MDButton>
  );

  const RootColumns = [
    {
      field: "visualizar",
      headerName: "Visualizar",
      width: 140,
      renderCell: (params) => <Btn_view ticket={params.row} />,
    },
    ...(collection !== "Cerrados"
      ? [
          {
            field: "editar",
            headerName: "Editar",
            width: 140,
            renderCell: (params) => <Btn_edit ticket={params.row} />,
          },
        ]
      : []),
    ...(collection !== "Cerrados"
      ? [
          {
            field: "cerrar",
            headerName: "Cerrar",
            width: 140,
            renderCell: (params) => <Btn_cerrar ticket={params.row} />,
          },
        ]
      : [
          {
            field: "reabrir",
            headerName: "Reabrir",
            width: 140,
            renderCell: (params) => <Btn_reabrir ticket={params.row} />,
          },
        ]),
    ...(collection !== "Cerrados" && collection !== "Resueltos" && collection !== "Pendientes"
      ? [
          {
            field: "reasignar",
            headerName: "Reasignar",
            width: 140,
            renderCell: (params) => <Btn_reasignar ticket={params.row} />,
          },
        ]
      : []),
    ...(collection !== "Cerrados" && collection !== "Resueltos"
      ? [
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => <Btn_resolver ticket={params.row} />,
          },
        ]
      : []),
    {
      field: "Creado_por",
      headerName: "Creado Por",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={team2}
          nombre={params.row.Creado_por.Nombre}
          dependencia={params.row.Creado_por.Coordinacion}
        />
      ),
    },
    {
      field: "Asignado_a",
      headerName: "Asignado a",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={team2}
          nombre={params.row.Asignado_a.Nombre}
          dependencia={params.row.Asignado_a.Coordinacion}
        />
      ),
    },
    {
      field: "Reasignado_a",
      headerName: "Reasignado a",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={team2}
          nombre={params.row.Reasignado_a.Nombre}
          dependencia={params.row.Reasignado_a.Coordinacion}
        />
      ),
    },
    ...(collection !== "Pendientes"
      ? [
          {
            field: "Resuelto_por",
            headerName: "Resuelto por",
            width: 250,
            renderCell: (params) => (
              <Asignado
                image={team2}
                nombre={
                  params.row.Resuelto_por && params.row.Resuelto_por.Nombre
                    ? params.row.Resuelto_por.Nombre
                    : params.row.Resuelto_por
                }
                dependencia={
                  params.row.Resuelto_por && params.row.Resuelto_por.Coordinacion
                    ? params.row.Resuelto_por.Coordinacion
                    : ""
                }
              />
            ),
          },
        ]
      : []),
    ...(collection === "Cerrados" || collection === "Reabiertos"
      ? [
          {
            field: "Cerrado_por",
            headerName: "Cerrado por",
            width: 250,
            renderCell: (params) => (
              <Asignado
                image={team2}
                nombre={
                  params.row.Cerrado_por && params.row.Cerrado_por.Nombre
                    ? params.row.Cerrado_por.Nombre
                    : params.row.Cerrado_por
                }
                dependencia={
                  params.row.Cerrado_por && params.row.Cerrado_por.Nombre
                    ? params.row.Cerrado_por.Nombre
                    : ""
                }
              />
            ),
          },
        ]
      : []),
    {
      field: "Cliente",
      headerName: "Cliente",
      width: 250,
      renderCell: (params) => (
        <Cliente
          nombre={params.row.Nombre_cliente}
          dependencia={params.row.Secretaria.Secretaria}
        />
      ),
    },
    { field: "Id", headerName: "ID", width: 90, align: "center" },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Estado.Estado} />,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Prioridad.Descripcion} />,
    },
    { field: "Tipo_incidencia", headerName: "Tipo", width: 150 },
    { field: "Fecha_hora_creacion", headerName: "Creado", width: 250 },
    { field: "Fecha_hora_cierre", headerName: "Finalizado", width: 250 },
  ];

  const AdminColumns = [
    {
      field: "visualizar",
      headerName: "Visualizar",
      width: 140,
      renderCell: (params) => <Btn_view ticket={params.row} />,
    },
    {
      field: "editar",
      headerName: "Editar",
      width: 140,
      renderCell: (params) => <Btn_edit ticket={params.row} />,
    },
    {
      field: "cerrar",
      headerName: "Cerrar",
      width: 140,
      renderCell: (params) => <Btn_cerrar ticket={params.row} />,
    },
    {
      field: "reasignar",
      headerName: "Reasignar",
      width: 140,
      renderCell: (params) => <Btn_reasignar ticket={params.row} />,
    },
    {
      field: "resolver",
      headerName: "Resolver",
      width: 140,
      renderCell: (params) => <Btn_resolver ticket={params.row} />,
    },
    {
      field: "Asignado_a",
      headerName: "Asignado a:",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={team2}
          nombre={params.row.Asignado_a}
          dependencia={params.row.Equipo_asignado.Equipo_asignado}
        />
      ),
    },
    {
      field: "Cliente",
      headerName: "Cliente",
      width: 250,
      renderCell: (params) => (
        <Cliente nombre={params.row.Nombre_cliente} dependencia={params.row.Secretaria} />
      ),
    },
    { field: "Id", headerName: "ID", width: 90, align: "center" },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Estado.Estado} />,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Prioridad} />,
    },
    { field: "Tipo_incidencia", headerName: "Tipo", width: 150 },
    { field: "Fecha_hora_creacion", headerName: "Creado", width: 250 },
    { field: "Fecha_hora_cierre", headerName: "Finalizado", width: 250 },
  ];

  const ModColumns = [
    {
      field: "visualizar",
      headerName: "Visualizar",
      width: 140,
      renderCell: (params) => <Btn_view ticket={params.row} />,
    },
    ...(collection !== "Cerrados"
      ? [
          {
            field: "reasignar",
            headerName: "Reasignar",
            width: 140,
            renderCell: (params) => <Btn_reasignar ticket={params.row} />,
          },
        ]
      : []),
    ...(collection == "Revisión"
      ? [
          {
            field: "Aceptar",
            headerName: "Aceptar",
            width: 140,
            renderCell: (params) => <Btn_aceptarResolucion ticket={params.row} />,
          },
        ]
      : []),
    ...(collection === "Revisión"
      ? [
          {
            field: "Rechazar",
            headerName: "Rechazar",
            width: 140,
            renderCell: (params) => <Btn_rechazarResolucion ticket={params.row} />,
          },
        ]
      : []),
    {
      field: "Asignado_a",
      headerName: "Asignados a mí",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={team2}
          nombre={params.row.Asignado_final_a.Nombre}
          dependencia={params.row.Asignado_final_a.Coordinacion}
        />
      ),
    },
    {
      field: "Cliente",
      headerName: "Cliente",
      width: 250,
      renderCell: (params) => (
        <Cliente
          nombre={params.row.Nombre_cliente}
          dependencia={params.row.Secretaria.Secretaria}
        />
      ),
    },
    { field: "Id", headerName: "ID", width: 90, align: "center" },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Estado.Estado} />,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Prioridad.Descripcion} />,
    },
    { field: "Tipo_incidencia", headerName: "Tipo", width: 150 },
    { field: "Fecha_hora_creacion", headerName: "Creado", width: 250 },
    { field: "Fecha_hora_cierre", headerName: "Finalizado", width: 250 },
  ];

  const UserColumns = [
    {
      field: "visualizar",
      headerName: "Visualizar",
      hideable: false,
      width: 140,
      renderCell: (params) => <Btn_view ticket={params.row} />,
    },
    ...(collection !== "Cerrados"
      ? [
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => <Btn_resolver ticket={params.row} />,
          },
        ]
      : []),
    {
      field: "Asignado_a",
      headerName: "Asignados a mí",
      width: 250,
      renderCell: (params) => (
        <Asignado
          image={team2}
          nombre={params.row.Asignado_final.Nombre}
          dependencia={params.row.Asignado_final.Coordinacion}
        />
      ),
    },
    {
      field: "Cliente",
      headerName: "Cliente",
      width: 250,
      renderCell: (params) => (
        <Cliente
          nombre={params.row.Nombre_cliente}
          dependencia={params.row.Secretaria.Secretaria}
        />
      ),
    },
    { field: "Id", headerName: "ID", width: 90, align: "center" },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Estado.Estado} />,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Prioridad.Descripcion} />,
    },
    { field: "Tipo_incidencia", headerName: "Tipo", width: 150 },
    { field: "Fecha_hora_creacion", headerName: "Creado", width: 250 },
    { field: "Fecha_hora_cierre", headerName: "Finalizado", width: 250 },
  ];

  let columns: GridColDef[] =
    rol === "Root" || rol === "Administrador"
      ? RootColumns
      : rol === "Moderador"
      ? ModColumns
      : UserColumns;

  const rows = tickets.map((ticket) => ({
    id: ticket.Id,
    ...ticket,
    Tipo_incidencia: ticket.Tipo_incidencia.Tipo_de_incidencia,
    Descripcion_cierre: ticket.Descripcion_cierre ? ticket.Descripcion_cierre : "Ticket en curso",
  }));

  const paginationModel = { page: 0, pageSize: 8 };

  // const commonColumns = [
  //   {
  //     field: "visualizar",
  //     headerName: "Visualizar",
  //     width: 140,
  //     renderCell: (params) => <Btn_view ticket={params.row} />,
  //   },
  //   {
  //     field: "Cliente",
  //     headerName: "Cliente",
  //     width: 250,
  //     renderCell: (params) => (
  //       <Cliente
  //         nombre={params.row.Nombre_cliente}
  //         dependencia={params.row.Secretaria.Secretaria}
  //       />
  //     ),
  //   },
  //   { field: "Id", headerName: "ID", width: 90, align: "center" },
  //   {
  //     field: "estatus",
  //     headerName: "Estatus",
  //     width: 130,
  //     renderCell: (params) => <Badge content={params.row.Estado.Estado} />,
  //   },
  //   {
  //     field: "prioridad",
  //     headerName: "Prioridad",
  //     width: 130,
  //     renderCell: (params) => <Badge content={params.row.Prioridad.Descripcion} />,
  //   },
  //   { field: "Tipo_incidencia", headerName: "Tipo", width: 150 },
  //   { field: "Fecha_hora_creacion", headerName: "Creado", width: 250 },
  //   { field: "Fecha_hora_cierre", headerName: "Finalizado", width: 250 },
  // ];

  // const getConditionalColumns = (role, collection) => {
  //   let columns = [];

  //   if (role === "Root" || role === "Admin") {
  //     columns.push(
  //       {
  //         field: "editar",
  //         headerName: "Editar",
  //         width: 140,
  //         renderCell: (params) => <Btn_edit ticket={params.row} />,
  //       },
  //       {
  //         field: "cerrar",
  //         headerName: "Cerrar",
  //         width: 140,
  //         renderCell: (params) => <Btn_cerrar ticket={params.row} />,
  //       },
  //       ...(collection !== "Cerrados"
  //         ? [
  //             {
  //               field: "resolver",
  //               headerName: "Resolver",
  //               width: 140,
  //               renderCell: (params) => <Btn_resolver ticket={params.row} />,
  //             },
  //           ]
  //         : [])
  //     );
  //   }

  //   if (role === "Moderador" && collection === "Revisión") {
  //     columns.push(
  //       {
  //         field: "Aceptar",
  //         headerName: "Aceptar",
  //         width: 140,
  //         renderCell: (params) => <Btn_aceptarResolucion ticket={params.row} />,
  //       },
  //       {
  //         field: "Rechazar",
  //         headerName: "Rechazar",
  //         width: 140,
  //         renderCell: (params) => <Btn_rechazarResolucion ticket={params.row} />,
  //       }
  //     );
  //   }

  //   if (collection === "Cerrados" || collection === "Reabiertos") {
  //     columns.push({
  //       field: "Cerrado_por",
  //       headerName: "Cerrado por",
  //       width: 250,
  //       renderCell: (params) => (
  //         <Asignado
  //           image={team2}
  //           nombre={params.row.Cerrado_por?.Nombre || ""}
  //           dependencia={params.row.Cerrado_por?.Coordinacion || ""}
  //         />
  //       ),
  //     });
  //   }

  //   return columns;
  // };

  // const generateColumns = (role, collection) => [
  //   ...commonColumns,
  //   ...getConditionalColumns(role, collection),
  // ];

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
  collection: PropTypes.string,
};
