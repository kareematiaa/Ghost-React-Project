import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductService from "../../../Services/ProductService";

const variantSchema = Yup.object().shape({
  productId: Yup.string().required("Product ID is required"),
  colorId: Yup.string().required("Color is required"),
  availableSizes: Yup.array()
    .of(
      Yup.object().shape({
        sizeId: Yup.string().required("Size is required"),
        quantityAvailable: Yup.number()
          .min(0, "Quantity must be 0 or more")
          .required("Quantity is required"),
        isActive: Yup.boolean().default(true),
      })
    )
    .min(1, "At least one size is required")
    .test("unique-sizes", "Duplicate sizes are not allowed", function (value) {
      const sizeIds = value.map((item) => item.sizeId);
      return new Set(sizeIds).size === sizeIds.length;
    }),
});

export default function AddVariant({ productId }) {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      productId: productId,
      colorId: "",
      availableSizes: [
        {
          sizeId: "",
          quantityAvailable: 0,
          isActive: true,
        },
      ],
    },
    validationSchema: variantSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await ProductService.AddVariant(values);
        setSubmitSuccess(true);
        formik.resetForm();
        setTimeout(() => setSubmitSuccess(false), 3000);
      } catch (error) {
        console.error("Error submitting variant:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colorsResponse = await ProductService.GetAllColors();
        const sizesResponse = await ProductService.GetAllSizes();
        setColors(colorsResponse.result);
        setSizes(sizesResponse.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Get available sizes that haven't been selected yet
  const getAvailableSizes = (currentIndex) => {
    return sizes.filter((size) => {
      // Keep size if:
      // 1. It's the currently selected size for this row (so we don't unselect it)
      // 2. OR it hasn't been selected in any other row
      return (
        size.id === formik.values.availableSizes[currentIndex].sizeId ||
        !formik.values.availableSizes.some(
          (item, idx) => idx !== currentIndex && item.sizeId === size.id
        )
      );
    });
  };

  const addSizeRow = () => {
    formik.setFieldValue("availableSizes", [
      ...formik.values.availableSizes,
      {
        sizeId: "",
        quantityAvailable: 0,
        isActive: true,
      },
    ]);
  };

  const removeSizeRow = (index) => {
    const newSizes = [...formik.values.availableSizes];
    newSizes.splice(index, 1);
    formik.setFieldValue("availableSizes", newSizes);
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formik.values.availableSizes];
    newSizes[index][field] = value;
    formik.setFieldValue("availableSizes", newSizes);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add Product Variant</h2>

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Variant added successfully!
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input type="hidden" name="productId" value={formik.values.productId} />

        {/* Color Selection */}
        <div>
          <label
            htmlFor="colorId"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <select
            id="colorId"
            name="colorId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.colorId}
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 ${
              formik.touched.colorId && formik.errors.colorId
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
          {formik.touched.colorId && formik.errors.colorId ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.colorId}
            </div>
          ) : null}
        </div>

        {/* Available Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Sizes
          </label>

          {formik.values.availableSizes.map((size, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 mb-3 items-end">
              {/* Size Selection */}
              <div className="col-span-5">
                <select
                  name={`availableSizes[${index}].sizeId`}
                  value={size.sizeId}
                  onChange={(e) =>
                    handleSizeChange(index, "sizeId", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  className={`block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 ${
                    formik.touched.availableSizes?.[index]?.sizeId &&
                    formik.errors.availableSizes?.[index]?.sizeId
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Size</option>
                  {getAvailableSizes(index).map((sizeOption) => (
                    <option key={sizeOption.id} value={sizeOption.id}>
                      {sizeOption.name}
                    </option>
                  ))}
                </select>
                {formik.touched.availableSizes?.[index]?.sizeId &&
                formik.errors.availableSizes?.[index]?.sizeId ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.availableSizes[index].sizeId}
                  </div>
                ) : null}
              </div>

              {/* Quantity Available */}
              <div className="col-span-4">
                <input
                  type="number"
                  name={`availableSizes[${index}].quantityAvailable`}
                  value={size.quantityAvailable}
                  onChange={(e) =>
                    handleSizeChange(
                      index,
                      "quantityAvailable",
                      parseInt(e.target.value) || 0
                    )
                  }
                  onBlur={formik.handleBlur}
                  min="0"
                  className={`block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-300 ${
                    formik.touched.availableSizes?.[index]?.quantityAvailable &&
                    formik.errors.availableSizes?.[index]?.quantityAvailable
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.availableSizes?.[index]?.quantityAvailable &&
                formik.errors.availableSizes?.[index]?.quantityAvailable ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.availableSizes[index].quantityAvailable}
                  </div>
                ) : null}
              </div>

              {/* Remove Button */}
              <div className="col-span-3">
                {formik.values.availableSizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSizeRow(index)}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Size Button - Disabled if all sizes are already selected */}
          <button
            type="button"
            onClick={addSizeRow}
            disabled={formik.values.availableSizes.length >= sizes.length}
            className={`mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition text-sm ${
              formik.values.availableSizes.length >= sizes.length
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            + Add Another Size
          </button>

          {/* Array-level validation error */}
          {typeof formik.errors.availableSizes === "string" ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.availableSizes}
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
            {isSubmitting ? "Adding Variant..." : "Add Variant"}
          </button>
        </div>
      </form>
    </div>
  );
}
