import WindowButton from "components/WindowButton/WindowButton";
import Badge from "components/Badge/Badge";
const HistoricaData = (ticketsArea, setTicketFields, dialogStore) => {
  const columns = [
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
      field: "Fecha_hora_creacion",
      headerName: "Fecha Creación",
      width: 300,
    },
    {
      field: "Fecha_limite_resolucion_SLA",
      headerName: "Fecha límite de resolución",
      width: 300,
    },
    { field: "TBIncidencia", headerName: "Tipo", width: 150 },
    { field: "TBCliente", headerName: "Cliente", width: 500, align: "left" },
  ];
  const rows = ticketsArea.map((ticket) => ({
    ...ticket,
    TBIncidencia: ticket.Tipo_incidencia?.Tipo_de_incidencia ?? "",
    TBCliente: ticket.Cliente?.Nombre ?? "",
  }));

  return { columns, rows };
};

export default HistoricaData;
