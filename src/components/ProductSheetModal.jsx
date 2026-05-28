import ReactDOM from "react-dom";
import { pdf } from "@react-pdf/renderer";
import { motion } from "framer-motion";
import logoSrc from "../assets/images/bm-logo-tm-b.webp";
import { useEffect, useState, forwardRef } from "react";
import { API_BASE_URL } from "../api.js";
import {
  productImageSrc,
  PRODUCT_PLACEHOLDER_SRC,
} from "../utils/productImage.js";

const MotionDiv = motion.div;

const Label = ({ children }) => (
  <p
    style={{
      fontSize: "clamp(0.7rem,1.6vw,0.85rem)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      color: "#fbbf24",
      margin: 0,
    }}
  >
    {children}
  </p>
);

const Divider = () => (
  <div
    style={{
      borderTop: "1px solid rgba(255,255,255,0.08)",
      margin: "5px 0 8px",
    }}
  />
);

const ProductSheetModal = forwardRef(function ProductSheetModal(
  { product, onClose },
  ref,
) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [heroImgSrc, setHeroImgSrc] = useState(() =>
    productImageSrc(product?.image),
  );
  const categoryName = product?.category?.name ?? "";

  const msdsUrl = product?.msds || null;

  useEffect(() => {
    setHeroImgSrc(productImageSrc(product?.image));
  }, [product?._id, product?.image]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleDownload = async () => {
    try {
      if (!product) {
        console.error("Product missing");

        return;
      }

      const { default: ProductPDF } = await import("./ProductPDF");
      const blob = await pdf(<ProductPDF product={product} />).toBlob();

      if (!blob) {
        console.error("PDF blob empty");

        return;
      }

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `${product.shortName || product.name || "datasheet"}-TDS.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation error:", err);

      alert("PDF generation failed");
    }
  };
  const handleMSDSDownload = () => {
    window.open(`${API_BASE_URL}/products/msds/${product._id}`, "_blank");
  };
  return ReactDOM.createPortal(
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "fixed", inset: 0, zIndex: 9998 }}
    >
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(8, 6, 4, 0.7)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* ── Scroll + centering container ── */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "clamp(12px, 4vh, 48px) clamp(8px, 4vw, 16px)",
          boxSizing: "border-box",
        }}
      >
        <MotionDiv
          initial={{ opacity: 0, scale: 0.97, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "640px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* ── Action bar ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.95rem",
                }}
              >
                ← Back
              </button>

              {msdsUrl && (
                <button
                  onClick={handleMSDSDownload}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    background: "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.35)",
                    color: "#22c55e",
                    fontSize: "0.90rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 14 14">
                    <path
                      d="M7 1v8m0 0L4 6m3 3l3-3M1 11h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Download MSDS
                </button>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={handleDownload}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  background: "rgba(255,193,7,0.15)",
                  border: "1px solid rgba(255,193,7,0.35)",
                  color: "#fbbf24",
                  fontSize: "0.90rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Download PDF
              </button>

              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* ── Datasheet card ── */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "14px",
              overflow: "hidden",
              fontFamily: "'SKODA Next', system-ui, sans-serif",
              color: "#eee8cd",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 72px rgba(0,0,0,0.75)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "clamp(12px,3vw,20px) clamp(14px,4vw,28px)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <img
                src={logoSrc}
                alt="Best Mountain"
                style={{ height: "clamp(24px,5vw,36px)", width: "auto" }}
              />
              {categoryName && (
                <span
                  style={{
                    fontSize: "clamp(0.5rem,1.5vw,0.62rem)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    color: "rgba(238,232,205,0.8)",
                  }}
                >
                  {categoryName}
                </span>
              )}
            </div>

            {/* Hero */}

            <div
              style={{
                padding: "clamp(14px,3vw,22px) clamp(14px,4vw,28px)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <img
                src={heroImgSrc}
                alt={product.name}
                onClick={() => setPreviewOpen(true)}
                onError={() => setHeroImgSrc(PRODUCT_PLACEHOLDER_SRC)}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "10px",
                  objectFit: "contain",
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "zoom-in",
                  background: "rgba(255,255,255,0.04)",
                }}
              />

              {previewOpen && (
                <div
                  onClick={() => setPreviewOpen(false)}
                  style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.85)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                    padding: "20px",
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setPreviewOpen(false)}
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      fontSize: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    ×
                  </button>

                  {/* Image */}
                  <img
                    src={heroImgSrc}
                    alt="preview"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: "12px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
                    }}
                  />
                </div>
              )}
              <div>
                <h1
                  style={{
                    fontSize: "clamp(1.6rem,6vw,2.6rem)",
                    fontWeight: 900,
                    color: "#eee8cd",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {product.shortName || product.name}
                </h1>

                <p
                  style={{
                    marginTop: "5px",
                    fontSize: "clamp(0.5rem,1.3vw,0.58rem)",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(238,232,205,0.4)",
                    lineHeight: 1,
                  }}
                >
                  Technical Data Sheet
                </p>
              </div>
            </div>

            {/* Stats row — 3 cols on sm+, 2 cols stacked on mobile */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Responsive stats via two rows on tiny screens */}
              <style>{`
                .bm-stats { display: grid; grid-template-columns: 1fr 1fr; }
                .bm-stats-c3 { border-top: 1px solid rgba(255,255,255,0.07); grid-column: 1 / -1; }
                @media (min-width: 480px) {
                  .bm-stats { grid-template-columns: 1fr 1fr 1.4fr; }
                  .bm-stats-c3 { border-top: none; grid-column: auto; }
                }
              `}</style>
              <div className="bm-stats">
                <div
                  style={{
                    padding: "clamp(12px,2.5vw,18px) clamp(14px,4vw,28px)",
                    borderRight: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Label>Fused Process</Label>
                  <p
                    style={{
                      fontSize: "clamp(1rem,3vw,1.35rem)",
                      fontWeight: 700,
                      color: "#eee8cd",
                      margin: "5px 0 0",
                    }}
                  >
                    {product.fusedProcess || "—"}
                  </p>
                </div>
                <div
                  style={{
                    padding: "clamp(12px,2.5vw,18px) clamp(10px,2.5vw,20px)",
                  }}
                >
                  <Label>Bulk Density</Label>
                  <p
                    style={{
                      fontSize: "clamp(1rem,3vw,1.35rem)",
                      fontWeight: 700,
                      color: "#eee8cd",
                      margin: "5px 0 0",
                    }}
                  >
                    {product.bulkDensity != null ? product.bulkDensity : "—"}
                  </p>
                </div>
                <div
                  className="bm-stats-c3"
                  style={{
                    padding: "clamp(12px,2.5vw,18px) clamp(14px,4vw,28px)",
                  }}
                >
                  <Label>Color Tone</Label>
                  {product.colorTones?.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                        marginTop: "7px",
                      }}
                    >
                      {product.colorTones.map((tone, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "18px",
                              borderRadius: "3px",
                              background: tone.color || "#ccc",
                              border: "1px solid rgba(255,255,255,0.12)",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "0.42rem",
                              color: "rgba(238,232,205,0.55)",
                              textTransform: "uppercase",
                              textAlign: "center",
                              lineHeight: 1.4,
                            }}
                          >
                            {tone.name}
                          </span>
                          {/* {tone.color && (
                            <span
                              style={{
                                fontSize: "clamp(0.6rem,1.2vw,0.75rem)",
                                color: "rgba(238,232,205,0.3)",
                                textAlign: "center",
                                letterSpacing: "0.04em",
                                fontFamily: "monospace",
                              }}
                            >
                              {tone.color.toUpperCase()}
                            </span>
                          )} */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span
                      style={{
                        color: "rgba(255,255,255,0.25)",
                        fontSize: "0.95rem",
                      }}
                    >
                      —
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Body — 2 cols on sm+, 1 col stacked on mobile */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <style>{`
                .bm-body { display: grid; grid-template-columns: 1fr; }
                .bm-body-right { border-top: 1px solid rgba(255,255,255,0.07); }
                @media (min-width: 480px) {
                  .bm-body { grid-template-columns: 1fr 1fr; }
                  .bm-body-right { border-top: none; border-left: 1px solid rgba(255,255,255,0.07); }
                }
              `}</style>
              <div className="bm-body">
                {/* Chemical Composition */}
                <div
                  style={{
                    padding: "clamp(14px,3vw,20px) clamp(14px,4vw,28px)",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "clamp(0.8rem,1.4vw,0.72rem)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#fbbf24",
                      lineHeight: 1.5,
                      marginBottom: "10px",
                    }}
                  >
                    Chemical Composition
                    <br />& Physical Analysis
                  </h2>
                  {product.chemicalComposition?.length > 0 ? (
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr>
                          {["Name", "Typical", "Min %", "Max %"].map((h) => (
                            <th
                              key={h}
                              style={{
                                textAlign: "left",
                                fontSize: "0.70rem",
                                color: "rgba(238,232,205,0.35)",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                borderBottom:
                                  "1px solid rgba(255,255,255,0.08)",
                                paddingRight: "8px",
                                paddingBottom: "6px",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {product.chemicalComposition.map((row, i) => (
                          <tr
                            key={i}
                            style={{
                              borderBottom: "1px solid rgba(255,255,255,0.04)",
                            }}
                          >
                            {[row.name, row.typical, row.min, row.max].map(
                              (cell, j) => (
                                <td
                                  key={j}
                                  style={{
                                    fontSize: "0.62rem",
                                    color:
                                      j === 0
                                        ? "rgba(238,232,205,0.88)"
                                        : "rgba(238,232,205,0.55)",
                                    fontWeight: j === 0 ? 800 : 600,
                                    padding: "5px 8px 5px 0",
                                  }}
                                >
                                  {cell || "—"}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p
                      style={{
                        fontSize: "0.58rem",
                        color: "rgba(238,232,205,0.3)",
                      }}
                    >
                      No composition data available.
                    </p>
                  )}
                </div>

                {/* Remarks / Sizing / Application */}
                <div
                  className="bm-body-right"
                  style={{
                    padding: "clamp(14px,3vw,20px) clamp(14px,4vw,20px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {[
                    { label: "Remarks", value: product.remarks },
                    { label: "Sizing", value: product.sizing },
                    {
                      label: "Industrial Application",
                      value: product.industrialApplication,
                    },
                  ].map(({ label, value }) =>
                    value ? (
                      <div key={label}>
                        <p
                          style={{
                            fontSize: "0.90rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#fbbf24",
                            margin: 0,
                          }}
                        >
                          {label}
                        </p>
                        <Divider />
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "rgba(238,232,205,0.72)",
                            lineHeight: 1.65,
                            margin: 0,
                          }}
                        >
                          {value}
                        </p>
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "12px clamp(14px,4vw,28px)",
                textAlign: "center",
                background: "rgba(0,0,0,0.25)",
              }}
            >
              <p
                style={{
                  fontSize: "0.48rem",
                  color: "rgba(238,232,205,0.35)",
                  margin: 0,
                }}
              >
                © Room 1112, 11/F Hollywood Plaza, Nathan road 610 Mongkok, Hong
                Kong
              </p>
              <p
                style={{
                  fontSize: "0.42rem",
                  color: "rgba(238,232,205,0.2)",
                  marginTop: "3px",
                }}
              >
                COPYRIGHT © 2017-2026 BEST MOUNTAIN LIMITED
              </p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>,
    document.body,
  );
});

export default ProductSheetModal;
