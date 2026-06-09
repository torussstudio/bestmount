


/**
 * Materials.jsx
 *
 * Optimized for performance, readability, and maintainability.
 * - Zero design/UX/animation changes.
 * - Extracted constants, hooks, and sub-components.
 * - Eliminated redundant re-renders and memory leaks.
 * - Stable GSAP refs with proper cleanup.
 */

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
  lazy,
  Suspense,
} from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import PrimaryButton from "../components/layout/PrimaryButton";
import Container from "./layout/Container";
import Section from "./layout/Section";
import DownButton from "./layout/DownButton";
import Seperator from "./layout/seperator";
import API from "../api";

// ─── Lazy-loaded modal ───────────────────────────────────────────────────────
const ProductSheetModal = lazy(() => import("./ProductSheetModal"));

// ─── Constants ───────────────────────────────────────────────────────────────
const GRID_COLS = 3;
const STYLE_ID = "bm-card-styles";

// ─── Card / grid styles (injected once at module level) ──────────────────────
const CARD_STYLES = `
  .product-card-wrap {
    position: relative;
    background-color: #1a1b1e;
    background-image: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
    transition: background-color 0.22s ease, border-color 0.22s ease;
    cursor: pointer;
    text-align: left;
    padding: 36px 28px 28px 28px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 25px;
    width: 100%;
    border: none;
    outline: none;
    aspect-ratio: 1 / .80;
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

  .product-card-wrap:hover { background-color: #3a2d00; }
  .product-card-wrap:hover .lc { border-color: rgba(230, 175, 0, 0.55); }

  .card-index {
    font-size: 0.70rem;
    color: #eee8cd;
    font-weight: 400;
    letter-spacing: 0.05em;
    margin: 0;
    opacity: .75;
  }

  .card-name {
    font-family: "Barlow Condensed", "SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif;
    font-weight: 800;
    font-size: clamp(1.15rem, 2.2vw, 1.55rem);
    color: #eee8cd;
    margin: 0;
    line-height: 1.15;
    letter-spacing: 0.01em;
  }

  .card-subtitle {
    font-family: "SKODA Next", system-ui, sans-serif;
    font-weight: 300;
    font-size: 0.72rem;
    color: #eee8cd;
    margin: 0;
    opacity: .85;
    line-height: 1.15;
    letter-spacing: 0.02em;
  }

  .product-card-wrap:hover .card-index   { color: rgba(240, 185, 0, 0.65); }
  .product-card-wrap:hover .card-name    { color: #f5c000; }
  .product-card-wrap:hover .card-subtitle { color: rgba(240, 185, 0, 0.55); }

  .lc {
    position: absolute;
    width: 14px;
    height: 14px;
    pointer-events: none;
    z-index: 2;
  }
  .lc-tl { top: 0; left: 0;    border-top: 1.5px solid rgba(255,255,255,0.45); border-left: 1.5px solid rgba(255,255,255,0.45); }
  .lc-tr { top: 0; right: 0;   border-top: 1.5px solid rgba(255,255,255,0.45); border-right: 1.5px solid rgba(255,255,255,0.45); }
  .lc-bl { bottom: 0; left: 0; border-bottom: 1.5px solid rgba(255,255,255,0.45); border-left: 1.5px solid rgba(255,255,255,0.45); }
  .lc-br { bottom: 0; right: 0; border-bottom: 1.5px solid rgba(255,255,255,0.45); border-right: 1.5px solid rgba(255,255,255,0.45); }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    max-width: 720px;
    margin-inline: auto;
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
      grid-template-columns: repeat(2, 1fr);
      margin-left: 0;
      margin-right: 0;
      max-width: 100%;
    }
    .product-card-wrap { justify-content: center; gap: 13px; }
    .card-name    { font-size: 1.40rem; }
    .card-subtitle { font-size: 0.80rem; }
    .card-index   { font-size: 0.80rem; }
  }

  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }

  @keyframes card-scanline {
    0%   { transform: translateY(-100%); opacity: 0.18; }
    100% { transform: translateY(220%);  opacity: 0; }
  }
  .card-shimmer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 3;
  }
  .card-shimmer::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 38%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(245,192,0,0.06) 40%,
      rgba(245,192,0,0.12) 50%,
      rgba(245,192,0,0.06) 60%,
      transparent 100%
    );
    animation: card-scanline 0.72s cubic-bezier(0.4,0,0.2,1) forwards;
  }
`;

// Inject once at module level — safe across HMR because of the id guard
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = CARD_STYLES;
  document.head.appendChild(el);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns the string category id regardless of whether the field is populated. */
const getCategoryId = (product) =>
  typeof product.category === "object" ? product.category?._id : product.category;

// ─── Custom hooks ─────────────────────────────────────────────────────────────

