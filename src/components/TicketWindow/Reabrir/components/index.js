import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Box from "@mui/material/Box";
//store
import { useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
//api
import { useGetUsuariosQuery } from "api";

// const CardUsers = () => {
//   const ticket = useTicketStore();
//   const { data: usuarios, isLoading, error } = useGetUsuariosQuery();
//   const [selectedUserId, setSelectedUserId] = React.useState("");
//   const [selectedCoordinacion, setSelectedCoordinacion] = React.useState("");
//   console.log(ticket);
//   // Maneja el cambio de selección del usuario
//   const handleChange = (e) => {
//     const userId = e.target.value;
//     setSelectedUserId(userId);

//     // Encuentra el usuario seleccionado en la lista para obtener la coordinación
//     const selectedUser = usuarios.data.find((user) => user._id === userId);
//     if (selectedUser) {
//       setSelectedCoordinacion(selectedUser.Coordinacion);
//     }
//   };
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   console.log(usuarios);
//   return (
//     <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
//       <Grid xs={6} mb={12}>
//         <Card>
//           <MDBox
//             variant="gradient"
//             bgColor="primary"
//             borderRadius="lg"
//             coloredShadow="info"
//             mx={2}
//             mt={-3}
//             p={2}
//             mb={1}
//             textAlign="center"
//           >
//             <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//               Reasignar Ticket
//             </MDTypography>
//           </MDBox>
//           <MDBox pt={4} pb={3} px={3}>
//             <MDBox component="form" role="form">
//               <Grid container spacing={3}>
//                 <Grid xs={12} sx={{ display: ticket.Reasignado_a.Nombre ? "unset" : "none" }}>
//                   <MDBox mb={2}>
//                     <MDInput
//                       type="text"
//                       label="El ticket se encuentra reasignado a:"
//                       value={ticket.Reasignado_a.Nombre}
//                       //onChange={(e) => setEditor("editor", e.target.value)}
//                       fullWidth
//                       disabled={true}
//                     />
//                   </MDBox>
//                 </Grid>
//                 <Grid xs={6}>
//                   <MDBox mb={2}>
//                     <FormControl fullWidth>
//                       <InputLabel id="demo-simple-select-label">Reasignar a:</InputLabel>
//                       <Select
//                         sx={{ minHeight: "3rem" }}
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         value={selectedUserId}
//                         label="Reasignar a:"
//                         onChange={handleChange}
//                       >
//                         {usuarios.data.map((user) => {
//                           return (
//                             <MenuItem value={user._id} key={user._id}>
//                               {user.Nombre}
//                             </MenuItem>
//                           );
//                         })}
//                       </Select>
//                     </FormControl>
//                   </MDBox>
//                 </Grid>
//                 <Grid xs={6}>
//                   <MDBox mb={2}>
//                     <MDInput
//                       type="text"
//                       label="Coordinación:"
//                       value={selectedCoordinacion}
//                       //onChange={(e) => setEditor("editor", e.target.value)}
//                       fullWidth
//                       disabled={true}
//                     />
//                   </MDBox>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </MDBox>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
          <Tab icon={<PhoneIcon />} label="RECENTS" />
          <Tab icon={<FavoriteIcon />} label="FAVORITES" />
          <Tab icon={<PersonPinIcon />} label="NEARBY" />
          <Tab icon={<PersonPinIcon />} label="NEARBY" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three-2
      </CustomTabPanel>
    </Box>
  );
}
