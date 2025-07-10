import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import LoginPage from "../pages/LoginPage";
import OurTasksPage from "../pages/OurTasksPage";
import MyTasksPage from "../pages/MyTasksPage";
import CreateTaskPage from "../pages/CreateTaskPage";
import UpdateTaskPage from "../pages/UpdateTaskPage";
import AccessDeniedPage from "../pages/AccessDeniedPage";
import AuthContext from "../contexts/contexts";
import type { User } from "../types/types";

export default function TasksManagementGuidelines() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Tasks Management Guidelines
        </h1>
        {user && (
          <p className="text-right mb-2 text-sm text-gray-600">
            👋 Hi, <span className="font-semibold">{user.email}</span>
          </p>
        )}

        <BrowserRouter>
          {user && (
            <nav className="flex flex-wrap items-center gap-4 mb-6 border-b pb-4">
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `px-3 py-1 rounded hover:text-white hover:bg-blue-600 transition ${
                    isActive ? "bg-blue-600 text-white" : "text-blue-600"
                  }`
                }
              >
                Tasks
              </NavLink>
              <NavLink
                to="/assignee-me"
                className={({ isActive }) =>
                  `px-3 py-1 rounded hover:text-white hover:bg-blue-600 transition ${
                    isActive ? "bg-blue-600 text-white" : "text-blue-600"
                  }`
                }
              >
                My Tasks
              </NavLink>
              <NavLink
                to="/create-task"
                className={({ isActive }) =>
                  `px-3 py-1 rounded hover:text-white hover:bg-blue-600 transition ${
                    isActive ? "bg-blue-600 text-white" : "text-blue-600"
                  }`
                }
              >
                Create Task
              </NavLink>

              {user && (
                <button
                  onClick={handleLogout}
                  className="ml-auto px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              )}
            </nav>
          )}
          <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            {user && <Route path="/tasks" element={<OurTasksPage />} />}
            {user && <Route path="/assignee-me" element={<MyTasksPage />} />}
            {user && <Route path="/create-task" element={<CreateTaskPage />} />}
            {user && (
              <Route path="/update-task/:id" element={<UpdateTaskPage />} />
            )}
            <Route path="/*" element={<AccessDeniedPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}
