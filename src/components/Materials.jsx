// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import Container from "./layout/Container";
// import Section from "./layout/Section";
// import DownButton from "./layout/DownButton";
// import Seperator from "./layout/seperator";
// import API from "../api";
// import ProductSheetModal from "./ProductSheetModal";

// const cardStyles = `
//   .product-card-wrap {
//     position: relative;
//     background-color: #1a1b1e;
//     background-image: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
//     transition: background-color 0.22s ease, border-color 0.22s ease;
//     cursor: pointer;
//     text-align: left;

//     /* key spacing fix */
//     padding: 36px 28px 28px 28px;

//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;

//     gap: 25px;

//     width: 100%;
//     border: none;
//     outline: none;
//     aspect-ratio: 1 / .80;
//     min-height: 0;
//     min-width: 0;
//     overflow: hidden;
//   }

//   @media (max-width: 640px) {
//     .product-card-wrap {
//       padding: 20px 18px;
//       align-items: center;
//       text-align: center;
//       justify-content: center;
//       gap: 6px;
//     }
//   }

//   .product-card-wrap:hover {
//     background-color: #3a2d00;
//   }

//   .product-card-wrap:hover .lc {
//     border-color: rgba(230, 175, 0, 0.55);
//   }

//   /* text layout */
//   .card-index {
//   font-size: 0.70rem;
//   color: #eee8cd;
//   font-weight: 400;
//   letter-spacing: 0.05em;
//   margin:0;  
//    opacity:.75;            /* changed */
// }

// .card-name {
//   font-family: "Barlow Condensed", "SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif;
//   font-weight: 800;
//   font-size: clamp(1.15rem, 2.2vw, 1.55rem);
//   color: #eee8cd;
//   margin: 0;
//   line-height: 1.15;
//   letter-spacing: 0.01em;
// }

// .card-subtitle {
//   font-family:"SKODA Next",system-ui,sans-serif;
//   font-weight:300;
//   font-size:0.72rem;
//   color:#eee8cd;

//   margin:0;
// opacity:.85;
//   line-height:1.15;
//   letter-spacing:0.02em;
// }

//   .product-card-wrap:hover .card-index   { color: rgba(240, 185, 0, 0.65); }
//   .product-card-wrap:hover .card-name    { color: #f5c000; }
//   .product-card-wrap:hover .card-subtitle { color: rgba(240, 185, 0, 0.55); }

//   /* L corners */
//   .lc {
//     position: absolute;
//     width: 14px;
//     height: 14px;
//     pointer-events: none;
//     z-index: 2;
//   }

//   .lc-tl {
//     top: 0;
//     left: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-tr {
//     top: 0;
//     right: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-bl {
//     bottom: 0;
//     left: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-br {
//     bottom: 0;
//     right: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }

//   /* grid untouched */
//  .product-grid {
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 0;
//   max-width: 720px;
//   margin-inline: auto; /* center grid */
// }

//   .product-card-wrap {
//     border-right: 1px solid rgba(255,255,255,0.10);
//     border-bottom: 1px solid rgba(255,255,255,0.10);
//   }

//   @media (min-width: 641px) and (max-width: 1024px) {
//     .product-grid {
//       grid-template-columns: repeat(2, minmax(0, 1fr));
//       margin-left: 0;
//       max-width: 540px;
//     }
//   }

//   @media (max-width: 640px) {
//   .product-grid {
//     grid-template-columns: repeat(2, 1fr); /* 2 cards */
//     margin-left: 0;
//     margin-right: 0;
//     max-width: 100%;
//   }
// }

//   @media (max-width: 640px) {
//     .product-card-wrap {
//       justify-content: center;
//       gap: 13px;
//     }
//   }

//   @media (max-width: 640px){

//   .card-name{
//     font-size: 1.40rem;   /* increase title */
//   }

//   .card-subtitle{
//     font-size: 0.80rem;   /* increase subtitle */
//   }

//   .card-index{
//     font-size: 0.80rem;   /* optional */
//   }

// }

//   /* hide horizontal scrollbar (mobile) */
// .scrollbar-hide{
//   -ms-overflow-style: none;  /* IE, Edge */
//   scrollbar-width: none;     /* Firefox */
// }

// .scrollbar-hide::-webkit-scrollbar{
//   display:none;              /* Chrome, Safari */
// }
// `;

// export default function Materials() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const categoryListRef = useRef(null);

//   const handleCategoryClick = (id, event) => {
//     setSelectedCategory(id);
//     if (
//       window.innerWidth < 768 &&
//       categoryListRef.current &&
//       event?.currentTarget
//     ) {
//       const container = categoryListRef.current;
//       const btn = event.currentTarget;

//       const containerRect = container.getBoundingClientRect();
//       const btnRect = btn.getBoundingClientRect();

//       const centerOffset =
//         btnRect.left +
//         btnRect.width / 2 -
//         (containerRect.left + containerRect.width / 2);

//       container.scrollTo({
//         left: container.scrollLeft + centerOffset,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [catRes, prodRes] = await Promise.all([
//           fetch(`${API}/categories`),
//           fetch(`${API}/products`),
//         ]);
//         if (!catRes.ok || !prodRes.ok) {
//           throw new Error("API request failed");
//         }
//         const cats = await catRes.json();
//         const prods = await prodRes.json();
//         setCategories(cats);
//         setProducts(prods);
//         if (cats.length > 0) setSelectedCategory(cats[0]._id);
//       } catch (err) {
//         console.error("Failed to load materials data", err);
//         setError("Unable to load materials data from the server.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const filteredProducts = products.filter(
//     (p) => p.category?._id === selectedCategory,
//   );

//   const selectedCategoryName =
//     categories.find((c) => c._id === selectedCategory)?.name ?? "";

//   return (
//     <>
//       <style>{cardStyles}</style>

//       <div id="materials">
//         <Section className="min-h-[70vh] pt-6 md:pt-0">
//           <Container>
//             {/* Header row */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-1 md:gap-x-12 mb-6">
//               <div className="md:col-span-3">
//                 <span className="text-sm uppercase tracking-wider">
//                   Our Materials
//                 </span>
//               </div>
//               <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
//                 <h2 className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400">
//                   From Furnace to Function
//                 </h2>
//                 <p className="mt-4">
//                   Our curated portfolio of raw materials combines performance,
//                   purity, and sustainability, supporting high-temperature
//                   manufacturing while advancing the collective goal of reducing
//                   carbon footprints.
//                 </p>
//               </div>
//             </div>

//             {/* Main panel */}
//             <div
//               className="rounded-2xl bg-slate-50/20"
//               style={{ border: "1px solid rgba(255,255,255,0.08)" }}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center py-24">
//                   <span className="text-sm text-white/40 uppercase tracking-widest">
//                     Loading…
//                   </span>
//                 </div>
//               ) : error ? (
//                 <div className="flex flex-col items-center justify-center py-24 min-h-[420px]">
//                   <span className="text-sm text-red-500/80 uppercase tracking-widest mb-4">
//                     Error
//                   </span>
//                   <p className="text-white/60">{error}</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col md:flex-row min-h-[420px]">
//                   {/* ── Left sidebar ── */}
//                   <div className="sticky top-[80px] md:top-[30px] z-30 rounded-t-2xl md:rounded-none bg-slate-50/20 backdrop-blur-md md:relative md:bg-transparent md:backdrop-blur-none md:w-65 flex-shrink-0 pt-0 pb-6 px-6 flex flex-col gap-1 border-b-2 border-white/[0.12] md:border-b-0 md:after:content-[''] after:hidden md:after:block after:absolute after:right-[-10px] after:top-[20px] after:bottom-[20px] after:w-[2px] after:bg-white/[0.12]">
//                     {/* Sidebar header */}
//                     <div className="flex items-center justify-center md:justify-start w-full gap-1.5 mb-3 ">
//                       <svg
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-[35px] h-[35px] flex-shrink-0 opacity-80 relative top-[1px]"
//                       >
//                         <mask id="cat-icon-mask">
//                           <rect
//                             x="0"
//                             y="0"
//                             width="24"
//                             height="24"
//                             fill="white"
//                           />
//                           <rect
//                             x="3.5"
//                             y="3.5"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <rect
//                             x="10"
//                             y="3.5"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <rect
//                             x="3.5"
//                             y="10"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <circle
//                             cx="12.25"
//                             cy="12.25"
//                             r="2.25"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                         </mask>

//                         <rect
//                           x="0"
//                           y="0"
//                           width="18"
//                           height="18"
//                           rx="4.5"
//                           fill="#eee8cd"
//                           mask="url(#cat-icon-mask)"
//                         />
//                       </svg>

//                       <span className="text-[38px] font-light text-[#eee8cd] tracking-wide">
//                         Categories
//                       </span>
//                     </div>
//                     {/* Category list — horizontal scroll on mobile, vertical on md+ */}
//                     <ul
//                       ref={categoryListRef}
//                       className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide"
//                     >
//                       {categories.map((cat) => {
//                         const isActive = cat._id === selectedCategory;
//                         return (
//                           <li key={cat._id}>
//                             <button
//                               onClick={(e) => handleCategoryClick(cat._id, e)}
//                               className={`whitespace-nowrap md:w-full text-left px-3 py-1.5 rounded-lg text-lg transition-all duration-150 ${
//                                 isActive
//                                   ? "bg-gradient-to-r from-yellow-400/30 to-transparent text-yellow-400 font-semibold"
//                                   : "text-white/50 hover:text-white/80 hover:bg-white/5"
//                               }`}
//                             >
//                               {cat.name}
//                             </button>
//                           </li>
//                         );
//                       })}
//                     </ul>

//                     {/* Sidebar footer note — hide on mobile to save space */}
//                     <div className="hidden md:block mt-auto pt-7">
//                       {/* divider */}
//                       <div className="w-[180px] h-[1px] bg-white/[0.18] mb-4"></div>

//                       {/* small line */}
//                       <p className="text-[13px] text-white/60 italic font-light tracking-[0.02em] mb-2">
//                         Looking for the complete list?
//                       </p>

//                       {/* main text */}
//                       <p className="text-[13.5px] text-white/95 font-semibold leading-[1.32] w-[220px]">
//                         Get the full Sustainable Raw Materials chart in one
//                         document.
//                       </p>
//                     </div>
//                   </div>

