import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

import GooeyNav from "../animations/GooeyNav";
const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [daysLeft, setDaysLeft] = useState(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const trialEndDate = localStorage.getItem("trialEndDate");
    if (!trialEndDate) return;

    const end = new Date(trialEndDate);
    const now = new Date();
    const diff = end - now;

    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    setDaysLeft(days);
    setExpired(days === 0);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { label: "Overview", path: "/overview" },
    { label: "Services", path: "/home" },
    { label: "Alerts", path: "/alerts" },
    { label: "AI Insights", path: "/ai" },
    { label: "Subscription", path: "/subscription" },
  ];

  const activeIndex = navItems.findIndex(
    (item) => item.path === location.pathname
  );

  return (
    <div className="w-60 min-h-screen bg-[#050b2c] border-r border-white/10 flex flex-col justify-between">
      
      {/* TOP */}
      <div>
        <div className="px-6 py-6 text-2xl font-bold text-cyan-400 tracking-wide">
          ObserveX
        </div>

        {/* 🔥 GOOEY NAV */}
        <div className="px-4 mt-4">
          <div style={{ height: "420px", position: "relative" }}>
            <GooeyNav
              items={navItems.map((item) => ({ label: item.label }))}
              initialActiveIndex={activeIndex === -1 ? 0 : activeIndex}
              animationTime={600}
              timeVariance={300}
              particleCount={12}
              particleDistances={[70, 8]}
              particleR={90}
              vertical
              colors={["#00C2E0", "#00D9FF", "#38BDF8", "#0EA5E9"]}
              onItemClick={(index) => navigate(navItems[index].path)}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="px-4 py-5 border-t border-white/10 space-y-4">

        {daysLeft !== null && (
          <div
            className={`text-sm p-3.5 rounded-lg border leading-relaxed ${
              expired
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
            }`}
          >
            {expired
              ? "Trial expired — upgrade to continue"
              : `${daysLeft} days remaining in your trial`}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-300 transition font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
