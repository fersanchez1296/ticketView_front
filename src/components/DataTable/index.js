import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
// Material Dashboard 2 React components
//prop types
import PropTypes from "prop-types";
export default function DataTable({ rows, columns }) {
  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        headerAlign="right"
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 20, 25]}
        sx={{ border: 0 }}
        getRowId={(row) => row.Id}
      />
    </Paper>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
};
