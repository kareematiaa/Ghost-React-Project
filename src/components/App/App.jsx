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
