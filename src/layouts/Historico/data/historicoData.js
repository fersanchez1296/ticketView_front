import WindowButton from "components/WindowButton/WindowButton";
import Badge from "components/Badge/Badge";
import { Visibility, NoteAdd } from "@mui/icons-material";
const HistoricaData = (ticketsArea, setTicketFields, dialogStore) => {
  const columns = [
    {
      field: "visualizar",
      headerName: "Ver",
      headerAlign: "center",
      width: 80,
      renderCell: (params) => (
        <WindowButton
          key={params.row._id}
          ticket={params.row}
          color="primary"
          store={setTicketFields}
          openWindow={dialogStore.openWindow}
          label="Visualizar"
        >
          <Visibility />
        </WindowButton>
      ),
    },
    {
      field: "Nota",
      headerName: "Nota",
      headerAlign: "center",
      width: 80,
      renderCell: (params) => (
        <WindowButton
          key={params.row._id}
          ticket={params.row}
          color="secondary"
          store={setTicketFields}
          openWindow={dialogStore.openWindowNota}
          label="Nota"
        >
          <NoteAdd />
        </WindowButton>
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
      renderCell: (params) => <Badge content={params.row.Subcategoria?.Descripcion_prioridad} />,
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
    TBIncidencia: ticket.Subcategoria?.Tipo ?? "",
    TBCliente: ticket.Cliente?.Nombre ?? "",
  }));

  return { columns, rows };
};

export default HistoricaData;
