import React from "react";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";

export default function CheckOut() {
  return (
    <div className=" py-10 mx-8 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-16 md:gap-x-20 lg:gap-x-72">
      {/* LEFT SECTION - Checkout Form */}
      <div className="">
        <h1 className="text-2xl font-bold mb-6">CHECKOUT</h1>

        {/* Steps */}
        <div className="flex space-x-6 text-gray-500 uppercase text-sm border-b pb-2">
          <span className="font-semibold text-gray-600">INFORMATION</span>
        </div>

        {/* Contact Info */}
        <div className="mt-6">
          <h2 className="text-md font-semibold mb-2">PAYMENT INFO</h2>

          <>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="flex items-center bg-white rounded-lg ps-4 border border-gray-300 ">
                <input
                  id="Cash"
                  type="radio"
                  defaultValue=""
                  name="bordered-radio"
                  className="w-4 h-4 bg-white border-gray-300"
                />
                <label
                  htmlFor="Cash"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-1000 "
                >
                  Cash
                </label>
              </div>
              <div className="flex items-center ps-4 border bg-white  border-gray-300 rounded-lg ">
                <input
                  defaultChecked=""
                  id="Visa"
                  type="radio"
                  defaultValue=""
                  name="bordered-radio"
                  className="w-4 h-4 bg-wihte border-gray-300"
                />
                <label
                  htmlFor="Visa"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
                >
                  Visa
                </label>
              </div>
            </div>
          </>
        </div>

        {/* Shipping Address */}
        <div className="mt-6">
          <h2 className="text-md font-semibold mb-2">SHIPPING ADDRESS</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Email"
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Unit Number"
              className="border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            className="w-full border border-gray-300 px-4 py-2 mt-3 rounded-md"
          />
        </div>

        {/* Shipping Button */}
        <button className="w-full bg-gray-1000 text-white py-3 mt-6 flex items-center justify-center gap-2 ">
          Order →
        </button>
      </div>

      {/* RIGHT SECTION - Order Summary */}
      <div className="border border-gray-300 p-6 h-fit">
        <h2 className="text-lg font-semibold mb-4">YOUR ORDER</h2>

        {/* Order Items */}
        <div className="space-y-4">
          {[model1, model2].map((img, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img
                src={img}
                alt="Product"
                className="w-20 h-24 object-cover border border-gray-300 rounded-md"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">Basic Fit T-Shirt</p>
                <p className="text-gray-500 text-sm">Black, L</p>
                <div className="text-gray-500 text-sm">(1)</div>
              </div>

              <p className="text-lg font-semibold">$99</p>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$180.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-gray-500 text-sm">$100 </span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>$180.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
