import React, { useEffect, useState } from "react";
import OrderService from "../../../../Services/OrderService";
import ProductService from "../../../../Services/ProductService";

import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [variantDetails, setVariantDetails] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await OrderService.GetOrderDetails(orderId);
        setOrder(orderResponse.result);

        const variantPromises = orderResponse.result.orderItems.map((item) =>
          ProductService.GetProductVariantDetails(
            item.productVariantId,
            item.sizeId
          )
        );

        const variants = await Promise.all(variantPromises);
        setVariantDetails(variants.map((v) => v.result));
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading)
    return <div className="text-center text-lg font-semibold">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto  p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <strong>Order ID:</strong> {order.id}
        </div>
        <div>
          <strong>Date:</strong> {new Date(order.date).toLocaleString()}
        </div>
        <div>
          <strong>Status:</strong> {order.orderStatus}
        </div>
        <div>
          <strong>Payment:</strong> {order.paymentType}
        </div>
        <div>
          <strong>Shipping:</strong> {order.shippingMethod} ($
          {order.shippingCost})
        </div>
        <div>
          <strong>Discount:</strong> ${order.discount}
        </div>
        <div>
          <strong>Total Price:</strong> ${order.totalPrice}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 mt-11">Shipping Address</h3>

      <div className="grid grid-cols-2 gap-4 mb-6 mt-12">
        <div>
          <strong> Unit Number :</strong> {order.customerAddress.unitNumber}
        </div>
        <div>
          <strong> Address Line: </strong> {order.customerAddress.addressLine}
        </div>
        <div>
          <strong> Street Number:</strong> {order.customerAddress.streetNumber},
        </div>
        <div>
          <strong> City: </strong> {order.customerAddress.city}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3">Products</h3>
      <div className="space-y-6">
        {variantDetails.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-center border p-4 rounded-lg bg-gray-100"
          >
            <img
              src={item.imageUrls[0]}
              alt={item.productName}
              className="w-32 h-32 object-cover rounded"
            />
            <div>
              <h4 className="font-bold text-lg">{item.productName}</h4>
              <p className="text-gray-700">{item.productDescription}</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>Color: {item.colorName}</p>
                <p>Size: {item.sizeName}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
