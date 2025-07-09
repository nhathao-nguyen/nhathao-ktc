import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DepartmentsPage from "./Lession7page/DepartmentsPage";
import DoctorsPage from "./Lession7page/DoctorsPage";
import HistoryPage from "./Lession7page/HistoryPage";
import MapPage from "./Lession7page/MapPage";
import OverviewPage from "./Lession7page/OverviewPage";
import PatientsPage from "./Lession7page/PatientsPage";
import SettingsPage from "./Lession7page/SettingsPage";
import Sidebar from "./Lession7Homework/Sidebar";
import Topbar from "./Lession7Homework/Topbar";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="flex-1 p-6 overflow-y-auto bg-white">
            <Routes>
              <Route path="/" element={<PatientsPage />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/doctors" element={<DoctorsPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
