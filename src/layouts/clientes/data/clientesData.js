import WindowButton from "components/WindowButton/WindowButton";

const ClientesData = (clientes, setClientFields, dialogStore) => {
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
          store={setClientFields}
          openWindow={dialogStore.openWindowClientes}
          label="Visualizar"
        />
      ),
    },
    {
      field: "Editar",
      headerName: "Editar",
      width: 140,
      renderCell: (params) => (
        <WindowButton
          key={params.row._id}
          ticket={params.row}
          color="secondary"
          store={setClientFields}
          openWindow={dialogStore.openWindowEditarCliete}
          label="Editar"
        />
      ),
    },
    { field: "Nombre", headerName: "Nombre", width: 300, align: "left" },
    {
      field: "Correo",
      headerName: "Correo",
      width: 300,
      align: "left",
    },
    {
      field: "Telefono",
      headerName: "Teléfono",
      width: 150,
      align: "left",
    },
    {
      field: "Extension",
      headerName: "Extensión",
      width: 150,
      align: "left",
    },
    {
      field: "TBDependencia",
      headerName: "Dependencia",
      width: 300,
      align: "left",
    },
    {
      field: "TBDGeneral",
      headerName: "Direccion General",
      width: 300,
      align: "left",
    },
    {
      field: "TBDArea",
      headerName: "Área",
      width: 300,
      align: "left",
    },
  ];

  const rows = clientes.map((cliente) => ({
    ...cliente,
    Id: cliente._id,
    Extension: cliente.Extension ?? "",
    TBDependencia: cliente.Dependencia?.Dependencia,
    TBDGeneral: cliente.Direccion_General?.Direccion_General,
    TBDArea: cliente.direccion_area?.direccion_area,
  }));

  return { columns, rows };
};

export default ClientesData;
