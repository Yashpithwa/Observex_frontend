import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAlerts } from "../api/alertsApi";
import { getAiReason } from "../api/ai";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [reasons, setReasons] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("OPEN");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const res = await getAlerts();
      const list = res.data || [];
      setAlerts(list);

      const reasonMap = {};

      await Promise.all(
        list.map(async (alert) => {
          const serviceId = alert.service?.id || alert.service?.serviceId;
          if (!serviceId) return;

          try {
            const r = await getAiReason(serviceId);
            const parsed =
              typeof r.data === "string" ? JSON.parse(r.data) : r.data;
            reasonMap[alert.id] = parsed;
          } catch {
            reasonMap[alert.id] = null;
          }
        })
      );

      setReasons(reasonMap);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
    const interval = setInterval(loadAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const openAlerts = alerts.filter((a) => a.closedAt === null);
  const resolvedAlerts = alerts.filter((a) => a.closedAt !== null);
  const visibleAlerts = tab === "OPEN" ? openAlerts : resolvedAlerts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b2c] via-[#020617] to-black text-white">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Page Content */}
      <div className="md:ml-72 px-4 sm:px-6 md:px-8 py-6 min-h-screen">

        {/* Topbar */}
        <div className="flex items-center gap-3 mb-6">
          <button
            className="md:hidden p-2 rounded-md bg-white/5"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Alerts & Incidents
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {openAlerts.length} open · {resolvedAlerts.length} resolved
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <TabButton active={tab === "OPEN"} onClick={() => setTab("OPEN")}>
            Open ({openAlerts.length})
          </TabButton>
          <TabButton active={tab === "RESOLVED"} onClick={() => setTab("RESOLVED")}>
            Resolved ({resolvedAlerts.length})
          </TabButton>
        </div>

        {/* Alerts List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        ) : visibleAlerts.length === 0 ? (
          <div className="text-slate-400">No alerts</div>
        ) : (
          <div className="space-y-5">
            {visibleAlerts.map((a) => (
              <AlertCard key={a.id} alert={a} reason={reasons[a.id]} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;

/* ---------- UI ---------- */

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-md text-sm border ${
      active
        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
        : "border-white/10 text-white/60 hover:bg-white/5"
    }`}
  >
    {children}
  </button>
);

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-white/10 rounded-xl ${className}`} />
);

const AlertCard = ({ alert, reason }) => {
  const severityStyles = {
    CRITICAL: "border-red-500/40 bg-red-500/10 text-red-300",
    WARNING: "border-yellow-500/40 bg-yellow-500/10 text-yellow-300",
    INFO: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  };

  const serviceName = alert.service?.serviceName || "Unknown Service";

  return (
    <div className={`border rounded-2xl p-5 shadow-lg ${severityStyles[alert.type] || "border-white/10 bg-white/5"}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-lg">{alert.message}</p>
          <div className="flex gap-2 mt-2 text-xs flex-wrap">
            <span className="px-2 py-0.5 rounded bg-white/10">{serviceName}</span>
            <span className="px-2 py-0.5 rounded bg-black/30">{alert.type || "INFO"}</span>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400">
          <p>{timeAgo(alert.createdAt)}</p>
          {alert.closedAt === null && (
            <button className="mt-2 px-3 py-1 rounded bg-white/10 hover:bg-white/20">
              Acknowledge
            </button>
          )}
        </div>
      </div>

      {reason && (
        <div className="mt-4 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 border border-cyan-400/20 rounded-xl p-4">
          <p className="text-sm text-cyan-300 font-semibold mb-1">
            AI Root Cause
          </p>
          <p className="text-sm text-slate-200">{reason.summary}</p>
          <div className="flex gap-4 mt-3 text-xs text-slate-400">
            <span>Category: <b className="text-white">{reason.category}</b></span>
            <span>Confidence: <b className="text-cyan-300">{reason.confidence}</b></span>
          </div>
          <div className="mt-2 text-xs text-yellow-300">
            Recommendation: {reason.recommendation}
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- Helpers ---------- */

const timeAgo = (timestamp) => {
  if (!timestamp) return "";
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  return new Date(timestamp).toLocaleDateString();
};
