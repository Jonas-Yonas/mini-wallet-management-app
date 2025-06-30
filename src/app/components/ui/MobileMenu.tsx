"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPlusCircle, FiList } from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: <FiHome size={20} /> },
  {
    name: "New",
    href: "/transactions/transaction-form",
    icon: <FiPlusCircle size={20} />,
  },
  {
    name: "History",
    href: "/transactions/history",
    icon: <FiList size={20} />,
  },
];

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full z-50 bg-white border-t border-gray-200 shadow-md md:hidden">
      <div className="flex justify-around items-center h-14">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-green-600" : "text-gray-500"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