//                   {/* ── Right product grid ── */}
//                   <div className="flex-1 p-4 md:p-6 md:pl-14 flex flex-col">
//                     {/* Grid header */}
//                     <div className="hidden md:flex items-center justify-between mb-3 mt-2 pl-0 md:pl-6">
//                       <span className="text-[30px] font-light tracking-wide text-[#eee8cd] flex items-center gap-2">
//                         <span className="opacity-70">→</span>
//                         {selectedCategoryName}
//                       </span>
//                     </div>
//                     {/* Product cards */}
//                     {filteredProducts.length === 0 ? (
//                       <div className="flex-1 flex items-center justify-center">
//                         <p className="text-white/30 text-sm">
//                           No products found for this category.
//                         </p>
//                       </div>
//                     ) : (
//                       <motion.div
//                         key={selectedCategory}
//                         initial={{ opacity: 0, y: 12 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.3, ease: "easeOut" }}
//                       >
//                         <ProductGrid
//                           products={filteredProducts}
//                           onSelect={setSelectedProduct}
//                         />
//                       </motion.div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Panel footer */}
//               <div className="px-4 md:px-6 pt-6 pb-10 flex items-end justify-center -mt-6 relative z-10">
//                 <a
//                   href="/BM-SRM-Chart-2026.pdf"
//                   target="_blank"
//                   download
//                   className="ml-50 max-md:ml-0"
//                 >
//                   <DownButton>Download Full SRM Chart</DownButton>
//                 </a>
//               </div>
//             </div>
//           </Container>
//         </Section>
//       </div>

//       <Container>
//         <Seperator />
//       </Container>

//       {/* Product Datasheet Modal */}
//       <AnimatePresence>
//         {selectedProduct && (
//           <ProductSheetModal
//             key="product-modal"
//             product={selectedProduct}
//             onClose={() => setSelectedProduct(null)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    ProductGrid
//    Renders cards in rows with L-shaped corner
//    decorations and a thick horizontal divider
//    between every row.
// ───────────────────────────────────────────── */
// function ProductGrid({ products, onSelect }) {
//   const COLS = 3;

//   // Split flat product list into rows of COLS
//   const rows = [];
//   for (let i = 0; i < products.length; i += COLS) {
//     rows.push(products.slice(i, i + COLS));
//   }

//   return (
//     <div className="product-grid">
//       {rows.map((row, rowIdx) => (
//         <Row
//           key={rowIdx}
//           row={row}
//           rowIdx={rowIdx}
//           colSize={COLS}
//           onSelect={onSelect}
//         />
//       ))}
//     </div>
//   );
// }

// function Row({ row, rowIdx, colSize, onSelect }) {
//   return (
//     <>
//       {row.map((product, colIdx) => {
//         const globalIdx = rowIdx * colSize + colIdx;
//         return (
//           <button
//             key={product._id}
//             className="product-card-wrap"
//             onClick={() => onSelect(product)}
//             aria-label={`View details for ${product.name}`}
//           >
//             {/* L-shaped corner borders */}
//             <span className="lc lc-tl" />
//             <span className="lc lc-tr" />
//             <span className="lc lc-bl" />
//             <span className="lc lc-br" />

//             {/* Index */}
//             <span className="card-index">{globalIdx + 1}</span>

//             {/* Short name */}
//             <p className="card-name">{product.shortName || product.name}</p>

//             {/* Subtitle */}
//             <p className="card-subtitle">{product.name}</p>
//           </button>
//         );
//       })}
//     </>
//   );
// }


// import { useState, useEffect, useRef, useCallback } from "react";
// import { AnimatePresence } from "framer-motion";
// import gsap from "gsap";
// import SplitText from "gsap/SplitText";

// import Container from "./layout/Container";
// import Section from "./layout/Section";
// import DownButton from "./layout/DownButton";
// import Seperator from "./layout/seperator";
// import API from "../api";
// import ProductSheetModal from "./ProductSheetModal";

// gsap.registerPlugin(SplitText);

// const cardStyles = `
//   .product-card-wrap {
//     position: relative;
//     background-color: #1a1b1e;
//     background-image: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
//     transition: background-color 0.22s ease, border-color 0.22s ease;
//     cursor: pointer;
//     text-align: left;
//     padding: 36px 28px 28px 28px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;
//     gap: 25px;
//     width: 100%;
//     border: none;
//     outline: none;
//     aspect-ratio: 1 / .80;
//     min-height: 0;
//     min-width: 0;
//     overflow: hidden;
//   }

//   @media (max-width: 640px) {
//     .product-card-wrap {
//       padding: 20px 18px;
//       align-items: center;
//       text-align: center;
//       justify-content: center;
//       gap: 6px;
//     }
//   }

//   .product-card-wrap:hover {
//     background-color: #3a2d00;
//   }

//   .product-card-wrap:hover .lc {
//     border-color: rgba(230, 175, 0, 0.55);
//   }

//   .card-index {
//     font-size: 0.70rem;
//     color: #eee8cd;
//     font-weight: 400;
//     letter-spacing: 0.05em;
//     margin: 0;
//     opacity: .75;
//   }

//   .card-name {
//     font-family: "Barlow Condensed", "SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif;
//     font-weight: 800;
//     font-size: clamp(1.15rem, 2.2vw, 1.55rem);
//     color: #eee8cd;
//     margin: 0;
//     line-height: 1.15;
//     letter-spacing: 0.01em;
//   }

//   .card-subtitle {
//     font-family: "SKODA Next", system-ui, sans-serif;
//     font-weight: 300;
//     font-size: 0.72rem;
//     color: #eee8cd;
//     margin: 0;
//     opacity: .85;
//     line-height: 1.15;
//     letter-spacing: 0.02em;
//   }

//   .product-card-wrap:hover .card-index   { color: rgba(240, 185, 0, 0.65); }
//   .product-card-wrap:hover .card-name    { color: #f5c000; }
//   .product-card-wrap:hover .card-subtitle { color: rgba(240, 185, 0, 0.55); }

//   /* L corners */
//   .lc {
//     position: absolute;
//     width: 14px;
//     height: 14px;
//     pointer-events: none;
//     z-index: 2;
//     transition: border-color 0.22s ease;
//   }

//   .lc-tl {
//     top: 0; left: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }
//   .lc-tr {
//     top: 0; right: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }
//   .lc-bl {
//     bottom: 0; left: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }
//   .lc-br {
//     bottom: 0; right: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }

//   /* grid */
//   .product-grid {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 0;
//     max-width: 720px;
//     margin-inline: auto;
//   }

//   .product-card-wrap {
//     border-right: 1px solid rgba(255,255,255,0.10);
//     border-bottom: 1px solid rgba(255,255,255,0.10);
//   }

//   @media (min-width: 641px) and (max-width: 1024px) {
//     .product-grid {
//       grid-template-columns: repeat(2, minmax(0, 1fr));
//       margin-left: 0;
//       max-width: 540px;
//     }
//   }

//   @media (max-width: 640px) {
//     .product-grid {
//       grid-template-columns: repeat(2, 1fr);
//       margin-left: 0;
//       margin-right: 0;
//       max-width: 100%;
//     }
//     .product-card-wrap {
//       justify-content: center;
//       gap: 13px;
//     }
//     .card-name    { font-size: 1.40rem; }
//     .card-subtitle { font-size: 0.80rem; }
//     .card-index   { font-size: 0.80rem; }
//   }

//   .scrollbar-hide {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
//   .scrollbar-hide::-webkit-scrollbar { display: none; }

//   /* ── Card scan-line shimmer on enter ── */
//   @keyframes card-scanline {
//     0%   { transform: translateY(-100%); opacity: 0.18; }
//     100% { transform: translateY(200%);  opacity: 0; }
//   }

//   .card-shimmer {
//     position: absolute;
//     inset: 0;
//     pointer-events: none;
//     overflow: hidden;
//     z-index: 3;
//   }

//   .card-shimmer::after {
//     content: '';
//     position: absolute;
//     left: 0; right: 0;
//     height: 40%;
//     background: linear-gradient(
//       to bottom,
//       transparent 0%,
//       rgba(245, 192, 0, 0.07) 40%,
//       rgba(245, 192, 0, 0.13) 50%,
//       rgba(245, 192, 0, 0.07) 60%,
//       transparent 100%
//     );
//     animation: card-scanline 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
//   }

//   /* ── L-corner draw animation ── */
//   @keyframes lc-grow-h {
//     from { width: 0; }
//     to   { width: 14px; }
//   }
//   @keyframes lc-grow-v {
//     from { height: 0; }
//     to   { height: 14px; }
//   }

//   .lc-animate {
//     width: 0;
//     height: 0;
//     animation:
//       lc-grow-h 0.22s ease forwards,
//       lc-grow-v 0.22s ease forwards;
//   }
// `;

// /* ─────────────────────────────────────────────────────────────
//    Category header — SplitText reveal matching Home.jsx style
// ───────────────────────────────────────────────────────────── */
// function useCategoryReveal(headerRef, name) {
//   const tlRef = useRef(null);
//   const splitRef = useRef(null);

//   useEffect(() => {
//     if (!headerRef.current || !name) return;

//     // Kill previous
//     tlRef.current?.kill();
//     splitRef.current?.revert();

//     splitRef.current = SplitText.create(headerRef.current, {
//       type: "chars",
//       charsClass: "inline-block",
//     });

//     // Stagger chars: each char slides + blurs in from below
//     // Industrial feel: chars stamp in left→right with slight scale punch
//     tlRef.current = gsap.timeline({ defaults: { ease: "expo.out" } });

//     tlRef.current.from(splitRef.current.chars, {
//       y:        14,
//       opacity:  0,
//       scaleY:   1.18,
//       filter:   "blur(5px)",
//       duration: 0.55,
//       stagger: {
//         each:   0.028,
//         from:   "start",
//       },
//     });

//     return () => {
//       tlRef.current?.kill();
//       splitRef.current?.revert();
//     };
//   }, [name]);
// }

// /* ─────────────────────────────────────────────────────────────
//    Section header — SplitText lines, same style as Home.jsx
// ───────────────────────────────────────────────────────────── */
// function useSectionHeaderReveal(titleRef, paraRef, labelRef) {
//   useEffect(() => {
//     if (!titleRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) return;

//           const splits = [];
//           const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

//           const makeSplit = (el, opts) => {
//             const s = SplitText.create(el, { linesClass: "overflow-hidden", ...opts });
//             splits.push(s);
//             return s;
//           };

//           if (labelRef?.current) {
//             tl.from(labelRef.current, {
//               opacity: 0, y: 8, filter: "blur(4px)", duration: 0.5,
//             });
//           }

//           const title = makeSplit(titleRef.current, { type: "lines" });
//           tl.from(
//             title.lines,
//             { y: "105%", opacity: 0, duration: 0.85, stagger: 0.09 },
//             "-=0.3"
//           );

