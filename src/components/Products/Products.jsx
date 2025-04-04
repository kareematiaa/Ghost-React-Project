import React, { useState, useEffect, useRef } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductService from "../../Services/ProductService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productsRef = useRef(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (productsRef.current) {
        productsRef.current.scrollTop = window.scrollY; // Save scroll position
      }
      const data = await ProductService.GetAllProducts({
        page: 1,
        pageSize: 20,
      });
      setProducts(data.result);
      // console.log("products", data.result.data);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="mt-32 px-20 ">
        <main className="w-full">
          <h2 className="text-2xl mb-8 text-blue-1000 block font-semibold cursor-pointer">
            Products
          </h2>
          <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
