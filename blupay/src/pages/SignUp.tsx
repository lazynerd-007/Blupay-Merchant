import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageIcon,
  LockIcon,
  EyeSlashIcon,
  EyeIcon,
  ProfileCircleIcon,
  NigeriaFlagIcon,
} from "../components/icons";

interface FormState {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
}

interface FormErrors {
  email: string;
  fullName: string;
  phoneNumber: string;
  password: string;
}

type ValidationStatus = "idle" | "valid" | "invalid";

interface FieldStatus {
  email: ValidationStatus;
  fullName: ValidationStatus;
  phoneNumber: ValidationStatus;
  password: ValidationStatus;
}

interface PasswordStrength {
  score: number; // 0-4
  message: string;
  color: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
  });

  const [fieldStatus, setFieldStatus] = useState<FieldStatus>({
    email: "idle",
    fullName: "idle",
    phoneNumber: "idle",
    password: "idle",
  });

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    message: "Too weak",
    color: "text-red-500",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (name: string): boolean => {
    return name.trim().length >= 3 && /^[a-zA-Z\s'-]+$/.test(name);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    return /^\d{10,15}$/.test(phone.replace(/\D/g, ""));
  };

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    // Empty password
    if (!password) {
      return { score: 0, message: "Too weak", color: "text-red-500" };
    }

    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Cap at 4
    score = Math.min(score, 4);

    // Define messages and colors based on score
    const strengthMap: Record<number, PasswordStrength> = {
      0: { score: 0, message: "Too weak", color: "text-red-500" },
      1: { score: 1, message: "Weak", color: "text-red-500" },
      2: { score: 2, message: "Fair", color: "text-yellow-500" },
      3: { score: 3, message: "Good", color: "text-green-500" },
      4: { score: 4, message: "Strong", color: "text-green-700" },
    };

    return strengthMap[score];
  };

  const validateField = (name: keyof FormState, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;
      case "fullName":
        if (!value) return "Full name is required";
        if (!validateFullName(value))
          return "Please enter a valid full name (at least 3 characters, letters only)";
        break;
      case "phoneNumber":
        if (!value) return "Phone number is required";
        if (!validatePhoneNumber(value))
          return "Please enter a valid phone number (10-15 digits)";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/[0-9]/.test(value))
          return "Password must contain at least one number";
        break;
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Mark field as touched
    if (!touched[name]) {
      setTouched({
        ...touched,
        [name]: true,
      });
    }

    // Update password strength if password field
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Validate in real-time
    const error = validateField(name as keyof FormState, value);
    setErrors({
      ...errors,
      [name]: error,
    });

    setFieldStatus({
      ...fieldStatus,
      [name]: error ? "invalid" : value ? "valid" : "idle",
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Mark as touched on blur
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate on blur
    const error = validateField(name as keyof FormState, value);
    setErrors({
      ...errors,
      [name]: error,
    });

    setFieldStatus({
      ...fieldStatus,
      [name]: error ? "invalid" : value ? "valid" : "idle",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formState).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setTouched(allTouched);

    // Validate all fields
    const newErrors: FormErrors = {
      email: validateField("email", formState.email),
      fullName: validateField("fullName", formState.fullName),
      phoneNumber: validateField("phoneNumber", formState.phoneNumber),
      password: validateField("password", formState.password),
    };

    // Update field status
    const newFieldStatus: FieldStatus = {
      email: newErrors.email ? "invalid" : formState.email ? "valid" : "idle",
      fullName: newErrors.fullName
        ? "invalid"
        : formState.fullName
          ? "valid"
          : "idle",
      phoneNumber: newErrors.phoneNumber
        ? "invalid"
        : formState.phoneNumber
          ? "valid"
          : "idle",
      password: newErrors.password
        ? "invalid"
        : formState.password
          ? "valid"
          : "idle",
    };

    setErrors(newErrors);
    setFieldStatus(newFieldStatus);

    // If no errors, proceed with signup
    if (
      !newErrors.email &&
      !newErrors.fullName &&
      !newErrors.phoneNumber &&
      !newErrors.password
    ) {
      console.log("Form submitted:", formState);
      // Add signup logic here
    }
  };

  // Helper function to get input border color based on validation status
  const getInputBorderClass = (fieldName: keyof FieldStatus): string => {
    if (!touched[fieldName]) return "border-[rgba(255,255,255,0.10)]";

    switch (fieldStatus[fieldName]) {
      case "valid":
        return "border-green-500 bg-green-50";
      case "invalid":
        return "border-red-500 bg-red-50";
      default:
        return "border-[rgba(255,255,255,0.10)]";
    }
  };
  return (
    <div className="overflow-hidden bg-white min-h-screen flex flex-col">
      <div className="flex overflow-hidden z-10 justify-between items-center px-16 py-3 text-lg leading-loose text-right bg-white h-18 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] text-slate-400 max-md:px-5">
        <div className="self-stretch my-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/26f75009eb984fdf84e8a5f10f28c4b7/9b7e78e313baed7c6a4c8f4713616b5b04744706?placeholderIfAbsent=true"
            alt="Logo"
            className="h-10 object-contain"
          />
        </div>
      </div>
      <div className="flex-grow flex w-full max-md:max-w-full">
        <div className="flex w-full max-md:flex-col">
          {/* Left Column with Background Image - Fixed */}
          <div className="w-[61%] max-md:w-full sticky top-0 h-screen">
            <div className="flex overflow-hidden relative flex-col h-full w-full min-h-screen max-md:pt-24 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/26f75009eb984fdf84e8a5f10f28c4b7/f510a1ba6432bd4ede8c05ec17de2c4fa1c6cfc5?placeholderIfAbsent=true"
                alt="Background"
                className="object-cover absolute inset-0 size-full"
              />
              <div className="flex relative flex-col justify-center h-full px-16 max-w-[600px] mx-auto">
                <div className="self-start text-8xl font-bold text-cyan-400 max-md:text-4xl">
                  "
                </div>
                <div className="text-xl leading-10 text-white">
                  Newr miss a scale with Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque aliquam bibendum metus, sit amet
                  fermentum purus sollicitudin vel. Pellentesque vitae lacinia
                  justo. Cras nec arcu nec leo dignissim tincidunt. Sed in
                  tellus non libero varius pharetra. Fusce et nisl vitae est
                  suscipit vulputate eu at mi. Morbi eget massa ac justo
                  condimentum feugiat. Proin vel nunc eu elit varius gravida.
                </div>
              </div>
              <div className="flex relative z-10 flex-wrap gap-5 justify-between items-start mt-auto px-16 pb-8 w-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/26f75009eb984fdf84e8a5f10f28c4b7/9b7e78e313baed7c6a4c8f4713616b5b04744706?placeholderIfAbsent=true"
                  alt="Logo"
                  className="object-contain overflow-hidden shrink-0 self-end mt-7 max-w-full aspect-square stroke-[0.693px] stroke-blue-700 w-[111px]"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/26f75009eb984fdf84e8a5f10f28c4b7/96dead5a4a14c3cc07a9091f87450fc2545e4939?placeholderIfAbsent=true"
                  alt="Icon"
                  className="object-contain overflow-hidden shrink-0 self-start aspect-square w-[34px]"
                />
              </div>
            </div>
          </div>

          {/* Right Column with Form - Scrollable */}
          <div className="w-[39%] max-md:w-full overflow-y-auto h-[calc(100vh-4.5rem)]">
            <div className="flex flex-col items-center justify-center py-10 px-8 md:px-0">
              <div className="w-full max-w-[426px]">
                <div className="pb-3.5 w-full">
                  <div className="text-3xl font-extrabold leading-tight text-slate-950">
                    Create New Account
                  </div>
                  <div className="mt-2 text-base text-zinc-600">
                    Please enter all field required
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 w-full max-md:mt-6"
                >
                  {/* Email Field */}
                  <div className="mt-8 max-w-full w-[426px]">
                    <div className="flex flex-col justify-center w-full rounded-md max-w-[426px] max-md:max-w-full">
                      <label
                        htmlFor="email"
                        className="gap-2.5 self-start text-sm text-zinc-500"
                      >
                        Email Address
                      </label>
                      <div
                        className={`flex gap-2.5 items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] bg-slate-100 ${getInputBorderClass("email")} max-md:max-w-full`}
                      >
                        <div className="flex gap-3.5 items-center self-stretch my-auto">
                          <MessageIcon />
                          <div className="flex shrink-0 self-stretch my-auto w-px h-6 bg-neutral-200" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Enter Email Address"
                          className="flex-1 self-stretch my-auto text-sm bg-transparent outline-none placeholder:text-gray-400"
                        />
                        {fieldStatus.email === "valid" && touched.email && (
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Full Name Field */}
                  <div className="flex flex-col justify-center mt-8 w-full text-sm rounded-md max-w-[426px] max-md:max-w-full">
                    <label
                      htmlFor="fullName"
                      className="gap-2.5 self-start text-zinc-500"
                    >
                      Enter Full Name
                    </label>
                    <div
                      className={`flex gap-2.5 items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] bg-slate-100 ${getInputBorderClass("fullName")} max-md:max-w-full`}
                    >
                      <ProfileCircleIcon />
                      <div className="flex shrink-0 self-stretch my-auto w-px h-6 bg-neutral-200" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Username"
                        className="flex-1 self-stretch my-auto bg-transparent outline-none placeholder:text-gray-400"
                      />
                      {fieldStatus.fullName === "valid" && touched.fullName && (
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      )}
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Field */}
                  <div className="flex flex-col justify-center mt-8 w-full rounded-md max-w-[426px] max-md:max-w-full">
                    <label
                      htmlFor="phoneNumber"
                      className="gap-2.5 self-start text-sm text-zinc-500"
                    >
                      Phone Number
                    </label>
                    <div
                      className={`flex gap-2.5 items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] bg-slate-100 ${getInputBorderClass("phoneNumber")} max-md:max-w-full`}
                    >
                      <div className="flex gap-2.5 items-center self-stretch my-auto">
                        <NigeriaFlagIcon />
                        <div className="flex shrink-0 self-stretch my-auto w-px h-5 bg-neutral-200" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formState.phoneNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Phone Number"
                        className="self-stretch my-auto text-sm bg-transparent outline-none w-[269px] placeholder:text-neutral-400"
                      />
                      {fieldStatus.phoneNumber === "valid" &&
                        touched.phoneNumber && (
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                    </div>
                    {errors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col mt-8 w-full rounded-md max-w-[426px] max-md:max-w-full">
                    <label
                      htmlFor="password"
                      className="gap-2.5 self-start text-sm bg-white backdrop-blur-[2px] text-zinc-500"
                    >
                      Enter Password
                    </label>
                    <div
                      className={`flex gap-10 justify-between items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] bg-slate-100 ${getInputBorderClass("password")} max-md:max-w-full`}
                    >
                      <div className="flex gap-5 items-center self-stretch my-auto flex-1">
                        <div className="flex gap-3.5 items-center self-stretch my-auto">
                          <LockIcon />
                          <div className="flex shrink-0 self-stretch my-auto w-px h-5 bg-neutral-200" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formState.password}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Enter Password"
                          className="flex-1 self-stretch my-auto text-sm bg-transparent outline-none placeholder:text-neutral-400"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex shrink-0 self-stretch my-auto w-6 h-6 focus:outline-none"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.password}
                      </p>
                    )}

                    {formState.password && !errors.password && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                            <div
                              className={`h-1.5 rounded-full ${
                                passwordStrength.score === 1
                                  ? "bg-red-500 w-1/4"
                                  : passwordStrength.score === 2
                                    ? "bg-yellow-500 w-2/4"
                                    : passwordStrength.score === 3
                                      ? "bg-green-500 w-3/4"
                                      : passwordStrength.score === 4
                                        ? "bg-green-700 w-full"
                                        : "w-0"
                              }`}
                            ></div>
                          </div>
                          <span className={`text-xs ${passwordStrength.color}`}>
                            {passwordStrength.message}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="flex gap-4 justify-center items-center mt-8 w-full p-4 text-base font-extrabold text-center text-white bg-blue-700 rounded-[1000px] hover:bg-blue-800 transition-colors duration-300"
                  >
                    Continue
                  </button>
                </form>
                
                {/* Add link to sign in at the bottom of form */}
                <div className="mt-6 text-center">
                  <span className="text-gray-600">Already have an account? </span>
                  <span 
                    className="text-blue-700 font-medium cursor-pointer hover:underline"
                    onClick={() => navigate("/signin")}
                  >
                    Sign in
                  </span>
                </div>
                
                <div className="mt-8 mb-4 text-sm text-center text-gray-800 opacity-[0.502]">
                  <span className="cursor-pointer hover:underline">Terms of service</span> · <span className="cursor-pointer hover:underline">Having problems with log in?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
