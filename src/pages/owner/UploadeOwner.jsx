/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../../components/sidBar/SideBar";
import NavBar from "../../components/NavBar";

const UploadeOwnere = () => {
  const [showForm, setShowForm] = useState(false);
  const [showsuccess, setShowsuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [catagoryes, setCatagoryes] = useState([]);

  const token = useSelector((state) => state.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents form submission from reloading the page
    const amountNumber = parseInt(amount);
    const priceNumber = parseFloat(price);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/book/createBook",
        {
          title,
          author,
          amount: amountNumber,
          price: priceNumber,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Assuming `token` is your JWT token
          },
        }
      );
      console.log(res.data);
      setShowsuccess(true); // Show success popup on successful submission
    } catch (error) {
      console.error("Error uploading book:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  };

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleSuccess = () => {
    setShowsuccess(!showsuccess);
  };

  useEffect(() => {
    const getCatagorys = async () => {
      try {
        const res = await axios(
          "http://localhost:3001/api/catagories/catagories"
        );
        setCatagoryes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCatagorys();
  }, []); // Adding dependency array to avoid infinite loop

  return (
    <div css={uploadContainerStyle}>
      <SideBar type={"owner"} />
      <div css={uploadComponentsStyle}>
        <NavBar />
        <div css={uploadSeconedStyle}>
          <div>
            <h2>Upload New Book</h2>
          </div>
          <div css={serchItemsStyle}>
            <span>Search book by name or author</span>
            <input type="text" placeholder="Enter book name or author" />
          </div>
          <div css={theSeconedStyle}>
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Book Quantity"
              min="1"
              value={amount}
            />
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Rent Price for Two Weeks"
              min="0"
              value={price}
            />
          </div>
          <div css={submitButtonStyle}>
            <button onClick={toggleForm}>Add New Book</button>
          </div>
          <div css={buttonStyle}>
            <button>
              <span>Upload Book Cover</span>
            </button>
          </div>

          {/* Pop-up Form */}
          {showForm && (
            <div css={popupFormStyle}>
              <div css={popupContentStyle}>
                <h3>Add Book</h3>
                <form css={formContainerStyle} onSubmit={handleSubmit}>
                  <div css={formGroupStyle}>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      name="book_name"
                      id="book_name"
                      css={formInputStyle}
                      placeholder=" "
                      value={title}
                      required
                    />
                    <label htmlFor="book_name" css={formLabelStyle}>
                      Book Name
                    </label>
                  </div>
                  <div css={formGroupStyle}>
                    <input
                      type="text"
                      name="author_name"
                      onChange={(e) => setAuthor(e.target.value)}
                      id="author_name"
                      css={formInputStyle}
                      placeholder=" "
                      value={author}
                      required
                    />
                    <label htmlFor="author_name" css={formLabelStyle}>
                      Author Name
                    </label>
                  </div>
                  <div css={formGroupStyle}>
                    <select
                      name="category"
                      id="category"
                      css={formInputStyle}
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      required
                    >
                      <option value="" disabled>
                        Category
                      </option>
                      {catagoryes.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="category" css={formLabelStyle}>
                      Category
                    </label>
                  </div>
                  <button type="submit" css={buttonSubmitStyle}>
                    Add
                  </button>
                </form>
                <button css={closeButtonStyle} onClick={toggleForm}>
                  Close
                </button>
              </div>
            </div>
          )}

          {showsuccess && (
            <div css={popupFormStyle}>
              <div css={popupContentStyle}>
                <img src="/imogi.png" alt="Success" />
                <h2>Congratulations!</h2>
                <span>
                  You have successfully uploaded the book. Please wait until we
                  approve it.
                </span>
                <button css={closeButtonStyle} onClick={toggleSuccess}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadeOwnere;

// Emotion CSS-in-JS styles

const uploadContainerStyle = css`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const uploadComponentsStyle = css`
  display: flex;
  flex: 3;
  flex-direction: column;
  padding: 20px;
  gap: 5px;
  overflow: hidden;
`;

const uploadSeconedStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const serchItemsStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  input {
    border: none;
    height: 30px;
    width: 300px;
    background-color: rgb(196, 196, 196);
  }
`;

const theSeconedStyle = css`
  display: flex;
  align-items: center;
  gap: 30px;

  input {
    height: 30px;
    width: 300px;
    padding: 10px;
    border: 1px solid wheat;
    border-radius: 10px;
  }
`;

const submitButtonStyle = css`
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 171, 255, 1);
  border-radius: 15px;

  button {
    background-color: rgba(0, 171, 255, 1);
    font-size: 15px;
    border: none;
    color: #ffffff;
  }
`;

const buttonStyle = css`
  button {
    border: none;
    font-size: 15px;
    background-color: white;
    color: rgba(0, 171, 255, 1);
  }
`;

const popupFormStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const popupContentStyle = css`
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const formContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
`;

const formGroupStyle = css`
  position: relative;
  width: 100%;
`;

const formInputStyle = css`
  padding: 0.625rem;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 0.375rem;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const formLabelStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.625rem;
  font-size: 0.875rem;
  color: #6c757d;
  pointer-events: none;
  transition: 0.2s ease;
`;

const buttonSubmitStyle = css`
  background-color: rgba(0, 171, 255, 1);
  color: #ffffff;
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #1e40af;
  }
`;

const closeButtonStyle = css`
  margin-top: 1rem;
  color: #ffffff;
  background-color: #1d4ed8;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #1e40af;
  }
`;
