import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//mui library components
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
//store
import { useTicketStore } from "zustand/index.ts";
//proptypes
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const HistoriaTicket = () => {
  const ticket = useTicketStore();
  return (
    <Grid container spacing={1} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <Grid xs={12} mb={12}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Historia del ticket
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            {ticket.Historia_ticket.map((mensaje) => (
              <div key={1}>
                <Accordion
                  sx={{
                    my: "8px",
                    border: mensaje.Rol != "Usuario" ? "1px solid green" : "1px solid blue",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                  >
                    <MDBox sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="h5">{`${mensaje.Nombre.Nombre}`}</Typography>
                      <Typography variant="h6" color={"blue"}>
                        {mensaje.Fecha}
                      </Typography>
                    </MDBox>
                  </AccordionSummary>
                  <AccordionDetails>{mensaje.Mensaje}</AccordionDetails>
                </Accordion>
              </div>
            ))}
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );
};

HistoriaTicket.propTypes = {
  disable_input: PropTypes.bool,
};

export default React.memo(HistoriaTicket);
