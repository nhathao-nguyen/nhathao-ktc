import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Lession08Afternoon/HomePage";
import SignUpPage from "./Lession08Afternoon/SignUpPage";
import Login from "./Lession08Afternoon/LoginPage";

function App() {
  return (
    <Router>
      <div className="">
        <div className="">
          <main className="">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
