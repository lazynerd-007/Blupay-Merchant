import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MessageIcon, 
  LockIcon, 
  EyeSlashIcon, 
  EyeIcon
} from "../components/icons";

interface FormState {
  email: string;
  otp: string[];
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

type ResetStep = "email" | "otp" | "password" | "success";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState<FormState>({
    email: "",
    otp: ["", "", "", ""],
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    otp: "",
    password: "",
    confirmPassword: ""
  });

  // Create refs for OTP inputs
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const [currentStep, setCurrentStep] = useState<ResetStep>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateOTP = (otp: string[]): boolean => {
    // Check if OTP is 4 digits and all filled
    return otp.every(digit => /^\d$/.test(digit));
  };

  const validatePassword = (password: string): boolean => {
    // Password should be at least 8 characters, with at least one uppercase, one number
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Clear errors when typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...formState.otp];
    newOtp[index] = value;
    
    setFormState({
      ...formState,
      otp: newOtp
    });

    // Clear any OTP errors
    if (errors.otp) {
      setErrors({
        ...errors,
        otp: "",
      });
    }

    // Auto-focus to next input after filling
    if (value !== "" && index < otpRefs.length - 1) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && index > 0 && formState.otp[index] === "") {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!formState.email) {
      setErrors({ ...errors, email: "Email is required" });
      return;
    } else if (!validateEmail(formState.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Password reset requested for:", formState.email);
      setIsSubmitting(false);
      setCurrentStep("otp");
      
      // Focus on first OTP input when moving to OTP step
      setTimeout(() => {
        otpRefs[0].current?.focus();
      }, 100);
    }, 1500);
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate OTP
    if (formState.otp.some(digit => digit === "")) {
      setErrors({ ...errors, otp: "All OTP digits are required" });
      return;
    } else if (!validateOTP(formState.otp)) {
      setErrors({ ...errors, otp: "Invalid OTP format" });
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("OTP verified:", formState.otp.join(""));
      setIsSubmitting(false);
      setCurrentStep("password");
    }, 1500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    if (!formState.password) {
      setErrors({ ...errors, password: "Password is required" });
      return;
    } else if (!validatePassword(formState.password)) {
      setErrors({ ...errors, password: "Password must be at least 8 characters with one uppercase letter and one number" });
      return;
    }

    // Validate confirm password
    if (formState.password !== formState.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords don't match" });
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Password reset completed");
      setIsSubmitting(false);
      setCurrentStep("success");
    }, 1500);
  };

  // Email Step Component
  const EmailStep = () => (
    <div className="w-full max-w-[426px]">
      <div className="flex flex-col pb-3.5 w-full">
        <div className="text-3xl font-extrabold leading-tight text-slate-950">
          Forgot Password
        </div>
        <div className="mt-2 text-base leading-6 text-zinc-600">
          Please enter your email address to retrieve your password
        </div>
      </div>

      <form
        onSubmit={handleEmailSubmit}
        className="mt-8 w-full max-md:mt-6"
      >
        {/* Email Field */}
        <div className="flex flex-col justify-center w-full rounded-md">
          <label
            htmlFor="email"
            className="gap-2.5 self-start text-sm text-zinc-500"
          >
            Email Address
          </label>
          <div
            className={`flex gap-2.5 items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] ${errors.email ? "border-red-500 bg-red-50" : "bg-slate-100 border-[rgba(255,255,255,0.10)]"}`}
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
              placeholder="Enter Email Address"
              className="flex-1 self-stretch my-auto text-sm bg-transparent outline-none placeholder:text-gray-400"
              autoFocus
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex gap-4 justify-center items-center mt-8 w-full p-4 text-base font-extrabold text-center text-white bg-blue-700 rounded-[1000px] ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-blue-800"
          } transition-colors duration-300`}
        >
          {isSubmitting ? "Processing..." : "Continue"}
        </button>
      </form>
      
      {/* Back to login link */}
      <div className="mt-6 text-center">
        <span 
          className="text-blue-700 font-medium cursor-pointer hover:underline"
          onClick={() => navigate("/signin")}
        >
          Back to Login
        </span>
      </div>
    </div>
  );

  // OTP Verification Step Component
  const OTPStep = () => {
    // Focus on first input when component mounts
    useEffect(() => {
      otpRefs[0].current?.focus();
    }, []);

    return (
      <div className="w-full max-w-[426px]">
        <div className="flex flex-col pb-3.5 w-full">
          <div className="text-3xl font-extrabold leading-tight text-slate-950">
            OTP Verification
          </div>
          <div className="mt-2 text-base leading-6 text-zinc-600">
            Please enter the 4-digit code sent to {formState.email}
          </div>
        </div>

        <form
          onSubmit={handleOTPSubmit}
          className="mt-8 w-full max-md:mt-6"
        >
          {/* OTP Fields */}
          <div className="flex flex-col justify-center w-full rounded-md">
            <label
              htmlFor="otp"
              className="gap-2.5 self-start text-sm text-zinc-500 mb-2"
            >
              Enter OTP
            </label>
            <div className="flex justify-center gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div 
                  key={index}
                  className={`w-14 h-14 flex items-center justify-center rounded-md border border-solid ${
                    errors.otp ? "border-red-500 bg-red-50" : "bg-slate-100 border-[rgba(255,255,255,0.10)]"
                  }`}
                >
                  <input
                    ref={otpRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={formState.otp[index]}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                    className="w-full h-full text-center text-xl font-semibold bg-transparent outline-none"
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>
            {errors.otp && (
              <p className="mt-2 text-xs text-red-500 text-center">{errors.otp}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex gap-4 justify-center items-center mt-8 w-full p-4 text-base font-extrabold text-center text-white bg-blue-700 rounded-[1000px] ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-800"
            } transition-colors duration-300`}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="flex flex-col gap-4">
            <span className="text-gray-600">
              Didn't receive code? 
              <span className="text-blue-700 font-medium cursor-pointer hover:underline ml-1">
                Resend OTP
              </span>
            </span>
            <span 
              className="text-blue-700 font-medium cursor-pointer hover:underline"
              onClick={() => setCurrentStep("email")}
            >
              Change Email
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Create New Password Step Component
  const PasswordStep = () => {
    // Focus on password input when component mounts
    useEffect(() => {
      const passwordInput = document.getElementById("password");
      if (passwordInput) {
        passwordInput.focus();
      }
    }, []);

    return (
      <div className="w-full max-w-[426px]">
        <div className="flex flex-col pb-3.5 w-full">
          <div className="text-3xl font-extrabold leading-tight text-slate-950">
            Create New Password
          </div>
          <div className="mt-2 text-base leading-6 text-zinc-600">
            Your new password must be different from previous passwords
          </div>
        </div>

        <form
          onSubmit={handlePasswordSubmit}
          className="mt-8 w-full max-md:mt-6"
        >
          {/* Password Field */}
          <div className="flex flex-col mt-3.5 w-full rounded-md">
            <label
              htmlFor="password"
              className="gap-2.5 self-start text-sm text-zinc-500"
            >
              New Password
            </label>
            <div
              className={`flex gap-10 justify-between items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] ${errors.password ? "border-red-500 bg-red-50" : "bg-slate-50 border-[rgba(255,255,255,0.10)]"}`}
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
                  placeholder="Enter New Password"
                  className="flex-1 self-stretch my-auto text-sm bg-transparent outline-none placeholder:text-neutral-400"
                  autoComplete="new-password"
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
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col mt-6 w-full rounded-md">
            <label
              htmlFor="confirmPassword"
              className="gap-2.5 self-start text-sm text-zinc-500"
            >
              Confirm New Password
            </label>
            <div
              className={`flex gap-10 justify-between items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] ${errors.confirmPassword ? "border-red-500 bg-red-50" : "bg-slate-50 border-[rgba(255,255,255,0.10)]"}`}
            >
              <div className="flex gap-5 items-center self-stretch my-auto flex-1">
                <div className="flex gap-3.5 items-center self-stretch my-auto">
                  <LockIcon />
                  <div className="flex shrink-0 self-stretch my-auto w-px h-5 bg-neutral-200" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password"
                  className="flex-1 self-stretch my-auto text-sm bg-transparent outline-none placeholder:text-neutral-400"
                  autoComplete="new-password"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="flex shrink-0 self-stretch my-auto w-6 h-6 focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="mt-8 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <span className={formState.password.length >= 8 ? "text-green-500" : "text-gray-400"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  {formState.password.length >= 8 && (
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  )}
                </svg>
              </span>
              <span>Minimum 8 characters</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={/[A-Z]/.test(formState.password) ? "text-green-500" : "text-gray-400"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  {/[A-Z]/.test(formState.password) && (
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  )}
                </svg>
              </span>
              <span>At least one uppercase letter</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={/\d/.test(formState.password) ? "text-green-500" : "text-gray-400"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  {/\d/.test(formState.password) && (
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  )}
                </svg>
              </span>
              <span>At least one number</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex gap-4 justify-center items-center mt-8 w-full p-4 text-base font-extrabold text-center text-white bg-blue-700 rounded-[1000px] ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-800"
            } transition-colors duration-300`}
          >
            {isSubmitting ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    );
  };

  // Success Step Component
  const SuccessStep = () => (
    <div className="w-full max-w-[426px] text-center">
      <div className="flex flex-col items-center pb-3.5 w-full">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="text-green-500" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          </svg>
        </div>
        <div className="text-3xl font-extrabold leading-tight text-slate-950">
          Password Reset Successful
        </div>
        <div className="mt-4 text-base leading-6 text-zinc-600">
          Your password has been successfully reset. You can now sign in with your new password.
        </div>
      </div>

      <button
        onClick={() => navigate("/signin")}
        className="flex gap-4 justify-center items-center mt-8 w-full p-4 text-base font-extrabold text-center text-white bg-blue-700 rounded-[1000px] hover:bg-blue-800 transition-colors duration-300"
      >
        Back to Sign In
      </button>
    </div>
  );

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
              {currentStep === "email" && <EmailStep />}
              {currentStep === "otp" && <OTPStep />}
              {currentStep === "password" && <PasswordStep />}
              {currentStep === "success" && <SuccessStep />}
              
              {currentStep !== "success" && (
                <div className="mt-8 mb-4 text-sm text-center text-gray-800 opacity-[0.502]">
                  <span className="cursor-pointer hover:underline">Terms of service</span> · <span className="cursor-pointer hover:underline">Having problems with log in?</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