//           if (paraRef?.current) {
//             const para = makeSplit(paraRef.current, { type: "lines" });
//             tl.from(
//               para.lines,
//               { y: "105%", opacity: 0, duration: 0.7, stagger: 0.07 },
//               "-=0.5"
//             );
//           }

//           return () => {
//             tl.kill();
//             splits.forEach((s) => s.revert());
//           };
//         });
//       },
//       { threshold: 0.3 }
//     );

//     if (titleRef.current) observer.observe(titleRef.current);
//     return () => {
//       if (titleRef.current) observer.unobserve(titleRef.current);
//     };
//   }, []);
// }

// export default function Materials() {
//   const [categories, setCategories]     = useState([]);
//   const [products, setProducts]         = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading]           = useState(true);
//   const [error, setError]               = useState(null);
//   const [selectedProduct, setSelectedProduct]   = useState(null);

//   const categoryListRef = useRef(null);
//   const gridWrapRef     = useRef(null);
//   const categoryHeaderRef = useRef(null);

//   // Section header refs
//   const sectionLabelRef = useRef(null);
//   const sectionTitleRef = useRef(null);
//   const sectionParaRef  = useRef(null);

//   // Section header reveal (once on scroll)
//   useSectionHeaderReveal(sectionTitleRef, sectionParaRef, sectionLabelRef);

//   // Category name header char reveal on every category switch
//   const selectedCategoryName =
//     categories.find((c) => c._id === selectedCategory)?.name ?? "";
//   useCategoryReveal(categoryHeaderRef, selectedCategoryName);

//   /* ── Grid entrance: cards forge in on category change ── */
//   const animateGrid = useCallback(() => {
//     if (!gridWrapRef.current) return;

//     const cards = gridWrapRef.current.querySelectorAll(".product-card-wrap");
//     if (!cards.length) return;

//     // Kill any running grid tl
//     gsap.killTweensOf(cards);

//     // Phase 1 — clip-path wipe: cards reveal from bottom edge upward
//     // Phase 2 — subtle scale settle + scanline shimmer class
//     gsap.set(cards, {
//       opacity:   0,
//       y:         28,
//       scaleX:    0.97,
//       filter:    "blur(4px)",
//       clipPath:  "inset(100% 0% 0% 0%)",
//     });

//     gsap.to(cards, {
//       opacity:  1,
//       y:        0,
//       scaleX:   1,
//       filter:   "blur(0px)",
//       clipPath: "inset(0% 0% 0% 0%)",
//       duration: 0.62,
//       ease:     "expo.out",
//       stagger: {
//         each: 0.055,
//         from: "start",   // left→right, top→bottom — reading order
//         grid: "auto",
//       },
//       onComplete: () => {
//         // Trigger scanline shimmer on each card after it lands
//         cards.forEach((card, i) => {
//           setTimeout(() => {
//             const shimmer = card.querySelector(".card-shimmer");
//             if (shimmer) {
//               shimmer.classList.remove("card-shimmer");
//               // Force reflow then re-add to restart animation
//               void shimmer.offsetWidth;
//               shimmer.classList.add("card-shimmer");
//             }
//           }, i * 55);
//         });
//       },
//     });

//     // L-corners: draw in slightly after card body lands
//     const corners = gridWrapRef.current.querySelectorAll(".lc");
//     gsap.set(corners, { opacity: 0 });
//     gsap.to(corners, {
//       opacity:  1,
//       duration: 0.25,
//       stagger:  0.012,
//       delay:    0.18,
//       ease:     "power2.out",
//     });
//   }, []);

//   /* Run grid anim when category OR products change */
//   useEffect(() => {
//     // Small defer so React has painted the new cards
//     const id = requestAnimationFrame(() => {
//       requestAnimationFrame(animateGrid);
//     });
//     return () => cancelAnimationFrame(id);
//   }, [selectedCategory, products, animateGrid]);

//   /* ── Category sidebar item: highlight bar slides in ── */
//   const handleCategoryClick = (id, event) => {
//     if (id === selectedCategory) return;
//     setSelectedCategory(id);

//     if (
//       window.innerWidth < 768 &&
//       categoryListRef.current &&
//       event?.currentTarget
//     ) {
//       const container = categoryListRef.current;
//       const btn = event.currentTarget;
//       const containerRect = container.getBoundingClientRect();
//       const btnRect = btn.getBoundingClientRect();
//       const centerOffset =
//         btnRect.left + btnRect.width / 2 -
//         (containerRect.left + containerRect.width / 2);
//       container.scrollTo({
//         left: container.scrollLeft + centerOffset,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [catRes, prodRes] = await Promise.all([
//           fetch(`${API}/categories`),
//           fetch(`${API}/products`),
//         ]);
//         if (!catRes.ok || !prodRes.ok) throw new Error("API request failed");
//         const cats  = await catRes.json();
//         const prods = await prodRes.json();
//         setCategories(cats);
//         setProducts(prods);
//         if (cats.length > 0) setSelectedCategory(cats[0]._id);
//       } catch (err) {
//         console.error("Failed to load materials data", err);
//         setError("Unable to load materials data from the server.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const filteredProducts = products.filter(
//     (p) => p.category?._id === selectedCategory
//   );

//   return (
//     <>
//       <style>{cardStyles}</style>

//       <div id="materials">
//         <Section className="min-h-[70vh] pt-6 md:pt-0">
//           <Container>

//             {/* ── Section header — SplitText lines ── */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-1 md:gap-x-12 mb-6">
//               <div className="md:col-span-3">
//                 <span ref={sectionLabelRef} className="text-sm uppercase tracking-wider">
//                   Our Materials
//                 </span>
//               </div>
//               <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
//                 <h2
//                   ref={sectionTitleRef}
//                   className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400"
//                 >
//                   From Furnace to Function
//                 </h2>
//                 <p ref={sectionParaRef} className="mt-4">
//                   Our curated portfolio of raw materials combines performance,
//                   purity, and sustainability, supporting high-temperature
//                   manufacturing while advancing the collective goal of reducing
//                   carbon footprints.
//                 </p>
//               </div>
//             </div>

//             {/* ── Main panel ── */}
//             <div
//               className="rounded-2xl bg-slate-50/20"
//               style={{ border: "1px solid rgba(255,255,255,0.08)" }}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center py-24">
//                   <span className="text-sm text-white/40 uppercase tracking-widest">
//                     Loading…
//                   </span>
//                 </div>
//               ) : error ? (
//                 <div className="flex flex-col items-center justify-center py-24 min-h-[420px]">
//                   <span className="text-sm text-red-500/80 uppercase tracking-widest mb-4">Error</span>
//                   <p className="text-white/60">{error}</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col md:flex-row min-h-[420px]">

//                   {/* ── Left sidebar ── */}
//                   <div className="sticky top-[80px] md:top-[30px] z-30 rounded-t-2xl md:rounded-none bg-slate-50/20 backdrop-blur-md md:relative md:bg-transparent md:backdrop-blur-none md:w-65 flex-shrink-0 pt-0 pb-6 px-6 flex flex-col gap-1 border-b-2 border-white/[0.12] md:border-b-0 md:after:content-[''] after:hidden md:after:block after:absolute after:right-[-10px] after:top-[20px] after:bottom-[20px] after:w-[2px] after:bg-white/[0.12]">
//                     {/* Sidebar header */}
//                     <div className="flex items-center justify-center md:justify-start w-full gap-1.5 mb-3">
//                       <svg
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-[35px] h-[35px] flex-shrink-0 opacity-80 relative top-[1px]"
//                       >
//                         <mask id="cat-icon-mask">
//                           <rect x="0" y="0" width="24" height="24" fill="white" />
//                           <rect x="3.5" y="3.5" width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
//                           <rect x="10" y="3.5" width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
//                           <rect x="3.5" y="10" width="4.5" height="4.5" rx="0.5" fill="none" stroke="black" strokeWidth="1.25" />
//                           <circle cx="12.25" cy="12.25" r="2.25" fill="none" stroke="black" strokeWidth="1.25" />
//                         </mask>
//                         <rect x="0" y="0" width="18" height="18" rx="4.5" fill="#eee8cd" mask="url(#cat-icon-mask)" />
//                       </svg>
//                       <span className="text-[38px] font-light text-[#eee8cd] tracking-wide">
//                         Categories
//                       </span>
//                     </div>

//                     {/* Category list */}
//                     <ul
//                       ref={categoryListRef}
//                       className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide"
//                     >
//                       {categories.map((cat) => {
//                         const isActive = cat._id === selectedCategory;
//                         return (
//                           <li key={cat._id}>
//                             <button
//                               onClick={(e) => handleCategoryClick(cat._id, e)}
//                               className={`whitespace-nowrap md:w-full text-left px-3 py-1.5 rounded-lg text-lg transition-all duration-150 ${
//                                 isActive
//                                   ? "bg-gradient-to-r from-yellow-400/30 to-transparent text-yellow-400 font-semibold"
//                                   : "text-white/50 hover:text-white/80 hover:bg-white/5"
//                               }`}
//                             >
//                               {cat.name}
//                             </button>
//                           </li>
//                         );
//                       })}
//                     </ul>

//                     {/* Sidebar footer */}
//                     <div className="hidden md:block mt-auto pt-7">
//                       <div className="w-[180px] h-[1px] bg-white/[0.18] mb-4" />
//                       <p className="text-[13px] text-white/60 italic font-light tracking-[0.02em] mb-2">
//                         Looking for the complete list?
//                       </p>
//                       <p className="text-[13.5px] text-white/95 font-semibold leading-[1.32] w-[220px]">
//                         Get the full Sustainable Raw Materials chart in one document.
//                       </p>
//                     </div>
//                   </div>

//                   {/* ── Right product grid ── */}
//                   <div className="flex-1 p-4 md:p-6 md:pl-14 flex flex-col">
//                     {/* Grid header — char-by-char reveal */}
//                     <div className="hidden md:flex items-center justify-between mb-3 mt-2 pl-0 md:pl-6">
//                       <span
//                         ref={categoryHeaderRef}
//                         className="text-[30px] font-light tracking-wide text-[#eee8cd] flex items-center gap-2"
//                       >
//                         <span className="opacity-70">→</span>
//                         {selectedCategoryName}
//                       </span>
//                     </div>

