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
// const cardStyles = `
//   .product-card-wrap {
//     position: relative;
//     background-color: #1a1b1e;
//     background-image: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
//     transition: background-color 0.22s ease, border-color 0.22s ease;
//     cursor: pointer;
//     text-align: left;
//     padding: 26px 24px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
//     gap: 6px;
//     width: 100%;
//     border: none;
//     outline: none;
//     aspect-ratio: 1 / 1;
//     min-height: 0;
//     min-width: 0;
//     overflow: hidden;
//   }
//   @media (max-width: 640px) {
//     .product-card-wrap {
//       padding: 16px 12px;
//       align-items: center;
//       text-align: center;
//       justify-content: center;
//       gap: 8px;
//     }
//   }
//   .product-card-wrap:hover {
//     background-color: #3a2d00;
//   }
//   /* L-corners turn gold on hover */
//   .product-card-wrap:hover .lc {
//     border-color: rgba(230, 175, 0, 0.55);
//   }
//   /* Card text elements */
//   .card-index {
//     font-size: 0.55rem;
//     color: rgba(238,232,205,0.35);
//     font-weight: 400;
//     letter-spacing: 0.05em;
//     transition: color 0.22s ease;
//     margin-bottom:6px;
//   }
//   .card-name {
//     font-family: "SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif;
//     font-weight: 900;
//     font-size: clamp(0.9rem, 1.6vw, 1.15rem);
//     color: #eee8cd;
//     margin-bottom: 4px;
//   line-height: 1.05;
//     letter-spacing: 0.01em;
//     line-height: 1.05;
//     margin: 0;
//     transition: color 0.22s ease;
//   }
//   .card-subtitle {
//     font-family: "SKODA Next", system-ui, sans-serif;
//     font-weight: 300;
//     font-size: 0.58rem;
//     color: rgba(238,232,205,0.4);
//     margin: 0;  
//     opacity:.7;
//   line-height: 1.2; 
//     letter-spacing: 0.02em;
//     transition: color 0.22s ease;
//   }
//   .product-card-wrap:hover .card-index   { color: rgba(240, 185, 0, 0.65); }
//   .product-card-wrap:hover .card-name    { color: #f5c000; }
//   .product-card-wrap:hover .card-subtitle { color: rgba(240, 185, 0, 0.55); }

//   /* L-corner spans – 14×14px, only two adjacent sides have a border */
//   .lc {
//     position: absolute;
//     width: 14px;
//     height: 14px;
//     pointer-events: none;
//     z-index: 2;
//   }
//   .lc-tl { top: 0; left: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }
//   .lc-tr { top: 0; right: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }
//   .lc-bl { bottom: 0; left: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }
//   .lc-br { bottom: 0; right: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }

//   /* Product grid — shared-border technique so no line is ever doubled */
//   .product-grid {
//     display: grid;
//     grid-template-columns: repeat(3, minmax(0, 1fr));
//     gap: 0;
//     margin-left: 60px;
//     max-width: 780px;
//   }
  
//   .product-card-wrap {
//     border-right: 1px solid rgba(255,255,255,0.10);
//     border-bottom: 1px solid rgba(255,255,255,0.10);
//   }

//   /* Tablets */
//   @media (min-width: 641px) and (max-width: 1024px) {
//     .product-grid {
//       grid-template-columns: repeat(2, minmax(0, 1fr));
//       margin-left: 0;
//       max-width: 540px;
//     }
//   }

//   /* Mobile */
//   @media (max-width: 640px) {
//     .product-grid {
//       grid-template-columns: 1fr;
//       margin-left: auto;
//       margin-right: auto;
//       justify-items: center;
//       justify-content: center;
//       max-width: 280px;
//     }
//   }
//     @media (max-width: 640px) {
//   .product-card-wrap {
//     justify-content: center;
//     gap: 4px;   /* reduce */
//   }
// }
// `;

