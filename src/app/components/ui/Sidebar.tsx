"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPlusCircle, FiList, FiUser } from "react-icons/fi";
import SignOutButton from "../auth/SignOutButton";
import { BiDollar } from "react-icons/bi";

export default function Sidebar() {
  const pathname = usePathname();
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FiHome size={20} /> },
    {
      name: "New Transaction",
      href: "/transactions/transaction-form",
      icon: <FiPlusCircle size={20} />,
    },
    {
      name: "History",
      href: "/transactions/history",
      icon: <FiList size={20} />,
    },
  ];

  return (
    <div className="hidden md:flex md:w-64 flex-col fixed h-screen bg-white border-r border-gray-200">
      {/** Logo/Branding */}
      <div className="border-b border-gray-200 h-16 flex items-center px-4">
        <div className="flex items-center space-x-2 text-green-600">
          <BiDollar size={24} />
          <span className="text-xl font-bold">PocketPay</span>
        </div>
      </div>

      {/** Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/** User profile + Sign Out */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center px-4 py-2 text-sm text-gray-500">
          <FiUser className="mr-3" size={18} />
          User Profile
        </div>

        <SignOutButton />
      </div>
    </div>
  );
}
