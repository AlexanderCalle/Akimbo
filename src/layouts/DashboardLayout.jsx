import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import toast, { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-akimbo-dark-900 bg-akimbo-light">
      <Toaster />
      <DashboardNavbar />
      <main className="w-9/12 mx-auto flex flex-col p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
