import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notifikasi */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Navbar */}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Wrapper Sidebar dan Konten */}
      <div className="flex pt-16">
        {/* Sidebar Desktop */}
        <div className="hidden md:block w-64 fixed left-0 top-16 bottom-0 overflow-y-auto z-40 bg-white shadow-md">
          <Sidebar />
        </div>

        {/* Sidebar Mobile */}
        {isSidebarOpen && (
          <div className="md:hidden fixed left-0 top-16 bottom-0 overflow-y-auto z-40  shadow-md">
            {/* Overlay */}
            <div
              className="flex bg-opacity-50"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="w-64 bg-white h-full shadow-md">
              <Sidebar />
            </div>
          </div>
        )}


        {/* Konten utama */}
        <main className="w-full md:ml-64 p-6">{children}</main>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};
