import React, { useState } from "react";
import {
  MessageIcon,
  LockIcon,
  EyeSlashIcon,
  EyeIcon,
  CheckboxIcon,
} from "../components/icons";

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email: string;
  password: string;
}

interface SignInProps {
  onForgotPassword: () => void;
  onSignUp?: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onForgotPassword, onSignUp }) => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  const toggleRememberMe = () => {
    setFormState({
      ...formState,
      rememberMe: !formState.rememberMe,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      email: "",
      password: "",
    };

    // Validate email
    if (!formState.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!formState.password) {
      newErrors.password = "Password is required";
    } else if (formState.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.email && !newErrors.password) {
      console.log("Form submitted:", formState);
      // Add login logic here
    }
  };

  return (
    <div className="overflow-hidden bg-white">
      <div className="flex overflow-hidden z-10 justify-between items-center px-16 py-4 text-lg leading-loose text-right bg-white min-h-6 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] text-slate-400 max-md:px-5">
        <div className="self-stretch my-auto rounded-none min-w-60 w-[252px]">
          <span className="font-['Urbanist',_-apple-system,_Roboto,_Helvetica,_sans-serif]">
            Don't have an account?{" "}
          </span>
          <span
            className="font-['Urbanist',_-apple-system,_Roboto,_Helvetica,_sans-serif] font-medium text-[rgba(0,9,87,1)] cursor-pointer"
            onClick={onSignUp}
          >
            Sign Up
          </span>
        </div>
      </div>
      <div className="mt-0 w-full max-w-[1218px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {/* Left Column with Background Image */}
          <div className="w-[61%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden relative flex-col pr-20 pb-2 w-full min-h-[1302px] pt-[480px] max-md:pt-24 max-md:mt-10 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/26f75009eb984fdf84e8a5f10f28c4b7/f510a1ba6432bd4ede8c05ec17de2c4fa1c6cfc5?placeholderIfAbsent=true"
                alt="Background"
                className="object-cover absolute inset-0 size-full"
              />
              <div className="flex relative flex-col self-center max-w-full w-[473px]">
                <div className="self-start text-8xl font-bold text-cyan-400 max-md:text-4xl">
                  "
                </div>
                <div className="text-xl leading-10 text-white max-md:max-w-full">
                  Newr miss a scale with Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque aliquam bibendum metus, sit amet
                  fermentum purus sollicitudin vel. Pellentesque vitae lacinia
                  justo. Cras nec arcu nec leo dignissim tincidunt. Sed in
                  tellus non libero varius pharetra. Fusce et nisl vitae est
                  suscipit vulputate eu at mi. Morbi eget massa ac justo
                  condimentum feugiat. Proin vel nunc eu elit varius gravida.
                </div>
              </div>
              <div className="flex relative z-10 flex-wrap gap-5 justify-between items-start max-w-full w-[518px]">
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

          {/* Right Column with Form */}
          <div className="ml-5 w-[39%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-72 max-md:mt-10 max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <div className="pb-3.5 max-w-full w-[426px]">
                  <div className="text-3xl font-extrabold leading-tight text-slate-950 max-md:max-w-full">
                    Welcome to BluPay Merchant
                  </div>
                  <div className="mt-2 text-base text-zinc-600">
                    Please sign-in to your account
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-14 w-full max-w-[426px] max-md:mt-10 max-md:max-w-full"
                >
                  {/* Email Field */}
                  <div className="flex flex-col justify-center w-full rounded-md max-md:max-w-full">
                    <label
                      htmlFor="email"
                      className="gap-2.5 self-start text-sm text-zinc-500"
                    >
                      Email Address
                    </label>
                    <div
                      className={`flex gap-2.5 items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] ${errors.email ? "border-red-500 bg-red-50" : "bg-slate-100 border-[rgba(255,255,255,0.10)]"} max-md:max-w-full`}
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
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col mt-3.5 w-full rounded-md max-md:max-w-full">
                    <label
                      htmlFor="password"
                      className="gap-2.5 self-start text-sm text-zinc-500"
                    >
                      Enter Password
                    </label>
                    <div
                      className={`flex gap-10 justify-between items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] ${errors.password ? "border-red-500 bg-red-50" : "bg-slate-50 border-[rgba(255,255,255,0.10)]"} max-md:max-w-full`}
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
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex gap-2 items-center pb-4 mt-3.5 w-full min-h-[58px] max-md:max-w-full">
                    <div className="flex overflow-hidden items-center self-stretch my-auto w-[149px]">
                      <div
                        className="flex gap-2.5 items-start self-stretch p-2.5 my-auto rounded-3xl w-[42px] cursor-pointer"
                        onClick={toggleRememberMe}
                      >
                        <CheckboxIcon checked={formState.rememberMe} />
                      </div>
                      <label
                        htmlFor="rememberMe"
                        className="self-stretch my-auto text-sm text-slate-700 cursor-pointer"
                        onClick={toggleRememberMe}
                      >
                        Remember Me
                      </label>
                    </div>
                    <div
                      className="flex-1 shrink self-stretch my-auto text-sm text-right text-blue-500 basis-0 cursor-pointer hover:underline"
                      onClick={onForgotPassword}
                    >
                      Forgot Password?
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="flex gap-4 justify-center items-center mt-14 max-w-full text-base font-extrabold text-center text-white whitespace-nowrap w-full p-4 bg-blue-700 rounded-[1000px] hover:bg-blue-800 transition-colors duration-300 max-md:mt-10"
                  >
                    Login
                  </button>
                </form>
              </div>

              <div className="self-end mt-32 mr-8 text-sm text-center text-gray-800 opacity-[0.502] max-md:mt-10 max-md:mr-2.5">
                Terms of service · Having problems with log in?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
