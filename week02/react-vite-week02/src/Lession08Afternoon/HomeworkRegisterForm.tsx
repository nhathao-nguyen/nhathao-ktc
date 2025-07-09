import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePic: FileList;
  bio: string;
}

const COUNTRIES = ["Vietnam", "United States", "Japan", "France", "Other"];
const HOBBIES = ["Reading", "Traveling", "Gaming"];

export default function HomeworkRegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    clearErrors,
    setValue,
  } = useForm<FormData>({ mode: "onChange" });

  const [preview, setPreview] = useState<string | null>(null);
  const [bioCount, setBioCount] = useState(0);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const dob = watch("dob");
  const bio = watch("bio") || "";
  const profilePic = watch("profilePic");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const valid = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
      if (!valid) {
        setError("profilePic", { type: "manual", message: "File must be .jpg, .jpeg, or .png" });
        setPreview(null);
        return;
      }
      clearErrors("profilePic");
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const validateAge = (value: string) => {
    if (!value) return "Date of birth is required";
    const dobDate = new Date(value);
    const now = new Date();
    const age = now.getFullYear() - dobDate.getFullYear();
    const m = now.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < dobDate.getDate())) {
      return age - 1 >= 18 || "You must be at least 18 years old";
    }
    return age >= 18 || "You must be at least 18 years old";
  };

  // Validate file upload
  const validateFile = (files: FileList) => {
    if (!files || files.length === 0) return "Profile picture is required";
    const file = files[0];
    const valid = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
    if (!valid) return "File must be .jpg, .jpeg, or .png";
    return true;
  };

  // Validate hobbies
  const validateHobbies = (arr: string[]) => {
    if (!arr || arr.length === 0) return "Select at least one hobby";
    return true;
  };

  // Validate password
  const validatePassword = (v: string) => {
    if (!v) return "Password is required";
    if (v.length < 8) return "At least 8 characters";
    if (!/[a-zA-Z]/.test(v) || !/[0-9]/.test(v)) return "Must contain letters and numbers";
    return true;
  };

  // Validate confirm password
  const validateConfirm = (v: string) => {
    if (!v) return "Confirm password is required";
    if (v !== password) return "Must match the password";
    return true;
  };

  // Validate phone
  const validatePhone = (v: string) => {
    if (!v) return "Phone number is required";
    if (!/^\d{10,}$/.test(v)) return "Must be at least 10 digits";
    return true;
  };

  // Validate full name
  const validateFullName = (v: string) => {
    if (!v) return "Full Name is required";
    if (v.trim().length < 3) return "Full Name must be at least 3 characters.";
    return true;
  };

  // Validate email
  const validateEmail = (v: string) => {
    if (!v) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(v)) return "Invalid email format";
    return true;
  };

  // Validate country
  const validateCountry = (v: string) => {
    if (!v) return "Country is required";
    return true;
  };

  // Validate gender
  const validateGender = (v: string) => {
    if (!v) return "Gender is required";
    return true;
  };

  // Validate bio
  const validateBio = (v: string) => {
    if (v && v.length > 300) return "Max 300 characters";
    return true;
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBioCount(e.target.value.length);
    setValue("bio", e.target.value);
  };

  const onSubmit = (data: FormData) => {
    alert("Đăng ký thành công!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-5"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">User Registration</h2>
        {/* Full Name */}
        <div>
          <label className="block font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("fullName", { validate: validateFullName })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Full Name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        {/* Email */}
        <div>
          <label className="block font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email", { validate: validateEmail })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        {/* Password */}
        <div>
          <label className="block font-medium mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("password", { validate: validatePassword })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        {/* Confirm Password */}
        <div>
          <label className="block font-medium mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            {...register("confirmPassword", { validate: validateConfirm })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>
        {/* Phone Number */}
        <div>
          <label className="block font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone", { validate: validatePhone })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Phone Number"
            type="tel"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 mt-1">
            <label className="flex items-center">
              <input type="radio" value="Male" {...register("gender", { validate: validateGender })} className="mr-2" /> Male
            </label>
            <label className="flex items-center">
              <input type="radio" value="Female" {...register("gender", { validate: validateGender })} className="mr-2" /> Female
            </label>
            <label className="flex items-center">
              <input type="radio" value="Other" {...register("gender", { validate: validateGender })} className="mr-2" /> Other
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>
        {/* Date of Birth */}
        <div>
          <label className="block font-medium mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            {...register("dob", { validate: validateAge })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
        </div>
        {/* Country */}
        <div>
          <label className="block font-medium mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            {...register("country", { validate: validateCountry })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
        </div>
        {/* Hobbies */}
        <div>
          <label className="block font-medium mb-1">
            Hobbies <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 mt-1">
            {HOBBIES.map((hobby) => (
              <label key={hobby} className="flex items-center">
                <input
                  type="checkbox"
                  value={hobby}
                  {...register("hobbies", { validate: validateHobbies })}
                  className="mr-2"
                />
                {hobby}
              </label>
            ))}
          </div>
          {errors.hobbies && <p className="text-red-500 text-sm mt-1">{errors.hobbies.message}</p>}
        </div>
        {/* Profile Picture */}
        <div>
          <label className="block font-medium mb-1">
            Profile Picture <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            {...register("profilePic", { validate: validateFile })}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            onChange={handleFileChange}
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-full border" />
          )}
          {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic.message}</p>}
        </div>
        {/* Bio */}
        <div>
          <label className="block font-medium mb-1">Bio <span className="text-xs text-gray-400">(optional, max 300 chars)</span></label>
          <textarea
            {...register("bio", { validate: validateBio })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tell us about yourself..."
            rows={3}
            maxLength={300}
            onChange={handleBioChange}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">{bio.length}/300</span>
            {errors.bio && <span className="text-red-500 text-sm">{errors.bio.message}</span>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 rounded text-white font-bold text-base tracking-wide mt-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          disabled={!isValid}
        >
          Register
        </button>
      </form>
    </div>
  );
} 