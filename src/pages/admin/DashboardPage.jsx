'use no memo';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductSection from "../../components/admin/ProductSection";
import CategorySection from "../../components/admin/CategorySection";
import API from "../../api";


// const API = "http://localhost:5000/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState("products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  // ── Fetch helpers ────────────────────────────────────────────────────
  async function fetchProducts() {
    try {
      const res = await fetch(`${API}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("fetchProducts:", err.message);
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
    }
  }

  // ── Load on mount ─────────────────────────────────────────────────────
  useEffect(() => {
    fetchProducts();
    fetchCategories();
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
    } catch (err) {
      console.error("addProduct:", err.message);
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
    } catch (err) {
      console.error("updateProduct:", err.message);
    }
  }

  async function deleteProduct(id) {
    try {
      const res = await fetch(`${API}/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      await fetchProducts();
    } catch (err) {
      console.error("deleteProduct:", err.message);
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
    } catch (err) {
      console.error("addCategory:", err.message);
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
    } catch (err) {
      console.error("updateCategory:", err.message);
    }
  }

  async function deleteCategory(id) {
    const res = await fetch(`${API}/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      // Re-throw so CategorySection can catch and display the message
      throw new Error(body.message || "Failed to delete category");
    }
    await fetchCategories();
  }

  if (!isLoggedIn()) return null;

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