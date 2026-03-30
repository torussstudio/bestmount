"use no memo";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { isLoggedIn } from "../../utils/auth";

import { toast } from "react-hot-toast";

import { FiAlertCircle } from "react-icons/fi";

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

  async function fetchProducts() {
    try {
      const res = await fetch(`${API}/products`);

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error(err);

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
      console.error(err);

      throw err;
    }
  }

  useEffect(() => {
    setLoading(true);

    setFetchError("");

    Promise.all([fetchProducts(), fetchCategories()])

      .catch(() => {
        setFetchError("Unable to load dashboard. Server may be waking up.");
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function addProduct(formData) {
    try {
      const res = await fetch(
        `${API}/products`,

        {
          method: "POST",

          body: formData,
        },
      );

      if (!res.ok) throw new Error("Failed to add product");

      await fetchProducts();

      toast.success("Product added");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function updateProduct(id, formData) {
    try {
      const res = await fetch(
        `${API}/products/${id}`,

        {
          method: "PUT",

          body: formData,
        },
      );

      if (!res.ok) throw new Error("Failed to update");

      await fetchProducts();

      toast.success("Product updated");
    } catch (err) {
      toast.error("Update failed");
    }
  }

  async function deleteProduct(id) {
    try {
      const res = await fetch(
        `${API}/products/${id}`,

        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Delete failed");

      await fetchProducts();

      toast.success("Product deleted");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function addCategory(data) {
    try {
      const res = await fetch(
        `${API}/categories`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        },
      );

      if (!res.ok) throw new Error("Failed");

      await fetchCategories();

      toast.success("Category added");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function updateCategory(id, data) {
    try {
      const res = await fetch(
        `${API}/categories/${id}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        },
      );

      if (!res.ok) throw new Error("Failed");

      await fetchCategories();

      toast.success("Category updated");
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function deleteCategory(id) {
    const res = await fetch(
      `${API}/categories/${id}`,

      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));

      throw new Error(body.message || "Delete failed");
    }

    await fetchCategories();

    toast.success("Category deleted");
  }

  if (!isLoggedIn()) return null;

  /* loading screen */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

        <p className="text-slate-400 text-sm mt-4">Loading dashboard</p>
      </div>
    );
  }

  /* error screen */
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
            <FiAlertCircle className="text-red-400 text-xl" />
          </div>

          <p className="text-red-400 text-sm mb-5">{fetchError}</p>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
