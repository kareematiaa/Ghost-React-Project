import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductService from "../../../Services/ProductService";
import { useLocation, useNavigate } from "react-router-dom";

const variantSchema = Yup.object().shape({
  variants: Yup.array()
    .of(
      Yup.object().shape({
        productId: Yup.string().required("Product ID is required"),
        quantity: Yup.number() // Add this validation
          .min(0, "Quantity must be 0 or more")
          .required("Quantity is required"),
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
          .test(
            "unique-colors",
            "Duplicate colors are not allowed",
            function (value) {
              const colorIds = value.map((variant) => variant.colorId);
              // Check if all colors are unique (excluding empty selections)
              const nonEmptyColors = colorIds.filter((id) => id !== "");
              return new Set(nonEmptyColors).size === nonEmptyColors.length;
            }
          ),
      })
    )
    .min(1, "At least one variant is required"),
});

export default function AddVariant() {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdVariants, setCreatedVariants] = useState([]);
  const location = useLocation();
  const { productId } = location.state || {};
  const navigate = useNavigate();

  const getAvailableColors = (currentVariantIndex) => {
    return colors.filter((color) => {
      // Keep color if:
      // 1. It's the currently selected color for this variant
      // 2. OR it hasn't been selected in any other variant
      return (
        color.id === formik.values.variants[currentVariantIndex].colorId ||
        !formik.values.variants.some(
          (variant, idx) =>
            idx !== currentVariantIndex && variant.colorId === color.id
        )
      );
    });
  };

  const formik = useFormik({
    initialValues: {
      variants: [
        {
          productId: productId || "",
          quantity: "",
          colorId: "",
          availableSizes: [
            {
              sizeId: "",
              quantityAvailable: "",
              isActive: true,
            },
          ],
        },
      ],
    },
    validationSchema: variantSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        console.log(values);
        const response = await ProductService.AddVariant(values);

        setCreatedVariants(response.result);
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
        console.log("Variants added successfully:", response.result);
      } catch (error) {
        console.error("Error submitting variants:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    validateOnMount: true,
    validateOnChange: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [colorsResponse, sizesResponse] = await Promise.all([
          ProductService.GetAllColors(),
          ProductService.GetAllSizes(),
        ]);
        setColors(colorsResponse.result);
        setSizes(sizesResponse.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Variant management functions
  const addVariant = () => {
    formik.setFieldValue("variants", [
      ...formik.values.variants,
      {
        productId: productId,
        quantity: "",
        colorId: "",
        availableSizes: [
          {
            sizeId: "",
            quantityAvailable: "",
            isActive: true,
          },
        ],
      },
    ]);
  };

  const removeVariant = (variantIndex) => {
    const newVariants = [...formik.values.variants];
    newVariants.splice(variantIndex, 1);
    formik.setFieldValue("variants", newVariants);
  };

  // Size management functions
  const addSizeRow = (variantIndex) => {
    const newVariants = [...formik.values.variants];
    newVariants[variantIndex].availableSizes.push({
      sizeId: "",
      quantityAvailable: 0,
      isActive: true,
    });
    formik.setFieldValue("variants", newVariants);
  };

  const removeSizeRow = (variantIndex, sizeIndex) => {
    const newVariants = [...formik.values.variants];
    newVariants[variantIndex].availableSizes.splice(sizeIndex, 1);
    formik.setFieldValue("variants", newVariants);
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const newVariants = [...formik.values.variants];
    newVariants[variantIndex].availableSizes[sizeIndex][field] = value;
    formik.setFieldValue("variants", newVariants);
  };

  const handleVariantChange = (variantIndex, field, value) => {
    const newVariants = [...formik.values.variants];
    newVariants[variantIndex][field] = value;
    formik.setFieldValue("variants", newVariants);
  };

  const navigateToImageUpload = (variantId) => {
    navigate("/Admin/AddProductImage", {
      state: { productVariantId: variantId },
    });
  };

  const canAddMoreVariants = () => {
    // If no colors loaded yet, disable button
    if (colors.length === 0) return false;

    const selectedColorIds = formik.values.variants
      .map((v) => v.colorId)
      .filter((id) => id !== "");

    // If no colors selected yet (all are empty), allow adding
    if (selectedColorIds.length === 0) return true;

    // If all colors are used, disable
    if (new Set(selectedColorIds).size >= colors.length) return false;

    // If we have at least one color not selected, allow adding
    return true;
  };

  // Custom validation for submit button
  // const canSubmit = () => {
  //   return formik.values.variants.every(
  //     (variant) =>
  //       variant.productId &&
  //       variant.quantity &&
  //       variant.colorId &&
  //       variant.availableSizes.length > 0 &&
  //       variant.availableSizes.every((size) => size.sizeId)
  //   );
  // };

  // Get available sizes that haven't been selected yet for a specific variant
  const getAvailableSizes = (variantIndex, currentSizeIndex) => {
    return sizes.filter((size) => {
      const currentVariant = formik.values.variants[variantIndex];
      return (
        size.id === currentVariant.availableSizes[currentSizeIndex].sizeId ||
        !currentVariant.availableSizes.some(
          (item, idx) => idx !== currentSizeIndex && item.sizeId === size.id
        )
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add Product Variants</h2>

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Colors added successfully!
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.variants.map((variant, variantIndex) => (
          <div key={variantIndex} className="border p-4 rounded-lg relative">
            {formik.values.variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(variantIndex)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                aria-label="Remove variant"
              >
                ×
              </button>
            )}

            <h3 className="text-lg font-medium mb-3">
              Color #{variantIndex + 1}
            </h3>
            <input
              type="hidden"
              name={`variants[${variantIndex}].productId`}
              value={variant.productId}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Variant Quantity
              </label>
              <input
                type="number"
                name={`variants[${variantIndex}].quantity`}
                value={variant.quantity}
                onChange={(e) =>
                  handleVariantChange(
                    variantIndex,
                    "quantity",
                    parseInt(e.target.value) || 0
                  )
                }
                onBlur={formik.handleBlur}
                min="0"
                className={`w-full p-2 border rounded-md ${
                  formik.touched.variants?.[variantIndex]?.quantity &&
                  formik.errors.variants?.[variantIndex]?.quantity
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.variants?.[variantIndex]?.quantity &&
              formik.errors.variants?.[variantIndex]?.quantity ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.variants[variantIndex].quantity}
                </div>
              ) : null}
            </div>

            {/* Color Selection */}
            <div className="my-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <select
                name={`variants[${variantIndex}].colorId`}
                value={variant.colorId}
                onChange={(e) =>
                  handleVariantChange(variantIndex, "colorId", e.target.value)
                }
                onBlur={formik.handleBlur}
                className={`w-full p-2 border rounded-md ${
                  formik.touched.variants?.[variantIndex]?.colorId &&
                  formik.errors.variants?.[variantIndex]?.colorId
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="">Select Color</option>
                {getAvailableColors(variantIndex).map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>
              {formik.touched.variants?.[variantIndex]?.colorId &&
              formik.errors.variants?.[variantIndex]?.colorId ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.variants[variantIndex].colorId}
                </div>
              ) : null}
            </div>
            {typeof formik.errors.variants === "string" && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.variants}
              </div>
            )}

            {/* Available Sizes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Sizes
              </label>

              {variant.availableSizes.map((size, sizeIndex) => (
                <div
                  key={sizeIndex}
                  className="grid grid-cols-12 gap-3 mb-3 items-end"
                >
                  {/* Size Selection */}
                  <div className="col-span-5">
                    <select
                      value={size.sizeId}
                      onChange={(e) =>
                        handleSizeChange(
                          variantIndex,
                          sizeIndex,
                          "sizeId",
                          e.target.value
                        )
                      }
                      onBlur={formik.handleBlur}
                      className={`w-full p-2 border rounded-md ${
                        formik.touched.variants?.[variantIndex]
                          ?.availableSizes?.[sizeIndex]?.sizeId &&
                        formik.errors.variants?.[variantIndex]
                          ?.availableSizes?.[sizeIndex]?.sizeId
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Size</option>
                      {getAvailableSizes(variantIndex, sizeIndex).map(
                        (sizeOption) => (
                          <option key={sizeOption.id} value={sizeOption.id}>
                            {sizeOption.name}
                          </option>
                        )
                      )}
                    </select>
                    {formik.touched.variants?.[variantIndex]?.availableSizes?.[
                      sizeIndex
                    ]?.sizeId &&
                    formik.errors.variants?.[variantIndex]?.availableSizes?.[
                      sizeIndex
                    ]?.sizeId ? (
                      <div className="text-red-500 text-sm mt-1">
                        {
                          formik.errors.variants[variantIndex].availableSizes[
                            sizeIndex
                          ].sizeId
                        }
                      </div>
                    ) : null}
                  </div>

                  {/* Quantity Available */}
                  <div className="col-span-4">
                    <input
                      type="number"
                      value={size.quantityAvailable}
                      onChange={(e) =>
                        handleSizeChange(
                          variantIndex,
                          sizeIndex,
                          "quantityAvailable",
                          parseInt(e.target.value) || 0
                        )
                      }
                      onBlur={formik.handleBlur}
                      min="0"
                      className={`w-full p-2 border rounded-md ${
                        formik.touched.variants?.[variantIndex]
                          ?.availableSizes?.[sizeIndex]?.quantityAvailable &&
                        formik.errors.variants?.[variantIndex]
                          ?.availableSizes?.[sizeIndex]?.quantityAvailable
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {formik.touched.variants?.[variantIndex]?.availableSizes?.[
                      sizeIndex
                    ]?.quantityAvailable &&
                    formik.errors.variants?.[variantIndex]?.availableSizes?.[
                      sizeIndex
                    ]?.quantityAvailable ? (
                      <div className="text-red-500 text-sm mt-1">
                        {
                          formik.errors.variants[variantIndex].availableSizes[
                            sizeIndex
                          ].quantityAvailable
                        }
                      </div>
                    ) : null}
                  </div>

                  {/* Remove Button */}
                  <div className="col-span-3">
                    {variant.availableSizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeRow(variantIndex, sizeIndex)}
                        className="w-full bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Size Button */}
              <button
                type="button"
                onClick={() => addSizeRow(variantIndex)}
                disabled={variant.availableSizes.length >= sizes.length}
                className={`mt-2 bg-gray-200 text-gray-700 py-1 px-3 rounded-md text-sm ${
                  variant.availableSizes.length >= sizes.length
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
              >
                + Add Size
              </button>
            </div>

            {/* Add Images Button for created variants */}
            {createdVariants[variantIndex] && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() =>
                    navigateToImageUpload(createdVariants[variantIndex].id)
                  }
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                  Add Images to This Color
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Variant Button */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={addVariant}
            disabled={!canAddMoreVariants()}
            className={`mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-md ${
              !canAddMoreVariants()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            + Add Another Variant
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formik.isValid}
            className={` bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition ${
              !formik.isValid || !formik.dirty
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitting ? "Saving Variants..." : "Save All Variants"}
          </button>
        </div>
      </form>
    </div>
  );
}
