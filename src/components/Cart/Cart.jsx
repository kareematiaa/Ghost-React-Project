import React, { useState, useEffect, useRef } from "react";
import styles from "./Cart.module.css";
import { GoTrash } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import CartService from "../../Services/CartService";
import { useAuth } from "../../context/AuthContext"; // Assuming you have a UserContext
import { toast } from "react-hot-toast";

export default function Cart() {
  const { userId } = useAuth(); // Get customer ID from context
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productsRef = useRef(null);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    if (!userId) return;

    if (productsRef.current) {
      productsRef.current.scrollTop = window.scrollY; // Save scroll position
    }

    try {
      setLoading(true);
      const response = await CartService.GetCartItems({
        customerId: userId,
      });

      if (response.isSuccess && response.result) {
        // Transform API response to match your component's expected format
        const transformedItems = response.result.map((item) => ({
          id: item.productVariantId, // or create a unique ID if needed
          name: item.productName,
          price: item.price,
          image: item.imageUrl,
          color: item.color,
          size: item.sizeName,
          quantity: item.quantity,
          availableStock: item.availableStock,
          // Include any additional fields you need
          productId: item.productId,
          sizeId: item.sizeId,
        }));

        setCartItems(transformedItems);
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart items from API
  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const handleQuantityChange = async (productVariantId, sizeId, changeType) => {
    try {
      // Find the item being updated
      const itemToUpdate = cartItems.find(
        (item) => item.id === productVariantId && item.sizeId === sizeId
      );
      console.log(cartItems);

      if (!itemToUpdate) return;

      // Calculate new quantity
      let newQuantity = itemToUpdate.quantity;
      if (changeType === "increase") {
        // Check available stock before increasing
        if (itemToUpdate.quantity >= itemToUpdate.availableStock) {
          toast.error("Cannot exceed available stock");
          return;
        }
        newQuantity++;
      } else {
        // Don't allow quantity below 1
        if (itemToUpdate.quantity <= 1) return;
        newQuantity--;
      }

      // Optimistic UI update
      setCartItems((prev) =>
        prev.map((item) =>
          item.productVariantId === productVariantId && item.sizeId === sizeId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

      // API call to update quantity
      const resp = await CartService.ChangeItemQuantity(
        userId,
        productVariantId,
        sizeId,
        newQuantity
      );

      toast.success("Quantity updated");
      fetchCartItems(); // Refresh cart items after update
      console.log("Quantity updated successfully" + resp.result);
    } catch (error) {
      console.log(error);

      toast.error("Failed to update quantity");
      // Revert on error
      fetchCartItems();
    }
  };

  const handleRemove = async (productVariantId, sizeId) => {
    try {
      // Call API to remove
      await CartService.RemoveItemFromCart(userId, productVariantId, sizeId);
      toast.success("Item removed from cart");
      fetchCartItems(); // Refresh cart items after removal
    } catch (error) {
      toast.error(error || "Failed to remove item");
    }
  };

  // Calculate totals using useMemo for performance
  const { subtotal, totalItems } = React.useMemo(() => {
    return cartItems.reduce(
      (acc, item) => ({
        subtotal: acc.subtotal + item.price * item.quantity,
        totalItems: acc.totalItems + item.quantity,
      }),
      { subtotal: 0, totalItems: 0 }
    );
  }, [cartItems]);

  const total = subtotal;

  if (loading)
    return <div className="p-6 max-w-6xl mx-auto">Loading cart...</div>;
  if (error) return <div className="p-6 max-w-6xl mx-auto">Error: {error}</div>;

  if (!userId) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="mb-5">Please login to view your cart</p>
        <Link
          to="/Login"
          className="px-4 py-2 bg-gray-1000 text-white rounded-2xl text-sm "
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Left Section - Shopping Bag */}
      <div className="md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">SHOPPING BAG</h2>
        {cartItems.length === 0 ? (
          <div>
            <p className="text-gray-500 ">Your cart is empty</p>
            <Link to="/products" className="text-dark-1000 underline mt-5">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.sizeId}`}
                className="rounded-lg flex flex-col my-5 relative"
              >
                {/* Remove Icon */}
                <button
                  onClick={() => handleRemove(item.id, item.sizeId)}
                  className="absolute top-2 right-7 text-gray-500 hover:text-red-500"
                >
                  <GoTrash size={20} />
                </button>

                <div className="flex">
                  {/* Image */}
                  <img
                    src={item.image || "/placeholder-image.jpg"} // Add a fallback image
                    alt={item.name}
                    className="w-full h-64 object-cover rounded-lg border border-gray-300"
                  />
                  {/* Color & Size */}
                  <div className="gap-6 mt-3">
                    {/* Color */}
                    <div
                      className="w-5 h-5 ms-1 border border-gray-400"
                      style={{
                        backgroundColor:
                          item.color.toLowerCase() === "red"
                            ? "#ff0000"
                            : item.color.toLowerCase() === "black"
                            ? "#000"
                            : item.color.toLowerCase() === "blue"
                            ? "#0000ff"
                            : "#ccc",
                      }}
                    ></div>
                    {/* Size */}
                    <p className="py-1 text-base font-medium ps-2">
                      {item.size}
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="mt-2 ms-1 me-6">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-lg font-semibold">${item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex justify-center items-center mt-3 gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.sizeId, "decrease")
                    }
                    className="border px-3 py-1 text-lg disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.sizeId, "increase")
                    }
                    className="border px-3 py-1 text-lg disabled:opacity-50"
                    disabled={item.quantity >= item.availableStock}
                  >
                    +
                  </button>
                  {item.quantity >= item.availableStock && (
                    <span className="text-xs text-red-500">Max available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section - Order Summary */}
      {cartItems.length > 0 && (
        <div className="border border-gray-300 p-6 h-80 mt-12">
          <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>
          <div className="space-y-2 pb-12">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>
                TOTAL <span className="text-gray-500 text-sm">(TAX INCL.)</span>
              </span>
              <span>${total}</span>
            </div>
          </div>

          {/* Continue Button */}
          <Link to={"/Checkout"}>
            <button className="w-full bg-gray-1000 text-white py-3 font-medium mt-4 ">
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
