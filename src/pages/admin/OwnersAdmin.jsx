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
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";

// Styles
const homeContainerStyles = css`
  display: flex;
  height: 100vh;
`;

const avatarStyle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

const approveButton = css`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: #00abff;
  color: white;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0098d4;
  }
`;

const approveButtonDisabled = css`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: #757575;
  color: white;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: not-allowed;
`;

const popupForm = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const popupContent = css`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 24rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const closeButton = css`
  background-color: #f3f4f6;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #111827;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e5e7eb;
  }
  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

const formInput = css`
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  color: #111827;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  padding: 0.625rem;
  width: 100%;
  display: block;
  margin-bottom: 1.25rem;
`;

const formInputDisabled = css`
  cursor: not-allowed;
`;

// Switch component
const Switch = ({ isActive, onToggle }) => (
  <div
    css={css`
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
      .react-switch-button {
        width: 28px;
        height: 28px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 1px;
        left: 1px;
        transition: transform 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        &.active {
          transform: translateX(calc(100% - 30px));
        }
      }
      .react-switch-label {
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }
    `}
    className={isActive ? "active" : ""}
    onClick={onToggle}
  >
    <div className="react-switch-button" />
    {isActive && <span className="react-switch-label">Active</span>}
  </div>
);

// Main Component
export default function OwnersAdmin() {
  const [isActive, setIsActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [owners, setOwners] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const getOwners = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/owners", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOwners(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOwners();
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDelete = (id) => {
    // Implement the delete function
    console.log("Delete owner with ID:", id);
  };

  return (
    <div css={homeContainerStyles}>
      <SideBar />
      <div className="homeComponents">
        <NavBar />
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell align="right">Owner</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {owners.map((owner) => (
                  <TableRow
                    key={owner.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {owner.id}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        css={avatarStyle}
                        src="https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt={owner.name}
                      />
                      {owner.name}
                    </TableCell>
                    <TableCell align="right">{owner.email}</TableCell>
                    <TableCell align="right">{owner.location}</TableCell>
                    <TableCell align="center">
                      <Switch
                        isActive={owner.isChecked}
                        onToggle={() => handleToggle(owner.id)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <RemoveRedEyeIcon
                        onClick={() => toggleForm()}
                        css={css`
                          cursor: pointer;
                        `}
                      />
                      <DeleteIcon
                        onClick={() => handleDelete(owner.id)}
                        css={css`
                          color: red;
                          cursor: pointer;
                        `}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {owner.isChecked ? (
                        <button css={approveButton}>Approved</button>
                      ) : (
                        <button css={approveButtonDisabled} disabled>
                          Not Approved
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {showForm && (
        <div css={popupForm}>
          <div css={popupContent}>
            <h2 className="popupTitle">Owner Details</h2>
            <form className="max-w-sm mx-auto">
              <input
                type="text"
                id="ownerName"
                aria-label="Owner Name"
                css={formInput}
                value="Owner Name"
                disabled
              />
              <input
                type="text"
                id="ownerEmail"
                aria-label="Owner Email"
                css={formInput}
                value="owner@example.com"
                disabled
              />
              <input
                type="text"
                id="ownerLocation"
                aria-label="Owner Location"
                css={formInput}
                value="Location"
                disabled
              />
              <input
                type="text"
                id="ownerPhone"
                aria-label="Owner Phone"
                css={formInput}
                value="Phone Number"
                disabled
              />
            </form>
            <button css={closeButton} onClick={toggleForm}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
