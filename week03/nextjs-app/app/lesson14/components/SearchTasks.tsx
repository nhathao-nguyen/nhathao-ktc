"use client";

import { useState } from "react";

interface SearchTasksProps {
  onSearch: (filters: { status?: string; priority?: string }) => void;
}

export default function SearchTasks({ onSearch }: SearchTasksProps) {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ status, priority });
  };

  const handleReset = () => {
    setStatus("");
    setPriority("");
    onSearch({ status: "", priority: "" });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-medium mb-4">Filter Tasks</h3>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label
            htmlFor="status"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="priority"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
