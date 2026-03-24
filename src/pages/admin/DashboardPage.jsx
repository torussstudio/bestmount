'use no memo';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import { toast } from "react-hot-toast";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductSection from "../../components/admin/ProductSection";
import CategorySection from "../../components/admin/CategorySection";
import API from "../../api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState("products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // ── Fetch helpers ────────────────────────────────────────────────────
  async function fetchProducts() {
    try {
      const res = await fetch(`${API}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("fetchProducts:", err.message);
      throw err;
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch(`${API}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("fetchCategories:", err.message);
      throw err;
    }
  }

  // ── Load on mount ─────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setFetchError("");
    Promise.all([fetchProducts(), fetchCategories()])
      .catch(() => setFetchError("Could not load data. The server may be waking up — please refresh in a moment."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Product CRUD ──────────────────────────────────────────────────────
  async function addProduct(data) {
    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add product");
      await fetchProducts();
      toast.success("Product added successfully!");
    } catch (err) {
      console.error("addProduct:", err.message);
      toast.error(err.message || "Failed to add product");
    }
  }

  async function updateProduct(id, data) {
    try {
      console.log("[updateProduct] id:", id, "data:", data);
      const res = await fetch(`${API}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      await fetchProducts();
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error("updateProduct:", err.message);
      toast.error(err.message || "Failed to update product");
    }
  }

  async function deleteProduct(id) {
    try {
      const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      await fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error("deleteProduct:", err.message);
      toast.error(err.message || "Failed to delete product");
    }
  }

  // ── Category CRUD ─────────────────────────────────────────────────────
  async function addCategory(data) {
    try {
      const res = await fetch(`${API}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name }),
      });
      if (!res.ok) throw new Error("Failed to add category");
      await fetchCategories();
      toast.success("Category added successfully!");
    } catch (err) {
      console.error("addCategory:", err.message);
      toast.error(err.message || "Failed to add category");
    }
  }

  async function updateCategory(id, data) {
    try {
      console.log("[updateCategory] id:", id, "data:", data);
      const res = await fetch(`${API}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      await fetchCategories();
      toast.success("Category updated successfully!");
    } catch (err) {
      console.error("updateCategory:", err.message);
      toast.error(err.message || "Failed to update category");
    }
  }

  async function deleteCategory(id) {
    const res = await fetch(`${API}/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || "Failed to delete category");
    }
    await fetchCategories();
    toast.success("Category deleted successfully!");
  }

  if (!isLoggedIn()) return null;

  // ── Loading state ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 gap-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading dashboard…</p>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 gap-4 px-4">
        <p className="text-red-400 text-sm text-center max-w-sm">{fetchError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <AdminLayout section={section} onSection={setSection}>
      {section === "products" ? (
        <ProductSection
          products={products}
          categories={categories}
          onAdd={addProduct}
          onUpdate={updateProduct}
          onDelete={deleteProduct}
        />
      ) : (
        <CategorySection
          categories={categories}
          onAdd={addCategory}
          onUpdate={updateCategory}
          onDelete={deleteCategory}
        />
      )}
    </AdminLayout>
  );
}
