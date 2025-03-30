import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../CustomNavbar/Navbar";

export default function LayOut() {
  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
