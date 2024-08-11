import styled from "@emotion/styled";
import React from "react";

// Enhanced styling for the NavBar container
const Container = styled.div`
  height: 60px;
  box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the content */
  color: #333; /* Text color */
  font-size: 1.1rem;
  font-weight: bold;
  border: 1px solid #ddd; /* Subtle border to define edges */
`;

const Span = styled.span`
  color: #00abff; /* Accent color for the text */
  transition: color 0.3s ease;

  &:hover {
    color: #007bb5; /* Slightly darker blue on hover */
  }
`;

export default function NavBar() {
  return (
    <Container>
      <Span>span</Span>
    </Container>
  );
}
