import { useState, memo } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiGrid,
  FiAlertCircle,
} from "react-icons/fi";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import CategoryForm from "./CategoryForm";

// ── Empty State ──────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="py-20 text-center">
      <FiGrid className="text-slate-300 text-5xl mx-auto mb-3" />
      <p className="text-slate-500 font-medium text-sm">No categories yet.</p>
      <p className="text-slate-400 text-xs mt-1">
        Click <strong>Add Category</strong> to get started.
      </p>
    </div>
  );
}

// ── ErrorDialog – shown when deletion is blocked ─────────────────────────
function ErrorDialog({ isOpen, onClose, message }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <FiAlertCircle className="text-red-500 text-lg" />
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-base mb-1">
              Cannot Delete Category
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CategorySection ──────────────────────────────────────────────────────
function CategorySection({
  categories,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errorMsg, setErrorMsg] = useState(""); // "" = hidden

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  }
  const openEdit = (cat) => {
    setEditing(cat);
    setModalOpen(true);
  }
 const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  }

  const handleFormSubmit = (data) => {
    if (editing) {
      onUpdate(editing._id, data);
    } else {
      onAdd(data);
    }
    closeModal();
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await onDelete(deleteTarget._id);
    } catch (err) {
      // onDelete threw — show the backend's error message
      setErrorMsg(err.message || "Cannot delete this category.");
    } finally {
      setDeleteTarget(null);
    }
  }

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-slate-800 text-lg md:text-xl font-bold">
            All Categories
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} total
          </p>
        </div>
         <button
  type="button"
  onClick={openAdd}
  className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer
  bg-gradient-to-r from-amber-400/30 via-yellow-300/50 to-amber-500/10
  text-black backdrop-blur-md border border-yellow-400/20
  hover:from-amber-400/40 hover:via-yellow-300/30 hover:to-amber-500/20
  transition-all"
>
  <FiPlus /> Add Category
</button>
      </div>

      {/* ── Desktop Table ───────────────────────────────────────────────── */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {categories.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {["#", "Category Name", "Actions"].map((h) => {
                    return (
                      <th
                        key={h}
                        className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((c, idx) => {
                  return (
                    <tr
                      key={c._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-slate-400 font-mono text-xs w-10">
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                            <FiGrid className="text-indigo-500 text-xs" />
                          </div>
                          <span className="text-slate-800 font-medium">
                            {c.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 w-24">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={function () {
                              openEdit(c);
                            }}
                            title="Edit"
                            className="p-2 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer"
                          >
                            <FiEdit2 className="text-sm" />
                          </button>
                          <button
                            onClick={function () {
                              setDeleteTarget(c);
                            }}
                            title="Delete"
                            className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition cursor-pointer"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Mobile Cards ────────────────────────────────────────────────── */}
      <div className="md:hidden">
        {categories.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {categories.map((c, idx) => {
              return (
                <div
                  key={c._id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <FiGrid className="text-indigo-500 text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-slate-400 font-mono text-xs">
                        {String(idx + 1).padStart(2, "0")}{" "}
                      </span>
                      <span className="text-slate-800 font-semibold text-sm">
                        {c.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={function () {
                        openEdit(c);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 text-slate-500 text-xs font-medium hover:border-indigo-300 hover:text-indigo-600 transition cursor-pointer"
                    >
                      <FiEdit2 className="text-xs" /> Edit
                    </button>
                    <button
                      onClick={function () {
                        setDeleteTarget(c);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 text-slate-500 text-xs font-medium hover:border-red-300 hover:text-red-500 transition cursor-pointer"
                    >
                      <FiTrash2 className="text-xs" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ──────────────────────────────────────────────── */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit: " + editing.name : "Add New Category"}
        size="sm"
      >
        <CategoryForm
          initial={editing}
          onSubmit={handleFormSubmit}
          onCancel={closeModal}
        />
      </Modal>

      {/* ── Delete Confirmation ──────────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={function () {
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteConfirm}
        message={
          'Are you sure you want to delete "' +
          (deleteTarget ? deleteTarget.name : "") +
          '"? This action cannot be undone.'
        }
      />

      {/* ── Error Dialog (shown when delete is blocked by backend) ─────── */}
      <ErrorDialog
        isOpen={!!errorMsg}
        onClose={function () {
          setErrorMsg("");
        }}
        message={errorMsg}
      />
    </div>
  );
}

export default memo(CategorySection);

