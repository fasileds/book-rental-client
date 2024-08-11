/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RegisterOwnere() {
  const [email, setEmail] = useState("");
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/register/owner",
        {
          userName,
          email,
          password,
          phoneNo,
          address,
        }
      );
      console.log(res.data);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (success) {
    return <Navigate to="/owner/login" replace />;
  }

  return (
    <div css={registerContainerStyle}>
      <div css={registerLeftStyle}>
        <img src="/logo2.png" alt="Logo" />
      </div>
      <div css={registerRightStyle}>
        <div css={holeStyle}>
          <div css={topPartStyle}>
            <img src="/logo.png" alt="Logo" />
            <span>Book rent</span>
          </div>
          <span>Signup as owner</span>
        </div>
        <form css={formContainerStyle} onSubmit={handleOnClick}>
          <div css={formGroupStyle}>
            <input
              type="email"
              name="floating_email"
              onChange={(e) => setEmail(e.target.value)}
              id="floating_email"
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
              name="floating_password"
              onChange={(e) => setPassword(e.target.value)}
              id="floating_password"
              css={formInputStyle}
              placeholder=" "
              required
            />
            <label htmlFor="floating_password" css={formLabelStyle}>
              Password
            </label>
          </div>
          <div css={gridStyle}>
            <div css={formGroupStyle}>
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                css={formInputStyle}
                onChange={(e) => setName(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="floating_first_name" css={formLabelStyle}>
                Name
              </label>
            </div>
          </div>
          <div css={gridStyle}>
            <div css={formGroupStyle}>
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="floating_phone"
                id="floating_phone"
                css={formInputStyle}
                placeholder=" "
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
              <label htmlFor="floating_phone" css={formLabelStyle}>
                Phone No (+251-979-308-067)
              </label>
            </div>
            <div css={formGroupStyle}>
              <input
                type="text"
                name="floating_company"
                id="floating_company"
                css={formInputStyle}
                onChange={(e) => setAddress(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="floating_company" css={formLabelStyle}>
                Address
              </label>
            </div>
          </div>
          <div css={flexContainerStyle}>
            <div css={checkboxContainerStyle}>
              <input id="terms" type="checkbox" css={checkboxStyle} required />
            </div>
            <label htmlFor="terms" css={labelStyle}>
              I agree with the
              <a href="#" css={labelLinkStyle}>
                terms and conditions
              </a>
            </label>
          </div>
          <button type="submit" css={buttonSubmitStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Emotion CSS-in-JS styles

const registerContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
`;

const registerLeftStyle = css`
  flex: 1;
  background: rgba(23, 27, 54, 1);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 300px;
    height: 200px;
    object-fit: cover;
  }
`;

const registerRightStyle = css`
  flex: 1;
`;

const formContainerStyle = css`
  max-width: 28rem;
  margin: 0 auto;
`;

const formGroupStyle = css`
  position: relative;
  width: 100%;
  margin-bottom: 1.25rem;
`;

const formInputStyle = css`
  padding: 0.625rem 0;
  width: 100%;
  font-size: 0.875rem;
  color: #374151; /* text-gray-900 */
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #d1d5db; /* border-gray-300 */
  appearance: none;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2563eb; /* border-blue-600 */
  }
`;

const formLabelStyle = css`
  position: absolute;
  font-size: 0.875rem;
  color: #6b7280; /* text-gray-500 */
  transition: transform 0.3s, font-size 0.3s;
  transform-origin: 0;
  top: 0.75rem;
  left: 0;
  z-index: -10;

  ${formInputStyle}:focus + &,
  ${formInputStyle}:not(:placeholder-shown) + & {
    font-weight: 500;
    transform: translateY(-1.5rem) scale(0.75);
    color: #2563eb; /* text-blue-600 */
  }
`;

const gridStyle = css`
  display: grid;
  gap: 1.5rem;
`;

const flexContainerStyle = css`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.25rem; /* mb-5 */
`;

const checkboxContainerStyle = css`
  display: flex;
  align-items: center;
  height: 1.25rem; /* h-5 */
`;

const checkboxStyle = css`
  width: 1rem; /* w-4 */
  height: 1rem; /* h-4 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.25rem; /* rounded */
  background-color: #f9fafb; /* bg-gray-50 */
  outline: none;
  transition: box-shadow 0.2s;

  &:focus {
    box-shadow: 0 0 0 0.1875rem rgba(59, 130, 246, 0.3); /* focus:ring-3 focus:ring-blue-300 */
  }
`;

const labelStyle = css`
  margin-inline-start: 0.5rem; /* ms-2 */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #111827; /* text-gray-900 */

  a {
    color: #2563eb; /* text-blue-600 */
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const labelLinkStyle = css`
  color: #2563eb; /* text-blue-600 */

  &:hover {
    text-decoration: underline;
  }
`;

const buttonSubmitStyle = css`
  color: #ffffff;
  background-color: #1d4ed8; /* bg-blue-700 */
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  display: inline-block;
  width: 100%;

  &:hover {
    background-color: #1e40af; /* bg-blue-800 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.5); /* focus:ring-4 */
  }
`;

const topPartStyle = css`
  display: flex;
  align-items: center;

  img {
    width: 60px;
    height: 30px;
    object-fit: cover;
    margin-left: 75px;
    margin-bottom: 20px;
  }

  span {
    font-size: 20px;
  }
`;

const holeStyle = css`
  span {
    font-size: 20px;
    margin-bottom: 20px;
    margin-left: 75px;
  }
`;
