import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  terms: boolean;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const terms = watch("terms");

  const onSubmit = (data: FormData) => {
    alert("Đăng ký thành công!");
  };

  return (
    <div className="flex min-h-screen m-3 ">
      <div className="bg-sky-400 w-1/3 items-center justify-center text-white text-2xl font-bold hidden md:block">
        Background
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 max-w-xl mx-auto p-8 bg-white rounded shadow-md space-y-4 "
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <p>First Name</p>
            <input
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "Min 2 characters" },
              })}
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <p>Last Name</p>
            <input
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 2, message: "Min 2 characters" },
              })}
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <p>Phone Number</p>
            <input
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Phone must be 10-15 digits",
                },
              })}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <p>Email</p>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email",
                },
              })}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <p>Password</p>
            <div className="flex items-center border rounded px-3 focus-within:ring-2 focus-within:ring-sky-400">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
                  validate: (v) =>
                    (/[A-Z]/.test(v) &&
                      /[a-z]/.test(v) &&
                      /[0-9]/.test(v) &&
                      !/\s/.test(v)) ||
                    "Password must have upper, lower, number, no spaces",
                })}
                placeholder="Password"
                className="w-full py-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="ml-2 text-sm text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="relative">
            <p className="mb-1">Confirm Password</p>
            <div className="flex items-center border rounded px-3 focus-within:ring-2 focus-within:ring-sky-400">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (v) => v === password || "Passwords must match",
                })}
                placeholder="Confirm Password"
                className="w-full py-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="ml-2 text-sm text-blue-500"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("newsletter")}
            className="w-4 h-4"
          />
          <label className="text-sm">
            Yes, I want to receive Lottery Display emails.
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("terms", { required: "You must agree to continue" })}
            className="w-4 h-4"
          />
          <label className="text-sm">
            I agree to all the Terms, Privacy Policy, and Fees.
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}

        <button
          type="submit"
          disabled={!isValid || !terms}
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            !isValid || !terms
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600"
          }`}
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
