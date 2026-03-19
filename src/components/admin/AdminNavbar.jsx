import { FiUser, FiMenu } from "react-icons/fi";

const TITLES = {
  products: "Products",
  categories: "Categories",
};

/**
 * AdminNavbar – top bar showing dynamic page title + hamburger on mobile.
 * Props:
 *   section       – currently active section id
 *   onMenuToggle  – callback to open/close sidebar drawer (mobile)
 */
export default function AdminNavbar({ section, onMenuToggle }) {
  const title = TITLES[section] ?? "Dashboard";

  return (
    <header className="h-14 md:h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-slate-200 shadow-sm shrink-0">
      <div className="flex items-center gap-3">
        {/* Hamburger – visible only below lg */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer"
          aria-label="Toggle menu"
        >
          <FiMenu className="text-xl" />
        </button>

        {/* Dynamic title */}
        <div>
          <h1 className="text-slate-800 text-base md:text-lg font-bold leading-tight">
            {title}
          </h1>
          <p className="text-slate-400 text-xs hidden sm:block">
            Manage your {title.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Admin badge */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-slate-700 text-sm font-semibold leading-tight">
            Admin
          </p>
          <p className="text-slate-400 text-xs">Administrator</p>
        </div>
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-600 flex items-center justify-center shadow shrink-0">
          <FiUser className="text-white text-sm md:text-base" />
        </div>
      </div>
    </header>
  );
}
