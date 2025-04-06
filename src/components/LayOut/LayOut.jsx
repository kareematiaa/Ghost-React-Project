import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../CustomNavbar/Navbar";
import { Toaster } from "react-hot-toast";
import SidebarAdmin from "../Admin/SidebarAdmin/SidebarAdmin";
import AdminProducts from "../Admin/AdminProducts/AdminProducts";
import AddProduct from "../Admin/AddProduct/AddProduct";
import AddProductVariant from "../Admin/AddProductVariant/AddProductVariant";
import AddProductImages from "../Admin/AddProduct/AddImage/AddImage";
import AdminOrders from "../Admin/AdminOrders/AdminOrders";
import AdminCustomers from "../Admin/AdminCustomers/AdminCustomers";

export default function LayOut() {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        {/* <Navbar />
        <Outlet /> */}
        <div className="grid grid-cols-4 gap-4 h-screen">
          <div className="">
            <SidebarAdmin />
          </div>
          <div className="col-span-3 pe-16">
            <AdminCustomers />
          </div>
        </div>
      </div>
    </>
  );
}
