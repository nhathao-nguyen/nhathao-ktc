import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const emailFromQuery = query.get("email") || "";

  useEffect(() => {
    if (emailFromQuery) setValue("email", emailFromQuery);
  }, [emailFromQuery, setValue]);

  const loginApi = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!email || password.length < 8) throw new Error("Invalid credentials");
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    loginApi(data.email, data.password);
  };

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  // Lấy tên từ email (mock)
  const nameFromQuery = watchedEmail?.split("@")?.[0] || "User";

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/bg-home.png')" }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 bg-white bg-opacity-80 rounded-full px-3 py-1 text-black shadow hover:bg-opacity-100"
      >
        ← Back
      </button>
      <div className="absolute inset-0 bg-black opacity-60" />
      <div className="relative z-10 bg-black backdrop-blur-xs bg-opacity-50 p-8 rounded-lg w-96 text-white">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/images/avatar.png"
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{nameFromQuery}</p>
            <p className="text-sm text-gray-300">{watchedEmail}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            })}
            className="w-full p-3 mb-2 rounded bg-white text-black"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mb-2">{errors.email.message}</p>
          )}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full p-3 rounded bg-white text-black pr-16"
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-gray-200 text-black px-2 py-1 rounded"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mb-2">
              {errors.password.message}
            </p>
          )}
          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-blue-300 underline text-xs">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded text-white font-semibold"
            disabled={loading || !isValid}
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </form>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        {success && (
          <p className="text-green-400 text-xs mt-2">
            Login successful! Redirecting...
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
