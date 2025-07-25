import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "../Home/Home";
import Products from "../Products/Products";
import ProductDetails from "../ProductDetails/ProductDetails";
import Cart from "../Cart/Cart";
import CheckOut from "../CheckOut/CheckOut";
import Wishlist from "../Wishlist/Wishlist";
import LayOut from "../LayOut/LayOut";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Otp from "../Otp/Otp";
import UpdatePassword from "../UpdatePassword/UpdatePassword";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import OrderSuccess from "../OrderSuccess/OrderSuccess";
import OrderFailed from "../OrderFailed/OrderFailed";
import AddProduct from "../Admin/AddProduct/AddProduct";
import AddProductVariant from "../Admin/AddProductVariant/AddProductVariant";
import AddProductImages from "../Admin/AddProduct/AddImage/AddImage";
import AdminOrders from "../Admin/AdminOrders/AdminOrders";
import AdminCustomers from "../Admin/AdminCustomers/AdminCustomers";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminProducts from "../Admin/AdminProducts/AdminProducts";
import AdminProductDetails from "../Admin/AdminProductDetails/AdminProductDetails";
import AdminLayout from "../Admin/AdminLayout/AdminLayout";
import GeneralOtp from "../GeneralOtp/GeneralOtp";
import OrderDetails from "../Admin/AdminOrders/OrderDetails/OrderDetails";
import AddColor from "../Admin/AddColor/AddColor";
import AddSize from "../Admin/AddSize/AddSixe";

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { index: true, element: <Home /> },
        { path: "ProductDetails", element: <ProductDetails /> },
        { path: "Cart", element: <Cart /> },
        { path: "Checkout", element: <CheckOut /> },
        { path: "Products", element: <Products /> },
        { path: "Wishlist", element: <Wishlist /> },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "Otp", element: <Otp /> },
        { path: "GeneralOtp", element: <GeneralOtp /> },
        { path: "UpdatePassword", element: <UpdatePassword /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "OrderSuccess", element: <OrderSuccess /> },
        { path: "OrderFailed", element: <OrderFailed /> },
      ],
    },
    {
      path: "Admin",
      element: (
        <ProtectedRoute adminOnly>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="AdminDashboard" /> },
        { path: "AdminDashboard", element: <AdminDashboard /> },
        { path: "AddProduct", element: <AddProduct /> },
        { path: "AddProductColor", element: <AddProductVariant /> },
        { path: "AddProductImage", element: <AddProductImages /> },
        { path: "Orders", element: <AdminOrders /> },
        { path: "Customers", element: <AdminCustomers /> },
        { path: "AdminProducts", element: <AdminProducts /> },
        { path: "ProductDetails/:productId", element: <AdminProductDetails /> },
        { path: "OrderDetails/:orderId", element: <OrderDetails /> },
        { path: "AddColor", element: <AddColor /> },
        { path: "AddSize", element: <AddSize /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
