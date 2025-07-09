import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type FormData = {
  name: string;
  password: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  // Lấy email từ query param
  const query = new URLSearchParams(useLocation().search);
  const emailFromQuery = query.get("email");

  const watchedName = watch("name");
  const watchedPassword = watch("password");

  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data);
    setSubmittedData(data);
  };

  useEffect(() => {
    console.log("Name:", watchedName);
    console.log("Password:", watchedPassword);
  }, [watchedName, watchedPassword]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/bg-home.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="relative z-10 backdrop-blur-xs bg-opacity-50 p-8 rounded-lg w-96 text-white">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>
        <p className="text-sm mb-4">
          Looks like you don’t have an account. Let’s create a new account for
          <br />
          <strong>{emailFromQuery || "your email"}</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 mb-2 rounded bg-white text-black"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mb-2">{errors.name.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-3 mb-2 rounded bg-white text-black"
          />
          {errors.password && (
            <p className="text-red-400 text-xs mb-2">
              {errors.password.message}
            </p>
          )}

          <p className="text-xs mb-4">
            By selecting Agree and continue below, I agree to{" "}
            <a href="#" className="text-green-400 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-400 underline">
              Privacy Policy
            </a>
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded text-white font-semibold"
          >
            Agree and continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
