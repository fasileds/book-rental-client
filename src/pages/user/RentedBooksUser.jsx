import React, { useEffect, useState } from "react";
import NavBar from "../../components/userComponent/NavBar";
import Footer from "../../components/userComponent/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RentedBooks() {
  const userId = useSelector((state) => state.user.user.id);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getRentedBooks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/rent/rentedBooks/${userId}`
        );
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      getRentedBooks();
    }
  }, [userId]);

  const token = useSelector((state) => state.user.token);
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleOnClick = async (bookId) => {
    try {
      // Include userId in the URL or as a query parameter
      await axios.delete(
        `http://localhost:3001/api/rent/delete/${bookId}?userId=${userId}`
      );
      // Optionally, remove the book from the local state after successful deletion
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.log("API request failed");
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {books.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src="https://images.unsplash.com/photo-1470549638415-0a0755be0619?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={item.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <input
                          type="number"
                          id="first_product"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="1"
                          required
                        />
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOnClick(item.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="No books"
              className="mb-4 w-32 h-32 object-cover rounded-full"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No Books Rented Yet!
            </h3>
            <p className="text-gray-600 text-center">
              It seems like you haven't rented any books yet. Explore our
              collection and find your next great read!
            </p>
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Explore Books
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}