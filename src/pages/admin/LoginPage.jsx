// 'use no memo';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { setAdminSession } from "../../utils/auth";
// import { FiUser, FiLock, FiAlertCircle } from "react-icons/fi";
// import { MdOutlineTerrain } from "react-icons/md";
// import API from "../../api";

// export default function LoginPage() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");

//     if (!username.trim()) {
//       setError("Username is required.");
//       return;
//     }

//     if (!password.trim()) {
//       setError("Password is required.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`${API}/admin/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: username.trim(),
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setAdminSession(data.admin);
//         navigate("/admin", { replace: true });
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       setError("Server error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
// <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-sans px-4 relative overflow-hidden">

// {/* glow effects */}
// <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"/>
// <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"/>

// <div className="w-full max-w-md relative z-10">

// <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl px-6 py-7">

// {/* brand */}
// <div className="flex flex-col items-center mb-7">

// <div className="flex items-center gap-3 mb-4">

// <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg">

// <MdOutlineTerrain className="text-white text-2xl"/>

// </div>

// <div>
// <h2 className="text-white font-semibold text-lg leading-none">
// Best Mountain
// </h2>

// <p className="text-slate-400 text-xs">
// Admin dashboard
// </p>

// </div>

// </div>

// <h1 className="text-2xl font-semibold text-white">
// Sign in
// </h1>

// <p className="text-slate-400 text-sm mt-1">
// Manage products & MSDS files
// </p>

// </div>


// {/* error */}
// {error && (

// <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/40 text-red-400 text-sm rounded-xl px-3 py-2 mb-4">

// <FiAlertCircle/>

// <span>{error}</span>

// </div>

// )}


// <form onSubmit={handleSubmit} className="space-y-4">

// {/* username */}
// <div>

// <label className="text-xs text-slate-400">
// Username
// </label>

// <div className="relative mt-1">

// <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>

// <input
// type="text"
// value={username}
// onChange={(e)=>setUsername(e.target.value)}
// placeholder="admin"
// className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
// />

// </div>

// </div>


// {/* password */}
// <div>

// <label className="text-xs text-slate-400">
// Password
// </label>

// <div className="relative mt-1">

// <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>

// <input
// type="password"
// value={password}
// onChange={(e)=>setPassword(e.target.value)}
// placeholder="••••••"
// className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
// />

// </div>

// </div>


// <button
// type="submit"
// disabled={loading}
// className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 transition text-white font-semibold shadow-lg shadow-indigo-900/30"
// >

// {loading
// ? "Signing in..."
// : "Sign In"}

// </button>

// </form>


// <div className="mt-6 text-center text-xs text-slate-500">

// admin / 123456

// </div>

// </div>

// </div>

// </div>
// );
// }

'use no memo';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminSession } from "../../utils/auth";
import {
 FiUser,
 FiLock,
 FiEye,
 FiEyeOff,
 FiAlertCircle
} from "react-icons/fi";
import { MdOutlineTerrain } from "react-icons/md";
import API from "../../api";

export default function LoginPage() {

 const navigate = useNavigate();

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");
 const [error,setError] = useState("");
 const [loading,setLoading] = useState(false);

 const [showPassword,setShowPassword] = useState(false);
 const [remember,setRemember] = useState(true);


 async function handleSubmit(e){

  e.preventDefault();

  setError("");

  if(!username.trim()){

   setError("Username required");
   return;

  }

  if(!password.trim()){

   setError("Password required");
   return;

  }

  setLoading(true);

  try{

   const res = await fetch(`${API}/admin/login`,{

    method:"POST",

    headers:{
     "Content-Type":"application/json"
    },

    body:JSON.stringify({

     username:username.trim(),
     password

    })

   });

   const data = await res.json();

   if(res.ok){

    setAdminSession(data.admin,remember);

    navigate("/admin",{replace:true});

   }else{

    setError(data.message || "Login failed");

   }

  }catch{

   setError("Server error");

  }

  setLoading(false);

 }



 return (

 <div className="min-h-[100dvh] flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">




 {/* animated glow */}
 <div className="absolute w-[420px] h-[420px] bg-indigo-500/20 blur-[120px] rounded-full -top-40 -left-40 animate-pulse"/>

 <div className="absolute w-[420px] h-[420px] bg-violet-500/20 blur-[120px] rounded-full -bottom-40 -right-40 animate-pulse"/>




 <div className="w-full max-w-md relative z-10">

 <div className="rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-7">



 {/* logo */}
 <div className="flex flex-col items-center mb-7">

 <div className="flex items-center gap-3 mb-4">

 {/* company logo image */}
 <img
 src="/logo.png"
 alt="logo"
 className="w-20 h-20 object-contain"
 />


 {/* animated icon fallback */}


 </div>


 <h1 className="text-xl font-semibold text-slate-900 dark:text-white">

 Best Mountain Admin

 </h1>

 <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">

 Manage products & MSDS

 </p>

 </div>



 {/* error */}
 {error && (

 <div className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/30 text-red-500 px-3 py-2 rounded-xl mb-4">

 <FiAlertCircle/>

 {error}

 </div>

 )}



 <form onSubmit={handleSubmit} className="space-y-4">




 {/* username */}
 <div>

 <label className="text-xs text-slate-500 dark:text-slate-400">

 Username

 </label>

 <div className="relative mt-1">

 <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>

 <input

 type="text"

 value={username}

 onChange={(e)=>setUsername(e.target.value)}

 placeholder="admin"

 className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"

 />

 </div>

 </div>




 {/* password */}
 <div>

 <label className="text-xs text-slate-500 dark:text-slate-400">

 Password

 </label>

 <div className="relative mt-1">

 <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>


 <input

 type={showPassword ? "text" : "password"}

 value={password}

 onChange={(e)=>setPassword(e.target.value)}

 placeholder="••••••"

 className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"

 />


 <button

 type="button"

 onClick={()=>setShowPassword(!showPassword)}

 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500"

 >

 {showPassword ? <FiEyeOff/> : <FiEye/>}

 </button>

 </div>

 </div>




 {/* remember */}
 <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 cursor-pointer">

 <input

 type="checkbox"

 checked={remember}

 onChange={()=>setRemember(!remember)}

 className="accent-indigo-600"

 />

 Remember me

 </label>




 {/* submit */}
 <button

 type="submit"

 disabled={loading}

 className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg hover:brightness-110 transition"

 >

 {loading ? "Signing in..." : "Sign in"}

 </button>




 </form>



 <p className="text-center text-[11px] text-slate-400 mt-6">

 admin / 123456

 </p>



 </div>

 </div>

 </div>

 );

}