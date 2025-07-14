import { useForm } from "react-hook-form";
import { useUserContext } from "../context/UserProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { SubmitHandler } from "react-hook-form";

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),
  email: yup.string().required("Email is required").email("Invalid email"),
  age: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    )
    .nullable()
    .positive("Age must be positive")
    .optional(),
});

type FormData = yup.InferType<typeof schema>;

const UserForm = () => {
  const { addUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: "",
      email: "",
      age: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    addUser({
      name: data.name,
      email: data.email,
      age: data.age ?? undefined,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit as any)}
      className="space-y-6 flex flex-col justify-center items-center w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow"
    >
      <div className="w-full">
        <label className="block text-gray-700 font-semibold mb-1">Name:</label>
        <input
          {...register("name")}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="w-full">
        <label className="block text-gray-700 font-semibold mb-1">Email:</label>
        <input
          {...register("email")}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full">
        <label className="block text-gray-700 font-semibold mb-1">Age:</label>
        <input
          {...register("age")}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.age && (
          <>
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            {console.log("Age error:", errors.age.message)}
          </>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition uppercase"
      >
        submit
      </button>
    </form>
  );
};

export default UserForm;
