import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
export default function OrderSuccess() {
  return (
    <div className="flex justify-center items-center min-h-screen py-5 px-4">
      <div className="bg-white w-full max-w-md p-5 sm:p-8 rounded-2xl shadow-lg sm:shadow-xl">
        <div className="flex justify-center mb-6">
          <FaCircleCheck className="text-8xl text-green-500" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 text-blue-1000">
          Order Success
        </h2>

        <p className="text-gray-600 text-sm sm:text-base text-center mb-6 px-2 sm:px-4">
          Thank you for your order! Your package will be delivered to your
          address quickly. We appreciate your trust in our products.
        </p>

        <button
          className="w-full text-white py-2 sm:py-3 rounded-lg font-semibold transition-colors bg-gray-1000  "
          onClick={() => (window.location.href = "/")} // Or your routing logic
        >
          Back To Home
        </button>
      </div>
    </div>
  );
}
