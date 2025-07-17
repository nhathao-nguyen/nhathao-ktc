"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
import SearchTasks from "../components/SearchTasks";
import { Task } from "../types/type";
import { useAuthGuard } from "../hook/useAuthGuard";
import { getTasks, deleteTask } from "../services/index";

export default function DashboardPage() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{
    status?: string;
    priority?: string;
  }>({
    status: "",
    priority: "",
  });

  // Use auth guard to protect this page
  const {
    hydrated,
    isAuthenticated,
    user,
    isAdmin,
    isLoading: authLoading,
  } = useAuthGuard({
    requireAuth: true,
  });

  useAuthStore();

  useEffect(() => {
    if (hydrated && isAuthenticated && !authLoading) {
      setLoading(true);
      const fetchTasks = async () => {
        try {
          const tasks = await getTasks();
          setTasks(tasks);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    }
  }, [hydrated, isAuthenticated, authLoading]);

  const handleOnEdit = (taskId: number) => {
    router.push(`/lesson14/update-task/${taskId}`);
  };

  const handleDelete = async (taskId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const handleOnSearch = (filters: { status?: string; priority?: string }) => {
    setFilters(filters);
  };

  const handleLogout = async () => {
    try {
      const { logout } = useAuthStore.getState();
      logout();
      router.push("/lesson14/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredTasks = tasks.filter((task: Task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  // Show loading while auth is being checked
  if (!hydrated || authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated (auth guard will handle redirect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Redirecting to login...</div>
      </div>
    );
  }

  // Only render after client mounted
  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Task Dashboard
              </h1>
              {user && typeof user.role === "string" && (
                <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {user.role.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome,{" "}
                <span className="text-green-600 font-bold">{user?.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Tasks</h2>
          {/* ADMIN ONLY: Create button */}
          {isAdmin && (
            <button
              onClick={() => router.push("/lesson14/create-task")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Create New Task
            </button>
          )}
        </div>

        <div className="mb-4">
          <SearchTasks onSearch={handleOnSearch} />
        </div>

        <div className="overflow-x-auto bg-white rounded-md shadow">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Priority</th>
                <th className="px-4 py-2 border">Due Date</th>
                <th className="px-4 py-2 border">Assignee</th>
                {/* ADMIN ONLY: Actions column */}
                {isAdmin && <th className="px-4 py-2 border">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task: Task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border">{task.id}</td>
                    <td className="px-4 py-2 border font-medium">
                      {task.title}
                    </td>
                    <td className="px-4 py-2 border">{task.description}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          task.status === "done"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "medium"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2 border">
                      {task.assignee_id || "-"}
                    </td>
                    {/* ADMIN ONLY: Edit/Delete buttons */}
                    {isAdmin && (
                      <td className="px-4 py-2 border">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (typeof task.id === "number") {
                                handleOnEdit(task.id);
                              } else {
                                console.warn("Invalid task.id:", task.id);
                              }
                            }}
                            className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (typeof task.id === "number") {
                                handleDelete(task.id);
                              } else {
                                console.warn("Invalid task.id:", task.id);
                              }
                            }}
                            className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={isAdmin ? 8 : 7}
                    className="text-center py-8 text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-12 h-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <p className="text-lg font-medium">No tasks found</p>
                      {isAdmin && (
                        <p className="text-sm">
                          Get started by creating your first task
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isAdmin && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> You have read-only access. Only
              administrators can create, edit, or delete tasks.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
