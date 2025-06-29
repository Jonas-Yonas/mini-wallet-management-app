"use client";

import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div>
        <Navbar />
        <main className="pt-16 min-h-screen md:ml-64">{children}</main>
      </div>
    </>
  );
}
