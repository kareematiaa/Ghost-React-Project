import React, { useState, useEffect, useMemo, useContext } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

import ProductService from "../../Services/ProductService";
import CartService from "../../Services/CartService";
import { useAuth } from "../../context/AuthContext"; // Assuming you have a UserContext
import { FaRegHeart } from "react-icons/fa";
import WishlistService from "../../Services/WishlistService";

export default function ProductDetails() {
  const { userId } = useAuth(); // Get customer ID from context
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get("id");

  // Get unique colors from product variants
  const colors = useMemo(() => {
    if (!productData?.productVariants) return [];
    return productData.productVariants.map((variant) => variant.colorName);
  }, [productData]);

  // Get available sizes for selected color variant
  const availableSizes = useMemo(() => {
    if (!selectedColor || !productData?.productVariants) return [];
    const variant = productData.productVariants.find(
      (v) => v.colorName === selectedColor
    );
    return variant?.availableSizes || [];
  }, [selectedColor, productData]);

  // Get images for selected color variant
  const variantImages = useMemo(() => {
    if (!selectedColor || !productData?.productVariants) return [];
    const variant = productData.productVariants.find(
      (v) => v.colorName === selectedColor
    );
    return variant?.productImages?.map((img) => img.url) || [];
  }, [selectedColor, productData]);

  // Get current variant based on selected color
  const selectedVariant = useMemo(() => {
    if (!selectedColor || !productData?.productVariants) return null;
    return productData.productVariants.find(
      (v) => v.colorName === selectedColor
    );
  }, [selectedColor, productData]);

  const getProductDetails = async () => {
    setLoading(true);
    try {
      let resp = await ProductService.GetProductDetails({ productId });
      if (resp.isSuccess && resp.result) {
        setProductData(resp.result);
        // Set initial selected color to first available color
        if (resp.result.productVariants?.length > 0) {
          setSelectedColor(resp.result.productVariants[0].colorName);
        }
      }
    } catch (error) {
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) getProductDetails();
  }, [productId]);

  // Update selected image when variant images change
  useEffect(() => {
    if (variantImages.length > 0) {
      setSelectedImage(variantImages[0]);
    }
  }, [variantImages]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setSelectedSizeId(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size.name);
    setSelectedSizeId(size.sizeId);
  };

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (availableSizes.length > 0 && !selectedSizeId) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    setAddingToCart(true);
    try {
      const resp = await CartService.AddToCart(
        userId,
        selectedVariant.id,
        availableSizes.length > 0 ? selectedSizeId : null,
        1 // Default quantity
      );
      console.log(resp);
      if (resp.isSuccess == false) {
        toast.error(resp.errorMessages);
        return;
      }
      toast.success("Item added to cart successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to add item to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!userId) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    setAddingToWishlist(true);
    try {
      const resp = await WishlistService.AddToWishlist(userId, productId);
      console.log(resp);
      if (resp.isSuccess == false) {
        toast.error(resp.errorMessages);
        return;
      }
      toast.success("Item added to wishlist successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to add item to wishlist");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20 max-w-5xl mx-auto">
      {/* Left - Image Gallery */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnail List */}
        {variantImages.length > 0 && (
          <div className="flex md:flex-col gap-2 overflow-x-auto ms-12 md:ms-0 lg:ms-0 pt-6 md:overflow-visible">
            {variantImages.map((img, index) => (
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
        )}
        {/* Main Image */}
        <div className="flex justify-center w-full">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Product"
              className="w-full max-w-[400px] h-96 object-cover"
            />
          ) : (
            <div className="w-full max-w-[400px] h-96 bg-gray-200 flex items-center justify-center">
              No image available
            </div>
          )}
        </div>
      </div>

      {productData && (
        <div className="relative space-y-6 border border-gray-300 p-9">
          <div
            onClick={handleAddToWishlist}
            className="absolute top-0 right-0 p-1 md:p-2 lg:p-2 bg-white cursor-pointer"
          >
            <FaRegHeart className="text-dark mx-0.5 mt-0.5 text-xs md:text-base lg:text-lg " />
          </div>

          <h1 className="text-2xl font-semibold">{productData.name}</h1>
          <p className="text-lg font-medium">${productData.price}</p>
          <p className="text-gray-500">{productData.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Color</h3>
            <div className="flex gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full cursor-pointer ${
                    selectedColor === color
                      ? "border-2 border-black"
                      : "border border-gray-300"
                  }`}
                  style={{
                    backgroundColor:
                      color.toLowerCase() === "white"
                        ? "#fff"
                        : color.toLowerCase() === "black"
                        ? "#000"
                        : color.toLowerCase() === "red"
                        ? "#ff0000"
                        : color.toLowerCase() === "blue"
                        ? "#0000ff"
                        : color.toLowerCase() === "green"
                        ? "#008000"
                        : "#ccc",
                    borderColor: selectedColor === color ? "#000" : "#d1d5db",
                  }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection - Only show if sizes available for selected color */}
          {availableSizes.length > 0 && (
            <div className="pb-10">
              <h3 className="font-medium text-gray-700 mb-2">Size</h3>
              <div className="flex gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size.sizeId}
                    className={`border px-4 py-2 text-sm ${
                      selectedSize === size.name
                        ? "border-black bg-gray-100"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              {/* {availableSizes.length > 0 && !selectedSize && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a size
                </p>
              )} */}
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            className="w-full bg-gray-1000 text-white py-3 font-medium disabled:bg-gray-400"
            onClick={handleAddToCart}
          >
            {addingToCart ? "Adding..." : "ADD TO CART"}
          </button>
        </div>
      )}
    </div>
  );
}
