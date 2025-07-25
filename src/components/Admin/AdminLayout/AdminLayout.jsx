// AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-4 gap-4 h-screen">
      <div>
        <SidebarAdmin />
      </div>
      <div className="col-span-3 pe-16">
        <Outlet />
      </div>
    </div>
  );
}
