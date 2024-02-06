import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";


const MainLayout = ({ children }) => {

  return (
    <div className="max-w-screen flex flex-col min-h-screen text-akimbo-dark-900">
      <Toaster />
      <Navbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
