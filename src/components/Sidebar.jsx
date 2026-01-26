import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-[#050b2c] border-r border-white/10 flex flex-col justify-between">

      {/* TOP */}
      <div>
        <div className="px-6 py-5 text-xl font-bold text-cyan-400">
          ObserveX
        </div>

        <nav className="px-4 space-y-1 text-sm">
          <Link to="/overview"className="block px-3 py-2 rounded bg-cyan-500/10 text-cyan-400">
            Overview
          </Link>
          <Link to="/home" className="block px-3 py-2 rounded hover:bg-white/5">
            Services
          </Link>
          <Link to="/alerts" className="block px-3 py-2 rounded hover:bg-white/5">
            Alerts
          </Link>
          <Link to="/ai" className="block px-3 py-2 rounded hover:bg-white/5">
            AI Insights
          </Link>
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
