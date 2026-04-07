import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e) => {
  

  e.preventDefault();

  setError("");

  if (!username.trim()) {

    setError("Username required");

    return;

  }

  if (!password.trim()) {

    setError("Password required");

    return;

  }

  setLoading(true);

  let timeoutId;
  try {

    const controller = new AbortController();

    timeoutId = setTimeout(() => {
      controller.abort();
    }, 60000);

    await API.post("/admin/login", 
      {
        username: username.trim(),
        password,
      },
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    // axios throws on 4xx/5xx, so if we reach here it's successful
      navigate("/admin", { replace: true });
  } catch (err) {
    if (timeoutId) clearTimeout(timeoutId);
    
    if (axios.isCancel(err)) {
      setError("Server taking too long");
    } else if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("Server error");
    }

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 relative overflow-hidden bg-[url('/about-bg.webp')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/40" />
      {/* animated glow */}
      {/* <div className="absolute w-[420px] h-[420px] bg-indigo-500/20 blur-[120px] rounded-full -top-40 -left-40 animate-pulse" />

      <div className="absolute w-[420px] h-[420px] bg-violet-500/20 blur-[120px] rounded-full -bottom-40 -right-40 animate-pulse" /> */}

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-7">
          {/* logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-3 mb-4">
              {/* company logo image */}
              <img
                src="/logo.png"
                alt="logo"
                className="w-36 md:w-44 object-contain"
              />

              {/* animated icon fallback */}
            </div>
          </div>

          {/* error */}
          {error && (
            <div className="flex items-center gap-2 text-sm bg-red-500/10 border border-red-500/30 text-red-500 px-3 py-2 rounded-xl mb-4">
              <FiAlertCircle />

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
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400">
                Password
              </label>

              <div className="relative mt-1">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-medium transition hover:bg-white/20 hover:scale-[1.02] cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