//                     {/* Product cards */}
//                     {filteredProducts.length === 0 ? (
//                       <div className="flex-1 flex items-center justify-center">
//                         <p className="text-white/30 text-sm">
//                           No products found for this category.
//                         </p>
//                       </div>
//                     ) : (
//                       <div ref={gridWrapRef}>
//                         <ProductGrid
//                           products={filteredProducts}
//                           onSelect={setSelectedProduct}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Panel footer */}
//               <div className="px-4 md:px-6 pt-6 pb-10 flex items-end justify-center -mt-6 relative z-10">
//                 <a
//                   href="/BM-SRM-Chart-2026.pdf"
//                   target="_blank"
//                   download
//                   className="ml-50 max-md:ml-0"
//                 >
//                   <DownButton>Download Full SRM Chart</DownButton>
//                 </a>
//               </div>
//             </div>

//           </Container>
//         </Section>
//       </div>

//       <Container>
//         <Seperator />
//       </Container>

//       <AnimatePresence>
//         {selectedProduct && (
//           <ProductSheetModal
//             key="product-modal"
//             product={selectedProduct}
//             onClose={() => setSelectedProduct(null)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    ProductGrid
// ───────────────────────────────────────────── */
// function ProductGrid({ products, onSelect }) {
//   const COLS = 3;
//   const rows = [];
//   for (let i = 0; i < products.length; i += COLS) {
//     rows.push(products.slice(i, i + COLS));
//   }

//   return (
//     <div className="product-grid">
//       {rows.map((row, rowIdx) => (
//         <Row
//           key={rowIdx}
//           row={row}
//           rowIdx={rowIdx}
//           colSize={COLS}
//           onSelect={onSelect}
//         />
//       ))}
//     </div>
//   );
// }

// function Row({ row, rowIdx, colSize, onSelect }) {
//   return (
//     <>
//       {row.map((product, colIdx) => {
//         const globalIdx = rowIdx * colSize + colIdx;
//         return (
//           <button
//             key={product._id}
//             className="product-card-wrap"
//             onClick={() => onSelect(product)}
//             aria-label={`View details for ${product.name}`}
//           >
//             {/* L-shaped corner borders */}
//             <span className="lc lc-tl" />
//             <span className="lc lc-tr" />
//             <span className="lc lc-bl" />
//             <span className="lc lc-br" />

//             {/* Scanline shimmer layer */}
//             <span className="card-shimmer" />

//             {/* Index */}
//             <span className="card-index">{globalIdx + 1}</span>

//             {/* Short name */}
//             <p className="card-name">{product.shortName || product.name}</p>

//             {/* Subtitle */}
//             <p className="card-subtitle">{product.name}</p>
//           </button>
//         );
//       })}
//     </>
//   );
// }


// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import gsap from "gsap";
// import SplitText from "gsap/SplitText";

// import Container from "./layout/Container";
// import Section from "./layout/Section";
// import DownButton from "./layout/DownButton";
// import Seperator from "./layout/seperator";
// import API from "../api";
// import ProductSheetModal from "./ProductSheetModal";

// gsap.registerPlugin(SplitText);

// const cardStyles = `
//   .product-card-wrap {
//     position: relative;
//     background-color: #1a1b1e;
//     background-image: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
//     transition: background-color 0.22s ease, border-color 0.22s ease;
//     cursor: pointer;
//     text-align: left;

//     /* key spacing fix */
//     padding: 36px 28px 28px 28px;

//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;

//     gap: 25px;

//     width: 100%;
//     border: none;
//     outline: none;
//     aspect-ratio: 1 / .80;
//     min-height: 0;
//     min-width: 0;
//     overflow: hidden;
//   }

//   @media (max-width: 640px) {
//     .product-card-wrap {
//       padding: 20px 18px;
//       align-items: center;
//       text-align: center;
//       justify-content: center;
//       gap: 6px;
//     }
//   }

//   .product-card-wrap:hover {
//     background-color: #3a2d00;
//   }

//   .product-card-wrap:hover .lc {
//     border-color: rgba(230, 175, 0, 0.55);
//   }

//   /* text layout */
//   .card-index {
//   font-size: 0.70rem;
//   color: #eee8cd;
//   font-weight: 400;
//   letter-spacing: 0.05em;
//   margin:0;  
//    opacity:.75;
// }

// .card-name {
//   font-family: "Barlow Condensed", "SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif;
//   font-weight: 800;
//   font-size: clamp(1.15rem, 2.2vw, 1.55rem);
//   color: #eee8cd;
//   margin: 0;
//   line-height: 1.15;
//   letter-spacing: 0.01em;
// }

// .card-subtitle {
//   font-family:"SKODA Next",system-ui,sans-serif;
//   font-weight:300;
//   font-size:0.72rem;
//   color:#eee8cd;

//   margin:0;
// opacity:.85;
//   line-height:1.15;
//   letter-spacing:0.02em;
// }

//   .product-card-wrap:hover .card-index   { color: rgba(240, 185, 0, 0.65); }
//   .product-card-wrap:hover .card-name    { color: #f5c000; }
//   .product-card-wrap:hover .card-subtitle { color: rgba(240, 185, 0, 0.55); }

//   /* L corners */
//   .lc {
//     position: absolute;
//     width: 14px;
//     height: 14px;
//     pointer-events: none;
//     z-index: 2;
//   }

//   .lc-tl {
//     top: 0;
//     left: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-tr {
//     top: 0;
//     right: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-bl {
//     bottom: 0;
//     left: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-br {
//     bottom: 0;
//     right: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }

//   /* grid untouched */
//  .product-grid {
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 0;
//   max-width: 720px;
//   margin-inline: auto;
// }

//   .product-card-wrap {
//     border-right: 1px solid rgba(255,255,255,0.10);
//     border-bottom: 1px solid rgba(255,255,255,0.10);
//   }

//   @media (min-width: 641px) and (max-width: 1024px) {
//     .product-grid {
//       grid-template-columns: repeat(2, minmax(0, 1fr));
//       margin-left: 0;
//       max-width: 540px;
//     }
//   }

//   @media (max-width: 640px) {
//   .product-grid {
//     grid-template-columns: repeat(2, 1fr);
//     margin-left: 0;
//     margin-right: 0;
//     max-width: 100%;
//   }
// }

//   @media (max-width: 640px) {
//     .product-card-wrap {
//       justify-content: center;
//       gap: 13px;
//     }
//   }

//   @media (max-width: 640px){

//   .card-name{
//     font-size: 1.40rem;
//   }

//   .card-subtitle{
//     font-size: 0.80rem;
//   }

//   .card-index{
//     font-size: 0.80rem;
//   }

// }

//   /* hide horizontal scrollbar (mobile) */
// .scrollbar-hide{
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }

// .scrollbar-hide::-webkit-scrollbar{
//   display:none;
// }

//   /* ── scanline shimmer — plays once when card enters ── */
//   @keyframes card-scanline {
//     0%   { transform: translateY(-100%); opacity: 0.18; }
//     100% { transform: translateY(220%);  opacity: 0; }
//   }
//   .card-shimmer {
//     position: absolute;
//     inset: 0;
//     pointer-events: none;
//     overflow: hidden;
//     z-index: 3;
//   }
//   .card-shimmer::after {
//     content: '';
//     position: absolute;
//     left: 0; right: 0;
//     height: 38%;
//     background: linear-gradient(
//       to bottom,
//       transparent 0%,
//       rgba(245,192,0,0.06) 40%,
//       rgba(245,192,0,0.12) 50%,
//       rgba(245,192,0,0.06) 60%,
//       transparent 100%
//     );
//     animation: card-scanline 0.72s cubic-bezier(0.4,0,0.2,1) forwards;
//   }
// `;

// export default function Materials() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const categoryListRef = useRef(null);

//   // ── Animation refs (additive — no existing ref touched) ──
//   const sectionLabelRef    = useRef(null);
//   const sectionTitleRef    = useRef(null);
//   const sectionParaRef     = useRef(null);
//   const categoryHeaderRef  = useRef(null);
//   const gridWrapRef        = useRef(null);

//   // ── Section header: SplitText line reveal on scroll ──
//   useEffect(() => {
//     if (!sectionTitleRef.current) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) return;
//           const splits = [];
//           const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
//           const split = (el, opts) => {
//             const s = SplitText.create(el, { linesClass: "overflow-hidden", ...opts });
//             splits.push(s);
//             return s;
//           };
//           tl.from(sectionLabelRef.current, { opacity: 0, y: 8, filter: "blur(4px)", duration: 0.5 })
//             .from(split(sectionTitleRef.current, { type: "lines" }).lines,
//               { y: "105%", opacity: 0, duration: 0.85, stagger: 0.09 }, "-=0.3")
//             .from(split(sectionParaRef.current, { type: "lines" }).lines,
//               { y: "105%", opacity: 0, duration: 0.7, stagger: 0.07 }, "-=0.5");
//           return () => { tl.kill(); splits.forEach((s) => s.revert()); };
//         });
//       },
//       { threshold: 0.3 }
//     );
//     observer.observe(sectionTitleRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // ── Category header: char-by-char stamp on every switch ──
//   const categoryHeaderTlRef    = useRef(null);
//   const categoryHeaderSplitRef = useRef(null);
//   useEffect(() => {
//     if (!categoryHeaderRef.current || !selectedCategory) return;
//     categoryHeaderTlRef.current?.kill();
//     categoryHeaderSplitRef.current?.revert();
//     categoryHeaderSplitRef.current = SplitText.create(categoryHeaderRef.current, {
//       type: "chars",
//       charsClass: "inline-block",
//     });
//     categoryHeaderTlRef.current = gsap.timeline({ defaults: { ease: "expo.out" } });
//     categoryHeaderTlRef.current.from(categoryHeaderSplitRef.current.chars, {
//       y: 14, opacity: 0, scaleY: 1.15, filter: "blur(5px)",
//       duration: 0.52, stagger: { each: 0.026, from: "start" },
//     });
//     return () => {
//       categoryHeaderTlRef.current?.kill();
//       categoryHeaderSplitRef.current?.revert();
//     };
//   }, [selectedCategory]);

//   // ── Product grid: clip-path forge-in on category switch ──
//   const animateGrid = useCallback(() => {
//     if (!gridWrapRef.current) return;
//     const cards = gridWrapRef.current.querySelectorAll(".product-card-wrap");
//     if (!cards.length) return;
//     gsap.killTweensOf(cards);
//     gsap.set(cards, { opacity: 0, y: 24, scaleX: 0.97, filter: "blur(4px)", clipPath: "inset(100% 0% 0% 0%)" });
//     gsap.to(cards, {
//       opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)",
//       duration: 0.6, ease: "expo.out",
//       stagger: { each: 0.052, from: "start", grid: "auto" },
//       onComplete() {
//         // trigger scanline shimmer on each card after body lands
//         cards.forEach((card, i) => {
//           setTimeout(() => {
//             const s = card.querySelector(".card-shimmer");
//             if (!s) return;
//             s.classList.remove("card-shimmer");
//             void s.offsetWidth;
//             s.classList.add("card-shimmer");
//           }, i * 52);
//         });
//       },
//     });
//     // L-corners fade in after card body settles
//     const corners = gridWrapRef.current.querySelectorAll(".lc");
//     gsap.set(corners, { opacity: 0 });
//     gsap.to(corners, { opacity: 1, duration: 0.22, stagger: 0.01, delay: 0.18, ease: "power2.out" });
//   }, []);

