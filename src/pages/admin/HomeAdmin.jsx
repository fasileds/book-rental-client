/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import SideBar from "../../components/sidBar/SideBar";
import NavBar from "../../components/NavBar";
import Midle from "../../components/midlePart/Midle";
import Graph from "../../components/graph/Graph";
import Tables from "../../components/table/Table";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// Styles
const homeContainerStyle = css`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const homeComponentsStyle = css`
  display: flex;
  flex: 3;
  flex-direction: column;
  padding: 20px;
  gap: 5px;
  overflow: hidden; /* Prevent scrolling in this section */
`;

const homeSeconedStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const homeThirdStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: calc(
    100vh - 160px
  ); /* Adjust height based on the fixed elements above */
`;

// Main Component
export default function HomeAdmin() {
  const [statuse, setStutes] = useState([]);
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getStutes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/auth/owners/ownersStatuse/${user.id}`
        );
        console.log("Fetched status data:", res.data);
        setStutes(res.data);
      } catch (error) {
        console.log("Error fetching status:", error);
      }
    };

    if (user.id) {
      getStutes();
    }
  }, [user.id]); // Add user.id as a dependency

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div css={homeContainerStyle}>
      <SideBar type={"admin"} />
      <div css={homeComponentsStyle}>
        <NavBar />
        <div css={homeSeconedStyle}>
          <Midle />
          <div css={homeThirdStyle}>
            <Tables />
            <Graph statuse={statuse} />
          </div>
        </div>
      </div>
    </div>
  );
}
