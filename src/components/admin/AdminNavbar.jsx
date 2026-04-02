import { FiUser, FiMenu } from "react-icons/fi";

const TITLES = {
  products: "Products",
  categories: "Categories",
};

export default function AdminNavbar({ section, onMenuToggle }) {
  const title = TITLES[section] ?? "Dashboard";

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-gradient-to-r from-white to-slate-50 border-b border-slate-200 shadow-sm" style={{backgroundImage:"url('/about-bg.webp')"}} >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
        >
          <FiMenu className="text-lg" />
        </button>

        {/* title */}
        <div>
          <h1 className="text-white text-lg font-semibold tracking-tight">
            {title}
          </h1>

          <p className="text-slate-400 text-xs hidden sm:block">
            Manage your {title.toLowerCase()}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* profile */}
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          <div className="hidden sm:block">
            <p className="text-slate-700 text-sm font-semibold leading-none">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
