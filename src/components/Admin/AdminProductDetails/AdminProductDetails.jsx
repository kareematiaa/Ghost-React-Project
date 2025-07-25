import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../../Services/ProductService";
import { GoTrash, GoPlus } from "react-icons/go";
import { FiEdit } from "react-icons/fi";

export default function AdminProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const fetchProductDetails = async () => {
    try {
      let data = await ProductService.GetProductDetails({ productId });
      setProduct(data.result);
      console.log(data.result);

      if (data.result.productVariants?.length > 0) {
        setSelectedVariant(data.result.productVariants[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleDeleteVariant = async (variantId) => {
    if (window.confirm("Delete this variant and all its images?")) {
      try {
        await ProductService.DeleteProductVariant(variantId);
        await fetchProductDetails();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await ProductService.DeleteProductVariantImage(imageId);
      await fetchProductDetails(); // Refresh product details after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddVariant = () => {
    navigate(`/Admin/AddProductColor`, { state: { productId } });
  };

  const handleAddImage = (variantId) => {
    navigate(`/Admin/AddProductImage`, {
      state: { productVariantId: variantId },
    });
  };

  const handleDeleteProduct = async () => {
    try {
      await ProductService.DeleteProduct(productId);
      // Refresh the product list after deletion
      await fetchProductDetails();
      navigate("/Admin/AdminProducts");
    } catch (err) {
      setError(err.message);
      console.error("Error deleting product:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      {/* Product Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <button
          onClick={handleDeleteProduct}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <FiEdit /> Delete Product
        </button>
      </div>

      {/* Main Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Primary Image */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
          <img
            src={product.primaryImage || "/placeholder-image.jpg"}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Description</h3>
              <p className="mt-1">{product.description}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Price</h3>
              <p className="mt-1">${product.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Variants Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Product Variants</h2>
          <button
            onClick={handleAddVariant}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            <GoPlus /> Add Variant
          </button>
        </div>

        {product.productVariants?.length > 0 ? (
          <div className="space-y-6">
            {product.productVariants.map((variant) => (
              <div
                key={variant.id}
                className={`border rounded-lg p-4 ${
                  selectedVariant === variant.id
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{
                        backgroundColor: variant.colorName,
                      }}
                      title={variant.colorName}
                    ></div>
                    <h3 className="font-medium">
                      {variant.colorName || "No Color"}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDeleteVariant(variant.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete variant"
                  >
                    <GoTrash size={18} />
                  </button>
                </div>

                {/* Variant Images */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Images</h4>
                    <button
                      onClick={() => handleAddImage(variant.id)}
                      className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700"
                    >
                      <GoPlus size={14} /> Add Image
                    </button>
                  </div>

                  {variant.productImages?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {variant.productImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt={`Variant ${variant.colorName}`}
                            className="w-full h-24 object-cover rounded border border-gray-200"
                          />
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete image"
                          >
                            <GoTrash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No images added yet</p>
                  )}
                </div>

                {/* Available Sizes */}
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Available Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {variant.availableSizes?.map((size) => (
                      <div
                        key={size.name}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {size.name}: {size.quantityAvailable}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No variants added yet</p>
            <button
              onClick={handleAddVariant}
              className="mt-4 text-blue-500 hover:text-blue-700 font-medium"
            >
              Add your first variant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
