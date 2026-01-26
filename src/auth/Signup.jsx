import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050b2c] via-[#020617] to-black text-white">

      {/* GLASS CARD */}
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Start your trial
          </h1>
          <p className="text-sm text-white/60 mt-2">
            30 days free. No credit card required.
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
            <label className="text-sm text-white/60">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Yash Pithwa"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-md bg-black/30 border border-white/10
              focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="engineer@company.com"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-md bg-black/30 border border-white/10
              focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-md bg-black/30 border border-white/10
              focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full mt-6 bg-cyan-500 text-black py-2 rounded-md
            font-mono font-bold hover:bg-cyan-400 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Start monitoring"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-white/60 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
