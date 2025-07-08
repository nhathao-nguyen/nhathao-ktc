import { NavLink } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  Map,
  Building,
  UserPlus,
  Clock,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Patients", path: "/", icon: <Users /> },
  { name: "Overview", path: "/overview", icon: <LayoutDashboard /> },
  { name: "Map", path: "/map", icon: <Map /> },
  { name: "Departments", path: "/departments", icon: <Building /> },
  { name: "Doctors", path: "/doctors", icon: <UserPlus /> },
  { name: "History", path: "/history", icon: <Clock /> },
  { name: "Settings", path: "/settings", icon: <Settings /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <div className="text-xl font-bold mb-6 text-blue-600">H-care</div>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-100 ${
                isActive ? "bg-blue-100 text-blue-600 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
