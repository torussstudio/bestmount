import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api";
import jsPDF from "jspdf";
import logoSrc from "../assets/images/bm-logo-tm-w.png";

/* ─── small helpers ─────────────────────────────────────── */
const Label = ({ children }) => (
  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">
    {children}
  </p>
);

const SectionDivider = () => (
  <div className="border-t border-white/10 my-3" />
);

/* ──────────────────────────────────────────────────────────
   Programmatic PDF builder (avoids html2canvas oklch issue)
   ────────────────────────────────────────────────────────── */
function buildPDF(product) {
  const W = 595.28;
  const MARGIN = 36;
  const COL = W - MARGIN * 2;
  const BG    = [26, 22, 18];
  const CREAM = [238, 232, 205];
  const AMBER = [251, 191, 36];
  const DIM   = [120, 115, 105];
  const LINE  = [55, 50, 45];

  // Estimate height
  const compRows     = product.chemicalComposition?.length ?? 0;
  const rightSects   = [product.remarks, product.sizing, product.industrialApplication].filter(Boolean);
  const rightH       = rightSects.reduce((acc, v) => acc + Math.ceil(v.length / 55) * 9 + 32, 0);
  const leftH        = compRows * 14 + 70;
  const bodyH        = Math.max(leftH, rightH, 80);
  const totalH       = 80 + 110 + 90 + bodyH + 55;

  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: [W, totalH] });

  // Background
  pdf.setFillColor(...BG);
  pdf.rect(0, 0, W, totalH, "F");

  let y = 0;

  /* ── HEADER ── */
  y += 26;
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...CREAM);
  pdf.text("BEST MOUNTAIN", MARGIN, y);

  const catName = product.category?.name?.toUpperCase() ?? "";
  if (catName) {
    const bw = pdf.getTextWidth(catName) + 18;
    pdf.setFillColor(48, 44, 40);
    pdf.setDrawColor(...LINE);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(W - MARGIN - bw, y - 12, bw, 17, 4, 4, "FD");
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...CREAM);
    pdf.text(catName, W - MARGIN - bw + 9, y);
  }

  y += 16;
  pdf.setDrawColor(...LINE);
  pdf.setLineWidth(0.5);
  pdf.line(MARGIN, y, W - MARGIN, y);

  /* ── HERO ── */
  y += 32;
  pdf.setFontSize(38);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...CREAM);
  pdf.text(product.shortName || product.name || "—", MARGIN, y);
  y += 8;
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...DIM);
  pdf.text("TECHNICAL DATA SHEET", MARGIN, y);
  y += 26;
  pdf.line(MARGIN, y, W - MARGIN, y);

  /* ── STATS ROW ── */
  y += 18;
  const colW = COL / 3;

  // Labels
  ["FUSED PROCESS", "BULK DENSITY", "COLOR TONE"].forEach((lbl, i) => {
    pdf.setFontSize(6.5);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...AMBER);
    pdf.text(lbl, MARGIN + i * colW, y);
  });

  y += 16;

  // Fused process value (may be multi-line)
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...CREAM);
  const fusedText = product.fusedProcess || "—";
  const fusedLines = pdf.splitTextToSize(fusedText, colW - 8);
  pdf.text(fusedLines, MARGIN, y);

  // Bulk density value
  const densityText = product.bulkDensity != null ? String(product.bulkDensity) : "—";
  pdf.text(densityText, MARGIN + colW, y);

  // Color swatches
  if (product.colorTones?.length > 0) {
    let sx = MARGIN + colW * 2;
    product.colorTones.slice(0, 5).forEach((tone) => {
      const hex = (tone.color || "#aaaaaa").replace("#", "");
      const r = parseInt(hex.slice(0, 2), 16) || 170;
      const g = parseInt(hex.slice(2, 4), 16) || 170;
      const b = parseInt(hex.slice(4, 6), 16) || 170;
      pdf.setFillColor(r, g, b);
      pdf.setDrawColor(...LINE);
      pdf.rect(sx, y - 12, 22, 14, "FD");
      pdf.setFontSize(5);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(...DIM);
      const nm = pdf.splitTextToSize((tone.name || "").toUpperCase(), 22);
      pdf.text(nm, sx + 2, y + 6);
      sx += 28;
    });
  }

  const statsLineH = fusedLines.length * 16;
  y += Math.max(statsLineH, 28) + 10;
  pdf.line(MARGIN, y, W - MARGIN, y);

  /* ── BODY ── */
  y += 18;
  const halfW  = COL / 2 - 10;
  const leftX  = MARGIN;
  const rightX = MARGIN + COL / 2 + 10;

  // Left heading
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...AMBER);
  pdf.text("CHEMICAL COMPOSITION", leftX, y);
  y += 9;
  pdf.text("& PHYSICAL ANALYSIS", leftX, y);
  y += 14;

  if (compRows > 0) {
    const cols = [0, 58, 100, 134];
    const hdrs = ["NAME", "TYPICAL", "MIN %", "MAX %"];
    pdf.setFontSize(5.5);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...DIM);
    hdrs.forEach((h, i) => pdf.text(h, leftX + cols[i], y));
    y += 4;
    pdf.setDrawColor(...LINE);
    pdf.line(leftX, y, leftX + halfW, y);
    y += 8;

    product.chemicalComposition.forEach((row) => {
      pdf.setFontSize(6);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(...CREAM);
      [row.name, row.typical, row.min, row.max].forEach((cell, i) => {
        pdf.text(String(cell || "—"), leftX + cols[i], y);
      });
      y += 3;
      pdf.setDrawColor(44, 40, 36);
      pdf.line(leftX, y, leftX + halfW, y);
      y += 8;
    });
  } else {
    pdf.setFontSize(6.5);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...DIM);
    pdf.text("No composition data available.", leftX, y);
    y += 18;
  }

  // Right panel (fixed y position relative to body start)
  let ry = 80 + 110 + 90 + 50; // body start + heading offset
  rightSects.forEach(({ label, value } = {}) => {});

  const rightData = [
    { label: "REMARKS",               value: product.remarks },
    { label: "SIZING",                value: product.sizing },
    { label: "INDUSTRIAL APPLICATION", value: product.industrialApplication },
  ].filter((s) => s.value);

  let ry2 = 80 + 110 + 90 + 32;
  rightData.forEach(({ label, value }) => {
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...AMBER);
    pdf.text(label, rightX, ry2);
    ry2 += 5;
    pdf.setDrawColor(...LINE);
    pdf.line(rightX, ry2, rightX + halfW, ry2);
    ry2 += 9;
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...CREAM);
    const lines = pdf.splitTextToSize(value, halfW);
    pdf.text(lines, rightX, ry2);
    ry2 += lines.length * 9 + 12;
  });

  /* ── FOOTER ── */
  const footerY = totalH - 40;
  pdf.setDrawColor(...LINE);
  pdf.line(MARGIN, footerY, W - MARGIN, footerY);
  pdf.setFillColor(14, 12, 10);
  pdf.rect(0, footerY, W, 40, "F");
  pdf.setFontSize(6);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...DIM);
  pdf.text(
    "© Room 1112, 11/F Hollywood Plaza, Nathan road 610 Mongkok, Hong Kong",
    W / 2, footerY + 14, { align: "center" }
  );
  pdf.setFontSize(5.5);
  pdf.setTextColor(75, 70, 60);
  pdf.text("COPYRIGHT © 2017-2026 BEST MOUNTAIN LIMITED", W / 2, footerY + 26, { align: "center" });

  return pdf;
}

