


// 'use no memo';
// import { useState, useEffect } from "react";

// /**
//  * CategoryForm – single "name" field.
//  * Props: initial (null = add, object = edit), onSubmit(data), onCancel
//  */
// export default function CategoryForm({ initial, onSubmit, onCancel }) {
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setName(initial?.name ?? "");
//     setError("");
//   }, [initial]);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const trimmed = name.trim();

//     if (!trimmed) {
//       setError("Category name is required.");
//       return;
//     }

//     try {
//       setLoading(true);

//       await onSubmit({ name: trimmed });

//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">

//       {/* Input */}
//       <div>
//         <label className="block text-slate-700 text-sm font-medium mb-1.5">
//           Category Name <span className="text-red-500">*</span>
//         </label>

//         <input
//           type="text"
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value);
//             if (error) setError("");
//           }}
//           placeholder="e.g. Abrasives"
//           autoFocus
//           className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
//         />

//         {error && (
//           <p className="text-red-500 text-xs mt-1.5">{error}</p>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 justify-end pt-2">

//         <button
//           type="button"
//           onClick={onCancel}
//           disabled={loading}
//           className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-60"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           disabled={loading || !name.trim()}
//           className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition disabled:opacity-60"
//         >
//           {loading
//             ? "Saving..."
//             : initial
//               ? "Update"
//               : "Add Category"}
//         </button>

//       </div>
//     </form>
//   );
// }


'use no memo';

import { useState, useEffect } from "react";
import { FiTag, FiAlertCircle } from "react-icons/fi";

export default function CategoryForm({

 initial,
 onSubmit,
 onCancel,
 existingCategories = []   // pass category list

}) {

 const [name,setName] = useState("");

 const [error,setError] = useState("");

 const [loading,setLoading] = useState(false);

 const [duplicate,setDuplicate] = useState(false);



 useEffect(()=>{

  setName(initial?.name ?? "");

  setError("");

  setDuplicate(false);

 },[initial]);



 function checkDuplicate(value){

  const exists = existingCategories.some(cat=>

   cat.name.toLowerCase() === value.toLowerCase() &&

   cat._id !== initial?._id

  );

  setDuplicate(exists);

 }



 async function handleSubmit(e){

  e.preventDefault();

  const trimmed = name.trim();



  if(!trimmed){

   setError("Category name required");

   return;

  }



  if(duplicate){

   setError("Category already exists");

   return;

  }



  try{

   setLoading(true);



   await onSubmit({

    name: trimmed

   });



  }
  finally{

   setLoading(false);

  }

 }



 return (

 <form onSubmit={handleSubmit} className="space-y-5">




 {/* input */}
 <div>

 <label className="text-xs font-semibold tracking-wide text-slate-500">

 CATEGORY NAME

 </label>




 <div className="relative mt-1">




 <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>




 <input

 type="text"

 value={name}

 onChange={(e)=>{

  const value = e.target.value;

  setName(value);

  setError("");

  checkDuplicate(value);

 }}

 placeholder="Abrasives"

 autoFocus




 className={`

 w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm
 text-black placeholder:text-slate-400
 shadow-sm outline-none transition



 ${duplicate

  ? "border-red-400 focus:ring-red-400"

  : "border-slate-200 focus:ring-indigo-500/40 focus:border-indigo-500"

 }

 `}

 />




 </div>




 {(error || duplicate) && (

 <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">

 <FiAlertCircle/>

 {duplicate

  ? "Category name already exists"

  : error

 }

 </div>

 )}




 </div>




 {/* buttons */}
 <div className="flex justify-end gap-3 pt-2">




 <button

 type="button"

 onClick={onCancel}

 disabled={loading}




 className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"

 >

 Cancel

 </button>




 <button

 type="submit"

 disabled={loading || !name.trim() || duplicate}




 className="

 min-w-[140px]

 flex items-center justify-center gap-2

 px-5 py-2.5 rounded-xl

 text-white text-sm font-semibold

 bg-gradient-to-r from-indigo-600 to-violet-600

 hover:brightness-110

 shadow-lg shadow-indigo-900/20

 transition

 disabled:opacity-60

 "

 >

 {loading && (

 <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>

 )}



 {loading

 ? "Saving..."

 : initial

 ? "Update Category"

 : "Add Category"

 }




 </button>




 </div>




 </form>

 );

}