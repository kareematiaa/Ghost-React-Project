import React from "react";
import { FaCircleXmark } from "react-icons/fa6";
export default function OrderFailed() {
  return (
    <div className="flex justify-center items-center min-h-screen py-10 px-4">
      <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-lg sm:shadow-xl">
        <div className="flex justify-center mb-6">
          <FaCircleXmark className="text-8xl text-red-700" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 text-blue-1000">
          Order Failed
        </h2>

        <p className="text-gray-600 text-sm sm:text-base text-center mb-6 px-2 sm:px-4">
          Something went wrong, Please try again later
        </p>

        <button
          className="w-full text-white py-2 sm:py-3 rounded-lg font-semibold  bg-yellow-1000 hover:bg-blue-1000 "
          onClick={() => (window.location.href = "/Cart")} // Or your routing logic
        >
          Back To Cart
        </button>
      </div>
    </div>
  );
}
