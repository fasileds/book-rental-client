import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function createData(
  name, // Removed type annotations for simplicity
  calories,
  fat,
  carbs,
  protein
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];

export default function BasicTable({ item }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Book Name</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">Amounte</TableCell>
            <TableCell align="right">Statuse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="item">
              {item.title}
            </TableCell>
            <TableCell align="right">{item.author}</TableCell>
            <TableCell align="right">{item.price}</TableCell>
            <TableCell align="right">{item.amount}</TableCell>
            <TableCell align="right">{item.protein}</TableCell>
            <TableCell align="right">
              <RemoveRedEyeIcon />
              <span style={{ color: "red", cursor: "pointer" }}> </span>{" "}
              <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
