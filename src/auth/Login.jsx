import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      login(res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050b2c] via-[#020617] to-black text-white">
      
      {/* GLASS CARD */}
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">
            Access your station
          </h1>
          <p className="text-sm text-white/60 mt-2">
            Sign in to your monitoring console
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded p-2">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-white/60">Email</label>
            <input
              type="email"
              required
              placeholder="engineer@company.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-md bg-black/30 border border-white/10 
              focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-md bg-black/30 border border-white/10 
              focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full mt-6 bg-cyan-400 text-black py-2 rounded-md 
            font-mono font-bold hover:bg-cyan-300 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-white/60 text-center mt-6">
          New to ObserveX?{" "}
          <Link to="/signup" className="text-cyan-400 hover:underline">
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
