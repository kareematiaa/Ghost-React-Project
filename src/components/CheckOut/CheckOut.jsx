import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CartService from "../../Services/CartService";
import OrderService from "../../Services/OrderService";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function CheckOut() {
  const { userId, userEmail, userPhone } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [shippingCosts, setShippingCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const productsRef = useRef(null);

  const orderSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits"),
    paymentType: Yup.number().required("Payment method is required"),
    governate: Yup.string().required("Governate is required"),
    addressLine: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    unitNumber: Yup.string().required("Unit number is required"),
    streetNumber: Yup.string().required("Street number is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: userEmail || "",
      phoneNumber: userPhone || "",
      paymentType: 0, // 0 for Cash, 1 for Visa
      governate: "",
      addressLine: "",
      city: "",
      unitNumber: "",
      streetNumber: "",
    },
    validationSchema: orderSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Prepare order items
        const orderItems = cartItems.map((item) => ({
          productVariantId: item.id,
          quantity: item.quantity,
          sizeId: item.sizeId,
        }));

        // Find selected shipping method
        const selectedShipping = shippingCosts.find(
          (option) => option.governate === values.governate
        );

        if (!selectedShipping) {
          throw new Error("Please select a valid shipping method");
        }

        // Prepare order payload
        const orderPayload = {
          customerId: userId,
          phoneNumber: values.phoneNumber,
          email: values.email,
          paymentType: values.paymentType,
          paymentMethodId:
            values.paymentType === 1 ? "YOUR_PAYMENT_METHOD_ID" : null, // Replace with actual ID if needed
          shippingMethodId: selectedShipping.shippingMethodId,
          governate: values.governate,
          customerAddress: {
            addressLine: values.addressLine,
            city: values.city,
            unitNumber: values.unitNumber,
            streetNumber: values.streetNumber,
          },
          items: orderItems,
        };

        // Create order
        const response = await OrderService.CreateOrder(orderPayload);

        if (response.isSuccess) {
          toast.success("Order placed successfully!");
          navigate("/OrderSuccess", {
            state: { orderId: response.result.orderId },
          });
        } else {
          throw new Error(
            response.errorMessages?.join(", ") || "Failed to create order"
          );
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchCartItems = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await CartService.GetCartItems({ customerId: userId });

      if (response.isSuccess && response.result) {
        const transformedItems = response.result.map((item) => ({
          id: item.productVariantId,
          name: item.productName,
          price: item.price,
          image: item.imageUrl,
          color: item.color,
          size: item.sizeName,
          quantity: item.quantity,
          sizeId: item.sizeId,
        }));
        setCartItems(transformedItems);

        // Set initial governate value if not set
        if (response.result.length > 0 && !formik.values.governate) {
          formik.setFieldValue("governate", response.result[0].governate);
        }
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const GetShippingCosts = async () => {
    try {
      setLoading(true);
      const response = await OrderService.GetShippingCosts();
      setShippingCosts(response.result);

      // Set initial governate value if not set
      if (response.result.length > 0 && !formik.values.governate) {
        formik.setFieldValue("governate", response.result[0].governate);
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to load shipping options");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
    GetShippingCosts();
  }, [userId]);

  // Calculate totals
  const { subtotal, totalItems } = React.useMemo(() => {
    return cartItems.reduce(
      (acc, item) => ({
        subtotal: acc.subtotal + item.price * item.quantity,
        totalItems: acc.totalItems + item.quantity,
      }),
      { subtotal: 0, totalItems: 0 }
    );
  }, [cartItems]);

  // Get selected shipping option
  const selectedShipping = shippingCosts.find(
    (option) => option.governate === formik.values.governate
  );

  // Calculate total with selected shipping
  const total = React.useMemo(() => {
    return subtotal + (selectedShipping?.price || 0);
  }, [subtotal, selectedShipping]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="py-10 mx-8 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-16 md:gap-x-20 lg:gap-x-72"
    >
      {/* LEFT SECTION - Checkout Form */}
      <div className="">
        <h1 className="text-2xl font-bold mb-6">CHECKOUT</h1>

        {/* Steps */}
        <div className="flex space-x-6 text-gray-500 uppercase text-sm border-b pb-2">
          <span className="font-semibold text-gray-600">INFORMATION</span>
        </div>

        {/* Contact Info */}
        <div className="mt-6">
          <h2 className="text-md font-semibold mb-2">CONTACT INFO</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className={`border ${
                  formik.errors.email ? "border-red-500" : "border-gray-300"
                } px-4 py-2 rounded-md w-full`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className={`border ${
                  formik.errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } px-4 py-2 rounded-md w-full`}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-6">
          <h2 className="text-md font-semibold mb-2">PAYMENT METHOD</h2>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div
              className={`flex items-center rounded-lg ps-4 border ${
                formik.values.paymentType === 0
                  ? "border-gray-800"
                  : "border-gray-300"
              }`}
            >
              <input
                id="Cash"
                type="radio"
                name="paymentType"
                className="w-4 h-4"
                checked={formik.values.paymentType === 0}
                onChange={() => formik.setFieldValue("paymentType", 0)}
              />
              <label
                htmlFor="Cash"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-1000 cursor-pointer"
              >
                Cash
              </label>
            </div>
            <div
              className={`flex items-center ps-4 border rounded-lg ${
                formik.values.paymentType === 1
                  ? "border-gray-800"
                  : "border-gray-300"
              }`}
            >
              <input
                id="Visa"
                type="radio"
                name="paymentType"
                className="w-4 h-4"
                checked={formik.values.paymentType === 1}
                onChange={() => formik.setFieldValue("paymentType", 1)}
              />
              <label
                htmlFor="Visa"
                className="w-full py-4 ms-2 text-sm font-medium text-gray-900 cursor-pointer"
              >
                Visa
              </label>
            </div>
          </div>
          {formik.touched.paymentType && formik.errors.paymentType && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.paymentType}
            </div>
          )}
        </div>

        {/* Shipping Address */}
        <div className="mt-6">
          <h2 className="text-md font-semibold mb-2">SHIPPING ADDRESS</h2>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <select
                name="governate"
                value={formik.values.governate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border ${
                  formik.errors.governate ? "border-red-500" : "border-gray-300"
                } px-4 py-2 rounded-md w-full bg-white`}
              >
                {shippingCosts.map((option) => (
                  <option key={option.governate} value={option.governate}>
                    {option.governate}
                  </option>
                ))}
              </select>
              {formik.touched.governate && formik.errors.governate && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.governate}
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                name="unitNumber"
                placeholder="Unit Number"
                className={`border ${
                  formik.errors.unitNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } px-4 py-2 rounded-md w-full`}
                value={formik.values.unitNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.unitNumber && formik.errors.unitNumber && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.unitNumber}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3">
            <input
              type="text"
              name="addressLine"
              placeholder="Street Address"
              className={`border ${
                formik.errors.addressLine ? "border-red-500" : "border-gray-300"
              } px-4 py-2 rounded-md w-full`}
              value={formik.values.addressLine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.addressLine && formik.errors.addressLine && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.addressLine}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                className={`border ${
                  formik.errors.city ? "border-red-500" : "border-gray-300"
                } px-4 py-2 rounded-md w-full`}
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.city}
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                name="streetNumber"
                placeholder="Street Number"
                className={`border ${
                  formik.errors.streetNumber
                    ? "border-red-500"
                    : "border-gray-300"
                } px-4 py-2 rounded-md w-full`}
                value={formik.values.streetNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.streetNumber && formik.errors.streetNumber && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.streetNumber}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Button */}
        <button
          type="submit"
          className="w-full bg-gray-1000 text-white py-3 mt-6 flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:bg-gray-400"
          disabled={loading || cartItems.length === 0}
        >
          {loading ? "Processing..." : "Order →"}
        </button>
      </div>

      {/* RIGHT SECTION - Order Summary */}
      <div className="border border-gray-300 p-6 h-fit sticky top-4">
        <h2 className="text-lg font-semibold mb-4">YOUR ORDER</h2>

        {/* Order Items */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.sizeId}`}
              className="flex items-center space-x-4"
            >
              <img
                src={item.image}
                alt="Product"
                className="w-20 h-24 object-cover border border-gray-300 rounded-md"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  {item.color}, {item.size}
                </p>
                <div className="text-gray-500 text-sm">
                  Qty: {item.quantity}
                </div>
              </div>
              <p className="text-lg font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-6 space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {/* Delivery Estimate */}
          {selectedShipping && (
            <div className="flex justify-between">
              <span>Delivery Estimate</span>
              <span>{selectedShipping.estimatedDelivery}</span>
            </div>
          )}

          {/* Shipping Cost */}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${selectedShipping?.price?.toFixed(2) || "0.00"}</span>
          </div>

          <div className="border-t pt-2 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </form>
  );
}
