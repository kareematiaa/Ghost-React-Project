import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
        { path: "UpdatePassword", element: <UpdatePassword /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "OrderSuccess", element: <OrderSuccess /> },
        { path: "OrderFailed", element: <OrderFailed /> },
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
