import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

/**
 * AdminLayout – responsive shell:
 *   ≥ lg  : sidebar always visible alongside content
 *   < lg  : sidebar is a slide-in drawer with backdrop, toggled by navbar hamburger
 */
export default function AdminLayout({ section, onSection, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {/* ── Mobile backdrop ─────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      {/*
          Desktop: static, always visible (lg:relative lg:translate-x-0)
          Mobile:  fixed drawer, slides in/out from left
      */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <AdminSidebar
          activeSection={section}
          onSection={(id) => {
            onSection(id);
            setSidebarOpen(false); // auto-close on mobile after picking a section
          }}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* ── Right column ────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <AdminNavbar
          section={section}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}
