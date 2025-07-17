"use client";

import { useRouter } from "next/navigation";
import { useAuthGuard } from "../hook/useAuthGuard";
import { useAuthStore } from "../stores/useAuthStore";
import { createTask } from "../services";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

// Form input type for task creation
interface IFormInput {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: "to_do" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee_id?: number;
}

// Yup validation schema for task creation
const schema: yup.ObjectSchema<IFormInput> = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  start_date: yup
    .string()
    .required("Start date is required")
    .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "Please enter a valid date"),
  due_date: yup
    .string()
    .optional()
    .matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "Please enter a valid date")
    .test(
      "due_date-after-start_date",
      "Due date must be after start date",
      function (value) {
        if (!value) return true;
        const { start_date } = this.parent;
        return new Date(value) >= new Date(start_date);
      }
    ),
  description: yup
    .string()
    .optional()
    .max(500, "Description must be less than 500 characters"),
  status: yup
    .mixed<"to_do" | "in_progress" | "done">()
    .required("Status is required")
    .oneOf(["to_do", "in_progress", "done"], "Please select a valid status"),
  priority: yup
    .mixed<"low" | "medium" | "high">()
    .required("Priority is required")
    .oneOf(["low", "medium", "high"], "Please select a valid priority"),
  assignee_id: yup
    .number()
    .min(1, "Assignee ID must be a positive number")
    .typeError("Assignee ID must be a number")
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .optional(),
});

export default function CreateTaskPage() {
  // Auth guard: only admin can access
  const router = useRouter();
  const {
    hydrated,
    isAuthenticated,
    isAdmin,
    user,
    isLoading: authLoading,
  } = useAuthGuard({
    requireAuth: true,
    requiredRole: "admin",
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Setup react-hook-form with yup validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      start_date: "",
      due_date: "",
      description: "",
      status: "to_do",
      priority: "medium",
      assignee_id: undefined,
    },
    mode: "onChange",
  });

  // Show loading or block UI if not authorized
  if (!hydrated || authLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Checking permissions...</div>
      </div>
    );
  }

  // Handle form submit
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitError(null);
    try {
      // Only send assignee_id if valid, always send string for description/due_date
      const payload = {
        ...data,
        description: data.description ?? "",
        due_date: data.due_date ?? "",
        assignee_id: data.assignee_id && data.assignee_id >= 1 ? data.assignee_id : undefined,
      };
      await createTask(payload);
      reset();
      router.push("/lesson14/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSubmitError(error?.message || "Failed to create task. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const { logout } = useAuthStore.getState();
    logout();
    router.push("/lesson14/login");
  };

  // UI rendering
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push("/lesson14/dashboard")}
                className="text-blue-600 hover:text-blue-800 mr-4"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Create New Task
              </h1>
              <span className="ml-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                ADMIN
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}</span>
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
      <main className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h2>
          {/* Show error if submit failed */}
          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{submitError}</p>
            </div>
          )}
          {/* Task creation form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                {...register("title")}
                type="text"
                id="title"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter task title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                {...register("description")}
                id="description"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter task description"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>
            {/* Start Date */}
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                {...register("start_date")}
                type="date"
                id="start_date"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.start_date ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>}
            </div>
            {/* Due Date */}
            <div>
              <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                {...register("due_date")}
                type="date"
                id="due_date"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.due_date ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.due_date && <p className="mt-1 text-sm text-red-600">{errors.due_date.message}</p>}
            </div>
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                {...register("status")}
                id="status"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.status ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="to_do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
            </div>
            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
              <select
                {...register("priority")}
                id="priority"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.priority ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>}
            </div>
            {/* Assignee ID */}
            <div>
              <label htmlFor="assignee_id" className="block text-sm font-medium text-gray-700 mb-2">Assignee ID</label>
              <input
                {...register("assignee_id")}
                type="number"
                id="assignee_id"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.assignee_id ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter assignee ID (optional)"
                min={1}
              />
              {errors.assignee_id && <p className="mt-1 text-sm text-red-600">{errors.assignee_id.message}</p>}
            </div>
            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/lesson14/dashboard")}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                // Disable while submitting
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
