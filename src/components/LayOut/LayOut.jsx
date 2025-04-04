import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../CustomNavbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function LayOut() {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
