import React, { useEffect, useState } from "react";
import NavBar from "../../components/userComponent/NavBar";
import Slider from "../../components/userComponent/Slider";
import BookCard from "../../components/userComponent/BookCard";
import Footer from "../../components/userComponent/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function HomeUser() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/book/getValidBook"
        );
        setBooks(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  });
  const token = useSelector((state) => state.user.token);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <div>
      <NavBar />
      <Slider />{" "}
      <div className="flex flex-wrap items-center justify-between  flex-row">
        {books.map((item) => (
          <BookCard key={item.id} item={item} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
