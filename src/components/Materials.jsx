import { useState, useEffect } from "react";

import Container from "./layout/Container";
import Section from "./layout/Section";
import DownButton from "./layout/DownButton";
import Seperator from "./layout/seperator";
import API from "../api";
import ProductSheetModal from "./ProductSheetModal";

export default function Materials() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${API}/categories`),
          fetch(`${API}/products`),
        ]);
        const cats = await catRes.json();
        const prods = await prodRes.json();
        setCategories(cats);
        setProducts(prods);
        if (cats.length > 0) setSelectedCategory(cats[0]._id);
      } catch (err) {
        console.error("Failed to load materials data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (p) => p.category?._id === selectedCategory
  );

  const selectedCategoryName =
    categories.find((c) => c._id === selectedCategory)?.name ?? "";

  return (
    <>
      <div id="materials">
        <Section className="min-h-[70vh]">
          <Container>
            {/* Header row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12 mb-10">
              <div className="md:col-span-3">
                <span className="text-sm uppercase tracking-wider">
                  Our Materials
                </span>
              </div>
              <div className="md:col-span-9 justify-self-end max-w-[560px]">
                <h2 className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400">
                  From Furnace to Function
                </h2>
                <p className="mt-4">
                  Our curated portfolio of raw materials combines performance,
                  purity, and sustainability, supporting high-temperature
                  manufacturing while advancing the collective goal of reducing
                  carbon footprints.
                </p>
              </div>
            </div>

            {/* Main panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <span className="text-sm text-white/40 uppercase tracking-widest">Loading…</span>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row min-h-[420px]">
                  {/* ── Left sidebar ── */}
                  <div className="md:w-56 flex-shrink-0 p-4 md:p-6 flex flex-col gap-1 border-b border-white/[0.08] md:border-b-0 md:border-r md:border-white/[0.08]">
                    {/* Sidebar header */}
                    <div className="flex items-center gap-2 mb-3">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 flex-shrink-0">
                        <rect x="1" y="1" width="6" height="6" rx="1" stroke="#eee8cd" strokeWidth="1.5"/>
                        <rect x="11" y="1" width="6" height="6" rx="1" stroke="#eee8cd" strokeWidth="1.5"/>
                        <rect x="1" y="11" width="6" height="6" rx="1" stroke="#eee8cd" strokeWidth="1.5"/>
                        <rect x="11" y="11" width="6" height="6" rx="1" stroke="#eee8cd" strokeWidth="1.5"/>
                      </svg>
                      <span className="text-xs uppercase tracking-widest text-white/60 font-semibold">Categories</span>
                    </div>

                    {/* Category list — horizontal scroll on mobile, vertical on md+ */}
                    <ul className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                      {categories.map((cat) => {
                        const isActive = cat._id === selectedCategory;
                        return (
                          <li key={cat._id}>
                            <button
                              onClick={() => setSelectedCategory(cat._id)}
                              className={`whitespace-nowrap md:w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                                isActive
                                  ? "bg-yellow-400/15 text-yellow-400 font-semibold"
                                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
                              }`}
                            >
                              {cat.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Sidebar footer note — hide on mobile to save space */}
                    <div className="hidden md:block mt-auto pt-6">
                      <p className="text-[11px] text-white/30 leading-snug">
                        Looking for the complete list? Download the full SRM chart below.
                      </p>
                    </div>
                  </div>

                  {/* ── Right product grid ── */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Grid header */}
                    <div className="flex items-center gap-2 mb-5">
                      <span className="text-white/40 text-sm">→</span>
                      <span className="text-sm uppercase tracking-widest text-white/80 font-semibold">
                        {selectedCategoryName}
                      </span>
                    </div>

                    {/* Product cards */}
                    {filteredProducts.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-white/30 text-sm">No products found for this category.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" style={{ gap: 0 }}>
                        {filteredProducts.map((product, i) => (
                          <button
                            key={product._id}
                            onClick={() => setSelectedProduct(product)}
                            className="group cursor-pointer text-left w-full transition-all duration-150"
                            style={{
                              background: "rgba(30,28,26,0.85)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              margin: "-0.5px",
                              padding: "18px 16px 16px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "6px",
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = "rgba(50,46,40,0.95)";
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = "rgba(30,28,26,0.85)";
                            }}
                          >
                            {/* Index */}
                            <span style={{ fontSize: "0.58rem", color: "rgba(238,232,205,0.3)", fontWeight: 500, letterSpacing: "0.04em" }}>
                              {i + 1}
                            </span>
                            {/* Short name (large, bold) */}
                            <p
                              className="font-bold leading-none"
                              style={{
                                fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
                                color: "#eee8cd",
                                letterSpacing: "-0.01em",
                                margin: 0,
                              }}
                            >
                              {product.shortName || product.name}
                            </p>
                            {/* Full name (subtitle) */}
                            <p style={{ fontSize: "0.68rem", color: "rgba(238,232,205,0.45)", margin: 0, lineHeight: 1.4 }}>
                              {product.name}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Panel footer */}
              <div
                className="px-6 py-4 flex justify-center"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <a href="/BM-SRM-Chart-2026.pdf" target="_blank" download>
                  <DownButton>Download Full SRM Chart</DownButton>
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Container>
        <Seperator />
      </Container>

      {/* Product Datasheet Modal */}
      {selectedProduct && (
        <ProductSheetModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
