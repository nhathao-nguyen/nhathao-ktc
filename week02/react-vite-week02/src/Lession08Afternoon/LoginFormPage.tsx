import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = (data: FormData) => {
    if (data.remember) {
      console.log("Remembered user:", data.username);
    }
    alert("Đăng nhập thành công!");
  };

  const validateUsername = (v: string) => {
    if (!v) return "Username is required";
    if (v.length < 5) return "Min 5 characters";
    const isEmail = /^\S+@\S+\.\S+$/.test(v);
    const isPhone = /^[0-9]{10,15}$/.test(v);
    if (!isEmail && !isPhone) return "Must be a valid email or phone number";
    return true;
  };

  return (
    <div className="min-h-screen flex bg-[#f4f7fa]">
      {/* Left: Image & Slogan */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#eaf0f6] relative">
        <div className="absolute top-10 left-10">
          <img src="/images/grovia.png" alt="Grovia" className="w-32 h-auto" />
        </div>
        <div className="flex flex-col items-center w-full">
          <h1 className="text-4xl font-bold text-[#1a2341] mb-6 max-w-lg text-left leading-tight">
            Set Your Partner<br />Recruitment on Auto-Pilot
          </h1>
          <div className="flex flex-row gap-4 mt-8">
            <img src="/images/grovia.png" alt="Main" className="w-64 h-64 rounded-full object-cover shadow-xl" />
          </div>
        </div>
      </div>
      {/* Right: Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-none"
        >
          <div className="flex flex-col items-center mb-8">
            <img src="/images/grovia.png" alt="Grovia Logo" className="w-16 h-16 mb-2" />
            <h2 className="text-2xl font-bold text-[#c23c1a] mb-2">Login</h2>
            <p className="text-[#1a2341] text-base font-semibold mb-1">Login to your account</p>
            <p className="text-gray-500 text-sm text-center max-w-xs">
              Thank you for get back to Grovia, lets access our the best recommendation contact for you.
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#1a2341] text-sm">Username</label>
            <input
              {...register("username", { validate: validateUsername })}
              placeholder="Email or Phone Number"
              className="w-full px-4 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:ring-2 focus:ring-[#c23c1a] bg-[#f8fafc]"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#1a2341] text-sm">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 characters" },
                validate: v =>
                  /[a-zA-Z]/.test(v) && !/\s/.test(v) || "Password must have at least 1 letter, no spaces",
              })}
              placeholder="Password"
              className="w-full px-4 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:ring-2 focus:ring-[#c23c1a] bg-[#f8fafc]"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-[#1a2341]">
              <input
                type="checkbox"
                {...register("remember")}
                className="mr-2 accent-[#c23c1a]"
              />
              Remember me
            </label>
            <a href="#" className="text-[#c23c1a] hover:underline text-sm font-medium">
              Reset Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 px-4 rounded text-white font-bold text-base tracking-wide mb-4 transition-colors duration-200
              ${!isValid ? "bg-gray-300 cursor-not-allowed" : "bg-[#c23c1a] hover:bg-[#a12e0e]"}`}
          >
            SIGN IN
          </button>
          <div className="text-center mt-2 text-sm">
            <span className="text-[#1a2341]">Don't have an account yet? </span>
            <a href="/register" className="text-[#c23c1a] hover:underline font-medium">
              Join Grovia Now!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
} 