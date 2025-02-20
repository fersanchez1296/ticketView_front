import WindowButton from "components/WindowButton/WindowButton";
import Badge from "components/Badge/Badge";

const TicketsData = (tickets, collection, setTicketFields, rol, dialogStore) => {
  const baseColumns = [
    {
      field: "visualizar",
      headerName: "Visualizar",
      width: 140,
      renderCell: (params) => (
        <WindowButton
          key={params.row._id}
          ticket={params.row}
          color="primary"
          store={setTicketFields}
          openWindow={dialogStore.openWindow}
          label="Visualizar"
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
          color="secondary"
          store={setTicketFields}
          openWindow={dialogStore.openWindowNota}
          label="Nota"
        />
      ),
    },
    { field: "Id", headerName: "ID", width: 90, align: "center" },
    {
      field: "estatus",
      headerName: "Estatus",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Estado?.Estado} />,
    },
    {
      field: "prioridad",
      headerName: "Prioridad",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Prioridad?.Descripcion} />,
    },
    {
      field: "Fecha_limite_resolucion_SLA",
      headerName: "Fecha límite de resolución",
      width: 300,
      align: "center",
    },
    { field: "TBIncidencia", headerName: "Tipo", width: 150 },
    { field: "TBCliente", headerName: "Cliente", width: 500, align: "left" },
  ];

  const extraColumns = {
    Moderador: [
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
                  color="warning"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowReasignar}
                  label="Reasignar"
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
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
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
                  color="success"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowAceptar}
                  label="Aceptar"
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
                  color="error"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowRechazar}
                  label="Rechazar"
                />
              ),
            },
          ]
        : []),
    ],
    Usuario: [
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
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
                />
              ),
            },
          ]
        : []),
    ],
    Root: [
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
                  color="primary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowCloseTicket}
                  label="Cerrar"
                />
              ),
            },
          ]
        : []),
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
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowAsignar}
                  label="Asignar"
                />
              ),
            },
          ]
        : []),
      ...(collection === "standby"
        ? [
            {
              field: "Reabrir",
              headerName: "Reabrir",
              width: 140,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowReabrir}
                  label="Reabrir"
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
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
                />
              ),
            },
          ]
        : []),
    ],
  };

  const selectedExtraColumns = extraColumns[rol] || [];

  const columns = [...baseColumns.slice(0, 2), ...selectedExtraColumns, ...baseColumns.slice(2)];

  const rows = tickets.map((ticket) => ({
    ...ticket,
    TBIncidencia: ticket.Tipo_incidencia?.Tipo_de_incidencia ?? "",
    TBCliente: ticket.Cliente?.Nombre ?? "",
  }));

  return { columns, rows };
};

export default TicketsData;
