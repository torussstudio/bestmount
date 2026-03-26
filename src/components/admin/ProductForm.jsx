'use no memo';
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

// ── Module-level constants ──────────────────────────────────────────────
const DEFAULT_TONES = [
  { name: "", color: "#6366f1" },
  { name: "", color: "#10b981" },
  { name: "", color: "#f59e0b" },
];

const EMPTY_ROW = { name: "", typical: "", min: "", max: "" };

const INPUT_CLS =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white placeholder-slate-400";
const LABEL_CLS = "block text-slate-700 text-sm font-medium mb-1.5";
const SEC_CLS =
  "text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b border-slate-100";

// ── Pure helpers (never change identity) ───────────────────────────────
function makeEmpty() {
  return {
    categoryId: "",
    name: "",
    shortName: "",
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

  const BASE_URL =
    import.meta.env.VITE_API_URL?.replace("/api","") ||
    "http://localhost:5000";

  const catId =
    p.category?._id ||
    p.category ||
    p.categoryId ||
    "";

  return {

    ...p,

    categoryId: String(catId),

    colorTones: (p.colorTones || []).map((t) => ({ ...t })),

    chemicalComposition: (p.chemicalComposition || []).map((r) => ({ ...r })),

    imagePreview: p.image
      ? `${BASE_URL}/uploads/${p.image}`
      : "",

    image: null,

  };

}

// ── Component ──────────────────────────────────────────────────────────
export default function ProductForm({ initial, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState(function () {
    return initial ? deepClone(initial) : makeEmpty();
  });
  const [errors, setErrors] = useState({});

  useEffect(function () {
    setForm(initial ? deepClone(initial) : makeEmpty());
    setErrors({});
  }, [initial]);

  // ── Handlers (regular function declarations for react-compiler compat) ──

  function setField(key, value) {
    setForm(function (prev) { return { ...prev, [key]: value }; });
  }

  function setToneName(idx, value) {
    setForm(function (prev) {
      const tones = prev.colorTones.map(function (t, i) {
        return i === idx ? { ...t, name: value } : t;
      });
      return { ...prev, colorTones: tones };
    });
  }

  function setToneColor(idx, value) {
    setForm(function (prev) {
      const tones = prev.colorTones.map(function (t, i) {
        return i === idx ? { ...t, color: value } : t;
      });
      return { ...prev, colorTones: tones };
    });
  }

  function addRow() {
    setForm(function (prev) {
      return {
        ...prev,
        chemicalComposition: [...prev.chemicalComposition, { ...EMPTY_ROW }],
      };
    });
  }

  function removeRow(idx) {
    setForm(function (prev) {
      return {
        ...prev,
        chemicalComposition: prev.chemicalComposition.filter(function (_, i) {
          return i !== idx;
        }),
      };
    });
  }

  function setRowField(idx, col, value) {
    setForm(function (prev) {
      const rows = prev.chemicalComposition.map(function (r, i) {
        return i === idx ? { ...r, [col]: value } : r;
      });
      return { ...prev, chemicalComposition: rows };
    });
  }

  function clearError(key) {
    setErrors(function (prev) { return { ...prev, [key]: "" }; });
  }

  function handleImageChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  const preview = URL.createObjectURL(file);

  setForm(function (prev) {
    return {
      ...prev,
      image: file,
      imagePreview: preview,
    };
  });
}

function handleSubmit(e) {
  e.preventDefault();

  const errs = {};
  if (!form.categoryId) errs.categoryId = "Category is required.";
  if (!form.name.trim()) errs.name = "Product name is required.";
  if (!form.shortName.trim()) errs.shortName = "Short name is required.";

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

const formData = new FormData();

formData.append("name", form.name);
formData.append("shortName", form.shortName);
formData.append("category", form.categoryId);

formData.append(
  "bulkDensity",
  form.bulkDensity === "" ? "" : Number(form.bulkDensity)
);

formData.append("fusedProcess", form.fusedProcess);
formData.append("remarks", form.remarks);
formData.append("sizing", form.sizing);
formData.append("industrialApplication", form.industrialApplication);


// arrays stringify cheyyanam
formData.append(
  "colorTones",
  JSON.stringify(form.colorTones)
);

formData.append(
  "chemicalComposition",
  JSON.stringify(form.chemicalComposition)
);


// image file
// new image selected
if (form.image) {

  formData.append("image", form.image);

}

// image manually removed
if (!form.imagePreview) {

  formData.append("removeImage", "true");

}


onSubmit(formData);
}

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>

      {/* 1 ── Basic Information */}
      <section>
        <p className={SEC_CLS}>Basic Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Category */}
          <div className="sm:col-span-2">
            <label className={LABEL_CLS}>Category <span className="text-red-500">*</span></label>
            <select
              value={form.categoryId}
              onChange={function (e) { setField("categoryId", e.target.value); clearError("categoryId"); }}
              className={INPUT_CLS}
            >
              <option value="">Select a category…</option>
              {categories.map(function (c) {
                return <option key={c._id} value={c._id}>{c.name}</option>;
              })}
            </select>
            {errors.categoryId && <p className="text-red-500 text-xs mt-1.5">{errors.categoryId}</p>}
          </div>

          {/* Product Name */}
          <div>
            <label className={LABEL_CLS}>Product Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.name}
              onChange={function (e) { setField("name", e.target.value); clearError("name"); }}
              placeholder="e.g. White Fused Alumina"
              className={INPUT_CLS}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
          </div>

          {/* Short Name */}
          <div>
            <label className={LABEL_CLS}>Short Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.shortName}
              onChange={function (e) { setField("shortName", e.target.value); clearError("shortName"); }}
              placeholder="e.g. WFA"
              className={INPUT_CLS}
            />
            {errors.shortName && <p className="text-red-500 text-xs mt-1.5">{errors.shortName}</p>}
          </div>
        </div>
      </section>

      {/* 2 ── Color Tones */}
      <section>
        <p className={SEC_CLS}>Color Tones</p>
        <div className="space-y-3">
          {form.colorTones.map(function (tone, idx) {
            return (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-slate-400 text-xs font-mono w-4 shrink-0">{idx + 1}</span>
                <input
                  type="text"
                  value={tone.name}
                  onChange={function (e) { setToneName(idx, e.target.value); }}
                  placeholder={"Tone " + (idx + 1) + " name"}
                  className={INPUT_CLS + " flex-1"}
                />
                {/* Color swatch – colored div wraps the native <input type="color"> */}
                <div
                  className="relative w-10 h-10 rounded-xl border-2 border-slate-200 cursor-pointer overflow-hidden shadow-sm shrink-0"
                  style={{ backgroundColor: tone.color }}
                  title="Pick color"
                >
                  <input
                    type="color"
                    value={tone.color}
                    onChange={function (e) { setToneColor(idx, e.target.value); }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-slate-400 text-xs font-mono hidden sm:block w-[4.5rem] shrink-0">
                  {tone.color}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 ── Properties */}
      <section>
        <p className={SEC_CLS}>Properties</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLS}>Bulk Density</label>
            <input
              type="number"
              value={form.bulkDensity}
              onChange={function (e) { setField("bulkDensity", e.target.value); }}
              placeholder="e.g. 1850"
              min="0"
              step="any"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className={LABEL_CLS}>Fused Process</label>
            <input
              type="text"
              value={form.fusedProcess}
              onChange={function (e) { setField("fusedProcess", e.target.value); }}
              placeholder="e.g. Electric Arc Furnace"
              className={INPUT_CLS}
            />
          </div>
        </div>
      </section>

   {/* ── Product Image ───────────────────────── */}
<section>

  <p className={SEC_CLS}>Product Image</p>

  <div className="flex flex-col sm:flex-row items-start gap-4">

    {/* Preview */}
    <div className="w-32 h-32 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">

      {form.imagePreview ? (

        <img
          src={form.imagePreview}
          alt="Preview"
          className="w-full h-full object-contain p-2"
        />

      ) : (

        <span className="text-xs text-slate-400">
          No Image
        </span>

      )}

    </div>


    <div className="flex flex-col gap-2">

      {/* upload */}
      <input

        type="file"

        accept="image/*"

        onChange={handleImageChange}

        className="text-sm"

      />


      {/* delete */}
      {form.imagePreview && (

        <button

          type="button"

          onClick={() =>

            setForm(prev => ({

              ...prev,

              image: null,

              imagePreview: ""

            }))

          }

          className="text-xs text-red-500 hover:underline"

        >

          Remove image

        </button>

      )}

    </div>

  </div>

</section>

      {/* 4 ── Chemical Composition & Physical Analysis */}
      <section>
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-4">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Chemical Composition &amp; Physical Analysis
          </p>
          <button
            type="button"
            onClick={addRow}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-500 text-xs font-semibold transition cursor-pointer"
          >
            <FiPlus className="text-xs" /> Add Row
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[460px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {["Name / Parameter", "Typical", "Min %", "Max %", ""].map(function (h) {
                    return (
                      <th key={h} className="px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-left">
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {form.chemicalComposition.map(function (row, idx) {
                  return (
                    <tr key={idx} className="group">
                      {["name", "typical", "min", "max"].map(function (col) {
                        const placeholders = { name: "e.g. Al₂O₃", typical: "98.5%", min: "98%", max: "99%" };
                        return (
                          <td key={col} className="px-2 py-2">
                            <input
                              type="text"
                              value={row[col]}
                              onChange={function (e) { setRowField(idx, col, e.target.value); }}
                              placeholder={placeholders[col]}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white placeholder-slate-300"
                            />
                          </td>
                        );
                      })}
                      <td className="px-2 py-2 w-10">
                        {form.chemicalComposition.length > 1 && (
                          <button
                            type="button"
                            onClick={function () { removeRow(idx); }}
                            className="p-1.5 rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 transition cursor-pointer opacity-0 group-hover:opacity-100"
                          >
                            <FiTrash2 className="text-xs" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-slate-400 text-xs mt-2">Hover a row and click the trash icon to remove it.</p>
      </section>

      {/* 5 ── Additional Information */}
      <section>
        <p className={SEC_CLS}>Additional Information</p>
        <div className="space-y-4">
          <div>
            <label className={LABEL_CLS}>Remarks</label>
            <input
              type="text"
              value={form.remarks}
              onChange={function (e) { setField("remarks", e.target.value); }}
              placeholder="Any additional notes or remarks…"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className={LABEL_CLS}>Sizing</label>
            <input
              type="text"
              value={form.sizing}
              onChange={function (e) { setField("sizing", e.target.value); }}
              placeholder="e.g. 0–1 mm, 1–3 mm, 3–5 mm"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className={LABEL_CLS}>Industrial Application</label>
            <input
              type="text"
              value={form.industrialApplication}
              onChange={function (e) { setField("industrialApplication", e.target.value); }}
              placeholder="e.g. Steel, Cement, Refractories"
              className={INPUT_CLS}
            />
          </div>
        </div>
      </section>

      {/* Submit / Cancel */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition cursor-pointer shadow-md shadow-indigo-500/20"
        >
          {initial ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}


