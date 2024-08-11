/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CurtainsClosedOutlinedIcon from "@mui/icons-material/CurtainsClosedOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Tables() {
  const [books, setBooks] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/book/getOwnersBook",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming `token` is your JWT token
            },
          }
        );
        console.log(res.data);
        setBooks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getBooks(); // Call the function inside useEffect
  }, [token]);

  return (
    <div css={tableContainerStyle}>
      <div css={tableFirstStyle}>
        <input type="text" css={inputStyle} />
        <div>
          <SearchOutlinedIcon />
          <SpaceDashboardIcon />
          <CurtainsClosedOutlinedIcon />
        </div>
      </div>
      <div>
        <h2>Live Book Status</h2>
      </div>
      <div css={tableWrapperStyle}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Book Name</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="item">
                    {item.title}
                  </TableCell>
                  <TableCell align="right">{item.author}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.amount}</TableCell>
                  <TableCell align="right">
                    {item.isAvailable ? (
                      <div css={flexRowStyle}>
                        <div css={rentedIndicatorStyle}></div>
                        <span css={rentedTextStyle}>Rented</span>
                      </div>
                    ) : (
                      <div css={flexRowStyle}>
                        <div css={availableIndicatorStyle}></div>
                        <span css={availableTextStyle}>Available</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <RemoveRedEyeIcon style={{ cursor: "pointer" }} />
                    <span style={{ color: "red", cursor: "pointer" }}>
                      {" "}
                    </span>{" "}
                    <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

const tableContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const tableFirstStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const inputStyle = css`
  height: 30px;
  width: 80vh;
  border: none;
  padding: 5px;
  border-radius: 10px;
  background-color: rgb(156, 156, 156);

  &:focus {
    border: none;
    background-color: rgb(211, 211, 211);
  }
`;

const tableWrapperStyle = css`
  margin-top: 10px;
`;

const flexRowStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const rentedIndicatorStyle = css`
  height: 16px;
  width: 16px;
  background-color: #ff0000;
  border-radius: 50%;
  border: 2px solid #8b0000;
`;

const rentedTextStyle = css`
  color: #8b0000;
  font-weight: 500;
`;

const availableIndicatorStyle = css`
  height: 16px;
  width: 16px;
  background-color: #0000ff;
  border-radius: 50%;
  border: 1px solid #00008b;
`;

const availableTextStyle = css`
  color: #00008b;
  font-weight: 600;
`;