const cardStyles = `
  .product-card-wrap {
    position: relative;
    background-color: #1a1b1e;
    background-image: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
    transition: background-color 0.22s ease, border-color 0.22s ease;
    cursor: pointer;
    text-align: left;

    /* key spacing fix */
    padding: 36px 28px 28px 28px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    gap: 40px;

    width: 100%;
    border: none;
    outline: none;
    aspect-ratio: 1 / 1;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  @media (max-width: 640px) {
    .product-card-wrap {
      padding: 20px 18px;
      align-items: center;
      text-align: center;
      justify-content: center;
      gap: 6px;
    }
  }

  .product-card-wrap:hover {
    background-color: #3a2d00;
  }

  .product-card-wrap:hover .lc {
    border-color: rgba(230, 175, 0, 0.55);
  }

  /* text layout */
  .card-index {
  font-size: 0.60rem;
  color: rgba(238,232,205,0.35);
  font-weight: 400;
  letter-spacing: 0.05em;
  margin:0;  
   opacity:.75;            /* changed */
}

.card-name {
  font-family: "SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif;
  font-weight: 900;
  font-size: clamp(1rem, 1.9vw, 1.28rem);
  color: #eee8cd;

  margin:0;              /* changed */

  line-height:1.15;
  letter-spacing:0.01em;
}

.card-subtitle {
  font-family:"SKODA Next",system-ui,sans-serif;
  font-weight:300;
  font-size:0.62rem;
  color:rgba(238,232,205,0.45);

  margin:0;
opacity:.85;
  line-height:1.15;
  letter-spacing:0.02em;
}

  .product-card-wrap:hover .card-index   { color: rgba(240, 185, 0, 0.65); }
  .product-card-wrap:hover .card-name    { color: #f5c000; }
  .product-card-wrap:hover .card-subtitle { color: rgba(240, 185, 0, 0.55); }

  /* L corners */
  .lc {
    position: absolute;
    width: 14px;
    height: 14px;
    pointer-events: none;
    z-index: 2;
  }

  .lc-tl {
    top: 0;
    left: 0;
    border-top: 1.5px solid rgba(255,255,255,0.45);
    border-left: 1.5px solid rgba(255,255,255,0.45);
  }

  .lc-tr {
    top: 0;
    right: 0;
    border-top: 1.5px solid rgba(255,255,255,0.45);
    border-right: 1.5px solid rgba(255,255,255,0.45);
  }

  .lc-bl {
    bottom: 0;
    left: 0;
    border-bottom: 1.5px solid rgba(255,255,255,0.45);
    border-left: 1.5px solid rgba(255,255,255,0.45);
  }

  .lc-br {
    bottom: 0;
    right: 0;
    border-bottom: 1.5px solid rgba(255,255,255,0.45);
    border-right: 1.5px solid rgba(255,255,255,0.45);
  }

  /* grid untouched */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    margin-left: 60px;
    max-width: 780px;
  }

  .product-card-wrap {
    border-right: 1px solid rgba(255,255,255,0.10);
    border-bottom: 1px solid rgba(255,255,255,0.10);
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    .product-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-left: 0;
      max-width: 540px;
    }
  }

  @media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 cards */
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
  }
}

  @media (max-width: 640px) {
    .product-card-wrap {
      justify-content: center;
      gap: 4px;
    }
  }

  /* hide horizontal scrollbar (mobile) */
.scrollbar-hide{
  -ms-overflow-style: none;  /* IE, Edge */
  scrollbar-width: none;     /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar{
  display:none;              /* Chrome, Safari */
}
`;

export default function Materials() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        if (!catRes.ok || !prodRes.ok) {
          throw new Error("API request failed");
        }
        const cats = await catRes.json();
        const prods = await prodRes.json();
        setCategories(cats);
        setProducts(prods);
        if (cats.length > 0) setSelectedCategory(cats[0]._id);
      } catch (err) {
        console.error("Failed to load materials data", err);
        setError("Unable to load materials data from the server.");
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
       <Section className="min-h-[70vh] pt-16 md:pt-0">
          <Container>
            {/* Header row */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2 md:gap-x-12 mb-6">
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
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-24 min-h-[420px]">
                  <span className="text-sm text-red-500/80 uppercase tracking-widest mb-4">Error</span>
                  <p className="text-white/60">{error}</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row min-h-[420px]">
                  {/* ── Left sidebar ── */}
<div className="sticky top-[80px] md:top-[30px] z-30 rounded-t-2xl md:rounded-none bg-slate-50/20 backdrop-blur-md md:relative md:bg-transparent md:backdrop-blur-none md:w-65 flex-shrink-0 pt-0 pb-6 px-6 flex flex-col gap-1 border-b-2 border-white/[0.12] md:border-b-0 md:after:content-[''] after:hidden md:after:block after:absolute after:right-[-10px] after:top-[20px] after:bottom-[20px] after:w-[2px] after:bg-white/[0.12]">
                    {/* Sidebar header */}
                  <div className="flex items-center justify-center md:justify-start w-full gap-1.5 mb-3 ">
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
          <div className="hidden md:flex items-center justify-between mb-3 mt-0 pl-0 md:pl-6">
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
        <div className="px-4 md:px-6 pt-6 pb-10 flex items-end justify-center -mt-6 relative z-10">

  <a
    href="/BM-SRM-Chart-2026.pdf"
    target="_blank"
    download
    className="ml-50 max-md:ml-0"
  >
    <DownButton>
      Download Full SRM Chart
    </DownButton>

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
