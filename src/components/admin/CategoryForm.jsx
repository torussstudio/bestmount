// 'use no memo';
// import { useState, useEffect } from "react";

// /**
//  * CategoryForm – single "name" field.
//  * Props: initial (null = add, object = edit), onSubmit(data), onCancel
//  */
// export default function CategoryForm({ initial, onSubmit, onCancel }) {
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setName(initial?.name ?? "");
//     setError("");
//   }, [initial]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!name.trim()) { setError("Category name is required."); return; }
//     onSubmit({ name: name.trim() });
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-slate-700 text-sm font-medium mb-1.5">
//           Category Name <span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => { setName(e.target.value); setError(""); }}
//           placeholder="e.g. Footwear"
//           autoFocus
//           className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
//         />
//         {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
//       </div>

//       <div className="flex gap-3 justify-end pt-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition cursor-pointer shadow-md shadow-indigo-500/20"
//         >
//           {initial ? "Update" : "Add Category"}
//         </button>
//       </div>
//     </form>
//   );
// }


'use no memo';
import { useState, useEffect } from "react";

/**
 * CategoryForm – single "name" field.
 * Props: initial (null = add, object = edit), onSubmit(data), onCancel
 */
export default function CategoryForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(initial?.name ?? "");
    setError("");
  }, [initial]);

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmed = name.trim();

    if (!trimmed) {
      setError("Category name is required.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({ name: trimmed });

    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Input */}
      <div>
        <label className="block text-slate-700 text-sm font-medium mb-1.5">
          Category Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          placeholder="e.g. Abrasives"
          autoFocus
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />

        {error && (
          <p className="text-red-500 text-xs mt-1.5">{error}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-2">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : initial
              ? "Update"
              : "Add Category"}
        </button>

      </div>
    </form>
  );
}