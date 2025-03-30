import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function Products() {
  return (
    <>
      <div className="mt-32 px-20 ">
        <main className="w-full">
          <h2 className="text-2xl mb-8 text-blue-1000 block font-semibold cursor-pointer">
            Products
          </h2>
          <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </main>
      </div>
    </>
  );
}
