import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  LineChart,
  Code2,
  Shield,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-100 bg-gradient-to-b from-[#050817] via-[#071027] to-[#020615] antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* HERO */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <Hero />
          <div className="space-y-6">
            <TerminalCard />
            <div className="grid grid-cols-3 gap-4 mt-2">
              <StatCard value="99.9%" label="Uptime SLA" />
              <StatCard value="10ms" label="P99 Latency" />
              <StatCard value="Auto" label="Scale" />
            </div>
          </div>
        </section>

        {/* LIVE METRICS */}
        <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <LiveMetric label="Events / sec" value="2.4M" />
          <LiveMetric label="Avg Latency" value="14ms" />
          <LiveMetric label="Error Rate" value="0.02%" />
          <LiveMetric label="Active Services" value="1,248" />
        </section>

        {/* FEATURES */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold mb-10">
            Built for <span className="text-cyan-300">production</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature icon={<Database />} title="Real-time ingestion">
              Sub-second metrics & traces with zero-batch delays.
            </Feature>
            <Feature icon={<LineChart />} title="Precision visualization">
              Rich dashboards and anomaly heatmaps.
            </Feature>
            <Feature icon={<Code2 />} title="Intelligent alerting">
              Noise-reduced alerts with smart routing.
            </Feature>
            <Feature icon={<Shield />} title="Enterprise security">
              RBAC, encryption, SOC2-ready controls.
            </Feature>
          </div>
        </section>

        {/* AI SECTION */}
        <section className="mt-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              AI that explains <span className="text-cyan-300">why things break</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg leading-relaxed">
              ObserveX analyzes patterns, predicts failures, and tells your team what to fix before incidents escalate.
            </p>
            <ul className="mt-6 space-y-3 text-slate-300 text-sm">
              <li>✔ Root cause summaries</li>
              <li>✔ Anomaly detection</li>
              <li>✔ Smart incident recommendations</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#011424]/80 to-[#02233f]/60 border border-cyan-400/30 rounded-2xl p-6 shadow-xl shadow-cyan-900/30 backdrop-blur font-mono text-sm text-cyan-200">
            <pre>
{`AI Insight:
Service "api-prod" is experiencing rising latency due to memory pressure.
Recommended action: scale container or restart pod.`}
            </pre>
          </div>
        </section>

        {/* DASHBOARD PREVIEW */}
        <section className="mt-28">
          <h2 className="text-3xl font-bold mb-6">Full-stack visibility in one place</h2>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img src="/dashboard-preview.png" alt="Dashboard" className="w-full opacity-90 hover:scale-[1.02] transition duration-500" />
          </div>
        </section>

        {/* SECURITY */}
        <section className="mt-28 bg-[#031021]/60 border border-white/10 rounded-2xl p-12 text-center shadow-lg">
          <h3 className="text-2xl font-bold">Enterprise-ready security</h3>
          <p className="text-slate-400 mt-3">
            SOC2 • Encryption at rest • RBAC • Audit logs
          </p>
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold mb-8">Loved by engineers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Testimonial quote="We reduced incident response time by 60%." author="DevOps Lead, FinTech" />
            <Testimonial quote="AI insights saved hours during outages." author="SRE Manager, SaaS" />
          </div>
        </section>

      </main>

      <footer className="border-t border-white/6 py-6 text-center text-slate-400">
        © 2025 ObserveX · Built for chaos.
      </footer>

      <StickyCTA />
    </div>
  );
}

/* COMPONENTS */

function Navbar() {
  return (
    <nav className="border-b border-white/8 bg-[#04061a]/40 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-cyan-400 flex items-center justify-center text-[#041028] font-bold">OX</div>
          <div className="text-slate-100 font-semibold">ObserveX</div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="px-3 py-1.5 border border-cyan-400/40 text-cyan-300 text-sm rounded hover:bg-cyan-400/10 transition">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-cyan-400 text-[#041028] rounded-xl text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-300 transition">Start Free</Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
        Production monitoring <span className="text-cyan-300">built for chaos</span>
      </h1>
      <p className="text-slate-400 max-w-xl text-base leading-relaxed">
        Real-time observability platform for teams who demand signal over noise.
      </p>
      <Link to="/signup" className="inline-flex items-center gap-2 px-7 py-3.5 bg-cyan-400 hover:bg-cyan-300 transition rounded-xl shadow-lg shadow-cyan-500/20 text-[#041028] font-semibold">
        Start monitoring <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function TerminalCard() {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-[#021023]/80 to-[#031a33]/60 p-6 shadow-xl shadow-cyan-900/30 backdrop-blur">
      <pre className="font-mono text-xs text-slate-300">
{`$ observe --real-time
● api-server    OK   12ms
● cache-layer   OK    8ms
● db-primary    OK   18ms`}
      </pre>
    </div>
  );
}

const StatCard = ({ value, label }) => (
  <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center hover:scale-[1.03] transition duration-300">
    <div className="text-cyan-300 font-bold">{value}</div>
    <div className="text-slate-400 text-xs mt-1">{label}</div>
  </div>
);

const LiveMetric = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:scale-[1.03] transition">
    <div className="text-2xl font-bold text-cyan-300">{value}</div>
    <div className="text-slate-400 text-sm mt-1">{label}</div>
  </div>
);

const Feature = ({ icon, title, children }) => (
  <div className="flex gap-5 border border-white/6 rounded-2xl p-6 bg-[#01101a]/60 hover:border-cyan-400/40 transition duration-300">
    <div className="w-12 h-12 rounded-lg bg-[#042033]/60 flex items-center justify-center text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]">{icon}</div>
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-slate-400 text-sm mt-1">{children}</p>
    </div>
  </div>
);

const Testimonial = ({ quote, author }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
    <p className="text-slate-300 italic">“{quote}”</p>
    <p className="text-cyan-300 text-sm mt-3">{author}</p>
  </div>
);

const StickyCTA = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-[#031021]/90 backdrop-blur border-t border-white/10 p-4 flex justify-center z-50">
    <Link to="/signup" className="px-7 py-3.5 bg-cyan-400 text-[#041028] rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-300 transition">
      Start monitoring your system →
    </Link>
  </div>
);
