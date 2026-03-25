import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    background-color: #1a1b1e;
    background-image: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
    transition: background-color 0.22s ease, border-color 0.22s ease;
    cursor: pointer;
    text-align: left;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0;
    width: 100%;
    border: none;
    outline: none;
    height: 160px;
    max-width:250px;
  }
  @media (max-width: 640px) {
    .product-card-wrap {
      height: auto;
      min-height: 140px;
      padding: 16px 12px;
      align-items: center;
      text-align: center;
      justify-content: center;
      gap: 8px;
      max-width: 100%;
    }
  }
  .product-card-wrap:hover {
    background-color: #3a2d00;
  }
  /* L-corners turn gold on hover */
  .product-card-wrap:hover .lc {
    border-color: rgba(230, 175, 0, 0.55);
  }
  /* Card text elements */
  .card-index {
    font-size: 0.55rem;
    color: rgba(238,232,205,0.35);
    font-weight: 400;
    letter-spacing: 0.05em;
    transition: color 0.22s ease;
  }
  .card-name {
    font-family: "SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif;
    font-weight: 900;
    font-size: clamp(0.9rem, 1.6vw, 1.15rem);
    color: #eee8cd;
    letter-spacing: 0.01em;
    line-height: 1.05;
    margin: 0;
    transition: color 0.22s ease;
  }
  .card-subtitle {
    font-family: "SKODA Next", system-ui, sans-serif;
    font-weight: 300;
    font-size: 0.58rem;
    color: rgba(238,232,205,0.4);
    margin: 0;
    line-height: 1.4;
    letter-spacing: 0.02em;
    transition: color 0.22s ease;
  }
  .product-card-wrap:hover .card-index   { color: rgba(240, 185, 0, 0.65); }
  .product-card-wrap:hover .card-name    { color: #f5c000; }
  .product-card-wrap:hover .card-subtitle { color: rgba(240, 185, 0, 0.55); }

  /* L-corner spans – 14×14px, only two adjacent sides have a border */
  .lc {
    position: absolute;
    width: 14px;
    height: 14px;
    pointer-events: none;
    z-index: 2;
  }
  .lc-tl { top: 0; left: 0;
    border-top: 1.5px solid rgba(255,255,255,0.45);
    border-left: 1.5px solid rgba(255,255,255,0.45);
  }
  .lc-tr { top: 0; right: 0;
    border-top: 1.5px solid rgba(255,255,255,0.45);
    border-right: 1.5px solid rgba(255,255,255,0.45);
  }
  .lc-bl { bottom: 0; left: 0;
    border-bottom: 1.5px solid rgba(255,255,255,0.45);
    border-left: 1.5px solid rgba(255,255,255,0.45);
  }
  .lc-br { bottom: 0; right: 0;
    border-bottom: 1.5px solid rgba(255,255,255,0.45);
    border-right: 1.5px solid rgba(255,255,255,0.45);
  }

  /* Product grid — shared-border technique so no line is ever doubled */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-left: 60px;
  }
  
  .product-card-wrap {
    border-right: 1px solid rgba(255,255,255,0.10);
    border-bottom: 1px solid rgba(255,255,255,0.10);
  }

  /* Tablets */
  @media (min-width: 641px) and (max-width: 1024px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
      margin-left: 0;
    }
    .product-card-wrap {
      max-width: 100%;
    }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .product-grid {
      grid-template-columns: 1fr;
      margin-left: 0;
      justify-items: center;
      justify-content: center;
    }
  }
