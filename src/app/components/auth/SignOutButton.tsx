import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function SignOutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
      className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
    >
      <FiLogOut className="mr-3" size={18} />
      <span>Sign Out</span>
    </button>
  );
}
