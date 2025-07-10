import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services";
import type { Task } from "../types/types";
import { useNavigate } from "react-router";
import SearchTasks from "../components/SearchTasks";

export default function OurTasksPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<{
    status?: string;
    priority?: string;
  }>({
    status: "",
    priority: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleOnEdit = (taskId: number) => {
    navigate(`/update-task/${taskId}`);
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
    }
  };

  const handleOnSearch = (filters: { status?: string; priority?: string }) => {
    setFilters(filters);
  };

  const filteredTasks = tasks.filter((task: Task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Tasks</h2>

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
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task: Task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{task.id}</td>
                  <td className="px-4 py-2 border">{task.title}</td>
                  <td className="px-4 py-2 border">{task.description}</td>
                  <td className="px-4 py-2 border capitalize">{task.status}</td>
                  <td className="px-4 py-2 border capitalize">
                    {task.priority}
                  </td>
                  <td className="px-4 py-2 border">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {task.assignee_id || "-"}
                  </td>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
