import Navbar from "@/components/shared/navbar/Navbar";
import Sidebar from "@/components/shared/sidebar/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full flex min-h-screen">
      {/* Sidebar bên trái */}
      <aside className="w-60 h-full">
        <Sidebar />
      </aside>

      {/* RightSide bao gồm Navbar và Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-white  h-[60px] flex items-center">
          <Navbar />
        </header>

        {/* Content */}
        <section className="flex-1 p-4">
          <div className="mx-auto">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
