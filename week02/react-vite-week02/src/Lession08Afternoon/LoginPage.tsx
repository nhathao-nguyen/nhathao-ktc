import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type FormData = {
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [loginInfo, setLoginInfo] = useState<FormData | null>(null);

  const watchedPassword = watch("password");

  const query = new URLSearchParams(useLocation().search);
  const emailFromQuery = query.get("email");
  const nameFromQuery = emailFromQuery?.split("@")[0] || "User";

  const onSubmit = (data: FormData) => {
    console.log("Login submitted:", data);
    setLoginInfo(data);
  };

  useEffect(() => {
    console.log("Password changed:", watchedPassword);
  }, [watchedPassword]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/bg-home.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="relative z-10 bg-black backdrop-blur-xs bg-opacity-50 p-8 rounded-lg w-96 text-white">
        <h1 className="text-2xl font-bold mb-4">Log in</h1>

        <div className="flex items-center gap-4 mb-4">
          <img
            src="/images/avatar.png"
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{nameFromQuery}</p>
            <p className="text-sm text-gray-300">{emailFromQuery}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-red-400 text-xs mb-3">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded text-white font-semibold"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
