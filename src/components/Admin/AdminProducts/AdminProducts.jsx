import React from "react";
import model2 from "../../../assets/model2.png";
import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout/AdminLayout";

export default function AdminProducts() {
  return (
    <>
      <div className="pt-20">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="hidden lg:block text-base lg:text-xl ">
              All Your Products
            </p>
          </div>
          <div>
            <button className="border px-4 lg:px-8 py-1 lg:py-2 text-white text-base lg:text-lg bg-gray-1000 rounded-2xl">
              Add New Product
            </button>
          </div>
        </div>

        {/* Your products content goes here */}
        <div className="bg-white p-4 rounded shadow">
          {/* Products list or table */}
        </div>
      </div>
    </>
  );
}
