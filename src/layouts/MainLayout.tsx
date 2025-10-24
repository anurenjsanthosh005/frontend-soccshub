import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
function MainLayout() {
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex flex-col flex-grow w-full mt-13">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
