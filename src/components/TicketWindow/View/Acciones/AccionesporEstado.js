import { useDialogStore, useTicketStore } from "zustand/index.ts";
//Botones
import WindowButton from "components/WindowButton/WindowButton";
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
const acciones = (estadoTicket, role, setTicketFields, dialogStore) => {
  const accionesBase = [
    {
      field: "Nota",
      headerName: "Nota",
      headerAlign: "center",
      width: 80,
      renderCell: (params) => (
        <WindowButton
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
    {
      field: "Contacto",
      headerName: "Contacto",
      width: 90,
      renderCell: (params) => (
        <WindowButton
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
  ];
  // Mapa de acciones específicas
  const accionesPorEstadoYRol = {
    NUEVOS: {
      Root: [
        {
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
      ],
      Administrador: [
        {
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
      ],
      Moderador: [
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
        {
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
      ],
    },
    RESUELTOS: {
      Root: [
        {
          field: "Reabrir",
          headerName: "Reabrir",
          width: 80,
          renderCell: (params) => (
            <WindowButton
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
        {
          field: "cerrar",
          headerName: "Cerrar",
          width: 80,
          renderCell: (params) => (
            <WindowButton
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
      ],
      Administrador: [
        {
          field: "Reabrir",
          headerName: "Reabrir",
          width: 80,
          renderCell: (params) => (
            <WindowButton
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
        {
          field: "cerrar",
          headerName: "Cerrar",
          width: 80,
          renderCell: (params) => (
            <WindowButton
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
      ],
      Moderador: [
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
      ],
    },
    PENDIENTES: {
      Root: [
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
      ],
      Administrador: [
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
      ],
    },
    STANDBY: {
      Root: [
        {
          field: "cerrar",
          headerName: "Cerrar",
          width: 80,
          renderCell: (params) => (
            <WindowButton
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
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
      ],
      Administrador: [
        {
          field: "cerrar",
          headerName: "Cerrar",
          width: 80,
          renderCell: (params) => (
            <WindowButton
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
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
      ],
    },
    CERRADOS: {
      Root: [
        {
          field: "Reabrir",
          headerName: "Reabrir",
          width: 80,
          renderCell: (params) => (
            <WindowButton
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
      ],
      Administrador: [
        {
          field: "Reabrir",
          headerName: "Reabrir",
          width: 80,
          renderCell: (params) => (
            <WindowButton
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
      ],
    },
    ABIERTOS: {
      Moderador: [
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
        {
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
      ],
      Usuario: [
        {
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
      ],
    },
    REVISION: {
      Moderador: [
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
      ],
    },
    REABIERTOS: {
      Moderador: [
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
        {
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
      ],
      Usuario: [
        {
          field: "resolver",
          headerName: "Resolver",
          width: 140,
          renderCell: (params) => (
            <WindowButton
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
              {/* <PendingActionsIcon /> */}
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
      ],
    },
  };
  const accionesExtra = accionesPorEstadoYRol[estadoTicket]?.[role] ?? [];
  return [...accionesBase, ...accionesExtra];
};
export default acciones;
