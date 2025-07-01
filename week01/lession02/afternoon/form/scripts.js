document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const showError = (id, message) => {
      const input = document.getElementById(id);
      const error = document.getElementById(id + "Error");
      input?.classList.add("invalid");
      error.textContent = message;
      isValid = false;
    };

    const clearError = (id) => {
      const input = document.getElementById(id);
      const error = document.getElementById(id + "Error");
      input?.classList.remove("invalid");
      error.textContent = "";
    };

    // Full Name
    const fullName = document.getElementById("fullName").value.trim();
    fullName.length < 3
      ? showError("fullName", "At least 3 characters.")
      : clearError("fullName");

    // Email
    const email = document.getElementById("email").value.trim();
    /^[^ ]+@[^ ]+\.[a-z]{2,}$/.test(email)
      ? clearError("email")
      : showError("email", "Invalid email format.");

    // Password
    const password = document.getElementById("password").value;
    /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password)
      ? clearError("password")
      : showError("password", "Min 8 chars with letters & numbers.");

    // Confirm Password
    const confirmPassword = document.getElementById("confirmPassword").value;
    confirmPassword !== password
      ? showError("confirmPassword", "Passwords do not match.")
      : clearError("confirmPassword");

    // Phone
    const phone = document.getElementById("phone").value.trim();
    /^\d{10,}$/.test(phone)
      ? clearError("phone")
      : showError("phone", "Must be at least 10 digits.");

    // Gender
    const genderSelected = [...document.getElementsByName("gender")].some(
      (g) => g.checked
    );
    document.getElementById("genderError").textContent = genderSelected
      ? ""
      : "Please select gender.";
    if (!genderSelected) isValid = false;

    // Date of Birth
    const dob = document.getElementById("dob").value;
    if (dob) {
      const age = new Date().getFullYear() - new Date(dob).getFullYear();
      age >= 18 ? clearError("dob") : showError("dob", "You must be over 18.");
    } else showError("dob", "Date of birth is required.");

    // Country
    const country = document.getElementById("country").value;
    country
      ? clearError("country")
      : showError("country", "Please select a country.");

    // Hobbies
    const hobbies = [...document.getElementsByName("hobbies")].some(
      (h) => h.checked
    );
    document.getElementById("hobbiesError").textContent = hobbies
      ? ""
      : "Select at least one hobby.";
    if (!hobbies) isValid = false;

    if (isValid) {
      alert("🎉 Registration Successful!");
      document.getElementById("registrationForm").reset();
    }
  });
