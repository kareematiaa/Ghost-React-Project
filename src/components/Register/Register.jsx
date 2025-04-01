import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [error, setError] = useState(null); // State to handle login errors
  const [loading, setLoading] = useState(false); // State to handle loading
  const navigate = useNavigate(); // Hook to navigate programmatically

  let mySchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "at least 3 char")
      .max(15, "max is 15"),
    email: Yup.string()
      .required("email is required")
      .email("invalid email")
      .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
    phoneNumber: Yup.string()
      .required("phone number is required")
      .matches(/^\d{11}$/, "Phone number must be 11 digits"),
    password: Yup.string()
      .required("password is required")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[\W_]/, "Must contain at least one special character"),
    confirmPassword: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("password")], "not match password"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: mySchema,
    onSubmit: async (values) => {
      setError(null);
      setLoading(true); // Set loading to true
      // const { confirmPassword, ...requestData } = values;

      try {
        console.log(values);
      } catch (error) {
        setError(error.message);
        //console.log(error.response.data);
        //setError(error.response.data || "Register failed. Please try again."); // the old set error message
      } finally {
        setLoading(false);
      }
    },
  });

  // Handle input change and clear error message
  const handleInputChange = (e) => {
    formik.handleChange(e); // Call Formik's handleChange
    setError(null); // Clear the error message
  };

  return (
    <>
      <div className="flex justify-center items-center  my-10">
        <div className="bg-white  md:w-2/4 lg:w-1/3 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-2">
            Create an Account
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Get started by creating an account
          </p>
          <p className="text-gray-500 text-center mb-6">
            Already have one ?{" "}
            <Link to={"/Login"}>
              <span className="text-gray-1000 font-semibold cursor-pointer underline">
                sign in!
              </span>
            </Link>
          </p>
          {/* Form */}
          <form className="" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                onChange={handleInputChange} // Use custom handleInputChange
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg placeholder-gray-300 focus:ring-yellow-1000 focus:border-yellow-1000 block w-full p-2.5"
                placeholder="Enter Your First Name"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-sm pt-1 ps-1 pb-5 text-red-800">
                  <h1>{formik.errors.name}</h1>
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleInputChange} // Use custom handleInputChange
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg placeholder-gray-300 focus:ring-yellow-1000 focus:border-yellow-1000 block w-full p-2.5"
                placeholder="Enter Your Email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-sm pt-1 ps-1 pb-5 text-red-800">
                  <h1>{formik.errors.email}</h1>
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                onChange={handleInputChange} // Use custom handleInputChange
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg placeholder-gray-300 focus:ring-yellow-1000 focus:border-yellow-1000 block w-full p-2.5"
                placeholder="Enter Your Phone Number"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-sm pt-1 ps-1 pb-5 text-red-800">
                  <h1>{formik.errors.phoneNumber}</h1>
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handleInputChange} // Use custom handleInputChange
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg placeholder-gray-300 focus:ring-yellow-1000 focus:border-yellow-1000 block w-full p-2.5"
                placeholder="Enter Your Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-sm pt-1 ps-1 pb-5 text-red-800">
                  <h1>{formik.errors.password}</h1>
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={handleInputChange} // Use custom handleInputChange
                value={formik.values.confirmPassword}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg placeholder-gray-300 focus:ring-yellow-1000 focus:border-yellow-1000 block w-full p-2.5"
                placeholder="Confirm Your Password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-sm pt-1 ps-1 pb-5 text-red-800">
                  <h1>{formik.errors.confirmPassword}</h1>
                </div>
              ) : null}
              <p className="text-sm pt-1 ps-1 pb-5 text-red-800">{error}</p>
            </div>

            <button
              type="submit"
              disabled={!formik.isValid || !formik.dirty || loading}
              className={`w-full text-white py-2 rounded-lg font-semibold transition flex justify-center items-center ${
                !formik.isValid || !formik.dirty || loading
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
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
