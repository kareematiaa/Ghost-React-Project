import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductService from "../../../Services/ProductService"; // adjust path

export default function AddColor() {
  const [allColors, setAllColors] = useState([]);
  const [loadingColors, setLoadingColors] = useState(true);

  const fetchAllColors = async () => {
    try {
      const response = await ProductService.GetAllColors(); // your service
      setAllColors(response.result); // assuming APIResponse.result holds array
    } catch (error) {
      console.error("Failed to fetch colors:", error.message);
    } finally {
      setLoadingColors(false);
    }
  };

  useEffect(() => {
    fetchAllColors();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Color name is required"),
      color: Yup.string()
        .matches(/^#([0-9A-F]{3}){1,2}$/i, "Invalid color hex code")
        .required("Color hex code is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting, setStatus }) => {
      try {
        setStatus(null);
        await ProductService.AddColor(values); // ✅ Use the service method
        setStatus({ success: "Color added successfully!" });
        resetForm();
        fetchAllColors(); // Refresh color list
      } catch (error) {
        setStatus({ error: error.message || "Failed to add color." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Color
      </h2>

      {formik.status?.success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {formik.status.success}
        </div>
      )}
      {formik.status?.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {formik.status.error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Color Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            className={`w-full p-2 border rounded-md ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Color Hex */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Color (Hex Code)
          </label>
          <input
            type="text"
            name="color"
            placeholder="#ff0000"
            className={`w-full p-2 border rounded-md ${
              formik.touched.color && formik.errors.color
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.color && formik.errors.color && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.color}</p>
          )}

          {/* Optional: live preview of color */}
          {formik.values.color &&
            /^#([0-9A-F]{3}){1,2}$/i.test(formik.values.color) && (
              <div
                className="w-full h-10 mt-2 rounded-md border border-gray-300"
                style={{ backgroundColor: formik.values.color }}
              ></div>
            )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
              !formik.isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {formik.isSubmitting ? "Saving..." : "Add Color"}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Available Colors</h3>
        {loadingColors ? (
          <p className="text-gray-500">Loading colors...</p>
        ) : allColors.length === 0 ? (
          <p className="text-gray-500">No colors found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allColors.map((color) => (
              <div
                key={color.id}
                className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow border"
              >
                <div
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: color.color }}
                />
                <span className="text-gray-800 font-medium">{color.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
