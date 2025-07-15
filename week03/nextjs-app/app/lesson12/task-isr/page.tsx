
export const revalidate = 60;

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTY0NTg1LCJleHAiOjE3ODQxMjIxODV9.kSdqppyKSWKyE3Vgmd31YJNZjbMeAbFICRG5EBeCw_w";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date?: string;
  assignee_id?: string | number;
};

async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("https://server.aptech.io/workspaces/tasks", {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    next: {
      revalidate,
    },
  });

  const data = await res.json();
  return Array.isArray(data) ? data : data.tasks || [];
}

export default async function TaskISR() {
  const tasks = await fetchTasks();

  return (
    <div className="overflow-x-auto bg-white rounded-md shadow p-4">
      <h1 className="text-2xl font-bold mb-4">ISR Task List (Every 60s)</h1>
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
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">{task.id}</td>
                <td className="px-4 py-2 border">{task.title}</td>
                <td className="px-4 py-2 border">{task.description}</td>
                <td className="px-4 py-2 border capitalize">{task.status}</td>
                <td className="px-4 py-2 border capitalize">{task.priority}</td>
                <td className="px-4 py-2 border">
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2 border">{task.assignee_id || "-"}</td>
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
  );
}
