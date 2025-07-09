import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Lession08Afternoon/RegisterPage";
import LoginFormPage from "./Lession08Afternoon/LoginFormPage";
// import HomePage from "./Lession08Afternoon/HomePage";
// import SignUpPage from "./Lession08Afternoon/SignUpPage";
// import Login from "./Lession08Afternoon/LoginPage";

function App() {
  return (
    //form login exercise 1 afternoon
    // <Router>
    //   <div className="">
    //     <div className="">
    //       <main className="">
    //         <Routes>
    //           <Route path="/" element={<HomePage />} />
    //           <Route path="/signup" element={<SignUpPage />} />
    //           <Route path="/login" element={<Login />} />
    //         </Routes>
    //       </main>
    //     </div>
    //   </div>
    // </Router>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<RegisterPage />} />
    //     {/* <Route path="/signup" element={<SignUpPage />} />
    //     <Route path="/login" element={<Login />} /> */}
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        <Route path="/" element={<LoginFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
