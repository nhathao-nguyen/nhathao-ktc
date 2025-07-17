import { Task } from "../types/type";
import { apiClient } from "../lib/axios";

// Helper: handle API errors and extract message
const handleApiError = (error: unknown) => {
  // Cast error to object to check properties
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as { response?: { data?: { message?: unknown } } }).response?.data?.message
  ) {
    // Use unknown for msg, cast only when needed
    const msg = (error as { response: { data: { message: unknown } } }).response.data.message;
    if (Array.isArray(msg)) {
      return (msg as string[]).join(", ");
    }
    return msg as string;
  }
  return (error as Error).message || "Unknown error";
};

// Login API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const login = async (username: string, password: string): Promise<any> => {
  try {
    const res = await apiClient.post("/auth/login", { username, password });
    return res.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const res = await apiClient.get("/workspaces/tasks");
    return res.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

// Get a single task by ID
export const getTask = async (id: number): Promise<Task> => {
  try {
    const res = await apiClient.get(`/workspaces/tasks/${id}`);
    return res.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

// Create a new task
export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  try {
    const res = await apiClient.post("/workspaces/tasks", task);
    return res.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

// Update an existing task
export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  try {
    const res = await apiClient.patch(`/workspaces/tasks/${id}`, task);
    return res.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

// Delete a task by ID
export const deleteTask = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/workspaces/tasks/${id}`);
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};