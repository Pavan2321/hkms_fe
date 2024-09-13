// _components/Sidebar.tsx
import { FaClipboardList, FaTasks, FaUsers } from "react-icons/fa";
import Link from "next/link"; // For navigation

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4 font-bold text-2xl">House Keeping Management</div>
      <nav>
        <ul className="space-y-4 p-4">
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FaClipboardList />
            <Link href="/dashboard" className="font-semibold">
              Dashboard
            </Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FaUsers />
            <Link href="/employee" className="font-semibold">
              Users
            </Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <FaTasks />
            <Link href="/tasks" className="font-semibold">
              Tasks
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
