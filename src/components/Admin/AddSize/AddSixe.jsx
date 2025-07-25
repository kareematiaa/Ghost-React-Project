import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductService from "../../../Services/ProductService";

export default function AddSize() {
  const [allSizes, setAllSizes] = useState([]);
  const [loadingSizes, setLoadingSizes] = useState(true);
  const [status, setStatus] = useState({ success: "", error: "" });

  const fetchAllSizes = async () => {
    try {
      const response = await ProductService.GetAllSizes();
      setAllSizes(response.result);
    } catch (error) {
      setStatus({ success: "", error: error.message });
    } finally {
      setLoadingSizes(false);
    }
  };

  useEffect(() => {
    fetchAllSizes();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Size name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await ProductService.AddSize(values);
        setStatus({ success: "Size added successfully!", error: "" });
        resetForm();
        fetchAllSizes(); // Refresh list
      } catch (error) {
        setStatus({ success: "", error: error.message });
      }
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add Product Size</h2>

      {status.success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {status.success}
        </div>
      )}
      {status.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {status.error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded-md ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter size name (e.g. S, M, L)"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
        >
          Add Size
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Available Sizes</h3>
        {loadingSizes ? (
          <p className="text-gray-500">Loading sizes...</p>
        ) : allSizes.length === 0 ? (
          <p className="text-gray-500">No sizes found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allSizes.map((size) => (
              <div
                key={size.id}
                className="bg-white border p-3 rounded-lg shadow text-center"
              >
                <span className="text-gray-800 font-medium">{size.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
