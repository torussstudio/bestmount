import { useState, useEffect } from "react";

import Container from "./layout/Container";
import Section from "./layout/Section";
import DownButton from "./layout/DownButton";
import Seperator from "./layout/seperator";
import API from "../api";
import ProductSheetModal from "./ProductSheetModal";

/* ─────────────────────────────────────────────
   Styles for the L-corner card design
───────────────────────────────────────────── */
const cardStyles = `
  .product-card-wrap {
    position: relative;
    background: #2b2c30;
    transition: background 0.15s;
    cursor: pointer;
    text-align: left;
    padding: 12px 14px 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0;
    width: 100%;
    border: none;
    outline: none;
    min-height: 90px;
  }
  .product-card-wrap:hover {
    background: #33343a;
  }
  /* L-corner spans – 14×14px, only two adjacent sides have a border */
  .lc {
    position: absolute;
    width: 14px;
    height: 14px;
    pointer-events: none;
    z-index: 2;
  }
  .lc-tl { top: 0; left: 0;
    border-top: 2.5px solid rgba(255,255,255,0.7);
    border-left: 2.5px solid rgba(255,255,255,0.7);
  }
  .lc-tr { top: 0; right: 0;
    border-top: 2.5px solid rgba(255,255,255,0.7);
    border-right: 2.5px solid rgba(255,255,255,0.7);
  }
  .lc-bl { bottom: 0; left: 0;
    border-bottom: 2.5px solid rgba(255,255,255,0.7);
    border-left: 2.5px solid rgba(255,255,255,0.7);
  }
  .lc-br { bottom: 0; right: 0;
    border-bottom: 2.5px solid rgba(255,255,255,0.7);
    border-right: 2.5px solid rgba(255,255,255,0.7);
  }

  /* Product grid */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
  @media (max-width: 640px) {
    .product-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media (min-width: 641px) and (max-width: 900px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

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
      <style>{cardStyles}</style>

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
                      <ProductGrid products={filteredProducts} onSelect={setSelectedProduct} />
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

/* ─────────────────────────────────────────────
   ProductGrid
   Renders cards in rows with L-shaped corner
   decorations and a thick horizontal divider
   between every row.
───────────────────────────────────────────── */
function ProductGrid({ products, onSelect }) {
  const COLS = 3;

  // Split flat product list into rows of COLS
  const rows = [];
  for (let i = 0; i < products.length; i += COLS) {
    rows.push(products.slice(i, i + COLS));
  }

  return (
    <div className="product-grid">
      {rows.map((row, rowIdx) => (
        <Row
          key={rowIdx}
          row={row}
          rowIdx={rowIdx}
          colSize={COLS}
          onSelect={onSelect}

        />
      ))}
    </div>
  );
}

function Row({ row, rowIdx, colSize, onSelect }) {
  return (
    <>

      {row.map((product, colIdx) => {
        const globalIdx = rowIdx * colSize + colIdx;
        return (
          <button
            key={product._id}
            className="product-card-wrap"
            onClick={() => onSelect(product)}
            aria-label={`View details for ${product.name}`}
          >
            {/* L-shaped corner borders */}
            <span className="lc lc-tl" />
            <span className="lc lc-tr" />
            <span className="lc lc-bl" />
            <span className="lc lc-br" />

            {/* Index – top-left, small muted number */}
            <span style={{
              fontSize: "0.55rem",
              color: "rgba(238,232,205,0.35)",
              fontWeight: 400,
              letterSpacing: "0.05em",
              marginBottom: 6,
            }}>
              {globalIdx + 1}
            </span>

            {/* Short name (large, bold expanded) */}
            <p
              style={{
                fontFamily: '"SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif',
                fontWeight: 900,
                fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)",
                color: "#eee8cd",
                letterSpacing: "0.01em",
                lineHeight: 1.05,
                margin: 0,
                marginBottom: 6,
              }}
            >
              {product.shortName || product.name}
            </p>

            {/* Subtitle – light weight, muted */}
            <p style={{
              fontFamily: '"SKODA Next", system-ui, sans-serif',
              fontWeight: 300,
              fontSize: "0.58rem",
              color: "rgba(238,232,205,0.4)",
              margin: 0,
              lineHeight: 1.4,
              letterSpacing: "0.02em",
            }}>
              {product.name}
            </p>
          </button>
        );
      })}
    </>
  );
}
