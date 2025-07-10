import React, { useContext, useEffect } from "react";
import AuthContext from "../contexts/contexts";
import { getTasksByAssignee, deleteTask } from "../services";
import type { Task } from "../types/types";
import { useNavigate } from "react-router";

export default function MyTasksPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("MyTasksPage user", user);

  const [tasks, setTasks] = React.useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      try {
        const tasks = await getTasksByAssignee(user.id);
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  console.log("OurTasksPage user", user);

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

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: Task) => (
            <tr key={task.id} className="hover:bg-gray-100 transition-colors">
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.assignee_id}</td>
              <td className="flex items-center gap-2 p-1">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
