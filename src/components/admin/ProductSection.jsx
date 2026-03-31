"use no memo";
import { useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiGrid,
  FiChevronDown,
} from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import Modal from "./Modal";
import ConfirmDialog from "./ConfirmDialog";
import ProductForm from "./ProductForm";

// ── ProductImageThumb ──────────────────────────────────────────────────
function ProductImageThumb({ image, name }) {
  const imageUrl = image || null;

  if (!image) {
    return (
      <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
        <MdOutlineInventory2 className="text-slate-300 text-sm" />
      </div>
    );
  }
  return (
    <img
      src={imageUrl}
      alt={name || "Product image"}
      className="w-15 h-15 rounded-md object-contain border border-slate-200 shrink-0"
    />
  );
}

// ── EmptyState ─────────────────────────────────────────────────────────
function EmptyState({ title, subtitle }) {
  return (
    <div className="py-20 text-center">
      <MdOutlineInventory2 className="text-slate-300 text-5xl mx-auto mb-3" />
      <p className="text-slate-500 font-medium text-sm">{title}</p>
      {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
    </div>
  );
}

// ── CategoryFilterPanel ────────────────────────────────────────────────
function CategoryFilterPanel({ categories, selectedId, onSelect }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-5">
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
        <FiGrid className="text-indigo-500 text-xs" />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Filter by Category
        </p>
        {selectedId && (
          <span className="ml-auto text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
            {
              categories.find(function (c) {
                return String(c._id) === String(selectedId);
              })?.name
            }
          </span>
        )}
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
        <button
          type="button"
          onClick={function () {
            onSelect(null);
          }}
          className={
            "w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition cursor-pointer " +
            (!selectedId
              ? "bg-indigo-50 text-indigo-700 font-semibold"
              : "text-slate-600 hover:bg-slate-50")
          }
        >
          <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
          All Categories
        </button>

        {categories.map(function (c) {
          var isActive = String(selectedId) === String(c._id);
          return (
            <button
              key={c._id}
              type="button"
              onClick={function () {
                onSelect(c._id);
              }}
              className={
                "w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition cursor-pointer border-t border-slate-50 " +
                (isActive
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50")
              }
            >
              <span
                className={
                  "w-2 h-2 rounded-full shrink-0 " +
                  (isActive ? "bg-indigo-500" : "bg-slate-200")
                }
              />
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── ProductSection ─────────────────────────────────────────────────────
export default function ProductSection({
  products,
  categories,
  onAdd,
  onUpdate,
  onDelete,
}) {
  // CRUD state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [msdsOpen, setMsdsOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  // Search / filter state
  const [searchText, setSearchText] = useState("");
  const [filterMode, setFilterMode] = useState("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // ── CRUD helpers ────────────────────────────────────────────────────
  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(p) {
    setEditing(p);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  function handleSubmit(data) {
    if (editing) {
      onUpdate(editing._id, data);
    } else {
      onAdd(data);
    }
    closeModal();
  }

  async function handleUploadMSDS() {
    if (!pdfFile) {
      alert("select pdf");
      return;
    }

    const formData = new FormData();
    formData.append("msds", pdfFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/msds/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "upload failed");
        return;
      }

      alert("uploaded");

      setMsdsOpen(false);
      setPdfFile(null);
    } catch (err) {
      console.log(err);

      alert("upload failed");
    }
  }

  function getProductCategoryId(p) {
    if (p.category && typeof p.category === "object")
      return String(p.category._id);
    return String(p.category || p.categoryId || "");
  }

  function getCategoryName(p) {
    if (p.category && typeof p.category === "object" && p.category.name) {
      return p.category.name;
    }
    var catId = p.category || p.categoryId || "";
    return (
      (
        categories.find(function (c) {
          return String(c._id) === String(catId);
        }) || {}
      ).name || "—"
    );
  }

  // ── Filter mode change ───────────────────────────────────────────────
  function handleFilterModeChange(e) {
    setFilterMode(e.target.value);
    setSelectedCategoryId(null);
  }

  function handleCategorySelect(id) {
    setSelectedCategoryId(id);
  }

  // ── Derive filtered products ──────────────────────────────────────────
  var query = searchText.trim().toLowerCase();
  var filtered = products.filter(function (p) {
    if (query && !p.name.toLowerCase().includes(query)) return false;
    if (filterMode === "category" && selectedCategoryId) {
      if (getProductCategoryId(p) !== String(selectedCategoryId)) return false;
    }
    return true;
  });

  var isFiltered = query || (filterMode === "category" && selectedCategoryId);

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="text-slate-800 text-lg md:text-xl font-bold">
            All Products
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {isFiltered
              ? filtered.length + " of " + products.length + " products"
              : products.length + " products total"}
          </p>
        </div>
        <div className="flex gap-2">
       <button
  type="button"
  onClick={openAdd}
  className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer
  bg-gradient-to-r from-amber-400/30 via-yellow-300/50 to-amber-500/10
  text-black backdrop-blur-md border border-yellow-400/20
  hover:from-amber-400/40 hover:via-yellow-300/30 hover:to-amber-500/20
  transition-all"
>
  <FiPlus /> Add Product
</button>
        </div>
      </div>

      {/* ── Search + Filter mode bar ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
          <input
            type="text"
            value={searchText}
            onChange={function (e) {
              setSearchText(e.target.value);
            }}
            placeholder="Search products by name…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-slate-400"
          />
          {searchText && (
            <button
              type="button"
              onClick={function () {
                setSearchText("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold transition cursor-pointer"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="relative w-full sm:w-auto min-w-0">
          <select
            value={filterMode}
            onChange={handleFilterModeChange}
            className="appearance-none w-full min-w-0 sm:min-w-[140px] max-w-full pl-3 sm:pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition cursor-pointer"
          >
            <option value="all">All</option>
            <option value="category">Category</option>
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
        </div>
      </div>

      {/* ── Active category filter chip (clear button) ───────────────── */}
      {filterMode === "category" && selectedCategoryId && (
        <div className="flex items-center gap-2 mb-3 -mt-1">
          <span className="text-slate-400 text-xs">Filtering by:</span>
          <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200">
            {
              (
                categories.find(function (c) {
                  return String(c._id) === String(selectedCategoryId);
                }) || {}
              ).name
            }
            <button
              type="button"
              onClick={function () {
                setSelectedCategoryId(null);
              }}
              aria-label="Clear category filter"
              className="w-4 h-4 flex items-center justify-center rounded-full bg-indigo-200 hover:bg-indigo-300 text-indigo-700 transition cursor-pointer text-xs leading-none"
            >
              ×
            </button>
          </span>
        </div>
      )}

      {/* ── Category filter panel ─────────────────────────────────────── */}
      {filterMode === "category" && (
        <CategoryFilterPanel
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={handleCategorySelect}
        />
      )}

      {/* ── Desktop table ─────────────────────────────────────────────── */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          products.length === 0 ? (
            <EmptyState
              title="No products yet."
              subtitle="Click Add Product to get started."
            />
          ) : (
            <EmptyState
              title="No products match your search."
              subtitle="Try a different name or category."
            />
          )
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {[
                    "#",
                    "Product Name",
                    "Short Name",
                    "Category",
                    "Bulk Density",
                    "Fused Process",
                    "Actions",
                  ].map(function (h) {
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
                {filtered.map(function (p, idx) {
                  return (
                    <tr
                      key={p._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-slate-400 font-mono text-xs w-10">
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          {/* ── Product image thumbnail (replaces ColorDots) ── */}
                          <ProductImageThumb image={p.image} name={p.name} />
                          <span className="text-slate-800 font-medium whitespace-nowrap">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                        {p.shortName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                          {getCategoryName(p)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-700 whitespace-nowrap">
                        {p.bulkDensity || "—"}
                      </td>
                      <td className="px-4 py-4 text-slate-500 max-w-[180px] truncate">
                        {p.fusedProcess || "—"}
                      </td>
                      <td className="px-4 py-4 w-24">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={function () {
                              openEdit(p);
                            }}
                            title="Edit"
                            className="p-2 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer"
                          >
                            <FiEdit2 className="text-sm" />
                          </button>
                          <button
                            onClick={function () {
                              setDeleteTarget(p);
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

      {/* ── Mobile cards ──────────────────────────────────────────────── */}
      <div className="md:hidden">
        {filtered.length === 0 ? (
          products.length === 0 ? (
            <EmptyState title="No products yet." />
          ) : (
            <EmptyState
              title="No products match your search."
              subtitle="Try a different name or category."
            />
          )
        ) : (
          <div className="space-y-3">
            {filtered.map(function (p, idx) {
              return (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-slate-400 font-mono text-xs">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {/* ── Product image thumbnail (replaces ColorDots) ── */}
                        <ProductImageThumb image={p.image} name={p.name} />
                      </div>
                      <p className="text-slate-800 font-semibold text-sm truncate">
                        {p.name}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        <span className="text-indigo-600 font-medium">
                          {p.shortName}
                        </span>
                        {" · "}
                        <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full text-xs">
                          {getCategoryName(p)}
                        </span>
                      </p>
                      {(p.bulkDensity || p.fusedProcess) && (
                        <p className="text-slate-400 text-xs mt-0.5">
                          {p.bulkDensity ? "Bulk: " + p.bulkDensity : ""}
                          {p.bulkDensity && p.fusedProcess ? " · " : ""}
                          {p.fusedProcess || ""}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={function () {
                        openEdit(p);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 text-slate-500 text-xs font-medium hover:border-indigo-300 hover:text-indigo-600 transition cursor-pointer"
                    >
                      <FiEdit2 className="text-xs" /> Edit
                    </button>
                    <button
                      onClick={function () {
                        setDeleteTarget(p);
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

      {/* ── Add / Edit Modal ──────────────────────────────────────────── */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit: " + editing.name : "Add New Product"}
        size="xl"
      >
        <ProductForm
          initial={editing}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={function () {
          setDeleteTarget(null);
        }}
        onConfirm={function () {
          onDelete(deleteTarget._id);
          setDeleteTarget(null);
        }}
        message={
          'Are you sure you want to delete "' +
          (deleteTarget ? deleteTarget.name : "") +
          '"? This action cannot be undone.'
        }
      />
    </div>
  );
}

