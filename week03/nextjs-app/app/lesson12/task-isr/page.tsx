
export const revalidate = 60;

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

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
    <div className="overflow-x-auto bg-white rounded-md shadow-lg p-4">
      <h1 className="text-2xl font-bold mb-4">ISR Task List (Every 60s)</h1>
      <table className="min-w-full table-auto border-separate border-spacing-0 rounded-lg bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-lg">
            <th className="px-6 py-3 text-left font-bold border-b border-gray-200 rounded-tl-lg">ID</th>
            <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Title</th>
            <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Description</th>
            <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Status</th>
            <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Priority</th>
            <th className="px-6 py-3 text-left font-bold border-b border-gray-200">Due Date</th>
            <th className="px-6 py-3 text-left font-bold border-b border-gray-200 rounded-tr-lg">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, idx) => (
              <tr key={task.id} className={`transition-colors duration-200 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
                <td className="px-6 py-3 border-b border-gray-200">{task.id}</td>
                <td className="px-6 py-3 border-b border-gray-200">{task.title}</td>
                <td className="px-6 py-3 border-b border-gray-200">{task.description}</td>
                <td className="px-6 py-3 border-b border-gray-200 capitalize">{task.status}</td>
                <td className="px-6 py-3 border-b border-gray-200 capitalize">{task.priority}</td>
                <td className="px-6 py-3 border-b border-gray-200">{task.due_date ? new Date(task.due_date).toLocaleDateString() : "-"}</td>
                <td className="px-6 py-3 border-b border-gray-200">{task.assignee_id || "-"}</td>
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