`;

export default function Materials() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categoryListRef = useRef(null);

  const handleCategoryClick = (id, event) => {
    setSelectedCategory(id);
    if (window.innerWidth < 768 && categoryListRef.current && event?.currentTarget) {
      const container = categoryListRef.current;
      const btn = event.currentTarget;
      
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      
      const centerOffset = (btnRect.left + btnRect.width / 2) - (containerRect.left + containerRect.width / 2);
      
      container.scrollTo({
        left: container.scrollLeft + centerOffset,
        behavior: "smooth",
      });
    }
  };

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
              <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
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
              className="rounded-2xl bg-slate-50/20"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <span className="text-sm text-white/40 uppercase tracking-widest">Loading…</span>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row min-h-[420px]">
                  {/* ── Left sidebar ── */}
<div className="sticky top-[30px] z-30 rounded-t-2xl md:rounded-none bg-slate-50/20 backdrop-blur-md md:relative md:bg-transparent md:backdrop-blur-none md:w-65 flex-shrink-0 pt-0 pb-6 px-6 flex flex-col gap-1 border-b-2 border-white/[0.12] md:border-b-0 md:after:content-[''] after:hidden md:after:block after:absolute after:right-[-10px] after:top-[20px] after:bottom-[20px] after:w-[2px] after:bg-white/[0.12]">
                    {/* Sidebar header */}
                    <div className="flex items-center justify-center md:justify-start w-full gap-2.5 mb-5 mt-3 md:mt-0">
  <svg
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-[35px] h-[35px] flex-shrink-0 opacity-80 relative top-[1px]"
>
    <mask id="cat-icon-mask">
      <rect x="0" y="0" width="24" height="24" fill="white" />
      <rect x="3.5" y="3.5" width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
      <rect x="10" y="3.5" width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
      <rect x="3.5" y="10" width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
      <circle cx="12.25" cy="12.25" r="2.25" fill="none" stroke="black" strokeWidth="1.25" />
    </mask>

    <rect
      x="0"
      y="0"
      width="18"
      height="18"
      rx="4.5"
      fill="#eee8cd"
      mask="url(#cat-icon-mask)"
    />
  </svg>

  <span className="text-[38px] font-light text-[#eee8cd] tracking-wide">
    Categories
  </span>
</div>
                    {/* Category list — horizontal scroll on mobile, vertical on md+ */}
                    <ul 
                      ref={categoryListRef}
                      className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide"
                    >
                      {categories.map((cat) => {
                        const isActive = cat._id === selectedCategory;
                        return (
                          <li key={cat._id}>
                            <button
                              onClick={(e) => handleCategoryClick(cat._id, e)}
                              className={`whitespace-nowrap md:w-full text-left px-3 py-1.5 rounded-lg text-lg transition-all duration-150 ${
                                isActive
                                  ? "bg-gradient-to-r from-yellow-400/30 to-transparent text-yellow-400 font-semibold"
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
                    <div className="hidden md:block mt-auto pt-7">

  {/* divider */}
  <div className="w-[180px] h-[1px] bg-white/[0.18] mb-4"></div>

  {/* small line */}
  <p className="text-[13px] text-white/60 italic font-light tracking-[0.02em] mb-2">
    Looking for the complete list?
  </p>

  {/* main text */}
  <p className="text-[13.5px] text-white/95 font-semibold leading-[1.32] w-[220px]">
  Get the full Sustainable Raw Materials chart in one document.
</p>

</div>
                  </div>

                  {/* ── Right product grid ── */}
                 <div className="flex-1 p-4 md:p-6 md:pl-14 flex flex-col">
                    {/* Grid header */}
            <div className="flex items-center mb-5 mt-[6px] pl-0 md:pl-6">
  <span className="text-[30px] font-light tracking-wide text-[#eee8cd] flex items-center gap-2">
    <span className="opacity-70">→</span>
    {selectedCategoryName}
  </span>
</div>
                    {/* Product cards */}
                    {filteredProducts.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-white/30 text-sm">No products found for this category.</p>
                      </div>
                    ) : (
                      <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <ProductGrid products={filteredProducts} onSelect={setSelectedProduct} />
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* Panel footer */}
              <div className="px-4 md:px-6 pt-4 pb-8 md:pt-4 md:pb-10 flex justify-center mt-2 md:-mt-18 relative z-10">
                <a href="/BM-SRM-Chart-2026.pdf" target="_blank" download className="max-w-[95%] text-center">
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
      <AnimatePresence>
        {selectedProduct && (
          <ProductSheetModal
            key="product-modal"
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
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

            {/* Index */}
            <span className="card-index">{globalIdx + 1}</span>

            {/* Short name */}
            <p className="card-name">
              {product.shortName || product.name}
            </p>

            {/* Subtitle */}
            <p className="card-subtitle">{product.name}</p>
          </button>
        );
      })}
    </>
  );
}