//   useEffect(() => {
//     const id = requestAnimationFrame(() => requestAnimationFrame(animateGrid));
//     return () => cancelAnimationFrame(id);
//   }, [selectedCategory, products, animateGrid]);

//   // ── original handler — unchanged ──
//   const handleCategoryClick = (id, event) => {
//     setSelectedCategory(id);
//     if (
//       window.innerWidth < 768 &&
//       categoryListRef.current &&
//       event?.currentTarget
//     ) {
//       const container = categoryListRef.current;
//       const btn = event.currentTarget;

//       const containerRect = container.getBoundingClientRect();
//       const btnRect = btn.getBoundingClientRect();

//       const centerOffset =
//         btnRect.left +
//         btnRect.width / 2 -
//         (containerRect.left + containerRect.width / 2);

//       container.scrollTo({
//         left: container.scrollLeft + centerOffset,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [catRes, prodRes] = await Promise.all([
//           fetch(`${API}/categories`),
//           fetch(`${API}/products`),
//         ]);
//         if (!catRes.ok || !prodRes.ok) {
//           throw new Error("API request failed");
//         }
//         const cats = await catRes.json();
//         const prods = await prodRes.json();
//         setCategories(cats);
//         setProducts(prods);
//         if (cats.length > 0) setSelectedCategory(cats[0]._id);
//       } catch (err) {
//         console.error("Failed to load materials data", err);
//         setError("Unable to load materials data from the server.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const filteredProducts = products.filter(
//     (p) => p.category?._id === selectedCategory,
//   );

//   const selectedCategoryName =
//     categories.find((c) => c._id === selectedCategory)?.name ?? "";

//   return (
//     <>
//       <style>{cardStyles}</style>

//       <div id="materials">
//         <Section className="min-h-[70vh] pt-6 md:pt-0">
//           <Container>
//             {/* Header row */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-1 md:gap-x-12 mb-6">
//               <div className="md:col-span-3">
//                 {/* ref added — no class/style change */}
//                 <span ref={sectionLabelRef} className="text-sm uppercase tracking-wider">
//                   Our Materials
//                 </span>
//               </div>
//               <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
//                 {/* ref added — no class/style change */}
//                 <h2 ref={sectionTitleRef} className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400">
//                   From Furnace to Function
//                 </h2>
//                 <p ref={sectionParaRef} className="mt-4">
//                   Our curated portfolio of raw materials combines performance,
//                   purity, and sustainability, supporting high-temperature
//                   manufacturing while advancing the collective goal of reducing
//                   carbon footprints.
//                 </p>
//               </div>
//             </div>

//             {/* Main panel */}
//             <div
//               className="rounded-2xl bg-slate-50/20"
//               style={{ border: "1px solid rgba(255,255,255,0.08)" }}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center py-24">
//                   <span className="text-sm text-white/40 uppercase tracking-widest">
//                     Loading…
//                   </span>
//                 </div>
//               ) : error ? (
//                 <div className="flex flex-col items-center justify-center py-24 min-h-[420px]">
//                   <span className="text-sm text-red-500/80 uppercase tracking-widest mb-4">
//                     Error
//                   </span>
//                   <p className="text-white/60">{error}</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col md:flex-row min-h-[420px]">
//                   {/* ── Left sidebar ── */}
//                   <div className="sticky top-[80px] md:top-[30px] z-30 rounded-t-2xl md:rounded-none bg-slate-50/20 backdrop-blur-md md:relative md:bg-transparent md:backdrop-blur-none md:w-65 flex-shrink-0 pt-0 pb-6 px-6 flex flex-col gap-1 border-b-2 border-white/[0.12] md:border-b-0 md:after:content-[''] after:hidden md:after:block after:absolute after:right-[-10px] after:top-[20px] after:bottom-[20px] after:w-[2px] after:bg-white/[0.12]">
//                     {/* Sidebar header */}
//                     <div className="flex items-center justify-center md:justify-start w-full gap-1.5 mb-3 ">
//                       <svg
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-[35px] h-[35px] flex-shrink-0 opacity-80 relative top-[1px]"
//                       >
//                         <mask id="cat-icon-mask">
//                           <rect
//                             x="0"
//                             y="0"
//                             width="24"
//                             height="24"
//                             fill="white"
//                           />
//                           <rect
//                             x="3.5"
//                             y="3.5"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <rect
//                             x="10"
//                             y="3.5"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <rect
//                             x="3.5"
//                             y="10"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <circle
//                             cx="12.25"
//                             cy="12.25"
//                             r="2.25"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                         </mask>

//                         <rect
//                           x="0"
//                           y="0"
//                           width="18"
//                           height="18"
//                           rx="4.5"
//                           fill="#eee8cd"
//                           mask="url(#cat-icon-mask)"
//                         />
//                       </svg>

//                       <span className="text-[38px] font-light text-[#eee8cd] tracking-wide">
//                         Categories
//                       </span>
//                     </div>
//                     {/* Category list — horizontal scroll on mobile, vertical on md+ */}
//                     <ul
//                       ref={categoryListRef}
//                       className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide"
//                     >
//                       {categories.map((cat) => {
//                         const isActive = cat._id === selectedCategory;
//                         return (
//                           <li key={cat._id}>
//                             <button
//                               onClick={(e) => handleCategoryClick(cat._id, e)}
//                               className={`whitespace-nowrap md:w-full text-left px-3 py-1.5 rounded-lg text-lg transition-all duration-150 ${
//                                 isActive
//                                   ? "bg-gradient-to-r from-yellow-400/30 to-transparent text-yellow-400 font-semibold"
//                                   : "text-white/50 hover:text-white/80 hover:bg-white/5"
//                               }`}
//                             >
//                               {cat.name}
//                             </button>
//                           </li>
//                         );
//                       })}
//                     </ul>

//                     {/* Sidebar footer note — hide on mobile to save space */}
//                     <div className="hidden md:block mt-auto pt-7">
//                       {/* divider */}
//                       <div className="w-[180px] h-[1px] bg-white/[0.18] mb-4"></div>

//                       {/* small line */}
//                       <p className="text-[13px] text-white/60 italic font-light tracking-[0.02em] mb-2">
//                         Looking for the complete list?
//                       </p>

//                       {/* main text */}
//                       <p className="text-[13.5px] text-white/95 font-semibold leading-[1.32] w-[220px]">
//                         Get the full Sustainable Raw Materials chart in one
//                         document.
//                       </p>
//                     </div>
//                   </div>

//                   {/* ── Right product grid ── */}
//                   <div className="flex-1 p-4 md:p-6 md:pl-14 flex flex-col">
//                     {/* Grid header */}
//                     <div className="hidden md:flex items-center justify-between mb-3 mt-2 pl-0 md:pl-6">
//                       {/* ref added to inner span — no class/style change */}
//                       <span className="text-[30px] font-light tracking-wide text-[#eee8cd] flex items-center gap-2">
//                         <span className="opacity-70">→</span>
//                         <span ref={categoryHeaderRef}>{selectedCategoryName}</span>
//                       </span>
//                     </div>
//                     {/* Product cards */}
//                     {filteredProducts.length === 0 ? (
//                       <div className="flex-1 flex items-center justify-center">
//                         <p className="text-white/30 text-sm">
//                           No products found for this category.
//                         </p>
//                       </div>
//                     ) : (
//                       // gridWrapRef added as wrapper div — motion.div preserved unchanged
//                       <div ref={gridWrapRef}>
//                         <motion.div
//                           key={selectedCategory}
//                           initial={{ opacity: 0, y: 12 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3, ease: "easeOut" }}
//                         >
//                           <ProductGrid
//                             products={filteredProducts}
//                             onSelect={setSelectedProduct}
//                           />
//                         </motion.div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Panel footer */}
//               <div className="px-4 md:px-6 pt-6 pb-10 flex items-end justify-center -mt-6 relative z-10">
//                 <a
//                   href="/BM-SRM-Chart-2026.pdf"
//                   target="_blank"
//                   download
//                   className="ml-50 max-md:ml-0"
//                 >
//                   <DownButton>Download Full SRM Chart</DownButton>
//                 </a>
//               </div>
//             </div>
//           </Container>
//         </Section>
//       </div>

//       <Container>
//         <Seperator />
//       </Container>

//       {/* Product Datasheet Modal */}
//       <AnimatePresence>
//         {selectedProduct && (
//           <ProductSheetModal
//             key="product-modal"
//             product={selectedProduct}
//             onClose={() => setSelectedProduct(null)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    ProductGrid — unchanged
// ───────────────────────────────────────────── */
// function ProductGrid({ products, onSelect }) {
//   const COLS = 3;

//   const rows = [];
//   for (let i = 0; i < products.length; i += COLS) {
//     rows.push(products.slice(i, i + COLS));
//   }

//   return (
//     <div className="product-grid">
//       {rows.map((row, rowIdx) => (
//         <Row
//           key={rowIdx}
//           row={row}
//           rowIdx={rowIdx}
//           colSize={COLS}
//           onSelect={onSelect}
//         />
//       ))}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────────
//    Row — one change: <span className="card-shimmer" />
//    added inside card alongside existing lc spans
// ───────────────────────────────────────────── */
// function Row({ row, rowIdx, colSize, onSelect }) {
//   return (
//     <>
//       {row.map((product, colIdx) => {
//         const globalIdx = rowIdx * colSize + colIdx;
//         return (
//           <button
//             key={product._id}
//             className="product-card-wrap"
//             onClick={() => onSelect(product)}
//             aria-label={`View details for ${product.name}`}
//           >
//             {/* L-shaped corner borders — unchanged */}
//             <span className="lc lc-tl" />
//             <span className="lc lc-tr" />
//             <span className="lc lc-bl" />
//             <span className="lc lc-br" />

//             {/* scanline shimmer layer — new, purely visual */}
//             <span className="card-shimmer" aria-hidden="true" />

//             {/* Index */}
//             <span className="card-index">{globalIdx + 1}</span>

