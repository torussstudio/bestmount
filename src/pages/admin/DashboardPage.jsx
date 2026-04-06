import { useState, useEffect, useCallback } from "react";

import { toast } from "react-hot-toast";

import { FiAlertCircle } from "react-icons/fi";

import AdminLayout from "../../components/admin/AdminLayout";

import ProductSection from "../../components/admin/ProductSection";

import CategorySection from "../../components/admin/CategorySection";

import API from "../../api";

export default function DashboardPage() {

  const [section, setSection] = useState("products");

  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [fetchError, setFetchError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await API.get("/products?status=all");
      setProducts(res.data);
    } catch (err) {
      console.error(err);

      throw err;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);

      throw err;
    }
  }, []);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setFetchError("");
      try {
        await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
      } catch {
        if (mounted)
          setFetchError("Unable to load dashboard. Server may be waking up.");
      } finally {
        if (mounted)
          setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [fetchProducts, fetchCategories, retryCount]);

  const addProduct = useCallback(
    async (formData) => {
      try {
        await API.post("/products", formData);
        await fetchProducts();
        toast.success("Product added");
      } catch (err) {
        toast.error(
          err.response?.data?.message || err.message || "Product add failed",
        );
      }
    },
    [fetchProducts],
  );

  const updateProduct = useCallback(
    async (id, formData) => {
      try {
        await API.put(`/products/${id}`, formData);
        await fetchProducts();
        toast.success("Product updated");
      } catch (err) {
        toast.error(
          err.response?.data?.message || err.message || "Update failed",
        );
      }
    },
    [fetchProducts],
  );

  const deleteProduct = useCallback(
    async (id) => {
      try {
        await API.delete(`/products/${id}`);
        await fetchProducts();
        toast.success("Product deleted");
      } catch (err) {
        toast.error(err.message);
      }
    },
    [fetchProducts],
  );

  const toggleProductActive = useCallback(
    async (id, isActive) => {
      try {
        await API.patch(`/products/${id}/status`, { isActive });
        await fetchProducts();
        toast.success(
          isActive ? "Product is visible on the site" : "Product hidden from the site",
        );
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            err.message ||
            "Could not update product status",
        );
      }
    },
    [fetchProducts],
  );

  const addCategory = useCallback(
    async (data) => {
      try {
        await API.post("/categories", data);
        await fetchCategories();
        toast.success("Category added");
      } catch (err) {
        toast.error(err.message);
      }
    },
    [fetchCategories],
  );

  const updateCategory = useCallback(
    async (id, data) => {
      try {
        await API.put(`/categories/${id}`, data);
        await fetchCategories();
        toast.success("Category updated");
      } catch (err) {
        toast.error(err.message);
      }
    },
    [fetchCategories],
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await API.delete(`/categories/${id}`);
        await fetchCategories();
        toast.success("Category deleted");
      } catch (err) {
        throw new Error(err.response?.data?.message || "Delete failed");
      }
    },
    [fetchCategories],
  );

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
            onClick={() => setRetryCount(c => c + 1)}
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
          onToggleActive={toggleProductActive}
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
