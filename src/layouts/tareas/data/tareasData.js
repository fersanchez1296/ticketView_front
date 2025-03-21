import WindowButton from "components/WindowButton/WindowButton";
import Badge from "components/Badge/Badge";

const TareasData = (tareas, collection, setTareaFields, rol, dialogStore) => {
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
          store={setTareaFields}
          openWindow={dialogStore.openWindowViewTareas}
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
          store={setTareaFields}
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
      headerName: "Fecha de creación",
      width: 300,
      align: "left",
    },
    {
      field: "Fecha_limite_resolucion_SLA",
      headerName: "Fecha límite de resolución",
      width: 300,
      align: "left",
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
                  color="primary"
                  store={setTareaFields}
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
                  store={setTareaFields}
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
                  store={setTareaFields}
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowRechazar}
                  label="Rechazar"
                />
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
                />
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowPendientes}
                  label="Pendiente"
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
      collection !== "reabiertos" &&
      collection !== "abiertos" &&
      collection !== "pendientes" &&
      collection !== "revision"
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowClosetarea}
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowAsignar}
                  label="Asignar"
                />
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
                  store={setTareaFields}
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
      collection !== "reabiertos" &&
      collection !== "abiertos" &&
      collection !== "pendientes" &&
      collection !== "revision"
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
                />
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowRegresar}
                  label="Regresar"
                />
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowEdit}
                  label="Editar"
                />
              ),
            },
          ]
        : []),
      {
        field: "Contacto",
        headerName: "Contacto",
        width: 140,
        renderCell: (params) => (
          <WindowButton
            key={params.row._id}
            ticket={params.row}
            color="primary"
            store={setTareaFields}
            openWindow={dialogStore.openWindowContacto}
            label="Contacto"
          />
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
              width: 140,
              renderCell: (params) => (
                <WindowButton
                  key={params.row._id}
                  ticket={params.row}
                  color="primary"
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowClosetarea}
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowAsignar}
                  label="Asignar"
                />
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
                  store={setTareaFields}
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
      collection !== "reabiertos" &&
      collection !== "abiertos" &&
      collection !== "pendientes" &&
      collection !== "revision"
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowResolver}
                  label="Resolver"
                />
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowRegresar}
                  label="Regresar"
                />
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
                  store={setTareaFields}
                  openWindow={dialogStore.openWindowEdit}
                  label="Editar"
                />
              ),
            },
          ]
        : []),
      {
        field: "Contacto",
        headerName: "Contacto",
        width: 140,
        renderCell: (params) => (
          <WindowButton
            key={params.row._id}
            ticket={params.row}
            color="primary"
            store={setTareaFields}
            openWindow={dialogStore.openWindowContacto}
            label="Contacto"
          />
        ),
      },
    ],
  };

  const selectedExtraColumns = extraColumns[rol] || [];

  const columns = [...baseColumns.slice(0, 2), ...selectedExtraColumns, ...baseColumns.slice(2)];

  const rows = tareas.map((tarea) => ({
    ...tarea,
  }));

  return { columns, rows };
};

export default TareasData;
