import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/user";
import { Navigate } from "react-router-dom";

export default function LogInUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleOnClick = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login/user",
        { email, password }
      );
      console.log(res.data);
      setSuccess(true);
      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.accessToken,
        })
      );
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
    return <Navigate to="/user" replace />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <form
        className="max-w-md mx-auto bg-white p-10 rounded-lg shadow-xl border border-gray-300"
        style={{ width: "100%", maxWidth: "28rem" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            required
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/user/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>

        <button
          type="submit"
          onClick={handleOnClick}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
        >
          Log In
        </button>

        {error && (
          <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
        )}
      </form>
    </div>
  );
}
