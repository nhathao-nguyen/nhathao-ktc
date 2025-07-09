import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  agree: boolean;
}

const SignUpPage = () => {
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

  const registerApi = async (email: string, name: string, password: string) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (password.length < 8)
        throw new Error("Password must be at least 8 characters");
      setSuccess(true);
      setTimeout(() => {
        navigate(`/login?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    registerApi(data.email, data.name, data.password);
  };

  const watchedPassword = watch("password");
  const watchedAgree = watch("agree");
  const watchedEmail = watch("email");

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
      <div className="relative z-10 backdrop-blur-xs bg-opacity-50 p-8 rounded-lg w-96 text-white">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>
        <p className="text-sm mb-4">
          Looks like you don't have an account. Let's create a new account for
          <br />
          <strong>{watchedEmail || "your email"}</strong>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 mb-2 rounded bg-white text-black"
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mb-2">{errors.name.message}</p>
          )}

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
            disabled={loading || !!emailFromQuery}
            readOnly={!!emailFromQuery}
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

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agree"
              {...register("agree", { required: "You must agree to continue" })}
              className="mr-2"
              disabled={loading}
            />
            <label htmlFor="agree" className="text-xs">
              By selecting Agree and continue below, I agree to{" "}
              <a href="#" className="text-green-400 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-400 underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.agree && (
            <p className="text-red-400 text-xs mb-2">{errors.agree.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded text-white font-semibold"
            disabled={loading || !isValid || !watchedAgree}
          >
            {loading ? "Registering..." : "Agree and continue"}
          </button>
        </form>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        {success && (
          <p className="text-green-400 text-xs mt-2">
            Registration successful! Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
