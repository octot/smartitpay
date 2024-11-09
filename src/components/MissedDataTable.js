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
  Button
} from "@mui/material";
import * as XLSX from "xlsx";
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
    tutorDetailsFromFirstExcel: tutorDetailsFromFirstExcel[index] || "",
    tutorDetailsFromSecondExcel: tutorDetailsFromSecondExcel[index] || "",
    tutorDetailsFromCombinedExcel: tutorDetailsFromCombinedExcel[index] || "",
    missingTutorDetailsFromCombinedExcel:
      missingTutorDetailsFromCombinedExcel[index] || "",
  }));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log("combinedData", combinedData);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDownloadExcel = () => {
    const currentDate = new Date();
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour time
    };
    const timeStamp = currentDate.toLocaleString("en-GB", options);
    const fileName = `ViewRecords_${timeStamp}.xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(combinedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
  };
  return (
    <TableContainer component={Paper}>
      <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleDownloadExcel}>
            Download Excel
          </Button>
        </div>
      </div>
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
                <TableCell>{row.tutorDetailsFromFirstExcel}</TableCell>
                <TableCell>{row.tutorDetailsFromSecondExcel}</TableCell>
                <TableCell>{row.tutorDetailsFromCombinedExcel}</TableCell>
                <TableCell>
                  {row.missingTutorDetailsFromCombinedExcel}
                </TableCell>
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
