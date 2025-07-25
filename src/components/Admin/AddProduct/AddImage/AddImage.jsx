import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductService from "../../../../Services/ProductService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const imageSchema = Yup.object().shape({
  images: Yup.array()
    .of(
      Yup.object().shape({
        productVariantId: Yup.string().required("Variant ID is required"),
        base64Image: Yup.string().required("Image is required"),
      })
    )
    .min(1, "At least one image is required"),
});

export default function AddProductImages() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const location = useLocation();
  const { productVariantId } = location.state || {};
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      images: [
        {
          productVariantId: productVariantId,
          base64Image: "",
          preview: "",
        },
      ],
    },
    validationSchema: imageSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Prepare payload without previews
        const payload = values.images.map((img) => ({
          productVariantId: img.productVariantId,
          base64Image: img.base64Image,
        }));

        await ProductService.AddProductImages(payload);
        setSubmitSuccess(true);
        formik.resetForm();
        setTimeout(() => setSubmitSuccess(false), 3000);
      } catch (error) {
        console.error("Error submitting images:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Convert image to base64
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...formik.values.images];
      newImages[index] = {
        ...newImages[index],
        base64Image: reader.result.split(",")[1], // Remove data URL prefix
        preview: reader.result,
      };
      formik.setFieldValue("images", newImages);
    };
    reader.readAsDataURL(file);
  };

  // Add new image field
  const addImageField = () => {
    formik.setFieldValue("images", [
      ...formik.values.images,
      {
        productVariantId: productVariantId,
        base64Image: "",
        preview: "",
      },
    ]);
  };

  // Remove image field
  const removeImageField = (index) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add Product Images</h2>

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Images added successfully!
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Hidden variant ID field */}
        <input type="hidden" name="productVariantId" value={productVariantId} />

        {/* Image Upload Fields */}
        {formik.values.images.map((image, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              {/* Image Preview */}
              {image.preview ? (
                <div className="w-24 h-24 border rounded overflow-hidden">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 border ps-2 rounded flex items-center justify-center text-gray-400">
                  No image selected
                </div>
              )}

              {/* File Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image {index + 1}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
                {formik.touched.images?.[index]?.base64Image &&
                formik.errors.images?.[index]?.base64Image ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.images[index].base64Image}
                  </div>
                ) : null}
              </div>

              {/* Remove Button */}
              {formik.values.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add Another Image Button */}
        <button
          type="button"
          onClick={addImageField}
          className="mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition text-sm"
        >
          + Add Another Image
        </button>

        {/* Form-level validation error */}
        {typeof formik.errors.images === "string" ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.images}
          </div>
        ) : null}

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
            {isSubmitting ? "Uploading Images..." : "Upload Images"}
          </button>
        </div>
      </form>
    </div>
  );
}
