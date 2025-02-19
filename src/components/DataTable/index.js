import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
// Material Dashboard 2 React components
//prop types
import PropTypes from "prop-types";
//components
import Badge from "components/Badge/Badge";
//store
import { useDialogStore, useTicketStore } from "zustand/index.ts";
import { useAuthStore } from "zustand/auth.store.ts";
import WindowButton from "components/WindowButton/WindowButton";
export default function DataTable({ tickets, collection }) {
  const {
    openWindow,
    openWindowEdit,
    openWindowCloseTicket,
    openWindowReasignar,
    openWindowAsignar,
    openWindowReabrir,
    openWindowResolver,
    openWindowAceptar,
    openWindowRechazar,
    openWindowNota,
  } = useDialogStore();
  const setTicketFields = useTicketStore((state) => state.setTicketFetch);
  const rol = useAuthStore((state) => state.role);

  const comunColumns = [
    {
      field: "visualizar",
      headerName: "Visualizar",
      width: 140,
      renderCell: (params) => (
        <WindowButton
          key={params.row._id}
          ticket={params.row}
          color={"primary"}
          store={setTicketFields}
          openWindow={openWindow}
          label={"Visualizar"}
        />
      ),
    },
    {
      field: "Nota",
      headerName: "Nota",
      width: 140,
      renderCell: (params) => (
        <WindowButton
          key={params.row._id}
          ticket={params.row}
          color={"secondary"}
          store={setTicketFields}
          openWindow={openWindowNota}
          label={"Nota"}
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
    {
      field: "Fecha_limite_resolucion_SLA",
      headerName: "Fecha límite de resolución",
      width: 300,
      aling: "center",
    },
    { field: "TBIncidencia", headerName: "Tipo", width: 150 },
    { field: "TBCliente", headerName: "Cliente", width: 500, align: "left" },
  ];

  const ModColumns = [
    ...(collection !== "cerrados" && collection !== "resueltos"
      ? [
          {
            field: "reasignar",
            headerName: "Reasignar",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color={"warning"}
                store={setTicketFields}
                openWindow={openWindowReasignar}
                label={"Reasignar"}
              />
            ),
          },
        ]
      : []),
    ...(collection !== "cerrados" && collection !== "resueltos" && collection !== "revision"
      ? [
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color={"secondary"}
                store={setTicketFields}
                openWindow={openWindowResolver}
                label={"Resolver"}
              />
            ),
          },
        ]
      : []),
    ...(collection === "revision"
      ? [
          {
            field: "Aceptar",
            headerName: "Aceptar",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color={"success"}
                store={setTicketFields}
                openWindow={openWindowAceptar}
                label={"Aceptar"}
              />
            ),
          },
          {
            field: "Rechazar",
            headerName: "Rechazar",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color={"error"}
                store={setTicketFields}
                openWindow={openWindowRechazar}
                label={"Rechazar"}
              />
            ),
          },
        ]
      : []),
  ];

  const UserColumns = [
    ...(collection !== "cerrados" && collection !== "resueltos" && collection !== "revision"
      ? [
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color={"secondary"}
                store={setTicketFields}
                openWindow={openWindowResolver}
                label={"Resolver"}
              />
            ),
          },
        ]
      : []),
  ];

  const RootColumns = {
    ...(collection !== "cerrados" &&
    collection !== "standby" &&
    collection !== "nuevos" &&
    collection !== "abiertos"
      ? [
          {
            field: "cerrar",
            headerName: "Cerrar",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color={"primary"}
                store={setTicketFields}
                openWindow={openWindowCloseTicket}
                label={"Cerrar"}
              />
            ),
          },
        ]
      : // : [
        //     {
        //       field: "reabrir",
        //       headerName: "Reabrir",
        //       width: 140,
        //       renderCell: (params) => <Btn_reabrir ticket={params.row} />,
        //     },
        //   ]),
        []),
    ...(collection === "standby"
      ? [
          {
            field: "Asignar",
            headerName: "Asignar",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color={"secondary"}
                store={setTicketFields}
                openWindow={openWindowAsignar}
                label={"Asignar"}
              />
            ),
          },
        ]
      : []),
    ...(collection !== "cerrados" &&
    collection !== "resueltos" &&
    collection !== "standby" &&
    collection !== "nuevos" &&
    collection !== "abiertos"
      ? [
          {
            field: "resolver",
            headerName: "Resolver",
            width: 140,
            renderCell: (params) => (
              <WindowButton
                key={params.row._id}
                ticket={params.row}
                color={"secondary"}
                store={setTicketFields}
                openWindow={openWindowResolver}
                label={"Resolver"}
              />
            ),
          },
        ]
      : []),
  };
  // ...(collection !== "cerrados" && collection !== "resueltos"
  //   ? [
  //       {
  //         field: "editar",
  //         headerName: "Editar",
  //         width: 140,
  //         renderCell: (params) => <Btn_edit ticket={params.row} />,
  //       },
  //     ]
  //   : []),
  // ...(collection !== "cerrados" &&
  // collection !== "resueltos" &&
  // collection !== "pendientes" &&
  // collection !== "standby"
  //   ? [
  //       {
  //         field: "reasignar",
  //         headerName: "Reasignar",
  //         width: 140,
  //         renderCell: (params) => <WindowButton
  //       },
  //     ]
  //   : []),
  if (rol === "Moderador") {
    comunColumns.splice(2, 0, ...ModColumns);
  } else if (rol === "Usuario") {
    comunColumns.splice(2, 0, ...UserColumns);
  } else {
    comunColumns.splice(2, 0, ...RootColumns);
  }

  let columns: GridColDef[] = comunColumns;

  const rows = tickets.map((ticket) => ({
    ...ticket,
    TBIncidencia: ticket.Tipo_incidencia?.Tipo_de_incidencia ?? "",
    TBCliente: ticket.Cliente?.Nombre ?? "",
  }));

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 20, 25]}
        sx={{ border: 0 }}
        getRowId={(row) => row.Id}
      />
    </Paper>
  );
}

DataTable.propTypes = {
  tickets: PropTypes.array,
  collection: PropTypes.string,
};
