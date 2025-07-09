import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });

  const watchedEmail = watch("email");

  const onSubmit = (data: any) => {
    const encodedEmail = encodeURIComponent(data.email);
    navigate(`/signup?email=${encodedEmail}`);
  };

  useEffect(() => {
    console.log("Email input changed:", watchedEmail);
  }, [watchedEmail]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-end justify-center relative"
      style={{
        backgroundImage: "url('/images/bg-home.png')",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20  bg-opacity-80 rounded-full px-3 py-1 text-white shadow hover:bg-opacity-100"
      >
        ← Back
      </button>
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative z-10 backdrop-blur-xs p-8 rounded-lg w-96 text-white">
        <h1 className="text-3xl font-bold mb-6">Hi!</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="w-full p-3 mb-2 rounded bg-white text-black"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mb-2">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 py-2 rounded text-white font-semibold mb-4"
          >
            Continue
          </button>
        </form>

        <div className="text-center text-gray-300 mb-2">or</div>

        <button className="w-full bg-blue-600 py-2 rounded text-white mb-2">
          Continue with Facebook
        </button>
        <button className="w-full bg-white py-2 rounded text-black mb-2">
          Continue with Google
        </button>
        <button className="w-full border border-white py-2 rounded text-white">
          Continue with Apple
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-400 underline">
            Sign up
          </a>
        </p>
        <p className="text-center text-sm mt-2">
          <a href="#" className="text-blue-300 underline">
            Forgot your password?
          </a>
        </p>

        {watchedEmail && (
          <div className="mt-4 text-xs bg-white text-black p-2 rounded">
            <p>
              <strong>Entered Email:</strong> {watchedEmail}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
