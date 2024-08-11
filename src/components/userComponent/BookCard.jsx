import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import debounce from "lodash.debounce";

export default function BookCard({ item }) {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);

  // Debounced handleClick function to prevent multiple requests
  const handleClick = useCallback(
    debounce(async () => {
      if (loading) return; // Prevent multiple clicks while loading
      setLoading(true);
      try {
        await axios.post(`http://localhost:3001/api/rent/rent/${item.id}`, {
          userId: user.id,
        });
        alert("Book rented successfully!");
        // Optionally dispatch an action to update the store
        // dispatch(addBooks(item));
      } catch (error) {
        console.error("Error renting book:");
        alert("Failed to rent the book. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 300), // Adjust debounce delay as needed
    [loading, user.id, item.id]
  );

  return (
    <div className="w-full m-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          src="https://plus.unsplash.com/premium_photo-1667251760504-096946b820af?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h5>
        </a>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {item.price} Birr
          </span>
          <button
            onClick={handleClick}
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Renting..." : "Rent this book"}
          </button>
        </div>
      </div>
    </div>
  );
}
