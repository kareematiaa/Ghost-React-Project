import React, { useState, useEffect } from "react";
import { GoTrash } from "react-icons/go";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";
import { Link } from "react-router-dom";
import WishlistService from "../../Services/WishlistService";
import { useAuth } from "../../context/AuthContext"; // Assuming you have a UserContext
import { toast } from "react-hot-toast";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth(); // Get customer ID from context

  const fetchWishlistItems = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await WishlistService.GetWishlistItems({
        customerId: userId,
      });

      if (response.isSuccess && response.result) {
        setWishlistItems(response.result);
        console.log(response);
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to load wishlist items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, [userId]);

  const handleRemove = async (productId) => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await WishlistService.DeleteItemFromWishlist(
        userId,
        productId
      );
      toast.success("Item removed from wishlist successfully");
      console.log(response.data);
      fetchWishlistItems(); // Refresh the wishlist items after removal
    } catch (error) {
      setError(error.message);
      toast.error("Failed to load wishlist items");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="p-12 ">
        {/* Left Section - Shopping Bag */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4 uppercase">Wishlist</h2>
          {wishlistItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-gray-500">Your wishlist is empty.</p>
              <Link to="/products" className="text-dark-1000 underline mt-5">
                Browse Products
              </Link>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg flex flex-col my-5"
              >
                {/* Remove Icon */}
                <button
                  onClick={() => handleRemove(item.productId)}
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
                    <h3 className="font-semibold">{item.productName}</h3>
                    <p className=" text-lg font-semibold">${item.price}</p>
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
