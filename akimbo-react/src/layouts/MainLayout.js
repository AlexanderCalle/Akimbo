import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col bg-akimbo-light">
      <Navbar />
      <main className="flex flex-col flex-grow p-5">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
