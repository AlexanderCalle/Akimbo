import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";


const MainLayout = ({ children }) => {

  return (
    <div className="max-w-screen flex flex-col min-h-screen text-akimbo-dark-900">
      <Toaster />
      <div 
      className="fixed z-20 top-0 h-fit w-full bg-akimbo-light bg-opacity-80">
        <Navbar />
      </div>
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
