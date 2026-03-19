'use no memo';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, setAdminSession } from "../../utils/auth";
import { FiUser, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi";
import { MdOutlineTerrain } from "react-icons/md";
import API from "../../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    // if (isLoggedIn()) {
    //   navigate("/admin", { replace: true });
    // }
  }, [navigate]);

  // ✅ Clean API-based login
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setError("");

  //   if (!username.trim()) {
  //     setError("Username is required.");
  //     return;
  //   }
  //   if (!password.trim()) {
  //     setError("Password is required.");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const res = await fetch(`${API}/admin/login`,  {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: username.trim(),
  //         password,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       setAdminSession(data.admin);
  //       navigate("/admin", { replace: true });
  //     } else {
  //       setError(data.message || "Login failed");
  //     }
  //   } catch (err) {
  //     setError("Server error");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  if (!username.trim()) {
    setError("Username is required.");
    return;
  }

  if (!password.trim()) {
    setError("Password is required.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.trim(),
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ store login state
      setAdminSession(data.admin);

      // ✅ force redirect
      navigate("/admin", { replace: true });
    } else {
      setError(data.message || "Login failed");
    }
  } catch (err) {
    setError("Server error");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
              <MdOutlineTerrain className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-400 text-sm mt-1">
              Sign in to manage your content
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <label className="block text-slate-300 text-sm mb-1">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="admin"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 text-sm mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  placeholder="••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <p className="text-center text-slate-500 text-xs mt-6">
            Hint: <span className="text-slate-400">admin / 123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}