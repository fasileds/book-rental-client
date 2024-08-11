/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SideBar from "../../components/sidBar/SideBar";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";

// Flex container styles
const homeContainerStyles = css`
  display: flex;
  height: 100vh;
`;

const homeComponentsStyles = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

// Switch component styles
const switchStyles = css`
  display: flex;
  align-items: center;
  width: 120px;
  height: 30px;
  background-color: #e0e0e0;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &.active {
    background-color: #4caf50;
  }
`;

const switchButtonStyles = css`
  width: 28px;
  height: 28px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .active & {
    transform: translateX(calc(100% - 30px));
  }
`;

const switchLabelStyles = css`
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

// Avatar image styles
const avatarStyles = css`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

export default function BooksAdmin() {
  const [books, setBooks] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/book", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setBooks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getBooks();
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleToggle = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isAvailable: !book.isAvailable } : book
      )
    );
  };

  return (
    <div css={homeContainerStyles}>
      <SideBar />
      <div css={homeComponentsStyles}>
        <NavBar />
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell align="right">Author</TableCell>
                  <TableCell align="right">Owner</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Book Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">
                      <img
                        css={avatarStyles}
                        src="https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                      {row.owner.name}
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="center">
                      <div
                        css={switchStyles}
                        className={
                          row.isAvailable && row.isAproved ? "active" : ""
                        }
                        onClick={() => handleToggle(row.id)}
                      >
                        <div css={switchButtonStyles} />
                        {row.isAvailable && row.isAproved && (
                          <span css={switchLabelStyles}>Active</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
