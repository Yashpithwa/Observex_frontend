import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlurText from "../animations/BlurText";
import CountUp from "../animations/CountUp";
import ElectricBorder from "../animations/ElectricBorder";
import {
  ArrowRight,
  Database,
  LineChart,
  Code2,
  Shield,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-100 bg-gradient-to-b from-[#050817] via-[#071027] to-[#020615] antialiased overflow-x-hidden">
      <Navbar />

      <main className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">

        {/* HERO */}
        <section className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Hero />

          <div className="space-y-8">
            <TerminalCard />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard value={<><CountUp from={0} to={99.9} duration={1.8}/> %</>} label="Uptime SLA" />
              <StatCard value={<><CountUp from={5} to={10} duration={1.8}/> ms</>} label="P99 latency" />
              <StatCard value={<span className="text-cyan-300 font-semibold">Auto</span>} label="Elastic scaling" />
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="mt-20 lg:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
          <LiveMetric label="Events / sec" value={<CountUp from={0} to={2400000} duration={2.2} separator="," />} />
          <LiveMetric label="Avg latency" value={<><CountUp from={10} to={14} duration={2.2}/> ms</>} />
          <LiveMetric label="Error rate" value={<><CountUp from={0} to={0.02} duration={2.2} decimals={2}/> %</>} />
          <LiveMetric label="Active services" value={<CountUp from={0} to={1248} duration={2.2} separator="," />} />
        </section>

        {/* FEATURES */}
        <section className="mt-24 lg:mt-32">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center lg:text-left">
            Built for <span className="text-cyan-300">production systems</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <WideFeature icon={<Database />} title="Real-time ingestion" desc="Continuous metrics, logs, and traces. High-throughput ingestion with minimal latency." />
            <WideFeature icon={<LineChart />} title="Clear system visibility" desc="Dashboards built for engineers — query, correlate, and act fast." />
            <WideFeature icon={<Code2 />} title="Action-focused alerts" desc="Grouped alerts with impact so your team knows what to fix first." />
            <WideFeature icon={<Shield />} title="Security by default" desc="RBAC, encryption at rest and in transit, audit trails." />
          </div>
        </section>

      </main>

      <footer className="border-t border-white/10 py-8 text-center text-slate-400 text-sm">
        © 2025 ObserveX
      </footer>

      <StickyCTA />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-b border-white/10 bg-[#04061a]/70 backdrop-blur sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-md bg-cyan-400 flex items-center justify-center text-[#041028] font-bold text-lg">OX</div>
          <span className="font-semibold text-lg md:text-xl">ObserveX</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/pricing" className="text-slate-300 hover:text-white">Pricing</Link>
          <Link to="/docs" className="text-slate-300 hover:text-white">Docs</Link>
          <Link to="/login" className="text-slate-300 hover:text-white">Login</Link>
          <Link to="/signup" className="px-5 py-2 bg-cyan-400 text-[#041028] rounded-xl font-semibold shadow-lg hover:bg-cyan-300 transition">Start Free</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 bg-[#050817] flex flex-col gap-3">
          <Link to="/pricing" className="py-2">Pricing</Link>
          <Link to="/docs" className="py-2">Docs</Link>
          <Link to="/login" className="py-2">Login</Link>
          <Link to="/signup" className="py-2 px-4 bg-cyan-400 text-[#041028] rounded-xl font-semibold text-center">Start Free</Link>
        </div>
      )}
    </nav>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <div className="space-y-6 text-center lg:text-left">
      <BlurText
        text="Production monitoring"
        delay={200}
        animateBy="words"
        direction="top"
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight"
      />
      <BlurText
        text="built for chaos"
        delay={260}
        animateBy="words"
        direction="top"
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-cyan-300"
      />
      <p className="text-slate-400 max-w-2xl mx-auto lg:mx-0 text-lg sm:text-xl">
        Real-time observability platform for engineering teams. Correlate signals, find root causes, and deploy fixes faster.
      </p>
      <div className="flex justify-center lg:justify-start gap-4 mt-4">
        <Link to="/signup" className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-400 rounded-2xl font-semibold text-[#041028] shadow-xl hover:bg-cyan-300 transition">
          Start monitoring <ArrowRight className="w-5 h-5" />
        </Link>
        <Link to="/demo" className="inline-flex items-center gap-3 px-6 py-4 border border-white/10 rounded-2xl text-slate-200 hover:bg-white/2 transition">
          Request demo
        </Link>
      </div>
    </div>
  );
}

/* ---------------- TERMINAL ---------------- */

function TerminalCard() {
  return (
    <ElectricBorder color="#22d3ee" speed={1} chaos={0.12} thickness={2} style={{ borderRadius: 20 }}>
      <div className="rounded-2xl bg-gradient-to-b from-[#021023]/95 to-[#031a33]/75 p-6 sm:p-8 backdrop-blur">
        <pre className="font-mono text-[12px] sm:text-sm text-slate-300 leading-relaxed">
{`$ observe --real-time
● api-server    OK   12ms
● cache-layer   OK    8ms
● db-primary    OK   18ms`}
        </pre>
      </div>
    </ElectricBorder>
  );
}

/* ---------------- WIDE FEATURE CARD ---------------- */

const WideFeature = ({ icon, title, desc }) => (
  <div className="group rounded-2xl border border-white/8 bg-gradient-to-r from-[#071827] to-[#04121d] p-8 flex items-start gap-6 transition duration-300 hover:border-cyan-400/60 hover:shadow-[0_10px_40px_rgba(34,211,238,0.09)]">
    <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-400/20 transition shrink-0">
      {icon}
    </div>

    <div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-slate-400 mt-2 text-base max-w-xl">{desc}</p>
    </div>
  </div>
);

/* ---------------- SMALL COMPONENTS ---------------- */

const StatCard = ({ value, label }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
    <div className="text-cyan-300 font-bold text-2xl">{value}</div>
    <div className="text-slate-400 text-sm mt-1">{label}</div>
  </div>
);

const LiveMetric = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <div className="text-3xl font-bold text-cyan-300">{value}</div>
    <div className="text-slate-400 text-sm mt-1">{label}</div>
  </div>
);

const StickyCTA = () => (
  <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-6 bg-[#031021]/95 backdrop-blur border border-white/6 p-4 flex justify-center z-50 rounded-2xl shadow-2xl">
    <Link to="/signup" className="px-8 py-3.5 bg-cyan-400 text-[#041028] rounded-xl font-semibold shadow-lg">
      Start monitoring →
    </Link>
  </div>
);
