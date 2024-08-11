import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterUser() {
  const [email, setEmaile] = useState("");
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [succses, setSuccess] = useState(false);
  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/register/user",
        {
          userName,
          email,
          password,
        }
      );
      console.log(res.data);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (succses) {
    return <Navigate to="/user/login" replace />;
  }
  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{ height: "100vh" }}
    >
      <form
        className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-lg"
        style={{ width: "100%", maxWidth: "24rem" }}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            onChange={(e) => setEmaile(e.target.value)}
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name..."
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <span
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            if you allready have an account{" "}
            <a
              href="/user/login"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              Log In
            </a>
          </span>
        </div>
        <button
          type="submit"
          onClick={handleOnClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
}
