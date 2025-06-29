"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import SignOutButton from "../auth/SignOutButton";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /** Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white md:ml-64 w-full border-b border-gray-200 fixed z-10 md:w-[calc(100%-16rem)]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <span className="text-xl font-bold text-indigo-600">WalletApp</span>
          </div>

          {session?.user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <span className="text-gray-700">{session.user.name}</span>

                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
                    <span className="text-sm text-gray-700">
                      {session.user.name?.[0].toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </button>

              {/** Dropdown menu - sign out button */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-red-100 border-gray-700 rounded-md shadow-lg z-50">
                  <SignOutButton />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
