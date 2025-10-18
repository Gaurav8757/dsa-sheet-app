import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>DSA Sheet Tracker</h1>
      <div className="navbar-right">
        <span style={{ color: "#333" }}>Hi, {user?.name}</span>
        <button onClick={() => navigate("/progress")} className="btn-secondary">
          Progress
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn-secondary"
        >
          Dashboard
        </button>
        <button onClick={handleLogout} className="btn-primary">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
