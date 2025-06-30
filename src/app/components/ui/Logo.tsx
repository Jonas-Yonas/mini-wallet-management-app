import Link from "next/link";
import { BiDollar } from "react-icons/bi";

export default function Logo() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center space-x-2 text-indigo-600 hover:opacity-80 transition-opacity"
    >
      <div className="bg-indigo-600 text-white p-2 rounded-lg shadow">
        <BiDollar size={18} />
      </div>
      <span className="text-lg font-semibold text-indigo-700">PocketPay</span>
    </Link>
  );
}
