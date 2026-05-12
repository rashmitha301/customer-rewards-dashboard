import React, { useState, useMemo, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";

function CommonTable({ title, columns = [], data = [], keyField, rowsPerPage = 10 }) {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const sortedData = useMemo(() => {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
      const valA = a[orderBy];
      const valB = b[orderBy];

      if (valA == null || valB == null) return 0;

      // number sort
      if (typeof valA === "number" && typeof valB === "number") {
        return order === "asc" ? valA - valB : valB - valA;
      }

      // date sort
      const dateA = new Date(valA);
      const dateB = new Date(valB);
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }

      // string sort
      return order === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, orderBy, order]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedData, page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [data]);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography
        variant="h6"
        sx={{ p: 2, backgroundColor: "#4982b4", color: "#fff" }}
      >
        {title}
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field}>
                {col.isSortable ? (
                  <TableSortLabel
                    active={orderBy === col.field}
                    direction={orderBy === col.field ? order : "asc"}
                    onClick={() => handleSort(col.field)}
                  >
                    <b>{col.header}</b>
                  </TableSortLabel>
                ) : (
                  <b>{col.header}</b>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row) => (
              <TableRow key={keyField(row)}>
                {columns.map((col) => (
                  <TableCell key={col.field}>
                    {col.field === "price"
                      ? Number(row[col.field]).toFixed(2)
                      : row[col.field] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={sortedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </TableContainer>
  );
}

export default React.memo(CommonTable);