import React, { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";
import { Link } from "react-router-dom";
import ProductService from "../../Services/ProductService";

export default function Home() {
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
        pageSize: 4,
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
      <div className="w-full text-black px-6 md:px-12">
        {/* New Collection Section */}
        <section className="my-20 lg:mt-40 lg:mb-10 ">
          <div className="grid grid-cols-3 gap-x-10">
            <div className="relative">
              <h2 className="text-lg lg:text-4xl md:text-3xl font-bold uppercase">
                New Collection
              </h2>
              <p className="text-base lg:text-lg text-gray-500">Summer</p>
              <p className="text-gray-500 pb-8">2025</p>
              <div className=" flex items-end">
                <Link to={"/Products"}>
                  <button className="absolute lg:bottom-64 flex items-center w-28 h-7 lg:w-1/2 lg:h-10 text-xs lg:text-base font-semibold gap-2 bg-gray-20 text-gray-1000 py-1 px-2 lg:px-8">
                    Go To Shop
                    <span className="ml-2">→</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="">
              <img
                src={model1}
                alt="Model 1"
                className="w-full h-3/5 object-cover"
              />
            </div>

            <div className="">
              <img
                src={model2}
                alt="Model 2"
                className="w-full h-3/5 object-cover"
              />
            </div>
          </div>
        </section>

        {/* New This Week Section */}
        <section className="mb-48">
          <div className="flex justify-between items-center">
            <h2 className="text-lg lg:text-4xl md:text-3xl  font-bold uppercase">
              New This Week
            </h2>
            <Link
              to={"/Products"}
              className="text-gray-500 text-base lg:text-lg"
            >
              See All
            </Link>
          </div>
          <p className="text-lg text-gray-500">(50)</p>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6">
            {/* Product Card */}
            {products.slice(0, 4).map((product, index) => (
              <div key={index} className="">
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 mb-10">
          <h2 className="text-lg lg:text-4xl md:text-3xl  font-medium uppercase text-center">
            Our Approach to fashion design
          </h2>
          <p className="text-lg text-gray-800 text-center mt-4 px-10 md:px-32 lg:px-64">
            Ghost? It is a commercial brand specialized in providing
            high-quality T-shirts with designs that combine simplicity, elegance
            and distinction. We draw our philosophy from the idea of ​​​​"quiet
            presence", pieces that do not need exaggeration to attract
            attention. We rely on carefully selected materials and studied
            designs to reflect the personality of the wearer with calm and
            confidence. At Ghost, we believe that true elegance lies in the
            details and that self-expression does not need noise.
          </p>
        </section>

        <section className="my-16 lg:my-36">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div>
              <img src={model1} className="w-full h-96 object-cover" />
            </div>
            <div className="mt-32">
              <img src={model2} className="w-full h-96 object-cover " />
            </div>
            <div>
              <img src={model1} className="w-full h-96 object-cover" />
            </div>
          </div>
        </section>
      </div>
      <footer className="h-10 bg-gray-1000 text-white "></footer>
    </>
  );
}
