import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeworkRegisterForm from "./Lession08Afternoon/HomeworkRegisterForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeworkRegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
