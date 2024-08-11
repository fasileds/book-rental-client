import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeUser from "./pages/user/HomeUser";
import RegisterUser from "./pages/user/RegisterUser";
import LogInUser from "./pages/user/LogInUser";
import BooksUser from "./pages/user/BooksUser";
import RentedBooks from "./pages/user/RentedBooksUser";
import LendingPage from "./pages/LendingPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ChakedState from "./ChakedState";
import LogInAdmin from "./pages/admin/LogInAdmin";
import BooksAdmin from "./pages/admin/BooksAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import OwnersAdmin from "./pages/admin/OwnersAdmin";
import UploadeOwnere from "./pages/owner/UploadeOwner";
import HomeOwner from "./pages/owner/HomeOwner";
import LogInOwner from "./pages/owner/LogInOwner";
import RegisterOwnere from "./pages/owner/RegisterOwner";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LendingPage />} />
            <Route path="/admin/login" element={<LogInAdmin />} />
            <Route path="/admin/books" element={<BooksAdmin />} />
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/owners" element={<OwnersAdmin />} />
            <Route path="/user" element={<HomeUser />} />
            <Route path="/user/register" element={<RegisterUser />} />
            <Route path="/user/login" element={<LogInUser />} />
            <Route path="/user/books" element={<BooksUser />} />
            <Route path="/user/rentedBooks" element={<RentedBooks />} />

            <Route path="/owner/upload" element={<UploadeOwnere />} />
            <Route path="/owner" element={<HomeOwner />} />
            <Route path="/owner/login" element={<LogInOwner />} />
            <Route path="/owner/register" element={<RegisterOwnere />} />
            <Route path="/checking" element={<ChakedState />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
