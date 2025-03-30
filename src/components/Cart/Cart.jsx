import React, { useState } from "react";
import styles from "./Cart.module.css";
import { GoTrash } from "react-icons/go";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Full Sleeve Zipper",
      price: 99,
      image: model1,
      color: "black",
      size: "L",
      quantity: 1,
    },
    {
      id: 3,
      name: "Full  Zipper",
      price: 99,
      image: model1,
      color: "black",
      size: "L",
      quantity: 1,
    },
    {
      id: 2,
      name: "Basic Slim Fit T-Shirt",
      price: 99,
      image: model2,
      color: "black",
      size: "L",
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const total = subtotal + shipping;
  return (
    <>
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section - Shopping Bag */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">SHOPPING BAG</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="rounded-lg flex flex-col my-5">
                {/* Remove Icon */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                  <GoTrash size={20} />
                </button>

                <div className="flex">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-lg border border-gray-300"
                  />
                  {/* Color & Size */}
                  <div className=" gap-6 mt-3">
                    {/* Color */}
                    <div
                      className="w-5 h-5 ms-1 border border-gray-400"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    {/* Size */}
                    <p className="py-1 text-base font-medium ps-2">
                      {item.size}
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className=" mt-2 ms-1 me-6">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className=" text-lg font-semibold">${item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex justify-center items-center mt-3 gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                    className="border px-3 py-1 text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                    className="border px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="border border-gray-300 p-6 h-96 mt-12">
          <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>
          <div className="space-y-2 pb-12">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>
                TOTAL <span className="text-gray-500 text-sm">(TAX INCL.)</span>{" "}
              </span>
              <span>${total}</span>
            </div>
          </div>

          {/* Continue Button */}
          <button className="w-full bg-gray-1000 text-white py-3 font-medium mt-4 hover:bg-gray-900">
            <Link to={"/Checkout"}>CONTINUE</Link>
          </button>
        </div>
      </div>
    </>
  );
}