//             {/* Short name */}
//             <p className="card-name">{product.shortName || product.name}</p>

//             {/* Subtitle */}
//             <p className="card-subtitle">{product.name}</p>
//           </button>
//         );
//       })}
//     </>
//   );
// }



// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import gsap from "gsap";
// import SplitText from "gsap/SplitText";

// import Container from "./layout/Container";
// import Section from "./layout/Section";
// import DownButton from "./layout/DownButton";
// import Seperator from "./layout/seperator";
// import API from "../api";
// import ProductSheetModal from "./ProductSheetModal";

// gsap.registerPlugin(SplitText);

// const cardStyles = `
//   .product-card-wrap {
//     position: relative;
//     background-color: #1a1b1e;
//     background-image: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
//     transition: background-color 0.22s ease, border-color 0.22s ease;
//     cursor: pointer;
//     text-align: left;

//     /* key spacing fix */
//     padding: 36px 28px 28px 28px;

//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: flex-start;

//     gap: 25px;

//     width: 100%;
//     border: none;
//     outline: none;
//     aspect-ratio: 1 / .80;
//     min-height: 0;
//     min-width: 0;
//     overflow: hidden;
//   }

//   @media (max-width: 640px) {
//     .product-card-wrap {
//       padding: 20px 18px;
//       align-items: center;
//       text-align: center;
//       justify-content: center;
//       gap: 6px;
//     }
//   }

//   .product-card-wrap:hover {
//     background-color: #3a2d00;
//   }

//   .product-card-wrap:hover .lc {
//     border-color: rgba(230, 175, 0, 0.55);
//   }

//   /* text layout */
//   .card-index {
//   font-size: 0.70rem;
//   color: #eee8cd;
//   font-weight: 400;
//   letter-spacing: 0.05em;
//   margin:0;  
//    opacity:.75;
// }

// .card-name {
//   font-family: "Barlow Condensed", "SKODA Next Black Expanded", "SKODA Next", system-ui, sans-serif;
//   font-weight: 800;
//   font-size: clamp(1.15rem, 2.2vw, 1.55rem);
//   color: #eee8cd;
//   margin: 0;
//   line-height: 1.15;
//   letter-spacing: 0.01em;
// }

// .card-subtitle {
//   font-family:"SKODA Next",system-ui,sans-serif;
//   font-weight:300;
//   font-size:0.72rem;
//   color:#eee8cd;

//   margin:0;
// opacity:.85;
//   line-height:1.15;
//   letter-spacing:0.02em;
// }

//   .product-card-wrap:hover .card-index   { color: rgba(240, 185, 0, 0.65); }
//   .product-card-wrap:hover .card-name    { color: #f5c000; }
//   .product-card-wrap:hover .card-subtitle { color: rgba(240, 185, 0, 0.55); }

//   /* L corners */
//   .lc {
//     position: absolute;
//     width: 14px;
//     height: 14px;
//     pointer-events: none;
//     z-index: 2;
//   }

//   .lc-tl {
//     top: 0;
//     left: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-tr {
//     top: 0;
//     right: 0;
//     border-top: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-bl {
//     bottom: 0;
//     left: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-left: 1.5px solid rgba(255,255,255,0.45);
//   }

//   .lc-br {
//     bottom: 0;
//     right: 0;
//     border-bottom: 1.5px solid rgba(255,255,255,0.45);
//     border-right: 1.5px solid rgba(255,255,255,0.45);
//   }

//   /* grid untouched */
//  .product-grid {
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 0;
//   max-width: 720px;
//   margin-inline: auto; /* center grid */
// }

//   .product-card-wrap {
//     border-right: 1px solid rgba(255,255,255,0.10);
//     border-bottom: 1px solid rgba(255,255,255,0.10);
//   }

//   @media (min-width: 641px) and (max-width: 1024px) {
//     .product-grid {
//       grid-template-columns: repeat(2, minmax(0, 1fr));
//       margin-left: 0;
//       max-width: 540px;
//     }
//   }

//   @media (max-width: 640px) {
//   .product-grid {
//     grid-template-columns: repeat(2, 1fr); /* 2 cards */
//     margin-left: 0;
//     margin-right: 0;
//     max-width: 100%;
//   }
// }

//   @media (max-width: 640px) {
//     .product-card-wrap {
//       justify-content: center;
//       gap: 13px;
//     }
//   }

//   @media (max-width: 640px){

//   .card-name{
//     font-size: 1.40rem;   /* increase title */
//   }

//   .card-subtitle{
//     font-size: 0.80rem;   /* increase subtitle */
//   }

//   .card-index{
//     font-size: 0.80rem;   /* optional */
//   }

// }

//   /* hide horizontal scrollbar (mobile) */
// .scrollbar-hide{
//   -ms-overflow-style: none;  /* IE, Edge */
//   scrollbar-width: none;     /* Firefox */
// }

// .scrollbar-hide::-webkit-scrollbar{
//   display:none;              /* Chrome, Safari */
// }

//   /* ── scanline shimmer — plays once when card enters ── */
//   @keyframes card-scanline {
//     0%   { transform: translateY(-100%); opacity: 0.18; }
//     100% { transform: translateY(220%);  opacity: 0; }
//   }
//   .card-shimmer {
//     position: absolute;
//     inset: 0;
//     pointer-events: none;
//     overflow: hidden;
//     z-index: 3;
//   }
//   .card-shimmer::after {
//     content: '';
//     position: absolute;
//     left: 0; right: 0;
//     height: 38%;
//     background: linear-gradient(
//       to bottom,
//       transparent 0%,
//       rgba(245,192,0,0.06) 40%,
//       rgba(245,192,0,0.12) 50%,
//       rgba(245,192,0,0.06) 60%,
//       transparent 100%
//     );
//     animation: card-scanline 0.72s cubic-bezier(0.4,0,0.2,1) forwards;
//   }
// `;

// export default function Materials() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const categoryListRef = useRef(null);

//   // ── Animation refs ──
//   const sectionLabelRef        = useRef(null);
//   const sectionTitleRef        = useRef(null);
//   const sectionParaRef         = useRef(null);
//   const categoryHeaderRef      = useRef(null);
//   const gridWrapRef            = useRef(null);
//   const categoryHeaderTlRef    = useRef(null);
//   const categoryHeaderSplitRef = useRef(null);

//   // ── Section header: SplitText line reveal on scroll ──
//  useEffect(() => {

//   if (!sectionTitleRef.current) return;

//   let hasAnimated = false;

//   const observer = new IntersectionObserver(

//     (entries) => {

//       entries.forEach((entry) => {

//         if (!entry.isIntersecting || hasAnimated) return;

//         hasAnimated = true;

//         const splits = [];
//         const tl = gsap.timeline({ defaults:{ ease:"expo.out"} });

//         const split = (el, opts) => {

//           const s = SplitText.create(el,{
//             linesClass:"overflow-hidden",
//             ...opts
//           });

//           splits.push(s);

//           return s;

//         };

//         tl.from(sectionLabelRef.current,{
//           opacity:0,
//           y:8,
//           filter:"blur(4px)",
//           duration:0.5
//         })

//         .from(
//           split(sectionTitleRef.current,{type:"lines"}).lines,
//           {
//             y:"105%",
//             opacity:0,
//             duration:0.85,
//             stagger:0.09
//           },
//           "-=0.3"
//         )

//         .from(
//           split(sectionParaRef.current,{type:"lines"}).lines,
//           {
//             y:"105%",
//             opacity:0,
//             duration:0.7,
//             stagger:0.07
//           },
//           "-=0.5"
//         );

//         observer.unobserve(entry.target);

//       });

//     },

//     { threshold:0.3 }

//   );

//   observer.observe(sectionTitleRef.current);

//   return () => observer.disconnect();

// }, []);

//   // ── Category header: char-by-char stamp on every switch ──
//   // Key fix: revert split first → set correct text manually → then re-split & animate.
//   // Without revert(), SplitText re-splits the already-fragmented DOM from the previous
//   // run and reads stale char nodes ("Chrome Base") instead of the new category name.
//   useEffect(() => {
//     const el = categoryHeaderRef.current;
//     if (!el || !selectedCategory) return;

//     // 1. Kill any in-progress animation
//     categoryHeaderTlRef.current?.kill();

//     // 2. Revert previous split — restores DOM to plain text node
//     categoryHeaderSplitRef.current?.revert();

//     // 3. Now that DOM is clean, set the correct text content
//     const name = categories.find((c) => c._id === selectedCategory)?.name ?? "";
//     el.textContent = name;

//     // 4. Split the freshly-set text and animate
//     categoryHeaderSplitRef.current = SplitText.create(el, {
//       type: "chars",
//       charsClass: "inline-block",
//     });

//     categoryHeaderTlRef.current = gsap.timeline({ defaults: { ease: "expo.out" } });
//     categoryHeaderTlRef.current.from(categoryHeaderSplitRef.current.chars, {
//       y: 14, opacity: 0, scaleY: 1.15, filter: "blur(5px)",
//       duration: 1, stagger: { each: 0.026, from: "start" },
//     });

//     return () => {
//       categoryHeaderTlRef.current?.kill();
//       categoryHeaderSplitRef.current?.revert();
//     };
//   // categories in dep array so `name` lookup is always fresh
//   }, [selectedCategory, categories]);

//   // ── Product grid: clip-path forge-in on category switch ──
//   const animateGrid = useCallback(() => {
//     if (!gridWrapRef.current) return;
//     const cards = gridWrapRef.current.querySelectorAll(".product-card-wrap");
//     if (!cards.length) return;
//     gsap.killTweensOf(cards);
//     gsap.set(cards, { opacity: 0, y: 24, scaleX: 0.97, filter: "blur(4px)", clipPath: "inset(100% 0% 0% 0%)" });
//     gsap.to(cards, {
//       opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)",
//       duration: 1.2, ease: "expo.out",
//       stagger: { each: 0.052, from: "start", grid: "auto" },
//       onComplete() {
//         cards.forEach((card, i) => {
//           setTimeout(() => {
//             const s = card.querySelector(".card-shimmer");
//             if (!s) return;
//             s.classList.remove("card-shimmer");
//             void s.offsetWidth;
//             s.classList.add("card-shimmer");
//           }, i * 52);
//         });
//       },
//     });
//     const corners = gridWrapRef.current.querySelectorAll(".lc");
//     gsap.set(corners, { opacity: 0 });
//     gsap.to(corners, { opacity: 1, duration: 0.22, stagger: 0.01, delay: 0.18, ease: "power2.out" });
//   }, []);

