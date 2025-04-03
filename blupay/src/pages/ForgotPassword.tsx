import React, { useState } from "react";
import { MessageIcon } from "../components/icons";

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setError("Email is required");
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Password reset requested for:", email);
      setIsSubmitting(false);
      // Here you would typically show a success message or redirect
    }, 1500);
  };

  return (
    <div className="overflow-hidden bg-white">
      <div className="flex overflow-hidden z-10 justify-between items-center px-16 py-8 text-lg leading-loose text-right bg-white min-h-[87px] shadow-[2px_4px_8px_rgba(0,0,0,0.15)] text-slate-400 max-md:px-5">
        <div className="self-stretch my-auto rounded-none min-w-60 w-[252px]">
          <span className="font-['Urbanist',_-apple-system,_Roboto,_Helvetica,_sans-serif]">
            Don't have an account?
          </span>
          <span className="font-['Urbanist',_-apple-system,_Roboto,_Helvetica,_sans-serif] font-medium text-[rgba(0,9,87,1)]">
            {" "}
            Sign Up
          </span>
        </div>
      </div>
      <div className="mt-0 w-full max-w-[1218px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          {/* Left Column with Background Image */}
          <div className="w-[61%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden relative flex-col pr-20 pb-2 w-full min-h-[1024px] pt-[480px] max-md:pt-24 max-md:mt-10 max-md:max-w-full">
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
                  condimentum feugiat. Proin vel nunc eu elit varius gravida.{" "}
                </div>
              </div>
              <div className="flex relative z-10 flex-wrap gap-5 justify-between items-start max-w-full w-[518px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/26f75009eb984fdf84e8a5f10f28c4b7/9b7e78e313baed7c6a4c8f4713616b5b04744706?placeholderIfAbsent=true"
                  alt="Logo"
                  className="object-contain shrink-0 self-end mt-7 max-w-full aspect-square stroke-[0.693px] stroke-blue-700 w-[111px]"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/26f75009eb984fdf84e8a5f10f28c4b7/96dead5a4a14c3cc07a9091f87450fc2545e4939?placeholderIfAbsent=true"
                  alt="Icon"
                  className="object-contain shrink-0 self-start aspect-square w-[34px]"
                />
              </div>
            </div>
          </div>

          {/* Right Column with Form */}
          <div className="ml-5 w-[39%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-72 max-md:mt-10 max-md:max-w-full">
              <div className="w-full max-md:max-w-full">
                <div className="flex flex-col pb-3.5 max-w-full w-[426px]">
                  <button
                    onClick={onBackToLogin}
                    className="self-start text-sm font-bold text-center text-blue-700 hover:underline focus:outline-none"
                  >
                    Back to login
                  </button>
                  <div className="mt-2 text-3xl font-extrabold leading-tight text-slate-950 max-md:max-w-full">
                    Forgot Password
                  </div>
                  <div className="mt-2 text-base leading-6 text-zinc-600">
                    Please enter your email address to retrieve your password
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 max-w-full w-[426px]"
                >
                  <div className="flex flex-col justify-center w-full rounded-md max-w-[426px] max-md:max-w-full">
                    <label
                      htmlFor="email"
                      className="gap-2.5 self-start text-sm text-zinc-500"
                    >
                      Email Address
                    </label>
                    <div
                      className={`flex gap-2.5 items-center px-5 py-4 mt-2.5 w-full rounded-md border border-solid backdrop-blur-[2px] ${
                        error
                          ? "border-red-500 bg-red-50"
                          : "bg-slate-100 border-[rgba(255,255,255,0.10)]"
                      } max-md:max-w-full`}
                    >
                      <div className="flex gap-3.5 items-center self-stretch my-auto">
                        <MessageIcon />
                        <div className="flex shrink-0 self-stretch my-auto w-px h-6 bg-neutral-200" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter Email Address"
                        className="flex-1 self-stretch my-auto text-sm bg-transparent outline-none placeholder:text-gray-400"
                      />
                    </div>
                    {error && (
                      <p className="mt-1 text-xs text-red-500">{error}</p>
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
              </div>

              <div className="self-end mt-72 mr-8 text-sm text-center text-gray-800 opacity-[0.502] max-md:mt-10 max-md:mr-2.5">
                Terms of service · Having problems with log in?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