/* ─────────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────────── */
export default function ProductDataSheet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const sheetRef = useRef(null);

  const [loading, setLoading]     = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/products`);
        if (!res.ok) throw new Error("Failed to fetch");
        const all = await res.json();
        const found = all.find((p) => p._id === id);
        if (!found) throw new Error("Not found");
        setProduct(found);
      } catch {
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);


  /* ── loading / error states ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-white/40 text-sm uppercase tracking-widest animate-pulse">
          Loading…
        </span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white/50">{error || "Product not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-amber-400 text-sm underline"
        >
          ← Go back
        </button>
      </div>
    );
  }


  const handleDownloadPDF = () => {
    if (!product) return;
    setDownloading(true);
    try {
      const pdf = buildPDF(product);
      const filename = `${product.shortName || product.name || "datasheet"}-TDS.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Download failed: " + (err.message || err));
    } finally {
      setDownloading(false);
    }
  };

  const categoryName = product.category?.name ?? "";


  return (
    <div className="py-10 px-4" style={{ background: "#111" }}>
      {/* ── action bar ── */}
      <div className="max-w-[600px] mx-auto mb-6 flex items-center justify-between">
        <Link
          to="/#materials"
          className="text-sm text-white/40 hover:text-white/80 transition-colors flex items-center gap-1"
        >
          ← Back
        </Link>
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-50"
          style={{
            background: "rgba(255,193,7,0.15)",
            border: "1px solid rgba(255,193,7,0.3)",
            color: "#fbbf24",
          }}
        >
          {downloading ? (
            "Generating…"
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v8m0 0L4 6m3 3l3-3M1 11h12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download
            </>
          )}
        </button>
      </div>

      {/* ── DATA SHEET (visual display) ── */}
      <div
        ref={sheetRef}
        className="max-w-[600px] mx-auto rounded-2xl overflow-hidden"
        style={{
          background: "#1a1612",
          fontFamily: "'SKODA Next', system-ui, sans-serif",
          color: "#eee8cd",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 pt-6 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <img src={logoSrc} alt="Best Mountain" className="h-10 w-auto" />
          {categoryName && (
            <span
              className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#eee8cd",
              }}
            >
              {categoryName}
            </span>
          )}
        </div>

        {/* Hero */}
        <div
          className="flex gap-4 px-4 sm:px-7 py-5 sm:py-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="hidden sm:flex flex-shrink-0 w-32 sm:w-40 h-28 sm:h-36 rounded-xl items-center justify-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.2">
              <rect x="2" y="2" width="36" height="36" rx="4" stroke="#eee8cd" strokeWidth="1.5"/>
              <circle cx="13" cy="13" r="4" stroke="#eee8cd" strokeWidth="1.5"/>
              <path d="M2 28l10-8 8 7 6-5 12 9" stroke="#eee8cd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <h1
              className="font-bold leading-none"
              style={{ fontSize: "clamp(1.8rem, 7vw, 2.6rem)", color: "#eee8cd", letterSpacing: "-0.02em" }}
            >
              {product.shortName || product.name}
            </h1>
            <p
              className="mt-1 font-semibold tracking-widest uppercase"
              style={{ fontSize: "0.65rem", color: "rgba(238,232,205,0.5)" }}
            >
              Technical Data Sheet
            </p>
          </div>
        </div>

        {/* Stats row — responsive */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <style>{`
            .ds-stats { display: grid; grid-template-columns: 1fr 1fr; padding: 16px; gap: 16px; }
            .ds-stats-c3 { grid-column: 1 / -1; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px; }
            @media (min-width: 480px) {
              .ds-stats { grid-template-columns: 1fr 1fr 1.4fr; padding: 20px 28px; gap: 24px; }
              .ds-stats-c3 { grid-column: auto; border-top: none; padding-top: 0; }
            }
          `}</style>
          <div className="ds-stats">
            <div>
              <Label>Fused Process</Label>
              <p className="font-bold" style={{ fontSize: "clamp(1.1rem, 4vw, 1.5rem)", color: "#eee8cd" }}>
                {product.fusedProcess || "—"}
              </p>
            </div>
            <div>
              <Label>Bulk Density</Label>
              <p className="font-bold" style={{ fontSize: "clamp(1.1rem, 4vw, 1.5rem)", color: "#eee8cd" }}>
                {product.bulkDensity != null ? product.bulkDensity : "—"}
              </p>
            </div>
            <div className="ds-stats-c3">
              <Label>Color Tone</Label>
              {product.colorTones?.length > 0 ? (
                <div className="flex gap-2 flex-wrap mt-1">
                  {product.colorTones.map((tone, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className="w-8 h-5 rounded"
                        style={{ background: tone.color || "#ccc", border: "1px solid rgba(255,255,255,0.15)" }}
                      />
                      <span className="text-center leading-tight" style={{ fontSize: "0.5rem", color: "rgba(238,232,205,0.55)", textTransform: "uppercase", lineHeight: 1.4 }}>
                        {tone.name}
                      </span>
                      {tone.color && (
                        <span className="text-center" style={{ fontSize: "0.45rem", color: "rgba(238,232,205,0.3)", letterSpacing: "0.04em", fontFamily: "monospace" }}>
                          {tone.color.toUpperCase()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/30 text-sm">—</p>
              )}
            </div>
          </div>
        </div>

        {/* Body — 1-col on mobile, 2-col on sm+ */}
        <div>
          <style>{`
            .ds-body { display: grid; grid-template-columns: 1fr; padding: 16px; gap: 20px; align-items: start; }
            .ds-body-right { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; }
            @media (min-width: 480px) {
              .ds-body { grid-template-columns: 1fr 1fr; padding: 20px 28px; }
              .ds-body-right { border-top: none; padding-top: 0; border-left: 1px solid rgba(255,255,255,0.08); padding-left: 24px; }
            }
          `}</style>
          <div className="ds-body">
            {/* Chemical composition table */}
            <div>
              <h2
                className="font-bold uppercase leading-tight mb-3"
                style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "#f59e0b" }}
              >
                Chemical Composition
                <br />& Physical Analysis
              </h2>
              {product.chemicalComposition?.length > 0 ? (
                <table className="w-full" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Name", "Typical", "Min %", "Max %"].map((h) => (
                        <th
                          key={h}
                          className="text-left pb-1"
                          style={{
                            fontSize: "0.5rem",
                            color: "rgba(238,232,205,0.4)",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        {[row.name, row.typical, row.min, row.max].map((cell, j) => (
                          <td
                            key={j}
                            style={{
                              fontSize: "0.6rem",
                              color: j === 0 ? "rgba(238,232,205,0.9)" : "rgba(238,232,205,0.65)",
                              fontWeight: j === 0 ? 600 : 400,
                              padding: "5px 8px 5px 0",
                            }}
                          >
                            {cell || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ fontSize: "0.65rem", color: "rgba(238,232,205,0.3)" }}>
                  No composition data available.
                </p>
              )}
            </div>

            {/* Remarks / Sizing / Application */}
            <div className="ds-body-right flex flex-col gap-3">
              {[
                { label: "Remarks", value: product.remarks },
                { label: "Sizing", value: product.sizing },
                { label: "Industrial Application", value: product.industrialApplication },
              ].map(({ label, value }) =>
                value ? (
                  <div key={label}>
                    <p
                      className="font-bold uppercase"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "#f59e0b" }}
                    >
                      {label}
                    </p>
                    <SectionDivider />
                    <p style={{ fontSize: "0.65rem", color: "rgba(238,232,205,0.75)", lineHeight: 1.6 }}>
                      {value}
                    </p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-7 py-4 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.25)" }}
        >
          <p style={{ fontSize: "0.55rem", color: "rgba(238,232,205,0.4)" }}>
            ⓒ Room 1112, 11/F Hollywood Plaza, Nathan road 610 Mongkok, Hong Kong
          </p>
          <p style={{ fontSize: "0.5rem", color: "rgba(238,232,205,0.25)", marginTop: "4px" }}>
            COPYRIGHT © 2017-2026 BEST MOUNTAIN LIMITED
          </p>
        </div>
      </div>
    </div>
  );
}


