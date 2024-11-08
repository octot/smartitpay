import React, { useState } from "react";
import {
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableColumn,
} from "@mui/material";

const MissedDataTable = ({
  tutorDetailsFromFirstExcel,
  tutorDetailsFromSecondExcel,
  tutorDetailsFromCombinedExcel,
  missingTutorDetailsFromCombinedExcel,
  headings,
}) => {
  console.log(
    "typetutorDetailsFromFirstExcel",
    typeof tutorDetailsFromFirstExcel
  );
  console.log(
    "tutorDetailsFromFirstExcelData",
    Object.keys(tutorDetailsFromFirstExcel)
  );
  const maxLength = Math.max(
    tutorDetailsFromFirstExcel.length,
    tutorDetailsFromSecondExcel.length,
    tutorDetailsFromCombinedExcel.length,
    missingTutorDetailsFromCombinedExcel.length
  );

  const combinedData = Array.from({ length: maxLength }, (_, index) => ({
    column1: tutorDetailsFromFirstExcel[index] || "",
    column2: tutorDetailsFromSecondExcel[index] || "",
    column3: tutorDetailsFromCombinedExcel[index] || "",
    column4: missingTutorDetailsFromCombinedExcel[index] || "",
  }));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log(combinedData);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headings.map((heading, index) => (
              <TableCell key={index}>{heading}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {combinedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{row.column1}</TableCell>
                <TableCell>{row.column2}</TableCell>
                <TableCell>{row.column3}</TableCell>
                <TableCell>{row.column4}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={combinedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default MissedDataTable;
