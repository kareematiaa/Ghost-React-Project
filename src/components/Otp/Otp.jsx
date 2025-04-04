import React, { useState, useRef, useEffect } from "react";
import styles from "./Otp.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthService from "../../Services/AuthService";
import { useAuth } from "../../Context/AuthContext";
import * as Yup from "yup";

export default function Otp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, email } = location.state || { userData: null, email: "" };
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(false); // State to handle loading
  const [loadingOtp, setLoadingOtp] = useState(false); // State to handle loading
  const [timer, setTimer] = useState(120); // Timer state
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Resend button state
  const { Register } = useAuth(); // Access the login function from context

  const inputRefs = useRef([]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      otp: ["", "", "", "", "", ""], // Array to store each OTP digit
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().matches(/^\d$/, "Must be a number")) // Ensure each digit is a number
        .length(6, "OTP must be 6 digits"), // Ensure OTP is exactly 6 digits
    }),
    onSubmit: async (values) => {
      setLoading(true); // Set loading to true
      const userOtp = values.otp.join("");
      if (userOtp.length == 6) {
        try {
          const otpValid = await AuthService.validateOtp(email, userOtp);
          console.log("Otp successful:", otpValid);
          if (!otpValid) {
            setError("Invalid OTP code");
            throw new Error("Invalid OTP code");
          }
          console.log(userData);

          // If OTP is valid, proceed with registration
          const registrationResponse = await AuthService.register(userData);
          console.log("Registration successful:", registrationResponse);
          Register(registrationResponse);
          // Redirect to home after successful registration
          navigate("/");
        } catch (error) {
          setError(error.message);
          //console.log("forget password failed:", error);
        } finally {
          setLoading(false);
        }
      } else {
        formik.setErrors({ otp: "Please enter valid otp" });
        setLoading(false);
      }
    },
  });

  // Check if all OTP fields are filled
  const isOtpComplete = formik.values.otp.every((digit) => digit !== "");

  // Handle input change and auto-focus
  const handleChange = (value, index) => {
    // Ensure only one digit is entered
    if (value.length > 1) {
      value = value.slice(0, 1); // Take only the first character
    }

    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue("otp", newOtp);

    // Move to the next input if a digit is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").split("");
    const newOtp = [...formik.values.otp];
    data.forEach((char, idx) => {
      if (idx < 6) {
        newOtp[idx] = char;
      }
    });
    formik.setFieldValue("otp", newOtp);
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    try {
      setLoadingOtp(true); // Set loading to true
      const response = await AuthService.generateOtp({ email });
      console.log("New OTP generated:", response);

      // Clear the OTP input boxes
      formik.setFieldValue("otp", ["", "", "", "", "", ""]);

      // Clear any error messages
      formik.setErrors({});

      setTimer(60); // Reset timer
      setIsResendDisabled(true); // Disable resend button again
    } catch (error) {
      console.log("Failed to generate new OTP:", error);
      setError(error.messsage);
      console.log(error);
    } finally {
      setLoadingOtp(false);
    }
  };

  // Format timer to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Start the timer on component mount
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable resend button when timer reaches 0
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timer]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
          <h2 className="text-lg lg:text-2xl font-bold text-center mb-2">
            OTP Verification
          </h2>
          <p className="text-gray-500 text-center mb-6">
            We have sent code to <strong>{email}</strong> to verify your reset
            password
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div
              className="flex justify-center gap-1 md:gap-3 lg:gap-4 mb-6"
              onPaste={handlePaste}
            >
              {formik.values.otp.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  pattern="\d*" // Only allow numbers
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`w-full h-full md:h-10 lg:h-12 text-center border-2 rounded-lg text-lg focus:outline-none ${
                    value ? "border-gray-1000" : "border-gray-300"
                  } focus:ring-2 focus:ring-gray-1000 focus:border-transparent`}
                />
              ))}
            </div>

            <div className="text-red-500 text-center mb-4">{error}</div>

            <div className="text-center mb-4">
              <span className="text-gray-500">
                Havent got the code yet?
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                  className={`ml-2 text-yellow-1000 explore font-semibold underline ${
                    isResendDisabled ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  Resend Code{" "}
                  {isResendDisabled && !loadingOtp && `(${formatTime(timer)})`}
                  {loadingOtp ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-dark animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    </>
                  ) : (
                    ""
                  )}
                </button>
              </span>
            </div>

            <button
              type="submit"
              disabled={!isOtpComplete || loading}
              className={`w-full text-white mt-16 py-2 rounded-lg font-semibold transition flex justify-center items-center ${
                !isOtpComplete || loading
                  ? "bg-gray-400 opacity-75" // Disabled styles
                  : "bg-gray-1000 " // Enabled styles
              }`}
            >
              {loading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Verifying...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
