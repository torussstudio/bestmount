import { useState, useEffect } from "react";
import {
  FiPlus,
  FiTrash2,
  FiUploadCloud,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES  (injected once, inside the component tree)
───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  .pf-root *, .pf-root *::before, .pf-root *::after { box-sizing: border-box; }

  .pf-root {
    font-family: 'DM Sans', sans-serif;
    --c-bg:       #f5f4f0;
    --c-surface:  #ffffff;
    --c-border:   #e4e1d8;
    --c-muted:    #a09d95;
    --c-ink:      #1a1916;
    --c-sub:      #6b6860;
    --c-accent:   #2d6a4f;
    --c-accent2:  #40916c;
    --c-danger:   #c0392b;
    --c-focus:    #2d6a4f33;
    --r:          14px;
    --r-sm:       8px;
    --shadow:     0 2px 8px #0000000d, 0 1px 2px #0000000a;
    --shadow-md:  0 6px 24px #0000001a, 0 2px 8px #00000010;
  }

  /* Fade-slide in for each section */
  @keyframes pf-rise {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pf-section {
    animation: pf-rise 0.45s cubic-bezier(0.22,1,0.36,1) both;
  }
  .pf-section:nth-child(1) { animation-delay: 0.04s }
  .pf-section:nth-child(2) { animation-delay: 0.10s }
  .pf-section:nth-child(3) { animation-delay: 0.16s }
  .pf-section:nth-child(4) { animation-delay: 0.22s }
  .pf-section:nth-child(5) { animation-delay: 0.28s }
  .pf-section:nth-child(6) { animation-delay: 0.34s }
  .pf-section:nth-child(7) { animation-delay: 0.40s }

  /* Row entrance */
  @keyframes pf-row-in {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .pf-comp-row { animation: pf-row-in 0.28s cubic-bezier(0.22,1,0.36,1) both; }

  /* Tone row */
  @keyframes pf-tone-in {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  .pf-tone { animation: pf-tone-in 0.3s cubic-bezier(0.22,1,0.36,1) both; }

  /* Input focus ring */
  .pf-input {
    width: 100%;
    padding: 11px 14px;
    border-radius: var(--r-sm);
    border: 1.5px solid var(--c-border);
    background: var(--c-surface);
    color: var(--c-ink);
    font-family: inherit;
    font-size: 14px;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    appearance: none;
    -webkit-appearance: none;
  }
  .pf-input::placeholder { color: var(--c-muted); }
  .pf-input:hover { border-color: #c5c2b8; }
  .pf-input:focus {
    border-color: var(--c-accent);
    box-shadow: 0 0 0 3px var(--c-focus);
    background: #fff;
  }
  .pf-input.pf-error { border-color: var(--c-danger); }
  .pf-input.pf-error:focus { box-shadow: 0 0 0 3px #c0392b22; }

  /* Cell input (table) */
  .pf-cell {
    width: 100%;
    padding: 7px 10px;
    border-radius: 6px;
    border: 1.5px solid var(--c-border);
    background: var(--c-surface);
    color: var(--c-ink);
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .pf-cell::placeholder { color: #c8c5bc; }
  .pf-cell:focus {
    border-color: var(--c-accent);
    box-shadow: 0 0 0 3px var(--c-focus);
  }

  /* Label */
  .pf-label {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--c-sub);
    margin-bottom: 6px;
  }
  .pf-required { color: var(--c-danger); margin-left: 2px; }

  /* Section heading */
  .pf-sec-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-muted);
    padding-bottom: 10px;
    border-bottom: 1.5px solid var(--c-border);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pf-sec-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--c-accent);
    flex-shrink: 0;
  }

  /* Card / surface */
  .pf-card {
    background: var(--c-surface);
    border: 1.5px solid var(--c-border);
    border-radius: var(--r);
    padding: 22px;
    box-shadow: var(--shadow);
  }

  /* Accent btn */
  .pf-btn-accent {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 22px;
    border-radius: var(--r-sm);
    background: var(--c-accent);
    color: #fff;
    font-family: inherit; font-size: 13.5px; font-weight: 600;
    border: none; cursor: pointer;
    transition: background 0.16s, transform 0.12s, box-shadow 0.16s;
    box-shadow: 0 2px 10px #2d6a4f40;
  }
  .pf-btn-accent:hover { background: var(--c-accent2); box-shadow: 0 4px 16px #2d6a4f50; }
  .pf-btn-accent:active { transform: scale(0.97); }

  .pf-btn-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 18px;
    border-radius: var(--r-sm);
    background: transparent;
    color: var(--c-sub);
    font-family: inherit; font-size: 13.5px; font-weight: 500;
    border: 1.5px solid var(--c-border); cursor: pointer;
    transition: background 0.14s, color 0.14s, border-color 0.14s;
  }
  .pf-btn-ghost:hover { background: var(--c-bg); color: var(--c-ink); border-color: #c5c2b8; }

  /* Add row btn */
  .pf-btn-add {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; font-weight: 600; font-family: inherit;
    color: var(--c-accent); background: none; border: none; cursor: pointer;
    padding: 4px 8px; border-radius: 6px;
    transition: background 0.14s, color 0.14s;
  }
  .pf-btn-add:hover { background: #2d6a4f15; }

  /* Delete btn */
  .pf-btn-del {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 6px;
    background: none; border: none; cursor: pointer;
    color: #ccc;
    transition: background 0.14s, color 0.14s;
    opacity: 0;
  }
  tr:hover .pf-btn-del, .pf-tone:hover .pf-btn-del { opacity: 1; }
  .pf-btn-del:hover { background: #fee2e2; color: var(--c-danger); }

  /* Error msg */
  .pf-err { font-size: 11.5px; color: var(--c-danger); margin-top: 5px; display: flex; align-items: center; gap: 4px; }

  /* Image zone */
  .pf-img-zone {
    width: 120px; height: 120px;
    border-radius: var(--r);
    border: 2px dashed var(--c-border);
    background: var(--c-bg);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    overflow: hidden; flex-shrink: 0;
    transition: border-color 0.18s;
  }
  .pf-img-zone.has-img { border-style: solid; border-color: var(--c-border); }
  .pf-img-zone:hover { border-color: var(--c-accent); }

  .pf-upload-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    border: 1.5px solid var(--c-border); border-radius: var(--r-sm);
    background: var(--c-surface); cursor: pointer; font-family: inherit; font-size: 13px; color: var(--c-sub);
    transition: border-color 0.16s, background 0.16s, color 0.16s;
    width: 100%;
  }
  .pf-upload-btn:hover { border-color: var(--c-accent); background: #2d6a4f08; color: var(--c-accent); }

  /* Color swatch */
  .pf-swatch {
    width: 38px; height: 38px; border-radius: 8px;
    border: 2px solid var(--c-border);
    position: relative; overflow: hidden; flex-shrink: 0; cursor: pointer;
    transition: border-color 0.16s, transform 0.14s;
  }
  .pf-swatch:hover { border-color: var(--c-accent); transform: scale(1.08); }
  .pf-swatch input[type=color] {
    position: absolute; inset: -4px; width: calc(100% + 8px); height: calc(100% + 8px);
    opacity: 0; cursor: pointer;
  }

  /* Table */
  .pf-table { width: 100%; border-collapse: collapse; }
  .pf-th {
    padding: 9px 10px;
    font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--c-muted); text-align: left; background: var(--c-bg);
    border-bottom: 1.5px solid var(--c-border);
  }
  .pf-td { padding: 6px 6px; border-bottom: 1px solid #f0ede7; vertical-align: middle; }
  tr:last-child .pf-td { border-bottom: none; }
  tr:hover .pf-td { background: #faf9f6; }

  /* Select arrow */
  .pf-select-wrap { position: relative; }
  .pf-select-icon {
    pointer-events: none;
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    color: var(--c-muted); font-size: 14px;
  }

  /* Remove image */
  .pf-remove-img {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 12px; color: var(--c-danger); background: none; border: none; cursor: pointer; font-family: inherit;
    padding: 2px 4px; border-radius: 4px;
    transition: background 0.12s;
  }
  .pf-remove-img:hover { background: #fee2e2; }

  /* Pill badge on tone */
  .pf-tone-hex {
    font-family: 'DM Mono', monospace;
    font-size: 10.5px;
    color: var(--c-muted);
    background: var(--c-bg);
    padding: 3px 7px;
    border-radius: 20px;
    border: 1px solid var(--c-border);
    width: 70px;
    text-align: center;
    flex-shrink: 0;
  }

  /* Grid helpers */
  .pf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .pf-grid-full { grid-column: 1 / -1; }
  @media (max-width: 560px) { .pf-grid-2 { grid-template-columns: 1fr; } .pf-tone-hex { display: none; } }

  /* Progress dots at top */
  @keyframes pf-dot-pulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
  .pf-dot { width:7px;height:7px;border-radius:50%;background:var(--c-border); transition:background 0.3s; }
  .pf-dot.active { background: var(--c-accent); }

  /* Textarea */
  .pf-textarea {
    width: 100%; padding: 11px 14px;
    border-radius: var(--r-sm); border: 1.5px solid var(--c-border);
    background: var(--c-surface); color: var(--c-ink); font-family: inherit; font-size: 14px;
    resize: vertical; min-height: 80px; outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .pf-textarea::placeholder { color: var(--c-muted); }
  .pf-textarea:focus { border-color: var(--c-accent); box-shadow: 0 0 0 3px var(--c-focus); }
`;

// ── Constants ───────────────────────────────────────────────────────────
const DEFAULT_TONES = [
  { name: "", color: "#2d6a4f" },
  { name: "", color: "#74c69d" },
  { name: "", color: "#d8f3dc" },
];
const EMPTY_ROW = { name: "", typical: "", min: "", max: "" };

// ── Helpers ─────────────────────────────────────────────────────────────
function makeEmpty() {
  return {
    categoryId: "",
    name: "",
    shortName: "",
    isActive: true,
    colorTones: DEFAULT_TONES.map((t) => ({ ...t })),
    bulkDensity: "",
    fusedProcess: "",
    chemicalComposition: [{ ...EMPTY_ROW }],
    remarks: "",
    sizing: "",
    industrialApplication: "",
    image: null,
    imagePreview: "",
  };
}

function deepClone(p) {
  const BASE_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace("/api", "");
  const catId = p.category?._id || p.category || p.categoryId || "";
  return {
    ...p,
    categoryId: String(catId),
    isActive: p.isActive !== false,
    colorTones: (p.colorTones || []).map((t) => ({ ...t })),
    chemicalComposition: (p.chemicalComposition || []).map((r) => ({ ...r })),
    imagePreview: p?.image && p.image.startsWith("http") ? p.image : "",
    image: null,
  };
}

// ── Sub-components ──────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div className="pf-sec-title">
      <span className="pf-sec-dot" />
      {children}
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="pf-label">
        {label}
        {required && <span className="pf-required">*</span>}
      </label>
      {children}
      {error && (
        <p className="pf-err">
          <FiX size={11} /> {error}
        </p>
      )}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────
export default function ProductForm({
  initial,
  categories,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(() =>
    initial ? deepClone(initial) : makeEmpty(),
  );
  const [errors, setErrors] = useState({});
  const [msdsOpen, setMsdsOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  // Inject global CSS once
  useEffect(() => {
    if (document.getElementById("pf-style")) return;

    const el = document.createElement("style");

    el.id = "pf-style";

    el.textContent = GLOBAL_CSS;

    document.head.appendChild(el);
  }, []);

  const setField = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
  };
  const setToneName = (i, v) => {
    setForm((p) => {
      const t = p.colorTones.map((x, j) => (j === i ? { ...x, name: v } : x));
      return { ...p, colorTones: t };
    });
  };
  const setToneColor = (i, v) => {
    setForm((p) => {
      const t = p.colorTones.map((x, j) => (j === i ? { ...x, color: v } : x));
      return { ...p, colorTones: t };
    });
  };
  const addRow = () => {
    setForm((p) => ({
      ...p,
      chemicalComposition: [...p.chemicalComposition, { ...EMPTY_ROW }],
    }));
  };
  const removeRow = (i) => {
    setForm((p) => ({
      ...p,
      chemicalComposition: p.chemicalComposition.filter((_, j) => j !== i),
    }));
  };
  const setRowField = (i, col, val) => {
    setForm((p) => {
      const rows = p.chemicalComposition.map((r, j) =>
        j === i ? { ...r, [col]: val } : r,
      );
      return { ...p, chemicalComposition: rows };
    });
  };
  const clearError = (k) => {
    setErrors((p) => ({ ...p, [k]: "" }));
  };
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setForm((p) => {
      if (p.imagePreview) URL.revokeObjectURL(p.imagePreview);

      return {
        ...p,
        image: file,
        imagePreview: preview,
      };
    });
  }

  const removeImage = () => {
    setForm((p) => {
      if (p.imagePreview) URL.revokeObjectURL(p.imagePreview);

      return {
        ...p,
        image: null,
        imagePreview: "",
      };
    });
  };

  function handleUploadMSDS() {
    if (!pdfFile) {
      alert("Please select PDF");

      return;
    }

    setMsdsOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.categoryId) errs.categoryId = "Category is required";
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.shortName.trim()) errs.shortName = "Short name is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("shortName", form.shortName);
    fd.append("category", form.categoryId);
    fd.append(
      "bulkDensity",
      form.bulkDensity === "" ? "" : Number(form.bulkDensity),
    );
    fd.append("fusedProcess", form.fusedProcess);
    fd.append("remarks", form.remarks);
    fd.append("sizing", form.sizing);
    fd.append("industrialApplication", form.industrialApplication);
    fd.append("isActive", form.isActive ? "true" : "false");
    fd.append("colorTones", JSON.stringify(form.colorTones));
    fd.append("chemicalComposition", JSON.stringify(form.chemicalComposition));
    if (form.image) {
      fd.append("image", form.image);
    }

    if (pdfFile) {
      fd.append("msds", pdfFile);
    }

    if (form.imagePreview === "" && initial?.image) {
      fd.append("removeImage", "true");
    }
    onSubmit(fd);
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="pf-root">
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
        {/* ── 1. Basic Info ───────────────────────────────────── */}
        <div className="pf-card pf-section">
          <SectionTitle>Basic Information</SectionTitle>
          <div className="pf-grid-2">
            <div className="pf-grid-full">
              <Field label="Category" required error={errors.categoryId}>
                <div className="pf-select-wrap">
                  <select
                    value={form.categoryId}
                    onChange={(e) => {
                      setField("categoryId", e.target.value);
                      clearError("categoryId");
                    }}
                    className={`pf-input${errors.categoryId ? " pf-error" : ""}`}
                    style={{ paddingRight: "36px", cursor: "pointer" }}
                  >
                    <option value="">Select a category…</option>
                    {(categories || []).map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="pf-select-icon" />
                </div>
              </Field>
            </div>

            <Field label="Product Name" required error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => {
                  setField("name", e.target.value.toUpperCase());
                  clearError("name");
                }}
                placeholder="e.g. White Fused Alumina"
                className={`pf-input${errors.name ? " pf-error" : ""}`}
                style={{ textTransform: "uppercase" }}
              />
            </Field>

            <Field label="Short Name" required error={errors.shortName}>
              <input
                type="text"
                value={form.shortName}
                onChange={(e) => {
                  setField("shortName", e.target.value.toUpperCase());
                  clearError("shortName");
                }}
                placeholder="e.g. WFA"
                className={`pf-input${errors.shortName ? " pf-error" : ""}`}
                style={{ textTransform: "uppercase" }}
              />
            </Field>

            <div className="pf-grid-full">
              <label className="pf-label">Visible on public website</label>
              <button
                type="button"
                role="switch"
                aria-checked={form.isActive}
                onClick={() => setField("isActive", !form.isActive)}
                className={
                  "inline-flex h-8 w-14 cursor-pointer rounded-full p-0.5 transition-colors " +
                  (form.isActive
                    ? "justify-end bg-emerald-600"
                    : "justify-start bg-slate-300")
                }
              >
                <span className="pointer-events-none h-7 w-7 rounded-full bg-white shadow" />
              </button>
              <p className="text-xs text-[var(--c-muted)] mt-1.5">
                Turn off to hide this product from the materials page and
                product sheet links.
              </p>
            </div>
          </div>
        </div>

        {/* ── 2. Color Tones ──────────────────────────────────── */}
        <div className="pf-card pf-section">
          <SectionTitle>Color Tones</SectionTitle>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {form.colorTones.map((tone, idx) => (
              <div
                key={idx}
                className="pf-tone"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  animationDelay: `${idx * 0.07}s`,
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "'DM Mono',monospace",
                    color: "var(--c-muted)",
                    width: "18px",
                    flexShrink: 0,
                    textAlign: "right",
                  }}
                >
                  {idx + 1}
                </span>

                {/* Color swatch */}
                <div
                  className="pf-swatch"
                  style={{ backgroundColor: tone.color }}
                  title="Pick color"
                >
                  <input
                    type="color"
                    value={tone.color}
                    onChange={(e) => setToneColor(idx, e.target.value)}
                  />
                </div>

                <input
                  type="text"
                  value={tone.name}
                  onChange={(e) => setToneName(idx, e.target.value)}
                  placeholder={`Tone ${idx + 1} name`}
                  className="pf-input"
                  style={{ flex: 1 }}
                />

                <span className="pf-tone-hex">{tone.color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Properties ───────────────────────────────────── */}
        <div className="pf-card pf-section">
          <SectionTitle>Properties</SectionTitle>
          <div className="pf-grid-2">
            <Field label="Bulk Density">
              <input
                type="number"
                value={form.bulkDensity}
                onChange={(e) => setField("bulkDensity", e.target.value)}
                placeholder="e.g. 1850"
                min="0"
                step="any"
                className="pf-input"
              />
            </Field>
            <Field label="Fused Process">
              <input
                type="text"
                value={form.fusedProcess}
                onChange={(e) => setField("fusedProcess", e.target.value)}
                placeholder="e.g. Electric Arc Furnace"
                className="pf-input"
              />
            </Field>
          </div>
        </div>

        {/* ── 4. Product Image ────────────────────────────────── */}
        <div className="pf-card pf-section">
          <SectionTitle>Product Image</SectionTitle>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* Preview */}
            <div
              className={`pf-img-zone${form.imagePreview ? " has-img" : ""}`}
            >
              {form.imagePreview ? (
                <img
                  src={form.imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "8px",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--c-muted)",
                  }}
                >
                  <FiUploadCloud size={22} />
                  <span style={{ fontSize: "11px" }}>No image</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div
              style={{
                flex: 1,
                minWidth: "180px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <label className="pf-upload-btn">
                <FiUploadCloud size={16} />
                <span
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {form.image ? form.image.name : "Upload product image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>

              {form.imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="pf-remove-img"
                >
                  <FiTrash2 size={12} /> Remove image
                </button>
              )}

              <p
                style={{
                  fontSize: "11.5px",
                  color: "var(--c-muted)",
                  margin: 0,
                }}
              >
                PNG, JPG, WEBP · recommended 500 × 500 px
              </p>
            </div>
          </div>
        </div>
        {/* ── 5. MSDS File ───────────────────────── */}
        <div className="pf-card pf-section">
          <SectionTitle>MSDS File</SectionTitle>

          <button
            type="button"
            onClick={() => setMsdsOpen(true)}
            className="pf-btn-accent"
          >
            Select MSDS
          </button>

          {pdfFile && (
            <p
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#6b6860",
              }}
            >
              Selected: {pdfFile.name}
            </p>
          )}
        </div>

        {/* ── 5. Chemical Composition ─────────────────────────── */}
        <div className="pf-card pf-section">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
              paddingBottom: "10px",
              borderBottom: "1.5px solid var(--c-border)",
            }}
          >
            <div
              className="pf-sec-title"
              style={{ margin: 0, border: 0, padding: 0 }}
            >
              <span className="pf-sec-dot" />
              Chemical Composition &amp; Physical Analysis
            </div>
            <button type="button" onClick={addRow} className="pf-btn-add">
              <FiPlus size={13} /> Add Row
            </button>
          </div>

          <div
            style={{
              border: "1.5px solid var(--c-border)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table className="pf-table" style={{ minWidth: "440px" }}>
                <thead>
                  <tr>
                    {["Parameter / Name", "Typical", "Min %", "Max %", ""].map(
                      (h) => (
                        <th key={h} className="pf-th">
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {form.chemicalComposition.map((row, idx) => (
                    <tr
                      key={idx}
                      className="pf-comp-row"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {["name", "typical", "min", "max"].map((col) => {
                        const ph = {
                          name: "e.g. Al₂O₃",
                          typical: "98.5%",
                          min: "98%",
                          max: "99%",
                        };
                        return (
                          <td key={col} className="pf-td">
                            <input
                              type="text"
                              value={row[col]}
                              onChange={(e) =>
                                setRowField(idx, col, e.target.value)
                              }
                              placeholder={ph[col]}
                              className="pf-cell"
                            />
                          </td>
                        );
                      })}
                      <td
                        className="pf-td"
                        style={{ width: "40px", textAlign: "center" }}
                      >
                        {form.chemicalComposition.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRow(idx)}
                            className="pf-btn-del"
                          >
                            <FiTrash2 size={12} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p
            style={{
              fontSize: "11.5px",
              color: "var(--c-muted)",
              marginTop: "8px",
            }}
          >
            Hover a row to reveal the delete button.
          </p>
        </div>

        {/* ── 6. Additional Information ───────────────────────── */}
        <div className="pf-card pf-section">
          <SectionTitle>Additional Information</SectionTitle>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <Field label="Remarks">
              <input
                type="text"
                value={form.remarks}
                onChange={(e) => setField("remarks", e.target.value)}
                placeholder="Any additional notes or remarks…"
                className="pf-input"
              />
            </Field>

            <Field label="Sizing">
              <input
                type="text"
                value={form.sizing}
                onChange={(e) => setField("sizing", e.target.value)}
                placeholder="e.g. 0–1 mm, 1–3 mm, 3–5 mm"
                className="pf-input"
              />
            </Field>

            <Field label="Industrial Application">
              <input
                type="text"
                value={form.industrialApplication}
                onChange={(e) =>
                  setField("industrialApplication", e.target.value)
                }
                placeholder="e.g. Steel, Cement, Refractories"
                className="pf-input"
              />
            </Field>
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────── */}
        <div
          className="pf-section"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            paddingTop: "6px",
          }}
        >
          <button type="button" onClick={onCancel} className="pf-btn-ghost">
            Cancel
          </button>
          <button type="submit" className="pf-btn-accent">
            {initial ? "Update Product" : "Add Product"}
          </button>
        </div>
        {msdsOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-xl w-[320px]">
              <h3 className="font-semibold mb-3 text-black">Upload MSDS PDF</h3>

              <div className="flex flex-col gap-2">
                <label
                  className="
flex items-center justify-between
px-4 py-3
border border-gray-300
rounded-xl
cursor-pointer
hover:border-emerald-500
hover:bg-emerald-50
transition
"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📄</span>

                    <span className="text-sm text-gray-700 truncate">
                      {pdfFile ? pdfFile.name : "Click to upload MSDS PDF"}
                    </span>
                  </div>

                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>

                {pdfFile && (
                  <button
                    type="button"
                    onClick={() => setPdfFile(null)}
                    className="
self-end
flex items-center gap-1
text-sm
text-red-600
hover:text-red-700
transition
"
                  >
                    🗑 Remove file
                  </button>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleUploadMSDS}
                  className="
px-5 py-2.5
bg-emerald-600
text-white
font-medium
rounded-lg
shadow-sm
hover:bg-emerald-700
active:bg-emerald-800
transition
duration-200
cursor-pointer
"
                >
                  Upload
                </button>

                <button
                  type="button"
                  onClick={() => setMsdsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-black font-medium rounded-lg hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
