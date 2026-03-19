import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import {
  MdOutlineTerrain,
  MdOutlineInventory2,
  MdOutlineCategory,
  MdLogout,
  MdClose,
} from "react-icons/md";

const MENU_ITEMS = [
  { id: "products", label: "Products", icon: MdOutlineInventory2 },
  { id: "categories", label: "Categories", icon: MdOutlineCategory },
];

/**
 * AdminSidebar – left navigation panel.
 * Props:
 *   activeSection – currently active section id
 *   onSection     – callback(sectionId) to change section
 *   onClose       – optional: close drawer on mobile
 */
export default function AdminSidebar({ activeSection, onSection, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <aside className="w-64 h-full flex flex-col bg-slate-900 text-white shadow-xl">
      {/* Brand + mobile close button */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/30 shrink-0">
            <MdOutlineTerrain className="text-xl" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              BestMountain
            </p>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </div>
        {/* Close button – only visible on mobile via layout's drawer behaviour */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
            aria-label="Close menu"
          >
            <MdClose className="text-xl" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
          Content
        </p>
        {MENU_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="text-lg shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 cursor-pointer"
        >
          <MdLogout className="text-lg shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
