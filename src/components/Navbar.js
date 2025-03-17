import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ auth, setAuth }) {
  const navigate = useNavigate();
  const location = useLocation(); // Get current page for highlighting active link

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuth(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo"><Link to="/">FitLife Hub</Link></h1>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">🏠 Home</Link>
        </li>
        {auth ? (
          <>
            <li className={location.pathname === "/fitness-plans" ? "active" : ""}>
              <Link to="/fitness-plans">💪 Fitness Plans</Link>
            </li>
            <li className={location.pathname === "/diet-plans" ? "active" : ""}>
              <Link to="/diet-plans">🥗 Diet Plans</Link>
            </li>
            <li className={location.pathname === "/progress-tracker" ? "active" : ""}>
              <Link to="/progress-tracker">📊 Progress Tracker</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className={location.pathname === "/login" ? "active" : ""}>
              <Link to="/login">🔑 Login</Link>
            </li>
            <li className={location.pathname === "/register" ? "active" : ""}>
              <Link to="/register">📝 Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
