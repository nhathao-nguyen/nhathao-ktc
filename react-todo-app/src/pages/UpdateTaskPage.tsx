import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { getTaskById, updateTask } from "../services";
import { useNavigate, useParams } from "react-router";

interface IFormInput {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: "to_do" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  assignee_id?: string;
}

// Yup validation schema
const schema: yup.ObjectSchema<IFormInput> = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  start_date: yup
    .string()
    .required("Start date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),
  due_date: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date")
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
    .test("assignee_id", "Assignee ID cannot be empty if provided", (value) => {
      if (!value) return true;
      return !isNaN(Number(value)) && Number(value) >= 1;
    }),
});

export default function UpdateTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  // react form hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      start_date: "",
      due_date: "",
      description: "",
      status: "to_do",
      priority: "medium",
      assignee_id: "",
    },
    mode: "onChange",
  });
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Assuming getTask is a function that fetches a task by ID
        const task = await getTaskById(id ? parseInt(id) : 0);

        // Set default values for the form
        reset({
          title: task.title,
          start_date: task.start_date ? task.start_date.split("T")[0] : "", // Format date to YYYY-MM-DD
          due_date: task.due_date ? task.due_date.split("T")[0] : "", // Format date to YYYY-MM-DD

          description: task.description,
          status: task.status,
          priority: task.priority,
          assignee_id: task.assignee_id ? task.assignee_id.toString() : "", // Convert to string if needed
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    try {
      await updateTask(id ? parseInt(id) : 0, data);
      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-left pl-2 font-medium text-gray-700"
          >
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Enter task title"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-left pl-2 mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-left pl-2 font-medium text-gray-700"
          >
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            id="description"
            placeholder="Enter task description"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-left pl-2 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label
            htmlFor="start_date"
            className="block text-left pl-2 font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            {...register("start_date")}
            type="date"
            id="start_date"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.start_date && (
            <p className="text-red-500 text-left pl-2 mt-1">
              {errors.start_date.message}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="due_date"
            className="block text-left pl-2 font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            {...register("due_date")}
            type="date"
            id="due_date"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.due_date && (
            <p className="text-red-500 text-left pl-2 mt-1">
              {errors.due_date.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-left pl-2 font-medium text-gray-700"
          >
            Status
          </label>
          <select
            {...register("status")}
            id="status"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-left pl-2 mt-1">
              {errors.status.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="priority"
            className="block text-left pl-2 font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            {...register("priority")}
            id="priority"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-left pl-2 mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* Assignee ID */}
        <div>
          <label
            htmlFor="assignee_id"
            className="block text-left pl-2 font-medium text-gray-700"
          >
            Assignee ID
          </label>
          <input
            {...register("assignee_id")}
            type="text"
            id="assignee_id"
            placeholder="Enter assignee ID"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.assignee_id && (
            <p className="text-red-500 text-left pl-2 mt-1">
              {errors.assignee_id.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
