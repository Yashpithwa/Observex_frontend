import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getServiceStatuses } from "../api/overviewApi";
import { getHistoryData } from "../api/historyApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const Overview = () => {
  const [services, setServices] = useState([]);
  const [histories, setHistories] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getServiceStatuses();
      const list = res.data || [];
      setServices(list);

      const historyMap = {};
      for (const s of list) {
        const h = await getHistoryData(s.serviceId);
        historyMap[s.serviceId] = (h.data || []).map((row) => ({
          time: new Date(row.checkAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          responseTime: row.responseTime,
        }));
      }
      setHistories(historyMap);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b2c] via-[#020617] to-black text-white">

      {/* FIXED SIDEBAR */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-0 md:ml-64 min-h-screen px-4 sm:px-6 md:px-8 py-6 overflow-y-auto">

        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Observability</h1>
        <p className="text-sm text-white/60 mb-8">
          System Performance · Last 24 hours
        </p>

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">

          {/* REQUEST RATE */}
          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs text-white/60 mb-3">REQUEST RATE</p>
            <div className="h-40">
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={histories[services[0]?.serviceId] || []}>
                    <CartesianGrid stroke="#222" />
                    <XAxis dataKey="time" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Bar dataKey="responseTime" fill="#22d3ee" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* SERVICE STATUS */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-xs text-white/60 mb-4">SERVICES STATUS</p>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            ) : (
              <ul className="space-y-3 text-sm">
                {services.map((s) => (
                  <li key={s.serviceId} className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          s.status === "UP" ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                      {s.serviceName}
                    </span>
                    <span className="text-white/60">
                      {formatNumber(s.avgResponseTime)} ms
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* PER SERVICE */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Per-Service Latency
        </h2>

        <div className="space-y-6">
          {services.map((s) => (
            <div
              key={s.serviceId}
              className="grid grid-cols-1 xl:grid-cols-4 gap-4 bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <div className="xl:col-span-1 flex items-center gap-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    s.status === "UP" ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <div>
                  <p className="font-medium text-lg">{s.serviceName}</p>
                  <p className="text-xs text-white/60">
                    Avg: {formatNumber(s.avgResponseTime)} ms
                  </p>
                </div>
              </div>

              <div className="xl:col-span-3 h-40">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={histories[s.serviceId] || []}>
                      <CartesianGrid stroke="#222" />
                      <XAxis dataKey="time" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="responseTime"
                        stroke="#22d3ee"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;

/* Skeleton Loader */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-white/10 rounded-lg ${className}`} />
);

const formatNumber = (v) => {
  if (!v) return "—";
  const n = Number(v);
  return n % 1 === 0 ? n : n.toFixed(1);
};