/**
 * Fetches categories + products once on mount.
 * Returns { categories, products, loading, error }.
 */
function useMaterialsData() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          API.get("/categories"),
          API.get("/products?active=true"),
        ]);
        if (!mounted) return;
        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error("Failed to load materials data", err);
        if (mounted) setError("Unable to load materials data from the server.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, []); // intentionally empty — fetch once

  return { categories, products, loading, error };
}

/**
 * Animates the section header (label → title lines → paragraph lines)
 * once when the title element enters the viewport.
 */
function useSectionHeaderAnimation(labelRef, titleRef, paraRef) {
  useEffect(() => {
    gsap.registerPlugin(SplitText);
    if (!titleRef.current) return;

    let triggered = false;
    const splits = [];

    const splitEl = (el, opts) => {
      const s = SplitText.create(el, { linesClass: "overflow-hidden", ...opts });
      splits.push(s);
      return s;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || triggered) return;
          triggered = true;
          observer.disconnect();

          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(labelRef.current, {
              opacity: 0,
              y: 8,
              filter: "blur(4px)",
              duration: 0.5,
              clearProps: "opacity,y,filter",
            })
            .from(
              splitEl(titleRef.current, { type: "lines" }).lines,
              {
                y: "105%",
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                clearProps: "opacity,y,transform",
              },
              "-=0.3",
            )
            .from(
              splitEl(paraRef.current, { type: "lines" }).lines,
              {
                y: "105%",
                opacity: 0,
                duration: 0.7,
                stagger: 0.07,
                clearProps: "opacity,y,transform",
              },
              "-=0.5",
            );
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(titleRef.current);

    return () => {
      observer.disconnect();
      splits.forEach((s) => s.revert());
    };
  }, [labelRef, paraRef, titleRef]); // refs are stable — run once
}

/**
 * Runs a char-by-char stamp animation on the category header
 * every time `selectedCategory` changes.
 * Skips the animation when the same category fires again (e.g. on a
 * data-only re-render).
 */
function useCategoryHeaderAnimation(headerRef, selectedCategory, categories) {
  const timelineRef = useRef(null);
  const splitRef = useRef(null);
  const lastAnimatedIdRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || !selectedCategory) return;
    if (lastAnimatedIdRef.current === selectedCategory) return;
    lastAnimatedIdRef.current = selectedCategory;

    // 1. Kill any in-flight animation
    timelineRef.current?.kill();

    // 2. Revert previous split so the DOM is a clean text node
    splitRef.current?.revert();

    // 3. Write the correct text now that the DOM is clean
    el.textContent =
      categories.find((c) => c._id === selectedCategory)?.name ?? "";

    // 4. Re-split and animate
    splitRef.current = SplitText.create(el, {
      type: "chars",
      charsClass: "inline-block",
    });

    timelineRef.current = gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .from(splitRef.current.chars, {
        y: 14,
        opacity: 0,
        scaleY: 1.15,
        filter: "blur(5px)",
        duration: 1,
        stagger: { each: 0.026, from: "start" },
        clearProps: "opacity,y,scaleY,filter,transform",
      });

    return () => {
      timelineRef.current?.kill();
      splitRef.current?.revert();
    };
  }, [selectedCategory, categories, headerRef]);
}

/**
 * Animates product cards into view via clip-path forge-in
 * whenever `selectedCategory` changes.
 */
function useGridAnimation(gridWrapRef, selectedCategory) {
  const animate = useCallback(() => {
    if (!gridWrapRef.current) return;

    const cards = gridWrapRef.current.querySelectorAll(".product-card-wrap");
    if (!cards.length) return;

    // Cards
    gsap.killTweensOf(cards);
    gsap.set(cards, {
      opacity: 0,
      y: 24,
      scaleX: 0.97,
      filter: "blur(4px)",
      clipPath: "inset(100% 0% 0% 0%)",
    });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scaleX: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "expo.out",
      stagger: { each: 0.052, from: "start", grid: "auto" },
      clearProps: "opacity,y,scaleX,filter,clipPath",
      onComplete() {
        // Restart shimmer via void-reflow (reliable, no setTimeout chain)
        cards.forEach((card) => {
          const shimmer = card.querySelector(".card-shimmer");
          if (!shimmer) return;
          shimmer.classList.remove("card-shimmer");
          void shimmer.offsetWidth;
          shimmer.classList.add("card-shimmer");
        });
      },
    });

    // Corner accents
    const corners = gridWrapRef.current.querySelectorAll(".lc");
    gsap.killTweensOf(corners);
    gsap.set(corners, { opacity: 0 });
    gsap.to(corners, {
      opacity: 1,
      duration: 0.22,
      stagger: 0.01,
      delay: 0.18,
      ease: "power2.out",
      clearProps: "opacity",
    });
  }, [gridWrapRef]); // no deps — gridWrapRef is a stable ref

  useEffect(() => {
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [selectedCategory, animate]);
}

