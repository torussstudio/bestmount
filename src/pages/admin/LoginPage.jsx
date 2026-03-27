'use no memo';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminSession } from "../../utils/auth";
import { FiUser, FiLock, FiAlertCircle } from "react-icons/fi";
import { MdOutlineTerrain } from "react-icons/md";
import API from "../../api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setAdminSession(data.admin);
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
    <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans px-3 sm:px-6 overflow-hidden">

      {/* Decorative blobs */}
      <div className="hidden sm:block absolute top-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-sm sm:max-w-md mx-auto relative z-10">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-8">

          {/* Header */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-3 sm:mb-4">
              <MdOutlineTerrain className="text-white text-2xl sm:text-3xl" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Admin Panel
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 text-center">
              Sign in to manage your content
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm rounded-lg px-3 py-2 mb-4">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

            {/* Username */}
            <div>
              <label className="block text-slate-300 text-xs sm:text-sm mb-1">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="admin"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 text-xs sm:text-sm mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm sm:text-base font-semibold"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <p className="text-center text-slate-500 text-[10px] sm:text-xs mt-5">
            Hint: <span className="text-slate-400">admin / 123456</span>
          </p>

        </div>
      </div>
    </div>
  );
}