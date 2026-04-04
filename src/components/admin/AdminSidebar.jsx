import { useState, createElement } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import ConfirmDialog from "./ConfirmDialog";
import {
  MdOutlineInventory2,
  MdOutlineCategory,
  MdLogout,
  MdClose,
} from "react-icons/md";

const MENU_ITEMS = [
  { id: "products", label: "Products", icon: MdOutlineInventory2 },
  { id: "categories", label: "Categories", icon: MdOutlineCategory },
];

export default function AdminSidebar({ activeSection, onSection, onClose }) {
  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  function handleLogout() {
    logout();

    navigate("/", { replace: true });
  }

  return (
    <aside className="w-64 h-full flex flex-col text-white border-r border-white/10 relative overflow-hidden bg-[url('/home-bg.webp')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      {/* LOGO */}
      <div className="relative z-10 flex items-center justify-center px-5 py-6 border-b border-white/10">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Best Mountain"
            className="w-24 object-contain"
          />
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 lg:hidden p-2 rounded-lg text-slate-400 hover:bg-white/10"
          >
            <MdClose className="text-xl" />
          </button>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="relative z-10 flex-1 px-3 py-5 space-y-1">
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest px-3 mb-3">
          Content
        </p>

        {MENU_ITEMS.map(({ id, label, icon }) => {
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              onClick={() => onSection(id)}
             className={`
relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer

${
  isActive
    ? "bg-gradient-to-r from-yellow-400/30 via-yellow-300/20 to-yellow-400/10 text-yellow-200 backdrop-blur-md"
    : "text-slate-400 hover:text-white hover:bg-white/5"
}
`}
            >
              {/* active indicator */}
              {/* {isActive && (
                <div className="absolute left-0 top-0 h-full w-[3px] bg-white rounded-r-full" />
              )} */}

              {createElement(icon, { className: "text-lg" })}

              {label}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="relative z-10 px-3 py-4 border-t border-white/10">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition cursor-pointer"
        >
          <MdLogout className="text-lg" />
          Logout
        </button>
      </div>

      {showLogoutConfirm && (
        <ConfirmDialog
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          confirmText="Logout"
          confirmButtonClass="bg-red-600 hover:bg-red-500"
        />
      )}
    </aside>
  );
}
