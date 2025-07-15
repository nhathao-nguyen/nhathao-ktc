"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date?: string;
  assignee_id?: string | number;
};

export default function TaskCSR() {
  const { data, error, isLoading, mutate } = useSWR(
    "https://server.aptech.io/workspaces/tasks",
    fetcher
  );

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form, setForm] = useState<Partial<Task>>({});
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const tasks: Task[] = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : data.tasks || [];
  }, [data]);

  // Xử lý xoá task
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xoá task này?")) return;
    setDeleteId(id);
    try {
      await fetch(`https://server.aptech.io/workspaces/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });
      await mutate();
    } finally {
      setDeleteId(null);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setForm(task);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    setLoading(true);
    try {
      await fetch(
        `https://server.aptech.io/workspaces/tasks/${editingTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: JSON.stringify(form),
        }
      );
      setEditingTask(null);
      await mutate();
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đóng popup
  const closeModal = () => {
    setEditingTask(null);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-md shadow p-4">
      <h1 className="text-2xl font-bold mb-4">CSR Task List (Table)</h1>

      {isLoading ? (
        <p className="text-gray-500 italic">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500 font-semibold">Failed to load tasks.</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 italic">No tasks found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-0 rounded-lg shadow-lg bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-lg">
                <th className="px-6 py-3 text-left font-bold border-b border-gray-200 rounded-tl-lg">ID</th>
                <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Title</th>
                <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Description</th>
                <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Status</th>
                <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Priority</th>
                <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Due Date</th>
                <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Assignee</th>
                <th className="px-6 py-3 text-center font-bold border-b border-gray-200 rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr
                  key={task.id}
                  className={`transition-colors duration-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}
                >
                  <td className="px-6 py-3 border-b border-gray-200">{task.id}</td>
                  <td className="px-6 py-3 border-b border-gray-200">{task.title}</td>
                  <td className="px-6 py-3 border-b border-gray-200">{task.description}</td>
                  <td className="px-6 py-3 border-b border-gray-200 capitalize">{task.status}</td>
                  <td className="px-6 py-3 border-b border-gray-200 capitalize">{task.priority}</td>
                  <td className="px-6 py-3 border-b border-gray-200">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200">{task.assignee_id || "-"}</td>
                  <td className="px-6 py-3 border-b border-gray-200 text-center flex gap-2 justify-center">
                    <button
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow transition-transform duration-150 hover:scale-105"
                      onClick={() => handleEdit(task)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2 2l-6 6m2 2l-6 6" /></svg>
                      Edit
                    </button>
                    <button
                      className={`flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition-transform duration-150 hover:scale-105 ${deleteId === task.id ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => handleDelete(task.id)}
                      disabled={deleteId === task.id}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      {deleteId === task.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Edit */}
      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              Edit Task #{editingTask.id}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title || ""}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={form.description || ""}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Status</label>
                  <select
                    name="status"
                    value={form.status || ""}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-medium mb-1">Priority</label>
                  <select
                    name="priority"
                    value={form.priority || ""}
                    onChange={handleFormChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={form.due_date ? form.due_date.slice(0, 10) : ""}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Assignee</label>
                <input
                  type="text"
                  name="assignee_id"
                  value={form.assignee_id || ""}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
