/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import SideBar from "../../components/sidBar/SideBar";
import NavBar from "../../components/NavBar";
import Midle from "../../components/midlePart/Midle";
import Table from "../../components/table/Table";
import Graph from "../../components/graph/Graph";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function HomeOwner() {
  const token = useSelector((state) => state.user.token);
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div css={homeContainerStyle}>
      <SideBar type={"owner"} />
      <div css={homeComponentsStyle}>
        <NavBar />
        <div css={homeSeconedStyle}>
          <Midle />
          <div css={homeThirdStyle}>
            <Table />
            <Graph />
          </div>
        </div>
      </div>
    </div>
  );
}

// Emotion CSS-in-JS styles

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
