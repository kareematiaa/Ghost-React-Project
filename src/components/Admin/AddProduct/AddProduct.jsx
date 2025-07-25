import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductService from "../../../Services/ProductService";
import { useNavigate } from "react-router-dom";

// Validation Schema
const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name too long")
    .required("Product name is required"),
  price: Yup.number()
    .min(0.01, "Price must be greater than 0")
    .required("Price is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  categoryId: Yup.string().required("Category is required"),
});

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      categoryId: "",
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const resp = await ProductService.AddProduct(values);
        console.log("Product added successfully:", resp);
        setSubmitSuccess(true);
        resetForm();
        setTimeout(() => setSubmitSuccess(false), 3000);
        navigate("/Admin/AddProductColor", {
          state: { productId: resp.result.id },
        });
      } catch (error) {
        console.error("Error submitting product:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const getCategories = async () => {
    try {
      const response = await ProductService.GetAllCategories();
      setCategories(response.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Enter product name"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
            placeholder="Enter price"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 ${
              formik.touched.price && formik.errors.price
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.price}
            </div>
          ) : null}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            placeholder="Enter product description"
            rows={4}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        {/* Category Dropdown */}
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryId}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 ${
              formik.touched.categoryId && formik.errors.categoryId
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.categoryId}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty || isSubmitting}
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition ${
              !formik.isValid || !formik.dirty || isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitting ? "Loading..." : "Add Color"}
          </button>
        </div>
      </form>
    </div>
  );
}
