import React, { useState } from "react";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    dob: "",
    country: "",
    hobbies: [] as string[],
    profilePic: null as File | null,
    bio: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters.";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email must be a valid email format.";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and contain letters and numbers.";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!/^\d{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be at least 10 digits.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender.";
    }

    if (!formData.dob) {
      newErrors.dob = "Please enter your date of birth.";
    } else {
      const dobDate = new Date(formData.dob);
      const age = new Date().getFullYear() - dobDate.getFullYear();
      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old.";
      }
    }

    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    if (formData.hobbies.length === 0) {
      newErrors.hobbies = "Please select at least one hobby.";
    }

    if (formData.profilePic) {
      const fileName = formData.profilePic.name.toLowerCase();
      if (!/\.(jpg|jpeg|png)$/.test(fileName)) {
        newErrors.profilePic = "Profile picture must be a .jpg, .jpeg or .png file.";
      }
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { id, value, type, name } = target;

    if (type === "checkbox" && name === "hobbies") {
      const checkbox = target as HTMLInputElement;
      const updated = checkbox.checked
        ? [...formData.hobbies, checkbox.value]
        : formData.hobbies.filter((h) => h !== checkbox.value);
      setFormData((prev) => ({ ...prev, hobbies: updated }));
    } else if (type === "file") {
      const fileInput = target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setFormData((prev) => ({ ...prev, profilePic: file }));
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }

    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">User Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <FormField
          label="Full Name"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        {/* Email */}
        <FormField
          label="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          error={errors.email}
        />

        {/* Password */}
        <FormField
          label="Password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* Confirm Password */}
        <FormField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {/* Phone */}
        <FormField
          label="Phone Number"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          error={errors.phone}
        />

        {/* Gender */}
        <div>
          <label className="block">Gender</label>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />{" "}
                {g}
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        {/* Date of Birth */}
        <FormField
          label="Date of Birth"
          id="dob"
          value={formData.dob}
          onChange={handleChange}
          type="date"
          error={errors.dob}
        />

        {/* Country */}
        <div>
          <label>Country</label>
          <select
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="input"
          >
            <option value="">-- Select Country --</option>
            <option>Vietnam</option>
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
          </select>
          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
        </div>

        {/* Hobbies */}
        <div>
          <label>Hobbies</label>
          <div className="flex gap-4 flex-wrap">
            {["Reading", "Traveling", "Gaming"].map((hobby) => (
              <label key={hobby}>
                <input
                  type="checkbox"
                  name="hobbies"
                  value={hobby}
                  checked={formData.hobbies.includes(hobby)}
                  onChange={handleChange}
                />{" "}
                {hobby}
              </label>
            ))}
          </div>
          {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies}</p>}
        </div>

        {/* Profile Picture */}
        <div>
          <label>Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            className="input"
          />
          {errors.profilePic && (
            <p className="text-red-500 text-sm">{errors.profilePic}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label>Bio / About You</label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            maxLength={300}
            className="input"
            placeholder="Tell us something about yourself..."
          />
          <div className="text-right text-sm text-gray-500">
            {300 - formData.bio.length} characters left
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

// 🔧 Reusable input component
type FieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  type?: string;
  error?: string;
};


const FormField = ({ label, id, value, onChange, type = "text", error }: FieldProps) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="input"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);
