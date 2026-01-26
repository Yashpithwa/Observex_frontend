import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // token remove
    navigate("/login");  // redirect
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/60">
      <div className="flex gap-4 text-sm font-mono">
        <Link to="/home">Home</Link>
        <Link to="/overview">Overview</Link>
        <Link to="/alerts">Alerts</Link>
      </div>

      <button
        onClick={handleLogout}
        className="text-red-500 text-sm font-mono"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
