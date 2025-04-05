import WindowButton from "components/WindowButton/WindowButton";
import SwitchActive from "../components/switch";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
const UsuariosData = (usuarios, setUserFields, dialogStore) => {
  const columns = [
    {
      field: "visualizar",
      headerName: "Ver",
      width: 80,
      renderCell: (params) => (
        <WindowButton
          key={params.row._id}
          ticket={params.row}
          color="primary"
          store={setUserFields}
          openWindow={dialogStore.openWindowUsuarios}
          label="Visualizar"
        >
          <VisibilityIcon />
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
          store={setUserFields}
          openWindow={dialogStore.openWindowEditarUsuario}
          label="Editar"
        >
          <EditIcon />
        </WindowButton>
      ),
    },
    {
      field: "Estado",
      headerName: "Estado",
      width: 200,
      align: "left",
      renderCell: (params) => (
        <SwitchActive isActive={params.row.isActive} userId={params.row._id} />
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
      field: "Username",
      headerName: "Username",
      width: 150,
      align: "left",
    },
    {
      field: "TBArea",
      headerName: "Área",
      width: 300,
      align: "left",
    },
  ];

  const rows = usuarios.map((usuario) => ({
    ...usuario,
    Id: usuario._id,
    TBArea: usuario.Area ? usuario.Area.map((a) => a.Area) : "",
  }));

  return { columns, rows };
};

export default UsuariosData;
