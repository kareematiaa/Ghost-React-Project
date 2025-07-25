import { useEffect, useState } from "react";
import OrderService from "../../../Services/OrderService";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  New: "text-orange-500",
  "In Process": "text-blue-500",
  Shipped: "text-sky-500",
  Completed: "text-green-500",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await OrderService.GetAllOrders();
        console.log("Orders:", orders.result);

        setOrders(orders.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600 font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Total Price</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td
                  className={`px-6 py-4 font-medium 
                   
                  `}
                >
                  {order.orderStatus}
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  {order.totalPrice} <span className="text-xs">sr</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => navigate(`/Admin/OrderDetails/${order.id}`)}
                    className="bg-orange-100 hover:bg-orange-200 text-orange-500 p-2 rounded-full transition"
                  >
                    {" "}
                    <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
