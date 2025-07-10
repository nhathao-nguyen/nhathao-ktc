import { useForm } from "react-hook-form";

interface IFormInput {
  status: string;
  priority: string;
}

type Props = {
  onSearch?: (filters: IFormInput) => void;
};

export default function SearchTasks({ onSearch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      status: "",
      priority: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: IFormInput) => {
    if (onSearch) {
      onSearch(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-4 items-end"
    >
      {/* Status Filter */}
      <div className="flex flex-col">
        <label
          htmlFor="status"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <select
          {...register("status")}
          id="status"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {errors.status && (
          <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
        )}
      </div>

      {/* Priority Filter */}
      <div className="flex flex-col">
        <label
          htmlFor="priority"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Priority
        </label>
        <select
          {...register("priority")}
          id="priority"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <p className="text-sm text-red-500 mt-1">{errors.priority.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
