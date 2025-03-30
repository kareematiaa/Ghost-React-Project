import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";

export default function ProductDetails() {
  const images = [model1, model2, model1, model2];

  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const colors = ["black", "gray", "white", "blue", "green"];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20 max-w-5xl mx-auto ">
        {/* Left - Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnail List */}
          <div className="flex md:flex-col gap-2 overflow-x-auto ms-12 md:ms-0 lg:ms-0 pt-6 md:overflow-visible">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-20 object-cover cursor-pointer border-2 ${
                  selectedImage === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex justify-center  w-full">
            <img
              src={selectedImage}
              alt="Product"
              className="w-full max-w-[400px] h-96 object-cover"
            />
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="space-y-6 border border-gray-300 p-9">
          <h1 className="text-2xl font-semibold">ABSTRACT PRINT SHIRT</h1>
          <p className="text-lg font-medium">$99</p>
          <p className="text-gray-500">MRP incl. of all taxes</p>
          <p className="text-gray-700">
            Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.
          </p>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Color</h3>
            <div className="flex gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8  cursor-pointer ${
                    selectedColor === color
                      ? "border border-black"
                      : "border border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="pb-10">
            <h3 className="font-medium text-gray-700 mb-2">Size</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`border px-4 py-2 text-sm ${
                    selectedSize === size
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-gray-1000 text-white py-3 font-medium ">
            ADD
          </button>
        </div>
      </div>
    </>
  );
}