// ─── CategoryIcon (memoised SVG — never re-renders) ──────────────────────────
const CategoryIcon = memo(function CategoryIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[22px] h-[22px] md:w-[35px] md:h-[35px] flex-shrink-0 opacity-80 relative top-[1px]"
    >
      <mask id="cat-icon-mask">
        <rect x="0" y="0" width="24" height="24" fill="white" />
        <rect x="3.5" y="3.5" width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
        <rect x="10"  y="3.5" width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
        <rect x="3.5" y="10"  width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
        <circle cx="12.25" cy="12.25" r="2.25" fill="none" stroke="black" strokeWidth="1.25" />
      </mask>
      <rect x="0" y="0" width="18" height="18" rx="4.5" fill="#eee8cd" mask="url(#cat-icon-mask)" />
    </svg>
  );
});

// ─── DownloadButton (memoised — static UI, never re-renders) ─────────────────
const DownloadButton = memo(function DownloadButton() {
  return (
    <a
      href="/BM-SRM-Chart-2026.pdf"
      target="_blank"
      download
      className="
        group
        inline-flex items-center gap-2.5
        px-5 pr-6 py-3
        rounded-full
        text-[#efe5c8]
        bg-white/[0.06]
        border border-white/10
        backdrop-blur-xl
        shadow-[0_8px_24px_rgba(0,0,0,0.22)]
        transition-all duration-300
        hover:bg-white/[0.09]
        hover:scale-[1.02]
      "
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 shrink-0 text-[#facc15]">
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 5v10m0 0l-4-4m4 4l4-4M4 19h16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-[16px] font-medium leading-none tracking-[-0.02em]">
        Download Full SRM Chart
      </span>
    </a>
  );
});

// ─── ProductCard (memoised — re-renders only when product/onSelect change) ────
const ProductCard = memo(function ProductCard({ product, globalIndex, onSelect }) {
  const handleClick = useCallback(
    () => onSelect(product),
    [product, onSelect],
  );

  return (
    <button
      className="product-card-wrap"
      onClick={handleClick}
      aria-label={`View details for ${product.name}`}
    >
      <span className="lc lc-tl" />
      <span className="lc lc-tr" />
      <span className="lc lc-bl" />
      <span className="lc lc-br" />
      <span className="card-shimmer" aria-hidden="true" />
      <span className="card-index">{globalIndex + 1}</span>
      <p className="card-name">{product.shortName || product.name}</p>
      <p className="card-subtitle">{product.name}</p>
    </button>
  );
});

// ─── ProductGrid (memoised) ────────────────────────────────────────────────────
const ProductGrid = memo(function ProductGrid({ products, onSelect }) {
  return (
    <div className="product-grid">
      {products.map((product, idx) => (
        <ProductCard
          key={product._id}
          product={product}
          globalIndex={idx}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
});

// ─── LoadingState / ErrorState (tiny presentational components) ───────────────
function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24">
      <span className="text-sm text-white/40 uppercase tracking-widest">Loading…</span>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 min-h-[420px]">
      <span className="text-sm text-red-500/80 uppercase tracking-widest mb-4">Error</span>
      <p className="text-white/60">{message}</p>
    </div>
  );
}

// ─── CategoryList ─────────────────────────────────────────────────────────────
const CategoryList = memo(function CategoryList({
  categories,
  selectedCategory,
  listRef,
  onCategoryClick,
}) {
  return (
    <ul
      ref={listRef}
      className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide"
    >
      {categories.map((cat) => {
        const isActive = cat._id === selectedCategory;
        return (
          <li key={cat._id}>
            <button
              onClick={(e) => onCategoryClick(cat._id, e)}
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
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function Materials() {
  const { categories, products, loading, error } = useMaterialsData();

  const [selectedCategoryState, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectedCategory = selectedCategoryState || (categories.length > 0 ? categories[0]._id : null);

  // Scroll the active category button into view on mobile
  const categoryListRef = useRef(null);
  const handleCategoryClick = useCallback((id, event) => {
    setSelectedCategory(id);

    if (window.innerWidth < 768 && categoryListRef.current && event?.currentTarget) {
      const container = categoryListRef.current;
      const btn = event.currentTarget;
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const centerOffset =
        btnRect.left + btnRect.width / 2 -
        (containerRect.left + containerRect.width / 2);
      container.scrollTo({ left: container.scrollLeft + centerOffset, behavior: "smooth" });
    }
  }, []);

  // Animation refs
  const sectionLabelRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const sectionParaRef = useRef(null);
  const categoryHeaderRef = useRef(null);
  const gridWrapRef = useRef(null);

  // Animations
  useSectionHeaderAnimation(sectionLabelRef, sectionTitleRef, sectionParaRef);
  useCategoryHeaderAnimation(categoryHeaderRef, selectedCategory, categories);
  useGridAnimation(gridWrapRef, selectedCategory);

  const filteredProducts = useMemo(
    () => products.filter((p) => getCategoryId(p) === selectedCategory),
    [products, selectedCategory],
  );

  // Derived display name — used only for SSR/initial render before GSAP takes over
  const selectedCategoryName = useMemo(
    () => categories.find((c) => c._id === selectedCategory)?.name ?? "",
    [categories, selectedCategory],
  );

  return (
    <>
      <div id="materials">
        <Section className="min-h-[70vh] pt-6 md:pt-0">
          <Container>
            {/* ── Section header ── */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-1 md:gap-x-12 mb-6">
              <div className="md:col-span-3">
                <span
                  ref={sectionLabelRef}
                  className="text-sm uppercase tracking-wider"
                >
                  Our Materials
                </span>
              </div>
              <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
                <h2
                  ref={sectionTitleRef}
                  className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400"
                >
                  From Furnace to Function
                </h2>
                <p ref={sectionParaRef} className="mt-4">
                  Our curated portfolio of raw materials combines performance,
                  purity, and sustainability, supporting high-temperature
                  manufacturing while advancing the collective goal of reducing
                  carbon footprints.
                </p>
              </div>
            </div>

            {/* ── Main panel ── */}
            <div
              className="rounded-2xl bg-slate-50/20"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {loading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState message={error} />
              ) : (
                <div className="flex flex-col md:flex-row min-h-[420px]">
                  {/* Left sidebar */}
                  <div className="sticky top-[80px] md:top-[30px] z-30 rounded-t-2xl md:rounded-none bg-slate-50/20 backdrop-blur-md md:relative md:bg-transparent md:backdrop-blur-none md:w-65 flex-shrink-0 pt-5 pb-6 pl-9 pr-6 flex flex-col gap-1 border-b-2 border-white/[0.12] md:border-b-0 md:after:content-[''] after:hidden md:after:block after:absolute after:right-[-38px] after:top-[35px] after:bottom-[20px] after:w-[2px] after:bg-white/[0.12]">
                    {/* Sidebar header */}
                    <div className="flex items-center justify-center md:justify-start w-full gap-1.5 mb-3">
                      <CategoryIcon />
                      <span className="text-[24px] md:text-[38px] font-light text-[#eee8cd] tracking-wide">
                        Categories
                      </span>
                    </div>

                    {/* Category list */}
                    <CategoryList
                      categories={categories}
                      selectedCategory={selectedCategory}
                      listRef={categoryListRef}
                      onCategoryClick={handleCategoryClick}
                    />

                    {/* Sidebar footer note */}
                    <div className="hidden md:block mt-auto pt-7">
                      <div className="w-[180px] h-[1px] bg-white/[0.18] mb-4" />
                      <p className="text-[13px] text-white/60 italic font-light tracking-[0.02em] mb-2">
                        Looking for the complete list?
                      </p>
                      <p className="text-[13.5px] text-white/95 font-semibold leading-[1.32] w-[220px]">
                        Get the full Sustainable Raw Materials chart in one document.
                      </p>
                    </div>
                  </div>

                  {/* Right product grid */}
                  <div className="flex-1 pt-13 px-4 md:p-8 md:pl-14 flex flex-col">
                    {/* Grid header */}
                    <div className="hidden md:flex items-center justify-between mb-3 mt-4 ml-14 pl-0 md:pl-6">
                      <span className="text-[30px] font-light tracking-wide text-[#eee8cd] flex items-center gap-2">
                        <span className="opacity-70">→</span>
                        {/* Inner span managed by useCategoryHeaderAnimation */}
                        <span ref={categoryHeaderRef}>{selectedCategoryName}</span>
                      </span>
                    </div>

                    {/* Product cards */}
                    {filteredProducts.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-white/30 text-sm">
                          No products found for this category.
                        </p>
                      </div>
                    ) : (
                      <div ref={gridWrapRef} key={selectedCategory}>
                        <ProductGrid
                          products={filteredProducts}
                          onSelect={setSelectedProduct}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Panel footer */}
              <div className="px-4 md:px-6 pt-6 pb-12 flex justify-center md:justify-start relative z-10">
                <DownloadButton />
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Container>
        <Seperator />
      </Container>

      {/* Product datasheet modal — code-split, loads only when a card is opened */}
      <AnimatePresence>
        {selectedProduct && (
          <Suspense fallback={null}>
            <ProductSheetModal
              key="product-modal"
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}