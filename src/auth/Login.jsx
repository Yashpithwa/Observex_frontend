import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "./AuthContext";
import LiquidEther from "../animations/LiquidEther";

/**
 * Login page styled to match the signup palette:
 * - Background gradient: #0B1023 -> #0A0F1E -> #060A14
 * - Card: glassy, rounded, subtle border
 * - Button: cyan accent #00C2E0 with hover #00D9FF
 */

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // palette
  const colorAccent = "#00C2E0";
  const colorAccentHover = "#00D9FF";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, trialExpired, trialEndDate } = res.data;

      // Save token (AuthContext)
      login(token);

      // Save trial info for redirect logic
      localStorage.setItem("trialExpired", trialExpired);
      localStorage.setItem("trialEndDate", trialEndDate);

      navigate(trialExpired ? "/upgrade" : "/home");
    } catch (err) {
      setError(err?.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Liquid animated background behind everything */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={[colorAccent, colorAccentHover, "#38BDF8"]}
          autoDemo
          autoSpeed={0.4}
          autoIntensity={1.8}
        />
      </div>

      {/* Page content */}
      <div
        className="min-h-screen flex items-center justify-center px-6 py-12"
        style={{
          background:
            "linear-gradient(180deg, #0B1023 0%, #0A0F1E 40%, #060A14 100%)"
        }}
      >
        <div
          className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border border-white/10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            boxShadow: `0 10px 40px ${hexToRgba(colorAccent, 0.06)}`
          }}
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[#E6EDF3]">Access your station</h1>
            <p className="text-sm text-[#94A3B8] mt-2">Sign in to your monitoring console</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/8 border border-red-500/20 rounded p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="engineer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/8 text-[#E6EDF3] placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-opacity-80"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.02)` }}
              />
            </div>

            <div>
              <label className="block text-sm text-[#94A3B8] mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/8 text-[#E6EDF3] placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-opacity-80"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.02)` }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-md font-semibold text-[#041028] transition"
              style={{
                background: `linear-gradient(90deg, ${colorAccent} 0%, ${colorAccentHover} 100%)`,
                boxShadow: `0 8px 28px ${hexToRgba(colorAccent, 0.22)}`,
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-[#94A3B8] text-center mt-6">
            New to ObserveX?{" "}
            <Link to="/signup" className="text-[#00C2E0] hover:underline">
              Start free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

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
