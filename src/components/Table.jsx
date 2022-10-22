import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const Table = ({ rows, columns, handleClick }) => {
  return (
    <div className="m-1 mt-4" style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={handleClick}
      />
    </div>
  );
};

export default Table;
