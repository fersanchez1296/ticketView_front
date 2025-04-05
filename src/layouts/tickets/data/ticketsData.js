import WindowButton from "components/WindowButton/WindowButton";
import Badge from "components/Badge/Badge";
import {
  Visibility,
  NoteAdd,
  AssignmentInd,
  Task,
  Edit,
  Email,
  AssignmentReturn,
  ThumbDown,
  ThumbUp,
  DoneAll,
  Replay,
} from "@mui/icons-material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
const TicketsData = (tickets, collection, setTicketFields, rol, dialogStore) => {
  const baseColumns = [
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
    { field: "Id", headerName: "ID", width: 90, align: "center", headerAlign: "center" },
    {
      field: "estatus",
      headerName: "Estatus",
      headerAlign: "center",
      align: "center",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Estado?.Estado} />,
    },
    {
      field: "Prioridad",
      headerName: "Prioridad",
      width: 130,
      renderCell: (params) => <Badge content={params.row.Subcategoria?.Descripcion_prioridad} />,
    },
    {
      field: "TBAsignado",
      headerName: "Resolutor",
      headerAlign: "center",
      width: 300,
      align: "center",
    },
    {
      field: "Fecha_hora_creacion",
      headerName: "Fecha de creación",
      headerAlign: "center",
      width: 300,
      align: "center",
    },
    {
      field: "Fecha_limite_resolucion_SLA",
      headerName: "Fecha límite de resolución",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "Fecha_hora_cierre",
      headerName: "Fecha de cierre",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "TBIncidencia",
      headerName: "Tipo",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "TBCliente",
      headerName: "Cliente",
      headerAlign: "center",
      width: 500,
      align: "center",
    },
  ];

  const extraColumns = {
    Moderador: [
      ...(collection !== "cerrados" && collection !== "resueltos"
        ? [
            {
              field: "reasignar",
              headerName: "Reasignar",
              align: "center",
              width: 100,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="primary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowReasignar}
                  label="Reasignar"
                >
                  <AssignmentInd />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection !== "cerrados" && collection !== "resueltos" && collection !== "revision"
        ? [
            {
              field: "resolver",
              headerName: "Resolver",
              width: 90,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
                >
                  <Task />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection === "revision"
        ? [
            {
              field: "Aceptar",
              headerName: "Aceptar",
              headerAlign: "center",
              align: "center",
              width: 90,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="success"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowAceptar}
                  label="Aceptar"
                >
                  <ThumbUp />
                </WindowButton>
              ),
            },
            {
              field: "Rechazar",
              headerName: "Rechazar",
              headerAlign: "center",
              align: "center",
              width: 100,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="error"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowRechazar}
                  label="Rechazar"
                >
                  <ThumbDown />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection != "cerrados"
        ? [
            {
              field: "Mesa de Servicio",
              headerName: "Mesa de Servicio",
              headerAlign: "center",
              align: "center",
              width: 150,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="primary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowMesaServicio}
                  label="Regresar a mesa de servicio"
                >
                  <AssignmentReturn />
                </WindowButton>
              ),
            },
          ]
        : []),
    ],
    Usuario: [
      ...(collection !== "cerrados" &&
      collection !== "resueltos" &&
      collection !== "revision" &&
      collection !== "pendientes"
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
                >
                  <Task />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection === "abiertos" || collection === "reabiertos"
        ? [
            {
              field: "Pendiente",
              headerName: "Marcar Pendiente",
              width: 140,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowPendientes}
                  label="Pendiente"
                >
                  <PendingActionsIcon />
                </WindowButton>
              ),
            },
            {
              field: "Moderador",
              headerName: "Moderador",
              headerAlign: "center",
              align: "center",
              width: 150,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="primary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowRegresaraModerador}
                  label="Regresar a moderador"
                >
                  <AssignmentReturn />
                </WindowButton>
              ),
            },
          ]
        : []),
    ],
    Root: [
      ...(collection !== "cerrados" &&
      collection !== "standby" &&
      collection !== "nuevos" &&
      collection !== "reabiertos" &&
      collection !== "abiertos" &&
      collection !== "pendientes" &&
      collection !== "revision"
        ? [
            {
              field: "cerrar",
              headerName: "Cerrar",
              width: 80,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="primary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowCloseTicket}
                  label="Cerrar"
                >
                  <Task />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection === "standby"
        ? [
            {
              field: "Descripción",
              headerName: "R. Pendiente",
              headerAlign: "center",
              width: 120,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="primary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowRPendiente}
                  label="Razón pendiente"
                >
                  <NoteAdd />
                </WindowButton>
              ),
            },
            {
              field: "Asignar",
              headerName: "Asignar",
              width: 80,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowAsignar}
                  label="Asignar"
                >
                  <AssignmentInd />
                </WindowButton>
              ),
            },
            {
              field: "PendingReason",
              headerName: "Descripción pendiente",
              headerAlign: "center",
              width: 200,
              align: "center",
            },
          ]
        : []),
      ...(collection === "cerrados" || collection === "resueltos"
        ? [
            {
              field: "Reabrir",
              headerName: "Reabrir",
              width: 80,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowReabrir}
                  label="Reabrir"
                >
                  <Replay />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection !== "cerrados" &&
      collection !== "resueltos" &&
      collection !== "reabiertos" &&
      collection !== "abiertos" &&
      collection !== "pendientes" &&
      collection !== "revision"
        ? [
            {
              field: "resolver",
              headerName: "Resolver",
              width: 90,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
                >
                  <Task />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection === "pendientes"
        ? [
            {
              field: "regresar",
              headerName: "Regresar",
              width: 140,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowRegresar}
                  label="Regresar"
                >
                  <AssignmentReturn />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection === "standby"
        ? [
            {
              field: "Editar",
              headerName: "Editar",
              width: 80,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowEdit}
                  label="Editar"
                >
                  <Edit />
                </WindowButton>
              ),
            },
          ]
        : []),
      {
        field: "Contacto",
        headerName: "Contacto",
        width: 90,
        renderCell: (params) => (
          <WindowButton
            key={params.row._id}
            ticket={params.row}
            color="primary"
            store={setTicketFields}
            openWindow={dialogStore.openWindowContacto}
            label="Contacto"
          >
            <Email />
          </WindowButton>
        ),
      },
    ],
    Administrador: [
      ...(collection !== "cerrados" &&
      collection !== "standby" &&
      collection !== "nuevos" &&
      collection !== "reabiertos" &&
      collection !== "abiertos" &&
      collection !== "pendientes" &&
      collection !== "revision"
        ? [
            {
              field: "cerrar",
              headerName: "Cerrar",
              width: 80,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="primary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowCloseTicket}
                  label="Cerrar"
                >
                  <DoneAll />
                </WindowButton>
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
                >
                  <AssignmentInd />
                </WindowButton>
              ),
            },
            {
              field: "Descripción",
              headerName: "R. Pendiente",
              headerAlign: "center",
              width: 120,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="primary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowRPendiente}
                  label="Razón pendiente"
                >
                  <NoteAdd />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection === "cerrados"
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
                >
                  <Replay />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection !== "cerrados" &&
      collection !== "resueltos" &&
      collection !== "standby" &&
      collection !== "reabiertos" &&
      collection !== "abiertos" &&
      collection !== "pendientes" &&
      collection !== "revision"
        ? [
            {
              field: "resolver",
              headerName: "Resolver",
              width: 90,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
                >
                  <Task />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection === "pendientes"
        ? [
            {
              field: "regresar",
              headerName: "Regresar",
              width: 140,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowRegresar}
                  label="Regresar"
                >
                  <AssignmentReturn />
                </WindowButton>
              ),
            },
          ]
        : []),
      ...(collection === "standby"
        ? [
            {
              field: "Editar",
              headerName: "Editar",
              width: 140,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="secondary"
                  store={setTicketFields}
                  openWindow={dialogStore.openWindowEdit}
                  label="Editar"
                >
                  <Edit />
                </WindowButton>
              ),
            },
          ]
        : []),
      {
        field: "Contacto",
        headerName: "Contacto",
        width: 90,
        renderCell: (params) => (
          <WindowButton
            key={params.row._id}
            ticket={params.row}
            color="primary"
            store={setTicketFields}
            openWindow={dialogStore.openWindowContacto}
            label="Contacto"
          >
            <Email />
          </WindowButton>
        ),
      },
    ],
  };

  const selectedExtraColumns = extraColumns[rol] || [];

  const columns = [...baseColumns.slice(0, 2), ...selectedExtraColumns, ...baseColumns.slice(2)];

  const rows = tickets.map((ticket) => ({
    ...ticket,
    TBAsignado: ticket.Asignado_a?.length
      ? ticket.Asignado_a.map((n) => n.Nombre).join(", ")
      : ticket.Reasignado_a?.map((n) => n.Nombre).join(", ") || "",
    TBIncidencia: ticket.Subcategoria?.Tipo ?? "",
    TBCliente: ticket.Cliente?.Nombre ?? "",
    Fecha_hora_cierre:
      ticket.Fecha_hora_cierre != "" ? ticket.Fecha_hora_cierre : "Ticket en curso",
  }));

  return { columns, rows };
};

export default TicketsData;