//   useEffect(() => {
//     const id = requestAnimationFrame(() => requestAnimationFrame(animateGrid));
//     return () => cancelAnimationFrame(id);
//   }, [selectedCategory, products, animateGrid]);

//   // ── original handler — unchanged ──
//   const handleCategoryClick = (id, event) => {
//     setSelectedCategory(id);
//     if (
//       window.innerWidth < 768 &&
//       categoryListRef.current &&
//       event?.currentTarget
//     ) {
//       const container = categoryListRef.current;
//       const btn = event.currentTarget;

//       const containerRect = container.getBoundingClientRect();
//       const btnRect = btn.getBoundingClientRect();

//       const centerOffset =
//         btnRect.left +
//         btnRect.width / 2 -
//         (containerRect.left + containerRect.width / 2);

//       container.scrollTo({
//         left: container.scrollLeft + centerOffset,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [catRes, prodRes] = await Promise.all([
//           fetch(`${API}/categories`),
//           fetch(`${API}/products`),
//         ]);
//         if (!catRes.ok || !prodRes.ok) {
//           throw new Error("API request failed");
//         }
//         const cats = await catRes.json();
//         const prods = await prodRes.json();
//         setCategories(cats);
//         setProducts(prods);
//         if (cats.length > 0) setSelectedCategory(cats[0]._id);
//       } catch (err) {
//         console.error("Failed to load materials data", err);
//         setError("Unable to load materials data from the server.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const filteredProducts = products.filter(
//     (p) => p.category?._id === selectedCategory,
//   );

//   const selectedCategoryName =
//     categories.find((c) => c._id === selectedCategory)?.name ?? "";

//   return (
//     <>
//       <style>{cardStyles}</style>

//       <div id="materials">
//         <Section className="min-h-[70vh] pt-6 md:pt-0">
//           <Container>
//             {/* Header row */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-y-1 md:gap-x-12 mb-6">
//               <div className="md:col-span-3">
//                 <span ref={sectionLabelRef} className="text-sm uppercase tracking-wider">
//                   Our Materials
//                 </span>
//               </div>
//               <div className="md:col-span-9 md:justify-self-end max-w-[560px]">
//                 <h2 ref={sectionTitleRef} className="text-3xl md:text-4xl font-skoda font-semibold text-yellow-400">
//                   From Furnace to Function
//                 </h2>
//                 <p ref={sectionParaRef} className="mt-4">
//                   Our curated portfolio of raw materials combines performance,
//                   purity, and sustainability, supporting high-temperature
//                   manufacturing while advancing the collective goal of reducing
//                   carbon footprints.
//                 </p>
//               </div>
//             </div>

//             {/* Main panel */}
//             <div
//               className="rounded-2xl bg-slate-50/20"
//               style={{ border: "1px solid rgba(255,255,255,0.08)" }}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center py-24">
//                   <span className="text-sm text-white/40 uppercase tracking-widest">
//                     Loading…
//                   </span>
//                 </div>
//               ) : error ? (
//                 <div className="flex flex-col items-center justify-center py-24 min-h-[420px]">
//                   <span className="text-sm text-red-500/80 uppercase tracking-widest mb-4">
//                     Error
//                   </span>
//                   <p className="text-white/60">{error}</p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col md:flex-row min-h-[420px]">
//                   {/* ── Left sidebar ── */}
//                  <div className="sticky top-[80px] md:top-[30px] z-30 rounded-t-2xl md:rounded-none bg-slate-50/20 backdrop-blur-md md:relative md:bg-transparent md:backdrop-blur-none md:w-65 flex-shrink-0 pt-5 pb-6 pl-9 pr-6 flex flex-col gap-1 border-b-2 border-white/[0.12] md:border-b-0 md:after:content-[''] after:hidden md:after:block after:absolute after:right-[-38px] after:top-[35px] after:bottom-[20px] after:w-[2px] after:bg-white/[0.12]">
//                     {/* Sidebar header */}
//                     <div className="flex items-center justify-center md:justify-start w-full gap-1.5 mb-3 ">
//                       <svg
//                         viewBox="0 0 18 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-[35px] h-[35px] flex-shrink-0 opacity-80 relative top-[1px]"
//                       >
//                         <mask id="cat-icon-mask">
//                           <rect
//                             x="0"
//                             y="0"
//                             width="24"
//                             height="24"
//                             fill="white"
//                           />
//                           <rect
//                             x="3.5"
//                             y="3.5"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <rect
//                             x="10"
//                             y="3.5"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <rect
//                             x="3.5"
//                             y="10"
//                             width="4.5"
//                             height="4.5"
//                             rx="0.5"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                           <circle
//                             cx="12.25"
//                             cy="12.25"
//                             r="2.25"
//                             fill="none"
//                             stroke="black"
//                             strokeWidth="1.25"
//                           />
//                         </mask>

//                         <rect
//                           x="0"
//                           y="0"
//                           width="18"
//                           height="18"
//                           rx="4.5"
//                           fill="#eee8cd"
//                           mask="url(#cat-icon-mask)"
//                         />
//                       </svg>

//                       <span className="text-[38px] font-light text-[#eee8cd] tracking-wide">
//                         Categories
//                       </span>
//                     </div>
//                     {/* Category list — horizontal scroll on mobile, vertical on md+ */}
//                     <ul
//                       ref={categoryListRef}
//                       className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide"
//                     >
//                       {categories.map((cat) => {
//                         const isActive = cat._id === selectedCategory;
//                         return (
//                           <li key={cat._id}>
//                             <button
//                               onClick={(e) => handleCategoryClick(cat._id, e)}
//                               className={`whitespace-nowrap md:w-full text-left px-3 py-1.5 rounded-lg text-lg transition-all duration-150 ${
//                                 isActive
//                                   ? "bg-gradient-to-r from-yellow-400/30 to-transparent text-yellow-400 font-semibold"
//                                   : "text-white/50 hover:text-white/80 hover:bg-white/5"
//                               }`}
//                             >
//                               {cat.name}
//                             </button>
//                           </li>
//                         );
//                       })}
//                     </ul>

//                     {/* Sidebar footer note — hide on mobile to save space */}
//                     <div className="hidden md:block mt-auto pt-7">
//                       {/* divider */}
//                       <div className="w-[180px] h-[1px] bg-white/[0.18] mb-4"></div>

//                       {/* small line */}
//                       <p className="text-[13px] text-white/60 italic font-light tracking-[0.02em] mb-2">
//                         Looking for the complete list?
//                       </p>

//                       {/* main text */}
//                       <p className="text-[13.5px] text-white/95 font-semibold leading-[1.32] w-[220px]">
//                         Get the full Sustainable Raw Materials chart in one
//                         document.
//                       </p>
//                     </div>
//                   </div>

//                   {/* ── Right product grid ── */}
//                   <div className="flex-1 pt-13 px-4 md:p-8 md:pl-14 flex flex-col">
//                     {/* Grid header */}
//                     <div className="hidden md:flex items-center justify-between mb-3 mt-4 ml-14 pl-0 md:pl-6">
//                       <span className="text-[30px] font-light tracking-wide text-[#eee8cd] flex items-center gap-2">
//                         <span className="opacity-70">→</span>
//                         {/* ref on inner span; textContent managed by animation effect */}
//                         <span ref={categoryHeaderRef}>{selectedCategoryName}</span>
//                       </span>
//                     </div>
//                     {/* Product cards */}
//                     {filteredProducts.length === 0 ? (
//                       <div className="flex-1 flex items-center justify-center">
//                         <p className="text-white/30 text-sm">
//                           No products found for this category.
//                         </p>
//                       </div>
//                     ) : (
//                       <div ref={gridWrapRef}>
//                         <motion.div
//                           key={selectedCategory}
//                           initial={{ opacity: 0, y: 12 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3, ease: "easeOut" }}
//                         >
//                           <ProductGrid
//                             products={filteredProducts}
//                             onSelect={setSelectedProduct}
//                           />
//                         </motion.div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Panel footer */}
//              <div className="px-4 md:px-6 pt-6 pb-12 flex items-end justify-center mt-2 relative z-10">
//                 <a
//                   href="/BM-SRM-Chart-2026.pdf"
//                   target="_blank"
//                   download
//                   className="ml-50 max-md:ml-0"
//                 >
//                   <DownButton>Download Full SRM Chart</DownButton>
//                 </a>
//               </div>
//             </div>
//           </Container>
//         </Section>
//       </div>

//       <Container>
//         <Seperator />
//       </Container>

//       {/* Product Datasheet Modal */}
//       <AnimatePresence>
//         {selectedProduct && (
//           <ProductSheetModal
//             key="product-modal"
//             product={selectedProduct}
//             onClose={() => setSelectedProduct(null)}
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    ProductGrid — unchanged
// ───────────────────────────────────────────── */
// function ProductGrid({ products, onSelect }) {
//   const COLS = 3;

//   const rows = [];
//   for (let i = 0; i < products.length; i += COLS) {
//     rows.push(products.slice(i, i + COLS));
//   }

//   return (
//     <div className="product-grid">
//       {rows.map((row, rowIdx) => (
//         <Row
//           key={rowIdx}
//           row={row}
//           rowIdx={rowIdx}
//           colSize={COLS}
//           onSelect={onSelect}
//         />
//       ))}
//     </div>
//   );
// }

// function Row({ row, rowIdx, colSize, onSelect }) {
//   return (
//     <>
//       {row.map((product, colIdx) => {
//         const globalIdx = rowIdx * colSize + colIdx;
//         return (
//           <button
//             key={product._id}
//             className="product-card-wrap"
//             onClick={() => onSelect(product)}
//             aria-label={`View details for ${product.name}`}
//           >
//             {/* L-shaped corner borders */}
//             <span className="lc lc-tl" />
//             <span className="lc lc-tr" />
//             <span className="lc lc-bl" />
//             <span className="lc lc-br" />

//             {/* scanline shimmer layer */}
//             <span className="card-shimmer" aria-hidden="true" />

//             {/* Index */}
//             <span className="card-index">{globalIdx + 1}</span>

//             {/* Short name */}
//             <p className="card-name">{product.shortName || product.name}</p>

//             {/* Subtitle */}
//             <p className="card-subtitle">{product.name}</p>
//           </button>
//         );
//       })}
//     </>
//   );
// }


import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

import Container from "./layout/Container";
import Section from "./layout/Section";
import DownButton from "./layout/DownButton";
import Seperator from "./layout/seperator";
import API from "../api";
import ProductSheetModal from "./ProductSheetModal";

