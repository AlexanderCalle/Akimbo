import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-akimbo-light">
      <Navbar />
      <main className="flex flex-grow p-5">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
