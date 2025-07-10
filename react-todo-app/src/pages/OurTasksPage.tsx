import { useEffect, useState } from "react";
import { getTasks } from "../services";
import type { Task } from "../types/types";
import { useNavigate } from "react-router";
import SearchTasks from "../components/SearchTasks";

export default function OurTasksPage() {
  // const { user } = useContext(AuthContext);
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
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleOnEdit = (taskId: number) => {
    navigate(`/update-task/${taskId}`);
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
                    <button
                      onClick={() => {
                        if (typeof task.id === "number") {
                          handleOnEdit(task.id);
                        } else {
                          console.warn("task.id is not a number:", task.id);
                        }
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
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
