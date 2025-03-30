import React, { useState } from "react";
import { GoTrash } from "react-icons/go";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const [wishlistItems, setWishlisttems] = useState([
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
    {
      id: 2,
      name: "Basic Slim Fit T-Shirt",
      price: 99,
      image: model2,
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
      size: "M",
      quantity: 1,
    },
    {
      id: 2,
      name: "Basic Slim Fit T-Shirt",
      price: 99,
      image: model2,
      color: "black",
      size: "S",
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

  const handleRemove = (id) => {
    setWishlisttems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="p-12 ">
        {/* Left Section - Shopping Bag */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4 uppercase">Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg flex flex-col my-5"
              >
                {/* Remove Icon */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-9 text-gray-500 hover:text-red-500"
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
                  <button className="border px-3 py-1 text-lg">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
