"use client";

import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import MobileMenu from "../components/ui/MobileMenu";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex overflow-x-hidden">
      {/** Sidebar (desktop only) */}
      <Sidebar />

      <div className="flex flex-col flex-1 min-h-screen">
        {/** Navbar (fixed on top) */}
        <Navbar />

        {/** Main content area */}
        <main className="pt-16 pb-16 px-4 flex-1 overflow-y-auto bg-gray-50 md:ml-64">
          {children}
        </main>

        {/** Mobile bottom menu (only visible on small screens) */}
        <MobileMenu />
      </div>
    </div>
  );
}
