import React, { useState, useEffect, useRef } from "react";
import model2 from "../../../assets/model2.png";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../../../Services/ProductService";
import { GoTrash } from "react-icons/go";

export default function AdminProducts() {
  const [productsItems, setProductsItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productsRef = useRef(null);
  const navigate = useNavigate();

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
      setProductsItems(data.result);
      console.log("products", data.result.data);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await ProductService.DeleteProduct(productId);
      // Refresh the product list after deletion
      await fetchProducts();
    } catch (err) {
      setError(err.message);
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
            <Link to="/Admin/AddProduct">
              <button className="border px-4 lg:px-8 py-1 lg:py-2 text-white text-base lg:text-lg bg-gray-1000 rounded-2xl">
                Add New Product
              </button>
            </Link>
          </div>
        </div>

        {/* Your products content goes here */}
        <div className="bg-white p-4 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productsItems.map((item) => (
              <div
                key={`${item.id}-${item.sizeId}`}
                className=" rounded-lg flex flex-col my-5 relative group" // Added 'group' class
              >
                <div className="flex">
                  {/* Image */}
                  <div className=" w-full">
                    <button
                      onClick={() => handleDeleteProduct(item.productId)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <GoTrash size={20} />
                    </button>
                    <img
                      src={item.image || "/placeholder-image.jpg"} // Add a fallback image
                      alt={item.name}
                      className="w-full h-64 object-cover rounded-lg border border-gray-300"
                      onClick={() =>
                        navigate(`/Admin/ProductDetails/${item.productId}`)
                      }
                    />
                  </div>

                  {/* Color & Size */}
                  <div className="gap-6 mt-3">
                    {/* Color */}
                    <div className=" gap-2 mt-6 ">
                      {item.colors?.map((color, index) => (
                        <div
                          key={index}
                          className="w-5 h-5 mt-2 border border-gray-400 rounded-full"
                          style={{ backgroundColor: color }}
                          title={color}
                        ></div>
                      ))}
                    </div>
                    {/* Size */}
                    <p className="py-1 text-base font-medium ps-2">
                      {item.size}
                    </p>
                  </div>
                </div>

                <div className="mt-2 ms-1 me-6">
                  <div className="flex justify-between">
                    <h3
                      className="font-semibold"
                      onClick={() =>
                        navigate(`/Admin/ProductDetails/${item.productId}`)
                      }
                    >
                      {item.name}
                    </h3>
                    <p className="text-lg font-semibold">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