gsap.registerPlugin(SplitText);

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

  .product-card-wrap:hover {
    background-color: #3a2d00;
  }

  .product-card-wrap:hover .lc {
    border-color: rgba(230, 175, 0, 0.55);
  }

  /* text layout */
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

  /* L corners */
  .lc {
    position: absolute;
    width: 14px;
    height: 14px;
    pointer-events: none;
    z-index: 2;
  }

  .lc-tl {
    top: 0; left: 0;
    border-top: 1.5px solid rgba(255,255,255,0.45);
    border-left: 1.5px solid rgba(255,255,255,0.45);
  }

  .lc-tr {
    top: 0; right: 0;
    border-top: 1.5px solid rgba(255,255,255,0.45);
    border-right: 1.5px solid rgba(255,255,255,0.45);
  }

  .lc-bl {
    bottom: 0; left: 0;
    border-bottom: 1.5px solid rgba(255,255,255,0.45);
    border-left: 1.5px solid rgba(255,255,255,0.45);
  }

  .lc-br {
    bottom: 0; right: 0;
    border-bottom: 1.5px solid rgba(255,255,255,0.45);
    border-right: 1.5px solid rgba(255,255,255,0.45);
  }

  /* grid */
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
  }

  @media (max-width: 640px) {
    .product-card-wrap {
      justify-content: center;
      gap: 13px;
    }
  }

  @media (max-width: 640px) {
    .card-name    { font-size: 1.40rem; }
    .card-subtitle { font-size: 0.80rem; }
    .card-index   { font-size: 0.80rem; }
  }

  /* hide horizontal scrollbar (mobile) */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar { display: none; }

  /* ── scanline shimmer ── */
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

export default function Materials() {
  const [categories, setCategories]     = useState([]);
  const [products, setProducts]         = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [selectedProduct, setSelectedProduct]   = useState(null);

  const categoryListRef = useRef(null);

  // ── Animation refs ──
  const sectionLabelRef        = useRef(null);
  const sectionTitleRef        = useRef(null);
  const sectionParaRef         = useRef(null);
  const categoryHeaderRef      = useRef(null);
  const gridWrapRef            = useRef(null);
  const categoryHeaderTlRef    = useRef(null);
  const categoryHeaderSplitRef = useRef(null);

  // ── Section header: SplitText line reveal on scroll ──
  useEffect(() => {
    if (!sectionTitleRef.current) return;

    // guard: fire exactly once
    let triggered = false;
    const splits  = [];

    const split = (el, opts) => {
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

          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

          tl
            .from(sectionLabelRef.current, {
              opacity: 0,
              y: 8,
              filter: "blur(4px)",
              duration: 0.5,
              clearProps: "opacity,y,filter",
            })
            .from(
              split(sectionTitleRef.current, { type: "lines" }).lines,
              {
                y: "105%",
                opacity: 0,
                duration: 0.85,
                stagger: 0.09,
                clearProps: "opacity,y,transform",
              },
              "-=0.3"
            )
            .from(
              split(sectionParaRef.current, { type: "lines" }).lines,
              {
                y: "105%",
                opacity: 0,
                duration: 0.7,
                stagger: 0.07,
                clearProps: "opacity,y,transform",
              },
              "-=0.5"
            );
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionTitleRef.current);

    return () => {
      observer.disconnect();
      // kill-then-revert: never revert while a tween is in flight
      splits.forEach((s) => s.revert());
    };
  }, []);

  // ── Category header: char-by-char stamp on every switch ──
  // Tracks the last-animated id so a categories-only re-render
  // (e.g. data fetch completing) doesn't re-fire for the same category.
  const lastAnimatedCategoryRef = useRef(null);

  useEffect(() => {
    const el = categoryHeaderRef.current;
    if (!el || !selectedCategory) return;

    // skip if this category was already animated (guards against categories dep re-run)
    if (lastAnimatedCategoryRef.current === selectedCategory) return;
    lastAnimatedCategoryRef.current = selectedCategory;

    // 1. Kill in-progress animation
    categoryHeaderTlRef.current?.kill();

    // 2. Revert previous split — restores DOM to plain text node
    categoryHeaderSplitRef.current?.revert();

    // 3. Set correct text now that DOM is clean
    const name = categories.find((c) => c._id === selectedCategory)?.name ?? "";
    el.textContent = name;

    // 4. Split the freshly-set text and animate
    categoryHeaderSplitRef.current = SplitText.create(el, {
      type: "chars",
      charsClass: "inline-block",
    });

    categoryHeaderTlRef.current = gsap.timeline({ defaults: { ease: "expo.out" } });
    categoryHeaderTlRef.current
      .from(categoryHeaderSplitRef.current.chars, {
        y: 14,
        opacity: 0,
        scaleY: 1.15,
        filter: "blur(5px)",
        duration: 1,
        stagger: { each: 0.026, from: "start" },
        clearProps: "opacity,y,scaleY,filter,transform",
      });

    return () => {
      categoryHeaderTlRef.current?.kill();
      categoryHeaderSplitRef.current?.revert();
    };
  }, [selectedCategory, categories]);

  // ── Product grid: clip-path forge-in on category switch ──
  // Fix: single rAF (the double-rAF leaked the inner id on fast switches).
  // Fix: removed Framer motion.div wrapper — it fought GSAP on opacity/y.
  // Fix: shimmer restart uses void-reflow per card, no setTimeout chain.
  const animateGrid = useCallback(() => {
    if (!gridWrapRef.current) return;
    const cards = gridWrapRef.current.querySelectorAll(".product-card-wrap");
    if (!cards.length) return;

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
        // restart shimmer with void-reflow (reliable, no setTimeout chain)
        cards.forEach((card) => {
          const s = card.querySelector(".card-shimmer");
          if (!s) return;
          s.classList.remove("card-shimmer");
          void s.offsetWidth; // force reflow so CSS animation resets
          s.classList.add("card-shimmer");
        });
      },
    });

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
  }, []);

  useEffect(() => {
    // single rAF — cancels cleanly on fast category switches
    const raf = requestAnimationFrame(animateGrid);
    return () => cancelAnimationFrame(raf);
  }, [selectedCategory, products, animateGrid]);

  // ── original handler — unchanged ──
  const handleCategoryClick = (id, event) => {
    setSelectedCategory(id);
    if (
      window.innerWidth < 768 &&
      categoryListRef.current &&
      event?.currentTarget
    ) {
      const container   = categoryListRef.current;
      const btn         = event.currentTarget;
      const containerRect = container.getBoundingClientRect();
      const btnRect       = btn.getBoundingClientRect();
      const centerOffset  =
        btnRect.left +
        btnRect.width / 2 -
        (containerRect.left + containerRect.width / 2);
      container.scrollTo({ left: container.scrollLeft + centerOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${API}/categories`),
          fetch(`${API}/products`),
        ]);
        if (!catRes.ok || !prodRes.ok) throw new Error("API request failed");
        const cats  = await catRes.json();
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
        <Section className="min-h-[70vh] pt-6 md:pt-0">
          <Container>
            {/* Header row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-1 md:gap-x-12 mb-6">
              <div className="md:col-span-3">
                <span ref={sectionLabelRef} className="text-sm uppercase tracking-wider">
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

            {/* Main panel */}
            <div
              className="rounded-2xl bg-slate-50/20"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <span className="text-sm text-white/40 uppercase tracking-widest">
                    Loading…
                  </span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-24 min-h-[420px]">
                  <span className="text-sm text-red-500/80 uppercase tracking-widest mb-4">
                    Error
                  </span>
                  <p className="text-white/60">{error}</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row min-h-[420px]">
                  {/* ── Left sidebar ── */}
                  <div className="sticky top-[80px] md:top-[30px] z-30 rounded-t-2xl md:rounded-none bg-slate-50/20 backdrop-blur-md md:relative md:bg-transparent md:backdrop-blur-none md:w-65 flex-shrink-0 pt-5 pb-6 pl-9 pr-6 flex flex-col gap-1 border-b-2 border-white/[0.12] md:border-b-0 md:after:content-[''] after:hidden md:after:block after:absolute after:right-[-38px] after:top-[35px] after:bottom-[20px] after:w-[2px] after:bg-white/[0.12]">
                    {/* Sidebar header */}
<div className="flex items-center justify-center md:justify-start w-full gap-1.5 mb-3">
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[22px] h-[22px] md:w-[35px] md:h-[35px] flex-shrink-0 opacity-80 relative top-[1px]"
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

  <span className="text-[24px] md:text-[38px] font-light text-[#eee8cd] tracking-wide">
    Categories
  </span>
</div>
                    {/* Category list */}
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

                    {/* Sidebar footer note */}
                    <div className="hidden md:block mt-auto pt-7">
                      <div className="w-[180px] h-[1px] bg-white/[0.18] mb-4"></div>
                      <p className="text-[13px] text-white/60 italic font-light tracking-[0.02em] mb-2">
                        Looking for the complete list?
                      </p>
                      <p className="text-[13.5px] text-white/95 font-semibold leading-[1.32] w-[220px]">
                        Get the full Sustainable Raw Materials chart in one document.
                      </p>
                    </div>
                  </div>

                  {/* ── Right product grid ── */}
                  <div className="flex-1 pt-13 px-4 md:p-8 md:pl-14 flex flex-col">
                    {/* Grid header */}
                    <div className="hidden md:flex items-center justify-between mb-3 mt-4 ml-14 pl-0 md:pl-6">
                      <span className="text-[30px] font-light tracking-wide text-[#eee8cd] flex items-center gap-2">
                        <span className="opacity-70">→</span>
                        {/* ref on inner span; textContent managed by animation effect */}
                        <span ref={categoryHeaderRef}>{selectedCategoryName}</span>
                      </span>
                    </div>

                    {/* Product cards — Framer wrapper removed: it fought GSAP on opacity/y */}
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
              <div className="px-4 md:px-6 pt-6 pb-12 flex items-end justify-center mt-2 relative z-10">
                <a
                  href="/BM-SRM-Chart-2026.pdf"
                  target="_blank"
                  download
                  className="ml-50 max-md:ml-0"
                >
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
   ProductGrid — unchanged
───────────────────────────────────────────── */
function ProductGrid({ products, onSelect }) {
  const COLS = 3;
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
            <span className="lc lc-tl" />
            <span className="lc lc-tr" />
            <span className="lc lc-bl" />
            <span className="lc lc-br" />
            <span className="card-shimmer" aria-hidden="true" />
            <span className="card-index">{globalIdx + 1}</span>
            <p className="card-name">{product.shortName || product.name}</p>
            <p className="card-subtitle">{product.name}</p>
          </button>
        );
      })}
    </>
  );
}