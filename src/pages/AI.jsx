import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getServices } from "../api/servicesApi";
import { getAiInsight } from "../api/ai";

/* ================= MAIN PAGE ================= */

const AI = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const [summary, setSummary] = useState("");
  const [anomalies, setAnomalies] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await getServices();
      const list = res.data || [];
      setServices(list);
      if (list.length > 0) setSelectedService(list[0].id || list[0].serviceId);
    };
    load();
  }, []);

  const fetchInsight = async (serviceId) => {
    if (!serviceId) return;
    try {
      setLoading(true);
      const res = await getAiInsight(serviceId);
      const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      setSummary(data.summary || "");
      setAnomalies(data.anomalies || []);
      setPredictions(data.predictions || []);
      setRecommendations(data.recommendations || []);
      setPatterns(data.patterns || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedService) fetchInsight(selectedService);
  }, [selectedService]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b2c] via-[#020617] to-black text-white">

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="ml-0 md:ml-64 px-6 md:px-10 py-8 space-y-8 overflow-y-auto min-h-screen">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-slate-400 text-sm mt-1">
            Anomaly detection & predictive analysis
          </p>
        </div>

        {/* 🔥 Custom Dropdown */}
        <div className="flex items-center gap-4">
          <label className="text-sm text-slate-400">Service</label>
          <ServiceDropdown
            services={services}
            value={selectedService}
            onChange={setSelectedService}
          />
        </div>

        {/* System Analysis */}
        <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-400/20 rounded-2xl p-8 shadow-lg shadow-cyan-900/30">
          <h2 className="text-lg font-semibold mb-3">🧠 System Analysis</h2>
          {loading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <p className="text-slate-200 leading-relaxed text-[15px]">{summary}</p>
          )}
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <InsightCard title="⚠ Detected Anomalies" items={anomalies} type="severity" />
          <InsightCard title="📈 Predictions" items={predictions} type="confidence" />
          <InsightCard title="💡 Recommendations" items={recommendations} type="priority" />
        </div>

        {/* Pattern Section */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/30">
          <h2 className="text-lg font-semibold mb-4 text-slate-200">7-Day Pattern Analysis</h2>
          {patterns.map((p, i) => (
            <Pattern key={i} day={p.day} level={p.level} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AI;

/* ================= DROPDOWN ================= */

const ServiceDropdown = ({ services, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const selected = services.find(s => (s.id || s.serviceId) == value);

  return (
    <div className="relative w-64">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-slate-900/70 border border-cyan-400/30 text-slate-200 px-4 py-2 rounded-xl flex justify-between items-center backdrop-blur-md shadow-lg"
      >
        {selected?.serviceName || "Select service"}
        <span className="text-slate-400">▼</span>
      </button>

      {open && (
        <div className="absolute z-[999] mt-2 w-full bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
          {services.map((s) => {
            const id = s.id || s.serviceId;
            return (
              <div
                key={id}
                onClick={() => {
                  onChange(id);
                  setOpen(false);
                }}
                className="px-4 py-2 text-sm text-slate-200 hover:bg-cyan-500/20 cursor-pointer"
              >
                {s.serviceName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ================= UI COMPONENTS ================= */

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-white/10 rounded-lg ${className}`} />
);

const InsightCard = ({ title, items, type }) => (
  <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/30 hover:-translate-y-1 transition">
    <h3 className="font-semibold mb-3 text-slate-200">{title}</h3>
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-slate-800/60 border border-white/5 rounded-xl p-4 hover:bg-slate-800/80 transition">
          <p className="font-medium text-sm text-slate-100">{item.title}</p>
          <p className="text-xs text-slate-400">{item.description}</p>
          {item[type] && (
            <span className="text-[10px] mt-1 inline-block text-cyan-300">
              {type}: {item[type]}
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

const Pattern = ({ day, level }) => {
  const color =
    level === "high"
      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
      : "bg-gradient-to-r from-green-400 to-emerald-500";

  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-24 text-sm text-slate-300">{day}</span>
      <div className="flex-1 h-2.5 bg-white/10 rounded-full">
        <div className={`h-2.5 rounded-full ${color} w-[70%]`} />
      </div>
      <span className="text-xs text-slate-400 capitalize">{level}</span>
    </div>
  );
};
