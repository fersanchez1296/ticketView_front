import React from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
//mui library components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
//store
import { useCrearTicketStore } from "../store/crearTicket.store.ts";
//proptypes
import PropTypes from "prop-types";
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
const Resolutor = ({ data }) => {
  const crearTicketStore = useCrearTicketStore();
  const standby = useCrearTicketStore((state) => state.standby);

  return (
    <React.Fragment>
      <Grid container spacing={1} sx={{ mt: 5 }}>
        <Grid xs={12}>
          <Card>
            <MDBox
              bgColor="primary"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={0}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Moderador
              </MDTypography>
            </MDBox>
            <MDBox
              pt={4}
              pb={3}
              px={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormGroup>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <MDBox sx={{ display: "flex" }}>
                    <Typography>Asignar a moderador</Typography>
                    <Switch
                      checked={standby}
                      onChange={(e) => {
                        crearTicketStore.setCrearTicketFields("standby", !standby);
                      }}
                    />
                    <Typography>Standby</Typography>
                  </MDBox>
                </Stack>
              </FormGroup>
              {standby ? null : (
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <FormControl sx={{ width: 500 }}>
                    <InputLabel htmlFor="grouped-native-select">Asignar a:</InputLabel>
                    <Select
                      native
                      defaultValue=""
                      id="grouped-native-select"
                      label="Reasignar a"
                      onChange={(e) => {
                        const [asignado_a, area_id] = e.target.value.split("|");
                        crearTicketStore.setCrearTicketFields("Asignado_a", asignado_a);
                        crearTicketStore.setCrearTicketFields("Area_asignado", area_id);
                      }}
                    >
                      <option aria-label="None" value="" />
                      {data.areasResolutores.map((area) => {
                        if (area) {
                          return (
                            <optgroup label={area.area.area} key={area.area._id}>
                              {area.resolutores.map((t, index) => (
                                <option value={`${t._id}|${area.area._id}`} key={index}>
                                  {t.Nombre}
                                </option>
                              ))}
                            </optgroup>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </Select>
                  </FormControl>
                </Box>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Resolutor.propTypes = {
  data: PropTypes.array,
};

export default React.memo(Resolutor);
