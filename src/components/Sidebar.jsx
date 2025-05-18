import { Home, Settings, Menu, HelpingHandIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
const navItems = [
  { title: "Dashboard", href: "/", icon: <Home size={18} /> },
  { title: "Settings", href: "/settings", icon: <Settings size={18} /> },
  { title: "Helpline", href: "/helpline", icon: <HelpingHandIcon size={18} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`transition-all duration-300 flex flex-col justify-between ${
        isOpen ? "w-64" : "w-16"
      } bg-white border-r shadow-sm min-h-screen`}
    >
      <div>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold truncate">
            {isOpen ? "Admin Dashboard" : "AD"}
          </h2>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <img
            src={localStorage.getItem("user_profile_picture") || "https://i.pravatar.cc/40"}
            alt="User avatar"
            className="rounded-full w-8 h-8"
          />
          {isOpen && (
            <span className="font-medium truncate">
              {localStorage.getItem("user_name") || "Guest"}
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition hover:bg-muted ${
                location.pathname === item.href ? "bg-muted font-semibold" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      
    </div>
  );
}
