import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import LiquidEther from "../animations/LiquidEther";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🎨 SAME PALETTE AS LOGIN
  const colorAccent = "#00C2E0";
  const colorAccentHover = "#00D9FF";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* 🌊 SAME ANIMATION LAYER AS LOGIN */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={[colorAccent, colorAccentHover, "#38BDF8"]}
          autoDemo
          autoSpeed={0.4}
          autoIntensity={1.8}
        />
      </div>

      {/* 🌌 SAME DARK GRADIENT AS LOGIN */}
      <div
        className="min-h-screen flex items-center justify-center px-6 py-12"
        style={{
          background:
            "linear-gradient(180deg, #0B1023 0%, #0A0F1E 40%, #060A14 100%)",
        }}
      >
        {/* 💎 SAME GLASS CARD */}
        <div
          className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border border-white/10"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            boxShadow: `0 10px 40px ${hexToRgba(colorAccent, 0.06)}`,
          }}
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[#E6EDF3]">
              Start your trial
            </h1>
            <p className="text-sm text-[#94A3B8] mt-2">
              30 days free. No credit card required.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/8 border border-red-500/20 rounded p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/8 text-[#E6EDF3] placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-opacity-80"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}
              />
            </div>

            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/8 text-[#E6EDF3] placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-opacity-80"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}
              />
            </div>

            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/8 text-[#E6EDF3] placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-opacity-80"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}
              />
            </div>

            <button
              disabled={loading}
              className="w-full mt-2 py-3 rounded-md font-semibold text-[#041028] transition"
              style={{
                background: `linear-gradient(90deg, ${colorAccent} 0%, ${colorAccentHover} 100%)`,
                boxShadow: `0 8px 28px ${hexToRgba(colorAccent, 0.22)}`,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating account..." : "Start monitoring"}
            </button>
          </form>

          <p className="text-sm text-[#94A3B8] text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#00C2E0] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function hexToRgba(hex, alpha = 1) {
  try {
    const h = hex.replace("#", "");
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return `rgba(0,194,224,${alpha})`;
  }
}
