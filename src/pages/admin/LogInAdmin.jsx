/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { loginSuccess } from "../../redux/user";

// Styles
const logInContainerStyle = css`
  display: flex;
  height: 100vh;
  background-color: #f3f4f6; /* Light gray background */
`;

const logInLeftStyle = css`
  flex: 1;
  background: rgba(23, 27, 54, 1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const logInLeftImageStyle = css`
  width: 300px;
  height: 200px;
  object-fit: contain;
`;

const loginRightStyle = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const formContainerStyle = css`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const formGroupStyle = css`
  position: relative;
  margin-bottom: 1.5rem;
`;

const formInputStyle = css`
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  color: #374151;
  background-color: transparent;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }

  &::placeholder {
    color: transparent;
  }

  &:not(:placeholder-shown) + label,
  &:focus + label {
    transform: translateY(-1.5rem) scale(0.75);
    color: #2563eb;
  }
`;

const formLabelStyle = css`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  font-size: 1rem;
  color: #6b7280;
  transform: translateY(-50%);
  transform-origin: left;
  transition: transform 0.2s, color 0.2s;
  pointer-events: none;
`;

const flexContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;

const checkboxContainerStyle = css`
  display: flex;
  align-items: center;
`;

const checkboxStyle = css`
  width: 1rem;
  height: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.25rem;
  background-color: #f9fafb;
  outline: none;
  transition: box-shadow 0.2s;

  &:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
`;

const labelStyle = css`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #111827;

  a {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const buttonSubmitStyle = css`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #2563eb;
  border: none;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
  }
`;

const errorMessageStyle = css`
  color: #ef4444; /* Tailwind red-500 */
  margin-top: 1rem;
  font-size: 0.875rem;
  text-align: center;
`;

// Main Component
export default function LogInAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(null); // Track isChecked state
  const dispatch = useDispatch();

  const handleOnClick = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login/owner",
        { email, password }
      );
      const { user, accessToken } = res.data;
      setIsChecked(user.isChecked); // Set isChecked based on response
      dispatch(
        loginSuccess({
          user,
          token: accessToken,
        })
      );
      setSuccess(true);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  if (success) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div css={logInContainerStyle}>
      <div css={logInLeftStyle}>
        <img css={logInLeftImageStyle} src="/logo2.png" alt="Logo" />
      </div>
      <div css={loginRightStyle}>
        <div css={formContainerStyle}>
          <div className="hole">
            <div className="topPart" css={{ textAlign: "center" }}>
              <img src="/logo.png" alt="Book Rent Logo" />
              <h1
                css={{
                  marginTop: "1rem",
                  fontSize: "1.5rem",
                  color: "#111827",
                }}
              >
                Book Rent
              </h1>
            </div>
            <h2
              css={{ marginTop: "2rem", fontSize: "1.25rem", color: "#374151" }}
            >
              Log In as Addmin
            </h2>
          </div>
          <form onSubmit={handleOnClick}>
            <div css={formGroupStyle}>
              <input
                type="email"
                id="floating_email"
                onChange={(e) => setEmail(e.target.value)}
                css={formInputStyle}
                placeholder=" "
                required
              />
              <label htmlFor="floating_email" css={formLabelStyle}>
                Email address
              </label>
            </div>
            <div css={formGroupStyle}>
              <input
                type="password"
                id="floating_password"
                onChange={(e) => setPassword(e.target.value)}
                css={formInputStyle}
                placeholder=" "
                required
              />
              <label htmlFor="floating_password" css={formLabelStyle}>
                Password
              </label>
            </div>

            <div css={flexContainerStyle}>
              <div css={checkboxContainerStyle}>
                <input id="terms" type="checkbox" css={checkboxStyle} />
              </div>
              <label htmlFor="terms" css={labelStyle}>
                Remember me
              </label>
            </div>

            <button type="submit" css={buttonSubmitStyle}>
              Log In
            </button>

            {error && <div css={errorMessageStyle}>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
