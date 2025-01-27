/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Create_Ticket from "components/Create_Ticket/index";
import Tables from "layouts/tables";
import DataTable from "layouts/abiertos/";
import CrearTicket from "components/CreateTicket";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import TaskIcon from "@mui/icons-material/Task";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DomainIcon from "@mui/icons-material/Domain";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import Historico from "layouts/Historico/index";
import FeedIcon from "@mui/icons-material/Feed";
import Coordinacion from "layouts/coordinacion/index";
import Usuarios from "layouts/usuarios/index";
import Clientes from "layouts/clientes/index";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    rol: ["Root", "Administrador", "Moderador", "Usuario"],
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Crear Ticket",
    key: "crear_ticket",
    rol: ["Root", "Administrador"],
    icon: <FiberNewIcon />,
    route: "/crear_ticket",
    component: <Create_Ticket />,
  },
  {
    type: "collapse",
    name: "Nuevos",
    key: "nuevos",
    rol: ["Root", "Administrador", "Moderador"],
    icon: <FeedIcon />,
    route: "/nuevos",
    component: <DataTable collection={"nuevos"} />,
  },
  {
    type: "collapse",
    name: "Abiertos",
    key: "abiertos",
    rol: ["Root", "Administrador", "Moderador", "Usuario"],
    icon: <FileOpenIcon />,
    route: "/abiertos",
    component: <DataTable collection={"en-curso"} />,
  },
  {
    type: "collapse",
    name: "Reabiertos",
    key: "reabiertos",
    rol: ["Root", "Administrador", "Moderador", "Usuario"],
    icon: <RestorePageIcon />,
    route: "/reabiertos",
    component: <DataTable collection={"reabiertos"} />,
  },
  {
    type: "collapse",
    name: "Resueltos",
    key: "resueltos",
    rol: ["Root", "Administrador", "Moderador"],
    icon: <DoneIcon />,
    route: "/resueltos",
    component: <DataTable collection={"resueltos"} />,
  },
  {
    type: "collapse",
    name: "Pendientes",
    key: "pendientes",
    rol: ["Root", "Administrador", "Moderador", "Usuario"],
    icon: <PendingActionsIcon />,
    route: "/pendientes",
    component: <DataTable collection={"pendientes"} />,
  },
  {
    type: "collapse",
    name: "Revisión",
    key: "revision",
    rol: ["Moderador"],
    icon: <RemoveRedEyeIcon />,
    route: "/revision",
    component: <DataTable collection={"revision"} />,
  },
  {
    type: "collapse",
    name: "Cerrados",
    key: "cerrados",
    rol: ["Root", "Administrador", "Moderador", "Usuario"],
    icon: <DoneAllIcon />,
    route: "/cerrados",
    component: <DataTable collection={"cerrados"} />,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    rol: ["Root"],
    icon: <GroupIcon />,
    route: "/usuarios",
    component: <Usuarios />,
  },
  {
    type: "collapse",
    name: "Clientes",
    key: "clientes",
    rol: ["Root"],
    icon: <GroupIcon />,
    route: "/clientes",
    component: <Clientes />,
  },
  {
    type: "collapse",
    name: "Historico de tickets",
    key: "Historico_de_tickets",
    rol: ["Root"],
    icon: <HistoryIcon />,
    route: "/Historico_de_tickets",
    component: <Historico collection={"Pendientes"} />,
  },
  {
    type: "collapse",
    name: "Tickets en mi Coordinación",
    key: "Tickets_en_mi_Coordinacion",
    rol: ["Moderador"],
    icon: <DomainIcon />,
    route: "/Tickets_en_mi_Coordinacion",
    component: <Coordinacion collection={"Pendientes"} />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
