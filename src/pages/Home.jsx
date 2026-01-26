import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddService from "../components/AddService";
import {
  getServices,
  disableService,
  deleteService,
} from "../api/servicesApi";
import { getUptimeValue } from "../api/uptimeApi";
import { getErrorRatevalue } from "../api/errorrateApi";
import { getP95Value } from "../api/p95Api";
import { getRPSValue } from "../api/rpsApi";

const Home = () => {
  const [services, setServices] = useState([]);
  const [uptimes, setUptimes] = useState({});
  const [errorRates, setErrorRates] = useState({});
  const [p95s, setP95s] = useState({});
  const [rpsValues, setRpsValues] = useState({});
  const [hours, setHours] = useState(24);
  const [loading, setLoading] = useState(true);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await getServices();
      const list = res.data || [];
      setServices(list);

      const uptimeMap = {};
      const errorMap = {};
      const p95Map = {};
      const rpsMap = {};

      for (const s of list) {
        const id = s.id || s.serviceId;

        try { uptimeMap[id] = (await getUptimeValue(id, hours)).data.uptime; }
        catch { uptimeMap[id] = "—"; }

        try { errorMap[id] = (await getErrorRatevalue(id, hours)).data.errorRate; }
        catch { errorMap[id] = "—"; }

        try { p95Map[id] = (await getP95Value(id, hours)).data.p95LatencyMs; }
        catch { p95Map[id] = "—"; }

        try { rpsMap[id] = (await getRPSValue(id)).data.rps; }
        catch { rpsMap[id] = "—"; }
      }

      setUptimes(uptimeMap);
      setErrorRates(errorMap);
      setP95s(p95Map);
      setRpsValues(rpsMap);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadServices(); }, [hours]);

  const handleDisable = async (id) => {
    if (!window.confirm("Disable this service monitoring?")) return;
    await disableService(id);
    loadServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("⚠ Permanently delete this service?")) return;
    await deleteService(id);
    loadServices();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b2c] via-[#020617] to-black text-white">

      {/* FIXED SIDEBAR */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* CONTENT AREA */}
      <div className="ml-0 md:ml-64 px-4 sm:px-6 md:px-8 py-6 overflow-y-auto min-h-screen">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Services</h1>
          <p className="text-sm text-white/60 mt-1">
            {services.length} services · last {hours} hours
          </p>

          <Link to="/overview" className="text-cyan-400 text-sm hover:underline">
            View System Overview →
          </Link>

          <div className="flex flex-wrap gap-2 mt-4">
            {[1, 6, 24, 168].map((h) => (
              <button
                key={h}
                onClick={() => setHours(h)}
                className={`px-3 py-1 text-sm rounded border ${
                  hours === h
                    ? "bg-cyan-500 text-black"
                    : "border-white/20 text-white/70"
                }`}
              >
                {h === 168 ? "7d" : `${h}h`}
              </button>
            ))}
          </div>
        </div>

        {/* ADD SERVICE */}
        <div className="mb-6 bg-white/5 border border-white/10 rounded-xl p-4">
          <AddService onAdded={loadServices} />
        </div>

        {/* SERVICES GRID */}
        {loading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {services.map((s) => {
              const id = s.id || s.serviceId;
              return (
                <div key={id} className="bg-white/5 border border-white/10 rounded-xl p-5">

                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        s.status === "UP" ? "bg-green-400" : "bg-red-400"
                      }`} />
                      <h3 className="font-semibold text-lg">{s.serviceName}</h3>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => handleDisable(id)}
                        className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                        Disable
                      </button>
                      <button onClick={() => handleDelete(id)}
                        className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <Metric label={`UPTIME (${hours}h)`} value={uptimes[id]} green />
                    <Metric label="ERROR RATE" value={errorRates[id] !== "—" ? `${errorRates[id]}%` : "—"} />
                    <Metric label="REQUESTS / S" value={rpsValues[id]} />
                    <Metric label="p95 LATENCY" value={p95s[id] !== "—" ? `${p95s[id]} ms` : "—"} />
                  </div>

                  <div className="border-t border-white/10 pt-3 text-xs text-white/40 mt-4">
                    ● {s.status} · Last check ~30s
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

/* ---------- Components ---------- */

const Metric = ({ label, value, green }) => (
  <div>
    <p className="text-white/40">{label}</p>
    <p className={`text-lg font-semibold ${green ? "text-green-400" : "text-cyan-400"}`}>
      {value ?? "—"}
    </p>
  </div>
);

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-white/10 rounded-lg ${className}`} />
);
