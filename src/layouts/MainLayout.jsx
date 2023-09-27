import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-akimbo-dark-900">
      <Navbar />
      <main className="flex-grow flex flex-col p-5">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
