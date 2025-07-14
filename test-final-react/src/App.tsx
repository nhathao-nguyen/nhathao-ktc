import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import { UserProvider } from "./context/UserProvider";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <nav className="space-x-4 border-b p-2 mb-4 flex justify-center">
          <Link
            to="/"
            className=" items-center bg-blue-600 p-4 rounded-xl text-white text-xl uppercase"
          >
            Home
          </Link>
          <Link
            to="/users"
            className=" items-center bg-blue-600 p-4 rounded-xl text-white text-xl uppercase"
          >
            Users
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <UserForm />
              </>
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
